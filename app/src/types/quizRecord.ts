import type { QuizSource } from './quiz'

export interface QuizModuleAttempt {
  id: string
  employeeId: number
  source: QuizSource
  tagKey: string
  tagLabel: string
  moduleKey: string
  moduleLabel: string
  correctCount: number
  totalCount: number
  scorePercent: number
  completedAt: string
  /** 本轮题目 id，便于复盘 */
  questionIds?: string[]
}

export interface TagProgressSummary {
  tagKey: string
  tagLabel: string
  modules: ModuleProgressSummary[]
}

export interface ModuleProgressSummary {
  moduleKey: string
  moduleLabel: string
  questionCount: number
  attemptCount: number
  bestScore: number | null
  lastScore: number | null
  lastCompletedAt: string | null
}

/** 未完成测验的暂存进度（关闭弹窗时保存） */
export interface QuizModuleDraft {
  employeeId: number
  source: QuizSource
  tagKey: string
  moduleKey: string
  answeredCount: number
  currentIndex: number
  totalCount: number
  updatedAt: string
}

export type QuizModuleStatus = 'not_started' | 'in_progress' | 'completed'
