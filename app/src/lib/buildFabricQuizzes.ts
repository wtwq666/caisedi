import { getFabricCategoryTag } from '../constants/fabricCategoryTaxonomy'
import { FABRIC_GENERATED_CAP_PER_MODULE } from '../constants/quizConfig'
import { FABRIC_MODULE_LABEL, type FabricQuizModuleKey } from '../constants/quizModules'
import type { FabricData } from '../types/fabric'
import type { QuizQuestion } from '../types/quiz'
import { buildMcq, truncate } from './quizHelpers'
import { parseFabricQuizText } from './parseFabricQuizzes'

function capGenerated(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.slice(0, FABRIC_GENERATED_CAP_PER_MODULE)
}

/** 规则自动生成题（带 origin） */
function mcqGen(
  id: string,
  fields: ReturnType<typeof fabricFields>,
  correctRaw: string,
  poolRaw: string[],
): QuizQuestion | null {
  if (!correctRaw?.trim()) return null
  const label = truncate(correctRaw, 120)
  return buildMcq(
    id,
    { ...fields, origin: 'generated' },
    { valueId: correctRaw, label },
    poolRaw
      .filter((v) => v?.trim() && v !== correctRaw)
      .map((v) => ({ valueId: v, label: truncate(v, 120) })),
  )
}

function parseFeatureTitles(coreFeatures: string): string[] {
  return coreFeatures
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.includes('一句话记忆') &&
        !line.includes('技术背景') &&
        !line.includes('五大核心'),
    )
    .map((line) => {
      const cleaned = line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')
      const colonIdx = cleaned.search(/[：:]/)
      return colonIdx > 0 ? cleaned.slice(0, colonIdx).trim() : cleaned
    })
    .filter(Boolean)
}

function parseAfterSalesTips(afterSales: string): string[] {
  return afterSales
    .split('\n')
    .map((l) => l.replace(/^\d+[\.\．、]\s*/, '').trim())
    .filter((l) => l.length > 8)
}

function parseComparisonDimensions(text: string): Array<{ dimension: string; fabricBetter: boolean }> {
  const results: Array<{ dimension: string; fabricBetter: boolean }> = []
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  for (const line of lines) {
    if (line.includes('vs') || line.includes('VS')) continue
    const m = line.match(/^(.+?)[：:]\s*(.+)$/)
    if (!m) continue
    const dimension = m[1].trim()
    const rest = m[2]
    const starGroups = rest.match(/[★☆]+/g)
    if (!starGroups || starGroups.length < 2) continue
    const countStars = (s: string) => (s.match(/★/g) || []).length
    const fabricStars = countStars(starGroups[0])
    const otherStars = countStars(starGroups[1])
    if (fabricStars === otherStars) continue
    results.push({ dimension, fabricBetter: fabricStars > otherStars })
  }
  return results
}

function fabricFields(
  fabric: FabricData,
  moduleKey: FabricQuizModuleKey,
  moduleLabel: string,
  prompt: string,
) {
  const { tagKey, tagLabel } = getFabricCategoryTag(fabric)
  return {
    source: 'fabric' as const,
    tagKey,
    tagLabel,
    moduleKey,
    moduleLabel,
    topic: fabric.fabricName,
    prompt,
  }
}

function buildCoreFeatureQuestions(fabric: FabricData, allFabrics: FabricData[]): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.coreFeatures
  const questions: QuizQuestion[] = []
  const summaryPool = allFabrics.map((f) => truncate(f.summary, 80))

  const q1 = mcqGen(
    `fabric-cf-summary-${fabric.id}`,
    fabricFields(fabric, 'coreFeatures', label, `【${label}】面料「${fabric.fabricName}」的核心卖点是？`),
    truncate(fabric.summary, 80),
    summaryPool,
  )
  if (q1) questions.push(q1)

  const titles = parseFeatureTitles(fabric.coreFeatures)
  const titlePool = allFabrics.flatMap((f) => parseFeatureTitles(f.coreFeatures))
  for (const title of titles.slice(0, 2)) {
    const q = mcqGen(
      `fabric-cf-feat-${fabric.id}-${title.slice(0, 8)}`,
      fabricFields(fabric, 'coreFeatures', label, `【${label}】以下哪项是「${fabric.fabricName}」的核心特性？`),
      title,
      titlePool,
    )
    if (q) questions.push(q)
  }

  const catTag = getFabricCategoryTag(fabric)
  const catLabelPool = [
    ...new Set(allFabrics.map((f) => getFabricCategoryTag(f).tagLabel)),
  ]
  const qCat = mcqGen(
    `fabric-cf-cat-${fabric.id}`,
    fabricFields(fabric, 'coreFeatures', label, `【${label}】面料「${fabric.fabricName}」所属分类是？`),
    catTag.tagLabel,
    catLabelPool,
  )
  if (qCat) questions.push(qCat)

  return capGenerated(questions)
}

