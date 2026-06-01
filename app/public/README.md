# 静态资源目录

将以下资源放入本目录后，文档预览与门店相册方可正常显示。

## 培训文档 `training/`

与 `src/data/trainingData.ts`、`managementData.ts` 等中的 `filename` 字段对应，访问路径为 `/training/{filename}`。

示例：

```
public/training/
  凯施迪运营手册_店长管理册_A4版修正 (1)(1).docx
  店长 10天完整培训课件.pptx
  ...
```

## 门店相册 `stores/`

与 `src/data/storeShowcaseData.ts` 中的路径对应。

示例：

```
public/stores/
  conghua-jinhui-2026/
    01-storefront.jpg
    ...
  changping-baihua-2026/
    ...
  shaoyang-youa-2025/
    ...
```

## 新闻封面 `news/`

与 `src/data/newsData.ts` 中的 `coverImage` 对应，如 `/news/qingming-2026.png`。
