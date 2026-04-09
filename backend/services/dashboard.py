from collections import defaultdict
from typing import Dict, List

from models.models import Student
from services.credit_scoring import calculate_credit_profile
from services.graduation import get_graduation_status
from services.insights import generate_insights


def build_dashboard(student: Student) -> Dict:
    score = calculate_credit_profile(student)
    spending = defaultdict(float)
    essential_total = 0.0
    non_essential_total = 0.0
    flagged_count = 0
    for tx in student.transactions:
        if tx.approval_status == "Blocked":
            continue
        spending[tx.category] += tx.amount
        if tx.essential:
            essential_total += tx.amount
        else:
            non_essential_total += tx.amount
        if tx.flagged:
            flagged_count += 1

    spending_breakdown = [{"name": key, "value": round(value, 2)} for key, value in spending.items()]
    trust_score_trend = [
        {"period": history.change_date.strftime("%b %Y"), "limit": history.new_limit, "delta": history.delta}
        for history in sorted(student.credit_limit_history, key=lambda item: item.change_date)
    ]
    total_repayments = round(sum(item.amount for item in student.repayments), 2)
    scholarship_pending = next((s for s in sorted(student.scholarships, key=lambda x: x.disbursement_date) if s.status == "Scheduled"), None)
    graduation = get_graduation_status(student)

    alerts: List[str] = []
    if student.available_credit < 200:
        alerts.append("Available credit is running low ahead of the semester due date.")
    if flagged_count:
        alerts.append(f"{flagged_count} transaction(s) are flagged for review.")
    if scholarship_pending:
        alerts.append(f"Scholarship auto-pay scheduled for {scholarship_pending.disbursement_date.isoformat()}.")

    return {
        "score_breakdown": score,
        "spending_breakdown": spending_breakdown,
        "trust_score_trend": trust_score_trend,
        "alerts": alerts,
        "insights": generate_insights(student, essential_total, non_essential_total, flagged_count),
        "repayment_summary": {
            "amount_paid": total_repayments,
            "amount_remaining": round(student.used_credit, 2),
            "semester_due_date": student.semester_due_date,
            "progress": round((total_repayments / (total_repayments + student.used_credit)) * 100, 1)
            if total_repayments + student.used_credit
            else 0,
            "history": [
                {"date": repayment.date.isoformat(), "amount": repayment.amount, "source": repayment.source}
                for repayment in sorted(student.repayments, key=lambda item: item.date)
            ],
        },
        "scholarship_summary": {
            "pending_amount": scholarship_pending.amount if scholarship_pending else 0,
            "upcoming_disbursement_date": scholarship_pending.disbursement_date if scholarship_pending else None,
            "total_applied": round(sum(item.applied_to_balance for item in student.scholarships), 2),
            "remaining_after_autopay": scholarship_pending.remaining_amount if scholarship_pending else 0,
            "history": [
                {
                    "name": scholarship.name,
                    "amount": scholarship.amount,
                    "applied_to_balance": scholarship.applied_to_balance,
                    "remaining_amount": scholarship.remaining_amount,
                    "status": scholarship.status,
                }
                for scholarship in sorted(student.scholarships, key=lambda item: item.disbursement_date)
            ],
        },
        "graduation_status": graduation,
        "flagged_transactions": flagged_count,
    }
