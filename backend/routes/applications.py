from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.session import get_db
from models.models import CreditApplication
from schemas.common import CreditApplicationCreate, CreditApplicationResponse

router = APIRouter(tags=["applications"])


@router.post("/applications", response_model=CreditApplicationResponse)
def create_application(payload: CreditApplicationCreate, db: Session = Depends(get_db)):
    existing = (
        db.query(CreditApplication)
        .filter(CreditApplication.student_number == payload.student_number)
        .first()
    )
    if existing:
        raise HTTPException(status_code=409, detail="An application for this student number already exists")

    application = CreditApplication(
        **payload.model_dump(),
        status="Pending University Review",
        submitted_on=date.today(),
        review_notes="Submitted to university financial office for institutional verification.",
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.get("/admin/applications", response_model=list[CreditApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    return db.query(CreditApplication).order_by(CreditApplication.submitted_on.desc()).all()
