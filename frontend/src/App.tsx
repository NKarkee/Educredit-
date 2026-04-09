import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AppShell } from "components/layout/AppShell";
import { AdminDashboardPage } from "pages/AdminDashboardPage";
import { ApplicationFormPage } from "pages/ApplicationFormPage";
import { GraduationPage } from "pages/GraduationPage";
import { LoginPage } from "pages/LoginPage";
import { RepaymentPage } from "pages/RepaymentPage";
import { ScholarshipPage } from "pages/ScholarshipPage";
import { StudentDashboardPage } from "pages/StudentDashboardPage";
import { TransactionsPage } from "pages/TransactionsPage";
import { TrustPage } from "pages/TrustPage";
import { eduCreditApi } from "services/api/educredit";
import {
  AdminStudentRow,
  CreditApplication,
  Dashboard,
  FlaggedTransaction,
  GraduationCandidate,
  GraduationStatus,
  LimitBreakdown,
  Repayment,
  Scholarship,
  Student,
  Transaction,
} from "types";

type Role = "student" | "admin" | "apply" | null;

function App() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [graduation, setGraduation] = useState<GraduationStatus | null>(null);
  const [adminStudents, setAdminStudents] = useState<AdminStudentRow[]>([]);
  const [flaggedTransactions, setFlaggedTransactions] = useState<FlaggedTransaction[]>([]);
  const [graduationCandidates, setGraduationCandidates] = useState<GraduationCandidate[]>([]);
  const [applications, setApplications] = useState<CreditApplication[]>([]);
  const [limitBreakdown, setLimitBreakdown] = useState<LimitBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedStudent = useMemo(
    () => students.find((student) => student.student_id === selectedStudentId),
    [selectedStudentId, students],
  );

  const refreshStudentData = async (studentId: string) => {
    const [nextDashboard, nextTransactions, nextRepayments, nextScholarships, nextGraduation, nextLimitBreakdown] =
      await Promise.all([
        eduCreditApi.getDashboard(studentId),
        eduCreditApi.getTransactions(studentId),
        eduCreditApi.getRepayments(studentId),
        eduCreditApi.getScholarships(studentId),
        eduCreditApi.getGraduationStatus(studentId),
        eduCreditApi.getLimitBreakdown(studentId),
      ]);
    setDashboard(nextDashboard);
    setTransactions(nextTransactions);
    setRepayments(nextRepayments);
    setScholarships(nextScholarships);
    setGraduation(nextGraduation);
    setLimitBreakdown(nextLimitBreakdown);
  };

  const refreshAdminData = async (studentId?: string) => {
    const [nextApplications, nextAdminStudents, nextFlaggedTransactions, nextGraduationCandidates] = await Promise.all([
      eduCreditApi.getApplications(),
      eduCreditApi.getAdminStudents(),
      eduCreditApi.getFlaggedTransactions(),
      eduCreditApi.getGraduationCandidates(),
    ]);
    setApplications(nextApplications);
    setAdminStudents(nextAdminStudents);
    setFlaggedTransactions(nextFlaggedTransactions);
    setGraduationCandidates(nextGraduationCandidates);
    if (studentId) {
      setLimitBreakdown(await eduCreditApi.getLimitBreakdown(studentId));
    }
  };

  useEffect(() => {
    const boot = async () => {
      try {
        setLoading(true);
        const initialStudents = await eduCreditApi.getStudents();
        setStudents(initialStudents);
        if (initialStudents[0]) {
          setSelectedStudentId(initialStudents[0].student_id);
        }
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Failed to load EduCredit+");
      } finally {
        setLoading(false);
      }
    };
    void boot();
  }, []);

  useEffect(() => {
    if (!selectedStudentId) {
      return;
    }

    const load = async () => {
      try {
        setError(null);
        if (role === "student") {
          await refreshStudentData(selectedStudentId);
        }
        if (role === "admin") {
          await refreshAdminData(selectedStudentId);
        }
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : "Failed to refresh data");
      }
    };
    void load();
  }, [role, selectedStudentId]);

  const enterStudent = (studentId: string) => {
    setRole("student");
    setSelectedStudentId(studentId);
    navigate("/");
  };

  const enterAdmin = () => {
    setRole("admin");
    navigate("/admin");
  };

  const resetRole = () => {
    setRole(null);
    navigate("/");
  };

  if (loading && !students.length) {
    return <div className="flex min-h-screen items-center justify-center text-sm font-semibold text-slate-500">Loading EduCredit+...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center px-6 text-center text-sm text-rose-700">{error}</div>;
  }

  if (role === null) {
    return <LoginPage students={students} onEnterStudent={enterStudent} onEnterAdmin={enterAdmin} onApply={() => setRole("apply")} />;
  }

  if (role === "apply") {
    return (
      <ApplicationFormPage
        onBack={resetRole}
        onSubmit={async (payload) => {
          await eduCreditApi.createApplication(payload);
        }}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AppShell role={role} studentName={selectedStudent?.full_name} onResetRole={resetRole} />}>
        {role === "student" ? (
          <>
            <Route index element={dashboard ? <StudentDashboardPage dashboard={dashboard} /> : null} />
            <Route
              path="transactions"
              element={
                <TransactionsPage
                  transactions={transactions}
                  onSubmit={async (payload) => {
                    await eduCreditApi.createTransaction(selectedStudentId, payload);
                    await refreshStudentData(selectedStudentId);
                  }}
                />
              }
            />
            <Route
              path="repayments"
              element={
                dashboard ? (
                  <RepaymentPage
                    dashboard={dashboard}
                    repayments={repayments}
                    onSubmit={async (payload) => {
                      await eduCreditApi.createRepayment(selectedStudentId, payload);
                      await refreshStudentData(selectedStudentId);
                    }}
                  />
                ) : null
              }
            />
            <Route
              path="trust"
              element={dashboard ? <TrustPage dashboard={dashboard} limitBreakdown={limitBreakdown} /> : null}
            />
            <Route
              path="graduation"
              element={graduation ? <GraduationPage graduation={graduation} /> : null}
            />
            <Route
              path="scholarships"
              element={
                dashboard ? (
                  <ScholarshipPage
                    dashboard={dashboard}
                    scholarships={scholarships}
                    onApply={async (scholarshipId) => {
                      await eduCreditApi.applyScholarship(selectedStudentId, scholarshipId);
                      await refreshStudentData(selectedStudentId);
                    }}
                  />
                ) : null
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route
              path="admin"
              element={
                <AdminDashboardPage
                  students={adminStudents}
                  applications={applications}
                  flaggedTransactions={flaggedTransactions}
                  graduationCandidates={graduationCandidates}
                  limitBreakdown={limitBreakdown}
                  selectedStudentId={selectedStudentId}
                  onSelectStudent={async (studentId) => {
                    setSelectedStudentId(studentId);
                    setLimitBreakdown(await eduCreditApi.getLimitBreakdown(studentId));
                  }}
                />
              }
            />
            <Route index element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
