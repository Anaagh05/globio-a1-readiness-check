import type { Skill, SkillResult, EvaluateResponse, Question } from "@/lib/types";
import { getOverallVerdict, getSkillVerdict } from "@/data/thresholds";

interface AnswerEntry {
  questionId: string;
  selectedIndex: number;
}

/**
 * Calculate weighted scores for each skill.
 *
 * Formula per skill:
 *   SkillScore = (Σ weight_i × correct_i) / (Σ weight_i) × 100
 */
export function calculateSkillScores(
  answers: AnswerEntry[],
  questionMap: Map<string, Question>
): SkillResult[] {
  // Group questions by skill
  const skillData: Record<
    Skill,
    { earnedWeight: number; maxWeight: number; correct: number; total: number }
  > = {
    vocabulary: { earnedWeight: 0, maxWeight: 0, correct: 0, total: 0 },
    grammar: { earnedWeight: 0, maxWeight: 0, correct: 0, total: 0 },
    reading: { earnedWeight: 0, maxWeight: 0, correct: 0, total: 0 },
  };

  for (const answer of answers) {
    const question = questionMap.get(answer.questionId);
    if (!question) continue;

    const data = skillData[question.skill];
    data.total += 1;
    data.maxWeight += question.weight;

    if (answer.selectedIndex === question.correctIndex) {
      data.correct += 1;
      data.earnedWeight += question.weight;
    }
  }

  const skills: Skill[] = ["vocabulary", "grammar", "reading"];

  return skills.map((skill) => {
    const data = skillData[skill];
    const score =
      data.maxWeight > 0
        ? Math.round((data.earnedWeight / data.maxWeight) * 100)
        : 0;

    return {
      skill,
      score,
      correct: data.correct,
      total: data.total,
      verdict: getSkillVerdict(score),
    };
  });
}

/**
 * Calculate overall readiness score.
 * Equal weight across all three skills (average).
 */
export function calculateOverallScore(
  skillResults: SkillResult[],
  questionMap: Map<string, Question>
): EvaluateResponse["overall"] {
  const totalScore =
    skillResults.length > 0
      ? Math.round(
          skillResults.reduce((sum, s) => sum + s.score, 0) /
            skillResults.length
        )
      : 0;

  // Calculate max possible weighted score across all questions
  let maxScore = 0;
  for (const q of questionMap.values()) {
    maxScore += q.weight;
  }

  return {
    score: totalScore,
    maxScore,
    verdict: getOverallVerdict(totalScore),
  };
}
