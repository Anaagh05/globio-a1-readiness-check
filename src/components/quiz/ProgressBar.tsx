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
    <div className="w-full space-y-1.5">
      {/* Top labels */}
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-slate-600 dark:text-slate-400">
          Question <strong className="text-slate-900 dark:text-white font-bold">{currentNumber}</strong> of {totalQuestions}
        </span>
        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Main progress bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0b1f7a] via-[#1d4ed8] to-[#2563eb] transition-all duration-300 ease-out rounded-full shadow-xs"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Question ${currentNumber} of ${totalQuestions}`}
        />
      </div>

      {/* Skill section indicators */}
      <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-[10px] sm:text-[11px] font-semibold text-center">
        <div
          className={`py-1 px-1.5 rounded-md border transition-all ${
            currentSkill === "vocabulary"
              ? "bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950/70 dark:border-blue-600 dark:text-blue-200 shadow-xs font-bold"
              : currentIndex >= 5
              ? "bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 line-through opacity-70"
              : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          {currentIndex >= 5 ? "✓ " : ""}1–5 Vocabulary
        </div>
        <div
          className={`py-1 px-1.5 rounded-md border transition-all ${
            currentSkill === "grammar"
              ? "bg-purple-50 border-purple-400 text-purple-900 dark:bg-purple-950/70 dark:border-purple-600 dark:text-purple-200 shadow-xs font-bold"
              : currentIndex >= 10
              ? "bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 line-through opacity-70"
              : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          {currentIndex >= 10 ? "✓ " : ""}6–10 Grammar
        </div>
        <div
          className={`py-1 px-1.5 rounded-md border transition-all ${
            currentSkill === "reading"
              ? "bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/70 dark:border-emerald-600 dark:text-emerald-200 shadow-xs font-bold"
              : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          11–15 Reading
        </div>
      </div>
    </div>
  );
}
