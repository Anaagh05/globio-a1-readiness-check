"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { clientQuestions } from "@/data/questions/client";
import type { ClientQuestion, QuizState } from "@/lib/types";

interface QuizContextValue {
  state: QuizState;
  currentQuestion: ClientQuestion | undefined;
  currentAnswer: number | undefined;
  totalQuestions: number;
  answeredCount: number;
  allAnswered: boolean;
  isFirst: boolean;
  isLast: boolean;
  hasAnsweredCurrent: boolean;
  start: () => void;
  next: () => void;
  prev: () => void;
  submit: () => void;
  reset: () => void;
  selectAnswer: (questionId: string, selectedIndex: number) => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const quiz = useQuiz(clientQuestions);

  return (
    <QuizContext.Provider value={quiz}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}
