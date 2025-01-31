"""
Config file for loading environment variables with pydantic_settings
from environment variables
"""

from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

from .enums import EnvironmentEnum

# Load environment variables
load_dotenv(override=True)


class Settings(BaseSettings):
    """
    Class for loading environment variables
    """

    epay_key: str = Field(min_length=1)
    epay_pin: str = Field(min_length=4)
    shipengine_api_key: str = Field(min_length=1)
    database_url: str = Field(min_length=1)
    database_username: str = Field(min_length=1)
    database_password: str
    database_port: int = 5432
    database_name: str = Field(min_length=1)
    environment: EnvironmentEnum

    model_config = SettingsConfigDict()


@lru_cache
def get_settings() -> Settings:
    """Retrieves and caches the fastapi settings"""
    return Settings()  # type: ignore


# Get settings
settings = get_settings()

# Database connection string
DB_CONNECTION_STR = (
    f"postgresql+asyncpg://{settings.database_username}:"
    f"{settings.database_password}@"
    f"{settings.database_url}:"
    f"{settings.database_port}/"
    f"{settings.database_name}"
)
