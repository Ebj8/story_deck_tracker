"""
CRUD operations for Collection route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
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


# Get the total count of each card in a user's collection
async def get_collection_count(db: AsyncSession, user_id: int):
    """
    Get the total count of each card in a user's collection.
    """

    # Define the query
    collection_count_query = (
        select(
            models.Collection.user_id,
            models.Collection.card_id,
            models.Collection.is_foil,
            models.Collection.condition,
            func.sum(models.Collection.qty).label("qty"),  # Alias sum result
        )
        .where(models.Collection.user_id == user_id)
        .group_by(
            models.Collection.user_id,  # Include user_id in the GROUP BY
            models.Collection.card_id,
            models.Collection.is_foil,
            models.Collection.condition,
        )
    )

    # Execute the query
    result = await db.execute(collection_count_query)

    # Fetch results and convert to a list of dictionaries
    collection_counts = result.mappings().all()

    return collection_counts
