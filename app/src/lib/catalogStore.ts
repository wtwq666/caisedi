import { apiRequest } from '../api/client'

import { USE_MOCK } from '../api/config'

import { fabricList } from '../data/fabricData'

import { productList } from '../data/productData'

import { newsItems, type NewsItem } from '../data/newsData'

import type { ProductData } from '../types/product'

import type { FabricData } from '../types/fabric'

import { FABRIC_QUIZ_TAG_OPTIONS } from '../constants/fabricCategoryTaxonomy'
import { getAssetUrl } from './getAssetUrl'
import { invalidateQuizPool } from './knowledgeQuizPool'



let productsCache: ProductData[] | null = null

let fabricsCache: FabricData[] | null = null

let newsCache: NewsItem[] | null = null

let initPromise: Promise<void> | null = null

let lastError: string | null = null



export function isCatalogReady(): boolean {

  return USE_MOCK || (productsCache !== null && fabricsCache !== null && newsCache !== null)

}



export function getCatalogLoadError(): string | null {

  return lastError

}



export async function ensureCatalog(): Promise<void> {

  if (USE_MOCK) return

  if (initPromise) return initPromise

  lastError = null

  initPromise = (async () => {

    try {

      const [products, fabrics, news] = await Promise.all([

        apiRequest<ProductData[]>('/products'),

        apiRequest<FabricData[]>('/fabrics'),

        apiRequest<NewsItem[]>('/news'),

      ])

      productsCache = products.map((p) => ({

        ...p,

        imageUrl: p.imageUrl ? getAssetUrl(p.imageUrl) : p.imageUrl,

      }))

      fabricsCache = fabrics

      newsCache = news.map((n) => {

        const item = n as NewsItem & { viewCount?: number }

        return {

          ...item,

          coverImage: item.coverImage ? getAssetUrl(item.coverImage) : item.coverImage,

          views: item.viewCount ?? item.views ?? 0,

          tagColor: item.tagColor || 'bg-[#F5F5F5] text-[#595959]',

        } as NewsItem

      })

      invalidateQuizPool()

    } catch (e) {

      lastError = e instanceof Error ? e.message : '无法加载资料库'

      initPromise = null

      throw e

    }

  })()

  return initPromise

}



export function getProducts(): ProductData[] {

  return USE_MOCK ? productList : (productsCache ?? [])

}



export function getFabrics(): FabricData[] {

  return USE_MOCK ? fabricList : (fabricsCache ?? [])

}



export function getNewsItems(): NewsItem[] {

  if (USE_MOCK) return newsItems

  return (newsCache ?? []) as NewsItem[]

}



/** @deprecated 面料分类已改为多级树，请使用 fabricCategoryTaxonomy */
export function getFabricCategoryFilters(): { key: string; label: string }[] {
  return FABRIC_QUIZ_TAG_OPTIONS
}



export function invalidateCatalog(): void {

  productsCache = null

  fabricsCache = null

  newsCache = null

  initPromise = null

  lastError = null

  invalidateQuizPool()

}


