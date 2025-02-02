"""
Artist pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class ArtistBase(BaseModel):
    artist_first: str
    artist_last: str


class ArtistCreate(ArtistBase):
    pass


class ArtistRead(ArtistBase):
    artist_id: int
    created_by_id: str
    updated_by_id: str
    created_at: datetime
    updated_at: datetime
