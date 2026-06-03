from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id: Mapped[str] = mapped_column(String(128), primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), index=True)
    source: Mapped[str] = mapped_column(String(16))
    tag_key: Mapped[str] = mapped_column(String(64))
    tag_label: Mapped[str] = mapped_column(String(128))
    module_key: Mapped[str] = mapped_column(String(64))
    module_label: Mapped[str] = mapped_column(String(128))
    correct_count: Mapped[int] = mapped_column(Integer)
    total_count: Mapped[int] = mapped_column(Integer)
    score_percent: Mapped[int] = mapped_column(Integer)
    completed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))


class QuizDraft(Base):
    __tablename__ = "quiz_drafts"
    __table_args__ = (UniqueConstraint("employee_id", "source", "tag_key", "module_key"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), index=True)
    source: Mapped[str] = mapped_column(String(16))
    tag_key: Mapped[str] = mapped_column(String(64))
    module_key: Mapped[str] = mapped_column(String(64))
    answered_count: Mapped[int] = mapped_column(Integer, default=0)
    current_index: Mapped[int] = mapped_column(Integer, default=0)
    total_count: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class RecentLearning(Base):
    __tablename__ = "recent_learning"
    __table_args__ = (UniqueConstraint("employee_id", "item_type", "item_id"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), index=True)
    item_type: Mapped[str] = mapped_column(String(16))
    item_id: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(256))
    subtitle: Mapped[str] = mapped_column(String(256), default="")
    viewed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class NewsRead(Base):
    __tablename__ = "news_reads"
    __table_args__ = (UniqueConstraint("employee_id", "news_id"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"), index=True)
    news_id: Mapped[str] = mapped_column(String(32), index=True)
    read_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
