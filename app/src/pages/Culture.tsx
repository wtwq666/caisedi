import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Store, ChevronDown, ChevronUp, Images } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import BrandHero from '../components/BrandHero'
import PageBreadcrumb from '../components/PageBreadcrumb'
import { storeShowcaseAlbums } from '../data/storeShowcaseData'

const brandParagraphs = [
  'CAISEDI（凯施迪）始于2012年创立的国内服装设计师品牌，根植岭南沃土，以"传承与创新"为使命，将千年广府文化注入现代时尚基因。凯施迪运用"中庸之道"的理念，将恰到好处的时尚哲学与岭南文化结合，实现文化与时尚的完美融合，塑造出具有深厚文化底蕴和现代审美的品牌形象，在产品开发中保留岭南传统元素，又结合现代设计理念，推出既具有文化深度又符合当代潮流的产品。',
  '目前凯施迪已有200多家线下门店，主要分布在各主要城市大型商场，核心消费人群年龄段为 25-35 岁。凯施迪的产品细分为生活、都市、运动三大系列，真正与设计师品牌的多元化、多层次产品结构接轨。',
  '自成立之日起，致力设计研发团队建设，坚持以消费者为中心，以品牌风格为牵引，将流行的时尚元素融合于产品创新。凯施迪坚信，卓越的设计是品牌灵魂。',
]

export default function Culture() {
  useDocumentTitle('公司文化')
  const [expanded, setExpanded] = useState(false)
  const showCollapse = brandParagraphs.length > 1

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <PageBreadcrumb items={[{ label: '学习平台', to: '/' }, { label: '公司文化' }]} />

      <div>
        <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-foreground">公司文化</h1>
        <p className="app-page-local-subtitle text-sm text-muted-foreground mt-1">了解凯施迪，感受品牌温度</p>
      </div>

      <BrandHero title="品牌介绍" icon={<Heart size={20} className="text-white" />}>
        <p>{brandParagraphs[0]}</p>
        {(expanded || !showCollapse) && brandParagraphs.slice(1).map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        {showCollapse && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-sm text-white/90 hover:text-white mt-2 underline-offset-2 hover:underline"
          >
            {expanded ? (
              <>
                收起 <ChevronUp size={14} />
              </>
            ) : (
              <>
                展开更多 <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </BrandHero>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Store size={16} className="text-primary" />
          <h2 className="text-lg font-medium text-foreground">门店风采</h2>
        </div>

        {storeShowcaseAlbums.length === 0 ? (
          <div className="bg-card rounded-lg flex flex-col items-center justify-center py-16 text-center border border-[#F0F0F0] px-6">
            <Store size={48} className="text-[#D9D9D9] mb-3" />
            <p className="text-sm text-muted-foreground">暂无门店风采内容</p>
            <p className="text-xs text-muted-foreground mt-2 max-w-sm">
              门店图片与介绍将由总部统一上传，敬请期待。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {storeShowcaseAlbums.map((album) => (
              <Link
                key={album.id}
                to="/knowledge"
                state={{ tab: 'store-image', albumId: album.id }}
                className="group bg-card rounded-lg overflow-hidden border border-[#F0F0F0] hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="aspect-[16/10] bg-[#F5F5F5] overflow-hidden relative">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs">
                    <Images size={12} />
                    {album.images.length}
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-foreground line-clamp-2">{album.title}</div>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-xs text-muted-foreground truncate">{album.location}</span>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {album.date.replace(/-/g, '/')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
