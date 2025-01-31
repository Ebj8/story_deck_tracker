"""
SQLAlchemy model for the artist table
"""

from .base import Base
from typing import Optional
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)


class Artist(Base):
    # Keys + Fields
    artist_id: Mapped[int] = mapped_column(primary_key=True)
    artist_first: Mapped[str]
    artist_last: Mapped[Optional[str]]
