import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  FlaskConical,
  HelpCircle,
  MapPin,
  MessageCircle,
  Package,
  Paintbrush,
  Scale,
  Shirt,
  WashingMachine,
  Wrench,
} from 'lucide-react'
import { FABRIC_QUIZ_TAGS, PRODUCT_QUIZ_TAGS } from '../constants/quizTags'
import { FABRIC_QUIZ_MODULES, PRODUCT_QUIZ_MODULES } from '../constants/quizModules'
import { useAuth } from '../context/AuthContext'
import { isCatalogReady } from '../lib/catalogStore'
import { getModuleStatsForTag, getTagQuestionCount, isQuizPoolReady } from '../lib/knowledgeQuizPool'
import { QUIZ_SESSION_SIZE } from '../constants/quizConfig'
import {
  getBestScore,
  getModuleStatus,
  getQuizDraft,
} from '../lib/quizRecordsStorage'
import type { QuizSource } from '../types/quiz'
import type { QuizModuleStatus } from '../types/quizRecord'
import type { QuizSession } from '../types/quizSession'

const MODULE_STATUS_META: Record<
  QuizModuleStatus,
  { label: string; className: string }
> = {
  not_started: { label: '未答题', className: 'bg-[#F5F5F5] text-[#8C8C8C]' },
  in_progress: { label: '进行中', className: 'bg-[#FFF7E6] text-[#D48806]' },
  completed: { label: '已完成', className: 'bg-[#F6FFED] text-[#52C41A]' },
}

