import { FABRIC_QUIZ_TAG_OPTIONS } from './fabricCategoryTaxonomy'

/** 与面料知识页二级分类一致（含暂无面料的空分类） */
export const FABRIC_QUIZ_TAGS = FABRIC_QUIZ_TAG_OPTIONS

/** 与商品资料系列筛选一致 */
export const PRODUCT_QUIZ_TAGS = [
  { key: 'all', label: '全部' },
  { key: '生活', label: '生活系列' },
  { key: '通勤', label: '通勤系列' },
  { key: '运动', label: '运动系列' },
  { key: '高端', label: '高端系列' },
] as const
