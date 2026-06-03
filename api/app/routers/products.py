from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas.content import ProductOut
from app.services.mappers import product_to_out

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(
    q: str | None = None,
    season: str | None = None,
    series: str | None = None,
    color: str | None = None,
    db: Session = Depends(get_db),
) -> list[ProductOut]:
    items = db.query(Product).order_by(Product.id).all()
    result = [product_to_out(p) for p in items]
    if q:
        kw = q.strip().lower()
        result = [
            p
            for p in result
            if kw in p.productCode.lower()
            or kw in p.name.lower()
            or kw in p.fabricComposition.lower()
        ]
    if season:
        result = [p for p in result if p.season == season]
    if series:
        result = [p for p in result if p.series == series]
    if color:
        result = [p for p in result if p.color == color]
    return result


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)) -> ProductOut:
    p = db.get(Product, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="商品不存在")
    return product_to_out(p)
