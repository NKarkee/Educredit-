# EduCredit+

EduCredit+ is a full-stack MVP that simulates a university-backed smart credit platform for students. It replaces traditional credit history with institutional and behavioral signals such as GPA, attendance, engagement, repayment consistency, and spending responsibility.

The application includes:

- A student-facing fintech dashboard with dynamic credit, semester repayment, scholarship auto-pay, behavioral insights, and credit graduation readiness
- An admin dashboard for viewing all students, flagged transactions, risk posture, and credit limit explanations
- A FastAPI backend with structured service modules for scoring, transactions, repayment, scholarships, insights, and graduation logic
- SQLite seed data for five realistic student archetypes

## Stack

- Frontend: React, TypeScript, Tailwind CSS, Recharts, Framer Motion
- Backend: FastAPI, Pydantic, SQLAlchemy
- Database: SQLite

## Project Structure

```text
.
├── backend
│   ├── db
│   ├── models
│   ├── routes
│   ├── schemas
│   ├── seed
│   ├── services
│   ├── main.py
│   └── requirements.txt
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   └── utils
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Backend Features

- `GET /students`
- `GET /students/{student_id}`
- `GET /students/{student_id}/dashboard`
- `GET /students/{student_id}/transactions`
- `POST /students/{student_id}/transactions`
- `GET /students/{student_id}/repayments`
- `POST /students/{student_id}/repayments`
- `GET /students/{student_id}/scholarships`
- `POST /students/{student_id}/apply-scholarship`
- `GET /students/{student_id}/credit-score`
- `GET /students/{student_id}/graduation-status`
- `GET /admin/students`
- `GET /admin/flagged-transactions`
- `GET /admin/credit-limit-breakdown/{student_id}`
- `GET /admin/graduation-candidates`

## Dynamic Credit Logic

The backend scoring engine uses the required weighted model:

- GPA: 30%
- Attendance: 20%
- Academic trend: 10%
- Club participation and leadership engagement: 10%
- Repayment consistency: 20%
- Spending responsibility: 10%

Outputs include:

- Internal trust score
- Risk level
- Recommended credit limit
- Human-readable explanation of assignment

## Seed Personas

The database is seeded with:

- A high-performing responsible student
- An average student
- A high-GPA student with weak repayment behavior
- An engaged student leader with medium GPA
- An at-risk student with risky spending patterns

## Running The Backend

1. Create and activate a Python virtual environment.
2. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Start the API:

```bash
uvicorn main:app --reload
```

The backend seeds SQLite automatically on startup and runs at [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Running The Frontend

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start the app:

```bash
npm run dev
```

The frontend runs at [http://127.0.0.1:5173](http://127.0.0.1:5173).

## Vercel Deployment

This repo is configured to deploy as a single Vercel project:

- Static React frontend served from `frontend/dist`
- FastAPI backend exposed through `/api`
- SQLite stored in `/tmp` when running on Vercel

Important limitation:

- Vercel serverless storage is ephemeral, so the SQLite database will reseed and reset. This is acceptable for a demo, but not for persistent production data.

To deploy:

```bash
npm i -g vercel
vercel
vercel --prod
```

If you prefer not to install the CLI globally:

```bash
npx vercel
npx vercel --prod
```

## Demo Flow

1. Open the app and choose a student or admin role.
2. Student flow:
   - Review dashboard metrics and limit assignment
   - Submit approved, flagged, or blocked transactions
   - Record a semester repayment
   - Apply a scholarship to the outstanding balance
   - Inspect trust growth and graduation readiness
3. Admin flow:
   - Review the student portfolio
   - Inspect flagged transactions
   - Open the limit breakdown for any student

## Notes

- The frontend is configured to call the backend at `http://127.0.0.1:8000`.
- Authentication is mocked through role selection for demo simplicity.
- The app is intended for hackathon/demo use, not production deployment.
