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
          message: "No quiz data found. Please complete the readiness check first.",
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
      } catch {
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0b1f7a] text-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Globio
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[11px] font-semibold text-amber-300 border-amber-400/40 bg-amber-400/10 rounded-full"
            >
              Diagnostic Summary
            </Badge>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetake}
              className="rounded-full border-white/30 text-white bg-white/5 hover:bg-white/15 text-xs font-semibold"
            >
              Retake Check
            </Button>
            <Link href="/">
              <Button size="sm" variant="ghost" className="text-xs font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-full">
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
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#0b1f7a] border-t-transparent" />
            <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
              Evaluating your answers against Goethe A1 criteria...
            </p>
          </div>
        )}

        {/* Error State */}
        {pageState.status === "error" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <span className="text-5xl">📋</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Readiness Check Required</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm">{pageState.message}</p>
            <div className="flex gap-3 mt-4">
              <Link href="/quiz">
                <Button className="bg-[#0b1f7a] hover:bg-[#0e2a9c] text-white font-bold rounded-xl px-6">
                  Take Free Check Now →
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="rounded-xl">
                  Go to Home
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Success State */}
        {pageState.status === "success" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
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

            {/* Section 5: Globio Platform Upskill Banner */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#081754] via-[#0b1f7a] to-[#0e2a9c] text-white shadow-xl text-center space-y-3 relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                  Turn Weak Areas Into Passing Scores
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Prepare for Goethe & telc with Globio
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                  Join Globio&apos;s Fastrack German courses: 24/7 AI-guided speaking practice, writing corrections, mock exams, and complete immigration & job placement support to Germany.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.globio.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 rounded-full shadow-lg shadow-amber-500/25"
                    >
                      Explore Globio Courses ↗
                    </Button>
                  </a>
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-8">
              <Button
                onClick={handleRetake}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full border-slate-200 dark:border-slate-800 font-semibold"
              >
                🔄 Retake Readiness Check
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-semibold text-slate-600 dark:text-slate-300"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Globio A1 German Exam Readiness Checker · Diagnostic Self-Assessment · Aligned with Goethe/ÖSD Standards</p>
      </footer>
    </div>
  );
}
