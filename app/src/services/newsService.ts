import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'
import { getNewsItems } from '../lib/catalogStore'
import type { NewsItem } from '../data/newsData'
import {
  getNewsViewCount,
  getUnreadNewsCount,
  getUnreadNewsIds,
  incrementNewsView,
  isNewsRead,
  markNewsRead,
} from '../lib/newsReadStorage'

let apiReadIds: string[] | null = null
const viewCountCache = new Map<string, number>()

async function refreshReadStatus(): Promise<void> {
  if (USE_MOCK) return
  try {
    const res = await apiRequest<{ readIds: string[]; unreadCount: number }>('/news/read-status')
    apiReadIds = res.readIds
  } catch (err) {
    console.error('[news] read-status failed', err)
    apiReadIds = []
  }
}

export const newsService = {
  list(): NewsItem[] {
    return getNewsItems()
  },

  getById(id: string): NewsItem | undefined {
    return getNewsItems().find((n) => n.id === id)
  },

  isRead(id: string): boolean {
    if (!USE_MOCK && apiReadIds) return apiReadIds.includes(id)
    return isNewsRead(id)
  },

  markRead(id: string): void {
    if (USE_MOCK) {
      markNewsRead(id)
      return
    }
    void apiRequest(`/news/${id}/read`, { method: 'POST' })
      .then(() => {
        if (apiReadIds && !apiReadIds.includes(id)) apiReadIds.push(id)
      })
      .catch((err) => console.error('[news] mark read failed', err))
  },

  unreadCount(): number {
    const ids = getNewsItems().map((n) => n.id)
    if (!USE_MOCK && apiReadIds) {
      return ids.filter((id) => !apiReadIds!.includes(id)).length
    }
    return getUnreadNewsCount(ids)
  },

  unreadIds(): string[] {
    const ids = getNewsItems().map((n) => n.id)
    if (!USE_MOCK && apiReadIds) {
      return ids.filter((id) => !apiReadIds!.includes(id))
    }
    return getUnreadNewsIds(ids)
  },

  getViewCount(id: string, baseViews: number): number {
    if (!USE_MOCK && viewCountCache.has(id)) return viewCountCache.get(id)!
    return getNewsViewCount(id, baseViews)
  },

  recordView(id: string, baseViews: number): number {
    if (!USE_MOCK) {
      void apiRequest<{ viewCount: number }>(`/news/${id}/view`, { method: 'POST' })
        .then((res) => viewCountCache.set(id, res.viewCount))
        .catch((err) => console.error('[news] view count failed', err))
      return viewCountCache.get(id) ?? baseViews
    }
    return incrementNewsView(id, baseViews)
  },

  async initReadStatus(): Promise<void> {
    await refreshReadStatus()
  },
}
