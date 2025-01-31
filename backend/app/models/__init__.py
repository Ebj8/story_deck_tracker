"""
Imports models so that all can be accessed through "app.models"
"""

from .base import Base
from .inventory import (
    Artist,
    Author,
    User,
    ArtistLookup,
    Catalog,
    Set,
    AuthorLookup,
    Collection,
)

__all__ = [
    "Artist",
    "ArtistLookup",
    "Author",
    "AuthorLookup",
    "Base",
    "Catalog",
    "Collection",
    "Set",
    "User",
]
