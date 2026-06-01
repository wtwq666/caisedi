export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  author: string
  publishTime: string
  tag: string
  tagColor: string
  coverImage: string
  views: number
  pinned?: boolean
}

export const newsItems: NewsItem[] = [
  {
    id: 'qingming-2026',
    title: '清明节放假通知',
    summary:
      '4 月 4 日至 5 日放假共 2 天，4 月 6 日正常上班。请合理安排出行，注意交通、用火及人身安全，文明祭扫，平安过节。',
    content: `清明节放假安排如下：

**2026 年 4 月 4 日（星期六）至 4 月 5 日（星期日）放假，共 2 天**

**4 月 6 日（星期一）正常上班**

请大家合理安排出行，注意交通、用火及人身安全，文明祭扫，平安过节。

## 温馨提示

- 清明祭扫讲文明
- 平安出行安全归
- 放假前请做好工作交接与办公区域安全检查

「祝全体同事清明安康，假期愉快！」`,
    author: '行政部',
    publishTime: '2026-03-28 09:00',
    tag: '重要',
    tagColor: 'bg-[#FFF1F0] text-[#CF1322]',
    coverImage: '/news/qingming-2026.png',
    views: 0,
    pinned: true,
  },
  {
    id: 'appointment-chen-qiubo-2026',
    title: '关于任命陈秋波同志为副总经理的通知',
    summary:
      '经公司研究决定，任命陈秋波同志为公司副总经理，全面负责运营部工作，并统筹拓展部相关事宜。本通知自 2026 年 5 月 1 日起正式生效。',
    content: `凯施迪公司文件

人力资源部发【2026】第 001 号

## 任命通知

为优化公司组织架构，支撑品牌运营及市场高质量拓展，充分发挥核心人才综合优势，经公司研究，决定：

**任命陈秋波同志为公司副总经理。**

陈秋波副总经理全面负责**运营部**全盘工作，同时统筹**拓展部**相关事宜，协调运营部、拓展部日常管理、团队建设、终端赋能及市场拓展等工作。

希望陈秋波副总经理恪尽职守、主动作为，带领两个部门协同发展，提升品牌影响力与市场竞争力。请各部门积极配合、支持相关工作。

本任命通知自 **2026 年 5 月 1 日** 起正式生效。

特此通知。

---

凯施迪行政处

2026 年 4 月 28 日`,
    author: '人力资源部',
    publishTime: '2026-04-28 10:00',
    tag: '重要',
    tagColor: 'bg-[#FFF1F0] text-[#CF1322]',
    coverImage: '/news/appointment-chen-qiubo-2026.png',
    views: 0,
    pinned: true,
  },
  {
    id: 'labour-day-2026',
    title: '2026年五一劳动节放假通知',
    summary:
      '致敬每一份耕耘！5月1日至2日放假共两天，5月3日（星期日）正常上班。请合理安排假期，注意出行安全，节后准时到岗。',
    content: `致敬每一份耕耘！

结合公司安排，五一劳动节统一放假休息。请大家合理安排时间，注意出行安全，劳逸结合，欢度假期，节后准时到岗。

## 放假时间

**2026年5月1日（星期四）至5月2日（星期五）放假，共 2 天**

**5月3日（星期日）正常上班**

## 放假前温馨提示

- 请做好工作收尾、文件归档
- 关闭办公区域水电，做好办公安全检查

## 假期外出提醒

- 注意人身、财产安全
- 遵守交通规则，文明出行

「祝大家劳动节快乐，假期愉快！」`,
    author: '行政部',
    publishTime: '2026-04-28 09:30',
    tag: '重要',
    tagColor: 'bg-[#FFF1F0] text-[#CF1322]',
    coverImage: '/news/labour-day-2026.png',
    views: 0,
    pinned: true,
  },
]
