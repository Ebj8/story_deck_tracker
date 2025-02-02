"""
CRUD operations for Set route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.set import SetCreate
from app import models


# Add a new set to the database
async def create_set(db: AsyncSession, set: SetCreate):
    """
    Create a new set in the database.
    """

    db_set = models.Set(
        **set.model_dump(),
        # TODO: Replace with actual user id
        created_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
        updated_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
    )

    # Create patient in database
    db.add(db_set)

    await db.commit()
    return db_set
