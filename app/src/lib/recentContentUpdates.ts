import { resolveFabricSubCategory } from '../constants/fabricCategoryTaxonomy'
import { brandIntroDocs } from '../data/brandIntroData'
import { fabricList } from '../data/fabricData'
import { managementDocs } from '../data/managementData'
import { newsItems } from '../data/newsData'
import { newStaffDocs } from '../data/newStaffData'
import { productList } from '../data/productData'
import { salesScriptDocs } from '../data/salesScriptData'
import { storeImageDocs } from '../data/storeImageData'
import { storeShowcaseAlbums } from '../data/storeShowcaseData'
import { trainingDocs } from '../data/trainingData'

export type ContentUpdateType = '通知' | '文档' | '商品' | '面料' | '门店'
export type ContentUpdateAction = '新增' | '修改'

export type ContentUpdateItem = {
  id: string
  type: ContentUpdateType
  action: ContentUpdateAction
  title: string
  subtitle?: string
  /** 展示用 YYYY/MM/DD */
  dateLabel: string
  sortKey: number
  to: string
  state?: Record<string, unknown>
}

const TYPE_BADGE: Record<ContentUpdateType, string> = {
  通知: 'bg-[#FFF1F0] text-[#CF1322]',
  文档: 'bg-[#E6F7FF] text-[#1890FF]',
  商品: 'bg-[#F6FFED] text-[#52C41A]',
  面料: 'bg-[#FFF7E6] text-[#D48806]',
  门店: 'bg-[#F9F0FF] text-[#722ED1]',
}

const ACTION_BADGE: Record<ContentUpdateAction, string> = {
  新增: 'bg-[#F6FFED] text-[#389E0D]',
  修改: 'bg-[#FFF7E6] text-[#D48806]',
}

export function getContentUpdateTypeBadge(type: ContentUpdateType): string {
  return TYPE_BADGE[type]
}

export function getContentUpdateActionBadge(action: ContentUpdateAction): string {
  return ACTION_BADGE[action]
}

function toSortKey(isoDate: string): number {
  const normalized = isoDate.replace(/\//g, '-').slice(0, 10)
  const t = Date.parse(normalized)
  return Number.isNaN(t) ? 0 : t
}

function formatDateLabel(isoDate: string): string {
  return isoDate.replace(/-/g, '/').slice(0, 10)
}

function parsePublishTime(publishTime: string): { sortKey: number; dateLabel: string } {
  const d = new Date(publishTime.replace(' ', 'T'))
  const sortKey = d.getTime()
  const dateLabel = Number.isNaN(sortKey)
    ? publishTime.slice(0, 10).replace(/-/g, '/')
    : `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
  return { sortKey, dateLabel }
}

/** 培训/制度等文档的上架或修订日期（资料更新，非系统版本） */
const DOC_UPDATED_AT: Record<
  string,
  { tab: string; updatedAt: string; action: ContentUpdateAction }
> = {
  s3: { tab: 'store-image', updatedAt: '2026-05-27', action: '新增' },
  s1: { tab: 'store-image', updatedAt: '2026-04-10', action: '新增' },
  s2: { tab: 'store-image', updatedAt: '2026-04-10', action: '新增' },
  m1: { tab: 'management', updatedAt: '2026-01-15', action: '新增' },
  m2: { tab: 'management', updatedAt: '2026-04-18', action: '修改' },
  m3: { tab: 'management', updatedAt: '2026-04-18', action: '修改' },
  b1: { tab: 'brand', updatedAt: '2026-02-01', action: '新增' },
  '1': { tab: 'manager', updatedAt: '2026-03-01', action: '新增' },
  '5': { tab: 'manager', updatedAt: '2026-04-05', action: '修改' },
  ss1: { tab: 'sales', updatedAt: '2026-03-20', action: '新增' },
  ns1: { tab: 'new-staff', updatedAt: '2026-02-15', action: '新增' },
}

const ALL_DOCS = [
  ...storeImageDocs.map((d) => ({ ...d, tab: 'store-image' as const })),
  ...managementDocs.map((d) => ({ ...d, tab: 'management' as const })),
  ...brandIntroDocs.map((d) => ({ ...d, tab: 'brand' as const })),
  ...trainingDocs.map((d) => ({ ...d, tab: 'manager' as const })),
  ...salesScriptDocs.map((d) => ({ ...d, tab: 'sales' as const })),
  ...newStaffDocs.map((d) => ({ ...d, tab: 'new-staff' as const })),
]

function buildDocumentUpdates(): ContentUpdateItem[] {
  return ALL_DOCS.flatMap((doc) => {
    const meta = DOC_UPDATED_AT[doc.id]
    if (!meta) return []
    const verb = meta.action === '修改' ? '更新' : '新增'
    return [
      {
        id: `doc-${doc.id}`,
        type: '文档' as const,
        action: meta.action,
        title: `${verb}培训文档：${doc.title}`,
        subtitle: doc.category,
        dateLabel: formatDateLabel(meta.updatedAt),
        sortKey: toSortKey(meta.updatedAt),
        to: '/knowledge',
        state: { tab: meta.tab, docId: doc.id },
      },
    ]
  })
}

function buildProductBatchUpdate(): ContentUpdateItem {
  const seasons = new Set(productList.map((p) => `${p.season}`))
  const seasonText = [...seasons].slice(0, 3).join('、') || '多季节'
  return {
    id: 'products-2026-batch',
    type: '商品',
    action: '新增',
    title: '2026 春夏商品资料上新',
    subtitle: `共 ${productList.length} 款，含${seasonText}等`,
    dateLabel: '2026/03/15',
    sortKey: toSortKey('2026-03-15'),
    to: '/products',
  }
}

function buildFabricBatchUpdate(): ContentUpdateItem {
  const categories = new Set(fabricList.map((f) => resolveFabricSubCategory(f)))
  return {
    id: 'fabric-library',
    type: '面料',
    action: '修改',
    title: '面料知识库更新',
    subtitle: `${fabricList.length} 种面料 · ${categories.size} 个分类`,
    dateLabel: '2026/02/20',
    sortKey: toSortKey('2026-02-20'),
    to: '/knowledge',
    state: { tab: 'fabric' },
  }
}

export function buildRecentContentUpdates(): ContentUpdateItem[] {
  const items: ContentUpdateItem[] = []

  for (const note of newsItems) {
    const { sortKey, dateLabel } = parsePublishTime(note.publishTime)
    items.push({
      id: `news-${note.id}`,
      type: '通知',
      action: '新增',
      title: note.title,
      subtitle: note.author,
      dateLabel,
      sortKey,
      to: `/news/${note.id}`,
    })
  }

  for (const album of storeShowcaseAlbums) {
    items.push({
      id: `album-${album.id}`,
      type: '门店',
      action: '新增',
      title: `门店风采：${album.title}`,
      subtitle: album.location,
      dateLabel: formatDateLabel(album.date),
      sortKey: toSortKey(album.date),
      to: '/knowledge',
      state: { tab: 'store-image', albumId: album.id },
    })
  }

  items.push(...buildDocumentUpdates())
  items.push(buildProductBatchUpdate())
  items.push(buildFabricBatchUpdate())

  return items.sort((a, b) => b.sortKey - a.sortKey)
}

export function getRecentContentUpdates(limit?: number): ContentUpdateItem[] {
  const all = buildRecentContentUpdates()
  return limit != null ? all.slice(0, limit) : all
}
