#!/bin/sh

# Run Alembic migrations
alembic upgrade head
if [ $? -ne 0 ]; then
    echo "Migrations failed"
    exit 1
fi


# Start the FastAPI app
fastapi run main.py --host 0.0.0.0 --port 8080
