"""
Set Collection routes
"""

from fastapi import APIRouter
from app.schemas.collection import (
    CollectionCreate,
    CollectionRead,
    CollectionCounts,
    CollectionSimpleRead,
)
from app.api.deps.db import dbDep
from app.crud import collection as collection_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=CollectionSimpleRead)
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
@router.get("/{user_id}", response_model=list[CollectionRead])
async def get_collection(user_id: str, db: dbDep):
    """
    Route to get a user's entire collection.
    """

    try:
        collection = await collection_crud.get_collection(db, user_id)
    except Exception as e:
        raise e

    return collection


@router.get("/count/{user_id}", response_model=list[CollectionCounts])
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


@router.get("/{user_id}/{card_id}", response_model=list[CollectionRead])
async def get_collection_card(user_id: str, card_id: int, db: dbDep):
    """
    Route to get a specific row in a user's collection.
    """

    try:
        collection_row = await collection_crud.get_collection_card(db, user_id, card_id)
    except Exception as e:
        raise e

    return collection_row


### UPDATE ###
@router.put("/", response_model=CollectionSimpleRead)
async def update_collection_row(collection_row: CollectionCreate, db: dbDep):
    """
    Route to update a user's collection row.
    """

    try:
        db_collection_row = await collection_crud.update_collection_row(
            db, collection_row
        )
    except Exception as e:
        raise e

    return db_collection_row
