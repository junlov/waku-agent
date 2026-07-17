FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    WAKU_DASHBOARD_HOST=0.0.0.0 \
    WAKU_DASHBOARD_PORT=7777 \
    WAKU_HOME=/var/lib/waku/.waku \
    WAKU_ENV_FILE=/var/lib/waku/.env \
    WAKU_PROVIDER=sim \
    WAKU_SANDBOX=1 \
    WAKU_SEED=/seed \
    WAKU_WORKSPACE=/workspace \
    WAKU_RUNTIME=/var/lib/waku

WORKDIR /seed

RUN apt-get update \
    && apt-get install -y --no-install-recommends git make \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml README.md ./
COPY waku ./waku
COPY evals ./evals
COPY scale ./scale
COPY scripts ./scripts
COPY docs ./docs
COPY .waku-build/waku-training.bundle /seed/waku-training.bundle
COPY .waku-build/waku-training.bundle.json /seed/waku-training.bundle.json

RUN python -m pip install --no-cache-dir '.[dev,mcp]'

EXPOSE 7777

CMD ["python", "/seed/scripts/sandbox_supervisor.py"]
