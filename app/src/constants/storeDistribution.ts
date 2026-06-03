/**
 * 门店督导分区 — 来源：项目根目录《门店分布.xlsx》
 * 左侧列为督导（*区），右侧列为该督导下辖门店。
 */

export type SupervisorRegion = {
  /** 督导姓名，如「杜志灵」 */
  supervisor: string
  /** 表格中的区名，如「杜志灵区」 */
  regionLabel: string
  stores: string[]
}

/** 督导 → 门店列表（与 Excel 一致） */
export const SUPERVISOR_REGIONS: SupervisorRegion[] = [
  {
    supervisor: '罗双双',
    regionLabel: '罗双双区',
    stores: ['湖南郴州友阿店', '湖南郴州生源店'],
  },
  {
    supervisor: '周仁凤',
    regionLabel: '周仁凤区',
    stores: [
      '湖南浏阳天虹店',
      '湖南株洲王府井店',
      '湖南娄底吾悦店',
      '湖南娄底天虹店',
      '湖南吉首天虹特卖店',
      '湖南长沙汇金天虹店',
      '湖南长沙王府井',
      '湖南长沙万家丽店',
      '江西南昌中山天虹店',
      '江西南昌百盛优客奥莱店',
    ],
  },
  {
    supervisor: '洪妃妹',
    regionLabel: '洪妃妹区',
    stores: [
      '雷州新城大道店',
      '雷州名都店',
      '徐闻店',
      '雷州世贸店',
      '雷州昌大昌店',
      '雷州名都EP店',
    ],
  },
  {
    supervisor: '杜志灵',
    regionLabel: '杜志灵区',
    stores: [
      '珠海斗门大信店',
      '珠海宝龙',
      '珠海斗门万达',
      '中山三乡店',
      '中山西区天悦城店',
      '中山坦洲优越城店',
      '中山小榄大信EP店',
      '中山小榄汇丰城店',
      '中山古镇大信EP店',
      '坦洲合胜',
      '中山古镇大信店',
    ],
  },
  {
    supervisor: '陈海娟',
    regionLabel: '陈海娟区',
    stores: [
      '湛江霞山华都汇店',
      '湛江霞山城市店',
      '湛江赤坎世贸店',
      '湛江吴川金沙店',
      'EP湛江霞山城市店',
      '阳江江城百利店',
      '湛江霞山万达店',
    ],
  },
  {
    supervisor: '杨小冰',
    regionLabel: '杨小冰区',
    stores: [
      '佛山南海嘉洲店',
      '开平东汇城特卖店',
      '清远顺盈店',
      '惠州金山湖店',
      '广州从化金汇店',
      '广州白云佳润店',
      '广州天河智慧城店',
      '佛山三水新动力店',
      '东莞桥头上悦汇店',
      '东莞塘厦天虹',
    ],
  },
  {
    supervisor: '刘聪',
    regionLabel: '刘聪区',
    stores: [
      '江西吉安天虹店',
      '赣州君尚天虹',
      '贵州遵义时代天街店',
      '潮州新桥店',
      '汕头龙湖合胜店',
      '河源坚基',
      '河源万隆城店',
      '汕尾海丰天虹店',
      '普宁万泰汇',
    ],
  },
]

/** 全部门店（去重、按督导顺序展平） */
export const ALL_STORE_NAMES: string[] = SUPERVISOR_REGIONS.flatMap((r) => r.stores)

/** 历史/录入别名 → 标准门店名（与 Excel 一致） */
export const STORE_NAME_ALIASES: Record<string, string> = {
  '凯施迪西区店（天悦城）': '中山西区天悦城店',
  '凯施迪西区店': '中山西区天悦城店',
  '凯施迪小榄旗舰店（坦洲优越城）': '中山坦洲优越城店',
  '凯施迪坦洲优越城店': '中山坦洲优越城店',
  '凯施迪小榄旗舰店': '中山小榄汇丰城店',
  '凯施迪三乡店': '中山三乡店',
}

export function normalizeStoreName(name: string): string {
  const trimmed = name.trim()
  return STORE_NAME_ALIASES[trimmed] ?? trimmed
}

export function getSupervisorRegionForStore(storeName: string): SupervisorRegion | null {
  const normalized = normalizeStoreName(storeName)
  return (
    SUPERVISOR_REGIONS.find((r) => r.stores.includes(normalized)) ??
    SUPERVISOR_REGIONS.find((r) => r.stores.includes(storeName.trim())) ??
    null
  )
}

/** 中山片区门店（杜志灵区） */
export const ZHONGSHAN_STORE_NAMES = SUPERVISOR_REGIONS.find((r) => r.supervisor === '杜志灵')!.stores
