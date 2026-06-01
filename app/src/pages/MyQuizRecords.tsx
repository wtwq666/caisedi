import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardCheck, BookOpen, Package, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageBreadcrumb from '../components/PageBreadcrumb'
import {
  getModuleStatus,
  getTagModuleProgress,
  getAttemptsByEmployee,
} from '../lib/quizRecordsStorage'
import type { QuizModuleStatus } from '../types/quizRecord'

const MODULE_STATUS_LABEL: Record<QuizModuleStatus, string> = {
  not_started: '未答题',
  in_progress: '进行中',
  completed: '已完成',
}

function ModuleStatusPill({ status }: { status: QuizModuleStatus }) {
  const styles: Record<QuizModuleStatus, string> = {
    not_started: 'bg-[#F5F5F5] text-[#8C8C8C]',
    in_progress: 'bg-[#FFF7E6] text-[#D48806]',
    completed: 'bg-[#F6FFED] text-[#52C41A]',
  }
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded ${styles[status]}`}>
      {MODULE_STATUS_LABEL[status]}
    </span>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? 'bg-[#F6FFED] text-[#52C41A]'
      : score >= 70
        ? 'bg-[#E6F7FF] text-[#1890FF]'
        : score >= 60
          ? 'bg-[#FFF7E6] text-[#FAAD14]'
          : 'bg-[#FFF1F0] text-[#CF1322]'
  return <span className={`text-xs font-medium px-2 py-0.5 rounded ${color}`}>{score}%</span>
}

function TagProgressSection({ source }: { source: 'fabric' | 'product' }) {
  const { user } = useAuth()
  const tagProgress = useMemo(
    () => (user ? getTagModuleProgress(user.id, source) : []),
    [user, source],
  )

  const title = source === 'fabric' ? '面料知识（按分类标签）' : '商品资料（按系列标签）'
  const Icon = source === 'fabric' ? BookOpen : Package

  return (
    <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#F0F0F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-primary" />
          <h2 className="text-base font-semibold text-[#262626]">{title}</h2>
        </div>
        <Link
          to="/knowledge"
          state={{ openQuiz: source }}
          className="text-xs text-primary hover:underline flex items-center gap-0.5"
        >
          去测验
          <ChevronRight size={12} />
        </Link>
      </div>
      <div className="divide-y divide-[#F0F0F0]">
        {tagProgress.map((tag) => {
          const tested = tag.modules.filter((m) => m.attemptCount > 0).length
          const total = tag.modules.length
          return (
            <div key={tag.tagKey} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#262626]">{tag.tagLabel}</span>
                <span className="text-xs text-[#8C8C8C]">
                  已测 {tested}/{total} 个模块
                </span>
              </div>
              <div className="space-y-2">
                {tag.modules.map((m) => {
                  const status =
                    user != null
                      ? getModuleStatus(user.id, source, tag.tagKey, m.moduleKey)
                      : 'not_started'
                  return (
                    <Link
                      key={m.moduleKey}
                      to="/knowledge"
                      state={{
                        openQuiz: source,
                        quizTagKey: tag.tagKey,
                        quizModuleKey: m.moduleKey,
                      }}
                      className="flex items-center justify-between gap-2 pl-3 border-l-2 border-[#F0F0F0] py-1.5 -mx-1 px-1 rounded hover:bg-[#F5F5F5] transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-xs text-[#262626] group-hover:text-primary">
                          {m.moduleLabel}
                        </p>
                        <p className="text-[10px] text-[#8C8C8C]">{m.questionCount} 题</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <ModuleStatusPill status={status} />
                        {m.bestScore != null ? (
                          <ScoreBadge score={m.bestScore} />
                        ) : (
                          <ChevronRight
                            size={14}
                            className="text-[#D9D9D9] group-hover:text-primary"
                          />
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function MyQuizRecords() {
  useDocumentTitle('我的答题')
  const { user } = useAuth()
  const [tab, setTab] = useState<'progress' | 'history'>('progress')

  const attempts = useMemo(
    () => (user ? getAttemptsByEmployee(user.id) : []),
    [user, tab],
  )

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <PageBreadcrumb items={[{ label: '学习平台', to: '/' }, { label: '我的答题' }]} />

      <div>
        <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-[#262626] flex items-center gap-2">
          <ClipboardCheck size={22} className="text-primary hidden md:block" />
          我的答题
        </h1>
        <p className="app-page-local-subtitle text-sm text-[#8C8C8C] mt-1">
          {user?.name}（{user?.employeeNo}）· 按分类标签 + 知识模块记录成绩
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab('progress')}
          className={`px-4 h-9 rounded-lg text-sm transition-colors ${
            tab === 'progress' ? 'bg-primary text-white' : 'bg-[#F5F5F5] text-[#595959]'
          }`}
        >
          标签与模块进度
        </button>
        <button
          type="button"
          onClick={() => setTab('history')}
          className={`px-4 h-9 rounded-lg text-sm transition-colors ${
            tab === 'history' ? 'bg-primary text-white' : 'bg-[#F5F5F5] text-[#595959]'
          }`}
        >
          测验记录
        </button>
      </div>

      {tab === 'progress' && (
        <div className="space-y-4">
          <p className="text-xs text-[#8C8C8C] leading-relaxed">
            面料按「天然纤维、合成纤维…」等标签测验；商品按「生活、通勤…」等系列标签测验。每个标签下需完成各知识模块。
          </p>
          <TagProgressSection source="fabric" />
          <TagProgressSection source="product" />
        </div>
      )}

      {tab === 'history' && (
        <div className="bg-white rounded-lg border border-[#F0F0F0] overflow-hidden">
          {attempts.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#8C8C8C]">暂无测验记录</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FAFAFA] text-left text-xs text-[#8C8C8C]">
                    <th className="px-4 py-3 font-medium">时间</th>
                    <th className="px-4 py-3 font-medium">类型</th>
                    <th className="px-4 py-3 font-medium">标签</th>
                    <th className="px-4 py-3 font-medium">模块</th>
                    <th className="px-4 py-3 font-medium">得分</th>
                    <th className="px-4 py-3 font-medium">正确</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a) => (
                    <tr key={a.id} className="border-t border-[#F0F0F0]">
                      <td className="px-4 py-3 text-[#595959] whitespace-nowrap">
                        {new Date(a.completedAt).toLocaleString('zh-CN', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-[#595959]">
                        {a.source === 'fabric' ? '面料' : '商品'}
                      </td>
                      <td className="px-4 py-3 text-[#262626]">{a.tagLabel}</td>
                      <td className="px-4 py-3 text-[#595959]">{a.moduleLabel}</td>
                      <td className="px-4 py-3">
                        <ScoreBadge score={a.scorePercent} />
                      </td>
                      <td className="px-4 py-3 text-[#595959]">
                        {a.correctCount}/{a.totalCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
