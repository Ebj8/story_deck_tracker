"""
Author routes
"""

from fastapi import APIRouter
from app.schemas.author import AuthorCreate, AuthorRead
from app.api.deps.db import dbDep
from app.crud import author as author_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=AuthorRead)
async def create_author(author: AuthorCreate, db: dbDep):
    """
    Route to create a new author.
    """

    try:
        # Create patient in database
        db_author = await author_crud.create_author(db, author)
    except Exception as e:
        raise e

    # Return the new patient
    return db_author
