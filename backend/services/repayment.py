from models.models import Repayment, Student
from services.credit_scoring import refresh_student_credit


def apply_repayment(student: Student, repayment: Repayment) -> None:
    student.used_credit = max(0, round(student.used_credit - repayment.amount, 2))
    student.available_credit = round(student.current_credit_limit - student.used_credit, 2)
    student.repayment_consistency_score = min(100, round(student.repayment_consistency_score + 1.5, 1))
    refresh_student_credit(student, f"+ dynamic limit review after repayment activity recorded on {repayment.date.isoformat()}")
