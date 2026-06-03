from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.auth_utils import get_current_employee
from app.database import get_db
from app.models import Employee, NewsItem, NewsRead
from app.schemas.content import NewsOut
from app.schemas.user_state import NewsReadStatusOut
from app.services.mappers import news_to_out

router = APIRouter(prefix="/news", tags=["news"])


@router.get("", response_model=list[NewsOut])
def list_news(db: Session = Depends(get_db)) -> list[NewsOut]:
    items = db.query(NewsItem).order_by(NewsItem.updated_at.desc()).all()
    return [news_to_out(n) for n in items]


@router.get("/read-status", response_model=NewsReadStatusOut)
def read_status(
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> NewsReadStatusOut:
    all_ids = [n.id for n in db.query(NewsItem.id).all()]
    read_ids = [
        r.news_id
        for r in db.query(NewsRead).filter(NewsRead.employee_id == employee.id).all()
    ]
    unread = [i for i in all_ids if i not in read_ids]
    return NewsReadStatusOut(readIds=read_ids, unreadCount=len(unread))


@router.post("/{news_id}/read")
def mark_read(
    news_id: str,
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> dict:
    if not db.get(NewsItem, news_id):
        raise HTTPException(status_code=404, detail="新闻不存在")
    existing = (
        db.query(NewsRead)
        .filter(NewsRead.employee_id == employee.id, NewsRead.news_id == news_id)
        .first()
    )
    if not existing:
        db.add(NewsRead(employee_id=employee.id, news_id=news_id))
        db.commit()
    return {"message": "ok"}


@router.post("/{news_id}/view")
def record_view(news_id: str, db: Session = Depends(get_db)) -> dict:
    item = db.get(NewsItem, news_id)
    if not item:
        raise HTTPException(status_code=404, detail="新闻不存在")
    item.view_count += 1
    db.commit()
    return {"viewCount": item.view_count}


@router.get("/{news_id}", response_model=NewsOut)
def get_news(news_id: str, db: Session = Depends(get_db)) -> NewsOut:
    item = db.query(NewsItem).options(joinedload(NewsItem.file)).filter(NewsItem.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="新闻不存在")
    return news_to_out(item)
