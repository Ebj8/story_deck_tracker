"""
Collection pydantic schemas
"""

from pydantic import BaseModel, Field
from datetime import datetime


class CollectionBase(BaseModel):
    user_id: int
    card_id: int
    qty: int
    is_foil: bool
    condition: str = Field(..., max_length=2)


class CollectionCreate(CollectionBase):
    pass


class AuthorRead(CollectionBase):
    created_by_id: int
    updated_by_id: int
    created_at: datetime
    updated_at: datetime
