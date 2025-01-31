"""
Catalog pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class CatalogCard(BaseModel):
    set_id: int
    collector_number: str
    is_variant: bool = False
    img_front_url: str
    img_back_url: str


class CreateCatalogCard(CatalogCard):
    created_by: str
    updated_by: str
    created_at: datetime


class ReadCatalogCard(CreateCatalogCard):
    id: int
