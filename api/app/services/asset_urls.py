"""静态资源公开 URL：对路径分段编码，避免中文文件名 404。"""

from urllib.parse import quote


def encode_storage_key(storage_key: str) -> str:
    key = storage_key.lstrip("/")
    if not key:
        return ""
    return "/".join(quote(part, safe="") for part in key.split("/"))


def build_public_asset_url(base_url: str, storage_key: str) -> str:
    base = base_url.rstrip("/")
    encoded = encode_storage_key(storage_key)
    return f"{base}/{encoded}" if encoded else base
