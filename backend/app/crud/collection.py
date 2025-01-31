"""
CRUD operations for Collection route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.collection import CollectionCreate
from app import models


# Add a row of data to a user's collection
async def create_collection_row(db: AsyncSession, collection_row: CollectionCreate):
    """
    Create a new card entry to a user's collection in the database.
    """

    db_collection_row = models.Collection(
        **collection_row.model_dump(),
        # TODO: Replace with actual user id
        created_by_id=1,
        updated_by_id=1,
    )

    # Create patient in database
    db.add(db_collection_row)

    await db.commit()
    return db_collection_row
