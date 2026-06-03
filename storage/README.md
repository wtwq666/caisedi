# 本地资源目录（开发期）

大文件放在此目录，由 API `GET /assets/...` 提供访问，**不打包进前端**。

```
storage/
  training/   # 培训 PDF/DOCX/PPTX，对应 documents 的 storage_key
  stores/     # 门店相册图片
  news/       # 新闻封面
```

将文件放入对应子目录后，运行 `cd api && python -m scripts.seed --phase all` 同步数据库元数据。

若图片仍在 `app/public/stores/`（开发习惯），可一键同步到本目录：

```bash
cd api && python -m scripts.sync_public_assets
```
