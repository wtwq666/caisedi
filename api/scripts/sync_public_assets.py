"""将 app/public 下已有静态资源同步到 storage/，供 API /assets 访问。"""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
PUBLIC = ROOT / "app" / "public"
STORAGE = ROOT / "storage"

# public 子目录 -> storage 子目录
SYNC_DIRS = ("stores", "news", "training")


def sync() -> None:
    copied = 0
    for name in SYNC_DIRS:
        src = PUBLIC / name
        if not src.is_dir():
            continue
        dst = STORAGE / name
        dst.mkdir(parents=True, exist_ok=True)
        for f in src.rglob("*"):
            if not f.is_file():
                continue
            rel = f.relative_to(src)
            target = dst / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists() or f.stat().st_mtime > target.stat().st_mtime:
                shutil.copy2(f, target)
                copied += 1
    print(f"synced {copied} file(s) from app/public -> storage/")


if __name__ == "__main__":
    sync()
