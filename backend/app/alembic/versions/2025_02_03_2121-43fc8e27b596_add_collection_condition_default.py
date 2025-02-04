# pylint: skip-file
"""add collection condition default

Revision ID: 43fc8e27b596
Revises: 55cabb1eb191
Create Date: 2025-02-03 21:21:02.177434

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "43fc8e27b596"
down_revision: Union[str, None] = "55cabb1eb191"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column("collection", "condition", server_default="NM")
    op.alter_column("user", "user_id", autoincrement=False)


def downgrade() -> None:
    op.alter_column("user", "user_id", autoincrement=True)
    op.alter_column("collection", "condition", server_default=None)
