import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      status: "ready",
      message: "Scoring API placeholder initialized (Phase 1). Full scoring engine in Phase 4.",
      receivedAnswersCount: Array.isArray(body?.answers) ? body.answers.length : 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Evaluate endpoint accepts POST requests only" },
    { status: 405 }
  );
}

