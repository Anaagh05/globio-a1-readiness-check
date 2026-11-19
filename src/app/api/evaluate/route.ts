import { NextResponse } from "next/server";
import { allQuestions, questionMap } from "@/data/questions/index";
import { calculateSkillScores, calculateOverallScore } from "@/lib/scoring";
import { generateRecommendations } from "@/lib/recommendations";
import type { EvaluateRequest, EvaluateResponse, QuestionResult } from "@/lib/types";

export async function POST(request: Request) {
  // ── Parse request body ────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // ── Validate structure ────────────────────────────────────────
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 }
    );
  }

  const { answers } = body as EvaluateRequest;

  if (!Array.isArray(answers)) {
    return NextResponse.json(
      { error: "answers must be an array" },
      { status: 400 }
    );
  }

  if (answers.length !== allQuestions.length) {
    return NextResponse.json(
      {
        error: `Expected exactly ${allQuestions.length} answers, received ${answers.length}`,
      },
      { status: 400 }
    );
  }

  // ── Validate each answer ──────────────────────────────────────
  const seenIds = new Set<string>();

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];

    if (!answer || typeof answer !== "object") {
      return NextResponse.json(
        { error: `answers[${i}] must be an object` },
        { status: 400 }
      );
    }

    if (typeof answer.questionId !== "string") {
      return NextResponse.json(
        { error: `answers[${i}].questionId must be a string` },
        { status: 400 }
      );
    }

    if (!questionMap.has(answer.questionId)) {
      return NextResponse.json(
        { error: `Unknown questionId: "${answer.questionId}"` },
        { status: 400 }
      );
    }

    if (seenIds.has(answer.questionId)) {
      return NextResponse.json(
        { error: `Duplicate questionId: "${answer.questionId}"` },
        { status: 400 }
      );
    }
    seenIds.add(answer.questionId);

    if (
      typeof answer.selectedIndex !== "number" ||
      !Number.isInteger(answer.selectedIndex) ||
      answer.selectedIndex < 0 ||
      answer.selectedIndex > 3
    ) {
      return NextResponse.json(
        {
          error: `answers[${i}].selectedIndex must be an integer 0–3`,
        },
        { status: 400 }
      );
    }
  }

  // ── Scoring ───────────────────────────────────────────────────
  try {
    const skillResults = calculateSkillScores(answers, questionMap);
    const overall = calculateOverallScore(skillResults, questionMap);
    const recommendations = generateRecommendations(skillResults);

    // Per-question results (for review)
    const questionResults: QuestionResult[] = answers.map((answer) => {
      const question = questionMap.get(answer.questionId)!;
      return {
        questionId: answer.questionId,
        correct: answer.selectedIndex === question.correctIndex,
        explanation: question.explanation,
      };
    });

    const response: EvaluateResponse = {
      overall,
      skills: skillResults,
      recommendations,
      questionResults,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Scoring error:", err);
    return NextResponse.json(
      { error: "Internal server error during evaluation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST with { answers: [...] }" },
    { status: 405 }
  );
}
