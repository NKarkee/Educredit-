from sqlalchemy import Boolean, Column, Date, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from db.session import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    university_name = Column(String, nullable=False)
    major = Column(String, nullable=False)
    class_year = Column(String, nullable=False)
    gpa = Column(Float, nullable=False)
    attendance_percentage = Column(Float, nullable=False)
    academic_trend_score = Column(Float, nullable=False)
    club_participation_score = Column(Float, nullable=False)
    leadership_score = Column(Float, nullable=False)
    campus_engagement_score = Column(Float, nullable=False)
    scholarship_amount = Column(Float, default=0)
    repayment_consistency_score = Column(Float, nullable=False)
    spending_behavior_score = Column(Float, nullable=False)
    internal_trust_score = Column(Float, nullable=False)
    current_credit_limit = Column(Float, nullable=False)
    used_credit = Column(Float, nullable=False)
    available_credit = Column(Float, nullable=False)
    semester_due_date = Column(Date, nullable=False)
    graduation_eligibility_score = Column(Float, nullable=False)
    semesters_in_program = Column(Integer, default=1)
    last_limit_change_reason = Column(String, nullable=False)

    transactions = relationship("Transaction", back_populates="student", cascade="all, delete-orphan")
    repayments = relationship("Repayment", back_populates="student", cascade="all, delete-orphan")
    scholarships = relationship("Scholarship", back_populates="student", cascade="all, delete-orphan")
    credit_limit_history = relationship("CreditLimitHistory", back_populates="student", cascade="all, delete-orphan")
    risk_events = relationship("RiskEvent", back_populates="student", cascade="all, delete-orphan")
    graduation_records = relationship("GraduationRecord", back_populates="student", cascade="all, delete-orphan")


class CreditApplication(Base):
    __tablename__ = "credit_applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    student_number = Column(String, nullable=False, unique=True, index=True)
    university_name = Column(String, nullable=False)
    major = Column(String, nullable=False)
    classification = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    gpa = Column(Float, nullable=True)
    expected_graduation_term = Column(String, nullable=False)
    requested_limit = Column(Float, nullable=False)
    housing_status = Column(String, nullable=False)
    aid_status = Column(String, nullable=False)
    statement = Column(Text, nullable=False)
    status = Column(String, nullable=False, default="Pending University Review")
    submitted_on = Column(Date, nullable=False)
    review_notes = Column(Text, default="")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    merchant_name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    approval_status = Column(String, nullable=False)
    flagged = Column(Boolean, default=False)
    blocked = Column(Boolean, default=False)
    reason = Column(Text, default="")
    essential = Column(Boolean, default=True)

    student = relationship("Student", back_populates="transactions")


class Repayment(Base):
    __tablename__ = "repayments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    source = Column(String, nullable=False)
    note = Column(String, default="")

    student = relationship("Student", back_populates="repayments")


class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    disbursement_date = Column(Date, nullable=False)
    applied_to_balance = Column(Float, default=0)
    remaining_amount = Column(Float, default=0)
    status = Column(String, nullable=False)

    student = relationship("Student", back_populates="scholarships")


class CreditLimitHistory(Base):
    __tablename__ = "credit_limit_history"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    change_date = Column(Date, nullable=False)
    previous_limit = Column(Float, nullable=False)
    new_limit = Column(Float, nullable=False)
    delta = Column(Float, nullable=False)
    reason = Column(String, nullable=False)

    student = relationship("Student", back_populates="credit_limit_history")


class RiskEvent(Base):
    __tablename__ = "risk_events"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    event_date = Column(Date, nullable=False)
    severity = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)

    student = relationship("Student", back_populates="risk_events")


class GraduationRecord(Base):
    __tablename__ = "graduation_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    evaluation_date = Column(Date, nullable=False)
    status = Column(String, nullable=False)
    eligibility_score = Column(Float, nullable=False)
    notes = Column(Text, nullable=False)

    student = relationship("Student", back_populates="graduation_records")
