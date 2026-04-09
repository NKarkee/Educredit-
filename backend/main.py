from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import admin, applications, students
from seed.seed_db import run_seed

app = FastAPI(title="EduCredit+ API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    run_seed()


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(students.router)
app.include_router(admin.router)
app.include_router(applications.router)
