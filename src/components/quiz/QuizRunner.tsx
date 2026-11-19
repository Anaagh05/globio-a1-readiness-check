"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { useQuiz } from "@/hooks/useQuiz";
import { clientQuestions } from "@/data/questions/client";

export function QuizRunner() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    state,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    isFirst,
    isLast,
    hasAnsweredCurrent,
    allAnswered,
    start,
    next,
    prev,
    submit,
    selectAnswer,
  } = useQuiz(clientQuestions);

  // Auto-start quiz on mount if not started
  useEffect(() => {
    if (state.status === "not_started") {
      start();
    }
  }, [state.status, start]);

  // Edge case 1.2.1: Beforeunload warning if in progress and answers exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state.status === "in_progress" && Object.keys(state.answers).length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state.status, state.answers]);

  const handleSubmit = useCallback(async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);
    submit();

    try {
      const answersPayload = Object.entries(state.answers).map(
        ([questionId, selectedIndex]) => ({
          questionId,
          selectedIndex,
        })
      );
      sessionStorage.setItem(
        "globio_quiz_submission",
        JSON.stringify({ answers: answersPayload, completedAt: Date.now() })
      );
    } catch (err) {
      console.warn("sessionStorage unavailable:", err);
    }

    router.push("/results");
  }, [allAnswered, isSubmitting, state.answers, submit, router]);

  // Accessibility: Keyboard navigation (1-4 or A-D to select, Enter to proceed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion || isSubmitting) return;

      const key = e.key.toLowerCase();
      const optionMap: Record<string, number> = {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      };

      if (key in optionMap) {
        e.preventDefault();
        selectAnswer(currentQuestion.id, optionMap[key]);
      } else if (e.key === "Enter") {
        if (isLast && allAnswered) {
          e.preventDefault();
          handleSubmit();
        } else if (!isLast && hasAnsweredCurrent) {
          e.preventDefault();
          next();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentQuestion,
    isSubmitting,
    isLast,
    allAnswered,
    hasAnsweredCurrent,
    selectAnswer,
    next,
    handleSubmit,
  ]);

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-emerald-600 border-t-transparent mb-3" />
        <p className="text-slate-500 font-medium text-sm">Preparing readiness check...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress section */}
      <ProgressBar
        currentIndex={state.currentIndex}
        totalQuestions={totalQuestions}
        currentSkill={currentQuestion.skill}
      />

      {/* Current Question Card with smooth fade transition */}
      <div
        key={currentQuestion.id}
        className="transition-all duration-200 animate-in fade-in-50 slide-in-from-bottom-2"
      >
        <QuestionCard
          question={currentQuestion}
          selectedIndex={currentAnswer}
          onSelectOption={(idx) => selectAnswer(currentQuestion.id, idx)}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          onClick={prev}
          disabled={isFirst || isSubmitting}
          className="px-5 h-11 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 min-w-[90px]"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-2">
          {!isLast ? (
            <Button
              onClick={next}
              disabled={!hasAnsweredCurrent || isSubmitting}
              className="px-6 h-11 rounded-xl min-w-[110px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 disabled:opacity-50"
            >
              Next Question →
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className="px-7 h-11 rounded-xl min-w-[140px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
            >
              {isSubmitting ? "Calculating..." : "Submit Check ✓"}
            </Button>
          )}
        </div>
      </div>

      {/* Helper reminder & keyboard shortcuts */}
      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 px-1">
        <span>
          {!hasAnsweredCurrent
            ? "Choose an answer to proceed."
            : "Press Enter ↵ to continue"}
        </span>
        <span className="hidden sm:inline font-mono opacity-80">
          Shortcut: 1–4 or A–D
        </span>
      </div>
    </div>
  );
}
