import { useState, useMemo } from 'react'
import {
  FileText,
  ScrollText,
  Search,
  X,
  Tag,
  BookOpen,
  Hash,
  Download,
  Eye,
  Table2,
  Images,
} from 'lucide-react'
import { storeImageDocs, storeImageCategories } from '../data/storeImageData'
import type { StoreImageDoc } from '../data/storeImageData'
import { storeShowcaseAlbums } from '../data/storeShowcaseData'
import type { StoreShowcaseAlbum } from '../data/storeShowcaseData'
import DocViewer from './DocViewer'
import StoreShowcaseGallery from './StoreShowcaseGallery'
import MobileDetailBackBar from './MobileDetailBackBar'
import { useMasterDetailMobile } from '../hooks/use-master-detail-mobile'

const fileIcons: Record<string, React.ElementType> = {
  docx: FileText,
  pdf: ScrollText,
  xls: Table2,
}

const fileColors: Record<string, { bg: string; text: string }> = {
  docx: { bg: 'bg-[#E6F7FF]', text: 'text-[#1890FF]' },
  pdf: { bg: 'bg-[#FFF7E6]', text: 'text-[#FAAD14]' },
  xls: { bg: 'bg-[#F6FFED]', text: 'text-[#52C41A]' },
}

type ListItem =
  | { kind: 'doc'; doc: StoreImageDoc }
  | { kind: 'album'; album: StoreShowcaseAlbum }

type StoreImageSystemProps = {
  initialAlbumId?: string
  initialDocId?: string
}

