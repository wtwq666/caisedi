import { useIsMobile } from './use-mobile'
import { useOverlayBack } from './use-overlay-back'

/** 手机端：有选中项时只显示详情，列表隐藏；支持系统返回与左滑 */
export function useMasterDetailMobile(
  hasSelection: boolean,
  onClear: () => void,
  scopeId: string,
) {
  const isMobile = useIsMobile()
  const { requestClose } = useOverlayBack(
    isMobile && hasSelection,
    onClear,
    `master-detail-${scopeId}`,
  )

  return {
    isMobile,
    showList: !isMobile || !hasSelection,
    showDetail: !isMobile || hasSelection,
    closeDetail: requestClose,
  }
}
