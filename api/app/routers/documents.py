from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Document
from app.schemas.content import DocumentOut
from app.services.mappers import document_to_out

router = APIRouter(prefix="/documents", tags=["documents"])


@router.get("", response_model=list[DocumentOut])
def list_documents(
    tab: str = Query(...),
    category: str | None = None,
    q: str | None = None,
    db: Session = Depends(get_db),
) -> list[DocumentOut]:
    query = db.query(Document).options(joinedload(Document.file)).filter(Document.tab == tab)
    docs = query.order_by(Document.title).all()
    if category and category != "all":
        docs = [d for d in docs if d.category == category]
    if q:
        kw = q.strip()
        docs = [
            d
            for d in docs
            if kw in d.title or kw in d.description or any(kw in t for t in (d.tags or []))
        ]
    return [document_to_out(d) for d in docs]


@router.get("/{doc_id}", response_model=DocumentOut)
def get_document(doc_id: str, db: Session = Depends(get_db)) -> DocumentOut:
    doc = (
        db.query(Document)
        .options(joinedload(Document.file))
        .filter(Document.id == doc_id)
        .first()
    )
    if not doc:
        raise HTTPException(status_code=404, detail="文档不存在")
    return document_to_out(doc)
