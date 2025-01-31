"""
Main API router.

To add a new router, simply import it and then add it to the `routers` dictionary (the key should
be the name of the router, and the value should be the router itself).

The for loop will then include the router with the appropriate prefix and tags.
"""

from fastapi import APIRouter
from .routers import (
    author,
    author_lookup,
    user,
    artist,
    artist_lookup,
    catalog,
    set,
    collection,
)

api_router = APIRouter(responses={404: {"description": "Not found"}})

routers = {
    "artist": artist.router,
    "artist_lookup": artist_lookup.router,
    "author": author.router,
    "author_lookup": author_lookup.router,
    "catalog": catalog.router,
    "collection": collection.router,
    "set": set.router,
    "user": user.router,
}

# Include routers with permission checks
for router_name, router in routers.items():
    api_router.include_router(
        router,
        prefix=f"/{router_name}",
        tags=[router_name],
    )
