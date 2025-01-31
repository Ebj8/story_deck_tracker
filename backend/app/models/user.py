"""
SQLAlchemy model for the user table
"""

from .base import Base
from typing import Optional
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)


class User(Base):
    # Keys + Fields
    user_id: Mapped[int] = mapped_column(primary_key=True)
    user_first: Mapped[str]
    user_last: Mapped[Optional[str]]
    email: Mapped[str]
    is_admin: Mapped[bool] = mapped_column(server_default="false")
    is_active: Mapped[bool] = mapped_column(server_default="true")
