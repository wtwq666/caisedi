from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth_utils import get_current_employee
from app.database import get_db
from app.models import Employee, QuizAttempt, QuizDraft
from app.schemas.user_state import QuizAttemptIn, QuizAttemptOut, QuizDraftIn, QuizDraftOut

router = APIRouter(prefix="/quiz-attempts", tags=["quiz"])


@router.get("", response_model=list[QuizAttemptOut])
def list_attempts(
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> list[QuizAttemptOut]:
    rows = (
        db.query(QuizAttempt)
        .filter(QuizAttempt.employee_id == employee.id)
        .order_by(QuizAttempt.completed_at.desc())
        .limit(5000)
        .all()
    )
    return [
        QuizAttemptOut(
            id=r.id,
            employeeId=r.employee_id,
            source=r.source,
            tagKey=r.tag_key,
            tagLabel=r.tag_label,
            moduleKey=r.module_key,
            moduleLabel=r.module_label,
            correctCount=r.correct_count,
            totalCount=r.total_count,
            scorePercent=r.score_percent,
            completedAt=r.completed_at.isoformat(),
        )
        for r in rows
    ]


@router.post("", response_model=QuizAttemptOut)
def create_attempt(
    body: QuizAttemptIn,
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> QuizAttemptOut:
    now = datetime.now(timezone.utc)
    attempt_id = f"{employee.id}-{body.source}-{body.tagKey}-{body.moduleKey}-{int(now.timestamp() * 1000)}"
    row = QuizAttempt(
        id=attempt_id,
        employee_id=employee.id,
        source=body.source,
        tag_key=body.tagKey,
        tag_label=body.tagLabel,
        module_key=body.moduleKey,
        module_label=body.moduleLabel,
        correct_count=body.correctCount,
        total_count=body.totalCount,
        score_percent=body.scorePercent,
        completed_at=now,
    )
    db.add(row)
    db.query(QuizDraft).filter(
        QuizDraft.employee_id == employee.id,
        QuizDraft.source == body.source,
        QuizDraft.tag_key == body.tagKey,
        QuizDraft.module_key == body.moduleKey,
    ).delete()
    db.commit()
    return QuizAttemptOut(
        id=row.id,
        employeeId=row.employee_id,
        source=row.source,
        tagKey=row.tag_key,
        tagLabel=row.tag_label,
        moduleKey=row.module_key,
        moduleLabel=row.module_label,
        correctCount=row.correct_count,
        totalCount=row.total_count,
        scorePercent=row.score_percent,
        completedAt=row.completed_at.isoformat(),
    )


draft_router = APIRouter(prefix="/quiz-drafts", tags=["quiz"])


@draft_router.get("", response_model=list[QuizDraftOut])
def list_drafts(
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> list[QuizDraftOut]:
    rows = db.query(QuizDraft).filter(QuizDraft.employee_id == employee.id).all()
    return [
        QuizDraftOut(
            employeeId=r.employee_id,
            source=r.source,
            tagKey=r.tag_key,
            moduleKey=r.module_key,
            answeredCount=r.answered_count,
            currentIndex=r.current_index,
            totalCount=r.total_count,
            updatedAt=r.updated_at.isoformat(),
        )
        for r in rows
    ]


@draft_router.put("")
def upsert_draft(
    body: QuizDraftIn,
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> dict:
    row = (
        db.query(QuizDraft)
        .filter(
            QuizDraft.employee_id == employee.id,
            QuizDraft.source == body.source,
            QuizDraft.tag_key == body.tagKey,
            QuizDraft.module_key == body.moduleKey,
        )
        .first()
    )
    if row:
        row.answered_count = body.answeredCount
        row.current_index = body.currentIndex
        row.total_count = body.totalCount
    else:
        row = QuizDraft(
            employee_id=employee.id,
            source=body.source,
            tag_key=body.tagKey,
            module_key=body.moduleKey,
            answered_count=body.answeredCount,
            current_index=body.currentIndex,
            total_count=body.totalCount,
        )
        db.add(row)
    db.commit()
    return {"message": "ok"}


@draft_router.delete("")
def clear_draft(
    source: str,
    tagKey: str,
    moduleKey: str,
    employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
) -> dict:
    db.query(QuizDraft).filter(
        QuizDraft.employee_id == employee.id,
        QuizDraft.source == source,
        QuizDraft.tag_key == tagKey,
        QuizDraft.module_key == moduleKey,
    ).delete()
    db.commit()
    return {"message": "ok"}
