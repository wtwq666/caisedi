/** 桌面端：按页宽等比缩小 */
const A4_WIDTH_PX = 793.7

function getDocxWrapper(stage: HTMLElement): HTMLElement | null {
  return (
    stage.querySelector<HTMLElement>('.docx-wrapper') ??
    stage.querySelector<HTMLElement>('.docx-preview-container')
  )
}

function readPageWidthPx(page: HTMLElement): number {
  const fromStyle = parseFloat(page.style.width)
  if (fromStyle > 0) return fromStyle
  const w = page.scrollWidth || page.offsetWidth
  if (w > 0) return w
  return A4_WIDTH_PX
}

function measurePageWidth(wrapper: HTMLElement): number {
  const pages = wrapper.querySelectorAll<HTMLElement>('section.docx')
  let max = 0
  pages.forEach((page) => {
    max = Math.max(max, readPageWidthPx(page))
  })
  return max > 0 ? max : A4_WIDTH_PX
}

function getStageWidth(stage: HTMLElement): number {
  const w = stage.clientWidth || stage.getBoundingClientRect().width
  if (w > 0) return w
  return window.visualViewport?.width ?? window.innerWidth
}

export function fitDocxToViewport(stage: HTMLElement, userZoom = 1): number {
  const wrapper = getDocxWrapper(stage)
  if (!wrapper) return 1

  wrapper.style.transform = ''
  wrapper.style.zoom = ''
  wrapper.style.width = ''
  wrapper.style.margin = ''

  const available = getStageWidth(stage)
  const pageWidth = measurePageWidth(wrapper)
  const baseScale = Math.min(1, available / pageWidth)
  const scale = baseScale * userZoom

  wrapper.dataset.baseScale = String(baseScale)
  wrapper.dataset.pageWidth = String(pageWidth)
  wrapper.style.width = `${pageWidth}px`
  wrapper.style.marginLeft = 'auto'
  wrapper.style.marginRight = 'auto'
  wrapper.style.setProperty('zoom', String(scale))

  return scale
}

export function setDocxZoomLevel(stage: HTMLElement, userScale: number): void {
  fitDocxToViewport(stage, userScale)
}

export function prepareDocxReflowContainer(stage: HTMLElement, container: HTMLElement): number {
  const width = getStageWidth(stage)
  stage.style.width = '100%'
  stage.style.padding = '0'
  container.style.width = '100%'
  container.style.maxWidth = '100%'
  container.style.minWidth = '0'
  container.style.boxSizing = 'border-box'
  return width
}

function parseLengthPx(value: string): number | null {
  if (!value || value === 'auto') return null
  const n = parseFloat(value)
  if (Number.isNaN(n)) return null
  if (value.endsWith('pt')) return n * (96 / 72)
  if (value.endsWith('in')) return n * 96
  if (value.endsWith('cm')) return n * (96 / 2.54)
  return n
}

/** 手机满宽网页式重排：去掉 docx 内联固定宽度，表格可横滑 */
export function finalizeDocxReflow(stage: HTMLElement): void {
  const root = stage.querySelector<HTMLElement>('.doc-viewer-docx-root')
  if (!root) return

  const viewportW =
    stage.getBoundingClientRect().width ||
    root.getBoundingClientRect().width ||
    window.visualViewport?.width ||
    window.innerWidth

  const wrapper = getDocxWrapper(stage)
  if (wrapper) {
    wrapper.style.cssText = [
      'width:100%',
      'max-width:100%',
      'min-width:0',
      'margin:0',
      'padding:0',
      'background:#fff',
      'box-shadow:none',
    ].join(';')
  }

  root.style.width = '100%'
  root.style.maxWidth = '100%'
  root.style.minWidth = '0'

  root.querySelectorAll<HTMLElement>('section.docx').forEach((page) => {
    page.style.width = '100%'
    page.style.maxWidth = '100%'
    page.style.minWidth = '0'
    page.style.margin = '0'
    page.style.padding = '0.75rem 0.875rem'
    page.style.boxSizing = 'border-box'
    page.style.minHeight = ''
    page.style.height = 'auto'
  })

  root.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
    const w = el.style.width
    const px = w ? parseLengthPx(w) : null
    if (px != null && px > viewportW * 0.5) {
      el.style.width = '100%'
    }
    if (el.style.minWidth) el.style.minWidth = '0'
    const maxPx = el.style.maxWidth ? parseLengthPx(el.style.maxWidth) : null
    if (maxPx != null && maxPx > viewportW) {
      el.style.maxWidth = '100%'
    }
    if (el.style.marginLeft && el.style.marginLeft !== '0px') {
      const ml = parseLengthPx(el.style.marginLeft)
      if (ml != null && ml > 20) el.style.marginLeft = '0'
    }
    if (el.style.marginRight && el.style.marginRight !== '0px') {
      const mr = parseLengthPx(el.style.marginRight)
      if (mr != null && mr > 20) el.style.marginRight = '0'
    }
  })

  root.querySelectorAll<HTMLElement>('article, div, p, span, li, td, th').forEach((el) => {
    if (el.style.width) {
      const px = parseLengthPx(el.style.width)
      if (px != null && px > viewportW * 0.6) el.style.width = ''
    }
  })

  root.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
    table.style.width = '100%'
    table.style.maxWidth = '100%'
    table.style.tableLayout = 'fixed'
    table.style.fontSize = '11px'

    if (table.parentElement?.classList.contains('docx-table-scroll')) return
    const scroll = document.createElement('div')
    scroll.className = 'docx-table-scroll'
    table.parentNode?.insertBefore(scroll, table)
    scroll.appendChild(table)
  })
}
