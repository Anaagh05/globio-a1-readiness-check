# Globio A1 German Exam Readiness Checker

> A diagnostic web application to help German learners assess their readiness for the **Goethe-Zertifikat A1** and **ÖSD A1** exams before booking.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Anaagh05/globio-a1-readiness-check)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 The Problem

Many learners finish A1 German and book their Goethe or ÖSD exam without knowing if they are truly ready. Some fail and lose both their exam fees (non-trivial) and valuable migration time on their journey abroad.

This application provides a **short 10–15 question readiness check** across three foundational skills:
- **Vocabulary** (A1 word mastery, genders, compound words)
- **Grammar** (Sentence structure V2, cases, Perfekt, modal verbs)
- **Reading Comprehension** (Authentic signs, emails, notices, rental ads)

Upon completion, learners receive:
1. **Overall Exam Readiness Verdict**:
   - `Ready to Book!` (≥ 80%)
   - `Almost There!` (60–79%)
   - `Keep Practising` (< 60%)
2. **Skill-by-Skill Weighted Scores** with animated radial visualizers and breakdown table.
3. **2–3 Actionable, Prioritized Recommendations** tailored to their weakest performance areas.

---

## 🛠 Tech Stack (100% Free Tier)

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Turbopack) | React 19 RSC, dynamic API routes, optimized static builds |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Accessible, responsive design with OKLCH tokens |
| **Data Security** | Client/Server isolation | Answer keys and explanations are stripped from client bundles |
| **Hosting** | [Vercel](https://vercel.com/) | Continuous deployment, global edge network, zero cost |

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

## ☁️ Deploying to Vercel (1-Click)

1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import `Anaagh05/globio-a1-readiness-check`.
3. Keep default settings (`Framework Preset: Next.js`, root directory `./`).
4. Click **Deploy**. Vercel will automatically build and publish your public URL!

---

## 🧠 Diagnostic Scoring Engine

Each question is weighted by difficulty:
- **Easy (Weight 1)**: Core fundamental knowledge
- **Medium (Weight 2)**: Standard exam competency
- **Hard (Weight 3)**: Upper-boundary A1 distinction

### Skill Score Formula:
$$\text{SkillScore} = \frac{\sum (\text{weight}_i \times \text{isCorrect}_i)}{\sum \text{weight}_i} \times 100$$

### Overall Readiness Score:
$$\text{OverallScore} = \frac{\text{VocabScore} + \text{GrammarScore} + \text{ReadingScore}}{3}$$

---

## 🔒 Security & Anti-Cheating Design

- **Zero Bundle Leakage**: The client question export (`src/data/questions/client.ts`) contains strictly prompts and option strings. Correct indices and explanation rationales are only accessible on the server.
- **Server-Side Evaluation**: Answers are submitted to `POST /api/evaluate`, where answers are validated (count, range, duplicates) and scored securely.

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
│   │   ├── layout.tsx           # Global root layout, metadata & fonts
│   │   ├── page.tsx             # Landing hero & diagnostic overview
│   │   ├── quiz/page.tsx        # Interactive quiz runner
│   │   ├── results/page.tsx     # Diagnostic report, charts & recommendations
│   │   └── api/evaluate/route.ts# Server-side scoring & recommendation engine
│   ├── components/
│   │   ├── ui/                  # shadcn/ui design system primitives
│   │   ├── landing/             # Landing page components (Hero, FeatureCards)
│   │   ├── quiz/                # QuestionCard, ProgressBar, SkillBadge, QuizRunner
│   │   └── results/             # OverallVerdict, SkillRadialChart, ScoreBreakdown, RecommendationList
│   ├── data/
│   │   ├── questions/           # Curated A1 question bank (Vocab, Grammar, Reading)
│   │   │   ├── client.ts        # Client-safe question export (answers stripped)
│   │   │   ├── vocabulary.ts    # 5 Vocabulary questions
│   │   │   ├── grammar.ts       # 5 Grammar questions
│   │   │   └── reading.ts       # 5 Reading questions with passages
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

## 📄 Documentation Links
- [Problem Statement & Background](docs/problemStatement.md)
- [System Architecture](docs/architecture.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Edge Cases Matrix](docs/edge-cases.md)
