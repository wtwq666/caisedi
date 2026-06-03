from pathlib import Path

from app.config import Settings
from app.services.asset_urls import build_public_asset_url
from app.storage.base import StorageProvider


class LocalStorageProvider(StorageProvider):
    def __init__(self, settings: Settings) -> None:
        self._root = settings.storage_root_path
        self._base_url = settings.assets_base_url.rstrip("/")

    def get_public_url(self, storage_key: str) -> str:
        return build_public_asset_url(self._base_url, storage_key)

    def exists(self, storage_key: str) -> bool:
        path = self._root / storage_key.lstrip("/")
        return path.is_file()

    def resolve_path(self, storage_key: str) -> Path:
        return self._root / storage_key.lstrip("/")
