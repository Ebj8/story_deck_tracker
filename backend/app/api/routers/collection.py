"""
Set Collection routes
"""

from fastapi import APIRouter
from app.schemas.collection import CollectionCreate, CollectionRead
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
