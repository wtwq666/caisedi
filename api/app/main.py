from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import get_settings
from app.routers import (
    admin,
    auth,
    content_updates,
    documents,
    fabrics,
    learning,
    news,
    products,
    quiz,
    search,
    store_albums,
)

settings = get_settings()

app = FastAPI(title="凯施迪学习平台 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = FastAPI()
api.include_router(auth.router)
api.include_router(products.router)
api.include_router(fabrics.router)
api.include_router(documents.router)
api.include_router(news.router)
api.include_router(store_albums.router)
api.include_router(content_updates.router)
api.include_router(quiz.router)
api.include_router(quiz.draft_router)
api.include_router(learning.router)
api.include_router(search.router)
api.include_router(admin.router)

app.mount("/api/v1", api)

storage_path = settings.storage_root_path
if storage_path.exists():
    app.mount("/assets", StaticFiles(directory=str(storage_path)), name="assets")


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
