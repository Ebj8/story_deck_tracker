"""
FastAPI main application file

This file is the entry point for the FastAPI application.
"""

from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.exc import IntegrityError
from app.api.main import api_router
from .settings import settings
from .enums import EnvironmentEnum


# Lifespan Events
def custom_generate_unique_id(route: APIRoute):
    """
    Custom function to generate id for each route
    Note: FastAPI function route names must be unique
    This makes it nice for the frontend/docs
    """
    return f"{route.name}"


# Doc urls based on environment
docs_url = "/docs" if settings.environment == EnvironmentEnum.DEV else None
redoc_url = "/redoc" if settings.environment == EnvironmentEnum.DEV else None

# Initialize FastAPI application
app = FastAPI(
    generate_unique_id_function=custom_generate_unique_id,
    docs_url=docs_url,
    redoc_url=redoc_url,
)


# Origins based on environment
ORIGINS = {
    EnvironmentEnum.DEV: [
        "http://localhost:5173",
    ],
    EnvironmentEnum.STAGING: [
        "https://staging.legrandehealth.app",
        "https://staging.legrandehealth.app/",
    ],
    EnvironmentEnum.PROD: [
        "https://legrandehealth.app",
    ],
}


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS[settings.environment],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(api_router, prefix="/api")

if settings.environment == EnvironmentEnum.DEV:
    # Root route
    @app.get("/", response_class=FileResponse)
    async def root():
        """
        Root route

        Displays the API documentation and database schema from dbdiagram.io
        """

        return FileResponse("index.html")


# Health check
@app.get("/health")
async def health():
    """
    Health check route
    """

    return {"status": "ok"}


# Exception handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    """
    Request validation exception handler
    """
    print(exc)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors()}),
    )


@app.exception_handler(IntegrityError)
async def http_exception_handler(_: Request, exc: IntegrityError):
    """
    HTTP exception handler
    """

    # If it isn't a unique violation error, return a 500
    if "UniqueViolationError" not in str(exc):
        print(exc)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=jsonable_encoder({"detail": "Internal server error"}),
        )

    # Otherwise, return a 409 with the error message
    try:
        error_str = exc.orig.args[0].split("\nDETAIL:  ")[1]  # type: ignore
    except:  # pylint: disable=bare-except # noqa
        error_str = str(exc)
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content=jsonable_encoder({"detail": error_str}),
    )
