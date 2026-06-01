import { useState } from 'react'
import {
  Package,
  Shirt,
  Palette,
  Ruler,
  MapPin,
  WashingMachine,
  Paintbrush,
  SlidersHorizontal,
  Copy,
} from 'lucide-react'
import { toast } from 'sonner'
import type { ProductData } from '../types/product'

const YEAR_MAP: Record<string, string> = {
  '10': '2024', '11': '2025', '12': '2026', '13': '2027',
  '14': '2028', '15': '2029', '16': '2030',
}
const SEASON_MAP: Record<string, string> = {
  '1': '春季', '2': '夏季', '3': '秋季', '4': '冬季',
}
const CATEGORY_MAP: Record<string, string> = {
  'DA': 'T恤', 'DD': 'T恤', 'AA': '衬衫', 'WA': '毛衣',
  'BH': '休闲裤', 'BE': '休闲裤', 'BC': '休闲裤', 'BB': '休闲裤', 'BA': '休闲裤', 'BD': '休闲裤',
  'ED': '牛仔裤', 'EC': '牛仔裤', 'EA': '牛仔裤', 'EH': '牛仔裤', 'EB': '牛仔裤', 'EE': '牛仔裤',
  'XB': '鞋类', 'XA': '鞋类',
}

function parseYearFromCode(code: string) {
  return YEAR_MAP[code.slice(0, 2)] || ''
}
function parseSeasonFromCode(code: string) {
  return SEASON_MAP[code.slice(2, 3)] || ''
}
function parseCategoryFromCode(code: string) {
  if (code.length < 5) return ''
  return CATEGORY_MAP[code.slice(3, 5)] || ''
}

type ProductDetailPanelProps = {
  product: ProductData
  isMobile?: boolean
}

const mobileTabs = [
  { key: 'basic', label: '基础信息' },
  { key: 'fabric', label: '面料工艺' },
  { key: 'care', label: '洗护场景' },
] as const

type MobileTab = (typeof mobileTabs)[number]['key']

function ProductImage({ product }: { product: ProductData }) {
  const [failed, setFailed] = useState(false)

  if (!product.imageUrl || failed) {
    return (
      <div className="w-full aspect-[3/4] rounded-lg bg-[#F5F5F5] flex items-center justify-center">
        <Package size={48} className="text-[#D9D9D9]" />
      </div>
    )
  }

  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full aspect-[3/4] object-cover rounded-lg bg-[#F5F5F5]"
      onError={() => setFailed(true)}
    />
  )
}

