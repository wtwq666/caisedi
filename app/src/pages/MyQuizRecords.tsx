import { useMemo, useState } from 'react'
import { ClipboardCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageBreadcrumb from '../components/PageBreadcrumb'
import QuizProgressBoard from '../components/QuizProgressBoard'
import { getTagModuleProgress, getAttemptsByEmployee } from '../lib/quizRecordsStorage'

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

export default function MyQuizRecords() {
  useDocumentTitle('我的答题')
  const { user } = useAuth()
  const [tab, setTab] = useState<'progress' | 'history'>('progress')
  const [sourceTab, setSourceTab] = useState<'fabric' | 'product'>('fabric')

  const fabricProgress = useMemo(
    () => (user ? getTagModuleProgress(user.id, 'fabric') : []),
    [user, tab],
  )
  const productProgress = useMemo(
    () => (user ? getTagModuleProgress(user.id, 'product') : []),
    [user, tab],
  )
  const attempts = useMemo(
    () => (user ? getAttemptsByEmployee(user.id) : []),
    [user, tab],
  )

  return (
    <div className="max-w-[960px] mx-auto space-y-4 md:space-y-6">
      <PageBreadcrumb items={[{ label: '学习平台', to: '/' }, { label: '我的答题' }]} />

      <div>
        <h1 className="app-page-local-title text-xl md:text-2xl font-semibold text-[#262626] flex items-center gap-2">
          <ClipboardCheck size={22} className="text-primary hidden md:block" />
          我的答题
        </h1>
        <p className="app-page-local-subtitle text-sm text-[#8C8C8C] mt-1">
          {user?.name}（{user?.employeeNo}）
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
          学习进度
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

      {tab === 'progress' && user && (
        <>
          <div className="flex rounded-lg border border-[#F0F0F0] p-0.5 bg-[#FAFAFA]">
            <button
              type="button"
              onClick={() => setSourceTab('fabric')}
              className={`flex-1 h-9 rounded-md text-sm font-medium transition-colors ${
                sourceTab === 'fabric' ? 'bg-white text-[#1890FF] shadow-sm' : 'text-[#595959]'
              }`}
            >
              面料知识
            </button>
            <button
              type="button"
              onClick={() => setSourceTab('product')}
              className={`flex-1 h-9 rounded-md text-sm font-medium transition-colors ${
                sourceTab === 'product' ? 'bg-white text-[#1890FF] shadow-sm' : 'text-[#595959]'
              }`}
            >
              商品资料
            </button>
          </div>

          <QuizProgressBoard
            key={sourceTab}
            source={sourceTab}
            employeeId={user.id}
            tagProgress={sourceTab === 'fabric' ? fabricProgress : productProgress}
          />
        </>
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
                    <th className="px-4 py-3 font-medium">品类</th>
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
