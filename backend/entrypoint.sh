#!/bin/sh

# Run Alembic migrations
alembic upgrade head
if [ $? -ne 0 ]; then
    echo "Migrations failed"
    exit 1
fi


# Start the FastAPI app
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}
