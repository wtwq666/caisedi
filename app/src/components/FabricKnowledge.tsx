import { useState, useMemo, useEffect } from 'react'
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  MessageCircle,
  Scale,
  HelpCircle,
  FlaskConical,
  Wrench,
  ClipboardCheck,
  X,
} from 'lucide-react'
import { fabricModules } from '../data/fabricData'
import {
  FABRIC_CATEGORY_TREE,
  countFabricsBySubcategory,
  fabricMatchesCategoryFilter,
  getFabricParentKey,
  getFabricSubcategoryLabel,
  getSubcategoriesForParent,
  resolveFabricSubCategory,
} from '../constants/fabricCategoryTaxonomy'
import { fabricService } from '../services/fabricService'
import { recordRecentLearning } from '../lib/recentLearningStorage'
import type { FabricData, SalesScript, QAObjection, PracticalTraining } from '../types/fabric'
import { useOverlayBack } from '../hooks/use-overlay-back'
import { useIsMobile } from '../hooks/use-mobile'
import { Drawer, DrawerContent, DrawerTitle } from './ui/drawer'

const moduleIcons: Record<string, React.ElementType> = {
  coreFeatures: BookOpen,
  salesScripts: MessageCircle,
  competitorComparison: Scale,
  qaObjections: HelpCircle,
  practicalTraining: FlaskConical,
  afterSales: Wrench,
  quizzes: ClipboardCheck,
}

function parseCoreFeatureLines(coreFeatures: string) {
  return coreFeatures
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.includes('一句话记忆') &&
        !line.includes('技术背景') &&
        !line.includes('五大核心')
    )
    .map((line) => {
      const cleaned = line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').replace(/^["']|["']$/g, '')
      const colonIdx = cleaned.search(/[：:]/)
      if (colonIdx > 0) {
        return {
          title: cleaned.slice(0, colonIdx).trim(),
          desc: cleaned.slice(colonIdx + 1).trim(),
        }
      }
      return { title: cleaned, desc: '' }
    })
}

type FabricDetailPanelProps = {
  fabric: FabricData
  activeModule: string
  onModuleChange: (key: string) => void
  showTechBg: boolean
  onToggleTechBg: () => void
  onClose?: () => void
  isMobile?: boolean
}

function EmptyHint({ text = '暂无数据' }: { text?: string }) {
  return <div className="py-12 text-center text-sm text-[#8C8C8C]">{text}</div>
}

function ProseBlock({ text, empty }: { text?: string; empty: string }) {
  if (!text) return <EmptyHint text={empty} />
  return (
    <div className="rounded-xl border border-[#F0F0F0] bg-white p-5">
      <pre className="text-sm text-[#595959] whitespace-pre-wrap leading-relaxed font-sans">{text}</pre>
    </div>
  )
}

