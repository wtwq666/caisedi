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
  /** 用于模糊匹配 */
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
  groupLabel: GlobalSearchGroup = '文档',
) {
  for (const doc of docTabMap[tab]) {
    items.push({
      id: `doc-${tab}-${doc.id}`,
      group: groupLabel,
      title: doc.title,
      subtitle: doc.category,
      searchText: [doc.title, doc.description, doc.category, ...doc.tags].join(' '),
      navigate: { type: 'knowledge', tab, docId: doc.id },
    })
  }
}

export function buildGlobalSearchIndex(): GlobalSearchItem[] {
  const items: GlobalSearchItem[] = []

  for (const p of productList) {
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

  for (const f of fabricList) {
    items.push({
      id: `fabric-${f.id}`,
      group: '面料',
      title: f.fabricName,
      subtitle: `${f.fabricCode} · ${f.category}`,
      searchText: [f.fabricName, f.fabricCode, f.category, f.summary].join(' '),
      navigate: { type: 'fabric', fabricId: f.id },
    })
  }

  for (const n of newsItems) {
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

export function filterGlobalSearch(items: GlobalSearchItem[], query: string): GlobalSearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return items.slice(0, 12)
  const terms = q.split(/\s+/).filter(Boolean)
  return items
    .filter((item) => {
      const hay = item.searchText.toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
    .slice(0, 40)
}

export const globalSearchGroups: GlobalSearchGroup[] = ['商品', '面料', '新闻', '文档', '门店']
