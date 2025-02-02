"""
Catalog pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class CatalogCard(BaseModel):
    set_id: int
    collector_number: str
    is_variant: bool = False
    img_front_url: str | None = None
    img_back_url: str | None = None


class CatalogCardCreate(CatalogCard):
    pass


class CatalogCardRead(CatalogCardCreate):
    card_id: int
    created_at: datetime
    updated_at: datetime
    created_by_id: str
    updated_by_id: str
