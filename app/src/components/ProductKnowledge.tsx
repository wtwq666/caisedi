import { useState, useMemo, useEffect } from 'react'
import {
  Search,
  SlidersHorizontal,
  Package,
  Shirt,
  Palette,
  Ruler,
  Paintbrush,
  WashingMachine,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { productList } from '../data/productData'
import { recordRecentLearning } from '../lib/recentLearningStorage'
import type { ProductData } from '../types/product'
import { useOverlayBack } from '../hooks/use-overlay-back'
import { useIsMobile } from '../hooks/use-mobile'
import { Drawer, DrawerContent, DrawerTitle } from './ui/drawer'

const seasons = ['全部', '春', '夏', '秋', '冬']
const seriesList = ['全部', '生活', '通勤', '运动', '高端']
const colors = ['全部', '黑色', '白色', '米白色', '粉色', '绿色', '蓝色', '灰色', '卡其色', '藏青色']

type ProductKnowledgeProps = {
  className?: string
  initialProductId?: number
}

function ProductKnowledgeDetail({ product }: { product: ProductData }) {
  const infoCards = [
    { label: '季节', value: product.season, icon: Sparkles },
    { label: '颜色', value: product.color, icon: Palette },
    { label: '系列', value: product.series, icon: Package },
    { label: '版型', value: product.fitType, icon: Ruler },
    { label: '领型', value: product.collarType, icon: Shirt },
    { label: '肩型', value: product.shoulderType, icon: Shirt },
    { label: '廓形', value: product.silhouette, icon: Ruler },
    { label: '脚口/下摆', value: product.hemType, icon: SlidersHorizontal },
  ]

  return (
    <>
      <div className="px-4 py-2.5 border-b border-[#F0F0F0] shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-[#262626] truncate">{product.name}</h2>
          <span className="px-2 py-0.5 bg-[#E6F7FF] text-[#1890FF] text-xs rounded font-medium">
            {product.productCode}
          </span>
          <span className="px-2 py-0.5 bg-[#FFF7E6] text-[#FAAD14] text-xs rounded">{product.season}</span>
          <span className="px-2 py-0.5 bg-[#F6FFED] text-[#52C41A] text-xs rounded">{product.series}系列</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[280px] md:flex-shrink-0">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover rounded-lg bg-[#F5F5F5]"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full aspect-[3/4] rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                <Package size={48} className="text-[#D9D9D9]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-5">
            <div>
              <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#1890FF]" />
                基础信息
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {infoCards.map((card) => {
                  if (!card.value) return null
                  const Icon = card.icon
                  return (
                          <div
                            key={card.label}
                            className="bg-[#F5F5F5] rounded-lg px-3 py-2.5 min-w-0"
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon size={12} className="text-[#8C8C8C] shrink-0" />
                              <span className="text-xs text-[#8C8C8C] whitespace-nowrap">{card.label}</span>
                            </div>
                            <span className="text-sm font-medium text-[#262626] leading-snug break-words">
                              {card.value}
                            </span>
                          </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
                <Shirt size={16} className="text-[#1890FF]" />
                面料信息
              </h3>
              <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-xs text-[#8C8C8C]">面料成份</span>
                  <p className="text-sm text-[#262626] mt-1 font-medium">{product.fabricComposition}</p>
                </div>
                <div>
                  <span className="text-xs text-[#8C8C8C]">面料特性</span>
                  <p className="text-sm text-[#595959] mt-1 leading-relaxed">{product.fabricDesc}</p>
                </div>
              </div>
            </div>

            {product.craftSellingPoint && (
              <div>
                <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
                  <Paintbrush size={16} className="text-[#1890FF]" />
                  工艺卖点
                </h3>
                <div className="bg-[#FFF7E6] rounded-lg p-4 border border-[#FFE7BA]">
                  <p className="text-sm text-[#595959] leading-relaxed">{product.craftSellingPoint}</p>
                </div>
              </div>
            )}

            {product.fabricCareNotes && (
              <div>
                <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
                  <WashingMachine size={16} className="text-[#1890FF]" />
                  洗护说明
                </h3>
                <div className="bg-[#F6FFED] rounded-lg p-4 border border-[#D9F7BE]">
                  <p className="text-sm text-[#595959] leading-relaxed">{product.fabricCareNotes}</p>
                </div>
              </div>
            )}

            {product.suitableScenes && (
              <div>
                <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-[#1890FF]" />
                  适合场景
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.suitableScenes.split('、').map((scene) => (
                    <span
                      key={scene}
                      className="px-3 py-1.5 bg-[#E6F7FF] text-[#1890FF] text-sm rounded-full"
                    >
                      {scene}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function ProductKnowledge({
  className = '',
  initialProductId,
}: ProductKnowledgeProps) {
  const isMobile = useIsMobile()
  const [searchText, setSearchText] = useState('')
  const [filterSeason, setFilterSeason] = useState('全部')
  const [filterSeries, setFilterSeries] = useState('全部')
  const [filterColor, setFilterColor] = useState('全部')
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      const matchSearch =
        searchText === '' ||
        p.productCode.includes(searchText) ||
        p.name.includes(searchText) ||
        p.fabricComposition.includes(searchText)
      const matchSeason = filterSeason === '全部' || p.season === filterSeason
      const matchSeries = filterSeries === '全部' || p.series === filterSeries
      const matchColor = filterColor === '全部' || p.color === filterColor
      return matchSearch && matchSeason && matchSeries && matchColor
    })
  }, [searchText, filterSeason, filterSeries, filterColor])

  const openProduct = (p: ProductData) => {
    setSelectedProduct(p)
    recordRecentLearning({
      type: 'product',
      id: p.id,
      title: p.name,
      subtitle: p.productCode,
    })
    if (isMobile) setDetailOpen(true)
  }

  const closeProduct = () => {
    setDetailOpen(false)
    if (isMobile) setSelectedProduct(null)
  }

  const { requestClose: closeProductDrawer } = useOverlayBack(
    isMobile && detailOpen && !!selectedProduct,
    closeProduct,
    'knowledge-product-detail',
  )

  useEffect(() => {
    if (initialProductId == null) return
    const p = productList.find((item) => item.id === initialProductId)
    if (!p) return
    setFilterSeries(p.series)
    setSelectedProduct(p)
    if (isMobile) setDetailOpen(true)
  }, [initialProductId, isMobile])

  useEffect(() => {
    if (isMobile || initialProductId != null) return
    if (!selectedProduct && filteredProducts.length > 0) {
      setSelectedProduct(filteredProducts[0])
    }
  }, [filteredProducts, selectedProduct, initialProductId, isMobile])

  const displayProduct =
    selectedProduct ?? (!isMobile ? filteredProducts[0] ?? null : null)

  const listHighlightId = displayProduct?.id

  return (
    <>
      <div
        className={`flex flex-col md:flex-row gap-3 md:flex-1 md:min-h-0 md:h-full ${className}`}
      >
        <div className="w-full md:w-[300px] lg:w-[320px] md:flex-shrink-0 flex flex-col gap-2 md:min-h-0 md:max-h-full">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 h-9 px-3 rounded border border-[#D9D9D9] bg-white mb-2">
              <Search size={14} className="text-[#8C8C8C]" />
              <input
                type="text"
                placeholder="搜索货号、名称、面料..."
                className="flex-1 text-sm bg-transparent outline-none placeholder:text-[#8C8C8C] text-[#262626]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-[#1890FF] hover:underline min-h-[32px]"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={12} />
              {showFilters ? '收起筛选' : '展开筛选'}
            </button>
            {showFilters && (
              <div className="mt-2 space-y-2">
                <div>
                  <p className="text-xs text-[#8C8C8C] mb-1">季节</p>
                  <div className="flex flex-wrap gap-1">
                    {seasons.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`px-2.5 py-1 rounded text-xs transition-colors min-h-[32px] ${
                          filterSeason === s
                            ? 'bg-[#1890FF] text-white'
                            : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                        }`}
                        onClick={() => setFilterSeason(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#8C8C8C] mb-1">系列</p>
                  <div className="flex flex-wrap gap-1">
                    {seriesList.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`px-2.5 py-1 rounded text-xs transition-colors min-h-[32px] ${
                          filterSeries === s
                            ? 'bg-[#1890FF] text-white'
                            : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                        }`}
                        onClick={() => setFilterSeries(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#8C8C8C] mb-1">颜色</p>
                  <div className="flex flex-wrap gap-1">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`px-2.5 py-1 rounded text-xs transition-colors min-h-[32px] ${
                          filterColor === c
                            ? 'bg-[#1890FF] text-white'
                            : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF]'
                        }`}
                        onClick={() => setFilterColor(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg flex-1 min-h-[200px] md:min-h-0 overflow-hidden flex flex-col">
            <div className="px-3 py-2 border-b border-[#F0F0F0] flex items-center justify-between shrink-0">
              <span className="text-sm font-medium text-[#262626]">商品列表</span>
              <span className="text-xs text-[#8C8C8C]">{filteredProducts.length} 件</span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                    listHighlightId === p.id
                      ? 'bg-[#E6F7FF] text-[#1890FF]'
                      : 'text-[#595959] hover:bg-[#F5F5F5]'
                  }`}
                  onClick={() => openProduct(p)}
                >
                  <div className="flex items-center gap-2">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded object-cover bg-[#F5F5F5] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                        <Package size={16} className="text-[#D9D9D9]" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{p.name}</div>
                      <div className="text-xs mt-0.5 flex items-center gap-1">
                        <span className="truncate">{p.productCode}</span>
                        <span className="text-[#8C8C8C]">·</span>
                        <span>{p.season}</span>
                        <span className="text-[#8C8C8C]">·</span>
                        <span className="px-1 py-0 rounded bg-[#F5F5F5]">{p.series}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 min-w-0 min-h-0 bg-white rounded-lg flex-col overflow-hidden">
          {displayProduct ? (
            <ProductKnowledgeDetail product={displayProduct} />
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-[#8C8C8C]">
              请选择商品查看详情
            </div>
          )}
        </div>
      </div>

      <Drawer
        open={detailOpen && !!selectedProduct}
        onOpenChange={(open) => {
          if (!open) closeProductDrawer()
        }}
      >
        <DrawerContent className="h-[92vh] max-h-[92vh] p-0 flex flex-col">
          {selectedProduct && (
            <>
              <DrawerTitle className="sr-only">{selectedProduct.name}</DrawerTitle>
              <ProductKnowledgeDetail product={selectedProduct} />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
