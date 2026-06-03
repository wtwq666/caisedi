"""Phase 8: minimal admin write APIs for content management."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth_utils import get_current_employee
from app.database import get_db
from app.models import Employee

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin(employee: Employee = Depends(get_current_employee)) -> Employee:
    if employee.role not in ("admin", "hq"):
        from fastapi import HTTPException

        raise HTTPException(status_code=403, detail="需要管理员权限")
    return employee


@router.get("/health")
def admin_health(_: Employee = Depends(require_admin)) -> dict:
    return {"status": "admin-ready"}
