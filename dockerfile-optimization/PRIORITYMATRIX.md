# Dockerfile Priority Matrix

Context:

- Primary goals: improve build speed and reduce image size.
- Build time is currently a pain point.
- Runtime command can be changed to Gunicorn.
- Supporting files may be added, but should stay minimal.
- No OS-level packages are required at runtime.
- Secrets should be provided through runtime environment variables.
- Focus is limited to production-blocking issues for now.

| Priority | Issue | Impact | Fix | Why This Priority |
| --- | --- | --- | --- | --- |
| P1 | `FROM python:latest` | Unpredictable builds, large image, and possible unexpected Python/runtime changes. | Use a pinned slim base image such as `python:3.12-slim`. | High impact on image size and reliability; easy to fix. |
| P1 | Unnecessary OS packages: `curl`, `git`, `vim`, `build-essential` | Bloats the runtime image and increases the attack surface. | Remove the `apt-get install` block entirely. | No runtime OS packages are needed, so this is avoidable weight. |
| P1 | Flask development server via `CMD ["python", "app.py"]` | Flask's built-in server is not production-grade for serving traffic. | Use Gunicorn: `CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]`. | Production runtime blocker; `gunicorn` is already available in `requirements.txt`. |
| P1 | Debug/development environment values baked into the image | Runs the production container with development/debug behavior. | Remove `FLASK_ENV=development` and `DEBUG=true`; pass runtime values only when needed. | Debug mode is unsafe for production. |
| P1 | Secret baked into the image | The secret is exposed in image layers and image history. | Remove `ENV SECRET_KEY=...`; inject secrets at runtime. | Production security blocker. |
| P2 | `COPY . .` before dependency installation | Any app code change invalidates the `pip install` cache. | Copy `requirements.txt` first, install dependencies, then copy app code. | Directly improves rebuild time. |
| P2 | Missing `.dockerignore` | Unnecessary files may be sent in the build context or accidentally copied into the image. | Add a small `.dockerignore` for local caches, virtual environments, Git metadata, logs, and local env files. | Improves build speed and reduces accidental inclusion. |
| P2 | Pip cache kept in the image | Leaves unnecessary package download/cache data in the final image. | Use `pip install --no-cache-dir -r requirements.txt`. | Easy image size reduction. |
| P2 | Container runs as root | If the app is compromised, the process has root privileges inside the container. | Create a non-root user and run the app with `USER appuser`. | Important production hardening with low implementation cost. |
| P2 | Missing Python runtime defaults | Logs may be buffered and `.pyc` files may be written at runtime. | Add `PYTHONUNBUFFERED=1` and `PYTHONDONTWRITEBYTECODE=1`. | Small reliability and container hygiene improvement. |

## Deferred Items

These are worthwhile, but not required for the current production-blocking build speed and image size pass:

- Multi-stage builds.
- Digest pinning.
- Dependency vulnerability upgrades.
- Docker `HEALTHCHECK`.
