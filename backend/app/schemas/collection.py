"""
Collection pydantic schemas
"""

from pydantic import BaseModel, Field
from datetime import datetime
from .catalog import CatalogCardComplexRead


class CollectionBase(BaseModel):
    user_id: str
    card_id: int
    qty: int
    is_foil: bool = False
    condition: str = Field("NM", max_length=2)


class CollectionCreate(CollectionBase):
    created_by_id: str = "P1gqYa5HGaAGNzX2MhN0gBADq6eC"
    updated_by_id: str = "P1gqYa5HGaAGNzX2MhN0gBADq6eC"


class CollectionUpdate(CollectionBase):
    updated_by_id: str = "P1gqYa5HGaAGNzX2MhN0gBADq6eC"


class CollectionSimpleRead(CollectionBase):
    created_at: datetime
    updated_at: datetime
    created_by_id: str
    updated_by_id: str


class CollectionRead(CollectionSimpleRead):
    catalog: CatalogCardComplexRead


class CollectionCounts(BaseModel):
    user_id: str
    card_id: int
    is_foil: bool
    qty: int
