"""OSS storage provider (Phase 8). Configure OSS_* env vars to enable."""

from app.config import Settings
from app.storage.base import StorageProvider


class OssStorageProvider(StorageProvider):
    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        if not all([settings.oss_endpoint, settings.oss_bucket]):
            raise RuntimeError("OSS storage requires OSS_ENDPOINT and OSS_BUCKET")

    def get_public_url(self, storage_key: str) -> str:
        endpoint = (self._settings.oss_endpoint or "").rstrip("/")
        bucket = self._settings.oss_bucket
        key = storage_key.lstrip("/")
        return f"{endpoint}/{bucket}/{key}"

    def exists(self, storage_key: str) -> bool:
        # HEAD check can be added when OSS credentials are configured
        return True
