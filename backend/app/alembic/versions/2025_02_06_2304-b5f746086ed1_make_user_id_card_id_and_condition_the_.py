# pylint: skip-file
"""
make user_id, card_id, is_foil, and condition the primary keys instead of
transaction_id on collection table

Revision ID: b5f746086ed1
Revises: 43fc8e27b596
Create Date: 2025-02-06 23:04:07.508042

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b5f746086ed1"
down_revision: Union[str, None] = "43fc8e27b596"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_constraint("collection_pkey", "collection")
    op.create_primary_key(
        "collection_pkey", "collection", ["user_id", "card_id", "condition", "is_foil"]
    )
    op.drop_column("collection", "transaction_id")


def downgrade() -> None:
    op.add_column(
        "collection",
        sa.Column("transaction_id", sa.INTEGER(), autoincrement=True, nullable=False),
    )
    op.drop_constraint("collection_pkey", "collection")
    op.create_primary_key("collection_pkey", "collection", ["transaction_id"])
