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
        # Create patient in database
        db_user = await user_crud.create_user(db, user)
    except Exception as e:
        raise e

    # Return the new patient
    return db_user
