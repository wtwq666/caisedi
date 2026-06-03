from pydantic import BaseModel


class LoginIn(BaseModel):
    username: str
    password: str


class EmployeeOut(BaseModel):
    id: int
    employeeNo: str
    name: str
    gender: str = ""
    store: str = ""
    department: str = ""
    jobPosition: str = ""
    primaryMobile: str = ""
    avatarUrl: str = ""
    status: str = ""
    role: str = "staff"
    extra: dict = {}

    model_config = {"from_attributes": True}


class LoginOut(BaseModel):
    accessToken: str
    refreshToken: str
    user: EmployeeOut


class RefreshIn(BaseModel):
    refreshToken: str


class RefreshOut(BaseModel):
    accessToken: str
    refreshToken: str
