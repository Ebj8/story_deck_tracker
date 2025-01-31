"""
Author Lookup routes
"""

from fastapi import APIRouter
from app.schemas.author_lookup import AuthorLookupCreate, AuthorLookupRead
from app.api.deps.db import dbDep
from app.crud import author_lookup as author_lookup_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=AuthorLookupRead)
async def create_author_lookup(artist: AuthorLookupCreate, db: dbDep):
    """
    Route to create a new author lookup row.
    """

    try:
        db_author_lookup = await author_lookup_crud.create_author_lookup(db, artist)
    except Exception as e:
        raise e

    # Return the new patient
    return db_author_lookup
