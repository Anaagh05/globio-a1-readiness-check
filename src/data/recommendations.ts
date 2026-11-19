import type { Skill } from "@/lib/types";

interface RecommendationRule {
  title: string;
  description: string;
}

type VerdictLevel = "weak" | "needs_work";

/**
 * Static recommendation rules keyed by skill and verdict.
 * The recommendation engine picks the top 2–3 weakest skills
 * and maps them to these rules.
 */
export const recommendationRules: Record<
  Skill,
  Record<VerdictLevel, RecommendationRule>
> = {
  vocabulary: {
    weak: {
      title: "Build your core A1 vocabulary",
      description:
        "Focus on the 500 most common German words. Use flashcards daily covering topics: family, food, travel, work, and daily routines. Pay special attention to noun genders (der/die/das) — they appear in every exam section.",
    },
    needs_work: {
      title: "Sharpen tricky vocabulary",
      description:
        "You know the basics, but watch out for false friends and compound nouns (like Fahrkarte, Handschuh). Review word genders for the nouns you're unsure about — getting the article right matters on the exam.",
    },
  },
  grammar: {
    weak: {
      title: "Master A1 grammar fundamentals",
      description:
        "Focus on: present tense conjugation (especially irregular verbs), Akkusativ vs. Nominativ, Verb-Second (V2) word order, and separable verbs. These are tested heavily in the Goethe A1 exam. Practise by writing short sentences daily.",
    },
    needs_work: {
      title: "Tighten your grammar accuracy",
      description:
        "Review Perfekt tense (haben/sein + Partizip II), prepositions with Akkusativ/Dativ, and modal verbs (können, müssen, möchten). Try rewriting short sentences and checking your word order — the exam penalises small mistakes.",
    },
  },
  reading: {
    weak: {
      title: "Practise reading short German texts",
      description:
        "Start with simple notices, emails, signs, and ads — the kind you'll see on the exam. Read slowly, underline key words, and practise extracting who/what/when/where. Don't try to understand every word; focus on the question being asked.",
    },
    needs_work: {
      title: "Improve reading speed and accuracy",
      description:
        "You can read German, but practise under timed conditions. Focus on skimming for specific information — the exam rewards finding answers quickly, not reading every word. Pay attention to dates, prices, and conditions in notices and ads.",
    },
  },
};

/** Skill ordering used as a tiebreaker when scores are equal */
export const SKILL_PRIORITY_ORDER: Skill[] = [
  "grammar",
  "reading",
  "vocabulary",
];

