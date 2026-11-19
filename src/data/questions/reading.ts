import type { Question } from "@/lib/types";

export const readingQuestions: Question[] = [
  // ── Easy (weight 1) ──────────────────────────────────────────
  {
    id: "read-01",
    skill: "reading",
    difficulty: "easy",
    weight: 1,
    prompt: "Was sagt das Schild?",
    passage: "Rauchen verboten!",
    options: [
      "Smoking is allowed here",
      "No smoking",
      "Fire exit",
      "No entry",
    ],
    correctIndex: 1,
    explanation:
      `„Rauchen verboten" means 'Smoking forbidden / No smoking'. „Rauchen" = smoking, „verboten" = forbidden. Short public signs like this appear frequently in the Goethe A1 Lesen section.`,
  },

  // ── Medium (weight 2) ────────────────────────────────────────
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
    correctIndex: 1,
    explanation:
      `The email says „Ich möchte mit dir in die Stadt gehen" (I'd like to go into the city with you) and mentions drinking coffee and shopping. The key phrases are „mit dir" (with you) and „in die Stadt gehen" (go to the city).`,
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
    correctIndex: 2,
    explanation:
      `The notice clearly says „Start: Montag, 3. März". The 25th February is the registration deadline (Anmeldung bis), not the start date. Reading notices requires distinguishing dates and their purposes.`,
  },

  // ── Hard (weight 3) ──────────────────────────────────────────
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
    correctIndex: 1,
    explanation:
      `Tom writes „Ich bin seit gestern krank und muss im Bett bleiben" (I've been sick since yesterday and must stay in bed). The key vocabulary: „krank" (sick), „im Bett bleiben" (stay in bed), „der Arzt" (the doctor).`,
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
    correctIndex: 2,
    explanation:
      `The ad says 580 € kalt (cold rent, without utilities) + 120 € Nebenkosten (utilities) = 700 € total. „Keine Haustiere" means no pets. „2 Zimmer" means 2 rooms (not three). Understanding rental ads is a common A1 reading task.`,
  },
];
