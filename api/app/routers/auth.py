from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth_utils import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_employee,
    verify_password,
)
from jose import JWTError
from app.database import get_db
from app.models import AuthCredential, Employee
from app.schemas.auth import EmployeeOut, LoginIn, LoginOut, RefreshIn, RefreshOut
from app.services.mappers import employee_to_out

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginOut)
def login(body: LoginIn, db: Session = Depends(get_db)) -> LoginOut:
    username = body.username.strip()
    cred = (
        db.query(AuthCredential)
        .filter(AuthCredential.enabled.is_(True))
        .filter(AuthCredential.username.ilike(username))
        .first()
    )
    if not cred or not verify_password(body.password, cred.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="手机号/工号或密码错误，或账号未开通",
        )
    employee = db.get(Employee, cred.employee_id)
    if not employee:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户不存在")
    return LoginOut(
        accessToken=create_access_token(employee.id, cred.username),
        refreshToken=create_refresh_token(employee.id, cred.username),
        user=employee_to_out(employee),
    )


@router.post("/refresh", response_model=RefreshOut)
def refresh_token(body: RefreshIn, db: Session = Depends(get_db)) -> RefreshOut:
    try:
        payload = decode_token(body.refreshToken.strip())
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="无效刷新令牌")
        employee_id = int(payload["sub"])
        username = payload.get("username", "")
    except (JWTError, KeyError, ValueError) as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="无效刷新令牌") from exc

    employee = db.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户不存在")
    return RefreshOut(
        accessToken=create_access_token(employee.id, username),
        refreshToken=create_refresh_token(employee.id, username),
    )


@router.get("/me", response_model=EmployeeOut)
def me(employee: Employee = Depends(get_current_employee)) -> EmployeeOut:
    return employee_to_out(employee)


@router.post("/logout")
def logout() -> dict:
    return {"message": "ok"}
