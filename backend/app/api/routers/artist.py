"""
Artist routes
"""

from fastapi import APIRouter
from app.schemas.artist import ArtistCreate, ArtistRead
from app.api.deps.db import dbDep
from app.crud import artist as artist_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=ArtistRead)
async def create_artist(artist: ArtistCreate, db: dbDep):
    """
    Route to create a new artist.
    """

    try:
        # Create artist in the database
        db_artist = await artist_crud.create_artist(db, artist)
    except Exception as e:
        raise e

    # Return the new patient
    return db_artist
