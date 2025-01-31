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
    id: int
    created_by: str
    updated_by: str
    created_at: datetime
    updated_at: datetime
