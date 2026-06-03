import { getFabrics, getProducts, getNewsItems } from './catalogStore'
import { brandIntroDocs } from '../data/brandIntroData'
import { managementDocs } from '../data/managementData'
import { newStaffDocs } from '../data/newStaffData'
import { salesScriptDocs } from '../data/salesScriptData'
import { storeImageDocs } from '../data/storeImageData'
import { storeShowcaseAlbums } from '../data/storeShowcaseData'
import { trainingDocs } from '../data/trainingData'

export type GlobalSearchGroup = '商品' | '面料' | '新闻' | '文档' | '门店'

export type GlobalSearchNavigate =
  | { type: 'product'; productId: number }
  | { type: 'fabric'; fabricId: number }
  | { type: 'news'; newsId: string }
  | { type: 'knowledge'; tab: string; docId?: string; albumId?: string }
  | { type: 'page'; path: string }

export type GlobalSearchItem = {
  id: string
  group: GlobalSearchGroup
  title: string
  subtitle?: string
  searchText: string
  navigate: GlobalSearchNavigate
}

const docTabMap = {
  management: managementDocs,
  brand: brandIntroDocs,
  manager: trainingDocs,
  sales: salesScriptDocs,
  'new-staff': newStaffDocs,
} as const

function pushDocItems(
  items: GlobalSearchItem[],
  tab: keyof typeof docTabMap,
) {
  for (const doc of docTabMap[tab]) {
    items.push({
      id: `doc-${tab}-${doc.id}`,
      group: '文档',
      title: doc.title,
      subtitle: doc.category,
      searchText: [doc.title, doc.description, doc.category, ...doc.tags].join(' '),
      navigate: { type: 'knowledge', tab, docId: doc.id },
    })
  }
}

export function buildGlobalSearchIndex(): GlobalSearchItem[] {
  const items: GlobalSearchItem[] = []

  for (const p of getProducts()) {
    items.push({
      id: `product-${p.id}`,
      group: '商品',
      title: p.name,
      subtitle: p.productCode,
      searchText: [p.productCode, p.name, p.series, p.fabricComposition, p.color, p.season].join(
        ' ',
      ),
      navigate: { type: 'product', productId: p.id },
    })
  }

  for (const f of getFabrics()) {
    items.push({
      id: `fabric-${f.id}`,
      group: '面料',
      title: f.fabricName,
      subtitle: `${f.fabricCode} · ${f.category}`,
      searchText: [f.fabricName, f.fabricCode, f.category, f.summary].join(' '),
      navigate: { type: 'fabric', fabricId: f.id },
    })
  }

  for (const n of getNewsItems()) {
    items.push({
      id: `news-${n.id}`,
      group: '新闻',
      title: n.title,
      subtitle: n.tag,
      searchText: [n.title, n.summary, n.tag, n.author].join(' '),
      navigate: { type: 'news', newsId: n.id },
    })
  }

  pushDocItems(items, 'management')
  pushDocItems(items, 'brand')
  pushDocItems(items, 'manager')
  pushDocItems(items, 'sales')
  pushDocItems(items, 'new-staff')

  for (const doc of storeImageDocs) {
    items.push({
      id: `store-doc-${doc.id}`,
      group: '文档',
      title: doc.title,
      subtitle: doc.category,
      searchText: [doc.title, doc.description, doc.category, ...doc.tags].join(' '),
      navigate: { type: 'knowledge', tab: 'store-image', docId: doc.id },
    })
  }

  for (const album of storeShowcaseAlbums) {
    items.push({
      id: `album-${album.id}`,
      group: '门店',
      title: album.title,
      subtitle: album.location,
      searchText: [album.title, album.location, album.description, ...album.tags].join(' '),
      navigate: { type: 'knowledge', tab: 'store-image', albumId: album.id },
    })
  }

  return items
}

function scoreItem(item: GlobalSearchItem, q: string): number {
  const hay = item.searchText.toLowerCase()
  const title = item.title.toLowerCase()
  const subtitle = (item.subtitle ?? '').toLowerCase()
  const code = item.group === '商品' ? subtitle : subtitle.split(' · ')[0]?.toLowerCase() ?? ''

  let score = 0
  if (code === q) score += 120
  else if (code.startsWith(q)) score += 90
  else if (code.includes(q)) score += 70

  if (title === q) score += 80
  else if (title.startsWith(q)) score += 55
  else if (title.includes(q)) score += 40

  if (subtitle.includes(q)) score += 25
  if (hay.includes(q)) score += 15

  const terms = q.split(/\s+/).filter(Boolean)
  if (terms.length > 1 && terms.every((t) => hay.includes(t))) score += 20

  return score
}

const GROUP_ORDER: GlobalSearchGroup[] = ['商品', '面料', '新闻', '文档', '门店']
const MAX_PER_GROUP = 5
const MAX_TOTAL = 24

export function filterGlobalSearch(items: GlobalSearchItem[], query: string): GlobalSearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const ranked = items
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'zh'))

  const byGroup = new Map<GlobalSearchGroup, GlobalSearchItem[]>()
  for (const g of GROUP_ORDER) byGroup.set(g, [])

  const flat: GlobalSearchItem[] = []
  for (const { item } of ranked) {
    if (flat.length >= MAX_TOTAL) break
    const bucket = byGroup.get(item.group)!
    if (bucket.length >= MAX_PER_GROUP) continue
    bucket.push(item)
    flat.push(item)
  }

  return flat
}

export function groupSearchResults(items: GlobalSearchItem[]): Map<GlobalSearchGroup, GlobalSearchItem[]> {
  const map = new Map<GlobalSearchGroup, GlobalSearchItem[]>()
  for (const g of GROUP_ORDER) map.set(g, [])
  for (const item of items) {
    map.get(item.group)?.push(item)
  }
  return map
}

export const globalSearchGroups = GROUP_ORDER
