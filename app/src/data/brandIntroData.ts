export interface BrandIntroDoc {
  id: string
  title: string
  description: string
  filename: string
  fileType: 'pdf'
  fileSize: string
  category: string
  tags: string[]
}

export const brandIntroDocs: BrandIntroDoc[] = [
  {
    id: 'b1',
    title: '凯施迪 2026 SS 品牌简介',
    description: '凯施迪（CAISEDI）2026春夏品牌简介手册，全面介绍品牌定位、设计理念、产品系列、面料科技、目标客群及品牌愿景。',
    filename: '凯施迪2026SS简介.pdf',
    fileType: 'pdf',
    fileSize: '20.1MB',
    category: '品牌介绍',
    tags: ['2026春夏', '品牌定位', '设计理念', '产品系列', '面料科技'],
  },
]

export const brandIntroCategories = [
  { key: 'all', label: '全部' },
  { key: '品牌介绍', label: '品牌介绍' },
]
