import { useState, useMemo } from 'react'
import { FileText, ScrollText, Search, X, Tag, BookOpen, Hash, Download, Eye } from 'lucide-react'
import { managementDocs, managementCategories } from '../data/managementData'
import type { ManagementDoc } from '../data/managementData'
import DocViewer from './DocViewer'
import MobileDetailBackBar from './MobileDetailBackBar'
import { useMasterDetailMobile } from '../hooks/use-master-detail-mobile'

const fileIcons: Record<string, React.ElementType> = {
  docx: FileText,
  pdf: ScrollText,
}

const fileColors: Record<string, { bg: string; text: string }> = {
  docx: { bg: 'bg-[#E6F7FF]', text: 'text-[#1890FF]' },
  pdf: { bg: 'bg-[#FFF7E6]', text: 'text-[#FAAD14]' },
}

export default function ManagementSystem() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<ManagementDoc | null>(null)
  const [previewDoc, setPreviewDoc] = useState<ManagementDoc | null>(null)

  const filteredDocs = useMemo(() => {
    return managementDocs.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchSearch = searchText === '' ||
        doc.title.includes(searchText) ||
        doc.description.includes(searchText) ||
        doc.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const downloadUrl = (doc: ManagementDoc) => `/training/${encodeURIComponent(doc.filename)}`

  const hasSelection = !!selectedDoc
  const { showList, showDetail, isMobile, closeDetail } = useMasterDetailMobile(
    hasSelection,
    () => setSelectedDoc(null),
    'management',
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
            {managementCategories.map((cat) => (
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
            <span className="text-sm font-medium text-[#262626]">制度文档</span>
            <span className="text-xs text-[#8C8C8C] ml-2">({filteredDocs.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredDocs.map((doc) => {
              const Icon = fileIcons[doc.fileType] || FileText
              const colors = fileColors[doc.fileType] || fileColors.docx
              return (
                <button
                  key={doc.id}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedDoc?.id === doc.id
                      ? 'bg-[#E6F7FF] border border-[#1890FF]/30'
                      : 'hover:bg-[#F5F5F5] border border-transparent'
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
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
        {selectedDoc ? (
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
                  <span className="text-xs text-[#8C8C8C] flex items-center gap-1">
                    <Hash size={12} />{selectedDoc.fileSize}
                  </span>
                  <span className="text-xs text-[#8C8C8C] flex items-center gap-1">
                    <BookOpen size={12} />{selectedDoc.category}
                  </span>
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
              <p className="text-sm text-[#595959] leading-relaxed bg-[#F5F5F5] rounded-lg p-4">
                {selectedDoc.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1890FF] text-white text-sm rounded hover:bg-[#096DD9] transition-colors"
                onClick={() => setPreviewDoc(selectedDoc)}
              >
                <Eye size={16} />
                在线预览
              </button>
              <a
                href={downloadUrl(selectedDoc)}
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
              <DocContentOverview doc={selectedDoc} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <ScrollText size={48} className="text-[#D9D9D9]" />
            <p className="text-sm text-[#8C8C8C] mt-4">请从左侧选择制度文档查看</p>
          </div>
        )}
      </div>
      )}

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

function DocContentOverview({ doc }: { doc: ManagementDoc }) {
  const contentMap: Record<string, { sections: string[] }> = {
    'm1': {
      sections: [
        '第一章 总则 - 制度适用范围、门店管理基本原则',
        '第二章 门店日常运营规范 - 开店/闭店流程、日常检查清单',
        '第三章 员工管理 - 考勤、行为规范、奖惩制度',
        '第四章 销售管理 - 销售流程、收银规范、退换货政策',
        '第五章 货品管理 - 收货、盘点、调拨、损耗处理',
        '第六章 客户服务 - 服务标准、客诉处理、VIP维护',
        '第七章 安全管理 - 消防安全、防盗防损、应急预案',
      ],
    },
    'm2': {
      sections: [
        '一、核心原则（三条红线）- 次品退货/大货退货/收货准确性',
        '二、退货操作流程 - 正常退货（大货）做单到总部仓库、次品退货做单到次品仓',
        '三、违禁行为 - 透明袋写字、有色绳子、破损包装袋、衣裤捆绑、次品大货混用',
        '四、包装说明 - 衣服折叠标准、包装袋规格、防水袋要求',
        '五、收货与寄货规范 - 收货前/收货时/收货后检查要点、寄货前检查',
        '六、退货做单说明 - 正常退货/次品退货/转仓调货系统做单要求',
        '七、乐捐标准 - 包装违规、涂改条码、未做系统单、超5天未入库等处罚标准',
      ],
    },
    'm3': {
      sections: [
        '一、核心规则速查 - 次品定义/人为原因/店长防损/退货时间包装/责任判定',
        '二、次品退货范围（细则）- 面料问题/做工问题/工艺问题/配件问题/顾客纠纷',
        '三、人为残次（不可退仓）- 店铺运作污渍/顾客洗护不当/背包摩擦起球/鼠咬发霉',
        '四、脏品处理规范 - 叠装摆设/穿版挂板保养/空调风机位置',
        '五、次品产生的责任判定 - 人为残次/轻微残次/顾客短期投诉/同一问题二次破损',
        '六、次品退货要求及时间 - 每周四退一次/紧急退货当天16:00前寄出/5天收货期限',
        '七、打包系统做单说明 - 正常退货/次品退货系统做单及打包要求',
        '八、乐捐标准 - 违规退货100元/件、包装不合规100元+物流费',
        '九、次品卡填写说明 - 必填项：次品原因/沟通确认/配件情况/吊牌情况',
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
