export interface SalesScript {
  scene: string
  wrongExample: string
  correctScript: string
}

export interface QAObjection {
  question: string
  answer: string
}

export interface PracticalTraining {
  title: string
  materials?: string
  steps?: string
  observation?: string
  application?: string
}

export interface AfterSales {
  content: string
}

export interface FabricData {
  id: number
  fabricCode: string
  fabricName: string
  category: string
  summary: string
  techBackground: string
  coreFeatures: string
  salesScripts: SalesScript[]
  competitorComparison: string
  qaObjections: QAObjection[]
  practicalTraining: PracticalTraining[]
  afterSales: string
  quizzes: string
  status: number
}
