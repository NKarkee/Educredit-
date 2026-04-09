from datetime import date
from typing import List, Optional

from pydantic import BaseModel, Field


class TransactionCreate(BaseModel):
    merchant_name: str = Field(min_length=2)
    amount: float = Field(gt=0)
    category: str
    date: date


class RepaymentCreate(BaseModel):
    amount: float = Field(gt=0)
    date: date
    source: str
    note: Optional[str] = ""


class ScholarshipApplyRequest(BaseModel):
    scholarship_id: int


class CreditApplicationCreate(BaseModel):
    full_name: str = Field(min_length=2)
    student_number: str = Field(min_length=4)
    university_name: str = Field(min_length=2)
    major: str = Field(min_length=2)
    classification: str
    email: str = Field(min_length=5)
    phone: str = Field(min_length=7)
    gpa: Optional[float] = Field(default=None, ge=0, le=4)
    expected_graduation_term: str
    requested_limit: float = Field(gt=0, le=2500)
    housing_status: str
    aid_status: str
    statement: str = Field(min_length=12)


class TransactionResponse(BaseModel):
    id: int
    merchant_name: str
    amount: float
    category: str
    date: date
    approval_status: str
    flagged: bool
    blocked: bool
    reason: str
    essential: bool

    class Config:
        from_attributes = True


class RepaymentResponse(BaseModel):
    id: int
    date: date
    amount: float
    source: str
    note: str

    class Config:
        from_attributes = True


class ScholarshipResponse(BaseModel):
    id: int
    name: str
    amount: float
    disbursement_date: date
    applied_to_balance: float
    remaining_amount: float
    status: str

    class Config:
        from_attributes = True


class StudentListItem(BaseModel):
    student_id: str
    full_name: str
    university_name: str
    major: str
    class_year: str
    gpa: float
    attendance_percentage: float
    internal_trust_score: float
    current_credit_limit: float
    used_credit: float
    available_credit: float
    graduation_eligibility_score: float

    class Config:
        from_attributes = True


class StudentDetail(StudentListItem):
    scholarship_amount: float
    repayment_consistency_score: float
    spending_behavior_score: float
    semester_due_date: date
    last_limit_change_reason: str


class DashboardResponse(BaseModel):
    student: StudentDetail
    score_breakdown: dict
    spending_breakdown: List[dict]
    trust_score_trend: List[dict]
    alerts: List[str]
    insights: List[str]
    repayment_summary: dict
    scholarship_summary: dict
    graduation_status: dict
    flagged_transactions: int


class CreditScoreResponse(BaseModel):
    trust_score: float
    risk_level: str
    recommended_credit_limit: float
    explanation: List[str]
    factor_breakdown: dict


class GraduationStatusResponse(BaseModel):
    eligibility_score: float
    status: str
    criteria: List[dict]
    summary: str


class AdminStudentRow(BaseModel):
    student_id: str
    full_name: str
    gpa: float
    attendance_percentage: float
    trust_score: float
    credit_limit: float
    used_credit: float
    risk_level: str
    flagged_transactions: int
    graduation_status: str


class FlaggedTransactionResponse(BaseModel):
    student_name: str
    student_id: str
    merchant_name: str
    amount: float
    category: str
    approval_status: str
    reason: str
    date: date


class LimitBreakdownResponse(BaseModel):
    student_id: str
    student_name: str
    trust_score: float
    risk_level: str
    recommended_credit_limit: float
    explanation: List[str]
    factor_breakdown: dict
    limit_history: List[dict]


class GraduationCandidateResponse(BaseModel):
    student_id: str
    full_name: str
    eligibility_score: float
    status: str
    semesters_in_program: int
    trust_score: float


class CreditApplicationResponse(BaseModel):
    id: int
    full_name: str
    student_number: str
    university_name: str
    major: str
    classification: str
    email: str
    phone: str
    gpa: Optional[float]
    expected_graduation_term: str
    requested_limit: float
    housing_status: str
    aid_status: str
    statement: str
    status: str
    submitted_on: date
    review_notes: str

    class Config:
        from_attributes = True
