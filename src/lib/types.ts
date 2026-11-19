// ─── Domain Types ───────────────────────────────────────────────

export type Skill = "vocabulary" | "grammar" | "reading";
export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  skill: Skill;
  difficulty: Difficulty;
  weight: number; // easy=1, medium=2, hard=3
  prompt: string;
  passage?: string; // optional reading passage (for reading questions)
  options: [string, string, string, string]; // exactly 4 options
  correctIndex: number; // 0–3
  explanation: string;
}

/** Client-safe question — no correctIndex or explanation */
export type ClientQuestion = Omit<Question, "correctIndex" | "explanation">;

// ─── Quiz State ─────────────────────────────────────────────────

export interface QuizState {
  currentIndex: number;
  answers: Record<string, number>; // questionId → selectedIndex
  startedAt: number;
  status: "not_started" | "in_progress" | "submitted";
}

export type QuizAction =
  | { type: "START" }
  | { type: "SELECT_ANSWER"; questionId: string; selectedIndex: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SUBMIT" }
  | { type: "RESET" };

// ─── API: Evaluate ──────────────────────────────────────────────

export interface EvaluateRequest {
  answers: { questionId: string; selectedIndex: number }[];
}

export interface SkillResult {
  skill: Skill;
  score: number; // 0–100
  correct: number;
  total: number;
  verdict: "strong" | "needs_work" | "weak";
}

export interface Recommendation {
  priority: number;
  skill: Skill;
  title: string;
  description: string;
}

export interface QuestionResult {
  questionId: string;
  correct: boolean;
  explanation: string;
}

export interface EvaluateResponse {
  overall: {
    score: number; // 0–100
    maxScore: number;
    verdict: "ready" | "almost" | "not_ready";
  };
  skills: SkillResult[];
  recommendations: Recommendation[];
  questionResults: QuestionResult[];
}
