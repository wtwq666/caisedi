from pydantic import BaseModel


class ProductOut(BaseModel):
    id: int
    productCode: str
    name: str
    season: str = ""
    color: str = ""
    series: str = ""
    fitType: str = ""
    collarType: str = ""
    shoulderType: str = ""
    silhouette: str = ""
    hemType: str = ""
    fabricComposition: str = ""
    fabricDesc: str = ""
    craftSellingPoint: str = ""
    fabricCareNotes: str = ""
    suitableScenes: str = ""
    imageUrl: str = ""


class FabricOut(BaseModel):
    id: int
    fabricCode: str
    fabricName: str
    category: str = ""
    summary: str = ""
    techBackground: str = ""
    coreFeatures: str = ""
    salesScripts: list = []
    competitorComparison: str = ""
    qaObjections: list = []
    practicalTraining: list = []
    afterSales: str = ""
    quizzes: str = ""
    status: int = 1


class DocumentOut(BaseModel):
    id: str
    title: str
    description: str = ""
    filename: str = ""
    fileType: str = "pdf"
    fileSize: str = ""
    category: str = ""
    tags: list[str] = []
    tab: str = ""
    fileUrl: str = ""


class NewsOut(BaseModel):
    id: str
    title: str
    author: str = ""
    publishTime: str = ""
    tag: str = ""
    tagColor: str = ""
    pinned: bool = False
    coverImage: str = ""
    summary: str = ""
    content: str = ""
    viewCount: int = 0
    views: int = 0


class StoreImageOut(BaseModel):
    src: str
    caption: str = ""


class StoreAlbumOut(BaseModel):
    id: str
    title: str
    location: str = ""
    date: str = ""
    description: str = ""
    coverImage: str = ""
    category: str = ""
    tags: list[str] = []
    images: list[StoreImageOut] = []


class ContentUpdateOut(BaseModel):
    id: str
    type: str
    action: str
    title: str
    subtitle: str | None = None
    dateLabel: str
    sortKey: int
    to: str
    state: dict | None = None


class SearchItemOut(BaseModel):
    id: str
    group: str
    title: str
    subtitle: str | None = None
    navigate: dict
