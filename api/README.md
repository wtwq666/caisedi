# 凯施迪学习平台 API（FastAPI）

## 快速开始

### 方式 A：无 Docker（SQLite 联调，推荐本机开发）

```powershell
cd api
pip install -r requirements.txt
copy .env.example .env   # 默认已是 sqlite:///./caisedi_dev.db
python -m scripts.seed --phase all
uvicorn app.main:app --reload --port 8100
```

另开终端：

```powershell
cd app
# app/.env: VITE_USE_MOCK=false
npm run dev
```

自检：`python -m scripts.verify_connectivity`

### 方式 B：PostgreSQL（生产 / 有 Docker 时）

```bash
docker compose up -d
cd api
pip install -r requirements.txt
# .env 中 DATABASE_URL=postgresql://caisedi:caisedi@localhost:5432/caisedi
alembic upgrade head
python -m scripts.seed --phase all
uvicorn app.main:app --reload --port 8100
```

- 健康检查: http://localhost:8100/health
- Swagger: http://localhost:8100/docs
- 静态资源: http://localhost:8100/assets/training/...

## 前端接 API

在 `app/.env` 中设置:

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:8100/api/v1
VITE_ASSETS_BASE_URL=http://localhost:8100/assets
```

默认 `VITE_USE_MOCK=true`，无需后端即可运行现有功能。

## 本地大文件

将 PDF/图片放入仓库根目录 `storage/`（见 `storage/README.md`），不要放入 `app/public/`。

## Phase 8 OSS

设置环境变量 `STORAGE_BACKEND=oss` 及 `OSS_*` 后，文件 URL 由 OSS 域名生成。
