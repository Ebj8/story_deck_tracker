"""
Collection pydantic schemas
"""

from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.catalog import CatalogCardComplexRead


class CollectionBase(BaseModel):
    """
    Base schema for collection items.
    This schema is used for both creation and update operations.
    """

    user_id: str
    card_id: int
    qty: int
    is_foil: bool = False
    condition: str = Field("NM", max_length=2)


class CollectionCreate(CollectionBase):
    """
    Schema for creating a new collection item.
    """

    created_by_id: str = "BIaW6HRoJqORtgtGWtNTr9vtwKl2"
    updated_by_id: str = "BIaW6HRoJqORtgtGWtNTr9vtwKl2"


class CollectionUpdate(CollectionBase):
    """
    Schema for updating an existing collection item.
    """

    updated_by_id: str = "BIaW6HRoJqORtgtGWtNTr9vtwKl2"


class CollectionSimpleRead(CollectionBase):
    """
    Schema for reading a collection item with minimal details.
    """

    created_at: datetime
    updated_at: datetime
    created_by_id: str
    updated_by_id: str


class CollectionRead(CollectionSimpleRead):
    """
    Schema for reading a collection item with detailed card information.
    """

    catalog: CatalogCardComplexRead


class CollectionCounts(BaseModel):
    """
    Schema for counting collection items.
    """

    user_id: str
    card_id: int
    is_foil: bool
    qty: int
