from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth_utils import get_current_employee
from app.database import get_db
from app.models import Employee, RecentLearning
from app.schemas.user_state import RecentLearningIn, RecentLearningOut

router = APIRouter(prefix="/learning/recent", tags=["learning"])


@router.get("", response_model=list[RecentLearningOut])
def list_recent(
    limit: int = 8,
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> list[RecentLearningOut]:
    rows = (
        db.query(RecentLearning)
        .filter(RecentLearning.employee_id == employee.id)
        .order_by(RecentLearning.viewed_at.desc())
        .limit(limit)
        .all()
    )
    return [
        RecentLearningOut(
            type=r.item_type,
            id=r.item_id,
            title=r.title,
            subtitle=r.subtitle or None,
            viewedAt=r.viewed_at.isoformat(),
        )
        for r in rows
    ]


@router.post("", response_model=RecentLearningOut)
def record_recent(
    body: RecentLearningIn,
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> RecentLearningOut:
    now = datetime.now(timezone.utc)
    row = (
        db.query(RecentLearning)
        .filter(
            RecentLearning.employee_id == employee.id,
            RecentLearning.item_type == body.type,
            RecentLearning.item_id == body.id,
        )
        .first()
    )
    if row:
        row.title = body.title
        row.subtitle = body.subtitle or ""
        row.viewed_at = now
    else:
        row = RecentLearning(
            employee_id=employee.id,
            item_type=body.type,
            item_id=body.id,
            title=body.title,
            subtitle=body.subtitle or "",
            viewed_at=now,
        )
        db.add(row)
    db.commit()

    all_rows = (
        db.query(RecentLearning)
        .filter(RecentLearning.employee_id == employee.id)
        .order_by(RecentLearning.viewed_at.desc())
        .all()
    )
    if len(all_rows) > 8:
        for extra in all_rows[8:]:
            db.delete(extra)
        db.commit()

    return RecentLearningOut(
        type=row.item_type,
        id=row.item_id,
        title=row.title,
        subtitle=row.subtitle or None,
        viewedAt=row.viewed_at.isoformat(),
    )
