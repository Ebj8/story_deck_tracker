# pylint: skip-file
"""change the collection table's primary key to an int

Revision ID: ded169f311db
Revises: 41b27714be9f
Create Date: 2025-01-31 07:55:14.760595

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ded169f311db"
down_revision: Union[str, None] = "41b27714be9f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_constraint("collection_pkey", "collection", type_="primary")
    op.execute("ALTER TABLE collection ADD COLUMN transaction_id SERIAL PRIMARY KEY")


def downgrade() -> None:
    op.drop_column("collection", "transaction_id")
    op.execute(
        "ALTER TABLE collection ADD CONSTRAINT collection_pkey PRIMARY KEY (user_id, card_id)"
    )
