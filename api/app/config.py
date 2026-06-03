from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    database_url: str = "postgresql://caisedi:caisedi@localhost:5432/caisedi"
    jwt_secret: str = "dev-secret-change-in-production"
    jwt_access_minutes: int = 30
    jwt_refresh_days: int = 7
    storage_backend: str = "local"
    storage_root: str = "../storage"
    assets_base_url: str = "http://localhost:8100/assets"
    cors_origins: str = "http://localhost:3100,http://127.0.0.1:3100"

    oss_endpoint: str | None = None
    oss_bucket: str | None = None
    oss_access_key: str | None = None
    oss_secret_key: str | None = None

    @property
    def storage_root_path(self) -> Path:
        root = Path(self.storage_root)
        if not root.is_absolute():
            root = Path(__file__).resolve().parent.parent / root
        return root.resolve()

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
