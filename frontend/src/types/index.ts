export type Student = {
  student_id: string;
  full_name: string;
  university_name: string;
  major: string;
  class_year: string;
  gpa: number;
  attendance_percentage: number;
  scholarship_amount?: number;
  repayment_consistency_score?: number;
  spending_behavior_score?: number;
  internal_trust_score: number;
  current_credit_limit: number;
  used_credit: number;
  available_credit: number;
  semester_due_date?: string;
  graduation_eligibility_score: number;
  last_limit_change_reason?: string;
};

export type Transaction = {
  id: number;
  merchant_name: string;
  amount: number;
  category: string;
  date: string;
  approval_status: string;
  flagged: boolean;
  blocked: boolean;
  reason: string;
  essential: boolean;
};

export type Repayment = {
  id: number;
  date: string;
  amount: number;
  source: string;
  note: string;
};

export type Scholarship = {
  id: number;
  name: string;
  amount: number;
  disbursement_date: string;
  applied_to_balance: number;
  remaining_amount: number;
  status: string;
};

export type Dashboard = {
  student: Student;
  score_breakdown: {
    trust_score: number;
    risk_level: string;
    recommended_credit_limit: number;
    explanation: string[];
    factor_breakdown: Record<string, number>;
  };
  spending_breakdown: { name: string; value: number }[];
  trust_score_trend: { period: string; limit: number; delta: number }[];
  alerts: string[];
  insights: string[];
  repayment_summary: {
    amount_paid: number;
    amount_remaining: number;
    semester_due_date: string;
    progress: number;
    history: { date: string; amount: number; source: string }[];
  };
  scholarship_summary: {
    pending_amount: number;
    upcoming_disbursement_date: string | null;
    total_applied: number;
    remaining_after_autopay: number;
    history: {
      name: string;
      amount: number;
      applied_to_balance: number;
      remaining_amount: number;
      status: string;
    }[];
  };
  graduation_status: {
    eligibility_score: number;
    status: string;
    criteria: { label: string; met: boolean }[];
    summary: string;
  };
  flagged_transactions: number;
};

export type AdminStudentRow = {
  student_id: string;
  full_name: string;
  gpa: number;
  attendance_percentage: number;
  trust_score: number;
  credit_limit: number;
  used_credit: number;
  risk_level: string;
  flagged_transactions: number;
  graduation_status: string;
};

export type FlaggedTransaction = {
  student_name: string;
  student_id: string;
  merchant_name: string;
  amount: number;
  category: string;
  approval_status: string;
  reason: string;
  date: string;
};

export type CreditScore = {
  trust_score: number;
  risk_level: string;
  recommended_credit_limit: number;
  explanation: string[];
  factor_breakdown: Record<string, number>;
};

export type GraduationStatus = {
  eligibility_score: number;
  status: string;
  criteria: { label: string; met: boolean }[];
  summary: string;
};

export type LimitBreakdown = CreditScore & {
  student_id: string;
  student_name: string;
  limit_history: {
    date: string;
    previous_limit: number;
    new_limit: number;
    delta: number;
    reason: string;
  }[];
};

export type GraduationCandidate = {
  student_id: string;
  full_name: string;
  eligibility_score: number;
  status: string;
  semesters_in_program: number;
  trust_score: number;
};

export type CreditApplication = {
  id: number;
  full_name: string;
  student_number: string;
  university_name: string;
  major: string;
  classification: string;
  email: string;
  phone: string;
  gpa?: number | null;
  expected_graduation_term: string;
  requested_limit: number;
  housing_status: string;
  aid_status: string;
  statement: string;
  status: string;
  submitted_on: string;
  review_notes: string;
};
