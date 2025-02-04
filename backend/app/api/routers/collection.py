"""
Set Collection routes
"""

from fastapi import APIRouter
from app.schemas.collection import CollectionCreate, CollectionRead, CollectionBase
from app.api.deps.db import dbDep
from app.crud import collection as collection_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=CollectionRead)
async def create_collection_row(collection_row: CollectionCreate, db: dbDep):
    """
    Route to create a new entry into a user's collection.
    """

    try:
        db_collection_row = await collection_crud.create_collection_row(
            db, collection_row
        )
    except Exception as e:
        raise e

    # Return the new patient
    return db_collection_row


### READ ###
@router.get("/{user_id}", response_model=list[CollectionBase])
async def get_collection_count(user_id: str, db: dbDep):
    """
    Route to get the total count of each card in a user's collection.

    The values returned are grouped on the card_id, is_foil, and condition columns.
    """

    try:
        collection_count = await collection_crud.get_collection_count(db, user_id)
    except Exception as e:
        raise e

    return collection_count
