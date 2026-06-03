from app.config import get_settings
from app.storage.local import LocalStorageProvider
from app.storage.oss import OssStorageProvider
from app.storage.base import StorageProvider


def get_storage() -> StorageProvider:
    settings = get_settings()
    if settings.storage_backend == "oss":
        return OssStorageProvider(settings)
    return LocalStorageProvider(settings)
