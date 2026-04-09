from typing import List

from models.models import Student


def generate_insights(student: Student, essential_spend: float, non_essential_spend: float, flagged_count: int) -> List[str]:
    insights: List[str] = []
    if essential_spend >= non_essential_spend:
        insights.append("Your spending is concentrated in essential academic and living needs.")
    else:
        insights.append("Non-essential spending is overtaking academic spending and may reduce future credit access.")
    utilization = student.used_credit / student.current_credit_limit if student.current_credit_limit else 0
    if utilization < 0.5:
        insights.append("Credit utilization remains in a healthy range for trust score growth.")
    elif utilization > 0.8:
        insights.append("High utilization is increasing portfolio risk and limiting near-term credit expansion.")
    if student.repayment_consistency_score >= 80:
        insights.append("Repayment consistency is actively strengthening your internal financial identity.")
    if flagged_count:
        insights.append("Frequent flagged purchase attempts may trigger admin review and tighter controls.")
    return insights
