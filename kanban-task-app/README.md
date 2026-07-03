# Simple Kanban Task App

A small web-based Kanban task tracker that runs in a single Docker container.

## Features

- Add tasks
- Update task title, description, and status
- Delete tasks
- Drag tasks between To do, Doing, and Done columns
- Persistent SQLite database stored in a Docker volume

## Run with Docker Compose

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8000
```

## Run with Docker only

```bash
docker build -t simple-kanban .
docker volume create kanban-data
docker run -d --name simple-kanban -p 8000:8000 -v kanban-data:/data simple-kanban
```

Then open:

```text
http://localhost:8000
```

## Stop and remove

```bash
docker compose down
```

To also delete all saved tasks:

```bash
docker compose down -v
```
