import { useCallback, useEffect, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import {

  CheckCircle2,

  ChevronRight,

  ClipboardCheck,

  Package,

  RotateCcw,

  XCircle,

} from 'lucide-react'

import {

  Dialog,

  DialogContent,

  DialogDescription,

  DialogHeader,

  DialogTitle,

} from './ui/dialog'

import { Progress } from './ui/progress'

import { QUIZ_SESSION_SIZE } from '../constants/quizConfig'

import { useAuth } from '../context/AuthContext'

import {

  getSessionQuestions,

  isAnswerCorrect,

  scoreFeedback,

} from '../lib/knowledgeQuizPool'

import { clearQuizDraft, saveQuizAttempt, saveQuizDraft } from '../lib/quizRecordsStorage'

import type { QuizAnswerRecord, QuizQuestion, QuizSource } from '../types/quiz'

import type { QuizPreparedPayload, QuizSession } from '../types/quizSession'



type Props = {

  open: boolean

  onOpenChange: (open: boolean) => void

  variant: QuizSource

  session: QuizSession | null

  /** 打开弹窗前预生成，避免弹窗动画期间主线程抽题卡顿 */

  prepared?: QuizPreparedPayload | null

  onAttemptSaved?: () => void

  onContinueModules?: () => void

  onChangeTag?: () => void

}



type Phase = 'quiz' | 'result'



const CONFIG: Record<QuizSource, { title: string; dialogClass: string; knowledgeTab: string }> = {

  fabric: {

    title: '面料知识测验',

    dialogClass: 'max-w-lg',

    knowledgeTab: 'fabric',

  },

  product: {

    title: '商品看图测验',

    dialogClass: 'max-w-md',

    knowledgeTab: 'product',

  },

}



function QuizProductImage({ src, alt }: { src: string; alt: string }) {

  const [failed, setFailed] = useState(false)

  if (failed) {

    return (

      <div className="aspect-[4/5] max-h-[280px] w-full rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] flex flex-col items-center justify-center gap-2 text-[#8C8C8C]">

        <Package size={40} className="text-[#D9D9D9]" />

        <span className="text-xs">图片加载失败</span>

      </div>

    )

  }

  return (

    <div className="rounded-xl border border-[#F0F0F0] overflow-hidden bg-[#FAFAFA]">

      <img

        src={src}

        alt={alt}

        className="w-full max-h-[280px] object-contain object-center"

        onError={() => setFailed(true)}

      />

    </div>

  )

}



export default function KnowledgeQuizDialog({

  open,

  onOpenChange,

  variant,

  session,

  prepared,

  onAttemptSaved,

  onContinueModules,

  onChangeTag,

}: Props) {

  const { user } = useAuth()

  const config = CONFIG[variant]



  const [phase, setPhase] = useState<Phase>('quiz')

  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  const [poolTotal, setPoolTotal] = useState(0)

  const [index, setIndex] = useState(0)

  const [selected, setSelected] = useState<string[]>([])

  const [submitted, setSubmitted] = useState(false)

  const [records, setRecords] = useState<QuizAnswerRecord[]>([])



  const resetQuizState = useCallback(() => {

    setPhase('quiz')

    setQuestions([])

    setPoolTotal(0)

    setIndex(0)

    setSelected([])

    setSubmitted(false)

    setRecords([])

  }, [])



  const loadSession = useCallback(

    (s: QuizSession, payload?: QuizPreparedPayload | null) => {

      const { questions: qs, poolTotal: total } =

        payload ?? getSessionQuestions(variant, s.tagKey, s.moduleKey)

      setQuestions(qs)

      setPoolTotal(total)

      setIndex(0)

      setSelected([])

      setSubmitted(false)

      setRecords([])

      setPhase('quiz')

    },

    [variant],

  )



  useEffect(() => {

    if (open && session) {

      if (prepared) {

        loadSession(session, prepared)

      } else {

        setPhase('quiz')

        setQuestions([])

        setPoolTotal(0)

        setIndex(0)

        setSelected([])

        setSubmitted(false)

        setRecords([])

      }

    }

    if (!open) {

      resetQuizState()

    }

  }, [open, session, prepared, loadSession, resetQuizState])



  const isPreparing =

    open && session != null && prepared == null && questions.length === 0 && phase === 'quiz'



  const wrongRecords = useMemo(() => {

    return records

      .filter((r) => !r.correct)

      .map((r) => {

        const q = questions.find((x) => x.id === r.questionId)

        return q ? { record: r, question: q } : null

      })

      .filter(Boolean) as Array<{ record: QuizAnswerRecord; question: QuizQuestion }>

  }, [records, questions])



  const persistDraftIfNeeded = useCallback(() => {

    if (!user || !session || questions.length === 0 || phase === 'result') return

    const answeredCount = records.length

    if (answeredCount === 0) return

    if (answeredCount >= questions.length) return

    saveQuizDraft({

      employeeId: user.id,

      source: variant,

      tagKey: session.tagKey,

      moduleKey: session.moduleKey,

      answeredCount,

      currentIndex: index,

      totalCount: questions.length,

    })

    onAttemptSaved?.()

  }, [user, session, questions, records, index, phase, variant, onAttemptSaved])



  const handleOpenChange = (next: boolean) => {

    if (!next) {

      persistDraftIfNeeded()

      resetQuizState()

    }

    onOpenChange(next)

  }



  const current = questions[index]

  const progress =

    questions.length > 0 ? ((index + (submitted ? 1 : 0)) / questions.length) * 100 : 0



  const toggleOption = (key: string) => {

    if (submitted || !current) return

    if (current.multiSelect) {

      setSelected((prev) =>

        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],

      )

    } else {

      setSelected([key])

    }

  }



  const submitAnswer = () => {

    if (!current || selected.length === 0) return

    if (current.multiSelect && current.correctKeys.length > 1 && selected.length < current.correctKeys.length) {

      return

    }

    const correct = isAnswerCorrect(current, selected)

    setRecords((prev) => [

      ...prev,

      { questionId: current.id, selectedKeys: [...selected], correct },

    ])

    setSubmitted(true)

  }



  const finishModule = () => {

    if (user && session) {

      const correctCount = records.filter((r) => r.correct).length

      const totalCount = questions.length

      const scorePercent =

        totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

      clearQuizDraft(user.id, variant, session.tagKey, session.moduleKey)

      void saveQuizAttempt({

        employeeId: user.id,

        source: variant,

        tagKey: session.tagKey,

        tagLabel: session.tagLabel,

        moduleKey: session.moduleKey,

        moduleLabel: session.moduleLabel,

        correctCount,

        totalCount,

        scorePercent,

        questionIds: questions.map((q) => q.id),

      })

        .then(() => onAttemptSaved?.())

        .catch(() => {})

    }

    setPhase('result')

  }



  const goNext = () => {

    if (index + 1 >= questions.length) {

      finishModule()

      return

    }

    if (user && session && questions.length > 0) {

      saveQuizDraft({

        employeeId: user.id,

        source: variant,

        tagKey: session.tagKey,

        moduleKey: session.moduleKey,

        answeredCount: records.length,

        currentIndex: index + 1,

        totalCount: questions.length,

      })

      onAttemptSaved?.()

    }

    setIndex((i) => i + 1)

    setSelected([])

    setSubmitted(false)

  }



  const retryModule = () => {

    if (user && session) {

      clearQuizDraft(user.id, variant, session.tagKey, session.moduleKey)

    }

    if (session) loadSession(session)

  }



  const correctCount = records.filter((r) => r.correct).length

  const scorePercent =

    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0



  const correctLabel =

    current?.options

      .filter((o) => current.correctKeys.includes(o.key))

      .map((o) => o.label)

      .join('、') ?? ''



  const multiSelectIncomplete =

    current?.multiSelect &&

    current.correctKeys.length > 1 &&

    selected.length > 0 &&

    selected.length < current.correctKeys.length



  if (!session) return null



  return (

    <Dialog open={open} onOpenChange={handleOpenChange}>

      <DialogContent

        motion="none"

        className={`${config.dialogClass} max-h-[90vh] overflow-y-auto p-0 gap-0`}

      >

        <DialogHeader className="px-5 pt-5 pb-3 border-b border-[#F0F0F0]">

          <DialogTitle className="flex items-center gap-2 text-lg">

            <ClipboardCheck size={20} className="text-primary" />

            {config.title}

          </DialogTitle>

          <DialogDescription className="text-left text-sm">

            <span className="text-primary font-medium">

              {session.tagLabel} · {session.moduleLabel}

            </span>

            {phase === 'quiz' && questions.length > 0 && (

              <span className="block mt-0.5 text-[#8C8C8C]">

                本轮 {questions.length} 题

                {poolTotal > questions.length && ` · 题库共 ${poolTotal} 题`}

                {current?.origin === 'generated' && (

                  <span className="text-[#FAAD14]"> · 练习题，以教材为准</span>

                )}

              </span>

            )}

          </DialogDescription>

        </DialogHeader>



        {phase === 'quiz' && current && (

          <div key={current.id} className="px-5 py-4 space-y-4">

            <div className="space-y-2">

              <div className="flex items-center justify-between text-xs text-[#8C8C8C]">

                <span>

                  第 {index + 1} / {questions.length} 题

                </span>

              </div>

              <Progress

                value={progress}

                className="h-1.5 [&_[data-slot=progress-indicator]]:transition-none"

              />

            </div>



            {variant === 'product' && current.imageUrl && (

              <QuizProductImage src={current.imageUrl} alt="商品款式图" />

            )}



            <div>

              {variant === 'fabric' && (

                <p className="text-xs text-[#8C8C8C] mb-1">面料：{current.topic}</p>

              )}

              <p className="text-sm font-medium text-[#262626] leading-relaxed">{current.prompt}</p>

              {current.multiSelect && (

                <p className="text-xs text-[#FAAD14] mt-1">多选题，请选择所有正确答案后再提交</p>

              )}

            </div>



            <div className="space-y-2 max-h-[240px] overflow-y-auto">

              {current.options.map((opt) => {

                const isSelected = selected.includes(opt.key)

                const isCorrect = current.correctKeys.includes(opt.key)

                let border = 'border-[#F0F0F0]'

                let bg = 'bg-white'

                if (submitted) {

                  if (isCorrect) {

                    border = 'border-[#B7EB8F]'

                    bg = 'bg-[#F6FFED]'

                  } else if (isSelected && !isCorrect) {

                    border = 'border-[#FFA39E]'

                    bg = 'bg-[#FFF1F0]'

                  }

                } else if (isSelected) {

                  border = 'border-primary'

                  bg = 'bg-[#E6F7FF]'

                }



                return (

                  <button

                    key={opt.key}

                    type="button"

                    disabled={submitted}

                    onClick={() => toggleOption(opt.key)}

                    className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm ${border} ${bg}`}

                  >

                    <span className="font-medium text-[#1890FF] mr-2">{opt.key}.</span>

                    <span className="text-[#262626]">{opt.label}</span>

                    {submitted && isCorrect && (

                      <CheckCircle2

                        size={16}

                        className="inline ml-2 text-[#52C41A] align-text-bottom"

                      />

                    )}

                    {submitted && isSelected && !isCorrect && (

                      <XCircle

                        size={16}

                        className="inline ml-2 text-[#FF4D4F] align-text-bottom"

                      />

                    )}

                  </button>

                )

              })}

            </div>



            {submitted && (

              <div className="space-y-2 text-sm">

                <p className="text-[#595959]">

                  正确答案：

                  <span className="font-medium text-[#262626]">{correctLabel}</span>

                </p>

                {variant === 'product' && current.reveal && (

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] px-3 py-2 text-[#595959]">

                    <p>

                      货号：

                      <span className="font-medium text-[#262626]">

                        {current.reveal.productCode}

                      </span>

                    </p>

                    <p className="mt-0.5">

                      品名：

                      <span className="font-medium text-[#262626]">{current.reveal.name}</span>

                    </p>

                  </div>

                )}

              </div>

            )}



            <div className="flex gap-2 pt-1">

              {!submitted ? (

                <button

                  type="button"

                  disabled={selected.length === 0 || !!multiSelectIncomplete}

                  onClick={submitAnswer}

                  className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-50"

                >

                  {multiSelectIncomplete ? '请选齐所有正确项' : '确认作答'}

                </button>

              ) : (

                <button

                  type="button"

                  onClick={goNext}

                  className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center gap-1"

                >

                  {index + 1 >= questions.length ? '完成本模块' : '下一题'}

                  <ChevronRight size={16} />

                </button>

              )}

            </div>

          </div>

        )}



        {phase === 'quiz' && !current && open && (

          <div className="px-5 py-8 text-center text-sm text-[#8C8C8C] space-y-2">

            {isPreparing ? (

              <p>题目加载中…</p>

            ) : (

              <>

                <p>该模块暂无题目</p>

                <p className="text-xs">请确认资料库已加载完成，或更换分类后重试</p>

              </>

            )}

          </div>

        )}



        {phase === 'result' && (

          <div className="px-5 py-6 space-y-5">

            <div className="text-center">

              <p className="text-sm text-primary font-medium">

                {session.tagLabel} · {session.moduleLabel}

              </p>

              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F7FF] text-3xl font-bold text-primary mt-3">

                {scorePercent}

              </div>

              <p className="text-lg font-semibold text-[#262626] mt-3">

                {correctCount} / {questions.length} 题正确

              </p>

              <p className="text-sm text-[#595959] mt-2 leading-relaxed">

                {scoreFeedback(variant, scorePercent)}

              </p>

              <p className="text-xs text-[#52C41A] mt-2">成绩已保存至「我的答题」</p>

              <p className="text-xs text-[#8C8C8C] mt-1">

                重测将重新随机抽取最多 {QUIZ_SESSION_SIZE} 题，分数不与上一轮直接对比

              </p>

            </div>



            {wrongRecords.length > 0 && (

              <div className="text-left space-y-2">

                <p className="text-sm font-medium text-[#262626]">错题回顾</p>

                <ul className="space-y-2 max-h-[200px] overflow-y-auto">

                  {wrongRecords.map(({ record, question }) => {

                    const selectedLabels = question.options

                      .filter((o) => record.selectedKeys.includes(o.key))

                      .map((o) => `${o.key}. ${o.label}`)

                      .join('；')

                    const rightLabels = question.options

                      .filter((o) => question.correctKeys.includes(o.key))

                      .map((o) => `${o.key}. ${o.label}`)

                      .join('；')

                    return (

                      <li

                        key={question.id}

                        className="rounded-lg border border-[#FFA39E]/50 bg-[#FFF1F0]/40 px-3 py-2 text-xs"

                      >

                        <p className="text-[#262626] font-medium line-clamp-2">{question.prompt}</p>

                        <p className="text-[#8C8C8C] mt-1">你的选择：{selectedLabels || '未选'}</p>

                        <p className="text-[#52C41A]">正确答案：{rightLabels}</p>

                        <Link

                          to="/knowledge"

                          state={{ tab: config.knowledgeTab }}

                          className="text-primary hover:underline mt-1 inline-block"

                          onClick={() => handleOpenChange(false)}

                        >

                          查看知识点 →

                        </Link>

                      </li>

                    )

                  })}

                </ul>

              </div>

            )}



            <div className="flex flex-col gap-2">

              <button

                type="button"

                onClick={retryModule}

                className="w-full h-10 rounded-lg border border-[#D9D9D9] text-sm text-[#595959] hover:bg-[#FAFAFA] flex items-center justify-center gap-1"

              >

                <RotateCcw size={14} />

                重测本模块

              </button>

              <button

                type="button"

                onClick={() => {

                  handleOpenChange(false)

                  onContinueModules?.()

                }}

                className="w-full h-10 rounded-lg bg-primary text-white text-sm font-medium"

              >

                继续选择其他模块

              </button>

              <button

                type="button"

                onClick={() => {

                  handleOpenChange(false)

                  onChangeTag?.()

                }}

                className="w-full h-9 text-sm text-[#8C8C8C] hover:text-primary"

              >

                更换分类标签

              </button>

            </div>

          </div>

        )}

      </DialogContent>

    </Dialog>

  )

}


