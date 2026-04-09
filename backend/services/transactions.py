from typing import Dict

from models.models import Student, Transaction
from services.credit_scoring import refresh_student_credit

ALLOWED_CATEGORIES = {
    "books",
    "tuition-related expenses",
    "food",
    "housing",
    "transportation",
    "academic tools/software",
    "emergency expenses",
}
RISKY_CATEGORIES = {"gambling", "luxury", "high-risk merchants", "suspicious vendors"}
FLAGGED_VENDORS = {"Velvet Reserve", "Nightline Bets", "ShadowPay"}
BLOCKED_VENDORS = {"FastLuck Casino", "Ghost Wallet Exchange"}


def evaluate_transaction(student: Student, transaction: Transaction) -> Dict:
    reason = []
    approval_status = "Approved"
    flagged = False
    blocked = False
    essential = transaction.category in {
        "books",
        "tuition-related expenses",
        "housing",
        "transportation",
        "academic tools/software",
        "emergency expenses",
    }

    if transaction.merchant_name in BLOCKED_VENDORS or transaction.category in {"gambling", "suspicious vendors"}:
        blocked = True
        approval_status = "Blocked"
        reason.append("Merchant or category is outside university-backed credit policy.")
    elif transaction.merchant_name in FLAGGED_VENDORS or transaction.category in RISKY_CATEGORIES:
        flagged = True
        approval_status = "Flagged"
        reason.append("Transaction requires admin review due to elevated merchant/category risk.")
    elif transaction.category not in ALLOWED_CATEGORIES:
        flagged = True
        approval_status = "Flagged"
        reason.append("Category is not in the standard approved education spending list.")

    if transaction.amount > student.available_credit:
        blocked = True
        flagged = True
        approval_status = "Blocked"
        reason.append("Requested amount exceeds available internal credit.")

    if not blocked:
        student.used_credit = round(student.used_credit + transaction.amount, 2)
        student.available_credit = round(student.current_credit_limit - student.used_credit, 2)
        student.spending_behavior_score = max(
            35,
            round(student.spending_behavior_score - (4 if flagged else 0.5 if not essential else -0.5), 1),
        )
        refresh_student_credit(
            student,
            "Dynamic limit review after transaction behavior updated the spending responsibility profile.",
        )

    return {
        "approval_status": approval_status,
        "flagged": flagged,
        "blocked": blocked,
        "reason": " ".join(reason) or "Purchase fits current university-backed credit policy.",
        "essential": essential,
    }
