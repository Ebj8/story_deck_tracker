"""
CRUD operations for Collection route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from app.schemas.collection import CollectionCreate, CollectionUpdate
from app import models
from datetime import datetime


# Add a row of data to a user's collection
async def create_collection_row(db: AsyncSession, collection_row: CollectionCreate):
    """
    Create a new card entry to a user's collection in the database.
    """

    db_collection_row = models.Collection(
        **collection_row.model_dump(),
        # TODO: Replace with actual user id
        created_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
        updated_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
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
            func.sum(models.Collection.qty).label("qty"),  # Alias sum result
        )
        .where(models.Collection.user_id == user_id)
        .group_by(
            models.Collection.user_id,  # Include user_id in the GROUP BY
            models.Collection.card_id,
            models.Collection.is_foil,
        )
    )

    # Execute the query
    result = await db.execute(collection_count_query)

    # Fetch results and convert to a list of dictionaries
    collection_counts = result.mappings().all()

    return collection_counts


# Edit a row in a user's collection
async def update_collection_row(db: AsyncSession, collection_row: CollectionUpdate):
    """
    Update a card entry in a user's collection in the database.
    """

    # Get the existing collection row
    existing_collection_row = (
        await db.execute(
            select(models.Collection).where(
                models.Collection.user_id == collection_row.user_id,
                models.Collection.card_id == collection_row.card_id,
                models.Collection.is_foil == collection_row.is_foil,
                models.Collection.condition == collection_row.condition,
            )
        )
    ).scalar_one()

    # Update the existing collection row
    existing_collection_row.qty = collection_row.qty
    existing_collection_row.updated_by_id = collection_row.updated_by_id
    existing_collection_row.updated_at = datetime.now()

    await db.commit()
    return existing_collection_row
