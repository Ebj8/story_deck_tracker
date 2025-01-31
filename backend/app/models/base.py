from datetime import datetime
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncAttrs
from pydantic.alias_generators import to_snake
from sqlalchemy import (
    TIMESTAMP,
    ForeignKey,
    func,
)
from sqlalchemy.orm import (
    Mapped,
    DeclarativeBase,
    mapped_column,
    declared_attr,
)


class Base(AsyncAttrs, DeclarativeBase):
    """
    Base class for all models.

    This class sets the table name to the snake case version of the class name.
    See https://docs.sqlalchemy.org/en/20/orm/declarative_mixins.html
    and `Using Mixins and Base Classes with Mapped Inheritance Patterns`

    This table also sets default audit fields for all other tables.
    """

    @declared_attr.directive
    def __tablename__(cls) -> Optional[str]:  # pylint: disable=no-self-argument
        return to_snake(cls.__name__)

    # This removes warning for func.now()
    # pylint: disable=not-callable

    # Keys + Fields
    # is_deleted: Mapped[bool] = mapped_column(server_default="false")
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
    created_by_id: Mapped[int] = mapped_column(ForeignKey("user.user_id"))
    updated_by_id: Mapped[int] = mapped_column(ForeignKey("user.user_id"))

    # This overrides the default __repr__ method to print the class name and attributes
    def __repr__(self):
        attributes = ", ".join(
            f"{k}={v!r}" for k, v in self.__dict__.items() if not k.startswith("_")
        )
        return f"<{self.__class__.__name__}({attributes})>"
