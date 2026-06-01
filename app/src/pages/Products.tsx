import { useState, useMemo, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, Package } from 'lucide-react'
import { recordRecentLearning } from '../lib/recentLearningStorage'
import { productService } from '../services/productService'
import type { ProductData } from '../types/product'
import { useOverlayBack } from '../hooks/use-overlay-back'
import { useIsMobile } from '../hooks/use-mobile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductDetailPanel from '../components/ProductDetailPanel'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { Drawer, DrawerContent, DrawerTitle } from '../components/ui/drawer'

function ProductGridImage({ product }: { product: ProductData }) {
  const [failed, setFailed] = useState(false)
  if (!product.imageUrl || failed) {
    return <Package size={40} className="text-[#D9D9D9]" />
  }
  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}

// ---- 编码对照表 ----
const YEAR_MAP: Record<string, string> = {
  '10': '2024', '11': '2025', '12': '2026', '13': '2027',
  '14': '2028', '15': '2029', '16': '2030',
}
const SEASON_MAP: Record<string, string> = {
  '1': '春季', '2': '夏季', '3': '秋季', '4': '冬季',
}
const CATEGORY_MAP: Record<string, string> = {
  'DA': 'T恤', 'DD': 'T恤',
  'AA': '衬衫',
  'WA': '毛衣',
  'BH': '休闲裤', 'BE': '休闲裤', 'BC': '休闲裤', 'BB': '休闲裤', 'BA': '休闲裤', 'BD': '休闲裤',
  'ED': '牛仔裤', 'EC': '牛仔裤', 'EA': '牛仔裤', 'EH': '牛仔裤', 'EB': '牛仔裤', 'EE': '牛仔裤',
  'XB': '鞋类', 'XA': '鞋类',
}

