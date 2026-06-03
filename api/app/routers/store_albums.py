from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import StoreAlbum
from app.schemas.content import StoreAlbumOut
from app.services.mappers import album_to_out

router = APIRouter(prefix="/store-albums", tags=["store-albums"])


@router.get("", response_model=list[StoreAlbumOut])
def list_albums(db: Session = Depends(get_db)) -> list[StoreAlbumOut]:
    albums = (
        db.query(StoreAlbum)
        .options(joinedload(StoreAlbum.images))
        .order_by(StoreAlbum.updated_at.desc())
        .all()
    )
    return [album_to_out(a) for a in albums]


@router.get("/{album_id}", response_model=StoreAlbumOut)
def get_album(album_id: str, db: Session = Depends(get_db)) -> StoreAlbumOut:
    album = (
        db.query(StoreAlbum)
        .options(joinedload(StoreAlbum.images))
        .filter(StoreAlbum.id == album_id)
        .first()
    )
    if not album:
        raise HTTPException(status_code=404, detail="相册不存在")
    return album_to_out(album)
