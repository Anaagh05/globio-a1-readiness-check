import type { SkillResult } from "@/lib/types";

interface SkillRadialChartProps {
  skills: SkillResult[];
}

const skillColorConfig = {
  vocabulary: {
    stroke: "stroke-blue-500",
    track: "stroke-blue-100 dark:stroke-blue-950",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-white dark:bg-slate-900",
    border: "border-slate-200/80 dark:border-slate-800 hover:border-blue-300",
    label: "Vocabulary",
    german: "Wortschatz",
    icon: "📖",
  },
  grammar: {
    stroke: "stroke-purple-500",
    track: "stroke-purple-100 dark:stroke-purple-950",
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-white dark:bg-slate-900",
    border: "border-slate-200/80 dark:border-slate-800 hover:border-purple-300",
    label: "Grammar",
    german: "Grammatik",
    icon: "⚙️",
  },
  reading: {
    stroke: "stroke-emerald-500",
    track: "stroke-emerald-100 dark:stroke-emerald-950",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-white dark:bg-slate-900",
    border: "border-slate-200/80 dark:border-slate-800 hover:border-emerald-300",
    label: "Reading",
    german: "Leseverstehen",
    icon: "🔍",
  },
};

const verdictBadge = {
  strong: {
    label: "Strong",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  },
  needs_work: {
    label: "Needs Work",
    class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  },
  weak: {
    label: "Weak Area",
    class: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
  },
};

function RadialChart({
  score,
  strokeClass,
  trackClass,
}: {
  score: number;
  strokeClass: string;
  trackClass: string;
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const displayScore = Math.max(score, 2); // min 2% for visual clarity
  const strokeDashoffset =
    circumference - (displayScore / 100) * circumference;

  return (
    <svg
      className="w-28 h-28 sm:w-32 sm:h-32 -rotate-90"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="8"
        className={trackClass}
      />
      {/* Score arc */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className={`${strokeClass} transition-all duration-700 ease-out`}
      />
    </svg>
  );
}

export function SkillRadialChart({ skills }: SkillRadialChartProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {skills.map((skill) => {
        const config = skillColorConfig[skill.skill];
        const badge = verdictBadge[skill.verdict];

        return (
          <div
            key={skill.skill}
            className={`flex flex-col items-center gap-3.5 rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-200 ${config.bg} ${config.border}`}
          >
            {/* Radial + score overlay */}
            <div className="relative flex items-center justify-center">
              <RadialChart
                score={skill.score}
                strokeClass={config.stroke}
                trackClass={config.track}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl sm:text-3xl font-black ${config.text}`}>
                  {skill.score}%
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {skill.correct}/{skill.total}
                </span>
              </div>
            </div>

            {/* Skill label */}
            <div className="text-center space-y-0.5">
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {config.german}
              </div>
            </div>

            {/* Verdict pill */}
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.class}`}
            >
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
