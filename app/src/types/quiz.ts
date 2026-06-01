export type QuizSource = 'fabric' | 'product'

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
}

export interface QuizAnswerRecord {
  questionId: string
  selectedKeys: string[]
  correct: boolean
}

export interface QuizModuleStat {
  key: string
  label: string
  count: number
}