export default function ProductDetailPanel({ product, isMobile }: ProductDetailPanelProps) {
  const [mobileTab, setMobileTab] = useState<MobileTab>('basic')

  const copyCode = () => {
    navigator.clipboard.writeText(product.productCode).then(
      () => toast.success('货号已复制'),
      () => toast.error('复制失败，请手动复制')
    )
  }

  const basicSection = (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-[#E6F7FF] text-primary text-sm rounded font-medium font-mono">
          {product.productCode}
        </span>
        {parseYearFromCode(product.productCode) && (
          <span className="px-3 py-1 bg-[#E6F7FF] text-primary text-sm rounded-full">
            {parseYearFromCode(product.productCode)}年
          </span>
        )}
        {parseSeasonFromCode(product.productCode) && (
          <span className="px-3 py-1 bg-[#F6FFED] text-[#52C41A] text-sm rounded-full">
            {parseSeasonFromCode(product.productCode)}
          </span>
        )}
        {parseCategoryFromCode(product.productCode) && (
          <span className="px-3 py-1 bg-[#FFF7E6] text-[#FAAD14] text-sm rounded-full">
            {parseCategoryFromCode(product.productCode)}
          </span>
        )}
        <span className="px-3 py-1 bg-[#FFF2F0] text-[#F5222D] text-sm rounded-full">{product.series}风格</span>
        <span className="px-3 py-1 bg-[#F5F5F5] text-[#595959] text-sm rounded-full">{product.color}</span>
      </div>
      <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-primary" />
        基础信息
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: '版型', value: product.fitType, icon: Ruler },
          { label: '领型', value: product.collarType, icon: Shirt },
          { label: '肩型', value: product.shoulderType, icon: Shirt },
          { label: '廓形', value: product.silhouette, icon: Ruler },
          { label: '下摆', value: product.hemType, icon: Ruler },
          { label: '颜色', value: product.color, icon: Palette },
        ].map((card) => {
          if (!card.value) return null
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-[#FAFAFA] rounded-lg px-3 py-2.5 border border-[#F0F0F0] min-w-0"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className="text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">{card.label}</span>
              </div>
              <span className="text-sm font-medium text-[#262626] leading-snug break-words">
                {card.value}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )

  const fabricSection = (
    <>
      <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
        <Shirt size={16} className="text-primary" />
        面料信息
      </h3>
      <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#F0F0F0] space-y-4">
        <div>
          <span className="text-xs text-muted-foreground">面料成份</span>
          <p className="text-sm text-[#262626] mt-1.5 font-medium leading-relaxed break-words">
            {product.fabricComposition}
          </p>
        </div>
        {product.fabricDesc && product.fabricDesc !== product.fabricComposition && (
          <div>
            <span className="text-xs text-muted-foreground">面料特性</span>
            <p className="text-sm text-[#595959] mt-1.5 leading-relaxed break-words">
              {product.fabricDesc}
            </p>
          </div>
        )}
      </div>
      {product.craftSellingPoint && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
            <Paintbrush size={16} className="text-primary" />
            工艺卖点
          </h3>
          <div className="bg-[#FFF7E6] rounded-xl p-4 border border-[#FFE7BA]">
            <p className="text-sm text-[#595959] leading-relaxed">{product.craftSellingPoint}</p>
          </div>
        </div>
      )}
    </>
  )

  const careSection = (
    <>
      {product.fabricCareNotes && (
        <div>
          <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
            <WashingMachine size={16} className="text-primary" />
            洗护说明
          </h3>
          <div className="bg-[#F6FFED] rounded-xl p-4 border border-[#D9F7BE]">
            <p className="text-sm text-[#595959] leading-relaxed">{product.fabricCareNotes}</p>
          </div>
        </div>
      )}
      {product.suitableScenes && (
        <div className={product.fabricCareNotes ? 'mt-4' : ''}>
          <h3 className="text-sm font-medium text-[#262626] mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            适合场景
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.suitableScenes.split('、').map((scene) => (
              <span key={scene} className="px-3 py-1.5 bg-[#E6F7FF] text-primary text-sm rounded-full">
                {scene}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-0">
        <ProductImage product={product} />
        <h2 className="text-lg font-semibold text-[#262626] mt-4">{product.name}</h2>
        <div className="flex gap-2 overflow-x-auto py-3 -mx-1">
          {mobileTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setMobileTab(tab.key)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm whitespace-nowrap transition-colors ${
                mobileTab === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-[#F5F5F5] text-[#595959]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
          {mobileTab === 'basic' && basicSection}
          {mobileTab === 'fabric' && fabricSection}
          {mobileTab === 'care' && careSection}
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-[#F0F0F0] md:hidden z-10">
          <button
            type="button"
            onClick={copyCode}
            className="w-full flex items-center justify-center gap-2 h-11 bg-primary text-white text-sm font-medium rounded-lg"
          >
            <Copy size={16} />
            复制货号
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
      <div className="w-full sm:w-[220px] lg:w-[260px] shrink-0 mx-auto sm:mx-0 max-w-[280px] sm:max-w-none">
        <ProductImage product={product} />
      </div>
      <div className="flex-1 space-y-5 min-w-0 sm:min-w-[280px]">
        {basicSection}
        {fabricSection}
        {careSection}
        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-2 px-4 h-9 text-sm text-primary border border-primary rounded-lg hover:bg-[#E6F7FF] transition-colors w-fit"
        >
          <Copy size={14} />
          复制货号
        </button>
      </div>
    </div>
  )
}
