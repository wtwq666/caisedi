import { useEffect, useRef, useState } from 'react'
import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

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
    let lastWidth = 0

    const render = async () => {
      if (cancelled) return
      root.innerHTML = ''
      setLoading(true)
      setError('')
      setPageCurrent(1)
      setPageTotal(0)

      try {
        const loadingTask = pdfjs.getDocument(fileUrl)
        const pdf = await loadingTask.promise
        if (cancelled) return

        setPageTotal(pdf.numPages)

        const measureWidth = () => {
          const vv = window.visualViewport?.width
          const w =
            root.clientWidth ||
            root.parentElement?.clientWidth ||
            vv ||
            document.documentElement.clientWidth
          const sidePad = Math.max(12, Math.min(20, Math.round(w * 0.04)))
          return Math.max(240, w - sidePad * 2)
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

        if (!cancelled) {
          lastWidth = measureWidth()
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError('PDF 加载失败，请下载后查看')
          setLoading(false)
        }
      }
    }

    void render()

    let resizeTimer = 0
    const onLayoutChange = () => {
      const w = root.clientWidth || window.visualViewport?.width || 0
      if (w <= 0 || Math.abs(w - lastWidth) < 24) return
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (!cancelled) void render()
      }, 280)
    }

    const ro = new ResizeObserver(onLayoutChange)
    ro.observe(root)
    window.visualViewport?.addEventListener('resize', onLayoutChange)
    window.addEventListener('orientationchange', onLayoutChange)

    return () => {
      cancelled = true
      window.clearTimeout(resizeTimer)
      ro.disconnect()
      window.visualViewport?.removeEventListener('resize', onLayoutChange)
      window.removeEventListener('orientationchange', onLayoutChange)
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
        <p className="text-[#F5222D] text-sm">{error}</p>
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
