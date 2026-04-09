from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.session import get_db
from models.models import Student, Transaction
from schemas.common import (
    AdminStudentRow,
    FlaggedTransactionResponse,
    GraduationCandidateResponse,
    LimitBreakdownResponse,
)
from services.credit_scoring import calculate_credit_profile
from services.graduation import get_graduation_status

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/students", response_model=list[AdminStudentRow])
def get_admin_students(db: Session = Depends(get_db)):
    rows = []
    for student in db.query(Student).order_by(Student.full_name).all():
        score = calculate_credit_profile(student)
        graduation = get_graduation_status(student)
        rows.append(
            {
                "student_id": student.student_id,
                "full_name": student.full_name,
                "gpa": student.gpa,
                "attendance_percentage": student.attendance_percentage,
                "trust_score": score["trust_score"],
                "credit_limit": student.current_credit_limit,
                "used_credit": student.used_credit,
                "risk_level": score["risk_level"],
                "flagged_transactions": len([tx for tx in student.transactions if tx.flagged]),
                "graduation_status": graduation["status"],
            }
        )
    return rows


@router.get("/flagged-transactions", response_model=list[FlaggedTransactionResponse])
def get_flagged_transactions(db: Session = Depends(get_db)):
    transactions = (
        db.query(Transaction, Student)
        .join(Student, Transaction.student_id == Student.id)
        .filter(Transaction.flagged.is_(True))
        .order_by(Transaction.date.desc())
        .all()
    )
    return [
        {
            "student_name": student.full_name,
            "student_id": student.student_id,
            "merchant_name": transaction.merchant_name,
            "amount": transaction.amount,
            "category": transaction.category,
            "approval_status": transaction.approval_status,
            "reason": transaction.reason,
            "date": transaction.date,
        }
        for transaction, student in transactions
    ]


@router.get("/credit-limit-breakdown/{student_id}", response_model=LimitBreakdownResponse)
def get_credit_limit_breakdown(student_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.student_id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    score = calculate_credit_profile(student)
    return {
        "student_id": student.student_id,
        "student_name": student.full_name,
        **score,
        "limit_history": [
            {
                "date": item.change_date.isoformat(),
                "previous_limit": item.previous_limit,
                "new_limit": item.new_limit,
                "delta": item.delta,
                "reason": item.reason,
            }
            for item in sorted(student.credit_limit_history, key=lambda record: record.change_date)
        ],
    }


@router.get("/graduation-candidates", response_model=list[GraduationCandidateResponse])
def get_graduation_candidates(db: Session = Depends(get_db)):
    candidates = []
    for student in db.query(Student).all():
        graduation = get_graduation_status(student)
        if graduation["status"] != "Not Ready":
            candidates.append(
                {
                    "student_id": student.student_id,
                    "full_name": student.full_name,
                    "eligibility_score": graduation["eligibility_score"],
                    "status": graduation["status"],
                    "semesters_in_program": student.semesters_in_program,
                    "trust_score": calculate_credit_profile(student)["trust_score"],
                }
            )
    return sorted(candidates, key=lambda item: item["eligibility_score"], reverse=True)
