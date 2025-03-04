"""
Artist Lookup pydantic schemas
"""

from pydantic import BaseModel
from datetime import datetime


class ArtistLookupBase(BaseModel):
    artist_id: int
    card_id: int


class ArtistLookupCreate(ArtistLookupBase):
    pass


class ArtistLookupRead(ArtistLookupBase):
    created_by_id: str
    updated_by_id: str
    created_at: datetime
    updated_at: datetime
