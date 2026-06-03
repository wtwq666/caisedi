export type QuizSource = 'fabric' | 'product'

export type QuizQuestionOrigin = 'author' | 'generated'

export interface QuizOption {
  key: string
  label: string
}

export interface QuizProductReveal {
  productCode: string
  name: string
}

export interface QuizQuestion {
  id: string
  source: QuizSource
  /** 分类标签：面料为纤维分类，商品为系列 */
  tagKey: string
  tagLabel: string
  moduleKey: string
  moduleLabel: string
  topic: string
  prompt: string
  options: QuizOption[]
  correctKeys: string[]
  multiSelect: boolean
  imageUrl?: string
  reveal?: QuizProductReveal
  /** author=教材原文题；generated=规则自动生成 */
  origin?: QuizQuestionOrigin
}

export interface QuizAnswerRecord {
  questionId: string
  selectedKeys: string[]
  correct: boolean
}

export interface QuizModuleStat {
  key: string
  label: string
  /** 题库总量 */
  count: number
  /** 每轮实际题数 */
  sessionSize: number
}
