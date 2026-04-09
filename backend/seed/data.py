from datetime import date

from models.models import CreditLimitHistory, GraduationRecord, Repayment, RiskEvent, Scholarship, Student, Transaction


def seed_students():
    return [
        Student(
            student_id="EDU1001",
            full_name="Ariana Patel",
            university_name="Midwest State University",
            major="Computer Science",
            class_year="Senior",
            gpa=3.86,
            attendance_percentage=96,
            academic_trend_score=91,
            club_participation_score=84,
            leadership_score=79,
            campus_engagement_score=88,
            scholarship_amount=2400,
            repayment_consistency_score=94,
            spending_behavior_score=90,
            internal_trust_score=89,
            current_credit_limit=2200,
            used_credit=680,
            available_credit=1520,
            semester_due_date=date(2026, 5, 18),
            graduation_eligibility_score=92,
            semesters_in_program=4,
            last_limit_change_reason="+$200 increase due to two semesters of on-time repayment and strong academic continuity.",
            transactions=[
                Transaction(merchant_name="Campus Bookstore", amount=240, category="books", date=date(2026, 1, 14), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
                Transaction(merchant_name="Uni Housing Office", amount=300, category="housing", date=date(2026, 2, 2), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
                Transaction(merchant_name="LabSoft", amount=140, category="academic tools/software", date=date(2026, 2, 15), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
            ],
            repayments=[
                Repayment(date=date(2025, 12, 20), amount=250, source="Bank Transfer", note="Winter term payment"),
                Repayment(date=date(2026, 2, 28), amount=200, source="Campus Payroll", note="Student assistant wages"),
            ],
            scholarships=[
                Scholarship(name="STEM Success Grant", amount=1200, disbursement_date=date(2026, 4, 10), applied_to_balance=0, remaining_amount=1200, status="Scheduled")
            ],
            credit_limit_history=[
                CreditLimitHistory(change_date=date(2025, 8, 20), previous_limit=1700, new_limit=1900, delta=200, reason="Strong fall term academic and repayment performance."),
                CreditLimitHistory(change_date=date(2026, 1, 12), previous_limit=1900, new_limit=2200, delta=300, reason="Consistent repayment and high utilization discipline."),
            ],
            risk_events=[
                RiskEvent(event_date=date(2025, 11, 15), severity="Low", title="Routine utilization review", description="Healthy utilization confirmed during semester review."),
            ],
            graduation_records=[
                GraduationRecord(evaluation_date=date(2026, 3, 1), status="Eligible", eligibility_score=92, notes="Strong candidate for external reporting consideration."),
            ],
        ),
        Student(
            student_id="EDU1002",
            full_name="Marcus Bennett",
            university_name="Midwest State University",
            major="Business Analytics",
            class_year="Junior",
            gpa=3.18,
            attendance_percentage=88,
            academic_trend_score=72,
            club_participation_score=55,
            leadership_score=40,
            campus_engagement_score=58,
            scholarship_amount=900,
            repayment_consistency_score=73,
            spending_behavior_score=71,
            internal_trust_score=72,
            current_credit_limit=1350,
            used_credit=740,
            available_credit=610,
            semester_due_date=date(2026, 5, 18),
            graduation_eligibility_score=64,
            semesters_in_program=3,
            last_limit_change_reason="+$100 increase following stable attendance and moderate repayment improvement.",
            transactions=[
                Transaction(merchant_name="Metro Transit", amount=85, category="transportation", date=date(2026, 1, 21), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
                Transaction(merchant_name="Campus Cafe", amount=120, category="food", date=date(2026, 2, 6), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=False),
                Transaction(merchant_name="Velvet Reserve", amount=190, category="luxury", date=date(2026, 2, 22), approval_status="Flagged", flagged=True, blocked=False, reason="Transaction requires admin review due to elevated merchant/category risk.", essential=False),
            ],
            repayments=[
                Repayment(date=date(2025, 12, 17), amount=160, source="Bank Transfer", note="Semester repayment"),
            ],
            scholarships=[
                Scholarship(name="Merit Continuation Award", amount=500, disbursement_date=date(2026, 4, 5), applied_to_balance=0, remaining_amount=500, status="Scheduled")
            ],
            credit_limit_history=[
                CreditLimitHistory(change_date=date(2025, 8, 20), previous_limit=1100, new_limit=1250, delta=150, reason="Improved attendance and academic trend."),
                CreditLimitHistory(change_date=date(2026, 1, 12), previous_limit=1250, new_limit=1350, delta=100, reason="Steadier repayment behavior."),
            ],
            risk_events=[
                RiskEvent(event_date=date(2026, 2, 22), severity="Medium", title="Flagged discretionary merchant", description="Admin review needed for non-essential purchase."),
            ],
            graduation_records=[
                GraduationRecord(evaluation_date=date(2026, 3, 1), status="Progressing", eligibility_score=60, notes="Needs stronger utilization discipline and another consistent term."),
            ],
        ),
        Student(
            student_id="EDU1003",
            full_name="Sofia Ramirez",
            university_name="Midwest State University",
            major="Biochemistry",
            class_year="Senior",
            gpa=3.92,
            attendance_percentage=94,
            academic_trend_score=89,
            club_participation_score=62,
            leadership_score=50,
            campus_engagement_score=60,
            scholarship_amount=1400,
            repayment_consistency_score=48,
            spending_behavior_score=68,
            internal_trust_score=66,
            current_credit_limit=980,
            used_credit=790,
            available_credit=190,
            semester_due_date=date(2026, 5, 18),
            graduation_eligibility_score=46,
            semesters_in_program=4,
            last_limit_change_reason="-$180 adjustment due to missed repayment commitments despite strong academics.",
            transactions=[
                Transaction(merchant_name="Science Supply Co.", amount=260, category="academic tools/software", date=date(2026, 1, 18), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
                Transaction(merchant_name="Campus Dining", amount=130, category="food", date=date(2026, 2, 1), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=False),
                Transaction(merchant_name="Nightline Bets", amount=75, category="gambling", date=date(2026, 2, 18), approval_status="Blocked", flagged=True, blocked=True, reason="Merchant or category is outside university-backed credit policy.", essential=False),
            ],
            repayments=[
                Repayment(date=date(2025, 12, 22), amount=80, source="Bank Transfer", note="Partial payment"),
            ],
            scholarships=[
                Scholarship(name="Research Fellowship", amount=700, disbursement_date=date(2026, 4, 14), applied_to_balance=0, remaining_amount=700, status="Scheduled")
            ],
            credit_limit_history=[
                CreditLimitHistory(change_date=date(2025, 8, 20), previous_limit=1200, new_limit=1160, delta=-40, reason="Repayment timeliness weakened."),
                CreditLimitHistory(change_date=date(2026, 1, 12), previous_limit=1160, new_limit=980, delta=-180, reason="Repeated partial repayments increased risk."),
            ],
            risk_events=[
                RiskEvent(event_date=date(2026, 1, 8), severity="High", title="Missed repayment threshold", description="Repayment variance triggered a limit review."),
                RiskEvent(event_date=date(2026, 2, 18), severity="High", title="Blocked gambling attempt", description="Purchase outside policy was denied."),
            ],
            graduation_records=[
                GraduationRecord(evaluation_date=date(2026, 3, 1), status="Not Ready", eligibility_score=40, notes="Repayment behavior prevents graduation eligibility."),
            ],
        ),
        Student(
            student_id="EDU1004",
            full_name="Noah Kim",
            university_name="Midwest State University",
            major="Public Policy",
            class_year="Junior",
            gpa=3.01,
            attendance_percentage=90,
            academic_trend_score=75,
            club_participation_score=93,
            leadership_score=95,
            campus_engagement_score=91,
            scholarship_amount=800,
            repayment_consistency_score=77,
            spending_behavior_score=79,
            internal_trust_score=78,
            current_credit_limit=1600,
            used_credit=620,
            available_credit=980,
            semester_due_date=date(2026, 5, 18),
            graduation_eligibility_score=70,
            semesters_in_program=3,
            last_limit_change_reason="+$150 increase driven by campus leadership and clean repayment trend.",
            transactions=[
                Transaction(merchant_name="Student Org Travel", amount=180, category="transportation", date=date(2026, 1, 25), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
                Transaction(merchant_name="Campus Bookstore", amount=110, category="books", date=date(2026, 2, 10), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=True),
            ],
            repayments=[
                Repayment(date=date(2025, 12, 18), amount=140, source="Bank Transfer", note="Semester payment"),
                Repayment(date=date(2026, 2, 26), amount=120, source="Work Study", note="Club stipend allocation"),
            ],
            scholarships=[
                Scholarship(name="Leadership Fellows Award", amount=600, disbursement_date=date(2026, 4, 20), applied_to_balance=0, remaining_amount=600, status="Scheduled")
            ],
            credit_limit_history=[
                CreditLimitHistory(change_date=date(2025, 8, 20), previous_limit=1300, new_limit=1450, delta=150, reason="Leadership and engagement uplift."),
                CreditLimitHistory(change_date=date(2026, 1, 12), previous_limit=1450, new_limit=1600, delta=150, reason="Continued repayment consistency."),
            ],
            risk_events=[
                RiskEvent(event_date=date(2026, 2, 12), severity="Low", title="Positive engagement review", description="Leadership signals supported trust growth."),
            ],
            graduation_records=[
                GraduationRecord(evaluation_date=date(2026, 3, 1), status="Progressing", eligibility_score=72, notes="Needs one more semester to qualify."),
            ],
        ),
        Student(
            student_id="EDU1005",
            full_name="Ethan Brooks",
            university_name="Midwest State University",
            major="Communications",
            class_year="Sophomore",
            gpa=2.41,
            attendance_percentage=74,
            academic_trend_score=48,
            club_participation_score=22,
            leadership_score=18,
            campus_engagement_score=30,
            scholarship_amount=400,
            repayment_consistency_score=42,
            spending_behavior_score=45,
            internal_trust_score=43,
            current_credit_limit=520,
            used_credit=470,
            available_credit=50,
            semester_due_date=date(2026, 5, 18),
            graduation_eligibility_score=20,
            semesters_in_program=2,
            last_limit_change_reason="-$120 reduction due to attendance decline, risky usage, and inconsistent repayment.",
            transactions=[
                Transaction(merchant_name="Campus Mart", amount=95, category="food", date=date(2026, 1, 16), approval_status="Approved", flagged=False, blocked=False, reason="Purchase fits current university-backed credit policy.", essential=False),
                Transaction(merchant_name="ShadowPay", amount=210, category="high-risk merchants", date=date(2026, 2, 11), approval_status="Flagged", flagged=True, blocked=False, reason="Transaction requires admin review due to elevated merchant/category risk.", essential=False),
                Transaction(merchant_name="FastLuck Casino", amount=150, category="gambling", date=date(2026, 2, 27), approval_status="Blocked", flagged=True, blocked=True, reason="Merchant or category is outside university-backed credit policy.", essential=False),
            ],
            repayments=[
                Repayment(date=date(2026, 1, 5), amount=40, source="Cash", note="Partial payment"),
            ],
            scholarships=[
                Scholarship(name="Retention Support Grant", amount=350, disbursement_date=date(2026, 4, 25), applied_to_balance=0, remaining_amount=350, status="Scheduled")
            ],
            credit_limit_history=[
                CreditLimitHistory(change_date=date(2025, 8, 20), previous_limit=700, new_limit=640, delta=-60, reason="Attendance deterioration increased risk."),
                CreditLimitHistory(change_date=date(2026, 1, 12), previous_limit=640, new_limit=520, delta=-120, reason="Risky spending and weak repayment consistency."),
            ],
            risk_events=[
                RiskEvent(event_date=date(2026, 2, 11), severity="High", title="Flagged risky merchant", description="Suspicious merchant pattern requires monitoring."),
                RiskEvent(event_date=date(2026, 2, 27), severity="High", title="Blocked prohibited merchant", description="Attempted prohibited merchant purchase."),
            ],
            graduation_records=[
                GraduationRecord(evaluation_date=date(2026, 3, 1), status="Not Ready", eligibility_score=20, notes="Needs academic and repayment intervention."),
            ],
        ),
    ]
