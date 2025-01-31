"""
Imports models so that all can be accessed through "app.models"
"""

from .base import Base
from .author import Author
from .user import User

__all__ = [
    "Base",
    "Author",
    "User",
]
