"""
Database dependency
"""

from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from app.database import async_engine

#### Database dependency ####
async_session = async_sessionmaker(
    bind=async_engine, class_=AsyncSession, expire_on_commit=False
)


async def get_db() -> AsyncGenerator:
    """
    Gets the database session
    """

    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()


dbDep = Annotated[AsyncSession, Depends(get_db)]  # pylint: disable=invalid-name
