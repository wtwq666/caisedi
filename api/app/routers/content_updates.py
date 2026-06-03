from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Document, Fabric, NewsItem, Product, StoreAlbum
from app.schemas.content import ContentUpdateOut

router = APIRouter(prefix="/content-updates", tags=["content-updates"])


def _label(dt: datetime) -> tuple[str, int]:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.strftime("%Y/%m/%d"), int(dt.timestamp() * 1000)


def _action(created: datetime, updated: datetime) -> str:
    if updated > created:
        return "修改"
    return "新增"


@router.get("", response_model=list[ContentUpdateOut])
def list_updates(
    action: str | None = None,
    type: str | None = None,
    q: str | None = None,
    limit: int | None = Query(None, ge=1, le=100),
    db: Session = Depends(get_db),
) -> list[ContentUpdateOut]:
    items: list[ContentUpdateOut] = []

    for n in db.query(NewsItem).all():
        c = n.content or {}
        act = "新增"
        date_label, sort_key = _label(n.created_at)
        items.append(
            ContentUpdateOut(
                id=f"news-{n.id}",
                type="通知",
                action=act,
                title=n.title,
                subtitle=c.get("author"),
                dateLabel=date_label,
                sortKey=sort_key,
                to=f"/news/{n.id}",
            )
        )

    for doc in db.query(Document).all():
        act = _action(doc.created_at, doc.updated_at)
        date_label, sort_key = _label(doc.updated_at)
        verb = "更新" if act == "修改" else "新增"
        items.append(
            ContentUpdateOut(
                id=f"doc-{doc.id}",
                type="文档",
                action=act,
                title=f"{verb}培训文档：{doc.title}",
                subtitle=doc.category,
                dateLabel=date_label,
                sortKey=sort_key,
                to="/knowledge",
                state={"tab": doc.tab, "docId": doc.id},
            )
        )

    for album in db.query(StoreAlbum).all():
        act = "新增"
        dt = album.album_date or album.created_at
        date_label, sort_key = _label(dt)
        items.append(
            ContentUpdateOut(
                id=f"album-{album.id}",
                type="门店",
                action=act,
                title=f"门店风采：{album.title}",
                subtitle=album.location,
                dateLabel=date_label,
                sortKey=sort_key,
                to="/knowledge",
                state={"tab": "store-image", "albumId": album.id},
            )
        )

    products = db.query(Product).all()
    if products:
        seasons = list({(p.content or {}).get("season", "") for p in products if (p.content or {}).get("season")})[:3]
        dt = max(p.updated_at for p in products)
        date_label, sort_key = _label(dt)
        items.append(
            ContentUpdateOut(
                id="products-batch",
                type="商品",
                action="新增",
                title="商品资料库",
                subtitle=f"共 {len(products)} 款，含{'、'.join(seasons)}等",
                dateLabel=date_label,
                sortKey=sort_key,
                to="/products",
            )
        )

    fabrics = db.query(Fabric).all()
    if fabrics:
        cats = len({f.category for f in fabrics})
        dt = max(f.updated_at for f in fabrics)
        date_label, sort_key = _label(dt)
        items.append(
            ContentUpdateOut(
                id="fabric-library",
                type="面料",
                action="修改",
                title="面料知识库更新",
                subtitle=f"{len(fabrics)} 种面料 · {cats} 个分类",
                dateLabel=date_label,
                sortKey=sort_key,
                to="/knowledge",
                state={"tab": "fabric"},
            )
        )

    items.sort(key=lambda x: x.sortKey, reverse=True)

    if action and action != "all":
        items = [i for i in items if i.action == action]
    if type and type != "all":
        items = [i for i in items if i.type == type]
    if q:
        kw = q.strip().lower()
        items = [
            i
            for i in items
            if kw in i.title.lower()
            or (i.subtitle and kw in i.subtitle.lower())
            or kw in i.type.lower()
        ]
    if limit is not None:
        items = items[:limit]
    return items
