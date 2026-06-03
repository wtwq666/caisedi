import { useEffect, useState } from 'react'
import { documentService, type DocumentDto } from '../services/documentService'

export function useDocuments(tab: string) {
  const [docs, setDocs] = useState<DocumentDto[]>(() => documentService.list(tab))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    documentService
      .fetchList(tab)
      .then(setDocs)
      .finally(() => setLoading(false))
  }, [tab])

  return { docs, loading }
}
