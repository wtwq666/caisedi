import { fabricCategories } from '../data/fabricData'

/** 与面料知识页分类标签一致 */
export const FABRIC_QUIZ_TAGS = fabricCategories

/** 与商品资料系列筛选一致 */
export const PRODUCT_QUIZ_TAGS = [
  { key: 'all', label: '全部' },
  { key: '生活', label: '生活系列' },
  { key: '通勤', label: '通勤系列' },
  { key: '运动', label: '运动系列' },
  { key: '高端', label: '高端系列' },
] as const