function FabricDetailPanel({
  fabric,
  activeModule,
  onModuleChange,
  showTechBg,
  onToggleTechBg,
  onClose,
  isMobile,
}: FabricDetailPanelProps) {
  const featureLines = parseCoreFeatureLines(fabric.coreFeatures)

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'coreFeatures':
        return (
          <div className="space-y-5">
            <div className="rounded-xl bg-gradient-to-br from-[#E6F7FF] to-white p-5 border border-[#BAE7FF]/60">
              <p className="text-xs font-medium tracking-wide text-[#1890FF] mb-2">核心卖点</p>
              <p className="text-base text-[#262626] leading-relaxed">{fabric.summary}</p>
            </div>
            {featureLines.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[#262626] mb-3">五大核心特性</h4>
                <ul className="space-y-3">
                  {featureLines.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-4 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1890FF] text-sm font-semibold text-white">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm font-semibold text-[#262626]">{item.title}</p>
                        {item.desc && (
                          <p className="mt-1.5 text-sm text-[#595959] leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )

      case 'salesScripts':
        return (
          <div className="space-y-4">
            {fabric.salesScripts.length === 0 ? (
              <EmptyHint />
            ) : (
              fabric.salesScripts.map((script: SalesScript, i: number) => (
                <div key={i} className="rounded-xl border border-[#F0F0F0] overflow-hidden bg-white">
                  <div className="bg-[#FFF7E6] px-4 py-3 border-b border-[#FFE7BA]">
                    <p className="text-sm font-medium text-[#D48806]">{script.scene}</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-[#F5222D] mb-2">错误示范</p>
                      <p className="text-sm text-[#595959] bg-[#FFF2F0] p-3 rounded-lg leading-relaxed">
                        {script.wrongExample}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#52C41A] mb-2">正确话术</p>
                      <p className="text-sm text-[#262626] bg-[#F6FFED] p-3 rounded-lg leading-relaxed">
                        {script.correctScript}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )

      case 'competitorComparison':
        return <ProseBlock text={fabric.competitorComparison} empty="暂无竞品对比数据" />

      case 'qaObjections':
        return (
          <div className="space-y-3">
            {fabric.qaObjections.length === 0 ? (
              <EmptyHint text="暂无异议处理数据" />
            ) : (
              fabric.qaObjections.map((qa: QAObjection, i: number) => (
                <div key={i} className="rounded-xl border border-[#F0F0F0] overflow-hidden bg-white">
                  <div className="px-4 py-3 bg-[#F0F5FF] border-b border-[#D6E4FF]">
                    <p className="text-sm font-medium text-[#1890FF] leading-relaxed">Q：{qa.question}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-[#595959] leading-relaxed">{qa.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )

      case 'practicalTraining':
        return (
          <div className="space-y-4">
            {fabric.practicalTraining.length === 0 ? (
              <EmptyHint text="暂无实操演练数据" />
            ) : (
              fabric.practicalTraining.map((pt: PracticalTraining, i: number) => (
                <div key={i} className="rounded-xl border border-[#F0F0F0] p-4 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1890FF] text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-[#262626]">{pt.title}</p>
                  </div>
                  <div className="space-y-2 text-sm text-[#595959] leading-relaxed">
                    {pt.materials && (
                      <p>
                        <span className="text-[#8C8C8C]">所需材料：</span>
                        {pt.materials}
                      </p>
                    )}
                    {pt.steps && (
                      <p>
                        <span className="text-[#8C8C8C]">操作步骤：</span>
                        {pt.steps}
                      </p>
                    )}
                    {pt.observation && (
                      <p>
                        <span className="text-[#8C8C8C]">观察要点：</span>
                        {pt.observation}
                      </p>
                    )}
                    {pt.application && (
                      <p>
                        <span className="text-[#8C8C8C]">导购应用：</span>
                        {pt.application}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )

      case 'afterSales':
        return <ProseBlock text={fabric.afterSales} empty="暂无售后知识数据" />

      case 'quizzes':
        return <ProseBlock text={fabric.quizzes} empty="暂无课后测试数据" />

      default:
        return null
    }
  }

  const titleClassName = `font-semibold text-[#262626] truncate ${isMobile ? 'text-xl' : 'text-xl'}`

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className={`shrink-0 border-b border-[#F0F0F0] bg-white ${isMobile ? 'px-4 pt-2 pb-2' : 'px-5 py-3'}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
            {isMobile ? (
              <DrawerTitle className={titleClassName}>{fabric.fabricName}</DrawerTitle>
            ) : (
              <h2 className={titleClassName}>{fabric.fabricName}</h2>
            )}
            <span className="px-2 py-0.5 bg-[#E6F7FF] text-[#1890FF] text-xs font-medium rounded">
              {fabric.fabricCode}
            </span>
            <span className="px-2 py-0.5 bg-[#FFF7E6] text-[#D48806] text-xs font-medium rounded">
              {getFabricSubcategoryLabel(resolveFabricSubCategory(fabric))}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              className="flex items-center gap-0.5 px-2 py-1 text-xs text-[#1890FF] hover:bg-[#E6F7FF] rounded-md transition-colors"
              onClick={onToggleTechBg}
            >
              {showTechBg ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              技术背景
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F5] text-[#595959] hover:bg-[#E8E8E8] transition-colors"
                aria-label="关闭"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        {showTechBg && (
          <div className="mt-2 rounded-lg bg-[#FAFAFA] p-3 text-sm text-[#595959] leading-relaxed whitespace-pre-wrap border border-[#F0F0F0] max-h-[120px] overflow-y-auto">
            {fabric.techBackground}
          </div>
        )}
      </div>

      <div className={`shrink-0 border-b border-[#F0F0F0] bg-[#FAFAFA]/80 ${isMobile ? 'px-3 py-2' : 'px-4 py-2.5'}`}>
        <div className="flex flex-wrap gap-2">
          {fabricModules.map((mod) => {
            const Icon = moduleIcons[mod.key]
            const active = activeModule === mod.key
            return (
              <button
                key={mod.key}
                type="button"
                onClick={() => onModuleChange(mod.key)}
                className={`flex items-center gap-1.5 rounded-md transition-colors ${
                  isMobile ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
                } ${
                  active
                    ? 'bg-[#1890FF] text-white shadow-sm'
                    : 'bg-white text-[#595959] border border-[#F0F0F0] hover:border-[#91D5FF] hover:text-[#1890FF]'
                }`}
              >
                <Icon size={isMobile ? 12 : 14} className={active ? 'text-white' : 'text-[#8C8C8C]'} />
                <span>{mod.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={`flex-1 min-h-0 overflow-y-auto overscroll-contain ${isMobile ? 'px-4 py-4' : 'px-6 py-5'}`}
      >
        {activeModule === 'coreFeatures' ? (
          renderModuleContent()
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[#8C8C8C] leading-relaxed line-clamp-2 border-l-2 border-[#BAE7FF] pl-3">
              {fabric.summary}
            </p>
            {renderModuleContent()}
          </div>
        )}
      </div>
    </div>
  )
}

type FabricKnowledgeProps = {
  className?: string
  initialFabricId?: number
}

export default function FabricKnowledge({
  className = '',
  initialFabricId,
}: FabricKnowledgeProps) {
  const isMobile = useIsMobile()
  const [selectedParent, setSelectedParent] = useState('all')
  const [selectedSub, setSelectedSub] = useState('all')
  const [selectedFabric, setSelectedFabric] = useState<FabricData | null>(null)
  const [activeModule, setActiveModule] = useState('coreFeatures')
  const [showTechBg, setShowTechBg] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const fabricList = fabricService.list()
  const subCounts = useMemo(() => countFabricsBySubcategory(fabricList), [fabricList])
  const subFilters = useMemo(
    () => getSubcategoriesForParent(selectedParent),
    [selectedParent],
  )

  const filteredFabrics = useMemo(
    () => fabricList.filter((f) => fabricMatchesCategoryFilter(f, selectedParent, selectedSub)),
    [fabricList, selectedParent, selectedSub],
  )

  useEffect(() => {
    if (initialFabricId == null) return
    const fabric = fabricService.list().find((f) => f.id === initialFabricId)
    if (!fabric) return
    const sub = resolveFabricSubCategory(fabric)
    setSelectedSub(sub)
    setSelectedParent(getFabricParentKey(sub) ?? 'all')
    setSelectedFabric(fabric)
    setActiveModule('coreFeatures')
    if (isMobile) setDetailOpen(true)
  }, [initialFabricId, isMobile])

  // Desktop: auto-select first fabric in list
  useEffect(() => {
    if (initialFabricId != null) return
    if (isMobile) return
    if (!selectedFabric && filteredFabrics.length > 0) {
      setSelectedFabric(filteredFabrics[0])
    }
  }, [filteredFabrics, isMobile, selectedFabric, initialFabricId])

  const desktopFabric =
    selectedFabric ?? (isMobile ? null : filteredFabrics[0] ?? null)

  const openFabricDetail = (f: FabricData) => {
    setSelectedFabric(f)
    setActiveModule('coreFeatures')
    setShowTechBg(false)
    recordRecentLearning({
      type: 'fabric',
      id: f.id,
      title: f.fabricName,
      subtitle: getFabricSubcategoryLabel(resolveFabricSubCategory(f)),
    })
    if (isMobile) setDetailOpen(true)
  }

  const closeFabricDetail = () => {
    setDetailOpen(false)
    if (isMobile) setSelectedFabric(null)
  }

  const { requestClose: closeFabricDrawer } = useOverlayBack(
    isMobile && detailOpen && !!selectedFabric,
    closeFabricDetail,
    'fabric-detail',
  )

  const detailPanelProps = desktopFabric
    ? {
        fabric: desktopFabric,
        activeModule,
        onModuleChange: setActiveModule,
        showTechBg,
        onToggleTechBg: () => setShowTechBg((v) => !v),
      }
    : null

  const filterPanel = (compact?: boolean) => (
    <div
      className={`overflow-y-auto overscroll-contain space-y-2.5 ${
        compact ? 'p-2.5 max-h-[8rem]' : 'p-3 md:p-3.5 max-h-[8rem] md:max-h-none'
      }`}
    >
      <div>
        <p className="text-[11px] md:text-xs text-[#8C8C8C] mb-1.5 px-0.5 font-medium">纤维类型</p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          <button
                  type="button"
                  className={`app-filter-chip px-3 py-1.5 md:px-3.5 md:py-2 rounded-full text-xs md:text-[13px] transition-colors ${
                    selectedParent === 'all'
                      ? 'bg-[#1890FF] text-white'
                      : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF] hover:text-[#1890FF]'
                  }`}
                  onClick={() => {
                    setSelectedParent('all')
                    setSelectedSub('all')
                    setSelectedFabric(null)
                    setDetailOpen(false)
                  }}
                >
                  全部
                </button>
                {FABRIC_CATEGORY_TREE.map((group) => {
                  const count = group.children.reduce(
                    (sum, c) => sum + (subCounts.get(c.key) ?? 0),
                    0,
                  )
                  return (
                    <button
                      key={group.key}
                      type="button"
                      className={`app-filter-chip px-3 py-1.5 md:px-3.5 md:py-2 rounded-full text-xs md:text-[13px] transition-colors ${
                        selectedParent === group.key
                          ? 'bg-[#1890FF] text-white'
                          : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF] hover:text-[#1890FF]'
                      }`}
                      onClick={() => {
                        setSelectedParent(group.key)
                        setSelectedSub('all')
                        setSelectedFabric(null)
                        setDetailOpen(false)
                      }}
                    >
                      {group.label}
                      <span className="ml-1 opacity-75">({count})</span>
                    </button>
                  )
                })}
        </div>
      </div>
      <div>
        <p className="text-[11px] md:text-xs text-[#8C8C8C] mb-1.5 px-0.5 font-medium">面料品类</p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
                <button
                  type="button"
                  className={`app-filter-chip px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-xs transition-colors ${
                    selectedSub === 'all'
                      ? 'bg-[#E6F7FF] text-[#1890FF] ring-1 ring-[#91D5FF]'
                      : 'bg-[#FAFAFA] text-[#595959] border border-[#F0F0F0] hover:border-[#91D5FF]'
                  }`}
                  onClick={() => {
                    setSelectedSub('all')
                    setSelectedFabric(null)
                    setDetailOpen(false)
                  }}
                >
                  全部品类
                </button>
                {subFilters.map((sub) => {
                  const count = subCounts.get(sub.key) ?? 0
                  return (
                    <button
                      key={sub.key}
                      type="button"
                      className={`app-filter-chip px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-xs transition-colors ${
                        selectedSub === sub.key
                          ? 'bg-[#E6F7FF] text-[#1890FF] ring-1 ring-[#91D5FF]'
                          : count === 0
                            ? 'bg-[#FAFAFA] text-[#BFBFBF] border border-dashed border-[#E8E8E8]'
                            : 'bg-[#FAFAFA] text-[#595959] border border-[#F0F0F0] hover:border-[#91D5FF]'
                      }`}
                      onClick={() => {
                        if (selectedParent === 'all') {
                          const parent = getFabricParentKey(sub.key)
                          if (parent) setSelectedParent(parent)
                        }
                        setSelectedSub(sub.key)
                        setSelectedFabric(null)
                        setDetailOpen(false)
                      }}
                    >
                      {sub.label}
                      <span className="ml-0.5 opacity-70">({count})</span>
                    </button>
                  )
                })}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className={`flex flex-col flex-1 min-h-0 h-full overflow-hidden gap-2 md:gap-2.5 ${className}`}>
        <div className="md:hidden shrink-0 bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
          {filterPanel(true)}
        </div>

        <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 flex-1 min-h-0 h-full overflow-hidden">
          <div className="w-full md:w-[min(38%,420px)] lg:w-[440px] md:shrink-0 flex flex-col min-h-0 gap-2 md:gap-2.5 max-md:max-h-[min(56vh,24rem)] md:h-full">
            <div className="hidden md:block shrink-0 bg-white rounded-lg border border-[#F0F0F0] overflow-hidden max-h-[min(42%,13.5rem)] min-h-0">
              {filterPanel()}
            </div>

            <div className="bg-white rounded-lg border border-[#F0F0F0] flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-[#F0F0F0] shrink-0 bg-white">
                <span className="text-sm md:text-[15px] font-medium text-[#262626]">面料列表</span>
                <span className="text-xs md:text-sm text-[#8C8C8C] ml-2">({filteredFabrics.length})</span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 space-y-1">
              {filteredFabrics.length === 0 && (
                <p className="text-xs text-[#8C8C8C] text-center py-8 px-2">
                  该品类下暂无面料，可切换其他品类查看
                </p>
              )}
              {filteredFabrics.map((f) => {
                const isSelected = selectedFabric?.id === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`w-full text-left px-3 py-2.5 md:py-3 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-[#E6F7FF] text-[#1890FF] ring-1 ring-[#91D5FF]'
                        : 'text-[#595959] hover:bg-[#F5F5F5]'
                    }`}
                    onClick={() => openFabricDetail(f)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm md:text-[15px] font-medium leading-snug">{f.fabricName}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${
                          isSelected ? 'bg-white/80 text-[#1890FF]' : 'bg-[#F5F5F5] text-[#8C8C8C]'
                        }`}
                      >
                        {getFabricSubcategoryLabel(resolveFabricSubCategory(f))}
                      </span>
                    </div>
                    <p className="text-xs md:text-[13px] mt-1 truncate opacity-80">{f.fabricCode}</p>
                  </button>
                )
              })}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 min-w-0 min-h-0 h-full bg-white rounded-lg border border-[#F0F0F0] flex-col overflow-hidden">
            {detailPanelProps ? (
              <FabricDetailPanel {...detailPanelProps} />
            ) : (
              <div className="flex flex-1 min-h-0 items-center justify-center text-sm text-[#8C8C8C]">
                请选择面料查看详情
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom drawer */}
      <Drawer
        open={detailOpen && !!selectedFabric}
        onOpenChange={(open) => {
          if (!open) closeFabricDrawer()
        }}
      >
        <DrawerContent className="h-[92vh] max-h-[92vh] p-0 flex flex-col">
          {selectedFabric && (
            <FabricDetailPanel
              fabric={selectedFabric}
              activeModule={activeModule}
              onModuleChange={setActiveModule}
              showTechBg={showTechBg}
              onToggleTechBg={() => setShowTechBg((v) => !v)}
              onClose={closeFabricDrawer}
              isMobile
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
