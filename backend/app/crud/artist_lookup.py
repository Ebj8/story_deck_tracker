"""
CRUD operations for Artist Lookup route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.artist_lookup import ArtistLookupCreate
from app import models


# Create Artist Lookup
async def create_artist_lookup(db: AsyncSession, artist_lookup: ArtistLookupCreate):
    """
    Create a new artist in the database.
    """

    db_artist_lookup = models.ArtistLookup(
        **artist_lookup.model_dump(),
        # TODO: Replace with actual user id
        created_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
        updated_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
    )

    # Create patient in database
    db.add(db_artist_lookup)

    await db.commit()
    return db_artist_lookup