function ModuleStatusBadge({
  status,
  progressText,
}: {
  status: QuizModuleStatus
  progressText?: string
}) {
  const meta = MODULE_STATUS_META[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${meta.className}`}
    >
      {meta.label}
      {status === 'in_progress' && progressText && (
        <span className="opacity-90">· {progressText}</span>
      )}
    </span>
  )
}

const fabricModuleIcons: Record<string, React.ElementType> = {
  coreFeatures: BookOpen,
  salesScripts: MessageCircle,
  competitorComparison: Scale,
  qaObjections: HelpCircle,
  practicalTraining: FlaskConical,
  afterSales: Wrench,
  quizzes: ClipboardCheck,
}

const productModuleIcons: Record<string, React.ElementType> = {
  basicInfo: Package,
  fabricInfo: Shirt,
  craft: Paintbrush,
  care: WashingMachine,
  scenes: MapPin,
}

const CONFIG: Record<
  QuizSource,
  { title: string; subtitle: string; tagStep: string; moduleStep: string }
> = {
  fabric: {
    title: '面料知识测验',
    subtitle: '按面料分类与知识模块组卷测验（每轮约 10 题），成绩自动记入「我的答题」',
    tagStep: '面料分类',
    moduleStep: '知识模块',
  },
  product: {
    title: '商品看图测验',
    subtitle: '按系列看图辨色等测验（每轮约 10 题），成绩自动记入「我的答题」',
    tagStep: '商品系列',
    moduleStep: '知识板块',
  },
}

type Props = {
  variant: QuizSource
  refreshKey?: number
  onStartQuiz: (session: QuizSession) => void
  /** 从其他入口跳转时，滚动并高亮本区域 */
  highlight?: boolean
  /** 默认折叠，为下方资料阅读留出空间 */
  defaultCollapsed?: boolean
  /** 预选标签与模块（如从「我的答题」跳转） */
  initialTagKey?: string
  initialModuleKey?: string
  autoStartQuiz?: boolean
}

export default function KnowledgeQuizSection({
  variant,
  refreshKey = 0,
  onStartQuiz,
  highlight,
  defaultCollapsed = true,
  initialTagKey,
  initialModuleKey,
  autoStartQuiz,
}: Props) {
  const { user } = useAuth()
  const config = CONFIG[variant]
  const tagList = variant === 'fabric' ? FABRIC_QUIZ_TAGS : PRODUCT_QUIZ_TAGS
  const moduleDefs = variant === 'fabric' ? FABRIC_QUIZ_MODULES : PRODUCT_QUIZ_MODULES
  const moduleIcons = variant === 'fabric' ? fabricModuleIcons : productModuleIcons

  const [expanded, setExpanded] = useState(!defaultCollapsed)
  const [activeTagKey, setActiveTagKey] = useState<string | null>(null)
  const [activeTagLabel, setActiveTagLabel] = useState('')
  const catalogReady = isCatalogReady()
  const poolReady = isQuizPoolReady()

  useEffect(() => {
    if (highlight) setExpanded(true)
  }, [highlight])

  const moduleStats = useMemo(
    () => (activeTagKey ? getModuleStatsForTag(variant, activeTagKey) : []),
    [variant, activeTagKey, refreshKey],
  )

  const selectableTags = tagList.filter((t) => t.key !== 'all')

  useEffect(() => {
    if (!initialTagKey) return
    const tag = selectableTags.find((t) => t.key === initialTagKey)
    if (!tag) return
    setExpanded(true)
    setActiveTagKey(tag.key)
    setActiveTagLabel(tag.label)
  }, [initialTagKey, selectableTags])

  useEffect(() => {
    if (!initialTagKey || !initialModuleKey || !autoStartQuiz) return
    const tag = selectableTags.find((t) => t.key === initialTagKey)
    const mod = moduleDefs.find((m) => m.key === initialModuleKey)
    if (!tag || !mod) return
    const stat = getModuleStatsForTag(variant, initialTagKey).find((s) => s.key === mod.key)
    if ((stat?.count ?? 0) === 0) return
    onStartQuiz({
      tagKey: tag.key,
      tagLabel: tag.label,
      moduleKey: mod.key,
      moduleLabel: mod.label,
    })
  }, [initialTagKey, initialModuleKey, autoStartQuiz, variant, selectableTags, moduleDefs, onStartQuiz])

  const selectTag = (key: string, label: string) => {
    if (key === 'all') return
    setActiveTagKey(key)
    setActiveTagLabel(label)
  }

  const startModule = (moduleKey: string, moduleLabel: string) => {
    if (!activeTagKey) return
    onStartQuiz({
      tagKey: activeTagKey,
      tagLabel: activeTagLabel,
      moduleKey,
      moduleLabel,
    })
  }

  return (
    <section
      id="knowledge-quiz-section"
      className={`shrink-0 mb-2 rounded-lg border bg-white overflow-hidden transition-shadow ${
        highlight
          ? 'border-primary shadow-md ring-2 ring-primary/20'
          : 'border-[#F0F0F0]'
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-4 py-2.5 flex items-center justify-between gap-3 bg-gradient-to-r from-[#E6F7FF]/70 to-white hover:from-[#E6F7FF] transition-colors text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardCheck size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-[#262626]">{config.title}</h2>
            {!expanded && (
              <p className="text-xs text-[#8C8C8C] truncate">点击展开 · 按分类选择模块测验</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/quiz-records"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-primary hover:underline hidden sm:inline-flex items-center gap-0.5"
          >
            我的答题
            <ChevronRight size={12} />
          </Link>
          {expanded ? (
            <ChevronUp size={18} className="text-[#8C8C8C]" />
          ) : (
            <ChevronDown size={18} className="text-[#8C8C8C]" />
          )}
        </div>
      </button>

      {expanded && (
      <div className="p-4 pt-3 space-y-5 border-t border-[#F0F0F0]">
        {!catalogReady && (
          <p className="text-xs text-[#AD6800] bg-[#FFFBE6] border border-[#FFE58F] rounded-lg px-3 py-2 -mt-1">
            正在加载商品与面料资料，加载完成后即可开始测验。
          </p>
        )}
        {catalogReady && !poolReady && (
          <p className="text-xs text-[#AD6800] bg-[#FFFBE6] border border-[#FFE58F] rounded-lg px-3 py-2 -mt-1">
            题库暂未生成（商品数量不足或资料未就绪），请稍后刷新页面。
          </p>
        )}
        <p className="text-xs text-[#8C8C8C] -mt-1 sm:hidden">
          <Link to="/quiz-records" className="text-primary hover:underline">
            我的答题
          </Link>
        </p>
        <div>
          <p className="text-xs font-medium text-[#8C8C8C] mb-2.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#E6F7FF] text-[10px] text-primary mr-1.5">
              1
            </span>
            选择{config.tagStep}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectableTags.map((tag) => {
              const count = getTagQuestionCount(variant, tag.key)
              const disabled = count === 0
              const active = activeTagKey === tag.key
              return (
                <button
                  key={tag.key}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectTag(tag.key, tag.label)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    disabled
                      ? 'bg-[#F5F5F5] text-[#BFBFBF] cursor-not-allowed'
                      : active
                        ? 'bg-[#1890FF] text-white shadow-sm'
                        : 'bg-[#F5F5F5] text-[#595959] hover:bg-[#E6F7FF] hover:text-[#1890FF]'
                  }`}
                  title={disabled ? '该分类暂无题目' : `${count} 题`}
                >
                  {tag.label}
                  {count > 0 && (
                    <span className={`ml-1 ${active ? 'text-white/85' : 'opacity-70'}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {activeTagKey ? (
          <div>
            <p className="text-xs font-medium text-[#8C8C8C] mb-2.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#E6F7FF] text-[10px] text-primary mr-1.5">
                2
              </span>
              选择{config.moduleStep}
              <span className="text-primary font-normal ml-1">· {activeTagLabel}</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {moduleDefs.map((mod) => {
                const stat = moduleStats.find((s) => s.key === mod.key)
                const count = stat?.count ?? 0
                const Icon = moduleIcons[mod.key] ?? BookOpen
                const disabled = count === 0
                const status: QuizModuleStatus =
                  user != null && activeTagKey
                    ? getModuleStatus(user.id, variant, activeTagKey, mod.key)
                    : 'not_started'
                const draft =
                  user != null && activeTagKey
                    ? getQuizDraft(user.id, variant, activeTagKey, mod.key)
                    : null
                const best =
                  user != null && activeTagKey && status === 'completed'
                    ? getBestScore(user.id, variant, activeTagKey, mod.key)
                    : null
                const progressText =
                  draft != null ? `${draft.answeredCount}/${draft.totalCount} 题` : undefined

                return (
                  <button
                    key={mod.key}
                    type="button"
                    disabled={disabled}
                    onClick={() => startModule(mod.key, mod.label)}
                    className={`group text-left rounded-xl border px-3.5 py-3 ${
                      disabled
                        ? 'border-[#F0F0F0] bg-[#FAFAFA] opacity-60 cursor-not-allowed'
                        : status === 'in_progress'
                          ? 'border-[#FFE7BA] bg-[#FFFBE6]/50 hover:border-[#FAAD14] hover:shadow-sm'
                          : status === 'completed'
                            ? 'border-[#B7EB8F]/60 bg-[#F6FFED]/30 hover:border-[#52C41A] hover:shadow-sm'
                            : 'border-[#F0F0F0] hover:border-primary hover:bg-[#E6F7FF]/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          disabled
                            ? 'bg-[#F5F5F5] text-[#BFBFBF]'
                            : 'bg-[#E6F7FF] text-primary group-hover:bg-primary group-hover:text-white'
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-[#262626]">{mod.label}</p>
                          {!disabled && user && (
                            <ModuleStatusBadge status={status} progressText={progressText} />
                          )}
                        </div>
                        <p className="text-xs text-[#8C8C8C] mt-1">
                          {disabled
                            ? '本分类暂无题目'
                            : `题库 ${count} 题 · 每轮 ${stat?.sessionSize ?? Math.min(count, QUIZ_SESSION_SIZE)} 题`}
                          {best != null && (
                            <span className="text-primary ml-2">最高 {best}%</span>
                          )}
                        </p>
                      </div>
                      {!disabled && (
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-[#D9D9D9] group-hover:text-primary mt-0.5"
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-center text-[#8C8C8C] py-3 rounded-lg bg-[#FAFAFA] border border-dashed border-[#F0F0F0]">
            请先选择{config.tagStep}，再选择要测验的模块
          </p>
        )}
      </div>
      )}
    </section>
  )
}
