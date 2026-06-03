import { toast } from 'sonner'
import type {
  ModuleProgressSummary,
  QuizModuleAttempt,
  QuizModuleDraft,
  QuizModuleStatus,
  TagProgressSummary,
} from '../types/quizRecord'
import type { QuizSource } from '../types/quiz'
import { USE_MOCK } from '../api/config'
import {
  deleteQuizDraft as apiDeleteDraft,
  getApiAttempts,
  getApiDrafts,
  postQuizAttempt,
  pushApiAttempt,
  putQuizDraft,
} from '../services/userStateApi'
import { getModuleStatsForTag, getTagList } from './knowledgeQuizPool'

const STORAGE_KEY = 'caisedi_quiz_attempts_v2'
const DRAFT_STORAGE_KEY = 'caisedi_quiz_drafts_v1'

function migrateAttempts(raw: unknown): QuizModuleAttempt[] {
  if (!Array.isArray(raw)) return []
  return raw.map((a) => {
    const item = a as QuizModuleAttempt & { tagKey?: string }
    return {
      ...item,
      tagKey: item.tagKey ?? 'all',
      tagLabel: item.tagLabel ?? '全部',
    }
  })
}

function readAll(): QuizModuleAttempt[] {
  const api = getApiAttempts()
  if (!USE_MOCK && api) return api
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const legacy = localStorage.getItem('caisedi_quiz_attempts_v1')
      if (legacy) {
        const parsed = migrateAttempts(JSON.parse(legacy))
        writeAll(parsed)
        return parsed
      }
      return []
    }
    return migrateAttempts(JSON.parse(raw))
  } catch {
    return []
  }
}

function writeAll(attempts: QuizModuleAttempt[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
}

export async function saveQuizAttempt(
  attempt: Omit<QuizModuleAttempt, 'id' | 'completedAt'> & { completedAt?: string },
): Promise<QuizModuleAttempt> {
  if (!USE_MOCK) {
    try {
      const saved = await postQuizAttempt(attempt)
      pushApiAttempt(saved)
      return saved
    } catch (err) {
      console.error('[quiz] save attempt failed', err)
      toast.error('测验成绩保存失败，请稍后重试')
      throw err
    }
  }
  const record: QuizModuleAttempt = {
    ...attempt,
    id: `${attempt.employeeId}-${attempt.source}-${attempt.tagKey}-${attempt.moduleKey}-${Date.now()}`,
    completedAt: attempt.completedAt ?? new Date().toISOString(),
  }
  const all = readAll()
  all.unshift(record)
  writeAll(all.slice(0, 5000))
  return record
}

export function getAttemptsByEmployee(employeeId: number): QuizModuleAttempt[] {
  return readAll()
    .filter((a) => a.employeeId === employeeId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
}

function readDrafts(): QuizModuleDraft[] {
  const api = getApiDrafts()
  if (!USE_MOCK && api) return api
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as QuizModuleDraft[]) : []
  } catch {
    return []
  }
}

function writeDrafts(drafts: QuizModuleDraft[]) {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(drafts))
}

function draftKey(
  employeeId: number,
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
) {
  return `${employeeId}:${source}:${tagKey}:${moduleKey}`
}

export function getQuizDraft(
  employeeId: number,
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
): QuizModuleDraft | null {
  const key = draftKey(employeeId, source, tagKey, moduleKey)
  return readDrafts().find((d) => draftKey(d.employeeId, d.source, d.tagKey, d.moduleKey) === key) ?? null
}

export function saveQuizDraft(
  draft: Omit<QuizModuleDraft, 'updatedAt'> & { updatedAt?: string },
): QuizModuleDraft {
  const record: QuizModuleDraft = {
    ...draft,
    updatedAt: draft.updatedAt ?? new Date().toISOString(),
  }
  const key = draftKey(record.employeeId, record.source, record.tagKey, record.moduleKey)
  const rest = readDrafts().filter(
    (d) => draftKey(d.employeeId, d.source, d.tagKey, d.moduleKey) !== key,
  )
  if (USE_MOCK) {
    writeDrafts([record, ...rest])
  } else {
    void putQuizDraft({
      source: record.source,
      tagKey: record.tagKey,
      moduleKey: record.moduleKey,
      answeredCount: record.answeredCount,
      currentIndex: record.currentIndex,
      totalCount: record.totalCount,
    }).catch((err) => {
      console.error('[quiz] save draft failed', err)
      toast.error('测验进度保存失败')
    })
  }
  return record
}

export function clearQuizDraft(
  employeeId: number,
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
) {
  const key = draftKey(employeeId, source, tagKey, moduleKey)
  const filtered = readDrafts().filter(
    (d) => draftKey(d.employeeId, d.source, d.tagKey, d.moduleKey) !== key,
  )
  if (USE_MOCK) {
    writeDrafts(filtered)
  } else {
    void apiDeleteDraft(source, tagKey, moduleKey).catch((err) => {
      console.error('[quiz] delete draft failed', err)
      toast.error('清除草稿失败')
    })
  }
}

export function getModuleStatus(
  employeeId: number,
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
): QuizModuleStatus {
  const draft = getQuizDraft(employeeId, source, tagKey, moduleKey)
  if (draft && draft.answeredCount < draft.totalCount) {
    return 'in_progress'
  }
  const hasCompleted = getAttemptsByEmployee(employeeId).some(
    (a) =>
      a.source === source && a.tagKey === tagKey && a.moduleKey === moduleKey,
  )
  if (hasCompleted) return 'completed'
  return 'not_started'
}

export function getBestScore(
  employeeId: number,
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
): number | null {
  const attempts = getAttemptsByEmployee(employeeId).filter(
    (a) => a.source === source && a.tagKey === tagKey && a.moduleKey === moduleKey,
  )
  if (attempts.length === 0) return null
  return Math.max(...attempts.map((a) => a.scorePercent))
}

export function getTagModuleProgress(
  employeeId: number,
  source: QuizSource,
): TagProgressSummary[] {
  const tags = getTagList(source).filter((t) => t.key !== 'all')
  const attempts = getAttemptsByEmployee(employeeId).filter((a) => a.source === source)

  return tags.map((tag) => {
    const moduleStats = getModuleStatsForTag(source, tag.key)
    const modules: ModuleProgressSummary[] = moduleStats.map((m) => {
      const moduleAttempts = attempts.filter(
        (a) => a.tagKey === tag.key && a.moduleKey === m.key,
      )
      const best =
        moduleAttempts.length > 0
          ? Math.max(...moduleAttempts.map((a) => a.scorePercent))
          : null
      const last = moduleAttempts[0] ?? null
      return {
        moduleKey: m.key,
        moduleLabel: m.label,
        questionCount: m.count,
        attemptCount: moduleAttempts.length,
        bestScore: best,
        lastScore: last?.scorePercent ?? null,
        lastCompletedAt: last?.completedAt ?? null,
      }
    })
    return {
      tagKey: tag.key,
      tagLabel: tag.label,
      modules,
    }
  })
}

/** @deprecated */
export function getModuleProgress(employeeId: number, source: QuizSource): ModuleProgressSummary[] {
  return getTagModuleProgress(employeeId, source).flatMap((t) => t.modules)
}
