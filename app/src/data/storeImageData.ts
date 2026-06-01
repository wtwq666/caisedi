export interface StoreImageDoc {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'pdf' | 'xls' | 'docx' | 'pptx'
  fileSize: string
  category: string
  tags: string[]
}

export const storeImageDocs: StoreImageDoc[] = [
  {
    id: 's1',
    title: '门店视觉与陈列实操',
    description: '凯施迪门店视觉营销实操手册，涵盖6大核心模块：品牌风格与销售布局（黄金动线设计）、货品统筹与风格定位（系列文化与自我认同）、核心区域实操落地（橱窗/DP点/流水台/层板）、正侧挂的黄金搭档法则（1.5层穿搭法/3+1法则）、换季衔接陈列技巧、日常巡检标准（衣架/间距/灯光/吊牌/S勾/叠装等11项标准）。',
    filename: '门店视觉与陈列实操.pdf',
    fileType: 'pdf',
    fileSize: '14.8MB',
    category: '陈列实操',
    tags: ['视觉营销', '黄金动线', '橱窗陈列', '正侧挂法则', '换季衔接', '日常巡检'],
  },
  {
    id: 's3',
    title: '广告画功能说明',
    description:
      '门店广告画与 POP 物料使用说明（2026.5.27）。涵盖 X 展架、层板海报（含小型横版新增）、挂牌 POP、横牌 POP、折扣 POP（一口价）、新品上市 POP、LED 大屏幕、异形牌 POP 的摆放位置、功能与注意事项，供门店规范使用并由督导监督执行。',
    filename: '26.05.27 广告画功能说明.pdf',
    fileType: 'pdf',
    fileSize: '13.7MB',
    category: '广告画',
    tags: ['X展架', '层板海报', 'POP', 'LED屏幕', '陈列引导', '品创部'],
  },
  {
    id: 's2',
    title: '陈列巡店考核表',
    description: '凯施迪门店陈列巡店标准化考核表，总分300分。包含三大考核模块：核心区域陈列考核（100分）- 橱窗/DP点/引流区/停留区/成交区/流水台/层板共23项检查；正侧挂板块考核（100分）- 正挂陈列/侧挂陈列/正侧挂关联共10项检查；日常维护标准考核（100分）- 衣架朝向/间距/吊牌/灯光/饰品/叠装/S勾/织带/裤架共11项标准。另附7项严禁事项及扣分标准。',
    filename: '陈列巡店考核.xls',
    fileType: 'xls',
    fileSize: '56KB',
    category: '巡店考核',
    tags: ['巡店', '考核表', '核心区域', '正侧挂', '日常维护', '严禁事项'],
  },
]

export const storeImageCategories = [
  { key: 'all', label: '全部' },
  { key: '开业活动', label: '开业活动' },
  { key: '陈列实操', label: '陈列实操' },
  { key: '广告画', label: '广告画' },
  { key: '巡店考核', label: '巡店考核' },
]
