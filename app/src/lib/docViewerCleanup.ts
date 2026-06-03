/** 解除预览导致的 body 滚动锁定 */
export function resetBodyScrollLock(): void {
  document.body.style.overflow = ''
  document.body.style.pointerEvents = ''
}

/**
 * 仅用于应用冷启动时清理「上次崩溃」残留的 portal。
 * 勿在 DocViewer 挂载/卸载或路由切换时调用，否则会与 React createPortal 冲突并报 removeChild 错误。
 */
export function removeStaleDocViewerPortals(): void {
  document.querySelectorAll('.doc-viewer-portal').forEach((el) => el.remove())
}
