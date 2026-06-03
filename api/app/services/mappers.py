from app.models import Document, Employee, Fabric, NewsItem, Product, StoreAlbum
from app.schemas.auth import EmployeeOut
from app.schemas.content import DocumentOut, FabricOut, NewsOut, ProductOut, StoreAlbumOut, StoreImageOut
from app.storage import get_storage


def employee_to_out(emp: Employee) -> EmployeeOut:
    extra = emp.extra or {}
    return EmployeeOut(
        id=emp.id,
        employeeNo=emp.employee_no,
        name=emp.name,
        gender=emp.gender,
        store=emp.store,
        department=emp.department,
        jobPosition=emp.job_position,
        primaryMobile=emp.primary_mobile,
        avatarUrl=emp.avatar_url,
        status=emp.status,
        role=emp.role,
        extra=extra,
    )


def product_to_out(p: Product) -> ProductOut:
    c = p.content or {}
    return ProductOut(
        id=p.id,
        productCode=p.product_code,
        name=p.name,
        season=c.get("season", ""),
        color=c.get("color", ""),
        series=c.get("series", ""),
        fitType=c.get("fitType", ""),
        collarType=c.get("collarType", ""),
        shoulderType=c.get("shoulderType", ""),
        silhouette=c.get("silhouette", ""),
        hemType=c.get("hemType", ""),
        fabricComposition=c.get("fabricComposition", ""),
        fabricDesc=c.get("fabricDesc", ""),
        craftSellingPoint=c.get("craftSellingPoint", ""),
        fabricCareNotes=c.get("fabricCareNotes", ""),
        suitableScenes=c.get("suitableScenes", ""),
        imageUrl=c.get("imageUrl", ""),
    )


def fabric_to_out(f: Fabric) -> FabricOut:
    c = f.content or {}
    return FabricOut(
        id=f.id,
        fabricCode=f.fabric_code,
        fabricName=f.fabric_name,
        category=f.category,
        summary=c.get("summary", ""),
        techBackground=c.get("techBackground", ""),
        coreFeatures=c.get("coreFeatures", ""),
        salesScripts=c.get("salesScripts", []),
        competitorComparison=c.get("competitorComparison", ""),
        qaObjections=c.get("qaObjections", []),
        practicalTraining=c.get("practicalTraining", []),
        afterSales=c.get("afterSales", ""),
        quizzes=c.get("quizzes", ""),
        status=c.get("status", 1),
    )


def document_to_out(doc: Document) -> DocumentOut:
    storage = get_storage()
    file_url = ""
    if doc.file and doc.file.storage_key:
        file_url = storage.get_public_url(doc.file.storage_key)
    elif doc.filename:
        file_url = storage.get_public_url(f"training/{doc.filename}")
    return DocumentOut(
        id=doc.id,
        tab=doc.tab,
        title=doc.title,
        description=doc.description,
        filename=doc.filename,
        fileType=doc.file_type,
        fileSize=doc.file_size,
        category=doc.category,
        tags=doc.tags or [],
        fileUrl=file_url,
    )


def news_to_out(n: NewsItem) -> NewsOut:
    c = n.content or {}
    storage = get_storage()
    cover = c.get("coverImage", "")
    if n.file_id and hasattr(n, "file") and n.file:
        cover = storage.get_public_url(n.file.storage_key)
    elif cover.startswith("/"):
        cover = storage.get_public_url(cover.lstrip("/"))
    return NewsOut(
        id=n.id,
        title=n.title,
        author=c.get("author", ""),
        publishTime=c.get("publishTime", ""),
        tag=c.get("tag", ""),
        tagColor=c.get("tagColor", ""),
        pinned=c.get("pinned", False),
        coverImage=cover,
        summary=c.get("summary", ""),
        content=c.get("content", ""),
        viewCount=n.view_count,
        views=n.view_count,
    )


def album_to_out(album: StoreAlbum) -> StoreAlbumOut:
    storage = get_storage()
    cover = storage.get_public_url(album.cover_storage_key) if album.cover_storage_key else ""
    images = [
        StoreImageOut(src=storage.get_public_url(img.storage_key), caption=img.caption)
        for img in sorted(album.images, key=lambda x: x.sort_order)
    ]
    date_str = ""
    if album.album_date:
        date_str = album.album_date.strftime("%Y-%m-%d")
    return StoreAlbumOut(
        id=album.id,
        title=album.title,
        location=album.location,
        date=date_str,
        description=album.description,
        coverImage=cover or (images[0].src if images else ""),
        category=album.category,
        tags=album.tags or [],
        images=images,
    )
