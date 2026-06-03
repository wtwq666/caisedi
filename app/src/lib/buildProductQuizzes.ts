import { PRODUCT_MODULE_LABEL, type ProductQuizModuleKey } from '../constants/quizModules'

import type { ProductData } from '../types/product'

import type { QuizQuestion } from '../types/quiz'

import { buildMcq, type McqChoice } from './quizHelpers'



/** 同系列优先，不足再扩到同季节 */

function distractorScope(product: ProductData, eligible: ProductData[]): ProductData[] {

  const sameSeries = eligible.filter(

    (x) => x.id !== product.id && x.series === product.series && x.name !== product.name,

  )

  if (sameSeries.length >= 3) return sameSeries

  const sameSeason = eligible.filter(

    (x) =>

      x.id !== product.id &&

      x.season === product.season &&

      x.name !== product.name &&

      !sameSeries.some((s) => s.id === x.id),

  )

  return [...sameSeries, ...sameSeason].slice(0, 20)

}



function productFields(

  product: ProductData,

  moduleKey: ProductQuizModuleKey,

  prompt: string,

): Pick<

  QuizQuestion,

  'source' | 'tagKey' | 'tagLabel' | 'moduleKey' | 'moduleLabel' | 'topic' | 'prompt' | 'imageUrl' | 'reveal' | 'origin'

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

    origin: 'generated',

  }

}



/** 仅保留能从主图分辨的颜色题 */

function buildColorQuestions(p: ProductData, scope: ProductData[]): QuizQuestion[] {

  if (!p.color?.trim()) return []



  const distractors: McqChoice[] = scope

    .filter((x) => x.color && x.color !== p.color)

    .map((x) => ({ valueId: `${x.productCode}-color`, label: x.color }))



  const q = buildMcq(

    `product-basic-color-${p.id}`,

    productFields(p, 'basicInfo', '请观察上图商品，主色调是？'),

    { valueId: `${p.productCode}-color`, label: p.color },

    distractors,

  )

  return q ? [q] : []

}



export function buildProductQuizQuestions(products: ProductData[]): QuizQuestion[] {

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

    const scope = distractorScope(p, eligible)

    questions.push(...buildColorQuestions(p, scope))

  }



  const seen = new Set<string>()

  return questions.filter((q) => {

    if (seen.has(q.id)) return false

    seen.add(q.id)

    return true

  })

}



export function getProductIdFromQuestionId(id: string): number | null {

  const m = id.match(/-(\d+)$/)

  return m ? Number(m[1]) : null

}


