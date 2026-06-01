import { useState, useMemo } from 'react'
import { FileText, Search, X, Tag, BookOpen, Hash, Download, Eye } from 'lucide-react'
import { salesScriptDocs, salesScriptCategories } from '../data/salesScriptData'
import type { SalesScriptDoc } from '../data/salesScriptData'
import DocViewer from './DocViewer'
import MobileDetailBackBar from './MobileDetailBackBar'
import { useIsMobile } from '../hooks/use-mobile'
import { useMasterDetailMobile } from '../hooks/use-master-detail-mobile'

export default function SalesScriptSystem() {
  const isMobile = useIsMobile()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<SalesScriptDoc | null>(null)
  const [previewDoc, setPreviewDoc] = useState<SalesScriptDoc | null>(null)

  const filteredDocs = useMemo(() => {
    return salesScriptDocs.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchSearch = searchText === '' ||
        doc.title.includes(searchText) ||
        doc.description.includes(searchText) ||
        doc.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const downloadUrl = (doc: SalesScriptDoc) => `/training/${encodeURIComponent(doc.filename)}`

  const doc = selectedDoc || (!isMobile ? filteredDocs[0] : undefined)
  const hasMobileSelection = !!selectedDoc
  const { showList, showDetail, closeDetail } = useMasterDetailMobile(
    hasMobileSelection,
    () => setSelectedDoc(null),
    'sales-script',
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
            {salesScriptCategories.map((cat) => (
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
            <span className="text-sm font-medium text-[#262626]">话术文档</span>
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
                  <div className="w-10 h-10 rounded-lg bg-[#E6F7FF] flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-[#1890FF]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-[#262626] truncate">{d.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#E6F7FF] text-[#1890FF]">DOCX</span>
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
              <div className="w-14 h-14 rounded-xl bg-[#E6F7FF] flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-[#1890FF]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#262626]">{doc.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#E6F7FF] text-[#1890FF]">DOCX</span>
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
                <FileText size={14} className="text-[#8C8C8C]" />
                <span className="text-xs text-[#8C8C8C]">文档简介</span>
              </div>
              <p className="text-sm text-[#595959] leading-relaxed bg-[#F5F5F5] rounded-lg p-4">{doc.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-8">
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
            <div className="pt-6 border-t border-[#F0F0F0]">
              <h3 className="text-sm font-medium text-[#262626] mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-[#1890FF]" />
                文档内容概览
              </h3>
              <div className="space-y-2">
                {[
                  { num: '0', title: '销售方法论', desc: '凯施迪四步成交法 + 异议处理三步法（认同→处理→转移）+ 三大绝对红线' },
                  { num: '1', title: '顾客进门：破冰与迎宾', desc: '场景1「随便看看」+ 场景2「30秒就要走」' },
                  { num: '3', title: '挖掘需求：了解顾客', desc: '场景3「问价但不试穿」+ 场景4「只是路过看看」' },
                  { num: '5', title: '专业推荐：产品价值塑造', desc: '场景5「有点贵」+ 场景6「XX品牌更便宜」+ 场景7「网上更便宜」+ 17大品类核心卖点话术表' },
                  { num: '8', title: '异议处理：场景实战', desc: '场景8「太年轻了」+ 场景9「不太会挑」+ 场景10「没感觉」+ 场景11「等打折」+ 场景12「老顾客优惠」+ 场景13「出去比较」' },
                  { num: '六', title: '连带销售：提升客单价', desc: '上下装搭配 + 内外搭层次 + 配饰点睛，目标客单价达单件2倍以上' },
                  { num: '七', title: '快速话术卡', desc: '8大高频场景一句话应对，可打印贴在工位' },
                  { num: '八', title: '培训签到与考核', desc: '培训签到表 + 场景演练考核表（6维度30分制）' },
                ].map((section) => (
                  <div key={section.num} className="flex items-start gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-[#1890FF] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {section.num}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#262626]">{section.title}</p>
                      <p className="text-xs text-[#8C8C8C] mt-0.5">{section.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <BookOpen size={48} className="text-[#D9D9D9]" />
            <p className="text-sm text-[#8C8C8C] mt-4">暂无销售话术文档</p>
          </div>
        )}
      </div>
      )}

      {previewDoc && (
        <DocViewer
          fileUrl={downloadUrl(previewDoc)}
          fileType="docx"
          title={previewDoc.title}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  )
}
