# Inspired by 
# - https://github.com/Swiple/swiple/blob/main/backend/Dockerfile
# - https://github.com/fastapi/full-stack-fastapi-template/blob/master/backend/Dockerfile
###############################################
# Base Image
###############################################
FROM python:3.12-slim AS python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PYSETUP_PATH="/code" \
    VENV_PATH="/code/.venv"

###############################################
# Builder Image
###############################################
FROM python-base AS builder-base

WORKDIR $PYSETUP_PATH

# Install uv
COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /uvx /bin/

# Compile bytecode
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#compiling-bytecode
ENV UV_COMPILE_BYTECODE=1

# uv Cache
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#caching
ENV UV_LINK_MODE=copy

# Install dependencies
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project


###############################################
# Production Image
###############################################
FROM python-base AS production

# https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#debian-11
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz-subset0 libjpeg-dev libopenjp2-7-dev libffi-dev && \
    apt clean && \
    rm -rf /var/cache/apt/*


# Place executables in the environment at the front of the path
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#using-the-environment
ENV PATH="$VENV_PATH/bin:$PATH"

COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH

# Copy the app
COPY app $PYSETUP_PATH/app

# Change to the directory where the app is
WORKDIR $PYSETUP_PATH/app

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make entrypoint script executable
RUN chmod +x /entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]