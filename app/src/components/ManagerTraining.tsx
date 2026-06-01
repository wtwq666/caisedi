import { useState, useMemo } from 'react'
import { FileText, Presentation, Download, Eye, Tag, Search, X, BookOpen, Hash } from 'lucide-react'
import { trainingDocs, trainingCategories } from '../data/trainingData'
import type { TrainingDoc } from '../data/trainingData'
import DocViewer from './DocViewer'
import MobileDetailBackBar from './MobileDetailBackBar'
import { useMasterDetailMobile } from '../hooks/use-master-detail-mobile'

const fileIcons: Record<string, React.ElementType> = {
  docx: FileText,
  pptx: Presentation,
}

const fileColors: Record<string, { bg: string; text: string }> = {
  docx: { bg: 'bg-[#E6F7FF]', text: 'text-[#1890FF]' },
  pptx: { bg: 'bg-[#FFF7E6]', text: 'text-[#FAAD14]' },
}

export default function ManagerTraining() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<TrainingDoc | null>(null)
  const [previewDoc, setPreviewDoc] = useState<TrainingDoc | null>(null)

  const filteredDocs = useMemo(() => {
    return trainingDocs.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory
      const matchSearch = searchText === '' ||
        doc.title.includes(searchText) ||
        doc.description.includes(searchText) ||
        doc.tags.some((t) => t.includes(searchText))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const downloadUrl = (doc: TrainingDoc) => `/training/${encodeURIComponent(doc.filename)}`

  const hasSelection = !!selectedDoc
  const { showList, showDetail, isMobile, closeDetail } = useMasterDetailMobile(
    hasSelection,
    () => setSelectedDoc(null),
    'manager-training',
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
            {trainingCategories.map((cat) => (
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
            <span className="text-sm font-medium text-[#262626]">培训文档</span>
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
            <BookOpen size={48} className="text-[#D9D9D9]" />
            <p className="text-sm text-[#8C8C8C] mt-4">请从左侧选择培训文档查看</p>
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

function DocContentOverview({ doc }: { doc: TrainingDoc }) {
  const contentMap: Record<string, { sections: string[] }> = {
    '1': {
      sections: [
        '第一章 店长认知 - 店长画像与8大关键职责、5大能力3大特质',
        '第二章 店长工作流程 - 日/周/月工作流程详解',
        '第三章 销售管理 - 业绩构成公式、目标分解、数据追踪',
        '第四章 会议管理 - 交接班会、周月会议、店铺日志',
        '第五章 员工培训管理 - 新品带教、新店长/新员工带教流程',
        '第六章 运营标准化工具 - IIS内部检测、MSP神秘顾客',
        '附录 - 店铺体检表、交接班会评估表、带教计划',
      ],
    },
    '2': {
      sections: [
        'Day 1-2: 角色认知与店长画像 - 品牌认知、SOP体系、8大职责、5大能力',
        'Day 3-4: 岗位职责与工作流程 - 销售管理、人事管理、商品管理、日周月流程',
        'Day 5: 销售管理与数据分析 - 业绩公式、目标分解、8大核心指标',
        'Day 6: 控场管理 - 淡场管理、旺场管理、节假日管理',
        'Day 7: 会议管理与日志 - 交接班会7步骤、店铺日志、数据工具',
        'Day 8: 员工带教体系 - 新品123原则、新员工三七二一法、新店长一三二法',
        'Day 9: 运营标准化工具 - IIS检测体系、MSP神秘顾客、店铺体检表',
        'Day 10: 综合考核 - 理论+实操+评估、上岗资格认证',
      ],
    },
    '3': {
      sections: [
        '场景一: 会员充值话术 - 充值销售流程、算账对比法、紧迫感营造',
        '场景二: 大单销售话术 - 需求挖掘、场景构建、全套搭配、价值塑造',
        '场景三: 连带推荐话术 - 关联推荐、场景延伸、试穿引导、价值叠加',
        '场景四: VIP邀约话术 - 电话/微信邀约、不同客户类型话术',
        '场景五: 异议处理话术 - 价格异议、产品异议、购买时机异议',
        '话术演练与考核 - 每日演练要求、考核标准、激励机制',
      ],
    },
    '4': {
      sections: [
        '店铺整体诊断指标 - 业绩完成率、完成进度、同比增长、环比增长、竞品横比',
        '细节追踪指标 - 个人人效、成交率、连带率、个人平均件单价',
        '会员指标 - 会员销售占比、会员复购率、充值金额占比、充值单数占比',
        'KPI与话术联动考核表 - 五大场景对应KPI指标及晨会演练动作',
      ],
    },
    '5': {
      sections: [
        '第一章: 数据分析与发现问题能力 - 漏斗分析、人货场矩阵、同比环比',
        '第二章: 情景总结与制定标准能力 - SOP提炼四步法、话术卡设计',
        '第三章: 培训计划制定能力 - 三Gap法、微颗粒度培训、训练日历',
        '第四章: 带教与组织互练能力 - 示范-模仿-矫正循环、互练机制',
        '第五章: 复盘与流程优化能力 - 三层复盘节奏、AAR四问法',
        '附录: 店长能力自评表 - 五项核心能力1-5分自评',
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
