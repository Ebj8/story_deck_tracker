# Base image
FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install uv (from Astral)
COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /uvx /bin/

# Copy the project into the image
COPY . /backend

# Sync the project into a new environment, asserting the lockfile is up to date
WORKDIR /backend
RUN uv sync --locked --no-dev

ENV PATH="/backend/.venv/bin:$PATH"

# Make entrypoint script executable
RUN chmod +x /backend/entrypoint.sh

ENTRYPOINT ["/backend/entrypoint.sh"]


