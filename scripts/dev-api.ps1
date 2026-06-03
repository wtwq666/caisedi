# 启动后端 API（SQLite 本地库，端口 8100）
$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\..\api"

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "已创建 api/.env"
}

if (-not (Test-Path "caisedi_dev.db")) {
    Write-Host "正在初始化数据库并导入种子数据…"
    python -m scripts.seed --phase all
}
Write-Host "同步 app/public 图片到 storage/ …"
python -m scripts.sync_public_assets

Write-Host "API: http://localhost:8100  |  文档: http://localhost:8100/docs"
python -m uvicorn app.main:app --reload --port 8100
