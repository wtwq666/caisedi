/** 与 FabricKnowledge 侧栏模块一致 */
export const FABRIC_QUIZ_MODULES = [
  { key: 'coreFeatures', label: '产品认知' },
  { key: 'salesScripts', label: '销售话术' },
  { key: 'competitorComparison', label: '竞品对比' },
  { key: 'qaObjections', label: '异议处理' },
  { key: 'practicalTraining', label: '实操演练' },
  { key: 'afterSales', label: '售后知识' },
  { key: 'quizzes', label: '课后测试' },
] as const

export type FabricQuizModuleKey = (typeof FABRIC_QUIZ_MODULES)[number]['key']

/** 与 ProductKnowledge 详情分区一致 */
export const PRODUCT_QUIZ_MODULES = [
  { key: 'basicInfo', label: '基础信息' },
  { key: 'fabricInfo', label: '面料信息' },
  { key: 'craft', label: '工艺卖点' },
  { key: 'care', label: '洗护说明' },
  { key: 'scenes', label: '适合场景' },
] as const

export type ProductQuizModuleKey = (typeof PRODUCT_QUIZ_MODULES)[number]['key']

export const FABRIC_MODULE_LABEL: Record<FabricQuizModuleKey, string> = Object.fromEntries(
  FABRIC_QUIZ_MODULES.map((m) => [m.key, m.label]),
) as Record<FabricQuizModuleKey, string>

export const PRODUCT_MODULE_LABEL: Record<ProductQuizModuleKey, string> = Object.fromEntries(
  PRODUCT_QUIZ_MODULES.map((m) => [m.key, m.label]),
) as Record<ProductQuizModuleKey, string>
