"""
CRUD operations for Set route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
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
        created_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
        updated_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
    )

    # Create patient in database
    db.add(db_set)

    await db.commit()
    return db_set


# Get all sets in the database
async def get_sets(db: AsyncSession):
    """
    Get all sets from the database.
    """
    result = await db.execute(select(models.Set).order_by(models.Set.set_name))
    return result.scalars().all()
