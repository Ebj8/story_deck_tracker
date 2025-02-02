# pylint: skip-file
"""changing user_id to a uuid

Revision ID: 55cabb1eb191
Revises: ded169f311db
Create Date: 2025-02-02 11:41:56.293925

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "55cabb1eb191"
down_revision: Union[str, None] = "ded169f311db"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Drop foreign key constraints
    op.drop_constraint("author_created_by_id_fkey", "author", type_="foreignkey")
    op.drop_constraint("author_updated_by_id_fkey", "author", type_="foreignkey")
    op.drop_constraint(
        "author_lookup_created_by_id_fkey", "author_lookup", type_="foreignkey"
    )
    op.drop_constraint(
        "author_lookup_updated_by_id_fkey", "author_lookup", type_="foreignkey"
    )
    op.drop_constraint("artist_created_by_id_fkey", "artist", type_="foreignkey")
    op.drop_constraint("artist_updated_by_id_fkey", "artist", type_="foreignkey")
    op.drop_constraint(
        "artist_lookup_created_by_id_fkey", "artist_lookup", type_="foreignkey"
    )
    op.drop_constraint(
        "artist_lookup_updated_by_id_fkey", "artist_lookup", type_="foreignkey"
    )
    op.drop_constraint("catalog_created_by_id_fkey", "catalog", type_="foreignkey")
    op.drop_constraint("catalog_updated_by_id_fkey", "catalog", type_="foreignkey")
    op.drop_constraint(
        "collection_created_by_id_fkey", "collection", type_="foreignkey"
    )
    op.drop_constraint(
        "collection_updated_by_id_fkey", "collection", type_="foreignkey"
    )
    op.drop_constraint("collection_user_id_fkey", "collection", type_="foreignkey")
    op.drop_constraint("set_created_by_id_fkey", "set", type_="foreignkey")
    op.drop_constraint("set_updated_by_id_fkey", "set", type_="foreignkey")

    # Alter user_id column type to UUID (or String if not using UUIDs)
    op.alter_column("user", "user_id", type_=sa.String)
    op.alter_column("collection", "user_id", type_=sa.String)
    op.alter_column("user", "created_by_id", type_=sa.String)
    op.alter_column("user", "updated_by_id", type_=sa.String)
    op.alter_column("artist", "created_by_id", type_=sa.String)
    op.alter_column("artist", "updated_by_id", type_=sa.String)
    op.alter_column("artist_lookup", "created_by_id", type_=sa.String)
    op.alter_column("artist_lookup", "updated_by_id", type_=sa.String)
    op.alter_column("author", "created_by_id", type_=sa.String)
    op.alter_column("author", "updated_by_id", type_=sa.String)
    op.alter_column("author_lookup", "created_by_id", type_=sa.String)
    op.alter_column("author_lookup", "updated_by_id", type_=sa.String)
    op.alter_column("catalog", "created_by_id", type_=sa.String)
    op.alter_column("catalog", "updated_by_id", type_=sa.String)
    op.alter_column("collection", "created_by_id", type_=sa.String)
    op.alter_column("collection", "updated_by_id", type_=sa.String)
    op.alter_column("set", "created_by_id", type_=sa.String)
    op.alter_column("set", "updated_by_id", type_=sa.String)

    # Recreate the foreign key constraint
    op.create_foreign_key(
        "author_created_by_id_fkey",
        "author",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "author_updated_by_id_fkey",
        "author",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "author_lookup_created_by_id_fkey",
        "author_lookup",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "author_lookup_updated_by_id_fkey",
        "author_lookup",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_created_by_id_fkey",
        "artist",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_updated_by_id_fkey",
        "artist",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_lookup_created_by_id_fkey",
        "artist_lookup",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_lookup_updated_by_id_fkey",
        "artist_lookup",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "catalog_created_by_id_fkey",
        "catalog",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "catalog_updated_by_id_fkey",
        "catalog",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "collection_created_by_id_fkey",
        "collection",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "collection_updated_by_id_fkey",
        "collection",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "collection_user_id_fkey",
        "collection",
        "user",
        ["user_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "set_created_by_id_fkey",
        "set",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "set_updated_by_id_fkey",
        "set",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )


def downgrade():
    # Drop the new foreign key
    op.drop_constraint("author_created_by_id_fkey", "author", type_="foreignkey")
    op.drop_constraint("author_updated_by_id_fkey", "author", type_="foreignkey")
    op.drop_constraint(
        "author_lookup_created_by_id_fkey", "author_lookup", type_="foreignkey"
    )
    op.drop_constraint(
        "author_lookup_updated_by_id_fkey", "author_lookup", type_="foreignkey"
    )
    op.drop_constraint("artist_created_by_id_fkey", "artist", type_="foreignkey")
    op.drop_constraint("artist_updated_by_id_fkey", "artist", type_="foreignkey")
    op.drop_constraint(
        "artist_lookup_created_by_id_fkey", "artist_lookup", type_="foreignkey"
    )
    op.drop_constraint(
        "artist_lookup_updated_by_id_fkey", "artist_lookup", type_="foreignkey"
    )
    op.drop_constraint("catalog_created_by_id_fkey", "catalog", type_="foreignkey")
    op.drop_constraint("catalog_updated_by_id_fkey", "catalog", type_="foreignkey")
    op.drop_constraint(
        "collection_created_by_id_fkey", "collection", type_="foreignkey"
    )
    op.drop_constraint(
        "collection_updated_by_id_fkey", "collection", type_="foreignkey"
    )
    op.drop_constraint("collection_user_id_fkey", "collection", type_="foreignkey")
    op.drop_constraint("set_created_by_id_fkey", "set", type_="foreignkey")
    op.drop_constraint("set_updated_by_id_fkey", "set", type_="foreignkey")

    # Revert user_id column type back to INTEGER
    op.alter_column("user", "user_id", type_=sa.Integer)

    # Recreate the old foreign key constraint
    op.create_foreign_key(
        "author_created_by_id_fkey",
        "author",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "author_updated_by_id_fkey",
        "author",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "author_lookup_created_by_id_fkey",
        "author_lookup",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "author_lookup_updated_by_id_fkey",
        "author_lookup",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_created_by_id_fkey",
        "artist",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_updated_by_id_fkey",
        "artist",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_lookup_created_by_id_fkey",
        "artist_lookup",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "artist_lookup_updated_by_id_fkey",
        "artist_lookup",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "catalog_created_by_id_fkey",
        "catalog",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "catalog_updated_by_id_fkey",
        "catalog",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "collection_created_by_id_fkey",
        "collection",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "collection_updated_by_id_fkey",
        "collection",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "collection_user_id_fkey",
        "collection",
        "user",
        ["user_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "set_created_by_id_fkey",
        "set",
        "user",
        ["created_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "set_updated_by_id_fkey",
        "set",
        "user",
        ["updated_by_id"],
        ["user_id"],
        ondelete="CASCADE",
    )
