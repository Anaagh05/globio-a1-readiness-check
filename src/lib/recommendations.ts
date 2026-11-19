import type { SkillResult, Recommendation } from "@/lib/types";
import { recommendationRules, SKILL_PRIORITY_ORDER } from "@/data/recommendations";

/**
 * Generate 0–3 actionable recommendations based on skill results.
 *
 * Logic:
 * 1. Filter to skills with verdict "weak" or "needs_work"
 * 2. Sort by score ascending (weakest first), then by skill priority order as tiebreaker
 * 3. Pick top 2–3
 * 4. Map each to a pre-written recommendation from the rules table
 */
export function generateRecommendations(
  skillResults: SkillResult[]
): Recommendation[] {
  const weakSkills = skillResults.filter(
    (s) => s.verdict === "weak" || s.verdict === "needs_work"
  );

  // Sort: weakest first, then by skill priority order for ties
  weakSkills.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return (
      SKILL_PRIORITY_ORDER.indexOf(a.skill) -
      SKILL_PRIORITY_ORDER.indexOf(b.skill)
    );
  });

  // Take top 3 at most
  const topWeak = weakSkills.slice(0, 3);

  return topWeak.map((skillResult, index) => {
    const rule = recommendationRules[skillResult.skill][skillResult.verdict as "weak" | "needs_work"];
    return {
      priority: index + 1,
      skill: skillResult.skill,
      title: rule.title,
      description: rule.description,
    };
  });
}
