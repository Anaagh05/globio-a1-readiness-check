"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OverallVerdict } from "@/components/results/OverallVerdict";
import { SkillRadialChart } from "@/components/results/SkillRadialChart";
import { ScoreBreakdown } from "@/components/results/ScoreBreakdown";
import { RecommendationList } from "@/components/results/RecommendationList";
import type { EvaluateResponse } from "@/lib/types";

type PageState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: EvaluateResponse };

export default function ResultsPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    async function evaluate() {
      // Read submission from sessionStorage
      let raw: string | null = null;
      try {
        raw = sessionStorage.getItem("globio_quiz_submission");
      } catch {
        // sessionStorage unavailable
      }

      if (!raw) {
        setPageState({
          status: "error",
          message: "No quiz data found. Please take the readiness check first.",
        });
        return;
      }

      let submission: { answers: { questionId: string; selectedIndex: number }[] };
      try {
        submission = JSON.parse(raw);
      } catch {
        setPageState({ status: "error", message: "Corrupted quiz data." });
        return;
      }

      // Call the evaluation API
      try {
        const res = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: submission.answers }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          setPageState({
            status: "error",
            message: (errBody as { error?: string }).error || `API error: ${res.status}`,
          });
          return;
        }

        const data: EvaluateResponse = await res.json();
        setPageState({ status: "success", data });
      } catch (err) {
        setPageState({
          status: "error",
          message: "Network error. Please check your connection and try again.",
        });
      }
    }

    evaluate();
  }, []);

  const handleRetake = () => {
    try {
      sessionStorage.removeItem("globio_quiz_submission");
    } catch {
      // ignore
    }
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-primary">
              globio<span className="text-emerald-500">.ai</span>
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex text-xs">
              Evaluation Summary
            </Badge>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRetake}>
              Retake Check
            </Button>
            <Link href="/">
              <Button size="sm" variant="ghost">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        {/* Loading State */}
        {pageState.status === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground text-sm font-medium">
              Evaluating your answers...
            </p>
          </div>
        )}

        {/* Error State */}
        {pageState.status === "error" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <span className="text-5xl">😕</span>
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="text-muted-foreground max-w-md">{pageState.message}</p>
            <div className="flex gap-3 mt-2">
              <Link href="/quiz">
                <Button>Take the Check</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Success State */}
        {pageState.status === "success" && (
          <div className="space-y-8">
            {/* Section 1: Overall Verdict */}
            <OverallVerdict overall={pageState.data.overall} />

            {/* Section 2: Skill Radial Charts */}
            <SkillRadialChart skills={pageState.data.skills} />

            {/* Section 3: Score Breakdown Table */}
            <ScoreBreakdown
              skills={pageState.data.skills}
              overallScore={pageState.data.overall.score}
            />

            {/* Section 4: Recommendations */}
            <RecommendationList recommendations={pageState.data.recommendations} />

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-8">
              <Button
                onClick={handleRetake}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                🔄 Retake Readiness Check
              </Button>
              <a
                href="https://www.globio.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Globio Courses →
                </Button>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <p>Globio A1 German Exam Readiness Checker · Diagnostic Only · Not an Official Exam</p>
      </footer>
    </div>
  );
}
