#!/bin/sh

# No need to "activate" the environment; just rely on PATH
echo "Alembic location: $(which alembic)"
echo "Uvicorn location: $(which uvicorn)"

# Run Alembic migrations
alembic upgrade head
if [ $? -ne 0 ]; then
    echo "Migrations failed"
    exit 1
fi

# Start the FastAPI app
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}
