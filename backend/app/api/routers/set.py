"""
Set routes
"""

from fastapi import APIRouter
from app.schemas.set import SetCreate, SetRead
from app.api.deps.db import dbDep
from app.crud import set as set_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=SetRead)
async def create_set(set: SetCreate, db: dbDep):
    """
    Route to create a new set.
    """

    try:
        # Create a new set in the database
        db_set = await set_crud.create_set(db, set)
    except Exception as e:
        raise e

    # Return the new patient
    return db_set


### READ ###
@router.get("/", response_model=list[SetRead])
async def get_sets(db: dbDep):
    """
    Route to get all sets.
    """

    try:
        # Get all sets from the database
        db_sets = await set_crud.get_sets(db)
    except Exception as e:
        raise e

    # Return the sets
    return db_sets
