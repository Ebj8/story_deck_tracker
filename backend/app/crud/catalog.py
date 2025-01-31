"""
CRUD operations for Catalog route
"""

from sqlalchemy.ext.asyncio import AsyncSession
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
        created_by_id=1,
        updated_by_id=1,
    )

    # Create patient in database
    db.add(db_catalog_card)

    await db.commit()
    return db_catalog_card
