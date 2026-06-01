export interface StoreShowcaseImage {
  src: string
  caption: string
}

export interface StoreShowcaseAlbum {
  id: string
  title: string
  location: string
  date: string
  description: string
  coverImage: string
  category: '开业活动'
  tags: string[]
  images: StoreShowcaseImage[]
}

export const storeShowcaseAlbums: StoreShowcaseAlbum[] = [
  {
    id: 'conghua-jinhui-2026',
    title: '广州从化金汇城店开业',
    location: '广州从化 · 金汇城',
    date: '2026-01-01',
    description:
      '2026年1月1日，凯施迪广州从化金汇城店盛大开业。现场舞狮助兴、剪彩合影，门店陈列与品牌形象正式亮相，欢迎莅临品鉴。',
    coverImage: '/stores/conghua-jinhui-2026/01-storefront.jpg',
    category: '开业活动',
    tags: ['开业', '从化', '金汇城', '广州', '2026'],
    images: [
      {
        src: '/stores/conghua-jinhui-2026/01-storefront.jpg',
        caption: '门店门头 · 金汇城店开业现场',
      },
      {
        src: '/stores/conghua-jinhui-2026/02-interior-display.jpg',
        caption: '店内陈列 · 品牌形象与货品展示',
      },
      {
        src: '/stores/conghua-jinhui-2026/03-ribbon-cutting.jpg',
        caption: '开业剪彩 · 团队合影',
      },
      {
        src: '/stores/conghua-jinhui-2026/04-lion-dance.jpg',
        caption: '舞狮助兴 · 开业庆典',
      },
      {
        src: '/stores/conghua-jinhui-2026/05-lion-dance-crowd.jpg',
        caption: '舞狮表演 · 商场客流围观',
      },
      {
        src: '/stores/conghua-jinhui-2026/06-opening-celebration.jpg',
        caption: '开业盛况 · 舞狮与现场氛围',
      },
    ],
  },
  {
    id: 'changping-baihua-2026',
    title: '常平百花时代广场店开业',
    location: '东莞常平 · 百花时代广场',
    date: '2026-01-17',
    description:
      '2026年1月17日，凯施迪常平百花时代广场店隆重开业。现场准备了精美茶歇与开业礼品，团队合影留念，门店陈列焕然一新，欢迎莅临品鉴。',
    coverImage: '/stores/changping-baihua-2026/01-storefront.png',
    category: '开业活动',
    tags: ['开业', '常平', '百花时代广场', '2026'],
    images: [
      {
        src: '/stores/changping-baihua-2026/01-storefront.png',
        caption: '门店全景 · 开业现场布置与陈列',
      },
      {
        src: '/stores/changping-baihua-2026/02-opening-ceremony.png',
        caption: '开业庆典 · 团队合影',
      },
      {
        src: '/stores/changping-baihua-2026/03-team-photo.png',
        caption: '门店团队 · 开业大吉',
      },
      {
        src: '/stores/changping-baihua-2026/04-interior-display.png',
        caption: '店内陈列 · 品牌形象展示',
      },
      {
        src: '/stores/changping-baihua-2026/05-opening-tea.png',
        caption: '开业茶歇 · 精美点心与饮品',
      },
      {
        src: '/stores/changping-baihua-2026/06-opening-gifts.png',
        caption: '开业礼遇 · 品牌礼品与茶歇',
      },
    ],
  },
  {
    id: 'shaoyang-youa-2025',
    title: '邵阳友阿店开业',
    location: '湖南邵阳 · 友阿国际广场',
    date: '2025-12-19',
    description:
      '2025年12月19日，凯施迪邵阳友阿店盛大开业。现场花篮麦穗、气球与茶歇布置，品牌陈列与秋冬新品正式亮相，欢迎莅临品鉴。',
    coverImage: '/stores/shaoyang-youa-2025/01-storefront.jpg',
    category: '开业活动',
    tags: ['开业', '邵阳', '友阿', '2025'],
    images: [
      {
        src: '/stores/shaoyang-youa-2025/01-storefront.jpg',
        caption: '门店门头 · 友阿店开业现场',
      },
      {
        src: '/stores/shaoyang-youa-2025/02-opening-decor.jpg',
        caption: '开业布置 · 花篮茶歇与店内陈列',
      },
      {
        src: '/stores/shaoyang-youa-2025/03-brand-display.jpg',
        caption: '品牌展示 · 中央陈列与形象墙',
      },
      {
        src: '/stores/shaoyang-youa-2025/04-wall-display.jpg',
        caption: '墙面陈列 · 秋冬系列展示',
      },
      {
        src: '/stores/shaoyang-youa-2025/05-interior-rack.jpg',
        caption: '店内货架 · 形象模特与货品',
      },
    ],
  },
]
