import { PRODUCT_MODULE_LABEL, type ProductQuizModuleKey } from '../constants/quizModules'
import { productList } from '../data/productData'
import type { ProductData } from '../types/product'
import type { QuizQuestion } from '../types/quiz'
import { buildMcq, truncate } from './quizHelpers'

function uniqueValues(products: ProductData[], pick: (p: ProductData) => string): string[] {
  return [...new Set(products.map(pick).filter(Boolean))]
}

function productFields(
  product: ProductData,
  moduleKey: ProductQuizModuleKey,
  prompt: string,
  extra?: Partial<QuizQuestion>,
): Pick<
  QuizQuestion,
  'source' | 'tagKey' | 'tagLabel' | 'moduleKey' | 'moduleLabel' | 'topic' | 'prompt' | 'imageUrl' | 'reveal'
> {
  const label = PRODUCT_MODULE_LABEL[moduleKey]
  return {
    source: 'product',
    tagKey: product.series,
    tagLabel: `${product.series}系列`,
    moduleKey,
    moduleLabel: label,
    topic: '看图识别',
    prompt: `【${label}】${prompt}`,
    imageUrl: product.imageUrl,
    reveal: {
      productCode: product.productCode,
      name: product.name,
    },
    ...extra,
  }
}

function buildBasicInfoQuestions(p: ProductData, eligible: ProductData[]): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const kinds: Array<{ key: string; prompt: string; correct: string; pool: string[] }> = [
    {
      key: 'series',
      prompt: '请观察上图商品，该款式属于哪个系列？',
      correct: p.series,
      pool: uniqueValues(eligible, (x) => x.series),
    },
    {
      key: 'season',
      prompt: '请观察上图商品，适合哪个季节穿着？',
      correct: p.season,
      pool: uniqueValues(eligible, (x) => x.season),
    },
    {
      key: 'color',
      prompt: '请观察上图商品，主色调是？',
      correct: p.color,
      pool: uniqueValues(eligible, (x) => x.color),
    },
    {
      key: 'name',
      prompt: '请观察上图商品，品名是？',
      correct: p.name,
      pool: uniqueValues(eligible, (x) => x.name),
    },
    {
      key: 'code',
      prompt: '请观察上图商品，对应的货号是？',
      correct: p.productCode,
      pool: eligible.map((x) => x.productCode),
    },
  ]

  if (p.fitType) {
    kinds.push({
      key: 'fit',
      prompt: '请观察上图商品，版型是？',
      correct: p.fitType,
      pool: uniqueValues(eligible, (x) => x.fitType),
    })
  }
  if (p.collarType) {
    kinds.push({
      key: 'collar',
      prompt: '请观察上图商品，领型是？',
      correct: p.collarType,
      pool: uniqueValues(eligible, (x) => x.collarType),
    })
  }

  for (const k of kinds) {
    const q = buildMcq(
      `product-basic-${k.key}-${p.id}`,
      productFields(p, 'basicInfo', k.prompt),
      k.correct,
      k.pool,
    )
    if (q) questions.push(q)
  }

  return questions
}

function buildFabricInfoQuestions(p: ProductData, eligible: ProductData[]): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const compPool = uniqueValues(eligible, (x) => truncate(x.fabricComposition, 100))

  const q1 = buildMcq(
    `product-fabric-comp-${p.id}`,
    productFields(p, 'fabricInfo', '请观察上图商品，面料成份是？'),
    truncate(p.fabricComposition, 100),
    compPool,
  )
  if (q1) questions.push(q1)

  if (p.fabricDesc && p.fabricDesc.length > 10) {
    const descPool = eligible
      .filter((x) => x.fabricDesc)
      .map((x) => truncate(x.fabricDesc, 100))
    const q2 = buildMcq(
      `product-fabric-desc-${p.id}`,
      productFields(p, 'fabricInfo', '请观察上图商品，以下哪项符合其面料特性描述？'),
      truncate(p.fabricDesc, 100),
      descPool,
    )
    if (q2) questions.push(q2)
  }

  return questions
}

function buildCraftQuestions(p: ProductData, eligible: ProductData[]): QuizQuestion[] {
  if (!p.craftSellingPoint || p.craftSellingPoint.length < 12) return []

  const pool = eligible
    .filter((x) => x.craftSellingPoint && x.id !== p.id)
    .map((x) => truncate(x.craftSellingPoint, 100))

  const q = buildMcq(
    `product-craft-${p.id}`,
    productFields(p, 'craft', '请观察上图商品，以下哪项是其工艺卖点？'),
    truncate(p.craftSellingPoint, 100),
    pool,
  )
  return q ? [q] : []
}

function buildCareQuestions(p: ProductData, eligible: ProductData[]): QuizQuestion[] {
  if (!p.fabricCareNotes || p.fabricCareNotes.length < 8) return []

  const segments = p.fabricCareNotes
    .split(/[；;。]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 6)
  if (segments.length === 0) return []

  const tip = segments[0]
  const tipPool = eligible
    .filter((x) => x.fabricCareNotes)
    .flatMap((x) =>
      x.fabricCareNotes
        .split(/[；;。]/)
        .map((s) => truncate(s.trim(), 90))
        .filter((s) => s.length >= 6),
    )

  const q = buildMcq(
    `product-care-${p.id}`,
    productFields(p, 'care', '请观察上图商品，以下哪项洗护说明适用于该款式？'),
    truncate(tip, 90),
    tipPool,
  )
  return q ? [q] : []
}

function buildSceneQuestions(p: ProductData, eligible: ProductData[]): QuizQuestion[] {
  if (!p.suitableScenes) return []

  const scenePool = uniqueValues(eligible, (x) => x.suitableScenes)
  const q = buildMcq(
    `product-scene-${p.id}`,
    productFields(p, 'scenes', '请观察上图商品，更适合以下哪种穿着场景？'),
    p.suitableScenes,
    scenePool,
  )
  return q ? [q] : []
}

/** 按商品资料五大板块生成看图题 */
export function buildProductQuizQuestions(products: ProductData[] = productList): QuizQuestion[] {
  const eligible = products.filter(
    (p) =>
      p.imageUrl &&
      p.productCode &&
      p.name &&
      p.series &&
      p.season &&
      p.color &&
      p.fabricComposition,
  )
  if (eligible.length < 8) return []

  const questions: QuizQuestion[] = []
  for (const p of eligible) {
    questions.push(
      ...buildBasicInfoQuestions(p, eligible),
      ...buildFabricInfoQuestions(p, eligible),
      ...buildCraftQuestions(p, eligible),
      ...buildCareQuestions(p, eligible),
      ...buildSceneQuestions(p, eligible),
    )
  }

  const seen = new Set<string>()
  return questions.filter((q) => {
    if (seen.has(q.id)) return false
    seen.add(q.id)
    return true
  })
}

export function getProductIdFromQuestionId(id: string): number | null {
  const m = id.match(/^product-\w+-(?:\w+-)?(\d+)$/)
  return m ? Number(m[1]) : null
}
