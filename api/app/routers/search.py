from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Document, Fabric, NewsItem, Product, StoreAlbum
from app.schemas.content import SearchItemOut
from app.services.mappers import fabric_to_out, product_to_out
from app.services.search_score import score_match

router = APIRouter(prefix="/search", tags=["search"])

MAX_PER_GROUP = 5
MAX_TOTAL = 24
GROUP_ORDER = ("商品", "面料", "新闻", "文档", "门店")


def _cap_by_group(items: list[tuple[int, SearchItemOut]]) -> list[SearchItemOut]:
    counts: dict[str, int] = {g: 0 for g in GROUP_ORDER}
    out: list[SearchItemOut] = []
    for score, item in sorted(items, key=lambda x: (-x[0], x[1].title)):
        if len(out) >= MAX_TOTAL:
            break
        g = item.group
        if counts.get(g, 0) >= MAX_PER_GROUP:
            continue
        counts[g] = counts.get(g, 0) + 1
        out.append(item)
    return out


@router.get("", response_model=list[SearchItemOut])
def search(q: str = Query(..., min_length=1), db: Session = Depends(get_db)) -> list[SearchItemOut]:
    kw = q.strip().lower()
    scored: list[tuple[int, SearchItemOut]] = []

    for p in db.query(Product).all():
        po = product_to_out(p)
        text = " ".join(
            [po.productCode, po.name, po.series, po.fabricComposition, po.color, po.season]
        )
        s = score_match(
            query=kw,
            title=po.name,
            subtitle=po.productCode,
            haystack=text,
            code=po.productCode,
        )
        if s > 0:
            scored.append(
                (
                    s,
                    SearchItemOut(
                        id=f"product-{p.id}",
                        group="商品",
                        title=po.name,
                        subtitle=po.productCode,
                        navigate={"type": "product", "productId": p.id},
                    ),
                )
            )

    for f in db.query(Fabric).all():
        fo = fabric_to_out(f)
        text = f"{fo.fabricName} {fo.fabricCode} {fo.category} {fo.summary}"
        s = score_match(
            query=kw,
            title=fo.fabricName,
            subtitle=f"{fo.fabricCode} · {fo.category}",
            haystack=text,
            code=fo.fabricCode,
        )
        if s > 0:
            scored.append(
                (
                    s,
                    SearchItemOut(
                        id=f"fabric-{f.id}",
                        group="面料",
                        title=fo.fabricName,
                        subtitle=f"{fo.fabricCode} · {fo.category}",
                        navigate={"type": "fabric", "fabricId": f.id},
                    ),
                )
            )

    for n in db.query(NewsItem).all():
        c = n.content or {}
        text = f"{n.title} {c.get('summary', '')} {c.get('author', '')}"
        s = score_match(query=kw, title=n.title, subtitle=c.get("author") or "", haystack=text)
        if s > 0:
            scored.append(
                (
                    s,
                    SearchItemOut(
                        id=f"news-{n.id}",
                        group="新闻",
                        title=n.title,
                        subtitle=c.get("author"),
                        navigate={"type": "news", "newsId": n.id},
                    ),
                )
            )

    for doc in db.query(Document).all():
        text = f"{doc.title} {doc.description} {' '.join(doc.tags or [])}"
        s = score_match(query=kw, title=doc.title, subtitle=doc.category or "", haystack=text)
        if s > 0:
            scored.append(
                (
                    s,
                    SearchItemOut(
                        id=f"doc-{doc.tab}-{doc.id}",
                        group="文档",
                        title=doc.title,
                        subtitle=doc.category,
                        navigate={"type": "knowledge", "tab": doc.tab, "docId": doc.id},
                    ),
                )
            )

    for album in db.query(StoreAlbum).options(joinedload(StoreAlbum.images)).all():
        text = f"{album.title} {album.location} {' '.join(album.tags or [])}"
        s = score_match(query=kw, title=album.title, subtitle=album.location or "", haystack=text)
        if s > 0:
            scored.append(
                (
                    s,
                    SearchItemOut(
                        id=f"album-{album.id}",
                        group="门店",
                        title=album.title,
                        subtitle=album.location,
                        navigate={"type": "knowledge", "tab": "store-image", "albumId": album.id},
                    ),
                )
            )

    return _cap_by_group(scored)
