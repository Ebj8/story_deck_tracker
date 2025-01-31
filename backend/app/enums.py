"""
Types used in models and schemas.

These are mostly enums.
"""

from enum import Enum


class EnvironmentEnum(str, Enum):
    """
    EnvironmentEnum class
    """

    DEV = "dev"
    STAGING = "staging"
    PROD = "prod"
