import type { ClientQuestion } from "@/lib/types";

/**
 * Client-safe questions — contains NO correctIndex and NO explanation.
 * This file is safely bundled to the browser.
 */
export const clientQuestions: ClientQuestion[] = [
  // ── Vocabulary (1–5) ──────────────────────────────────────────
  {
    id: "vocab-01",
    skill: "vocabulary",
    difficulty: "easy",
    weight: 1,
    prompt: `Was bedeutet „Entschuldigung"?`,
    options: ["Thank you", "Excuse me / Sorry", "Goodbye", "Please"],
  },
  {
    id: "vocab-02",
    skill: "vocabulary",
    difficulty: "easy",
    weight: 1,
    prompt: `Welches Wort passt? „Ich trinke gerne ___."`,
    options: ["Brot", "Kaffee", "Stuhl", "Schule"],
  },
  {
    id: "vocab-03",
    skill: "vocabulary",
    difficulty: "medium",
    weight: 2,
    prompt: `Was ist das Gegenteil von „billig"?`,
    options: ["schnell", "teuer", "klein", "alt"],
  },
  {
    id: "vocab-04",
    skill: "vocabulary",
    difficulty: "medium",
    weight: 2,
    prompt: `Welcher Artikel ist richtig? „___ Hund ist groß."`,
    options: ["Die", "Das", "Der", "Ein"],
  },
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
  },

  // ── Grammar (6–10) ────────────────────────────────────────────
  {
    id: "gram-01",
    skill: "grammar",
    difficulty: "easy",
    weight: 1,
    prompt: `Welche Form ist richtig? „Er ___ jeden Tag zur Schule."`,
    options: ["gehen", "geht", "gehe", "gehst"],
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
  },
  {
    id: "gram-03",
    skill: "grammar",
    difficulty: "medium",
    weight: 2,
    prompt: `Welche Form ist richtig? „Ich ___ gestern einen Film gesehen."`,
    options: ["bin", "habe", "hat", "sein"],
  },
  {
    id: "gram-04",
    skill: "grammar",
    difficulty: "medium",
    weight: 2,
    prompt: `Welche Präposition ist richtig? „Ich gehe ___ Supermarkt."`,
    options: ["in den", "in die", "in das", "auf den"],
  },
  {
    id: "gram-05",
    skill: "grammar",
    difficulty: "hard",
    weight: 3,
    prompt: `Welcher Satz ist richtig? „Ich ___ heute nicht arbeiten, weil ich krank ___."`,
    options: ["kann … bin", "könne … bin", "kann … bist", "können … ist"],
  },

  // ── Reading (11–15) ───────────────────────────────────────────
  {
    id: "read-01",
    skill: "reading",
    difficulty: "easy",
    weight: 1,
    prompt: "Was sagt das Schild?",
    passage: "Rauchen verboten!",
    options: ["Smoking is allowed here", "No smoking", "Fire exit", "No entry"],
  },
  {
    id: "read-02",
    skill: "reading",
    difficulty: "medium",
    weight: 2,
    prompt: "Was macht Frau Müller am Samstag?",
    passage:
      "Liebe Anna,\nam Samstag habe ich frei. Ich möchte mit dir in die Stadt gehen. Wir können zusammen Kaffee trinken und einkaufen gehen. Hast du Zeit?\nViele Grüße,\nFrau Müller",
    options: [
      "She is going to work",
      "She wants to go to the city with Anna",
      "She is visiting her family",
      "She is staying home to cook",
    ],
  },
  {
    id: "read-03",
    skill: "reading",
    difficulty: "medium",
    weight: 2,
    prompt: "Wann beginnt der Deutschkurs?",
    passage:
      "Sprachschule Berlin\nDeutschkurs A1 — Neue Klasse!\nStart: Montag, 3. März\nZeit: 9:00–12:00 Uhr\nOrt: Raum 204\nAnmeldung bis 25. Februar an info@sprachschule.de",
    options: [
      "25th February",
      "Every Monday at 9:00",
      "Monday, 3rd March",
      "It has already started",
    ],
  },
  {
    id: "read-04",
    skill: "reading",
    difficulty: "hard",
    weight: 3,
    prompt: "Warum kann Tom heute nicht kommen?",
    passage:
      "Hallo Lisa,\nes tut mir leid, aber ich kann heute Abend nicht zur Party kommen. Ich bin seit gestern krank und muss im Bett bleiben. Der Arzt sagt, ich soll drei Tage zu Hause bleiben. Vielleicht können wir nächste Woche zusammen Kaffee trinken?\nLiebe Grüße,\nTom",
    options: [
      "He has to work late",
      "He is sick and must stay in bed",
      "He forgot about the party",
      "He is travelling to another city",
    ],
  },
  {
    id: "read-05",
    skill: "reading",
    difficulty: "hard",
    weight: 3,
    prompt:
      "Was ist richtig? Lesen Sie die Anzeige und wählen Sie die korrekte Aussage.",
    passage:
      "Wohnung zu vermieten\n2 Zimmer, Küche, Bad\n45 m² — 580 € kalt + 120 € Nebenkosten\nAb sofort frei. Keine Haustiere.\nKontakt: Herr Schmidt, Tel. 030-55 48 90",
    options: [
      "The apartment costs 580 € including all utilities",
      "Pets are welcome in this apartment",
      "The total monthly rent is 700 € and pets are not allowed",
      "The apartment has three rooms",
    ],
  },
];
