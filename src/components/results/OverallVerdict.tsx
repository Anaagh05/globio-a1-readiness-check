import type { EvaluateResponse } from "@/lib/types";

interface OverallVerdictProps {
  overall: EvaluateResponse["overall"];
}

const verdictConfig = {
  ready: {
    emoji: "🎉",
    label: "Ready to Book!",
    badgeText: "High Pass Probability",
    subtitle: "Your German foundation meets official Goethe-Zertifikat and ÖSD A1 benchmarks. You are prepared to register for your exam slot.",
    bgClass: "bg-gradient-to-b from-blue-50/90 to-blue-100/40 border-blue-300 dark:from-blue-950/40 dark:to-blue-900/20 dark:border-blue-700 shadow-sm shadow-blue-500/5",
    textClass: "text-[#0b1f7a] dark:text-blue-200",
    scoreClass: "text-[#0b1f7a] dark:text-amber-400",
    badgeClass: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  almost: {
    emoji: "⚠️",
    label: "Almost There!",
    badgeText: "Needs Minor Revision",
    subtitle: "You're close to the passing threshold, but a few weak spots could cost you points. Review the recommendations below before booking.",
    bgClass: "bg-gradient-to-b from-amber-50/90 to-amber-100/40 border-amber-300 dark:from-amber-950/40 dark:to-amber-900/20 dark:border-amber-700 shadow-sm shadow-amber-500/5",
    textClass: "text-amber-900 dark:text-amber-200",
    scoreClass: "text-amber-600 dark:text-amber-400",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  not_ready: {
    emoji: "📚",
    label: "Keep Practising",
    badgeText: "High Retake Risk",
    subtitle: "Booking right now puts you at risk of failing and losing your exam fee. Focus on the core areas below for 2–3 weeks, then retake this check.",
    bgClass: "bg-gradient-to-b from-rose-50/90 to-rose-100/40 border-rose-300 dark:from-rose-950/40 dark:to-rose-900/20 dark:border-rose-700 shadow-sm shadow-rose-500/5",
    textClass: "text-rose-900 dark:text-rose-200",
    scoreClass: "text-rose-600 dark:text-rose-400",
    badgeClass: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  },
};

export function OverallVerdict({ overall }: OverallVerdictProps) {
  const config = verdictConfig[overall.verdict];

  return (
    <div
      className={`rounded-3xl border-2 p-7 sm:p-10 text-center space-y-4 ${config.bgClass}`}
    >
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs">
        <span className="text-base">{config.emoji}</span>
        <span className={config.badgeClass}>{config.badgeText}</span>
      </div>

      <div className="space-y-1">
        <div className={`text-6xl sm:text-7xl font-black tracking-tight ${config.scoreClass}`}>
          {overall.score}%
        </div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Weighted Readiness Score
        </div>
      </div>

      <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${config.textClass}`}>
        {config.label}
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
        {config.subtitle}
      </p>
    </div>
  );
}
