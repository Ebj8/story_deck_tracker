"""
CRUD operations for Artist route
"""

from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.artist import ArtistCreate
from app import models


# Create Artist
async def create_artist(db: AsyncSession, artist: ArtistCreate):
    """
    Create a new artist in the database.
    """

    db_artist = models.Artist(
        **artist.model_dump(),
        # TODO: Replace with actual user id
        created_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
        updated_by_id="BIaW6HRoJqORtgtGWtNTr9vtwKl2",
    )

    # Create patient in database
    db.add(db_artist)

    await db.commit()
    return db_artist
