"""
CRUD operations for User route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserCreate
from sqlalchemy.future import select
from app import models


# Create User
async def create_user(db: AsyncSession, user: UserCreate):
    """
    Create a new user in the database.
    """

    db_user = models.User(
        **user.model_dump(),
        created_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
        updated_by_id="P1gqYa5HGaAGNzX2MhN0gBADq6eC",
    )

    # Create patient in database
    db.add(db_user)

    await db.commit()
    db.refresh(db_user)
    return db_user


# Get a single user based on their user_id
async def get_user(db: AsyncSession, user_id: str):
    """
    Get a single user based on their user_id
    """

    user = await db.execute(select(models.User).filter(models.User.user_id == user_id))

    return user.scalar()
