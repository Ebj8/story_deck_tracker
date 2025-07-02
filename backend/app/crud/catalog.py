"""
CRUD operations for Catalog route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload, selectinload
from app.schemas.catalog import CatalogCardCreate
from app import models


# Create a card in the Catalog
async def create_catalog_card(db: AsyncSession, catalog_card: CatalogCardCreate):
    """
    Create a new card in the catalog in the database.
    """

    db_catalog_card = models.Catalog(
        **catalog_card.model_dump(),
        # TODO: Replace with actual user id
        created_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
        updated_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
    )

    # Create patient in database
    db.add(db_catalog_card)

    await db.commit()
    return db_catalog_card


# Get all cards in the Catalog
async def get_catalog_cards(db: AsyncSession):
    """
    Get all cards in the catalog from the database.
    """
    result = await db.execute(
        select(models.Catalog)
        .order_by(models.Catalog.set_id, models.Catalog.collector_number)
        .options(
            joinedload(models.Catalog.set), selectinload(models.Catalog.artist_lookup)
        )
    )
    return result.scalars().all()
