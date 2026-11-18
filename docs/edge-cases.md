# Edge Cases — Globio A1 German Exam Readiness Checker

> **Based on:** [architecture.md](file:///d:/globio/docs/architecture.md) · [implementation-plan.md](file:///d:/globio/docs/implementation-plan.md)

---

## Overview

This document catalogues every edge case and corner case across the app, organised by layer. Each entry includes the scenario, what could go wrong, and the required handling.

---

## 1. Quiz Navigation & State

### 1.1 Direct URL Access

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 1.1.1 | User navigates directly to `/quiz` via URL (no landing page) | Quiz loads with no context | ✅ Allow — start a fresh quiz with empty state |
| 1.1.2 | User navigates directly to `/results` via URL (no quiz taken) | Results page has no data to display | 🔀 Redirect to `/` with a toast: "Take the readiness check first" |
| 1.1.3 | User bookmarks `/results` and revisits later | `sessionStorage` data may have expired/cleared | 🔀 Redirect to `/` — sessionStorage is session-scoped |
| 1.1.4 | User hits browser Back button from `/results` to `/quiz` | Quiz state may be stale or submitted | 🔄 Reset quiz to `not_started` — allow retake |

### 1.2 Mid-Quiz Interruptions

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 1.2.1 | User refreshes the page mid-quiz | All quiz state (answers) lost | ⚠️ Show `beforeunload` warning: "Your progress will be lost." Quiz resets on reload |
| 1.2.2 | User closes the tab mid-quiz | Answers lost | ⚠️ `beforeunload` warning. No persistence — quiz is short enough to restart |
| 1.2.3 | User navigates away mid-quiz (clicks logo, types new URL) | Answers lost | ⚠️ `beforeunload` warning |
| 1.2.4 | Browser crashes mid-quiz | Answers lost | No recovery — quiz is only 15 questions (~3 min), acceptable to restart |
| 1.2.5 | User's internet drops mid-quiz | Quiz is client-side, no issue until submit | ✅ Quiz works offline (questions are static). Show error only on submit if network is down |

### 1.3 Navigation Within Quiz

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 1.3.1 | User clicks "Next" without selecting an answer | Skipped question | 🚫 Disable "Next" button until an option is selected |
| 1.3.2 | User clicks "Back" on the first question | No previous question exists | 🚫 Hide or disable "Back" button on question 1 |
| 1.3.3 | User clicks "Next" on the last question | No next question | 🔄 Replace "Next" with "Submit" button on question 15 |
| 1.3.4 | User rapidly clicks "Next" multiple times | Could skip questions or cause race conditions | 🛡️ Debounce navigation — disable button during transition |
| 1.3.5 | User changes an answer after going back | Previous answer should be overwritable | ✅ Allow — `answers` Map is keyed by `questionId`, overwrite works naturally |
| 1.3.6 | User goes back and forth 100+ times | Performance concern | ✅ No issue — state is a simple Map, no memory growth |

---

## 2. Answer Selection & Input

### 2.1 Selection Behavior

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 2.1.1 | User clicks the same option twice | Could deselect the answer | 🔒 RadioGroup behavior — clicking same option keeps it selected (no toggle-off) |
| 2.1.2 | User tries to select multiple options | Multiple answers per question | 🔒 RadioGroup enforces single selection by design |
| 2.1.3 | User uses keyboard (Tab + Space/Enter) to select | Keyboard users need full support | ✅ shadcn `RadioGroup` is ARIA-compliant and keyboard-navigable |
| 2.1.4 | User on mobile taps between two options (fat finger) | Accidental selection of wrong option | ✅ Allow — user can change answer by tapping the correct one. Options should have generous tap targets (min 44px height) |

### 2.2 Answer Integrity

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 2.2.1 | User submits with some questions unanswered (should be impossible) | Partial data sent to API | 🛡️ Client: disable submit unless `answers.size === 15`. API: validate answer count |
| 2.2.2 | User modifies `selectedIndex` in DevTools to an invalid value (e.g., 5) | Out-of-range index | 🛡️ API: validate `0 <= selectedIndex <= 3` for every answer |
| 2.2.3 | User submits a `questionId` that doesn't exist | Orphan answer | 🛡️ API: validate every `questionId` exists in the question bank |

---

## 3. API — `POST /api/evaluate`

### 3.1 Request Validation

| # | Scenario | Risk | Handling | HTTP Status |
|---|----------|------|----------|-------------|
| 3.1.1 | Empty request body | Crash on parsing | Return error: "Request body is required" | `400` |
| 3.1.2 | `answers` is not an array | Type error | Return error: "answers must be an array" | `400` |
| 3.1.3 | `answers` has fewer than 15 items | Incomplete quiz | Return error: "All 15 questions must be answered" | `400` |
| 3.1.4 | `answers` has more than 15 items | Duplicate or extra answers | Return error: "Expected exactly 15 answers" | `400` |
| 3.1.5 | Duplicate `questionId` in answers array | Same question answered twice | Return error: "Duplicate questionId: {id}" | `400` |
| 3.1.6 | `questionId` is not a string | Type mismatch | Return error: "questionId must be a string" | `400` |
| 3.1.7 | `selectedIndex` is not a number | Type mismatch | Return error: "selectedIndex must be a number" | `400` |
| 3.1.8 | `selectedIndex` is a float (e.g., 1.5) | Not a valid option index | Return error: "selectedIndex must be an integer" | `400` |
| 3.1.9 | `selectedIndex` is negative | Out of range | Return error: "selectedIndex must be 0–3" | `400` |
| 3.1.10 | `selectedIndex` ≥ 4 | Out of range | Return error: "selectedIndex must be 0–3" | `400` |
| 3.1.11 | Request body is not valid JSON | Parse failure | Return error: "Invalid JSON" | `400` |
| 3.1.12 | Request uses GET instead of POST | Wrong method | Return error: "Method not allowed" | `405` |
| 3.1.13 | Extra unexpected fields in request body | Potential injection | ✅ Ignore — only read `answers` field |

### 3.2 Server-Side Failures

| # | Scenario | Risk | Handling | HTTP Status |
|---|----------|------|----------|-------------|
| 3.2.1 | Question bank file is corrupted or missing | Scoring engine crashes | 🛡️ Catch error, return "Internal server error" | `500` |
| 3.2.2 | Scoring logic throws (e.g., division by zero if all weights are 0) | Unhandled exception | 🛡️ Wrap in try/catch. This shouldn't happen with valid data, but guard anyway | `500` |
| 3.2.3 | Vercel serverless function cold start timeout | Slow response | ✅ Unlikely for this payload size (~100ms cold start). No special handling needed | — |

---

## 4. Scoring Engine

### 4.1 Mathematical Edge Cases

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 4.1.1 | Learner gets **0 out of 15** correct | Score = 0% for all skills | ✅ Valid result — verdict: `not_ready` for all. Show all 3 recommendations |
| 4.1.2 | Learner gets **15 out of 15** correct | Score = 100% for all skills | ✅ Valid result — verdict: `ready`. Show 0 recommendations with a congratulations message |
| 4.1.3 | Learner gets all Vocabulary correct, all Grammar/Reading wrong | Vocab = 100%, Grammar = 0%, Reading = 0%, Overall = 33% | ✅ Valid — overall `not_ready`, but vocab is `strong`. Recommendations focus on Grammar + Reading |
| 4.1.4 | Learner scores exactly on a threshold boundary (e.g., 80.0%) | Ambiguous — ready or almost? | 🔒 Use `>=` for upper boundaries: 80% = `ready`, 60% = `almost` |
| 4.1.5 | Weighted score produces a floating-point result (e.g., 77.777...%) | Display precision issue | 🔢 Round to nearest integer for display, keep full precision for threshold comparison |
| 4.1.6 | All skills score identically (e.g., all 60%) | Recommendation ranking has no clear "weakest" | ✅ Rank alphabetically or by skill order (Grammar → Reading → Vocabulary) as tiebreaker |

### 4.2 Recommendation Edge Cases

| # | Scenario | Recommendations Expected | Handling |
|---|----------|-------------------------|----------|
| 4.2.1 | All 3 skills are `weak` (< 50%) | 3 recommendations | ✅ Return all 3, ordered by score ascending (weakest first) |
| 4.2.2 | All 3 skills are `strong` (≥ 80%) | 0 recommendations | ✅ Return empty array + congratulations message |
| 4.2.3 | 1 skill `weak`, 2 skills `strong` | 1 recommendation | ✅ Return just the 1 |
| 4.2.4 | 2 skills `needs_work`, 1 skill `strong` | 2 recommendations | ✅ Return 2, weakest first |
| 4.2.5 | 2 skills tied at exactly the same score, both `needs_work` | Priority ambiguous | 🔒 Use skill order as tiebreaker: Grammar before Reading before Vocabulary |
| 4.2.6 | Skill scores are 79%, 79%, 79% (all just below `strong`) | 3 `needs_work` recommendations | ✅ Valid — all 3 returned. Overall = 79% → `almost` |

---

## 5. UI / UX Edge Cases

### 5.1 Display & Rendering

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 5.1.1 | German text contains special characters (ä, ö, ü, ß) | Encoding issues | ✅ UTF-8 is default in Next.js — no special handling needed |
| 5.1.2 | A reading passage is very long (5+ sentences) | Overflows on mobile | 🔧 Set `max-height` with scroll on `QuestionCard`, or ensure passages are ≤ 5 sentences |
| 5.1.3 | An answer option text is very long | Breaks card layout | 🔧 Allow text wrapping in radio options. Test with longest option |
| 5.1.4 | Results page has 0 recommendations (perfect score) | Empty recommendation section looks broken | 🎉 Show a congratulatory message instead: "You're ready! No weak areas found." |
| 5.1.5 | Radial chart shows 0% | Chart looks empty/broken | 🔧 Show a minimum arc (e.g., 2%) for visual clarity, but display "0%" as text |
| 5.1.6 | Radial chart shows 100% | Full circle — ensure it renders completely | ✅ Test with 100% — most chart libraries handle this correctly |

### 5.2 Responsive / Device Edge Cases

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 5.2.1 | Very small screen (320px wide — iPhone SE) | Layout breaks | 🔧 Stack elements vertically, reduce padding. Minimum supported: 320px |
| 5.2.2 | Very large screen (4K / ultrawide) | Content looks tiny or stretched | 🔧 Use `max-w-2xl` or `max-w-3xl` container to constrain content width |
| 5.2.3 | User has zoomed browser to 200% | Layout may overflow | 🔧 Test at 200% zoom — flexbox/grid should handle it |
| 5.2.4 | User has system font size set to "Large" / "Extra Large" | Text overflows containers | 🔧 Use `rem` units (Tailwind default) — scales with user font preferences |
| 5.2.5 | User is on a very slow connection (2G) | Long initial load | 🔧 Next.js static generation + Vercel CDN makes this fast. Skeleton loaders for API call |
| 5.2.6 | User has JavaScript disabled | App doesn't work at all | ⚠️ Show `<noscript>` message: "This app requires JavaScript to run." |

### 5.3 Accessibility

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 5.3.1 | Screen reader user navigates the quiz | Questions/options not announced | 🔧 ARIA: `role="radiogroup"`, `aria-label` on each question, `aria-describedby` for passages |
| 5.3.2 | Keyboard-only user (no mouse) | Can't navigate or select answers | ✅ Tab → focus option, Space/Enter → select, Tab → Next button |
| 5.3.3 | Color-blind user views results (red/green verdicts) | Can't distinguish ready vs. not ready | 🔧 Use icons + text alongside colors: ✅/⚠️/🔴 + "Ready"/"Almost"/"Keep Practising" |
| 5.3.4 | Focus is lost after navigating to next question | User doesn't know where they are | 🔧 Auto-focus the first option of each new question |
| 5.3.5 | Progress bar is decorative to screen readers | User doesn't know their progress | 🔧 `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label="Question 5 of 15"` |

---

## 6. Security

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 6.1 | User inspects client JS bundle for correct answers | Cheating — answers visible in source | 🔒 `correctIndex` and `explanation` are **never** sent to the client. Only the API route loads the full question bank |
| 6.2 | User intercepts the API response and modifies scores | Fake "ready" result | ⚠️ Acceptable risk for this app — no real stakes (no certificate issued). Score is informational only |
| 6.3 | User sends thousands of requests to `/api/evaluate` | DoS / cost on Vercel | 🛡️ Vercel free tier has built-in rate limiting. Optionally add a simple in-memory rate limiter (e.g., 10 req/min per IP) |
| 6.4 | User sends malicious payload (XSS in `questionId`) | Injection attack | 🛡️ API only reads known `questionId` strings from a static set — no dynamic rendering of user input. React escapes output by default |
| 6.5 | User submits extremely large request body (1 MB+) | Memory exhaustion | 🛡️ Next.js API routes have a default body size limit (1 MB). Reject if `answers.length > 15` early |
| 6.6 | CORS — third-party site calls `/api/evaluate` | Unauthorized API usage | 🔒 Next.js API routes are same-origin by default. No CORS headers needed unless explicitly added |

---

## 7. Data Integrity

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 7.1 | Question bank is updated (questions added/removed/changed) | Old bookmarked results links break | ✅ Results are computed on-the-fly per session — no stored results to invalidate |
| 7.2 | A question has fewer than 4 options | `correctIndex` could be out of range | 🛡️ Build-time validation: assert every question has exactly 4 options |
| 7.3 | A question has `correctIndex` pointing to wrong answer | Scoring is incorrect | 🔧 Manual review of all 15 questions before launch. Consider adding a self-test script |
| 7.4 | Two questions share the same `id` | Answer Map collision | 🛡️ Build-time validation: assert all question IDs are unique |
| 7.5 | `weight` is set to 0 or negative | Division issues in scoring | 🛡️ Build-time validation: assert `weight > 0` for every question |
| 7.6 | A skill has 0 questions | Division by zero in `calculateSkillScores()` | 🛡️ Build-time validation: assert each skill has ≥ 1 question |

---

## 8. Deployment & Environment

| # | Scenario | Risk | Handling |
|---|----------|------|----------|
| 8.1 | Vercel free tier limits exceeded (100 GB bandwidth, 100 hrs serverless) | App goes down | ⚠️ Extremely unlikely for a quiz app. Monitor usage in Vercel dashboard |
| 8.2 | Vercel build fails due to TypeScript error | Deploy blocked | 🛡️ Run `pnpm build` locally before pushing. Set up GitHub Actions CI (optional) |
| 8.3 | Node.js version mismatch between local and Vercel | Build/runtime differences | 🔧 Pin Node version in `package.json` → `"engines": { "node": ">=20" }` |
| 8.4 | Environment variables needed but not set | API route fails | ✅ This app has no env vars (no database, no API keys unless Gemini is added). No risk |
| 8.5 | Custom domain not configured | Vercel provides `*.vercel.app` URL | ✅ The default `.vercel.app` URL satisfies the "public link" requirement |

---

## 9. Edge Case Test Matrix

A quick reference for manual or automated testing:

| Test | Input | Expected Output | Priority |
|------|-------|-----------------|----------|
| Perfect score | All 15 correct | 100% all skills, `ready`, 0 recommendations, congratulations | 🔴 High |
| Zero score | All 15 wrong | 0% all skills, `not_ready`, 3 recommendations | 🔴 High |
| Mixed: 1 strong, 1 weak, 1 needs_work | 5/5 vocab, 1/5 grammar, 3/5 reading | Vocab `strong`, Grammar `weak`, Reading `needs_work`, 2 recommendations | 🔴 High |
| Boundary: exactly 80% overall | Specific answer set | `ready` verdict (≥ 80%) | 🟡 Medium |
| Boundary: exactly 60% overall | Specific answer set | `almost` verdict (≥ 60%) | 🟡 Medium |
| Boundary: 59.9% overall | Specific answer set | `not_ready` (< 60%) | 🟡 Medium |
| All skills tied | Same score per skill | Recommendations ordered by skill tiebreaker | 🟡 Medium |
| Direct `/results` access | No quiz data in sessionStorage | Redirect to `/` | 🔴 High |
| Submit with missing answers | Tampered client bypasses UI validation | API returns 400 | 🟡 Medium |
| Invalid `selectedIndex` (e.g., 99) | Tampered request | API returns 400 | 🟡 Medium |
| Invalid `questionId` | Tampered request | API returns 400 | 🟡 Medium |
| Empty request body | `POST /api/evaluate` with `{}` | API returns 400 | 🟡 Medium |
| GET request to evaluate endpoint | `GET /api/evaluate` | API returns 405 | 🟢 Low |
| Mobile viewport (320px) | Full quiz flow | No overflow, all tappable | 🔴 High |
| JavaScript disabled | Load any page | `<noscript>` message shown | 🟢 Low |
| 200% browser zoom | Full quiz flow | Layout intact | 🟡 Medium |
| Screen reader | Full quiz flow | All elements announced correctly | 🟡 Medium |

