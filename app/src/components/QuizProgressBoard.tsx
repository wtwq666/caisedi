import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, Package } from 'lucide-react'
import { FABRIC_CATEGORY_TREE } from '../constants/fabricCategoryTaxonomy'
import { FABRIC_QUIZ_MODULES, PRODUCT_QUIZ_MODULES } from '../constants/quizModules'
import { getModuleStatus } from '../lib/quizRecordsStorage'
import type { QuizModuleStatus, TagProgressSummary } from '../types/quizRecord'
import type { QuizSource } from '../types/quiz'

const MODULE_STATUS_LABEL: Record<QuizModuleStatus, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  completed: '已完成',
}

const STATUS_STYLE: Record<QuizModuleStatus, { card: string; dot: string }> = {
  not_started: {
    card: 'border-[#F0F0F0] bg-[#FAFAFA]',
    dot: 'bg-[#D9D9D9]',
  },
  in_progress: {
    card: 'border-[#FFE58F] bg-[#FFFBE6]',
    dot: 'bg-[#FAAD14]',
  },
  completed: {
    card: 'border-[#B7EB8F] bg-[#F6FFED]',
    dot: 'bg-[#52C41A]',
  },
}

type StatusFilter = 'all' | QuizModuleStatus | 'todo'

function tagMatchesFabricFilter(tagKey: string, parentKey: string): boolean {
  if (parentKey === 'all') return true
  const group = FABRIC_CATEGORY_TREE.find((g) => g.key === parentKey)
  return group?.children.some((c) => c.key === tagKey) ?? false
}

const STATUS_SEGMENTS: { key: StatusFilter; label: string }[] = [
  { key: 'todo', label: '待完成' },
  { key: 'all', label: '全部' },
  { key: 'in_progress', label: '进行中' },
  { key: 'completed', label: '已完成' },
]

function getTagProgress(tag: TagProgressSummary, employeeId: number, source: QuizSource) {
  let completed = 0
  let inProgress = 0
  for (const m of tag.modules) {
    const s = getModuleStatus(employeeId, source, tag.tagKey, m.moduleKey)
    if (s === 'completed') completed++
    else if (s === 'in_progress') inProgress++
  }
  const total = tag.modules.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const allDone = total > 0 && completed === total
  return { completed, inProgress, total, pct, allDone }
}

function sortTagsSmart(
  tags: TagProgressSummary[],
  employeeId: number,
  source: QuizSource,
): TagProgressSummary[] {
  const score = (tag: TagProgressSummary) => {
    const { completed, inProgress, allDone } = getTagProgress(tag, employeeId, source)
    if (allDone) return 1000
    if (inProgress > 0) return 100 + inProgress
    if (completed > 0) return 200 + completed
    return 300
  }
  return [...tags].sort((a, b) => score(a) - score(b) || a.tagLabel.localeCompare(b.tagLabel, 'zh'))
}

function pickDefaultTagKey(
  sorted: TagProgressSummary[],
  employeeId: number,
  source: QuizSource,
): string | null {
  const todo = sorted.find((t) => !getTagProgress(t, employeeId, source).allDone)
  return todo?.tagKey ?? sorted[0]?.tagKey ?? null
}

type QuizProgressBoardProps = {
  source: QuizSource
  employeeId: number
  tagProgress: TagProgressSummary[]
}