export default function StoreImageSystem({
  initialAlbumId,
  initialDocId,
}: StoreImageSystemProps) {
  const initialAlbum = initialAlbumId
    ? storeShowcaseAlbums.find((a) => a.id === initialAlbumId) ?? null
    : null
  const initialDoc =
    !initialAlbum && initialDocId
      ? storeImageDocs.find((d) => d.id === initialDocId) ?? null
      : null

  const [selectedCategory, setSelectedCategory] = useState(
    initialAlbum ? '开业活动' : initialDoc ? initialDoc.category : 'all',
  )
  const [searchText, setSearchText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<StoreImageDoc | null>(initialDoc)
  const [selectedAlbum, setSelectedAlbum] = useState<StoreShowcaseAlbum | null>(initialAlbum)
  const [previewDoc, setPreviewDoc] = useState<StoreImageDoc | null>(null)

  const filteredDocs = useMemo(() => {
    return storeImageDocs.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchSearch =
        searchText === '' ||
        doc.title.includes(searchText) ||
        doc.description.includes(searchText) ||
        doc.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const filteredAlbums = useMemo(() => {
    return storeShowcaseAlbums.filter((album) => {
      const matchCategory = selectedCategory === 'all' || album.category === selectedCategory
      const matchSearch =
        searchText === '' ||
        album.title.includes(searchText) ||
        album.location.includes(searchText) ||
        album.description.includes(searchText) ||
        album.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const listItems = useMemo((): ListItem[] => {
    const docs: ListItem[] = filteredDocs.map((doc) => ({ kind: 'doc', doc }))
    const albums: ListItem[] = filteredAlbums.map((album) => ({ kind: 'album', album }))
    return [...albums, ...docs]
  }, [filteredDocs, filteredAlbums])

  const selectDoc = (doc: StoreImageDoc) => {
    setSelectedDoc(doc)
    setSelectedAlbum(null)
  }

  const selectAlbum = (album: StoreShowcaseAlbum) => {
    setSelectedAlbum(album)
    setSelectedDoc(null)
  }

  const downloadUrl = (doc: StoreImageDoc) => `/training/${encodeURIComponent(doc.filename)}`

  const hasSelection = !!selectedAlbum || !!selectedDoc
  const clearSelection = () => {
    setSelectedDoc(null)
    setSelectedAlbum(null)
  }
  const { showList, showDetail, isMobile, closeDetail } = useMasterDetailMobile(
    hasSelection,
    clearSelection,
    'store-image',
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
            {storeImageCategories.map((cat) => (
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
            <span className="text-sm font-medium text-[#262626]">门店风采</span>
            <span className="text-xs text-[#8C8C8C] ml-2">({listItems.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {listItems.map((item) => {
              if (item.kind === 'album') {
                const { album } = item
                const active = selectedAlbum?.id === album.id
                return (
                  <button
                    key={album.id}
                    type="button"
                    className={`w-full text-left p-2 rounded-md transition-colors border ${
                      active
                        ? 'bg-[#E6F7FF] border-[#1890FF]/30'
                        : 'hover:bg-[#F5F5F5] border-transparent'
                    }`}
                    onClick={() => selectAlbum(album)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                        <img
                          src={album.coverImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-[#262626] truncate">{album.title}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-[#8C8C8C]">
                          <span className="px-1.5 py-0.5 rounded bg-[#FFF7E6] text-[#D48806]">
                            相册
                          </span>
                          <span>{album.images.length} 张</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              }

              const { doc } = item
              const Icon = fileIcons[doc.fileType] || FileText
              const colors = fileColors[doc.fileType] || fileColors.docx
              return (
                <button
                  key={doc.id}
                  type="button"
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedDoc?.id === doc.id
                      ? 'bg-[#E6F7FF] border border-[#1890FF]/30'
                      : 'hover:bg-[#F5F5F5] border border-transparent'
                  }`}
                  onClick={() => selectDoc(doc)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon size={20} className={colors.text} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-[#262626] truncate">{doc.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                          {doc.fileType.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#8C8C8C]">{doc.fileSize}</span>
                        <span className="text-xs text-[#8C8C8C]">{doc.category}</span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      )}

      {showDetail && (
      <div className="flex-1 bg-white rounded-lg flex flex-col overflow-hidden min-h-0">
        {isMobile && hasSelection && (
          <MobileDetailBackBar onBack={closeDetail} />
        )}
        {selectedAlbum ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <StoreShowcaseGallery album={selectedAlbum} />
          </div>
        ) : selectedDoc ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl ${fileColors[selectedDoc.fileType].bg} flex items-center justify-center flex-shrink-0`}>
                {(() => {
                  const Icon = fileIcons[selectedDoc.fileType]
                  return <Icon size={28} className={fileColors[selectedDoc.fileType].text} />
                })()}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#262626]">{selectedDoc.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${fileColors[selectedDoc.fileType].bg} ${fileColors[selectedDoc.fileType].text}`}>
                    {selectedDoc.fileType.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#8C8C8C] flex items-center gap-1"><Hash size={12} />{selectedDoc.fileSize}</span>
                  <span className="text-xs text-[#8C8C8C] flex items-center gap-1"><BookOpen size={12} />{selectedDoc.category}</span>
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
                {selectedDoc.tags.map((tag) => (
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
              <p className="text-sm text-[#595959] leading-relaxed bg-[#F5F5F5] rounded-lg p-4">{selectedDoc.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-8">
              {selectedDoc.fileType === 'xls' ? (
                <>
                  <span className="text-sm text-[#8C8C8C]">Excel 文件请在浏览器中打开或下载查看</span>
                  <a href={downloadUrl(selectedDoc)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1890FF] text-white text-sm rounded hover:bg-[#096DD9] transition-colors">
                    浏览器打开
                  </a>
                  <a href={downloadUrl(selectedDoc)} download
                    className="flex items-center gap-2 px-5 py-2.5 text-[#1890FF] border border-[#1890FF] text-sm rounded hover:bg-[#E6F7FF] transition-colors">
                    <Download size={16} />
                    下载文档
                  </a>
                </>
              ) : (
                <>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1890FF] text-white text-sm rounded hover:bg-[#096DD9] transition-colors"
                    onClick={() => setPreviewDoc(selectedDoc)}
                  >
                    <Eye size={16} />
                    在线预览
                  </button>
                  <a href={downloadUrl(selectedDoc)} download
                    className="flex items-center gap-2 px-5 py-2.5 text-[#1890FF] border border-[#1890FF] text-sm rounded hover:bg-[#E6F7FF] transition-colors"
                  >
                    <Download size={16} />
                    下载文档
                  </a>
                </>
              )}
            </div>

            {/* Content Overview */}
            <div className="pt-6 border-t border-[#F0F0F0]">
              <h3 className="text-sm font-medium text-[#262626] mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-[#1890FF]" />
                文档内容概览
              </h3>
              <DocContentOverview doc={selectedDoc} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <Images size={48} className="text-[#D9D9D9]" />
            <p className="text-sm text-[#8C8C8C] mt-4">请从左侧选择开业相册或门店文档查看</p>
          </div>
        )}
      </div>
      )}

      {/* DocViewer Modal */}
      {previewDoc && (
        <DocViewer
          fileUrl={downloadUrl(previewDoc)}
          fileType={previewDoc.fileType as 'pdf' | 'docx'}
          title={previewDoc.title}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  )
}

function DocContentOverview({ doc }: { doc: StoreImageDoc }) {
  const contentMap: Record<string, { sections: string[] }> = {
    's1': {
      sections: [
        '01 品牌风格与销售布局 - 黄金动线：引流区→停留区→成交区，DP点橱窗设计',
        '02 货品统筹与风格定位 - 系列文化分拣法：拆包即找"基因"→锁定"灵魂款"→理清主题色盘',
        '03 核心区域实操落地 - 橱窗/DP点/流水台/层板/广告的标准化陈列操作',
        '04 正侧挂的黄金搭档法则 - 正挂"貌美如花"(1.5层穿搭/三明治叠穿) + 侧挂"赚钱养家"(3+1/2+1法则)',
        '05 实操换季衔接 - 色彩元素搭桥/洋葱穿搭法：平滑过渡减少季节冲突',
        '06 日常巡检 - 11项标准：衣架朝向/间距/吊牌/灯光/饰品/叠装/S勾/织带/裤架',
      ],
    },
    's2': {
      sections: [
        '核心区域陈列考核（100分）- 橱窗/DP点/引流区/停留区/成交区/流水台/层板共23项检查',
        '正侧挂板块考核（100分）- 正挂陈列（主推款/搭配出样/系列文化）+ 侧挂陈列（3+1法则/色彩节奏）+ 正侧挂关联共10项',
        '日常维护标准考核（100分）- 衣架朝向/间距/吊牌隐藏/灯光聚焦/饰品道具/正挂细节/侧挂系列不混挂/叠装标准/S勾/织带/裤架共11项',
        '严禁事项（扣分项）- 断码款上模特(-20)/模特旁跨风格陈列(-20)/流水台堆积混放(-15)/广告不匹配(-15)/纯白T恤上正挂(-10)/断码上正挂(-10)/正侧挂跨系列混搭(-10)',
        '考核等级 - 300分满分：90%-100%优秀 / 80%-89%良好 / 70%-79%一般 / 70%以下不合格',
      ],
    },
  }

  const content = contentMap[doc.id]
  if (!content) return null

  return (
    <div className="space-y-2">
      {content.sections.map((section, i) => (
        <div key={i} className="flex items-start gap-3 p-3 bg-[#F5F5F5] rounded-lg">
          <span className="w-6 h-6 rounded-full bg-[#1890FF] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-[#595959]">{section}</p>
        </div>
      ))}
    </div>
  )
}
