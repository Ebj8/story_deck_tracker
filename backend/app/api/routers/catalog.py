"""
Set Catalog routes
"""

from fastapi import APIRouter
from app.schemas.catalog import CatalogCardCreate, CatalogCardRead
from app.api.deps.db import dbDep
from app.crud import catalog as catalog_crud


router = APIRouter()


### CREATE ###
@router.post("/", response_model=CatalogCardRead)
async def create_catalog_card(catalog_card: CatalogCardCreate, db: dbDep):
    """
    Route to create a new card in the set catalog.
    """

    try:
        # Create a card in the catalog in the database
        db_catalog_card = await catalog_crud.create_catalog_card(db, catalog_card)
    except Exception as e:
        raise e

    # Return the new patient
    return db_catalog_card


### READ ###
@router.get("/", response_model=list[CatalogCardRead])
async def get_catalog_cards(db: dbDep):
    """
    Route to get all cards in the set catalog.
    """

    try:
        # Get all cards in the catalog from the database
        db_catalog_cards = await catalog_crud.get_catalog_cards(db)
    except Exception as e:
        raise e

    # Return all cards in the catalog
    return db_catalog_cards
