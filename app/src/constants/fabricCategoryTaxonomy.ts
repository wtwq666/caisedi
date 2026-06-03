/** 面料知识分类：纤维类型 → 面料品类（允许暂无面料的空品类） */

export type FabricSubcategory = {
  key: string
  label: string
}

export type FabricCategoryGroup = {
  key: string
  label: string
  children: FabricSubcategory[]
}

export const FABRIC_CATEGORY_TREE: FabricCategoryGroup[] = [
  {
    key: 'natural',
    label: '天然纤维',
    children: [
      { key: 'natural-cotton', label: '棉类' },
      { key: 'natural-linen', label: '麻类' },
      { key: 'natural-silk', label: '丝类' },
      { key: 'natural-wool', label: '羊毛/羊绒' },
    ],
  },
  {
    key: 'regenerated',
    label: '再生纤维',
    children: [
      { key: 'regen-viscose', label: '粘胶/莱赛尔' },
      { key: 'regen-modal', label: '莫代尔' },
      { key: 'regen-acetate', label: '醋酸纤维' },
    ],
  },
  {
    key: 'synthetic',
    label: '合成纤维',
    children: [
      { key: 'syn-polyester', label: '聚酯/涤纶' },
      { key: 'syn-nylon', label: '锦纶/尼龙' },
      { key: 'syn-spandex', label: '氨纶/弹性' },
      { key: 'syn-pu', label: 'PU/超纤革' },
    ],
  },
  {
    key: 'blend',
    label: '混纺/功能',
    children: [
      { key: 'blend-cotton', label: '棉混纺' },
      { key: 'blend-multi', label: '多元混纺' },
      { key: 'blend-cool', label: '凉感科技' },
      { key: 'blend-mesh', label: '网布/结构' },
      { key: 'blend-other', label: '其他特种' },
    ],
  },
]

const SUBCATEGORY_KEYS = new Set(
  FABRIC_CATEGORY_TREE.flatMap((g) => g.children.map((c) => c.key)),
)

const SUBCATEGORY_LABEL_MAP = new Map(
  FABRIC_CATEGORY_TREE.flatMap((g) => g.children.map((c) => [c.key, c.label] as const)),
)

const PARENT_BY_SUB = new Map(
  FABRIC_CATEGORY_TREE.flatMap((g) => g.children.map((c) => [c.key, g.key] as const)),
)

/** 旧版一级分类 → 默认二级（无 fabricCode 映射时） */
const LEGACY_TOP_TO_SUB: Record<string, string> = {
  天然纤维: 'natural-cotton',
  再生纤维: 'regen-viscose',
  合成纤维: 'syn-polyester',
  混纺面料: 'blend-cotton',
  '混纺/特殊': 'blend-other',
}

/** 按面料编码精确归入二级分类 */
export const FABRIC_CODE_TO_SUBCATEGORY: Record<string, string> = {
  PU: 'syn-pu',
  SANDWICH_MESH: 'blend-mesh',
  LINEN: 'natural-linen',
  ELITE: 'blend-other',
  ICE_SILK: 'blend-cool',
  CASHMERE: 'natural-wool',
  COTTON_SPAN: 'blend-cotton',
  COTTON_POLY_SPAN: 'blend-cotton',
  COTTON_POLY_LYO_SPAN: 'blend-multi',
  COTTON_POLY: 'blend-cotton',
  COTTON_MODAL_SPAN: 'blend-cotton',
  COTTON_LYOCELL: 'blend-multi',
  SPANDEX: 'syn-spandex',
  SEERSUCKER: 'blend-cotton',
  CORDUROY: 'blend-cotton',
  DENIM: 'blend-cotton',
  OXFORD: 'blend-cotton',
  VISCOSE: 'regen-viscose',
  VISCOSE_POLY: 'regen-viscose',
  VISCOSE_POLY_NYLON: 'blend-multi',
  COTTON: 'natural-cotton',
  WOOL: 'natural-wool',
  WOOL_POLY: 'blend-multi',
  POLYESTER: 'syn-polyester',
  ACRYLIC: 'syn-polyester',
  MODAL: 'regen-modal',
  LYOCELL: 'regen-viscose',
  CUPRO: 'regen-acetate',
  NYLON: 'syn-nylon',
}

export function resolveFabricSubCategory(fabric: {
  category: string
  fabricCode: string
}): string {
  const byCode = FABRIC_CODE_TO_SUBCATEGORY[fabric.fabricCode]
  if (byCode) return byCode
  if (SUBCATEGORY_KEYS.has(fabric.category)) return fabric.category
  return LEGACY_TOP_TO_SUB[fabric.category] ?? 'blend-other'
}

export function getFabricSubcategoryLabel(subKey: string): string {
  return SUBCATEGORY_LABEL_MAP.get(subKey) ?? subKey
}

export function getFabricParentKey(subKey: string): string | undefined {
  return PARENT_BY_SUB.get(subKey)
}

export function getFabricCategoryTag(fabric: { category: string; fabricCode: string }): {
  tagKey: string
  tagLabel: string
} {
  const tagKey = resolveFabricSubCategory(fabric)
  return { tagKey, tagLabel: getFabricSubcategoryLabel(tagKey) }
}

/** 测验筛选项：全部 + 所有二级（含空分类） */
export const FABRIC_QUIZ_TAG_OPTIONS = [
  { key: 'all', label: '全部' },
  ...FABRIC_CATEGORY_TREE.flatMap((g) => g.children.map((c) => ({ key: c.key, label: c.label }))),
]

export type FabricCategoryFilterState = {
  parentKey: string
  subKey: string
}

export function fabricMatchesCategoryFilter(
  fabric: { category: string; fabricCode: string },
  parentKey: string,
  subKey: string,
): boolean {
  const resolved = resolveFabricSubCategory(fabric)
  if (subKey !== 'all') return resolved === subKey
  if (parentKey !== 'all') {
    const group = FABRIC_CATEGORY_TREE.find((g) => g.key === parentKey)
    return group?.children.some((c) => c.key === resolved) ?? false
  }
  return true
}

export function getSubcategoriesForParent(parentKey: string): FabricSubcategory[] {
  if (parentKey === 'all') {
    return FABRIC_CATEGORY_TREE.flatMap((g) => g.children)
  }
  return FABRIC_CATEGORY_TREE.find((g) => g.key === parentKey)?.children ?? []
}

export function countFabricsBySubcategory(
  fabrics: { category: string; fabricCode: string }[],
): Map<string, number> {
  const counts = new Map<string, number>()
  for (const f of fabrics) {
    const key = resolveFabricSubCategory(f)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}
