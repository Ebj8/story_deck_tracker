"""
User routes
"""

from fastapi import APIRouter
from app.schemas.user import UserCreate, UserRead
from app.api.deps.db import dbDep
from app.crud import user as user_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=UserRead)
async def create_user(user: UserCreate, db: dbDep):
    """
    Route to create a new user.
    """

    try:
        # Create a user in the database
        db_user = await user_crud.create_user(db, user)
    except Exception as e:
        raise e

    # Return the new patient
    return db_user


### READ ###
@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: str, db: dbDep):
    """
    Route to get a single user based on their user_id.
    """

    try:
        # Get the user from the database
        db_user = await user_crud.get_user(db, user_id)
    except Exception as e:
        raise e

    # Return the user
    return db_user
