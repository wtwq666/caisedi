import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'

export type RecentLearningItem =
  | {
      type: 'fabric'
      id: number
      title: string
      subtitle?: string
      viewedAt: string
    }
  | {
      type: 'product'
      id: number
      title: string
      subtitle?: string
      viewedAt: string
    }

const STORAGE_KEY = 'caisedi_recent_learning_v1'
const MAX_ITEMS = 8

let apiCache: RecentLearningItem[] | null = null

export async function initRecentLearningFromApi(): Promise<void> {
  if (USE_MOCK) return
  const rows = await apiRequest<
    Array<{ type: string; id: number; title: string; subtitle?: string; viewedAt: string }>
  >('/learning/recent?limit=8')
  apiCache = rows as RecentLearningItem[]
}

function readAll(): RecentLearningItem[] {
  if (!USE_MOCK && apiCache) return apiCache
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as RecentLearningItem[]) : []
  } catch {
    return []
  }
}

function writeAll(items: RecentLearningItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function recordRecentLearning(
  item: Omit<RecentLearningItem, 'viewedAt'>,
): void {
  const now = new Date().toISOString()
  const entry = { ...item, viewedAt: now } as RecentLearningItem
  if (!USE_MOCK) {
    void apiRequest('/learning/recent', {
      method: 'POST',
      body: JSON.stringify({
        type: entry.type,
        id: entry.id,
        title: entry.title,
        subtitle: entry.subtitle,
      }),
    })
      .then(() => initRecentLearningFromApi())
      .catch((err) => console.error('[learning] record recent failed', err))
    return
  }
  const rest = readAll().filter((x) => !(x.type === entry.type && x.id === entry.id))
  writeAll([entry, ...rest].slice(0, MAX_ITEMS))
}

export function getRecentLearning(limit = 3): RecentLearningItem[] {
  return readAll().slice(0, limit)
}

export function getRecentLearningLink(item: RecentLearningItem): {
  to: string
  state: Record<string, unknown>
} {
  if (item.type === 'fabric') {
    return { to: '/knowledge', state: { tab: 'fabric', fabricId: item.id } }
  }
  return { to: '/knowledge', state: { tab: 'product', productId: item.id } }
}
