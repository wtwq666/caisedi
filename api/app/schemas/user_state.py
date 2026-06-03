from pydantic import BaseModel


class QuizAttemptIn(BaseModel):
    source: str
    tagKey: str
    tagLabel: str
    moduleKey: str
    moduleLabel: str
    correctCount: int
    totalCount: int
    scorePercent: int


class QuizAttemptOut(QuizAttemptIn):
    id: str
    employeeId: int
    completedAt: str


class QuizDraftIn(BaseModel):
    source: str
    tagKey: str
    moduleKey: str
    answeredCount: int
    currentIndex: int
    totalCount: int


class QuizDraftOut(QuizDraftIn):
    employeeId: int
    updatedAt: str


class RecentLearningIn(BaseModel):
    type: str
    id: int
    title: str
    subtitle: str | None = None


class RecentLearningOut(RecentLearningIn):
    viewedAt: str


class NewsReadStatusOut(BaseModel):
    readIds: list[str]
    unreadCount: int
