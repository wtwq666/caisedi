import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'
import { storeShowcaseAlbums, type StoreShowcaseAlbum } from '../data/storeShowcaseData'
import { getAssetUrl } from '../lib/getAssetUrl'

let cache: StoreShowcaseAlbum[] | null = null

function mapMockAlbums(): StoreShowcaseAlbum[] {
  return storeShowcaseAlbums.map((a) => ({
    ...a,
    coverImage: getAssetUrl(a.coverImage),
    images: a.images.map((img) => ({ ...img, src: getAssetUrl(img.src) })),
  }))
}

export const storeAlbumService = {
  list(): StoreShowcaseAlbum[] {
    if (USE_MOCK) return mapMockAlbums()
    return cache ?? []
  },

  async fetchAll(): Promise<StoreShowcaseAlbum[]> {
    if (USE_MOCK) {
      cache = mapMockAlbums()
      return cache
    }
    const items = await apiRequest<StoreShowcaseAlbum[]>('/store-albums')
    cache = items.map((a) => ({
      ...a,
      coverImage: getAssetUrl(a.coverImage),
      images: a.images.map((img) => ({ ...img, src: getAssetUrl(img.src) })),
    }))
    return cache
  },

  getById(id: string): StoreShowcaseAlbum | undefined {
    return this.list().find((a) => a.id === id)
  },
}
