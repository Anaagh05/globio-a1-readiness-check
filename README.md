# Globio A1 German Exam Readiness Checker

> A diagnostic web application to help German learners assess their readiness for the **Goethe-Zertifikat A1** and **ÖSD A1** exams before booking.

## 🎯 The Problem

Many learners finish A1 German and book their Goethe or ÖSD exam without knowing if they are truly ready. Some fail and lose both their exam fees and valuable time on their journey abroad.

This application provides a **short 10–15 question readiness check** across three foundational skills:
- **Vocabulary** (A1 word mastery & context)
- **Grammar** (Sentence structure V2, cases, tenses)
- **Reading Comprehension** (Passages, notices, emails)

Upon completion, it provides:
1. An overall exam readiness verdict (`Ready`, `Almost There`, `Keep Practising`)
2. Skill-by-skill weighted scores
3. 2–3 actionable, prioritized practice recommendations

---

## 🛠 Tech Stack (100% Free Tier)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: Lucide React
- **Hosting**: Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Anaagh05/globio-a1-readiness-check.git
cd globio-a1-readiness-check

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
globio/
├── docs/
│   ├── problemStatement.md      # Detailed problem analysis & Globio context
│   ├── architecture.md          # Full system architecture & data models
│   ├── implementation-plan.md   # 5-phase delivery roadmap
│   └── edge-cases.md            # Comprehensive edge cases & handling matrix
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global root layout & meta
│   │   ├── page.tsx             # Landing hero & overview
│   │   ├── quiz/page.tsx        # Interactive quiz runner
│   │   ├── results/page.tsx     # Diagnostic report & breakdown
│   │   └── api/evaluate/route.ts# Server-side scoring & recommendation engine
│   ├── components/
│   │   ├── ui/                  # shadcn/ui design system primitives
│   │   ├── landing/             # Landing page components
│   │   ├── quiz/                # Quiz question cards, progress bars
│   │   └── results/             # Score radial charts, verdict, recommendations
│   ├── data/
│   │   ├── questions/           # Curated A1 question bank (Vocab, Grammar, Reading)
│   │   ├── thresholds.ts        # Readiness score cutoff thresholds
│   │   └── recommendations.ts   # Rule-based diagnostic recommendations
│   ├── lib/
│   │   ├── scoring.ts           # Weighted scoring algorithms
│   │   ├── recommendations.ts   # Recommendation mapping engine
│   │   └── types.ts             # Domain TypeScript contracts
│   └── hooks/
│       └── useQuiz.ts           # State machine for quiz execution
└── public/                      # Static assets
```

---

## 📄 Documentation
- [Problem Statement & Background](docs/problemStatement.md)
- [System Architecture](docs/architecture.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Edge Cases Matrix](docs/edge-cases.md)
