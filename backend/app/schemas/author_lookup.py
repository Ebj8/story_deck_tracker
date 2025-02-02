"""
Author Lookup pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class AuthorLookupBase(BaseModel):
    author_id: int
    set_id: int


class AuthorLookupCreate(AuthorLookupBase):
    pass


class AuthorLookupRead(AuthorLookupBase):
    created_by_id: str
    updated_by_id: str
    created_at: datetime
    updated_at: datetime
