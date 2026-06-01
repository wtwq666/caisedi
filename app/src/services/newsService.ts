import { newsItems, type NewsItem } from '../data/newsData'
import {
  getNewsViewCount,
  getUnreadNewsCount,
  getUnreadNewsIds,
  incrementNewsView,
  isNewsRead,
  markNewsRead,
} from '../lib/newsReadStorage'

export const newsService = {
  list(): NewsItem[] {
    return newsItems
  },

  getById(id: string): NewsItem | undefined {
    return newsItems.find((n) => n.id === id)
  },

  isRead(id: string): boolean {
    return isNewsRead(id)
  },

  markRead(id: string): void {
    markNewsRead(id)
  },

  unreadCount(): number {
    return getUnreadNewsCount(newsItems.map((n) => n.id))
  },

  unreadIds(): string[] {
    return getUnreadNewsIds(newsItems.map((n) => n.id))
  },

  getViewCount(id: string, baseViews: number): number {
    return getNewsViewCount(id, baseViews)
  },

  recordView(id: string, baseViews: number): number {
    return incrementNewsView(id, baseViews)
  },
}
