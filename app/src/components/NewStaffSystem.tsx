import { useState, useMemo } from 'react'
import { FileText, Presentation, BookOpen, Download, Eye, Search, X, Hash } from 'lucide-react'
import { newStaffDocs, newStaffCategories } from '../data/newStaffData'
import type { NewStaffDoc } from '../data/newStaffData'
import DocViewer from './DocViewer'
import MobileDetailBackBar from './MobileDetailBackBar'
import { useMasterDetailMobile } from '../hooks/use-master-detail-mobile'

const fileIcons: Record<string, React.ElementType> = {
  docx: FileText,
  pptx: Presentation,
  pdf: BookOpen,
}

const fileColors: Record<string, { bg: string; text: string; border: string }> = {
  docx: { bg: 'bg-[#E6F7FF]', text: 'text-[#1890FF]', border: 'border-[#1890FF]' },
  pptx: { bg: 'bg-[#FFF7E6]', text: 'text-[#FAAD14]', border: 'border-[#FAAD14]' },
  pdf: { bg: 'bg-[#F6FFED]', text: 'text-[#52C41A]', border: 'border-[#52C41A]' },
}

export default function NewStaffSystem() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<NewStaffDoc | null>(null)
  const [viewerDoc, setViewerDoc] = useState<NewStaffDoc | null>(null)

  const filteredDocs = useMemo(() => {
    return newStaffDocs.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchSearch = searchText === '' ||
        doc.title.includes(searchText) ||
        doc.description.includes(searchText) ||
        doc.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const downloadUrl = (doc: NewStaffDoc) => `/training/${encodeURIComponent(doc.filename)}`

  const hasSelection = !!selectedDoc
  const { showList, showDetail, isMobile, closeDetail } = useMasterDetailMobile(
    hasSelection,
    () => setSelectedDoc(null),
    'new-staff',
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
          <h3 className="text-sm font-medium text-[#262626] mb-2">文档分类</h3>
          <div className="flex flex-wrap gap-2">
            {newStaffCategories.map((cat) => (
              <button
                key={cat.key}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
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

        {/* Doc List */}
        <div className="bg-white rounded-lg flex-1 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-[#F0F0F0]">
            <span className="text-sm text-[#8C8C8C]">共 {filteredDocs.length} 个文档</span>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1">
            {filteredDocs.map((doc) => {
              const Icon = fileIcons[doc.fileType] || FileText
              const colors = fileColors[doc.fileType] || fileColors.docx
              return (
                <div
                  key={doc.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors group ${
                    selectedDoc?.id === doc.id ? 'bg-[#E6F7FF]' : 'hover:bg-[#F5F5F5]'
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={colors.text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#262626] truncate">{doc.title}</div>
                    <div className="text-xs text-[#8C8C8C] mt-0.5 flex items-center gap-1.5">
                      <span>{doc.fileType.toUpperCase()}</span>
                      <span>·</span>
                      <span>{doc.fileSize}</span>
                      <span>·</span>
                      <span>{doc.category}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      )}

      {showDetail && (
      <div className="flex-1 bg-white rounded-lg overflow-auto min-h-0 flex flex-col">
        {isMobile && hasSelection && (
          <MobileDetailBackBar onBack={closeDetail} />
        )}
        {selectedDoc ? (
          <div className="p-4 md:p-6 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#F0F0F0]">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl ${fileColors[selectedDoc.fileType].bg} flex items-center justify-center`}>
                  {(() => {
                    const Icon = fileIcons[selectedDoc.fileType] || FileText
                    return <Icon size={24} className={fileColors[selectedDoc.fileType].text} />
                  })()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#262626]">{selectedDoc.title}</h2>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#8C8C8C]">
                    <span className="px-2 py-0.5 bg-[#F5F5F5] rounded">{selectedDoc.fileType.toUpperCase()}</span>
                    <span>{selectedDoc.fileSize}</span>
                    <span className="px-2 py-0.5 bg-[#F5F5F5] rounded">{selectedDoc.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#8C8C8C] border border-[#D9D9D9] rounded hover:bg-[#F5F5F5] transition-colors"
                  onClick={() => setSelectedDoc(null)}
                >
                  <X size={14} />
                  关闭
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="py-4">
              <p className="text-sm text-[#595959] leading-relaxed">{selectedDoc.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pb-4">
              {selectedDoc.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#F5F5F5] text-[#595959] rounded-full">
                  <Hash size={10} className="text-[#8C8C8C]" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Training tips */}
            <div className="bg-[#F6FFED] border border-[#B7EB8F] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#389E0D]">
                <BookOpen size={16} />
                <span className="font-medium">培训重点</span>
              </div>
              <p className="text-xs text-[#595959] mt-2 leading-relaxed">
                该文档是新员工培训体系的重要组成部分，请带教老师按照文档内容完成对应模块的培训授课，
                并在培训结束后通过&quot;品牌知识-员工培训手册&quot;中的30道考核题检验学习效果。
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#F0F0F0]">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1890FF] text-white text-sm rounded hover:bg-[#096DD9] transition-colors"
                onClick={() => {
                  const url = downloadUrl(selectedDoc)
                  if (selectedDoc.fileType === 'pptx') {
                    window.open(url, '_blank')
                  } else {
                    const a = document.createElement('a')
                    a.href = url
                    a.download = selectedDoc.filename
                    a.click()
                  }
                }}
              >
                <Download size={16} />
                下载文档
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2.5 text-[#1890FF] border border-[#1890FF] text-sm rounded hover:bg-[#E6F7FF] transition-colors"
                onClick={() => setViewerDoc(selectedDoc)}
              >
                <Eye size={16} />
                在线预览
              </button>
            </div>

            {/* File info */}
            <div className="mt-6 bg-[#FAFAFA] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#262626] mb-3">文件信息</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8C8C8C]">文件名称：</span>
                  <span className="text-[#262626]">{selectedDoc.filename}</span>
                </div>
                <div>
                  <span className="text-[#8C8C8C]">文件类型：</span>
                  <span className="text-[#262626]">{selectedDoc.fileType.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-[#8C8C8C]">文件大小：</span>
                  <span className="text-[#262626]">{selectedDoc.fileSize}</span>
                </div>
                <div>
                  <span className="text-[#8C8C8C]">所属分类：</span>
                  <span className="text-[#262626]">{selectedDoc.category}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-10">
            <div className="w-20 h-20 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
              <BookOpen size={36} className="text-[#D9D9D9]" />
            </div>
            <h3 className="text-base font-medium text-[#262626] mb-2">新员工培训资料库</h3>
            <p className="text-sm text-[#8C8C8C] max-w-[400px] leading-relaxed">
              请从左侧列表选择一个文档查看详情，包含10天训练计划、品牌知识、运营标准、销售服务流程等核心培训内容。
            </p>
          </div>
        )}
      </div>
      )}

      {viewerDoc && (
        <DocViewer
          fileUrl={downloadUrl(viewerDoc)}
          fileType={viewerDoc.fileType}
          title={viewerDoc.title}
          onClose={() => setViewerDoc(null)}
        />
      )}
    </div>
  )
}
