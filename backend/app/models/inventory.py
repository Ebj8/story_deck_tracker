"""
SQLAlchemy models for the whole inventory system

Inventory is now referred to as collection throughout the app
"""

from .base import Base
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)


class User(Base):
    # Keys + Fields
    user_id: Mapped[str] = mapped_column(primary_key=True)
    user_first: Mapped[str]
    user_last: Mapped[Optional[str]]
    email: Mapped[str]
    is_admin: Mapped[bool] = mapped_column(server_default="false")
    is_active: Mapped[bool] = mapped_column(server_default="true")


class Catalog(Base):
    # Keys + Fields
    card_id: Mapped[int] = mapped_column(primary_key=True)
    set_id: Mapped[int] = mapped_column(ForeignKey("set.set_id"))
    collector_number: Mapped[str]
    is_variant: Mapped[bool] = mapped_column(server_default="false")
    img_front_url: Mapped[Optional[str]]
    img_back_url: Mapped[Optional[str]]

    # Relationships
    # artist_lookup: Mapped[List["ArtistLookup"]] = relationship(back_populates="catalog")


class Artist(Base):
    # Keys + Fields
    artist_id: Mapped[int] = mapped_column(primary_key=True)
    artist_first: Mapped[str]
    artist_last: Mapped[Optional[str]]


class ArtistLookup(Base):
    # Keys + Fields
    card_id: Mapped[int] = mapped_column(
        ForeignKey("catalog.card_id"), primary_key=True
    )
    artist_id: Mapped[int] = mapped_column(
        ForeignKey("artist.artist_id"), primary_key=True
    )

    # Relationships
    # artist: Mapped[Artist] = relationship(back_populates="artist_lookup")
    # catalog: Mapped[Catalog] = relationship(back_populates="artist_lookup")


class Author(Base):
    # Keys + Fields
    author_id: Mapped[int] = mapped_column(primary_key=True)
    author_first: Mapped[str]
    author_last: Mapped[Optional[str]]


class AuthorLookup(Base):
    # Keys + Fields
    set_id: Mapped[int] = mapped_column(ForeignKey("set.set_id"), primary_key=True)
    author_id: Mapped[int] = mapped_column(
        ForeignKey("author.author_id"), primary_key=True
    )

    # Relationships
    # author: Mapped[Author] = relationship(back_populates="author_sets")
    # catalog: Mapped[Catalog] = relationship(back_populates="set_authors")


class Set(Base):
    # Keys + Fields
    set_id: Mapped[int] = mapped_column(primary_key=True)
    set_name: Mapped[str]
    release_year: Mapped[int]

    # Relationships
    # catalog: Mapped[List[Catalog]] = relationship(back_populates="cards")
    # author_lookup: Mapped[List[AuthorLookup]] = relationship(
    #     back_populates="set_authors"
    # )


class Collection(Base):
    # Keys + Fields
    user_id: Mapped[str] = mapped_column(ForeignKey("user.user_id"))
    card_id: Mapped[int] = mapped_column(ForeignKey("catalog.card_id"))
    qty: Mapped[int]
    is_foil: Mapped[bool] = mapped_column(server_default="false")
    condition: Mapped[str]
    transaction_id: Mapped[int] = mapped_column(primary_key=True)

    # Relationships
    # user: Mapped[User] = relationship(back_populates="collection")
