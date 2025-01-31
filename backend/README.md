# Story Deck Tracker Backend
This is the backend for the Story Deck Tracker project. It is a RESTful API built with fastapi leveraging, SQLAlchemy, Pydantic, and Alembic.

## Setup

### Prerequisites

If you haven't already, you will need to install the following:

- A Local PostgreSQL Database
  - You can install PostgreSQL locally for development. You can download it from the [official website](https://www.postgresql.org/download/) or use [Postgres.app](https://postgresapp.com) for macOS.

### 1. Clone the repository

```bash
git clone https://github.com/Ebj8/story_deck_tracker.git
```

### 2. Add the .env file

Create a `.env` file in the `backend` directory with the following environment variables:

```bash
touch backend/.env
```

```bash
DATABASE_URL="localhost"
DATABASE_USERNAME="johnsone"
DATABASE_PASSWORD=""
DATABASE_NAME="local_sd_tracker"
ENVIRONMENT="dev"
FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099"
```

Here is an example `.env` file. You can copy this and modify the database credentials to match your local database. Namely, the `DATABASE_USERNAME`, `DATABASE_PASSWORD`, and `DATABASE_NAME` fields.

### 3. Install uv

uv is a package manager for python that can handle setting up development environments and manageing dependencies.

Install uv, if you haven't already:

[uv Installation](https://docs.astral.sh/uv/getting-started/installation/)

For Mac, you can use brew:

```bash
brew install uv
```

### 4. Install the dependencies

Using uv, install the dependencies:

```bash
cd backend  # Ensure you work from the backend directory
uv sync     # Sync environments and installs dependencies in pyproject.toml and uv.lock
```

Note: You may have to configure the interpreter path in your IDE to point to the virtual environment created by uv.
You can do so by entering the path: `backend/.venv/bin/python` in the interpreter path. Then open a new terminal.

You may also need to follow these troubleshooting tips:

https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#troubleshooting

Additionally, you may need to set the environment variables in your .zshrc or preferred terminal profile.


To add install new dependencies and add them to the `backend/pyproject.toml` file, run:

```bash
uv add <package-name>
```

To remove a dependency, run:

```bash
uv remove <package-name>
```

## Adding Tables to the database

We use Alembic to manage database migrations such as creating a new table, adding columns, or modifying existing columns. To create a new migration, set your working directory to `backend/app` then run:

```bash
alembic revision -m "<migration-description>"
```

This will create a new migration file in the `alembic/versions` directory. You can then add the necessary changes to the database schema in the `upgrade()` and `downgrade()` functions in the migration file. Please review existing migration files for examples in the `alembic/versions` directory.

Note: You need to create database tables and schema before writing routes for those models.

## Adding New Routes

### 1. Create a SQLAlchemy Model for the route based on a table in the database

Create a new file in the `backend/app/models` directory for the new model. The model should inherit from the `Base` class in `backend/app/db/base.py`.

By inheriting from the `Base` class, the model will inheret the `created_at`, `updated_at`, `created_by_id`, and `updated_by_id` columns.

### 2. Add the SQLAlchemy Model to the models init file

Add the new model to the `backend/app/models/__init__.py` file.

### 3. Create a Pydantic Model for the route

Create a new file in the `backend/app/schemas` directory paying close attention to the naming convention so that it matches the model from step 1.

### 4. Create CRUD functions for the new Model

Create a new file in the `backend/app/crud` directory for the new model. The file should contain functions for creating, reading, updating, and deleting records from the database.

### 5. Create routes for the new model

Create a new file in the `backend/app/api/routes` directory for the new model. The file should contain the route definitions for the new model.

### 6. Add the new route to the main API router

Add the new route to the `backend/app/api/main.py` file.