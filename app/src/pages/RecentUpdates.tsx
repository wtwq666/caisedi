import { Navigate } from 'react-router-dom'

/** 已合并至「资料更新」页（/changelog） */
export default function RecentUpdates() {
  return <Navigate to="/changelog" replace />
}
