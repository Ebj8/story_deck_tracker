"""
CRUD operations for Author route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.author import AuthorCreate
from app import models


# Create Author
async def create_author(db: AsyncSession, author: AuthorCreate):
    """
    Create a new author in the database.
    """

    db_author = models.Author(
        **author.model_dump(),
        created_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
        updated_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
    )

    # Create patient in database
    db.add(db_author)

    await db.commit()
    return db_author
