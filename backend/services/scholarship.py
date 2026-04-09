from models.models import Scholarship, Student
from services.credit_scoring import refresh_student_credit


def apply_scholarship(student: Student, scholarship: Scholarship) -> dict:
    apply_amount = min(student.used_credit, scholarship.remaining_amount or scholarship.amount)
    student.used_credit = round(student.used_credit - apply_amount, 2)
    student.available_credit = round(student.current_credit_limit - student.used_credit, 2)
    scholarship.applied_to_balance = round(scholarship.applied_to_balance + apply_amount, 2)
    scholarship.remaining_amount = round((scholarship.remaining_amount or scholarship.amount) - apply_amount, 2)
    scholarship.status = "Applied" if scholarship.remaining_amount == 0 or student.used_credit == 0 else "Partially Applied"
    refresh_student_credit(
        student,
        f"Scholarship auto-pay improved exposure and triggered a credit review for {scholarship.name}.",
    )
    return {
        "scholarship_id": scholarship.id,
        "applied_amount": apply_amount,
        "remaining_scholarship": scholarship.remaining_amount,
        "post_payment_balance": student.used_credit,
        "processed_on": scholarship.disbursement_date,
    }