function buildSalesScriptQuestions(fabric: FabricData, allFabrics: FabricData[]): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.salesScripts
  const questions: QuizQuestion[] = []
  const wrongPool = allFabrics.flatMap((f) =>
    f.salesScripts.map((s) => truncate(s.wrongExample, 80)),
  )
  const correctPool = allFabrics.flatMap((f) =>
    f.salesScripts.map((s) => truncate(s.correctScript, 80)),
  )

  for (const script of fabric.salesScripts.slice(0, 2)) {
    const qCorrect = mcqGen(
      `fabric-ss-ok-${fabric.id}-${script.scene.slice(0, 6)}`,
      fabricFields(
        fabric,
        'salesScripts',
        label,
        `【${label}】场景：${truncate(script.scene, 48)}。以下哪句是推荐话术？`,
      ),
      truncate(script.correctScript, 80),
      [...wrongPool, truncate(script.wrongExample, 80)],
    )
    if (qCorrect) questions.push(qCorrect)

    const qWrong = mcqGen(
      `fabric-ss-bad-${fabric.id}-${script.scene.slice(0, 6)}`,
      fabricFields(
        fabric,
        'salesScripts',
        label,
        `【${label}】场景：${truncate(script.scene, 48)}。以下哪句属于应避免的错误说法？`,
      ),
      truncate(script.wrongExample, 80),
      correctPool,
    )
    if (qWrong) questions.push(qWrong)
  }

  return capGenerated(questions)
}

function buildComparisonQuestions(fabric: FabricData): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.competitorComparison
  const questions: QuizQuestion[] = []
  const dims = parseComparisonDimensions(fabric.competitorComparison)
  const vsLine = fabric.competitorComparison.split('\n')[0] ?? ''
  const opponent =
    vsLine.match(/vs\s*([^\s：:]+)/i)?.[1]?.replace(/[：:]$/, '') ?? '对比材质'

  for (const { dimension, fabricBetter } of dims.slice(0, 3)) {
    const correct = fabricBetter
      ? `${fabric.fabricName} 更具优势`
      : `${opponent} 更具优势`
    const q = mcqGen(
      `fabric-cc-${fabric.id}-${dimension}`,
      fabricFields(
        fabric,
        'competitorComparison',
        label,
        `【${label}】在「${dimension}」维度，${fabric.fabricName} 与 ${opponent} 相比如何？`,
      ),
      correct,
      [
        `${fabric.fabricName} 更具优势`,
        `${opponent} 更具优势`,
        '两者相当',
        '资料未提及',
      ],
    )
    if (q) questions.push(q)
  }

  return capGenerated(questions)
}

function buildQaQuestions(fabric: FabricData, allFabrics: FabricData[]): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.qaObjections
  const answerPool = allFabrics.flatMap((f) =>
    f.qaObjections.map((q) => truncate(q.answer, 100)),
  )
  const questions: QuizQuestion[] = []

  for (const qa of fabric.qaObjections.slice(0, 3)) {
    const q = mcqGen(
      `fabric-qa-${fabric.id}-${qa.question.slice(0, 8)}`,
      fabricFields(
        fabric,
        'qaObjections',
        label,
        `【${label}】客户问：「${truncate(qa.question, 40)}」应如何回答？`,
      ),
      truncate(qa.answer, 100),
      answerPool,
    )
    if (q) questions.push(q)
  }

  return capGenerated(questions)
}

function buildPracticalQuestions(fabric: FabricData, allFabrics: FabricData[]): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.practicalTraining
  const obsPool = allFabrics.flatMap((f) =>
    f.practicalTraining.map((p) => truncate(p.observation || '', 80)).filter(Boolean),
  )
  const questions: QuizQuestion[] = []

  for (const pt of fabric.practicalTraining) {
    if (!pt.observation) continue
    const q = mcqGen(
      `fabric-pt-${fabric.id}-${pt.title.slice(0, 8)}`,
      fabricFields(fabric, 'practicalTraining', label, `【${label}】「${pt.title}」的观察要点是？`),
      truncate(pt.observation, 80),
      obsPool,
    )
    if (q) questions.push(q)
  }

  return capGenerated(questions)
}

function buildAfterSalesQuestions(fabric: FabricData, allFabrics: FabricData[]): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.afterSales
  const tips = parseAfterSalesTips(fabric.afterSales)
  const tipPool = allFabrics.flatMap((f) => parseAfterSalesTips(f.afterSales)).map((t) => truncate(t, 90))
  const questions: QuizQuestion[] = []

  for (const tip of tips.slice(0, 2)) {
    const q = mcqGen(
      `fabric-as-${fabric.id}-${tip.slice(0, 8)}`,
      fabricFields(
        fabric,
        'afterSales',
        label,
        `【${label}】关于「${fabric.fabricName}」的洗护/售后，以下哪项正确？`,
      ),
      truncate(tip, 90),
      tipPool,
    )
    if (q) questions.push(q)
  }

  return capGenerated(questions)
}

function buildQuizModuleQuestions(fabric: FabricData): QuizQuestion[] {
  const label = FABRIC_MODULE_LABEL.quizzes
  return parseFabricQuizText(fabric).map((q) => ({
    ...q,
    moduleKey: 'quizzes' as FabricQuizModuleKey,
    moduleLabel: label,
    prompt: q.prompt.startsWith('【') ? q.prompt : `【${label}】${q.prompt}`,
  }))
}

export function buildAllFabricQuizQuestions(fabrics: FabricData[]): QuizQuestion[] {
  const active = fabrics.filter((f) => f.status !== 0)
  const all: QuizQuestion[] = []

  for (const fabric of active) {
    all.push(
      ...buildCoreFeatureQuestions(fabric, active),
      ...buildSalesScriptQuestions(fabric, active),
      ...buildComparisonQuestions(fabric),
      ...buildQaQuestions(fabric, active),
      ...buildPracticalQuestions(fabric, active),
      ...buildAfterSalesQuestions(fabric, active),
      ...buildQuizModuleQuestions(fabric),
    )
  }

  const seen = new Set<string>()
  return all.filter((q) => {
    if (seen.has(q.id)) return false
    seen.add(q.id)
    return true
  })
}
