import { FABRIC_QUIZ_MODULES, PRODUCT_QUIZ_MODULES } from '../constants/quizModules'
import { QUIZ_SESSION_SIZE } from '../constants/quizConfig'
import { FABRIC_QUIZ_TAGS, PRODUCT_QUIZ_TAGS } from '../constants/quizTags'
import { fabricService } from '../services/fabricService'
import { productService } from '../services/productService'
import { buildAllFabricQuizQuestions } from './buildFabricQuizzes'
import { buildProductQuizQuestions } from './buildProductQuizzes'
import { getProductIdFromQuestionId } from './buildProductQuizzes'
import { groupPoolByModule, pickBalancedByModule, shuffle } from './quizHelpers'
import type { QuizModuleStat, QuizQuestion, QuizSource } from '../types/quiz'

let fabricPoolCache: QuizQuestion[] | null = null
let productPoolCache: QuizQuestion[] | null = null

function buildFabricPool(): QuizQuestion[] {
  return buildAllFabricQuizQuestions(fabricService.list())
}

function buildProductPool(): QuizQuestion[] {
  return buildProductQuizQuestions(productService.list())
}

export function invalidateQuizPool(): void {
  fabricPoolCache = null
  productPoolCache = null
}

export function getQuizPool(source: QuizSource): QuizQuestion[] {
  if (source === 'fabric') {
    if (fabricPoolCache === null) fabricPoolCache = buildFabricPool()
    return fabricPoolCache
  }
  if (productPoolCache === null) productPoolCache = buildProductPool()
  return productPoolCache
}

function matchTag(q: QuizQuestion, tagKey: string): boolean {
  if (tagKey === 'all') return true
  return q.tagKey === tagKey
}

function filterPool(source: QuizSource, tagKey: string, moduleKey: string): QuizQuestion[] {
  return getQuizPool(source).filter(
    (q) => matchTag(q, tagKey) && q.moduleKey === moduleKey,
  )
}

/** 优先 author 题，再补 generated；商品题同轮同 productId 不重复 */
function pickSessionQuestions(pool: QuizQuestion[], count: number, source: QuizSource): QuizQuestion[] {
  if (pool.length === 0) return []
  const target = Math.min(count, pool.length)

  const author = shuffle(pool.filter((q) => q.origin === 'author'))
  const generated = shuffle(pool.filter((q) => q.origin !== 'author'))
  const ordered = [...author, ...generated]

  if (source !== 'product') {
    return pickBalancedByModule(ordered, target)
  }

  const picked: QuizQuestion[] = []
  const usedProducts = new Set<number>()

  for (const q of ordered) {
    if (picked.length >= target) break
    const pid = getProductIdFromQuestionId(q.id)
    if (pid != null && usedProducts.has(pid)) continue
    if (pid != null) usedProducts.add(pid)
    picked.push(q)
  }

  if (picked.length < target) {
    for (const q of shuffle(ordered)) {
      if (picked.length >= target) break
      if (picked.some((p) => p.id === q.id)) continue
      picked.push(q)
    }
  }

  return picked.slice(0, target)
}

/** 某标签下各模块题量（题库总量 + 每轮题数） */
export function getModuleStatsForTag(source: QuizSource, tagKey: string): QuizModuleStat[] {
  const pool = getQuizPool(source).filter((q) => matchTag(q, tagKey))
  const grouped = groupPoolByModule(pool)
  const order = source === 'fabric' ? FABRIC_QUIZ_MODULES : PRODUCT_QUIZ_MODULES

  return order
    .map((m) => {
      const count = grouped.get(m.key)?.count ?? 0
      return {
        key: m.key,
        label: m.label,
        count,
        sessionSize: count > 0 ? Math.min(count, QUIZ_SESSION_SIZE) : 0,
      }
    })
    .filter((m) => m.count > 0)
}

/** 本轮测验题目（固定约 10 题） */
export function getSessionQuestions(
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
): { questions: QuizQuestion[]; poolTotal: number } {
  const pool = filterPool(source, tagKey, moduleKey)
  const questions = pickSessionQuestions(pool, QUIZ_SESSION_SIZE, source)
  return { questions, poolTotal: pool.length }
}

/** @deprecated 使用 getSessionQuestions */
export function getQuestionsForTagAndModule(
  source: QuizSource,
  tagKey: string,
  moduleKey: string,
): QuizQuestion[] {
  return getSessionQuestions(source, tagKey, moduleKey).questions
}

export function getTagList(source: QuizSource) {
  return source === 'fabric' ? FABRIC_QUIZ_TAGS : PRODUCT_QUIZ_TAGS
}

export function getTagQuestionCount(source: QuizSource, tagKey: string): number {
  return getQuizPool(source).filter((q) => matchTag(q, tagKey)).length
}

export function isQuizPoolReady(): boolean {
  return getQuizPool('fabric').length > 0 || getQuizPool('product').length > 0
}

export function getPoolStats() {
  return {
    fabric: getQuizPool('fabric').length,
    product: getQuizPool('product').length,
  }
}

/** @deprecated 使用 getModuleStatsForTag */
export function getModuleStats(source: QuizSource): QuizModuleStat[] {
  return getModuleStatsForTag(source, 'all')
}

export function isAnswerCorrect(question: QuizQuestion, selectedKeys: string[]): boolean {
  const selected = [...selectedKeys].sort().join(',')
  const correct = [...question.correctKeys].sort().join(',')
  return selected === correct
}

export function scoreFeedback(source: QuizSource, percent: number): string {
  if (source === 'product') {
    if (percent >= 90) return '本系列识款能力优秀，已能看图对应各要点。'
    if (percent >= 70) return '本系列掌握不错，建议针对错题回到商品资料复习。'
    if (percent >= 50) return '建议结合该系列主推款反复练习看图答题。'
    return '请先熟悉该系列商品资料，再完成各板块测验。'
  }
  if (percent >= 90) return '本分类掌握扎实，可独立讲解该类别面料。'
  if (percent >= 70) return '本分类良好，建议针对薄弱模块专项复习。'
  if (percent >= 50) return '建议先学习该分类下各面料，再分模块巩固。'
  return '请先浏览该分类面料知识，再按模块完成测验。'
}
