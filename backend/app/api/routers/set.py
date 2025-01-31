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
