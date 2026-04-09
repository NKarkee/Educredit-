import os
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi import FastAPI  # noqa: E402

from main import app as backend_app  # noqa: E402
from seed.seed_db import run_seed  # noqa: E402

app = FastAPI()


@app.on_event("startup")
def startup() -> None:
    run_seed()


app.mount("/api", backend_app)
