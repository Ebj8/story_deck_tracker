"""
SQLAlchemy model for the author table
"""

from .base import Base
from typing import Optional
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)


class Author(Base):
    # Keys + Fields
    author_id: Mapped[int] = mapped_column(primary_key=True)
    author_first: Mapped[str]
    author_last: Mapped[Optional[str]]
