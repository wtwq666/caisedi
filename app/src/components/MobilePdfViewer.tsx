import { useEffect, useRef, useState } from 'react'
import * as pdfjs from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

interface MobilePdfViewerProps {
  fileUrl: string
}

export default function MobilePdfViewer({ fileUrl }: MobilePdfViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pageTotal, setPageTotal] = useState(0)
  const [pageCurrent, setPageCurrent] = useState(1)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    let cancelled = false
    root.innerHTML = ''
    setLoading(true)
    setError('')
    setPageCurrent(1)
    setPageTotal(0)

    const render = async () => {
      try {
        const loadingTask = pdfjs.getDocument(fileUrl)
        const pdf = await loadingTask.promise
        if (cancelled) return

        setPageTotal(pdf.numPages)

        const measureWidth = () => {
          const w =
            root.clientWidth ||
            root.parentElement?.clientWidth ||
            document.documentElement.clientWidth
          return Math.max(240, w - 24)
        }

        let viewportWidth = measureWidth()
        if (viewportWidth <= 240) {
          await new Promise<void>((resolve) => {
            const ro = new ResizeObserver(() => {
              viewportWidth = measureWidth()
              if (viewportWidth > 240) {
                ro.disconnect()
                resolve()
              }
            })
            ro.observe(root)
            setTimeout(() => {
              ro.disconnect()
              viewportWidth = measureWidth()
              resolve()
            }, 300)
          })
        }

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          const baseViewport = page.getViewport({ scale: 1 })
          const scale = viewportWidth / baseViewport.width
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const ctx = canvas.getContext('2d')
          if (!ctx) continue

          await page.render({ canvasContext: ctx, viewport }).promise

          const wrap = document.createElement('div')
          wrap.className = 'doc-viewer-pdf-page-wrap'
          wrap.dataset.page = String(i)
          wrap.appendChild(canvas)
          root.appendChild(wrap)
        }

        if (!cancelled) setLoading(false)
      } catch {
        if (!cancelled) {
          setError('PDF 加载失败，请下载后查看')
          setLoading(false)
        }
      }
    }

    void render()
    return () => {
      cancelled = true
    }
  }, [fileUrl])

  useEffect(() => {
    const root = scrollRef.current
    if (!root || pageTotal === 0) return

    const wraps = root.querySelectorAll<HTMLElement>('.doc-viewer-pdf-page-wrap')
    if (!wraps.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { page: number; ratio: number } | null = null
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const page = Number((entry.target as HTMLElement).dataset.page || '1')
          const ratio = entry.intersectionRatio
          if (!best || ratio > best.ratio) best = { page, ratio }
        }
        if (best) setPageCurrent(best.page)
      },
      { root, threshold: [0.25, 0.5, 0.75] },
    )

    wraps.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pageTotal, loading])

  if (error) {
    return (
      <div className="text-center py-24 px-6">
        <p className="text-[#F5222D] text-sm mb-4">{error}</p>
        <a href={fileUrl} download className="inline-block px-5 py-2.5 bg-[#1890FF] text-white text-sm rounded-lg">
          下载查看
        </a>
      </div>
    )
  }

  return (
    <div className="doc-viewer-pdf-mobile">
      {loading && <div className="doc-viewer-pdf-loading">文档加载中…</div>}
      {pageTotal > 0 && !loading && (
        <div className="doc-viewer-pdf-badge" aria-live="polite">
          {pageCurrent}/{pageTotal}
        </div>
      )}
      <div ref={scrollRef} className="doc-viewer-pdf-pages" />
    </div>
  )
}
