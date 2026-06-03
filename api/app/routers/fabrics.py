from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Fabric
from app.schemas.content import FabricOut
from app.services.mappers import fabric_to_out

router = APIRouter(prefix="/fabrics", tags=["fabrics"])


@router.get("", response_model=list[FabricOut])
def list_fabrics(db: Session = Depends(get_db)) -> list[FabricOut]:
    return [fabric_to_out(f) for f in db.query(Fabric).order_by(Fabric.id).all()]


@router.get("/{fabric_id}", response_model=FabricOut)
def get_fabric(fabric_id: int, db: Session = Depends(get_db)) -> FabricOut:
    f = db.get(Fabric, fabric_id)
    if not f:
        raise HTTPException(status_code=404, detail="面料不存在")
    return fabric_to_out(f)
