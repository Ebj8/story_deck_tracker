#!/bin/sh

# Run Alembic migrations
alembic upgrade head
# Exit if migrations fail
if [ $? -ne 0 ]; then
    echo "Migrations failed"
    exit 1
fi

# Run the app
# Note: We don't want extra workers here because we are running multiple containers
fastapi run main.py --host 0.0.0.0 --port 8080