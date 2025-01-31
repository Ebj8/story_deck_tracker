"""
Artist Lookup routes
"""

from fastapi import APIRouter
from app.schemas.artist_lookup import ArtistLookupCreate, ArtistLookupRead
from app.api.deps.db import dbDep
from app.crud import artist_lookup as artist_lookup_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=ArtistLookupRead)
async def create_artist_lookup(artist: ArtistLookupCreate, db: dbDep):
    """
    Route to create a new artist lookup row.
    """

    try:
        db_artist_lookup = await artist_lookup_crud.create_artist_lookup(db, artist)
    except Exception as e:
        raise e

    # Return the new patient
    return db_artist_lookup