export default function QuizProgressBoard({
  source,
  employeeId,
  tagProgress,
}: QuizProgressBoardProps) {
  const modules = source === 'fabric' ? FABRIC_QUIZ_MODULES : PRODUCT_QUIZ_MODULES
  const title = source === 'fabric' ? '面料知识' : '商品资料'
  const Icon = source === 'fabric' ? BookOpen : Package

  const [parentKey, setParentKey] = useState('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todo')
  const [selectedTagKey, setSelectedTagKey] = useState<string | null>(null)
  const [showDone, setShowDone] = useState(false)

  const filteredTags = useMemo(() => {
    return tagProgress.filter((tag) => {
      if (source === 'fabric' && !tagMatchesFabricFilter(tag.tagKey, parentKey)) {
        return false
      }
      const prog = getTagProgress(tag, employeeId, source)
      if (statusFilter === 'todo' && prog.allDone) return false
      if (statusFilter !== 'all' && statusFilter !== 'todo') {
        return tag.modules.some(
          (m) => getModuleStatus(employeeId, source, tag.tagKey, m.moduleKey) === statusFilter,
        )
      }
      return true
    })
  }, [tagProgress, source, parentKey, statusFilter, employeeId])

  const sortedTags = useMemo(
    () => sortTagsSmart(filteredTags, employeeId, source),
    [filteredTags, employeeId, source],
  )

  const doneTags = useMemo(
    () =>
      tagProgress.filter(
        (t) =>
          getTagProgress(t, employeeId, source).allDone &&
          (source !== 'fabric' || tagMatchesFabricFilter(t.tagKey, parentKey)),
      ),
    [tagProgress, employeeId, source, parentKey],
  )

  useEffect(() => {
    if (sortedTags.length === 0) {
      setSelectedTagKey(null)
      return
    }
    if (!selectedTagKey || !sortedTags.some((t) => t.tagKey === selectedTagKey)) {
      setSelectedTagKey(pickDefaultTagKey(sortedTags, employeeId, source))
    }
  }, [sortedTags, selectedTagKey, employeeId, source])

  const selectedTag = sortedTags.find((t) => t.tagKey === selectedTagKey) ?? null

  const stats = useMemo(() => {
    let total = 0
    let completed = 0
    for (const tag of tagProgress) {
      for (const m of tag.modules) {
        total++
        if (getModuleStatus(employeeId, source, tag.tagKey, m.moduleKey) === 'completed') {
          completed++
        }
      }
    }
    return { total, completed, pct: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }, [tagProgress, employeeId, source])

  const quizLinkState = (tagKey: string, moduleKey: string) => ({
    openQuiz: source,
    quizTagKey: tagKey,
    quizModuleKey: moduleKey,
  })

  /** 待完成品类（与横滑列表同序），「下一项」按此顺序循环，避免总在头两个之间跳 */
  const incompleteTags = useMemo(
    () => sortedTags.filter((t) => !getTagProgress(t, employeeId, source).allDone),
    [sortedTags, employeeId, source],
  )

  const nextTodoTag = useMemo(() => {
    if (incompleteTags.length <= 1) return null
    const idx = incompleteTags.findIndex((t) => t.tagKey === selectedTagKey)
    if (idx === -1) return incompleteTags[0]
    return incompleteTags[(idx + 1) % incompleteTags.length]
  }, [incompleteTags, selectedTagKey])

  const selectedProg = selectedTag
    ? getTagProgress(selectedTag, employeeId, source)
    : null

  const nextModule = selectedTag?.modules.find((m) => {
    const s = getModuleStatus(employeeId, source, selectedTag.tagKey, m.moduleKey)
    return s !== 'completed'
  })

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden flex flex-col min-h-0">
      {/* 顶栏 */}
      <div className="px-4 py-3 border-b border-[#F0F0F0] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Icon size={18} className="text-primary shrink-0" />
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-[#262626]">{title}</h2>
            <p className="text-[11px] text-[#8C8C8C]">
              完成 {stats.completed}/{stats.total} · {stats.pct}%
            </p>
          </div>
        </div>
        <Link to="/knowledge" state={{ openQuiz: source }} className="text-xs text-primary shrink-0">
          去测验
        </Link>
      </div>

      {/* 内联筛选：分段器 + 纤维类型 + 品类横滑 */}
      <div className="shrink-0 border-b border-[#F0F0F0] bg-[#FAFAFA]/50 space-y-2.5 px-4 pt-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 min-w-0 p-0.5 rounded-lg bg-[#EBEBEB]">
            {STATUS_SEGMENTS.map((seg) => (
              <button
                key={seg.key}
                type="button"
                onClick={() => setStatusFilter(seg.key)}
                className={`flex-1 min-w-0 py-1.5 rounded-md text-[11px] sm:text-xs font-medium transition-all ${
                  statusFilter === seg.key
                    ? 'bg-white text-[#1890FF] shadow-sm'
                    : 'text-[#595959]'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
          {nextTodoTag && (
            <button
              type="button"
              onClick={() => setSelectedTagKey(nextTodoTag.tagKey)}
              className="shrink-0 max-w-[42%] text-[11px] text-[#1890FF] whitespace-nowrap py-1 truncate text-right"
              title={`下一个：${nextTodoTag.tagLabel}`}
            >
              {nextTodoTag.tagLabel} →
            </button>
          )}
        </div>

        {source === 'fabric' && (
          <div className="relative -mx-1">
            <div className="flex gap-1.5 overflow-x-auto px-1 pb-0.5 scrollbar-none">
              {[{ key: 'all', label: '全部' }, ...FABRIC_CATEGORY_TREE].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setParentKey(item.key)}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                    parentKey === item.key
                      ? 'bg-[#1890FF] text-white'
                      : 'bg-white text-[#595959] border border-[#F0F0F0]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative -mx-1">
          <div className="flex gap-2 overflow-x-auto px-1 pb-0.5 scrollbar-none">
          {sortedTags.map((tag) => {
            const { pct, allDone } = getTagProgress(tag, employeeId, source)
            const active = tag.tagKey === selectedTagKey
            return (
              <button
                key={tag.tagKey}
                type="button"
                onClick={() => setSelectedTagKey(tag.tagKey)}
                className={`shrink-0 min-w-[4.5rem] max-w-[7rem] px-3 py-2 rounded-xl border text-left transition-all ${
                  active
                    ? 'border-[#1890FF] bg-[#E6F7FF] shadow-sm'
                    : 'border-[#F0F0F0] bg-white'
                }`}
              >
                <p
                  className={`text-xs font-medium truncate ${active ? 'text-[#1890FF]' : 'text-[#262626]'}`}
                >
                  {tag.tagLabel}
                </p>
                <p className="text-[10px] text-[#8C8C8C] mt-0.5">
                  {allDone ? '已完成' : `${pct}%`}
                </p>
              </button>
            )
          })}
          </div>
        </div>

        {doneTags.length > 0 && statusFilter === 'todo' && (
          <div className="pt-0.5">
            <button
              type="button"
              onClick={() => setShowDone((v) => !v)}
              className="text-[11px] text-[#8C8C8C]"
            >
              {showDone ? '收起' : '查看'} 已完成品类 ({doneTags.length})
            </button>
            {showDone && (
              <div className="flex gap-2 overflow-x-auto mt-2 pb-1">
                {doneTags.map((tag) => (
                  <button
                    key={tag.tagKey}
                    type="button"
                    onClick={() => setSelectedTagKey(tag.tagKey)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs border ${
                      selectedTagKey === tag.tagKey
                        ? 'border-[#52C41A] bg-[#F6FFED] text-[#389E0D]'
                        : 'border-[#F0F0F0] text-[#8C8C8C]'
                    }`}
                  >
                    {tag.tagLabel}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 当前品类：模块一屏网格 */}
      {!selectedTag ? (
        <div className="py-12 text-center text-sm text-[#8C8C8C]">暂无符合筛选的品类</div>
      ) : (
        <div className="p-4 flex-1 min-h-0">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-semibold text-[#262626]">{selectedTag.tagLabel}</h3>
              {selectedProg && (
                <p className="text-xs text-[#8C8C8C] mt-0.5">
                  {selectedProg.completed}/{selectedProg.total} 模块已完成
                </p>
              )}
            </div>
            <div className="h-1.5 w-20 rounded-full bg-[#F0F0F0] overflow-hidden shrink-0">
              <div
                className="h-full bg-[#52C41A] rounded-full"
                style={{ width: `${selectedProg?.pct ?? 0}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {modules.map((mod) => {
              const m = selectedTag.modules.find((x) => x.moduleKey === mod.key)
              if (!m) {
                return (
                  <div
                    key={mod.key}
                    className="rounded-xl border border-dashed border-[#E8E8E8] p-3 opacity-50"
                  >
                    <p className="text-xs text-[#BFBFBF]">{mod.label}</p>
                    <p className="text-[10px] text-[#D9D9D9] mt-1">暂无题目</p>
                  </div>
                )
              }
              const status = getModuleStatus(employeeId, source, selectedTag.tagKey, mod.key)
              const style = STATUS_STYLE[status]
              return (
                <Link
                  key={mod.key}
                  to="/knowledge"
                  state={quizLinkState(selectedTag.tagKey, mod.key)}
                  className={`rounded-xl border p-3 flex flex-col min-h-[5.5rem] active:scale-[0.98] transition-transform ${style.card}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <span className="text-xs font-medium text-[#262626] leading-tight">
                      {mod.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8C8C8C] mt-auto">
                    {MODULE_STATUS_LABEL[status]}
                    {m.bestScore != null ? ` · ${m.bestScore}%` : ''}
                  </p>
                  <p className="text-[10px] text-[#BFBFBF]">{m.questionCount} 题</p>
                </Link>
              )
            })}
          </div>

          {nextModule && (
            <Link
              to="/knowledge"
              state={quizLinkState(selectedTag.tagKey, nextModule.moduleKey)}
              className="mt-4 flex items-center justify-center gap-1 h-11 rounded-xl bg-[#1890FF] text-white text-sm font-medium"
            >
              继续：{nextModule.moduleLabel}
              <ChevronRight size={16} />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
