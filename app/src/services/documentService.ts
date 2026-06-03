import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'
import { brandIntroDocs } from '../data/brandIntroData'
import { managementDocs } from '../data/managementData'
import { newStaffDocs } from '../data/newStaffData'
import { salesScriptDocs } from '../data/salesScriptData'
import { storeImageDocs } from '../data/storeImageData'
import { trainingDocs } from '../data/trainingData'
import { getTrainingDocUrl, resolveDocumentFileUrl } from '../lib/getAssetUrl'

export type DocumentDto = {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'pdf' | 'docx' | 'pptx' | 'xls'
  fileSize: string
  category: string
  tags: string[]
  tab: string
  fileUrl: string
}

const MOCK_BY_TAB: Record<string, DocumentDto[]> = {
  management: managementDocs.map((d) => ({ ...d, tab: 'management', fileUrl: getTrainingDocUrl(d.filename) })),
  brand: brandIntroDocs.map((d) => ({ ...d, tab: 'brand', fileUrl: getTrainingDocUrl(d.filename) })),
  'store-image': storeImageDocs.map((d) => ({ ...d, tab: 'store-image', fileUrl: getTrainingDocUrl(d.filename) })),
  manager: trainingDocs.map((d) => ({ ...d, tab: 'manager', fileUrl: getTrainingDocUrl(d.filename) })),
  sales: salesScriptDocs.map((d) => ({ ...d, tab: 'sales', fileUrl: getTrainingDocUrl(d.filename) })),
  'new-staff': newStaffDocs.map((d) => ({ ...d, tab: 'new-staff', fileUrl: getTrainingDocUrl(d.filename) })),
}

const cache: Partial<Record<string, DocumentDto[]>> = {}

export const documentService = {
  list(tab: string): DocumentDto[] {
    if (USE_MOCK) return MOCK_BY_TAB[tab] ?? []
    return cache[tab] ?? []
  },

  async fetchList(tab: string): Promise<DocumentDto[]> {
    if (USE_MOCK) return MOCK_BY_TAB[tab] ?? []
    const items = await apiRequest<DocumentDto[]>(`/documents?tab=${encodeURIComponent(tab)}`)
    cache[tab] = items.map((d) => ({
      ...d,
      fileUrl: resolveDocumentFileUrl(d),
    }))
    return cache[tab]
  },

  getById(tab: string, id: string): DocumentDto | undefined {
    return this.list(tab).find((d) => d.id === id)
  },
}
