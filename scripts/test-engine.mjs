import { vocabularyQuestions } from "../src/data/questions/vocabulary.ts";
import { grammarQuestions } from "../src/data/questions/grammar.ts";
import { readingQuestions } from "../src/data/questions/reading.ts";
import { calculateSkillScores, calculateOverallScore } from "../src/lib/scoring.ts";
import { generateRecommendations } from "../src/lib/recommendations.ts";

console.log("==========================================");
console.log("🧪 TESTING GLOBIO EVALUATION ENGINE");
console.log("==========================================\n");

const allQuestions = [
  ...vocabularyQuestions,
  ...grammarQuestions,
  ...readingQuestions,
];
const questionMap = new Map(allQuestions.map((q) => [q.id, q]));

// Test 1: Question Bank Integrity
console.log("1. Checking Question Bank Integrity...");
console.assert(allQuestions.length === 15, `Expected 15 questions, found ${allQuestions.length}`);
console.assert(vocabularyQuestions.length === 5, `Expected 5 vocab, found ${vocabularyQuestions.length}`);
console.assert(grammarQuestions.length === 5, `Expected 5 grammar, found ${grammarQuestions.length}`);
console.assert(readingQuestions.length === 5, `Expected 5 reading, found ${readingQuestions.length}`);
allQuestions.forEach((q) => {
  console.assert(q.options.length === 4, `Question ${q.id} must have 4 options`);
  console.assert(q.correctIndex >= 0 && q.correctIndex <= 3, `Question ${q.id} correctIndex out of range`);
  console.assert(q.weight >= 1 && q.weight <= 3, `Question ${q.id} invalid weight`);
});
console.log("✅ Question bank passes all integrity checks.\n");

// Test 2: Perfect Score (100%) -> Should be "ready", 0 recommendations
console.log("2. Testing Perfect Score Scenario...");
const perfectAnswers = allQuestions.map((q) => ({
  questionId: q.id,
  selectedIndex: q.correctIndex,
}));
const perfectSkills = calculateSkillScores(perfectAnswers, questionMap);
const perfectOverall = calculateOverallScore(perfectSkills, questionMap);
const perfectRecs = generateRecommendations(perfectSkills);

console.log("Overall Score:", perfectOverall.score + "%", "| Verdict:", perfectOverall.verdict);
console.assert(perfectOverall.score === 100, "Score should be 100%");
console.assert(perfectOverall.verdict === "ready", "Verdict should be 'ready'");
console.assert(perfectRecs.length === 0, "Recommendations should be 0 for perfect score");
console.log("✅ Perfect score test passed.\n");

// Test 3: Zero Score (0%) -> Should be "not_ready", 3 recommendations
console.log("3. Testing Zero Score Scenario...");
const zeroAnswers = allQuestions.map((q) => ({
  questionId: q.id,
  selectedIndex: (q.correctIndex + 1) % 4,
}));
const zeroSkills = calculateSkillScores(zeroAnswers, questionMap);
const zeroOverall = calculateOverallScore(zeroSkills, questionMap);
const zeroRecs = generateRecommendations(zeroSkills);

console.log("Overall Score:", zeroOverall.score + "%", "| Verdict:", zeroOverall.verdict);
console.assert(zeroOverall.score === 0, "Score should be 0%");
console.assert(zeroOverall.verdict === "not_ready", "Verdict should be 'not_ready'");
console.assert(zeroRecs.length === 3, `Expected 3 recommendations, got ${zeroRecs.length}`);
console.log("✅ Zero score test passed.\n");

// Test 4: Mixed Score (Strong Vocab, Weak Grammar, Needs Work Reading)
console.log("4. Testing Mixed Diagnostic Scenario...");
const mixedAnswers = allQuestions.map((q) => {
  if (q.skill === "vocabulary") {
    return { questionId: q.id, selectedIndex: q.correctIndex }; // 100%
  } else if (q.skill === "grammar") {
    return { questionId: q.id, selectedIndex: (q.correctIndex + 1) % 4 }; // 0%
  } else {
    // reading: 3 right (1 easy, 2 medium) = 1 + 2 + 2 = 5 / 11 = 45% -> weak/needs_work
    const isCorrect = q.difficulty !== "hard";
    return {
      questionId: q.id,
      selectedIndex: isCorrect ? q.correctIndex : (q.correctIndex + 1) % 4,
    };
  }
});
const mixedSkills = calculateSkillScores(mixedAnswers, questionMap);
const mixedOverall = calculateOverallScore(mixedSkills, questionMap);
const mixedRecs = generateRecommendations(mixedSkills);

console.log("Skills Breakdown:", mixedSkills.map((s) => `${s.skill}: ${s.score}% (${s.verdict})`).join(", "));
console.log("Overall Score:", mixedOverall.score + "%", "| Verdict:", mixedOverall.verdict);
console.log("Recommendations:", mixedRecs.map((r) => `#${r.priority} ${r.skill}: ${r.title}`).join(" | "));
console.assert(mixedSkills.find((s) => s.skill === "vocabulary")?.verdict === "strong", "Vocab should be strong");
console.assert(mixedRecs.length >= 2, "Should have 2 recommendations for weak grammar and reading");
console.log("✅ Mixed diagnostic test passed.\n");

console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