const yearOptions = ['全部', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
const seasonOptions = ['全部', '春季', '夏季', '秋季', '冬季']
const categoryOptions = ['全部', 'T恤', '衬衫', '毛衣', '休闲裤', '牛仔裤', '鞋类']
const styleOptions = ['全部', '生活', '通勤', '运动', '高端']
const PAGE_SIZE = 24

// 从货号解析年份
function parseYearFromCode(code: string): string {
  return YEAR_MAP[code.slice(0, 2)] || ''
}
// 从货号解析季节
function parseSeasonFromCode(code: string): string {
  return SEASON_MAP[code.slice(2, 3)] || ''
}
// 从货号解析品类
function parseCategoryFromCode(code: string): string {
  if (code.length < 5) return ''
  return CATEGORY_MAP[code.slice(3, 5)] || ''
}

export default function Products() {
  useDocumentTitle('商品速查')
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useIsMobile()
  const initialProductId = (location.state as { productId?: number } | null)?.productId
  const [searchText, setSearchText] = useState('')
  const [filterYear, setFilterYear] = useState('全部')
  const [filterSeason, setFilterSeason] = useState('全部')
  const [filterCategory, setFilterCategory] = useState('全部')
  const [filterStyle, setFilterStyle] = useState('全部')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const openProduct = (product: ProductData) => {
    setSelectedProduct(product)
    recordRecentLearning({
      type: 'product',
      id: product.id,
      title: product.name,
      subtitle: product.productCode,
    })
    setSearchParams({ code: product.productCode }, { replace: true })
  }

  const closeProduct = () => {
    setSelectedProduct(null)
    if (searchParams.has('code')) {
      const next = new URLSearchParams(searchParams)
      next.delete('code')
      setSearchParams(next, { replace: true })
    }
  }

  const { requestClose: closeProductDetail } = useOverlayBack(
    isMobile && !!selectedProduct,
    closeProduct,
    'products-detail',
  )

  useEffect(() => {
    if (initialProductId == null) return
    const p = productService.getById(initialProductId)
    if (!p) return
    setSearchText(p.productCode)
    setSelectedProduct(p)
    setSearchParams({ code: p.productCode }, { replace: true })
    window.history.replaceState({}, document.title)
  }, [initialProductId, isMobile, setSearchParams])

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) return
    const p = productService.getByCode(code)
    if (!p) return
    setSearchText(p.productCode)
    setSelectedProduct(p)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    return productService.list().filter((p) => {
      // 搜索：支持货号、名称、面料成份
      const matchSearch = searchText === '' ||
        p.productCode.toLowerCase().includes(searchText.toLowerCase()) ||
        p.name.includes(searchText) ||
        p.fabricComposition.includes(searchText)

      // 年份：从货号前两位解析
      const matchYear = filterYear === '全部' || parseYearFromCode(p.productCode) === filterYear
      // 季节：从货号第3位解析
      const matchSeason = filterSeason === '全部' || parseSeasonFromCode(p.productCode) === filterSeason
      // 品类：从货号第4-5位解析
      const matchCategory = filterCategory === '全部' || parseCategoryFromCode(p.productCode) === filterCategory
      // 风格：从DB series字段
      const matchStyle = filterStyle === '全部' || p.series === filterStyle

      return matchSearch && matchYear && matchSeason && matchCategory && matchStyle
    })
  }, [searchText, filterYear, filterSeason, filterCategory, filterStyle])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText, filterYear, filterSeason, filterCategory, filterStyle])

  const totalCount = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, currentPage])
  const activeFilterCount = [filterYear, filterSeason, filterCategory, filterStyle].filter(f => f !== '全部').length

  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-[#262626] mb-4">商品速查</h1>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-lg p-4 mb-4 products-filter-bar">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 w-full md:flex-1 md:max-w-[440px] h-10 px-3 rounded border border-[#D9D9D9] bg-white">
            <Search size={16} className="text-[#8C8C8C]" />
            <input
              type="text"
              placeholder="输入货号、商品名称、面料成份搜索..."
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-[#8C8C8C] text-[#262626]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button onClick={() => setSearchText('')}>
                <X size={14} className="text-[#8C8C8C] hover:text-[#F5222D]" />
              </button>
            )}
          </div>

          <button
            className={`flex items-center gap-2 h-10 px-4 rounded border text-sm transition-colors ${
              showFilters ? 'border-[#1890FF] text-[#1890FF] bg-[#E6F7FF]' : 'border-[#D9D9D9] text-[#595959] hover:border-[#1890FF]'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} />
            <span>筛选</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#1890FF] text-white text-xs flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              className="text-sm text-[#8C8C8C] hover:text-[#F5222D] transition-colors"
              onClick={() => {
                setFilterYear('全部')
                setFilterSeason('全部')
                setFilterCategory('全部')
                setFilterStyle('全部')
              }}
            >
              清除全部
            </button>
          )}
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#F0F0F0] space-y-4 filter-expand">
            {/* 年份 */}
            <div>
              <p className="text-sm font-medium text-[#262626] mb-2">年份</p>
              <div className="flex flex-wrap gap-2">
                {yearOptions.map((y) => (
                  <button
                    key={y}
                    className={`app-filter-chip px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filterYear === y ? 'bg-[#1890FF] text-white' : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                    }`}
                    onClick={() => setFilterYear(y)}
                  >
                    {y === '全部' ? '全部' : `${y}年`}
                  </button>
                ))}
              </div>
            </div>

            {/* 季节 */}
            <div>
              <p className="text-sm font-medium text-[#262626] mb-2">季节</p>
              <div className="flex flex-wrap gap-2">
                {seasonOptions.map((s) => (
                  <button
                    key={s}
                    className={`app-filter-chip px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filterSeason === s ? 'bg-[#1890FF] text-white' : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                    }`}
                    onClick={() => setFilterSeason(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 品类 */}
            <div>
              <p className="text-sm font-medium text-[#262626] mb-2">品类</p>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((c) => (
                  <button
                    key={c}
                    className={`app-filter-chip px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filterCategory === c ? 'bg-[#1890FF] text-white' : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                    }`}
                    onClick={() => setFilterCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 风格 */}
            <div>
              <p className="text-sm font-medium text-[#262626] mb-2">风格</p>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map((s) => (
                  <button
                    key={s}
                    className={`app-filter-chip px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filterStyle === s ? 'bg-[#1890FF] text-white' : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                    }`}
                    onClick={() => setFilterStyle(s)}
                  >
                    {s === '全部' ? '全部' : `${s}风格`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-[#595959]">
          <span>
            找到 <span className="text-[#1890FF] font-bold">{totalCount}</span> 件商品
            {totalPages > 1 && (
              <span className="text-[#8C8C8C] ml-2">
                第 {currentPage}/{totalPages} 页
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 md:gap-4">
        {paginatedProducts.map((product) => {
          const year = parseYearFromCode(product.productCode)
          const season = parseSeasonFromCode(product.productCode)
          const category = parseCategoryFromCode(product.productCode)

          return (
            <div
              key={product.id}
              className="product-card bg-white rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openProduct(product)}
            >
              {/* Image */}
              <div className="aspect-[3/4] bg-[#F5F5F5] flex items-center justify-center overflow-hidden relative">
                <ProductGridImage product={product} />
                {/* Tags overlay */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {year && (
                    <span className="px-2 py-0.5 bg-[#1890FF]/90 text-white text-xs rounded">{year}</span>
                  )}
                  {season && (
                    <span className="px-2 py-0.5 bg-[#52C41A]/90 text-white text-xs rounded">{season}</span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 bg-[#FAAD14]/90 text-white text-xs rounded">{product.series}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-medium text-[#1890FF]">{product.productCode}</span>
                  {category && (
                    <span className="text-xs px-1.5 py-0.5 bg-[#F5F5F5] text-[#8C8C8C] rounded">{category}</span>
                  )}
                </div>
                <div className="text-sm font-medium text-[#262626] truncate">{product.name}</div>
                <div className="text-xs text-[#8C8C8C] mt-1 truncate">{product.fabricComposition}</div>
              </div>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && totalCount > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6 app-pagination pb-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="app-pagination-btn h-10 min-w-[5rem] px-4 rounded-lg border border-[#D9D9D9] text-sm text-[#595959] disabled:opacity-40 active:bg-[#F5F5F5] transition-colors"
          >
            上一页
          </button>
          <span className="text-sm text-[#8C8C8C] px-2 tabular-nums">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="app-pagination-btn h-10 min-w-[5rem] px-4 rounded-lg border border-[#D9D9D9] text-sm text-[#595959] disabled:opacity-40 active:bg-[#F5F5F5] transition-colors"
          >
            下一页
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Package size={48} className="text-[#D9D9D9]" />
          <p className="text-sm text-[#8C8C8C] mt-4">未找到匹配的商品</p>
          <button
            className="mt-2 text-sm text-[#1890FF] hover:underline"
            onClick={() => {
              setSearchText('')
              setFilterYear('全部')
              setFilterSeason('全部')
              setFilterCategory('全部')
              setFilterStyle('全部')
            }}
          >
            清除筛选条件
          </button>
        </div>
      )}

      {isMobile ? (
        <Drawer open={!!selectedProduct} onOpenChange={(open) => !open && closeProductDetail()}>
          <DrawerContent className="h-[92vh] max-h-[92vh] p-0 flex flex-col">
            {selectedProduct && (
              <>
                <DrawerTitle className="sr-only">{selectedProduct.name}</DrawerTitle>
                <div className="flex-1 min-h-0 overflow-y-auto p-4">
                  <ProductDetailPanel product={selectedProduct} isMobile />
                </div>
              </>
            )}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && closeProduct()}>
          <DialogContent className="w-[calc(100%-2rem)] max-w-[920px] sm:max-w-[920px] max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
            {selectedProduct && (
              <>
                <DialogHeader className="px-6 py-4 border-b border-[#F0F0F0] shrink-0">
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-6">
                  <ProductDetailPanel product={selectedProduct} />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
