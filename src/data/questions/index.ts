import { vocabularyQuestions } from "./vocabulary";
import { grammarQuestions } from "./grammar";
import { readingQuestions } from "./reading";
import type { Question } from "@/lib/types";

/** Full question bank — includes correctIndex and explanation (server-only) */
export const allQuestions: Question[] = [
  ...vocabularyQuestions,
  ...grammarQuestions,
  ...readingQuestions,
];

/** Look up a question by ID */
export const questionMap = new Map<string, Question>(
  allQuestions.map((q) => [q.id, q])
);

export { vocabularyQuestions, grammarQuestions, readingQuestions };

