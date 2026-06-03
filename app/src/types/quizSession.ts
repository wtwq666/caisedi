import type { QuizQuestion } from './quiz'

export type QuizSession = {
  tagKey: string
  tagLabel: string
  moduleKey: string
  moduleLabel: string
}

/** 打开弹窗前预生成的本轮题目，避免弹窗动画期间主线程抽题卡顿 */
export type QuizPreparedPayload = {
  questions: QuizQuestion[]
  poolTotal: number
}
