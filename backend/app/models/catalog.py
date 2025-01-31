"""
SQLAlchemy model for the catalog table
"""

from .base import Base
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)


class Catalog(Base):
    # Keys + Fields
    catalog_id: Mapped[int] = mapped_column(primary_key=True)
    set_id: Mapped[int] = mapped_column(ForeignKey(set.set_id))
    collector_number: Mapped[str]
    is_variant: Mapped[bool] = mapped_column(server_default="false")
    img_front_url: Mapped[Optional[str]]
    img_back_url: Mapped[Optional[str]]
