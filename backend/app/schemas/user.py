"""
User pydantic schemas
"""

from datetime import datetime
from pydantic import BaseModel


class UserBase(BaseModel):
    """
    Base model for user schemas
    """

    user_id: str
    user_first: str
    user_last: str
    email: str


class UserCreate(UserBase):
    """
    Schema for creating a new user
    """

    is_admin: bool = False


class UserRead(UserBase):
    """
    Schema for reading user information
    """

    is_admin: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
    created_by_id: str
    updated_by_id: str
