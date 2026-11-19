import type { Question } from "@/lib/types";

export const grammarQuestions: Question[] = [
  // ── Easy (weight 1) ──────────────────────────────────────────
  {
    id: "gram-01",
    skill: "grammar",
    difficulty: "easy",
    weight: 1,
    prompt: `Welche Form ist richtig? „Er ___ jeden Tag zur Schule."`,
    options: ["gehen", "geht", "gehe", "gehst"],
    correctIndex: 1,
    explanation:
      `The subject is „er" (he), which takes the third-person singular form: „geht". Present tense conjugation: ich gehe, du gehst, er/sie/es geht, wir gehen, ihr geht, sie gehen.`,
  },
  {
    id: "gram-02",
    skill: "grammar",
    difficulty: "easy",
    weight: 1,
    prompt: "Welcher Satz ist richtig?",
    options: [
      "Ich morgen gehe einkaufen.",
      "Morgen ich gehe einkaufen.",
      "Morgen gehe ich einkaufen.",
      "Gehe ich morgen einkaufen.",
    ],
    correctIndex: 2,
    explanation:
      `German follows Verb-Second (V2) word order in statements. When a time expression like „Morgen" comes first, the conjugated verb „gehe" must be in position 2, followed by the subject „ich".`,
  },

  // ── Medium (weight 2) ────────────────────────────────────────
  {
    id: "gram-03",
    skill: "grammar",
    difficulty: "medium",
    weight: 2,
    prompt: `Welche Form ist richtig? „Ich ___ gestern einen Film gesehen."`,
    options: ["bin", "habe", "hat", "sein"],
    correctIndex: 1,
    explanation:
      `„sehen" (to see) forms the Perfekt tense with „haben": „Ich habe … gesehen." Most transitive verbs use „haben". Verbs of movement or state change (gehen, kommen, fahren) use „sein".`,
  },
  {
    id: "gram-04",
    skill: "grammar",
    difficulty: "medium",
    weight: 2,
    prompt: `Welche Präposition ist richtig? „Ich gehe ___ Supermarkt."`,
    options: ["in den", "in die", "in das", "auf den"],
    correctIndex: 0,
    explanation:
      `„Supermarkt" is masculine (der Supermarkt). With the verb „gehen" indicating direction (Akkusativ), „in" + der becomes „in den". Knowing which case a preposition triggers is key for A1.`,
  },

  // ── Hard (weight 3) ──────────────────────────────────────────
  {
    id: "gram-05",
    skill: "grammar",
    difficulty: "hard",
    weight: 3,
    prompt:
      `Welcher Satz ist richtig? „Ich ___ heute nicht arbeiten, weil ich krank ___."`,
    options: [
      "kann … bin",
      "könne … bin",
      "kann … bist",
      "können … ist",
    ],
    correctIndex: 0,
    explanation:
      `„Ich kann" is the correct first-person form of the modal verb „können". In the „weil"-clause, the subject „ich" takes „bin" (I am). Modal verb conjugation and subordinate clause structure are tested at the upper end of A1.`,
  },
];
