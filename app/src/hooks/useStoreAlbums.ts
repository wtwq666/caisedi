import { useEffect, useState } from 'react'
import type { StoreShowcaseAlbum } from '../data/storeShowcaseData'
import { storeAlbumService } from '../services/storeAlbumService'

export function useStoreAlbums() {
  const [albums, setAlbums] = useState<StoreShowcaseAlbum[]>(() => storeAlbumService.list())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    storeAlbumService.fetchAll().then(setAlbums).finally(() => setLoading(false))
  }, [])

  return { albums, loading }
}
