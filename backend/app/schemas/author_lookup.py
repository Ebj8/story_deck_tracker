"""
Author Lookup pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class AuthorLookupBase(BaseModel):
    author_id: int
    card_id: int


class AuthorCreate(AuthorLookupBase):
    pass


class AuthorRead(AuthorLookupBase):
    created_by_id: int
    updated_by_id: int
    created_at: datetime
    updated_at: datetime
