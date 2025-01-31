# pylint: skip-file
"""
create author, author_lookup, set, catalog, artist, artist_lookup, & collection tables

Revision ID: 41b27714be9f
Revises: b16851339ae2
Create Date: 2025-01-31 03:20:33.075913

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "41b27714be9f"
down_revision: Union[str, None] = "b16851339ae2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "author",
        sa.Column("author_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("author_first", sa.String(255), nullable=False),
        sa.Column("author_last", sa.String(255)),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )

    op.create_table(
        "set",
        sa.Column("set_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("set_name", sa.String(255), nullable=False),
        sa.Column("release_year", sa.Integer),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )

    op.create_table(
        "author_lookup",
        sa.Column("set_id", sa.Integer, sa.ForeignKey("set.set_id"), primary_key=True),
        sa.Column(
            "author_id", sa.Integer, sa.ForeignKey("author.author_id"), primary_key=True
        ),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )

    op.create_table(
        "catalog",
        sa.Column("card_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("set_id", sa.Integer, sa.ForeignKey("set.set_id")),
        sa.Column("collector_number", sa.String(255), nullable=False),
        sa.Column("is_variant", sa.Boolean, server_default=sa.text("false")),
        sa.Column("img_front_url", sa.String(255)),
        sa.Column("img_back_url", sa.String(255)),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )

    op.create_table(
        "artist",
        sa.Column("artist_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("artist_first", sa.String(255), nullable=False),
        sa.Column("artist_last", sa.String(255)),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )

    op.create_table(
        "artist_lookup",
        sa.Column(
            "card_id", sa.Integer, sa.ForeignKey("catalog.card_id"), primary_key=True
        ),
        sa.Column(
            "artist_id", sa.Integer, sa.ForeignKey("artist.artist_id"), primary_key=True
        ),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )

    op.create_table(
        "collection",
        sa.Column(
            "user_id", sa.Integer, sa.ForeignKey("user.user_id"), primary_key=True
        ),
        sa.Column(
            "card_id", sa.Integer, sa.ForeignKey("catalog.card_id"), primary_key=True
        ),
        sa.Column("qty", sa.Integer, nullable=False),
        sa.Column("is_foil", sa.Boolean, server_default=sa.text("false")),
        sa.Column("condition", sa.String(2)),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "created_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
        sa.Column(
            "updated_by_id",
            sa.Integer,
            sa.ForeignKey("user.user_id"),
            server_default="1",
        ),
    )


def downgrade() -> None:
    op.drop_table("collection")
    op.drop_table("artist")
    op.drop_table("artist_lookup")
    op.drop_table("catalog")
    op.drop_table("set")
    op.drop_table("author_lookup")
    op.drop_table("author")
