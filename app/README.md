# 凯施迪 CAISEDI — 企业信息管理系统（前端）

门店店员内训与日常查阅用的纯前端 SPA：商品速查、面料/商品知识、培训文档、知识测验、新闻通知等。

## 技术栈

- React 19 + TypeScript + Vite 7
- React Router 7、Tailwind CSS、shadcn/ui

## 快速开始

```bash
cd app
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 演示账号

| 工号 | 密码 |
|------|------|
| KS20250001 ~ KS20250010 | 123456 |

## 静态资源

文档预览与门店相册依赖 `public/` 下的文件，详见 [public/README.md](./public/README.md)。

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建结果 |

## 目录说明

```
src/
  pages/        # 路由页面
  components/   # 业务与布局组件
  data/         # 静态演示数据（日后可换 API）
  services/     # 数据访问层（接后端时只改此处）
  lib/          # 测验记录、搜索索引、本地存储等
```

## 产品文档

仓库根目录 `docs/UI产品设计方案.md` 为无后端阶段的产品蓝图。
