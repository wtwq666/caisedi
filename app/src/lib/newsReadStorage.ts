const READ_KEY = 'caisedi_news_read_v1'
const VIEW_COUNTS_KEY = 'caisedi_news_views_v1'

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(READ_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeIds(ids: string[]) {
  localStorage.setItem(READ_KEY, JSON.stringify([...new Set(ids)]))
}

export function isNewsRead(newsId: string): boolean {
  return readIds().includes(newsId)
}

export function markNewsRead(newsId: string): void {
  const ids = readIds()
  if (ids.includes(newsId)) return
  writeIds([...ids, newsId])
}

export function getUnreadNewsIds(allIds: string[]): string[] {
  const read = new Set(readIds())
  return allIds.filter((id) => !read.has(id))
}

export function getUnreadNewsCount(allIds: string[]): number {
  return getUnreadNewsIds(allIds).length
}

function readViewCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(VIEW_COUNTS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, number>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/** 本地累加阅读次数（演示用，接后端后替换） */
export function incrementNewsView(newsId: string, baseViews: number): number {
  const counts = readViewCounts()
  const next = (counts[newsId] ?? baseViews) + 1
  counts[newsId] = next
  localStorage.setItem(VIEW_COUNTS_KEY, JSON.stringify(counts))
  return next
}

export function getNewsViewCount(newsId: string, baseViews: number): number {
  const counts = readViewCounts()
  return counts[newsId] ?? baseViews
}
