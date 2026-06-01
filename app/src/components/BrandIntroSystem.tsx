import { useState, useMemo } from 'react'
import { ScrollText, Search, X, Tag, BookOpen, Hash, Download, Eye } from 'lucide-react'
import { brandIntroDocs, brandIntroCategories } from '../data/brandIntroData'
import type { BrandIntroDoc } from '../data/brandIntroData'
import DocViewer from './DocViewer'
import MobileDetailBackBar from './MobileDetailBackBar'
import { useIsMobile } from '../hooks/use-mobile'
import { useMasterDetailMobile } from '../hooks/use-master-detail-mobile'

export default function BrandIntroSystem() {
  const isMobile = useIsMobile()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<BrandIntroDoc | null>(null)
  const [previewDoc, setPreviewDoc] = useState<BrandIntroDoc | null>(null)

  const filteredDocs = useMemo(() => {
    return brandIntroDocs.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchSearch = searchText === '' ||
        doc.title.includes(searchText) ||
        doc.description.includes(searchText) ||
        doc.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const downloadUrl = (doc: BrandIntroDoc) => `/training/${encodeURIComponent(doc.filename)}`

  const doc = selectedDoc || (!isMobile ? filteredDocs[0] : undefined)
  const hasMobileSelection = !!selectedDoc
  const { showList, showDetail, closeDetail } = useMasterDetailMobile(
    hasMobileSelection,
    () => setSelectedDoc(null),
    'brand-intro',
  )

  return (
    <div className="flex flex-col md:flex-row gap-4 md:h-[calc(100vh-180px)]">
      {showList && (
      <div className="w-full md:w-[380px] md:flex-shrink-0 flex flex-col gap-3">
        {/* Search */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center gap-2 h-9 px-3 rounded border border-[#D9D9D9] bg-white">
            <Search size={14} className="text-[#8C8C8C]" />
            <input
              type="text"
              placeholder="搜索文档名称、标签..."
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
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex flex-wrap gap-2">
            {brandIntroCategories.map((cat) => (
              <button
                key={cat.key}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  selectedCategory === cat.key
                    ? 'bg-[#1890FF] text-white'
                    : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF] hover:text-[#1890FF]'
                }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Document List */}
        <div className="bg-white rounded-lg flex-1 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#F0F0F0]">
            <span className="text-sm font-medium text-[#262626]">品牌文档</span>
            <span className="text-xs text-[#8C8C8C] ml-2">({filteredDocs.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredDocs.map((d) => (
              <button
                key={d.id}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  doc?.id === d.id
                    ? 'bg-[#E6F7FF] border border-[#1890FF]/30'
                    : 'hover:bg-[#F5F5F5] border border-transparent'
                }`}
                onClick={() => setSelectedDoc(d)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF7E6] flex items-center justify-center flex-shrink-0">
                    <ScrollText size={20} className="text-[#FAAD14]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-[#262626] truncate">{d.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#FFF7E6] text-[#FAAD14]">PDF</span>
                      <span className="text-xs text-[#8C8C8C]">{d.fileSize}</span>
                      <span className="text-xs text-[#8C8C8C]">{d.category}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      )}

      {showDetail && (
      <div className="flex-1 bg-white rounded-lg flex flex-col overflow-hidden min-h-0">
        {isMobile && !!selectedDoc && (
          <MobileDetailBackBar onBack={closeDetail} />
        )}
        {doc ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#FFF7E6] flex items-center justify-center flex-shrink-0">
                <ScrollText size={28} className="text-[#FAAD14]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#262626]">{doc.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#FFF7E6] text-[#FAAD14]">PDF</span>
                  <span className="text-xs text-[#8C8C8C] flex items-center gap-1"><Hash size={12} />{doc.fileSize}</span>
                  <span className="text-xs text-[#8C8C8C] flex items-center gap-1"><BookOpen size={12} />{doc.category}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={14} className="text-[#8C8C8C]" />
                <span className="text-xs text-[#8C8C8C]">标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#F5F5F5] text-[#595959] text-sm rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ScrollText size={14} className="text-[#8C8C8C]" />
                <span className="text-xs text-[#8C8C8C]">文档简介</span>
              </div>
              <p className="text-sm text-[#595959] leading-relaxed bg-[#F5F5F5] rounded-lg p-4">{doc.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1890FF] text-white text-sm rounded hover:bg-[#096DD9] transition-colors"
                onClick={() => setPreviewDoc(doc)}
              >
                <Eye size={16} />
                在线预览
              </button>
              <a
                href={downloadUrl(doc)}
                download
                className="flex items-center gap-2 px-5 py-2.5 text-[#1890FF] border border-[#1890FF] text-sm rounded hover:bg-[#E6F7FF] transition-colors"
              >
                <Download size={16} />
                下载文档
              </a>
            </div>

            {/* Content Overview */}
            <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
              <h3 className="text-sm font-medium text-[#262626] mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-[#1890FF]" />
                文档内容概览
              </h3>
              <div className="space-y-2">
                {[
                  '品牌故事与历史 - 凯施迪品牌创立背景、发展历程、企业文化',
                  '2026春夏设计理念 - 当季设计主题、灵感来源、色彩趋势',
                  '产品系列介绍 - 各产品线定位、风格特征、目标场景',
                  '面料科技与创新 - 核心面料技术、功能性特点、穿着体验',
                  '目标客群画像 - 核心消费者特征、生活方式、消费偏好',
                  '品牌愿景与战略 - 发展方向、市场定位、品牌价值主张',
                ].map((section, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-[#1890FF] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#595959]">{section}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <BookOpen size={48} className="text-[#D9D9D9]" />
            <p className="text-sm text-[#8C8C8C] mt-4">暂无品牌简介文档</p>
          </div>
        )}
      </div>
      )}

      {previewDoc && (
        <DocViewer
          fileUrl={downloadUrl(previewDoc)}
          fileType="pdf"
          title={previewDoc.title}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  )
}
