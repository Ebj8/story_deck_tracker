"""
Artist Lookup pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class ArtistLookupBase(BaseModel):
    artist_id: int
    card_id: int


class ArtistCreate(ArtistLookupBase):
    pass


class ArtistRead(ArtistLookupBase):
    created_by_id: int
    updated_by_id: int
    created_at: datetime
    updated_at: datetime
