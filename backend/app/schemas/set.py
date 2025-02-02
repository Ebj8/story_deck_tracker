"""
Set pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class SetBase(BaseModel):
    set_name: str
    release_year: int


class SetCreate(SetBase):
    pass


class SetRead(SetBase):
    set_id: int
    created_by_id: str
    updated_by_id: str
    created_at: datetime
    updated_at: datetime
