"""
CRUD operations for author Lookup route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.author_lookup import AuthorLookupCreate
from app import models


# Create Author Lookup
async def create_author_lookup(db: AsyncSession, author_lookup: AuthorLookupCreate):
    """
    Create a new author in the database.
    """

    db_author_lookup = models.AuthorLookup(
        **author_lookup.model_dump(),
        # TODO: Replace with actual user id
        created_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
        updated_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
    )

    # Create patient in database
    db.add(db_author_lookup)

    await db.commit()
    return db_author_lookup
