# 凯施迪企业信息系统 — UI 评审与改进汇总

> 文档版本：2026-05-20  
> 技术栈：React 19 + Vite + Tailwind CSS + shadcn/ui (Radix)  
> 评审范围：全局布局、各业务页面、交互逻辑、动效、移动端、无障碍

---

## 目录

1. [总体评价](#1-总体评价)
2. [设计系统与视觉](#2-设计系统与视觉)
3. [字体与排版](#3-字体与排版)
4. [布局与信息架构](#4-布局与信息架构)
5. [组件与交互模式](#5-组件与交互模式)
6. [动效与微交互](#6-动效与微交互)
7. [移动端体验](#7-移动端体验)
8. [各模块专项改进](#8-各模块专项改进)
9. [无障碍（a11y）](#9-无障碍a11y)
10. [技术债与代码整理](#10-技术债与代码整理)
11. [优先级路线图](#11-优先级路线图)
12. [改进项清单（可勾选）](#12-改进项清单可勾选)

---

## 1. 总体评价

### 1.1 优点

| 维度 | 说明 |
|------|------|
| 视觉基调 | 采用 Ant Design 色系（`#1890FF` / `#262626` / `#8C8C8C`），符合企业内训、门店工具场景 |
| 信息架构 | 左侧导航 + 顶栏 + 内容区，结构清晰；内容区 `max-w-[1200px]` 居中，阅读舒适 |
| 标杆模块 | **面料知识**（`FabricKnowledge`）桌面双栏 + 移动 Drawer，可作为全站移动端与主从布局范本 |
| 基础体验 | 空状态、筛选反馈、卡片 hover、列表项 hover 已具备基本可用性 |
| 业务适配 | 商品速查信息密度、知识模块分 Tab 等贴合实际业务 |

### 1.2 主要问题

| 问题 | 影响 |
|------|------|
| 设计令牌未落地 | `index.css` 有 CSS 变量，页面大量硬编码 hex，维护难、暗色模式无法启用 |
| 假功能入口 | 顶栏搜索、侧栏主题/设置/退出、「AI 知识测试」等无实际逻辑，降低信任感 |
| 弹层实现不统一 | 商品详情、文档预览为手写 Modal；面料模块用 Drawer；缺焦点陷阱、Esc、层级规范 |
| 动画资源浪费 | `kpi-animate`、`timeline-node`、`useCountUp` 仅在未挂路由的 `Track.tsx` 中使用 |
| shadcn/ui 利用不足 | 已安装完整组件库，业务页多为自定义样式，重复实现 a11y 行为 |

---

## 2. 设计系统与视觉

### 2.1 色彩与令牌

**现状**

- `app/src/index.css` 定义 `--primary`、`--foreground` 等 HSL 变量
- 业务组件普遍使用 `#1890FF`、`#E6F7FF`、`#262626` 等硬编码（十余个文件、数百处）
- `tailwind.config.js` 已映射 `primary`，但未在页面中系统性使用

**改进建议**

| 编号 | 改进项 | 具体做法 |
|------|--------|----------|
| DS-01 | 统一颜色令牌 | 在 Tailwind 扩展 `brand.primary`、`text.secondary`、`border.default` 等，或全面改用 `bg-primary`、`text-muted-foreground` |
| DS-02 | 语义色规范 | 成功 / 警告 / 错误统一为 `success`、`warning`、`error`，避免各页重复写 `#52C41A`、`#FAAD14`、`#F5222D` |
| DS-03 | 暗色模式 | 侧栏已有 `Moon` 图标：要么接入 `next-themes` + `.dark` 变量，要么移除入口，避免误导 |
| DS-04 | 背景色一致 | 布局使用 `bg-[#F5F5F5]`，与 `--background` 变量并存，应统一为一处来源 |

### 2.2 圆角与阴影

**现状**

- 卡片多为 `rounded-lg`（8px），面料详情使用 `rounded-xl`，略不一致
- 阴影：`hover:shadow-md`（新闻）与 `.product-card:hover` 自定义阴影并存

**改进建议**

| 编号 | 改进项 | 具体做法 |
|------|--------|----------|
| DS-05 | 圆角分级 | 规定：卡片 `rounded-lg`，详情块/浮层内容 `rounded-xl`，Chip `rounded-full` |
| DS-06 | 阴影分级 | 卡片默认 `shadow-xs`，hover 微抬升；Modal/Drawer 使用 `shadow-xl`，全站复用 |

### 2.3 品牌识别

**现状**

- 侧栏仅文字 Logo「凯施迪 CAISEDI」
- 工作台快捷入口为通用 Lucide 图标，品牌感弱
- 公司文化页渐变 Hero（`from-[#1890FF] to-[#36CFC9]`）是少数有品牌张力的区块

**改进建议**

| 编号 | 改进项 | 具体做法 |
|------|--------|----------|
| DS-07 | Logo 区 | 增加品牌图形或标准字标；规范中英文混排字号 |
| DS-08 | Hero 组件 | 将文化页渐变条提炼为可复用 `BrandHero`，用于工作台欢迎区、重要公告置顶 |

---

## 3. 字体与排版

### 3.1 字体栈

**现状**（`app/src/index.css`）

```css
font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
```

中文栈合理，无需大改。

### 3.2 字号层级

**现状问题**

| 页面 | 主标题 | 问题 |
|------|--------|------|
| 工作台 | `text-xl md:text-2xl` | 有副标题，较规范 |
| 公司文化 | 固定 `text-2xl` | 小屏可能偏大 |
| 新闻详情 | `text-xl` | 长标题易拥挤 |
| 各知识子模块 | 不统一 | 标题、模块名层级混杂 |

**改进建议**

| 编号 | 改进项 | 建议值 |
|------|--------|--------|
| TY-01 | 页面主标题 | 24px / `font-semibold`，副标题 14px `#8C8C8C` |
| TY-02 | 区块标题 | 18px / `font-medium` |
| TY-03 | 正文 | 14px，行高 1.75–1.85（长文）、1.5（列表摘要） |
| TY-04 | 辅助说明 | 12px `#8C8C8C`，注意对比度（见 a11y） |
| TY-05 | 货号/编码 | 统一 `font-mono`（商品详情已部分使用） |

### 3.3 对比度

- `#8C8C8C` 在 `#F5F5F5` 上对比度约 **4.2:1**，辅助文字勉强达标
- 重要操作、错误提示勿仅依赖该灰色

---

## 4. 布局与信息架构

### 4.1 全局框架

**相关文件**：`app/src/components/Layout.tsx`、`Sidebar.tsx`

| 编号 | 改进项 | 说明 |
|------|--------|------|
| LA-01 | 顶栏全局搜索 | 当前无 state、无跳转，与商品页/新闻页搜索重复；改为 Command Palette（`Ctrl+K`）或点击打开统一搜索弹层 |
| LA-02 | 内容区宽度 | 默认 `max-w-[1200px]`；知识双栏页可增至 `1400px` 或允许全宽 |
| LA-03 | 路由切换动画 | `main` 使用 `key={pathname}` + `page-enter`，合理；需补充 `prefers-reduced-motion` |
| LA-04 | 侧栏激活态 | `border-l-[3px]` 导致激活/非激活水平位移；改为始终保留 3px 透明左边框，或改用 `ring-inset` |

### 4.2 导航与路径

| 编号 | 改进项 | 说明 |
|------|--------|------|
| LA-05 | 面包屑 | `/news/:id`、知识管理多 Tab 切换后缺少路径提示 |
| LA-06 | 页面标题同步 | `document.title` 随路由更新（如「商品速查 - 凯施迪」） |
| LA-07 | 未路由页面 | `Track.tsx`（业绩 KPI）、`Home.tsx`（Vite 模板）未接入 `App.tsx`，需合并或删除 |

### 4.3 页面级布局一览

| 模块 | 评价 | 改进方向 |
|------|------|----------|
| 工作台 | 简洁 | 增加最近浏览、未读角标、第 4 快捷入口 |
| 商品速查 | 完整 | 大数据量时分页或虚拟滚动；图片失败占位 |
| 知识管理 | 模块重 | 8 个 Tab 改为分组或左侧二级导航 |
| 公司文化 | 内容少 | 门店风采空状态引导；品牌文案折叠 |
| 新闻通知 | 清晰 | 列表项改为 `Link`；真实封面图 |

---

## 5. 组件与交互模式

### 5.1 Modal / Drawer 统一

**现状**

| 场景 | 实现 | z-index |
|------|------|---------|
| 商品详情 | 手写 `fixed` + 遮罩 | `z-50` |
| 文档预览 `DocViewer` | 手写全屏 | `z-[100]` |
| 面料详情（移动） | shadcn `Drawer` | Radix 默认 |
| 移动侧栏 | shadcn `Sheet` | — |

**问题**：无统一焦点陷阱、Esc 关闭、滚动锁定；层级可能冲突。

**改进建议**

| 编号 | 改进项 | 做法 |
|------|--------|------|
| CP-01 | 桌面弹层 | 使用 `ui/dialog`（Radix Dialog） |
| CP-02 | 移动详情 | 使用 `ui/drawer`（与面料模块一致） |
| CP-03 | z-index 规范 | 遮罩 50、文档预览 60、Toast 70 等分级文档化 |
| CP-04 | 关闭行为 | 统一支持 Esc、点击遮罩、关闭按钮；锁定背景滚动 |

### 5.2 可点击元素语义

| 编号 | 改进项 | 现状 → 目标 |
|------|--------|-------------|
| CP-05 | 新闻/通知列表 | `motion` + `onClick` → `<Link to={...}>` |
| CP-06 | 筛选 Chip | 补充 `aria-pressed` / `aria-selected` |
| CP-07 | 图标按钮 | 清除搜索、关闭弹层等补充 `aria-label` |

### 5.3 假功能与反馈

| 入口 | 位置 | 建议 |
|------|------|------|
| 顶栏搜索 | `Layout.tsx` | 实现 Command 搜索或暂时 `disabled` + Tooltip「即将上线」 |
| 深色模式 | `Sidebar.tsx` | 接入 `next-themes` 或移除 |
| 设置 / 退出 | `Sidebar.tsx` | 接入路由或移除 |
| AI 知识测试 | `Knowledge.tsx` | 实现跳转/弹层或标注即将上线 |
| 分享 | `NewsDetail.tsx` | 复制链接后用 `sonner` Toast 提示成功 |
| 新闻封面 | `NewsDetail.tsx` | 有 `coverImage` 时渲染真实图，非占位渐变 |

### 5.4 shadcn/ui 收敛

已安装 Button、Input、Dialog、Tabs、Badge、Sheet、Drawer 等，建议逐步替换业务页内联样式，仅通过 className 覆盖品牌色，减少重复实现与包体积浪费。

---

## 6. 动效与微交互

### 6.1 已有动效（`app/src/index.css`）

| 类名 | 用途 | 评价 |
|------|------|------|
| `.page-enter` | 路由切换 fade + translateY | 合适，需支持减少动效 |
| `.product-card` / `.quick-card` | hover 抬升 + 阴影 | 合适 |
| `.kpi-animate` | KPI 卡片入场 | 仅 `Track.tsx` 使用，未上线 |
| `.timeline-node` | 时间轴入场 | 同上 |

### 6.2 待补充动效

| 编号 | 场景 | 建议 |
|------|------|------|
| AN-01 | 筛选面板展开 | `accordion-down` 或 height 过渡，避免瞬间展开 |
| AN-02 | 商品 Modal | 使用 Dialog 自带 fade + scale |
| AN-03 | Tab 内容切换 | 可选 150ms 淡入；内容重时可保持无动画 |
| AN-04 | 数字滚动 | `useCountUp` 可用于工作台 KPI（若接入 `Track` 数据） |
| AN-05 | 减少动效 | `@media (prefers-reduced-motion: reduce)` 关闭 page-enter、hover transform |
| AN-06 | 图片加载 | 商品图 `onError` 后显示 Package 占位，避免空白块 |

---

## 7. 移动端体验

### 7.1 已做好的部分

- `Layout` + `Sheet` 侧栏抽屉（`md:hidden` 菜单按钮）
- `FabricKnowledge`：`useIsMobile` + 底部 `Drawer` 高度 92vh，适合单手操作
- 各页标题、间距普遍使用 `md:` 断点适配

### 7.2 待改进

| 编号 | 改进项 | 说明 |
|------|--------|------|
| MO-01 | 商品详情 Modal | 小屏信息块过多，建议 Tab 分段：基础信息 / 面料 / 工艺 / 洗护 |
| MO-02 | 商品筛选 | Chip 过多时可改为底部 Sheet 筛选（与面料 Drawer 一致） |
| MO-03 | 知识 Tab | 8 个 Tab 横滑时增加 sticky 子导航或当前 Tab 强调 |
| MO-04 | `useIsMobile` 首屏 | 初始 `undefined` 可能闪桌面布局；优先 CSS `md:`，JS 仅控制 Drawer |
| MO-05 | 公司文化长文 | 品牌介绍段落折叠「展开更多」 |

---

## 8. 各模块专项改进

### 8.1 工作台（`Dashboard.tsx`）

| 编号 | 改进项 |
|------|--------|
| DB-01 | 快捷入口增至 4 个或 2×2 网格，含「新闻通知」 |
| DB-02 | 通知列表增加未读状态（圆点/加粗，需数据支持） |
| DB-03 | 快捷卡片增加 `focus-visible:ring-2` 键盘焦点样式 |
| DB-04 | 可选：最近浏览面料/商品、待办数量角标 |

### 8.2 商品速查（`Products.tsx`）

| 编号 | 改进项 |
|------|--------|
| PD-01 | 图片 `onError` 回退占位图标，勿仅 `display: none` |
| PD-02 | 图上的年份/季节/风格标签改到图下或缩小，提升小图可读性 |
| PD-03 | 「清除全部」在移动端并入筛选面板底部 |
| PD-04 | 详情弹层改用 Dialog/Drawer |
| PD-05 | 数据量大时：分页、虚拟列表或懒加载 |
| PD-06 | 底部固定「复制货号」按钮（移动端） |

### 8.3 知识管理（`Knowledge.tsx` 及子组件）

| 编号 | 改进项 |
|------|--------|
| KN-01 | 以 `FabricKnowledge` 为范本，统一各 `*System` 的左栏宽、右栏头、模块 Pill Tab |
| KN-02 | 8 个顶 Tab 改为左侧模块树 + 右侧内容，或 Tab 分组（培训类 / 资料类） |
| KN-03 | 「AI 知识测试」使用差异化样式（描边/渐变），与普通主按钮区分 |
| KN-04 | 删除或归档 `Knowledge.tsx` 中已无用的通用文档树分支（已被各 System 组件替代） |

**子模块文件**：`FabricKnowledge.tsx`、`ProductKnowledge.tsx`、`ManagementSystem.tsx`、`ManagerTraining.tsx`、`StoreImageSystem.tsx`、`SalesScriptSystem.tsx`、`NewStaffSystem.tsx`、`BrandIntroSystem.tsx`

### 8.4 新闻通知（`News.tsx` / `NewsDetail.tsx`）

| 编号 | 改进项 |
|------|--------|
| NW-01 | 列表项使用 `Link`，支持新标签打开、SEO 友好 |
| NW-02 | 置顶卡片左边框 `#FAAD14` 保留，可加强置顶标签 |
| NW-03 | 详情页渲染真实 `coverImage` |
| NW-04 | 正文复杂 Markdown 建议 `react-markdown`，替代手写行解析 |
| NW-05 | 分享成功/失败 Toast 反馈 |

### 8.5 公司文化（`Culture.tsx`）

| 编号 | 改进项 |
|------|--------|
| CU-01 | 品牌介绍长文移动端折叠 |
| CU-02 | 门店风采 `stores` 为空时：引导文案、示例图或后台上传说明 |
| CU-03 | 复用 `BrandHero` 渐变组件 |

### 8.6 面料知识（`FabricKnowledge.tsx`）— 标杆，维护即可

| 编号 | 改进项 |
|------|--------|
| FB-01 | 将 Drawer + 双栏模式沉淀为共享布局组件 `MasterDetailLayout` |
| FB-02 | 模块 Pill Tab 过多时考虑二级折叠 |

### 8.7 管理制度 / 文档（`ManagementSystem.tsx` / `DocViewer.tsx`）

| 编号 | 改进项 |
|------|--------|
| MG-01 | 预览层 z-index 纳入全局规范 |
| MG-02 | DOCX 加载态统一 Skeleton |
| MG-03 | PPT 提示页样式与其它空状态对齐 |

---

## 9. 无障碍（a11y）

| 编号 | 改进项 | 说明 |
|------|--------|------|
| A11Y-01 | 焦点管理 | 自定义 Modal 需焦点陷阱、`aria-modal`、`aria-labelledby` |
| A11Y-02 | 键盘 | Esc 关闭弹层；列表项可 Tab 聚焦 |
| A11Y-03 | 按钮标签 | 图标按钮补充 `aria-label` |
| A11Y-04 | 色觉 | 错误/正确话术块已有红绿背景，保留文字标签，可加 ✓ / ✗ 图标 |
| A11Y-05 | 对比度 | 辅助文字避免用于 sole 交互提示；主按钮对比度 ≥ 4.5:1 |
| A11Y-06 | 动效 | 支持 `prefers-reduced-motion` |

---

## 10. 技术债与代码整理

| 编号 | 项 | 文件/位置 | 建议 |
|------|-----|-----------|------|
| TD-01 | 未路由页面 | `pages/Track.tsx` | 合并进工作台或删除 |
| TD-02 | Vite 模板残留 | `pages/Home.tsx` | 删除 |
| TD-03 | 死代码分支 | `Knowledge.tsx` 通用文档树 | 删除或注释说明 |
| TD-04 | 颜色硬编码 | 全项目 `text-[#...]` | 迁移至设计令牌 |
| TD-05 | 重复搜索 UI | `Layout` + 各页搜索框 | 合并为全局 Command |
| TD-06 | CSS 动画未使用 | `kpi-animate`、`timeline-node` | 上线 Track 功能或移除样式 |

---

## 11. 优先级路线图

### P0 — 影响可用性与信任（建议优先 1–2 周）

| 编号 | 任务 | 关联项 |
|------|------|--------|
| P0-1 | 接通或隐藏顶栏搜索、侧栏主题/设置/退出、AI 知识测试 | CP-03 假功能表 |
| P0-2 | 商品详情、文档预览改用 Dialog + Drawer，统一 Esc/焦点/层级 | CP-01 ~ CP-04 |
| P0-3 | 新闻/通知列表改为 `Link` + 焦点样式 | CP-05 |

### P1 — 体验明显提升（建议 2–4 周）

| 编号 | 任务 | 关联项 |
|------|------|--------|
| P1-1 | 建立设计令牌，替换主要硬编码颜色 | DS-01 ~ DS-04 |
| P1-2 | 全局 Command 搜索（货号、文档、新闻） | LA-01 |
| P1-3 | 知识管理 Tab 重组；子模块 UI 对齐面料模块 | KN-01 ~ KN-02 |
| P1-4 | 面包屑 + `document.title` | LA-05 ~ LA-06 |
| P1-5 | 商品图失败占位、筛选动画 | PD-01, AN-01 |

### P2 —  polish / 品牌（可持续迭代）

| 编号 | 任务 | 关联项 |
|------|------|--------|
| P2-1 | 工作台品牌 Hero + KPI 概览（复用 Track 动效） | DB-04, DS-08 |
| P2-2 | 统一阴影/圆角、Toast、骨架屏 | DS-05 ~ DS-06 |
| P2-3 | 暗色模式或移除入口；减少动效媒体查询 | DS-03, AN-05 |
| P2-4 | 公司文化门店图库、新闻真实封面 | CU-02, NW-03 |
| P2-5 | 沉淀 `MasterDetailLayout`、`BrandHero` 共享组件 | FB-01, DS-08 |

---

## 12. 改进项清单（可勾选）

复制到迭代看板或 PR 描述中使用。

### P0

- [ ] P0-1 顶栏搜索：实现 Command 或禁用 + 提示
- [ ] P0-2 侧栏 Moon / Settings / LogOut：实现或移除
- [ ] P0-3 「AI 知识测试」：实现或标注即将上线
- [ ] P0-4 商品详情弹层改为 Dialog（桌面）/ Drawer（移动）
- [ ] P0-5 DocViewer 纳入统一 z-index 与 Dialog 规范
- [ ] P0-6 新闻列表、工作台通知改为 `Link`

### P1

- [ ] P1-1 Tailwind 设计令牌替换 `#1890FF` 等主色
- [ ] P1-2 全局 Command 搜索（Ctrl+K）
- [ ] P1-3 知识管理导航重组（Tab 分组或侧栏二级）
- [ ] P1-4 各 `*System` 布局对齐 `FabricKnowledge`
- [ ] P1-5 面包屑组件 + 路由 title
- [ ] P1-6 商品图 onError 占位
- [ ] P1-7 筛选区展开动画
- [ ] P1-8 分享/复制 Toast（sonner）
- [ ] P1-9 清理 `Knowledge.tsx` 死代码

### P2

- [ ] P2-1 工作台欢迎 Hero + 可选 KPI
- [ ] P2-2 `Track.tsx` 合并路由或删除
- [ ] P2-3 删除 `Home.tsx` 模板页
- [ ] P2-4 暗色模式完整实现或移除 Moon 按钮
- [ ] P2-5 `prefers-reduced-motion` 支持
- [ ] P2-6 公司文化长文折叠 + 门店风采内容
- [ ] P2-7 新闻 `react-markdown` 正文
- [ ] P2-8 共享组件 `MasterDetailLayout`、`BrandHero`

---

## 附录：关键文件索引

| 类型 | 路径 |
|------|------|
| 全局样式 | `app/src/index.css` |
| Tailwind 配置 | `app/tailwind.config.js` |
| 布局 | `app/src/components/Layout.tsx` |
| 侧栏 | `app/src/components/Sidebar.tsx` |
| 路由 | `app/src/App.tsx` |
| 页面 | `app/src/pages/Dashboard.tsx`、`Products.tsx`、`Knowledge.tsx`、`Culture.tsx`、`News.tsx`、`NewsDetail.tsx` |
| 标杆组件 | `app/src/components/FabricKnowledge.tsx` |
| 未使用页面 | `app/src/pages/Track.tsx`、`Home.tsx` |
| 移动端 Hook | `app/src/hooks/use-mobile.ts` |
| 数字动画 | `app/src/hooks/useCountUp.ts` |

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-05-20 | 初版：UI 评审结论与改进项汇总 |
