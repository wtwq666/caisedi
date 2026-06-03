import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useOverlayBack } from '../hooks/use-overlay-back'
import { useIsMobile } from '../hooks/use-mobile'
import {
  finalizeDocxReflow,
  fitDocxToViewport,
  prepareDocxReflowContainer,
  setDocxZoomLevel,
} from '../lib/fitDocxToViewport'
import MobilePdfViewer from './MobilePdfViewer'
import '../styles/doc-viewer.css'

interface DocViewerProps {
  fileUrl: string
  fileType: 'pdf' | 'docx' | 'pptx' | 'xls'
  title: string
  onClose: () => void
}

export default function DocViewer({ fileUrl, fileType, title, onClose }: DocViewerProps) {
  const isMobile = useIsMobile()
  const overlayId = `doc-viewer-${fileType}-${title}`
  const { requestClose } = useOverlayBack(isMobile, onClose, overlayId)
  const closeViewer = isMobile ? requestClose : onClose
  const [scale, setScale] = useState(1.2)
  const docxStageRef = useRef<HTMLDivElement>(null)
  const docxContainerRef = useRef<HTMLDivElement>(null)
  const [docxLoading, setDocxLoading] = useState(fileType === 'docx')
  const [docxError, setDocxError] = useState('')
  const docxUserZoomRef = useRef(1)

  const applyDocxFit = useCallback(() => {
    const stage = docxStageRef.current
    if (!stage) return

    if (isMobile) {
      finalizeDocxReflow(stage)
      return
    }

    docxUserZoomRef.current = 1
    fitDocxToViewport(stage, 1)
  }, [isMobile])

  useEffect(() => {
    if (fileType !== 'docx') return
    let alive = true
    const stage = docxStageRef.current
    const container = docxContainerRef.current
    if (!stage || !container) return

    container.innerHTML = ''
    docxUserZoomRef.current = 1

    const renderDocx = async () => {
      try {
        if (!alive) return
        setDocxLoading(true)
        setDocxError('')

        if (isMobile) {
          prepareDocxReflowContainer(stage, container)
        }

        const response = await fetch(fileUrl, { credentials: 'same-origin' })
        if (!alive) return
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const arrayBuffer = await response.arrayBuffer()
        if (!alive) return

        const { renderAsync } = await import('docx-preview')
        if (!alive) return
        await renderAsync(arrayBuffer, container, undefined, {
          className: 'docx-preview-container',
          inWrapper: !isMobile,
          ignoreWidth: isMobile,
          ignoreHeight: isMobile,
          ignoreFonts: true,
          breakPages: !isMobile,
          renderHeaders: !isMobile,
          renderFooters: !isMobile,
        })

        if (!alive) return
        setDocxLoading(false)
      } catch {
        if (!alive) return
        setDocxError('文档加载失败，请稍后重试或联系管理员')
        setDocxLoading(false)
      }
    }

    void renderDocx()
    return () => {
      alive = false
      container.innerHTML = ''
    }
  }, [fileUrl, fileType, isMobile])

  useEffect(() => {
    if (fileType !== 'docx' || docxLoading || docxError) return

    const stage = docxStageRef.current
    if (!stage) return

    let rafId = 0
    const run = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        applyDocxFit()
      })
    }

    run()

    const ro = new ResizeObserver(() => run())
    ro.observe(stage)

    const onViewportResize = () => run()
    window.visualViewport?.addEventListener('resize', onViewportResize)
    window.visualViewport?.addEventListener('scroll', onViewportResize)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.visualViewport?.removeEventListener('resize', onViewportResize)
      window.visualViewport?.removeEventListener('scroll', onViewportResize)
    }
  }, [fileType, docxLoading, docxError, applyDocxFit])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const toolbarClose = closeViewer

  const resetDocxZoom = () => {
    docxUserZoomRef.current = 1
    applyDocxFit()
  }

  const changeDocxZoom = (factor: number) => {
    if (isMobile) return
    const stage = docxStageRef.current
    if (!stage) return
    docxUserZoomRef.current = Math.min(1.5, Math.max(0.7, docxUserZoomRef.current * factor))
    setDocxZoomLevel(stage, docxUserZoomRef.current)
  }

  const pdfSrc = `${fileUrl}${fileUrl.includes('#') ? '&' : '#'}view=FitH`

  const toolbar = (
    <div className="doc-viewer-toolbar">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <button
          type="button"
          onClick={toolbarClose}
          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white active:bg-white/15"
          aria-label="返回"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-white text-sm font-medium truncate">{title}</span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {fileType === 'docx' && !isMobile && !docxLoading && !docxError && (
          <>
            <button
              type="button"
              onClick={resetDocxZoom}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white active:bg-white/15"
              aria-label="适应屏幕"
            >
              <Maximize2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => changeDocxZoom(0.9)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white active:bg-white/15"
              aria-label="缩小"
            >
              <ZoomOut size={16} />
            </button>
            <button
              type="button"
              onClick={() => changeDocxZoom(1.1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white active:bg-white/15"
              aria-label="放大"
            >
              <ZoomIn size={16} />
            </button>
          </>
        )}
        {fileType === 'pdf' && !isMobile && (
          <>
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="w-8 h-8 rounded text-white"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-white text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(3, s + 0.1))}
              className="w-8 h-8 rounded text-white"
            >
              <ZoomIn size={14} />
            </button>
          </>
        )}
        {!isMobile && (
          <button
            type="button"
            onClick={toolbarClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
            aria-label="关闭"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )

  const content = (
    <div className="doc-viewer-content">
      {fileType === 'pdf' && isMobile && <MobilePdfViewer fileUrl={fileUrl} />}
      {fileType === 'pdf' && !isMobile && (
        <iframe
          src={pdfSrc}
          className="doc-viewer-pdf-frame"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
          }}
          title={title}
        />
      )}
      {fileType === 'docx' && (
        <div className="doc-viewer-docx-scroll">
          {docxLoading && (
            <div className="doc-viewer-docx-loading">文档加载中…</div>
          )}
          {docxError && (
            <div className="text-center py-24 px-6">
              <p className="text-[#F5222D] text-sm">{docxError}</p>
            </div>
          )}
          <div ref={docxStageRef} className="doc-viewer-docx-stage">
            <div ref={docxContainerRef} className="doc-viewer-docx-root" />
          </div>
        </div>
      )}
    </div>
  )

  if (fileType === 'pptx') {
    const pptxCard = (
      <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-xl relative mx-auto">
        {!isMobile && (
          <button
            type="button"
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#F5F5F5]"
            onClick={toolbarClose}
          >
            ×
          </button>
        )}
        <h3 className="text-lg font-medium text-center mb-2">{title}</h3>
        <p className="text-sm text-[#8C8C8C] text-center mb-6">请在浏览器中打开 PPT</p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-2.5 bg-[#1890FF] text-white text-center rounded-lg text-sm"
        >
          浏览器打开
        </a>
      </div>
    )

    if (isMobile) {
      return createPortal(
        <div className="doc-viewer-portal doc-viewer-portal--mobile">
          <div className="doc-viewer-portal__safe-top" aria-hidden="true" />
          {toolbar}
          <div className="doc-viewer-content flex items-center justify-center p-4">{pptxCard}</div>
        </div>,
        document.body,
      )
    }

    return createPortal(
      <div className="doc-viewer-portal doc-viewer-portal--desktop items-center justify-center p-4">
        {pptxCard}
      </div>,
      document.body,
    )
  }

  if (isMobile) {
    return createPortal(
      <div
        className={`doc-viewer-portal doc-viewer-portal--mobile${
          fileType === 'docx' ? ' doc-viewer-portal--docx-reflow' : ''
        }${fileType === 'pdf' ? ' doc-viewer-portal--pdf-mobile' : ''}`}
      >
        <div className="doc-viewer-portal__safe-top" aria-hidden="true" />
        {toolbar}
        {content}
      </div>,
      document.body,
    )
  }

  return createPortal(
    <div className="doc-viewer-portal doc-viewer-portal--desktop">
      <div className="doc-viewer-panel--desktop">
        {toolbar}
        {content}
      </div>
    </div>,
    document.body,
  )
}
