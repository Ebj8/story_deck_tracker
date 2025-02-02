"""
User pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class UserBase(BaseModel):
    user_first: str
    user_last: str
    email: str


class UserCreate(UserBase):
    is_admin: bool = False


class UserRead(UserBase):
    user_id: str
    is_admin: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
    created_by_id: str
    updated_by_id: str
