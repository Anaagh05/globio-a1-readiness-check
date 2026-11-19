import type { EvaluateResponse, SkillResult } from "@/lib/types";

// ─── Overall Verdict Thresholds ─────────────────────────────────

export const OVERALL_THRESHOLDS = {
  ready: 80, // ≥ 80% → Ready to book
  almost: 60, // ≥ 60% → Almost there
  // < 60% → Not ready
} as const;

export function getOverallVerdict(
  score: number
): EvaluateResponse["overall"]["verdict"] {
  if (score >= OVERALL_THRESHOLDS.ready) return "ready";
  if (score >= OVERALL_THRESHOLDS.almost) return "almost";
  return "not_ready";
}

// ─── Per-Skill Verdict Thresholds ───────────────────────────────

export const SKILL_THRESHOLDS = {
  strong: 80, // ≥ 80% → Strong, no action needed
  needs_work: 50, // ≥ 50% → Needs work
  // < 50% → Weak, priority focus
} as const;

export function getSkillVerdict(score: number): SkillResult["verdict"] {
  if (score >= SKILL_THRESHOLDS.strong) return "strong";
  if (score >= SKILL_THRESHOLDS.needs_work) return "needs_work";
  return "weak";
}

// ─── Difficulty Weights ─────────────────────────────────────────

export const DIFFICULTY_WEIGHTS = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const;

