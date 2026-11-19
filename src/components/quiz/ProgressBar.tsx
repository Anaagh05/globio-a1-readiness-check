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
    <div className="w-full space-y-3">
      {/* Top labels */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
        <span className="text-slate-600 dark:text-slate-400">
          Question <strong className="text-slate-900 dark:text-white font-bold">{currentNumber}</strong> of {totalQuestions}
        </span>
        <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Main progress bar with smooth transition */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out rounded-full shadow-xs"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Question ${currentNumber} of ${totalQuestions}`}
        />
      </div>

      {/* Skill section indicators */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-semibold text-center">
        <div
          className={`py-1.5 px-2 rounded-lg border transition-all ${
            currentSkill === "vocabulary"
              ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/60 dark:border-blue-700 dark:text-blue-300 shadow-xs"
              : currentIndex >= 5
              ? "bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 line-through opacity-70"
              : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          {currentIndex >= 5 ? "✓ " : ""}1–5 Vocabulary
        </div>
        <div
          className={`py-1.5 px-2 rounded-lg border transition-all ${
            currentSkill === "grammar"
              ? "bg-purple-50 border-purple-300 text-purple-700 dark:bg-purple-950/60 dark:border-purple-700 dark:text-purple-300 shadow-xs"
              : currentIndex >= 10
              ? "bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 line-through opacity-70"
              : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          {currentIndex >= 10 ? "✓ " : ""}6–10 Grammar
        </div>
        <div
          className={`py-1.5 px-2 rounded-lg border transition-all ${
            currentSkill === "reading"
              ? "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-700 dark:text-emerald-300 shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          11–15 Reading
        </div>
      </div>
    </div>
  );
}
