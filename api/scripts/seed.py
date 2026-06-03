"""Seed database from api/seed_data/*.json (generate via app/scripts/exportSeedData.ts)."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.auth_utils import hash_password
from app.database import Base, SessionLocal, engine
from app.models import (
    AuthCredential,
    Document,
    Employee,
    Fabric,
    FileAsset,
    NewsItem,
    Product,
    StoreAlbum,
    StoreAlbumImage,
)

SEED_DIR = Path(__file__).resolve().parent.parent / "seed_data"


def load_json(name: str):
    path = SEED_DIR / f"{name}.json"
    if not path.exists():
        raise FileNotFoundError(f"Missing {path}. Run: cd app && npx tsx scripts/exportSeedData.ts")
    return json.loads(path.read_text(encoding="utf-8"))


def seed_employees(db: Session) -> None:
    for emp in load_json("employees"):
        row = db.get(Employee, emp["id"])
        extra = {k: v for k, v in emp.items() if k not in ("id", "employeeNo", "name")}
        payload = {
            "id": emp["id"],
            "employee_no": emp["employeeNo"],
            "name": emp["name"],
            "gender": emp.get("gender", ""),
            "store": emp.get("store", ""),
            "department": emp.get("department", ""),
            "job_position": emp.get("jobPosition", ""),
            "primary_mobile": emp.get("primaryMobile", ""),
            "avatar_url": emp.get("avatarUrl", ""),
            "status": emp.get("status", "在职"),
            "role": "staff",
            "extra": extra,
        }
        if row:
            for k, v in payload.items():
                setattr(row, k, v)
        else:
            db.add(Employee(**payload))

    for acc in load_json("authAccounts"):
        cred = db.query(AuthCredential).filter(AuthCredential.username == acc["username"]).first()
        if cred:
            cred.password_hash = hash_password(acc["password"])
            cred.enabled = acc.get("enabled", True)
        else:
            db.add(
                AuthCredential(
                    employee_id=acc["employeeId"],
                    username=acc["username"],
                    password_hash=hash_password(acc["password"]),
                    enabled=acc.get("enabled", True),
                )
            )
    db.commit()
    print("seeded employees + auth")


def seed_products(db: Session) -> None:
    for p in load_json("products"):
        content = {k: v for k, v in p.items() if k not in ("id", "productCode", "name")}
        row = db.get(Product, p["id"])
        if row:
            row.product_code = p["productCode"]
            row.name = p["name"]
            row.content = content
        else:
            db.add(Product(id=p["id"], product_code=p["productCode"], name=p["name"], content=content))
    db.commit()
    print(f"seeded {len(load_json('products'))} products")


def seed_fabrics(db: Session) -> None:
    for f in load_json("fabrics"):
        content = {k: v for k, v in f.items() if k not in ("id", "fabricCode", "fabricName", "category")}
        row = db.get(Fabric, f["id"])
        if row:
            row.fabric_code = f["fabricCode"]
            row.fabric_name = f["fabricName"]
            row.category = f.get("category", "")
            row.content = content
        else:
            db.add(
                Fabric(
                    id=f["id"],
                    fabric_code=f["fabricCode"],
                    fabric_name=f["fabricName"],
                    category=f.get("category", ""),
                    content=content,
                )
            )
    db.commit()
    print(f"seeded {len(load_json('fabrics'))} fabrics")


def ensure_file(db: Session, storage_key: str, original_name: str, mime: str) -> int:
    row = db.query(FileAsset).filter(FileAsset.storage_key == storage_key).first()
    if row:
        return row.id
    f = FileAsset(storage_key=storage_key, original_name=original_name, mime_type=mime)
    db.add(f)
    db.flush()
    return f.id


def seed_documents(db: Session) -> None:
    for d in load_json("documents"):
        storage_key = f"training/{d['filename']}"
        file_id = ensure_file(db, storage_key, d["filename"], d.get("fileType", "pdf"))
        row = db.get(Document, d["id"])
        payload = {
            "id": d["id"],
            "tab": d["tab"],
            "title": d["title"],
            "description": d.get("description", ""),
            "filename": d.get("filename", ""),
            "file_type": d.get("fileType", "pdf"),
            "file_size": d.get("fileSize", ""),
            "category": d.get("category", ""),
            "tags": d.get("tags", []),
            "file_id": file_id,
        }
        if row:
            for k, v in payload.items():
                setattr(row, k, v)
        else:
            db.add(Document(**payload))
    db.commit()
    print(f"seeded {len(load_json('documents'))} documents")


def seed_news(db: Session) -> None:
    for n in load_json("news"):
        content = {k: v for k, v in n.items() if k != "id"}
        file_id = None
        cover = n.get("coverImage", "")
        if cover.startswith("/news/"):
            storage_key = cover.lstrip("/")
            file_id = ensure_file(db, storage_key, Path(storage_key).name, "image/png")
        row = db.get(NewsItem, n["id"])
        if row:
            row.title = n["title"]
            row.content = content
            row.view_count = n.get("viewCount", row.view_count)
            row.file_id = file_id
        else:
            db.add(
                NewsItem(
                    id=n["id"],
                    title=n["title"],
                    content=content,
                    view_count=n.get("viewCount", 0),
                    file_id=file_id,
                )
            )
    db.commit()
    print(f"seeded {len(load_json('news'))} news")


def seed_albums(db: Session) -> None:
    for a in load_json("storeAlbums"):
        cover_key = a.get("coverImage", "").lstrip("/")
        album = db.get(StoreAlbum, a["id"])
        album_date = None
        if a.get("date"):
            try:
                album_date = datetime.strptime(a["date"], "%Y-%m-%d").replace(tzinfo=timezone.utc)
            except ValueError:
                pass
        if album:
            album.title = a["title"]
            album.location = a.get("location", "")
            album.description = a.get("description", "")
            album.cover_storage_key = cover_key
            album.category = a.get("category", "")
            album.tags = a.get("tags", [])
            album.album_date = album_date
            db.query(StoreAlbumImage).filter(StoreAlbumImage.album_id == a["id"]).delete()
        else:
            album = StoreAlbum(
                id=a["id"],
                title=a["title"],
                location=a.get("location", ""),
                description=a.get("description", ""),
                cover_storage_key=cover_key,
                category=a.get("category", ""),
                tags=a.get("tags", []),
                album_date=album_date,
            )
            db.add(album)
            db.flush()
        for i, img in enumerate(a.get("images", [])):
            key = img.get("src", "").lstrip("/")
            db.add(
                StoreAlbumImage(
                    album_id=a["id"],
                    storage_key=key,
                    caption=img.get("caption", ""),
                    sort_order=i,
                )
            )
    db.commit()
    print(f"seeded {len(load_json('storeAlbums'))} albums")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--phase", default="all")
    args = parser.parse_args()

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        phase = args.phase
        if phase in ("all", "0", "1"):
            seed_employees(db)
        if phase in ("all", "2"):
            seed_products(db)
            seed_fabrics(db)
        if phase in ("all", "3"):
            seed_documents(db)
        if phase in ("all", "4"):
            seed_news(db)
            seed_albums(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
