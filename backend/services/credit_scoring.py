from datetime import date
from typing import Dict, List

from models.models import CreditLimitHistory, Student

FACTOR_WEIGHTS = {
    "gpa": 0.30,
    "attendance": 0.20,
    "academic_trend": 0.10,
    "engagement": 0.10,
    "repayment": 0.20,
    "spending": 0.10,
}


def _normalize_gpa(gpa: float) -> float:
    return max(0, min(100, (gpa / 4.0) * 100))


def calculate_credit_profile(student: Student) -> Dict:
    factor_breakdown = {
        "gpa": round(_normalize_gpa(student.gpa) * FACTOR_WEIGHTS["gpa"], 2),
        "attendance": round(student.attendance_percentage * FACTOR_WEIGHTS["attendance"], 2),
        "academic_trend": round(student.academic_trend_score * FACTOR_WEIGHTS["academic_trend"], 2),
        "engagement": round(
            ((student.club_participation_score + student.leadership_score + student.campus_engagement_score) / 3)
            * FACTOR_WEIGHTS["engagement"],
            2,
        ),
        "repayment": round(student.repayment_consistency_score * FACTOR_WEIGHTS["repayment"], 2),
        "spending": round(student.spending_behavior_score * FACTOR_WEIGHTS["spending"], 2),
    }
    trust_score = round(sum(factor_breakdown.values()), 1)
    recommended_credit_limit = max(300, min(2500, round(300 + trust_score * 22, -1)))
    if trust_score >= 80:
        risk_level = "Low"
    elif trust_score >= 60:
        risk_level = "Medium"
    else:
        risk_level = "High"

    explanation: List[str] = []
    if student.gpa >= 3.5:
        explanation.append("High GPA is materially increasing internal trust.")
    elif student.gpa < 2.7:
        explanation.append("GPA is below the preferred threshold and is constraining the limit.")
    if student.attendance_percentage >= 92:
        explanation.append("Attendance reliability supports predictable semester repayment behavior.")
    elif student.attendance_percentage < 80:
        explanation.append("Attendance volatility elevates repayment and academic continuity risk.")
    if student.repayment_consistency_score >= 80:
        explanation.append("Consistent repayment history justifies stronger credit access.")
    elif student.repayment_consistency_score < 60:
        explanation.append("Repayment inconsistency is pulling the limit downward.")
    if student.spending_behavior_score < 60:
        explanation.append("Recent non-essential or risky spending is depressing spending responsibility.")
    if not explanation:
        explanation.append("Balanced academic and financial signals support the assigned credit band.")

    return {
        "trust_score": trust_score,
        "risk_level": risk_level,
        "recommended_credit_limit": recommended_credit_limit,
        "explanation": explanation,
        "factor_breakdown": factor_breakdown,
    }


def refresh_student_credit(student: Student, reason: str) -> Dict:
    profile = calculate_credit_profile(student)
    previous_limit = student.current_credit_limit
    new_limit = profile["recommended_credit_limit"]
    student.internal_trust_score = profile["trust_score"]
    student.graduation_eligibility_score = min(100, round((profile["trust_score"] * 0.6) + (student.repayment_consistency_score * 0.4), 1))
    student.current_credit_limit = new_limit
    student.available_credit = round(max(0, new_limit - student.used_credit), 2)
    if previous_limit != new_limit:
        delta = round(new_limit - previous_limit, 2)
        student.last_limit_change_reason = reason
        student.credit_limit_history.append(
            CreditLimitHistory(
                change_date=date.today(),
                previous_limit=previous_limit,
                new_limit=new_limit,
                delta=delta,
                reason=reason,
            )
        )
    return profile
