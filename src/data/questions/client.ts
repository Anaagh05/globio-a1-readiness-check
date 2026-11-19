import type { ClientQuestion } from "@/lib/types";
import { allQuestions } from "./index";

/**
 * Client-safe questions — correctIndex and explanation are stripped.
 * Import this in client components; never import the full question bank.
 */
export const clientQuestions: ClientQuestion[] = allQuestions.map(
  ({ correctIndex, explanation, ...safeFields }) => safeFields
);

