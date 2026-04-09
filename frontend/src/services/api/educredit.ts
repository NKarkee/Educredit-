import {
  AdminStudentRow,
  CreditApplication,
  CreditScore,
  Dashboard,
  FlaggedTransaction,
  GraduationStatus,
  GraduationCandidate,
  LimitBreakdown,
  Repayment,
  Scholarship,
  Student,
  Transaction,
} from "types";

import { apiClient } from "./client";

export const eduCreditApi = {
  getStudents: () => apiClient.get<Student[]>("/students"),
  getStudent: (studentId: string) => apiClient.get<Student>(`/students/${studentId}`),
  getDashboard: (studentId: string) => apiClient.get<Dashboard>(`/students/${studentId}/dashboard`),
  getTransactions: (studentId: string) => apiClient.get<Transaction[]>(`/students/${studentId}/transactions`),
  createTransaction: (studentId: string, payload: Omit<Transaction, "id" | "approval_status" | "flagged" | "blocked" | "reason" | "essential">) =>
    apiClient.post<Transaction>(`/students/${studentId}/transactions`, payload),
  getRepayments: (studentId: string) => apiClient.get<Repayment[]>(`/students/${studentId}/repayments`),
  createRepayment: (studentId: string, payload: { amount: number; date: string; source: string; note: string }) =>
    apiClient.post<Repayment>(`/students/${studentId}/repayments`, payload),
  getScholarships: (studentId: string) => apiClient.get<Scholarship[]>(`/students/${studentId}/scholarships`),
  applyScholarship: (studentId: string, scholarshipId: number) =>
    apiClient.post(`/students/${studentId}/apply-scholarship`, { scholarship_id: scholarshipId }),
  getCreditScore: (studentId: string) => apiClient.get<CreditScore>(`/students/${studentId}/credit-score`),
  createApplication: (
    payload: Omit<CreditApplication, "id" | "status" | "submitted_on" | "review_notes">,
  ) => apiClient.post<CreditApplication>("/applications", payload),
  getGraduationStatus: (studentId: string) =>
    apiClient.get<GraduationStatus>(`/students/${studentId}/graduation-status`),
  getAdminStudents: () => apiClient.get<AdminStudentRow[]>("/admin/students"),
  getFlaggedTransactions: () => apiClient.get<FlaggedTransaction[]>("/admin/flagged-transactions"),
  getLimitBreakdown: (studentId: string) =>
    apiClient.get<LimitBreakdown>(`/admin/credit-limit-breakdown/${studentId}`),
  getGraduationCandidates: () => apiClient.get<GraduationCandidate[]>("/admin/graduation-candidates"),
  getApplications: () => apiClient.get<CreditApplication[]>("/admin/applications"),
};
