"""
Author pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class AuthorBase(BaseModel):
    author_first: str
    author_last: str


class AuthorCreate(AuthorBase):
    pass


class AuthorRead(AuthorBase):
    author_id: int
    created_by_id: int
    updated_by_id: int
    created_at: datetime
    updated_at: datetime
