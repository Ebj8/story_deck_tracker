"""
Initializes the database connection
"""

from sqlalchemy.ext.asyncio import create_async_engine

from app.settings import DB_CONNECTION_STR


# Create an async engine
async_engine = create_async_engine(DB_CONNECTION_STR)
