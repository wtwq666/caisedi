import { apiRequest } from '../api/client'
import { USE_MOCK } from '../api/config'
import type { QuizModuleAttempt, QuizModuleDraft } from '../types/quizRecord'
import type { QuizSource } from '../types/quiz'

let attemptsCache: QuizModuleAttempt[] | null = null
let draftsCache: QuizModuleDraft[] | null = null

export async function initUserStateFromApi(employeeId: number): Promise<void> {
  if (USE_MOCK) return
  const [attempts, drafts] = await Promise.all([
    apiRequest<
      Array<{
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
      }>
    >('/quiz-attempts'),
    apiRequest<
      Array<{
        employeeId: number
        source: QuizSource
        tagKey: string
        moduleKey: string
        answeredCount: number
        currentIndex: number
        totalCount: number
        updatedAt: string
      }>
    >('/quiz-drafts'),
  ])
  attemptsCache = attempts.filter((a) => a.employeeId === employeeId)
  draftsCache = drafts.filter((d) => d.employeeId === employeeId)
}

export function getApiAttempts(): QuizModuleAttempt[] | null {
  return attemptsCache
}

export function getApiDrafts(): QuizModuleDraft[] | null {
  return draftsCache
}

export function pushApiAttempt(record: QuizModuleAttempt): void {
  if (attemptsCache) attemptsCache.unshift(record)
}

export async function postQuizAttempt(
  body: Omit<QuizModuleAttempt, 'id' | 'completedAt'>,
): Promise<QuizModuleAttempt> {
  return apiRequest('/quiz-attempts', { method: 'POST', body: JSON.stringify(body) })
}

export async function putQuizDraft(body: {
  source: QuizSource
  tagKey: string
  moduleKey: string
  answeredCount: number
  currentIndex: number
  totalCount: number
}): Promise<void> {
  await apiRequest('/quiz-drafts', { method: 'PUT', body: JSON.stringify(body) })
}

export async function deleteQuizDraft(
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
): Promise<void> {
  const qs = new URLSearchParams({ source, tagKey, moduleKey })
  await apiRequest(`/quiz-drafts?${qs}`, { method: 'DELETE' })
}

export function invalidateUserStateCache(): void {
  attemptsCache = null
  draftsCache = null
}
