import { Progress } from "@/components/ui/progress";
import type { Skill } from "@/lib/types";

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  currentSkill: Skill;
}

export function ProgressBar({
  currentIndex,
  totalQuestions,
  currentSkill,
}: ProgressBarProps) {
  const currentNumber = currentIndex + 1;
  const progressPercent = Math.round((currentNumber / totalQuestions) * 100);

  return (
    <div className="w-full space-y-2">
      {/* Top labels */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
        <span className="text-muted-foreground">
          Question <strong className="text-foreground">{currentNumber}</strong> of {totalQuestions}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Main progress bar */}
      <Progress
        value={progressPercent}
        className="h-2.5 transition-all"
        aria-label={`Question ${currentNumber} of ${totalQuestions}`}
      />

      {/* Skill section indicators */}
      <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-medium text-center">
        <div
          className={`py-1 rounded border transition-colors ${
            currentSkill === "vocabulary"
              ? "bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-300 font-semibold"
              : currentIndex >= 5
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-transparent"
              : "text-muted-foreground border-transparent"
          }`}
        >
          1–5 Vocabulary
        </div>
        <div
          className={`py-1 rounded border transition-colors ${
            currentSkill === "grammar"
              ? "bg-purple-500/10 border-purple-500/40 text-purple-700 dark:text-purple-300 font-semibold"
              : currentIndex >= 10
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-transparent"
              : "text-muted-foreground border-transparent"
          }`}
        >
          6–10 Grammar
        </div>
        <div
          className={`py-1 rounded border transition-colors ${
            currentSkill === "reading"
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold"
              : "text-muted-foreground border-transparent"
          }`}
        >
          11–15 Reading
        </div>
      </div>
    </div>
  );
}
