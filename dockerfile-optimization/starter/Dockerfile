FROM python:3.12-slim
# latest tag is a red flag for production setups.
# latest also uses a full python image, we should be fine with a smaller one.

# Installing unncessary packages.
# No clean up of the apt-get cache.
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
&& rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

RUN addgroup --system appuser && adduser --system --ingroup appuser appuser
USER appuser

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
