from typing import Dict, List

from models.models import Student

from services.credit_scoring import calculate_credit_profile


def get_graduation_status(student: Student) -> Dict:
    credit = calculate_credit_profile(student)
    criteria: List[Dict] = [
        {
            "label": "At least 2 semesters of repayment history",
            "met": student.semesters_in_program >= 2,
        },
        {
            "label": "Internal trust score above 75",
            "met": credit["trust_score"] >= 75,
        },
        {
            "label": "Repayment consistency above 80",
            "met": student.repayment_consistency_score >= 80,
        },
        {
            "label": "Responsible utilization under 65%",
            "met": (student.used_credit / student.current_credit_limit) <= 0.65 if student.current_credit_limit else False,
        },
        {
            "label": "Academic stability maintained",
            "met": student.gpa >= 3.0 and student.attendance_percentage >= 85,
        },
    ]
    score = round(sum(20 for criterion in criteria if criterion["met"]), 1)
    if score >= 80:
        status = "Eligible"
        summary = "Eligible for external reporting consideration and a larger post-graduation credit pathway."
    elif score >= 50:
        status = "Progressing"
        summary = "The student is building a credible internal record but still needs another positive term."
    else:
        status = "Not Ready"
        summary = "Core repayment or academic stability signals need improvement before graduation readiness."
    return {
        "eligibility_score": score,
        "status": status,
        "criteria": criteria,
        "summary": summary,
    }
