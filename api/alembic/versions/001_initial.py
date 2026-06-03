"""initial schema

Revision ID: 001
Revises:
Create Date: 2026-06-03
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "employees",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("employee_no", sa.String(32), nullable=False),
        sa.Column("name", sa.String(64), nullable=False),
        sa.Column("gender", sa.String(16), server_default=""),
        sa.Column("store", sa.String(128), server_default=""),
        sa.Column("department", sa.String(128), server_default=""),
        sa.Column("job_position", sa.String(64), server_default=""),
        sa.Column("primary_mobile", sa.String(32), server_default=""),
        sa.Column("avatar_url", sa.String(512), server_default=""),
        sa.Column("status", sa.String(32), server_default="在职"),
        sa.Column("role", sa.String(32), server_default="staff"),
        sa.Column("extra", postgresql.JSONB(), server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("employee_no"),
    )
    op.create_index("ix_employees_employee_no", "employees", ["employee_no"])

    op.create_table(
        "auth_credentials",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("employee_id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(64), nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("enabled", sa.Boolean(), server_default="true"),
        sa.ForeignKeyConstraint(["employee_id"], ["employees.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("employee_id"),
        sa.UniqueConstraint("username"),
    )

    op.create_table(
        "files",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("storage_key", sa.String(512), nullable=False),
        sa.Column("original_name", sa.String(512), server_default=""),
        sa.Column("mime_type", sa.String(128), server_default="application/octet-stream"),
        sa.Column("size_bytes", sa.Integer(), server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("storage_key"),
    )

    op.create_table(
        "products",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("product_code", sa.String(64), nullable=False),
        sa.Column("name", sa.String(128), nullable=False),
        sa.Column("content", postgresql.JSONB(), server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "fabrics",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("fabric_code", sa.String(64), nullable=False),
        sa.Column("fabric_name", sa.String(128), nullable=False),
        sa.Column("category", sa.String(64), server_default=""),
        sa.Column("content", postgresql.JSONB(), server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "documents",
        sa.Column("id", sa.String(32), nullable=False),
        sa.Column("tab", sa.String(32), nullable=False),
        sa.Column("title", sa.String(256), nullable=False),
        sa.Column("description", sa.Text(), server_default=""),
        sa.Column("filename", sa.String(512), server_default=""),
        sa.Column("file_type", sa.String(16), server_default="pdf"),
        sa.Column("file_size", sa.String(32), server_default=""),
        sa.Column("category", sa.String(64), server_default=""),
        sa.Column("tags", postgresql.JSONB(), server_default="[]"),
        sa.Column("file_id", sa.Integer(), nullable=True),
        sa.Column("extra", postgresql.JSONB(), server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["file_id"], ["files.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "news",
        sa.Column("id", sa.String(32), nullable=False),
        sa.Column("title", sa.String(256), nullable=False),
        sa.Column("content", postgresql.JSONB(), server_default="{}"),
        sa.Column("view_count", sa.Integer(), server_default="0"),
        sa.Column("file_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["file_id"], ["files.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "store_albums",
        sa.Column("id", sa.String(64), nullable=False),
        sa.Column("title", sa.String(256), nullable=False),
        sa.Column("location", sa.String(128), server_default=""),
        sa.Column("description", sa.Text(), server_default=""),
        sa.Column("cover_storage_key", sa.String(512), server_default=""),
        sa.Column("category", sa.String(64), server_default=""),
        sa.Column("tags", postgresql.JSONB(), server_default="[]"),
        sa.Column("album_date", sa.DateTime(timezone=True), nullable=True),
        sa.Column("extra", postgresql.JSONB(), server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "store_album_images",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("album_id", sa.String(64), nullable=False),
        sa.Column("storage_key", sa.String(512), nullable=False),
        sa.Column("caption", sa.String(256), server_default=""),
        sa.Column("sort_order", sa.Integer(), server_default="0"),
        sa.ForeignKeyConstraint(["album_id"], ["store_albums.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "quiz_attempts",
        sa.Column("id", sa.String(128), nullable=False),
        sa.Column("employee_id", sa.Integer(), nullable=False),
        sa.Column("source", sa.String(16), nullable=False),
        sa.Column("tag_key", sa.String(64), nullable=False),
        sa.Column("tag_label", sa.String(128), nullable=False),
        sa.Column("module_key", sa.String(64), nullable=False),
        sa.Column("module_label", sa.String(128), nullable=False),
        sa.Column("correct_count", sa.Integer(), nullable=False),
        sa.Column("total_count", sa.Integer(), nullable=False),
        sa.Column("score_percent", sa.Integer(), nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["employee_id"], ["employees.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "quiz_drafts",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("employee_id", sa.Integer(), nullable=False),
        sa.Column("source", sa.String(16), nullable=False),
        sa.Column("tag_key", sa.String(64), nullable=False),
        sa.Column("module_key", sa.String(64), nullable=False),
        sa.Column("answered_count", sa.Integer(), server_default="0"),
        sa.Column("current_index", sa.Integer(), server_default="0"),
        sa.Column("total_count", sa.Integer(), server_default="0"),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["employee_id"], ["employees.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("employee_id", "source", "tag_key", "module_key"),
    )

    op.create_table(
        "recent_learning",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("employee_id", sa.Integer(), nullable=False),
        sa.Column("item_type", sa.String(16), nullable=False),
        sa.Column("item_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(256), nullable=False),
        sa.Column("subtitle", sa.String(256), server_default=""),
        sa.Column("viewed_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["employee_id"], ["employees.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("employee_id", "item_type", "item_id"),
    )

    op.create_table(
        "news_reads",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("employee_id", sa.Integer(), nullable=False),
        sa.Column("news_id", sa.String(32), nullable=False),
        sa.Column("read_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["employee_id"], ["employees.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("employee_id", "news_id"),
    )


def downgrade() -> None:
    for t in [
        "news_reads",
        "recent_learning",
        "quiz_drafts",
        "quiz_attempts",
        "store_album_images",
        "store_albums",
        "news",
        "documents",
        "fabrics",
        "products",
        "files",
        "auth_credentials",
        "employees",
    ]:
        op.drop_table(t)
