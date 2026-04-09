from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.session import get_db
from models.models import Repayment, Scholarship, Student, Transaction
from schemas.common import (
    CreditScoreResponse,
    DashboardResponse,
    GraduationStatusResponse,
    RepaymentCreate,
    RepaymentResponse,
    ScholarshipApplyRequest,
    ScholarshipResponse,
    StudentDetail,
    StudentListItem,
    TransactionCreate,
    TransactionResponse,
)
from services.credit_scoring import calculate_credit_profile
from services.dashboard import build_dashboard
from services.graduation import get_graduation_status
from services.repayment import apply_repayment
from services.scholarship import apply_scholarship
from services.transactions import evaluate_transaction

router = APIRouter(prefix="/students", tags=["students"])


def get_student_or_404(db: Session, student_id: str) -> Student:
    student = db.query(Student).filter(Student.student_id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.get("", response_model=list[StudentListItem])
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).order_by(Student.full_name).all()


@router.get("/{student_id}", response_model=StudentDetail)
def get_student(student_id: str, db: Session = Depends(get_db)):
    return get_student_or_404(db, student_id)


@router.get("/{student_id}/dashboard", response_model=DashboardResponse)
def get_dashboard(student_id: str, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return {"student": student, **build_dashboard(student)}


@router.get("/{student_id}/transactions", response_model=list[TransactionResponse])
def get_transactions(student_id: str, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return sorted(student.transactions, key=lambda item: item.date, reverse=True)


@router.post("/{student_id}/transactions", response_model=TransactionResponse)
def create_transaction(student_id: str, payload: TransactionCreate, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    transaction = Transaction(student_id=student.id, **payload.model_dump())
    evaluation = evaluate_transaction(student, transaction)
    for key, value in evaluation.items():
        setattr(transaction, key, value)
    db.add(transaction)
    db.add(student)
    db.commit()
    db.refresh(transaction)
    return transaction


@router.get("/{student_id}/repayments", response_model=list[RepaymentResponse])
def get_repayments(student_id: str, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return sorted(student.repayments, key=lambda item: item.date, reverse=True)


@router.post("/{student_id}/repayments", response_model=RepaymentResponse)
def create_repayment(student_id: str, payload: RepaymentCreate, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    repayment = Repayment(student_id=student.id, **payload.model_dump())
    apply_repayment(student, repayment)
    db.add(repayment)
    db.add(student)
    db.commit()
    db.refresh(repayment)
    return repayment


@router.get("/{student_id}/scholarships", response_model=list[ScholarshipResponse])
def get_scholarships(student_id: str, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return sorted(student.scholarships, key=lambda item: item.disbursement_date, reverse=True)


@router.post("/{student_id}/apply-scholarship")
def post_apply_scholarship(student_id: str, payload: ScholarshipApplyRequest, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    scholarship = (
        db.query(Scholarship)
        .filter(Scholarship.id == payload.scholarship_id, Scholarship.student_id == student.id)
        .first()
    )
    if not scholarship:
        raise HTTPException(status_code=404, detail="Scholarship not found")
    result = apply_scholarship(student, scholarship)
    db.add(student)
    db.add(scholarship)
    db.commit()
    return result


@router.get("/{student_id}/credit-score", response_model=CreditScoreResponse)
def get_credit_score(student_id: str, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return calculate_credit_profile(student)


@router.get("/{student_id}/graduation-status", response_model=GraduationStatusResponse)
def get_graduation_status_endpoint(student_id: str, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return get_graduation_status(student)
