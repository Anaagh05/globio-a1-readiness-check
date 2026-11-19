import type { EvaluateResponse } from "@/lib/types";

interface OverallVerdictProps {
  overall: EvaluateResponse["overall"];
}

const verdictConfig = {
  ready: {
    emoji: "✅",
    label: "Ready to Book!",
    subtitle: "You're well-prepared for the Goethe/ÖSD A1 exam.",
    bgClass: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
    textClass: "text-emerald-700 dark:text-emerald-300",
    scoreClass: "text-emerald-600 dark:text-emerald-400",
  },
  almost: {
    emoji: "⚠️",
    label: "Almost There!",
    subtitle: "A little more practice and you'll be exam-ready.",
    bgClass: "bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800",
    textClass: "text-amber-700 dark:text-amber-300",
    scoreClass: "text-amber-600 dark:text-amber-400",
  },
  not_ready: {
    emoji: "🔴",
    label: "Keep Practising",
    subtitle: "Focus on your weak areas before booking the exam.",
    bgClass: "bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800",
    textClass: "text-rose-700 dark:text-rose-300",
    scoreClass: "text-rose-600 dark:text-rose-400",
  },
};

export function OverallVerdict({ overall }: OverallVerdictProps) {
  const config = verdictConfig[overall.verdict];

  return (
    <div
      className={`rounded-2xl border-2 p-6 sm:p-10 text-center space-y-3 ${config.bgClass}`}
    >
      <span className="text-5xl sm:text-6xl">{config.emoji}</span>

      <div className={`text-5xl sm:text-7xl font-black tracking-tight ${config.scoreClass}`}>
        {overall.score}%
      </div>

      <h2 className={`text-2xl sm:text-3xl font-bold ${config.textClass}`}>
        {config.label}
      </h2>

      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
        {config.subtitle}
      </p>
    </div>
  );
}
