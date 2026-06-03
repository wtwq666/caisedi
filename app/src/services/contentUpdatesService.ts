import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'
import {
  buildRecentContentUpdates,
  type ContentUpdateItem,
} from '../lib/recentContentUpdates'

let cache: ContentUpdateItem[] = []

export const contentUpdatesService = {
  list(): ContentUpdateItem[] {
    if (USE_MOCK) return buildRecentContentUpdates()
    return cache
  },

  async fetchAll(params?: {
    action?: string
    type?: string
    q?: string
    limit?: number
  }): Promise<ContentUpdateItem[]> {
    if (USE_MOCK) {
      return buildRecentContentUpdates()
    }
    const qs = new URLSearchParams()
    if (params?.action && params.action !== 'all') qs.set('action', params.action)
    if (params?.type && params.type !== 'all') qs.set('type', params.type)
    if (params?.q) qs.set('q', params.q)
    if (params?.limit) qs.set('limit', String(params.limit))
    const query = qs.toString() ? `?${qs}` : ''
    cache = await apiRequest<ContentUpdateItem[]>(`/content-updates${query}`)
    return cache
  },
}
