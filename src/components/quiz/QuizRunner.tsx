"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const handleSubmit = async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);
    submit();

    // Store answers in sessionStorage for evaluation in Phase 4
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
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <p className="text-muted-foreground">Loading readiness check...</p>
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

      {/* Current Question Card with fade transition */}
      <div className="transition-opacity duration-150 ease-in-out">
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
          className="px-5 min-w-[90px]"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-2">
          {!isLast ? (
            <Button
              onClick={next}
              disabled={!hasAnsweredCurrent || isSubmitting}
              className="px-6 min-w-[100px] font-semibold"
            >
              Next Question →
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className="px-6 min-w-[130px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            >
              {isSubmitting ? "Submitting..." : "Submit Check ✓"}
            </Button>
          )}
        </div>
      </div>

      {/* Helper reminder if option not selected */}
      {!hasAnsweredCurrent && (
        <p className="text-center text-xs text-muted-foreground italic">
          Select an option above to proceed to the next question.
        </p>
      )}
    </div>
  );
}

