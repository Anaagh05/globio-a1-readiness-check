import type { Question } from "@/lib/types";

export const vocabularyQuestions: Question[] = [
  // ── Easy (weight 1) ──────────────────────────────────────────
  {
    id: "vocab-01",
    skill: "vocabulary",
    difficulty: "easy",
    weight: 1,
    prompt: `Was bedeutet „Entschuldigung"?`,
    options: ["Thank you", "Excuse me / Sorry", "Goodbye", "Please"],
    correctIndex: 1,
    explanation:
      `„Entschuldigung" means 'Excuse me' or 'Sorry'. It's one of the most common polite expressions in everyday German — used when apologising, getting attention, or asking someone to repeat something.`,
  },
  {
    id: "vocab-02",
    skill: "vocabulary",
    difficulty: "easy",
    weight: 1,
    prompt: `Welches Wort passt? „Ich trinke gerne ___."`,
    options: ["Brot", "Kaffee", "Stuhl", "Schule"],
    correctIndex: 1,
    explanation:
      `„Kaffee" (coffee) is the only drinkable item. „Brot" is bread, „Stuhl" is chair, and „Schule" is school. The verb „trinken" (to drink) requires a beverage.`,
  },

  // ── Medium (weight 2) ────────────────────────────────────────
  {
    id: "vocab-03",
    skill: "vocabulary",
    difficulty: "medium",
    weight: 2,
    prompt: `Was ist das Gegenteil von „billig"?`,
    options: ["schnell", "teuer", "klein", "alt"],
    correctIndex: 1,
    explanation:
      `„teuer" (expensive) is the opposite of „billig" (cheap). „schnell" means fast, „klein" means small, and „alt" means old. Knowing antonym pairs is important for the A1 exam.`,
  },
  {
    id: "vocab-04",
    skill: "vocabulary",
    difficulty: "medium",
    weight: 2,
    prompt: `Welcher Artikel ist richtig? „___ Hund ist groß."`,
    options: ["Die", "Das", "Der", "Ein"],
    correctIndex: 2,
    explanation:
      `„Hund" (dog) is a masculine noun, so it takes the definite article „Der" in the Nominativ case. Learning the gender of common nouns (der/die/das) is essential for A1.`,
  },

  // ── Hard (weight 3) ──────────────────────────────────────────
  {
    id: "vocab-05",
    skill: "vocabulary",
    difficulty: "hard",
    weight: 3,
    prompt: `Was bedeutet „die Fahrkarte"?`,
    options: [
      "Driver's licence",
      "Travel ticket (for bus, train, etc.)",
      "Credit card",
      "Parking lot",
    ],
    correctIndex: 1,
    explanation:
      `„die Fahrkarte" is a compound noun: „fahren" (to travel/drive) + „Karte" (card/ticket). It means a travel ticket for public transport. Compound nouns are very common in German and appear frequently on the A1 exam.`,
  },
];
