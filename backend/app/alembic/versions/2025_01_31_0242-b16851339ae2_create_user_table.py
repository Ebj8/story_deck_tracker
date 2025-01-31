# pylint: skip-file
"""create user table

Revision ID: b16851339ae2
Revises:
Create Date: 2025-01-31 02:42:32.232137

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b16851339ae2"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "user",
        sa.Column("user_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("user_first", sa.String(255), nullable=False),
        sa.Column("user_last", sa.String(255)),
        sa.Column("email", sa.String(255), nullable=False, unique=True),
        sa.Column("is_admin", sa.Boolean, server_default=sa.text("false")),
        sa.Column("is_active", sa.Boolean, server_default=sa.text("true")),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime, server_default=sa.text("now()"), nullable=False
        ),
        sa.Column("created_by_id", sa.Integer, server_default="1"),
        sa.Column("updated_by_id", sa.Integer, server_default="1"),
    )


def downgrade() -> None:
    op.drop_table("user")
