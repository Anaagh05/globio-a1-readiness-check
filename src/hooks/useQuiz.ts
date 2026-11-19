"use client";

import { useReducer, useCallback } from "react";
import type { QuizState, QuizAction, ClientQuestion } from "@/lib/types";

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  startedAt: 0,
  status: "not_started",
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START":
      return {
        ...initialState,
        status: "in_progress",
        startedAt: Date.now(),
      };

    case "SELECT_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.selectedIndex,
        },
      };

    case "NEXT":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };

    case "PREV":
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };

    case "SUBMIT":
      return {
        ...state,
        status: "submitted",
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useQuiz(questions: ClientQuestion[]) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const totalQuestions = questions.length;
  const currentQuestion =
    state.currentIndex < totalQuestions
      ? questions[state.currentIndex]
      : undefined;

  const currentAnswer =
    currentQuestion != null
      ? state.answers[currentQuestion.id] ?? undefined
      : undefined;

  const answeredCount = Object.keys(state.answers).length;
  const allAnswered = answeredCount === totalQuestions;
  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === totalQuestions - 1;
  const hasAnsweredCurrent = currentAnswer !== undefined;

  const start = useCallback(() => dispatch({ type: "START" }), []);
  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const submit = useCallback(() => dispatch({ type: "SUBMIT" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const selectAnswer = useCallback(
    (questionId: string, selectedIndex: number) =>
      dispatch({ type: "SELECT_ANSWER", questionId, selectedIndex }),
    []
  );

  return {
    state,
    currentQuestion,
    currentAnswer,
    totalQuestions,
    answeredCount,
    allAnswered,
    isFirst,
    isLast,
    hasAnsweredCurrent,
    start,
    next,
    prev,
    submit,
    reset,
    selectAnswer,
  };
}

