"""
Collection pydantic schemas
"""

from pydantic import BaseModel, Field
from datetime import datetime


class CollectionBase(BaseModel):
    user_id: str
    card_id: int
    qty: int
    is_foil: bool = False
    condition: str = Field("NM", max_length=2)


class CollectionCreate(CollectionBase):
    pass


class CollectionRead(CollectionBase):
    created_by_id: str
    updated_by_id: str
    created_at: datetime
    updated_at: datetime
