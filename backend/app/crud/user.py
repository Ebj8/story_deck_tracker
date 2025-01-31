"""
CRUD operations for User route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserCreate
from app import models


# Create User
async def create_user(db: AsyncSession, user: UserCreate):
    """
    Create a new user in the database.
    """

    db_user = models.User(
        **user.model_dump(),
        created_by_id=1,
        updated_by_id=1,
    )

    # Create patient in database
    db.add(db_user)

    await db.commit()
    db.refresh(db_user)
    return db_user
