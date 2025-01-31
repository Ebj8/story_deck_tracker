from fastapi import FastAPI
from app.schemas.catalog import CatalogCard

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/catalog")
async def create_catalog_card(card: CatalogCard):
    return card
