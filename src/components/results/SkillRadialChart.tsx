import type { SkillResult } from "@/lib/types";

interface SkillRadialChartProps {
  skills: SkillResult[];
}

const skillColorConfig = {
  vocabulary: {
    stroke: "stroke-blue-500",
    track: "stroke-blue-100 dark:stroke-blue-900/50",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    label: "Vocabulary",
    german: "Wortschatz",
  },
  grammar: {
    stroke: "stroke-purple-500",
    track: "stroke-purple-100 dark:stroke-purple-900/50",
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800",
    label: "Grammar",
    german: "Grammatik",
  },
  reading: {
    stroke: "stroke-emerald-500",
    track: "stroke-emerald-100 dark:stroke-emerald-900/50",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    label: "Reading",
    german: "Leseverstehen",
  },
};

const verdictBadge = {
  strong: { label: "Strong", class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300" },
  needs_work: { label: "Needs Work", class: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300" },
  weak: { label: "Weak", class: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300" },
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
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 sm:p-6 ${config.bg} ${config.border}`}
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
              </div>
            </div>

            {/* Skill label */}
            <div className="text-center space-y-1">
              <div className={`text-sm font-bold ${config.text}`}>
                {config.label}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {config.german}
              </div>
            </div>

            {/* Verdict + ratio */}
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.class}`}
              >
                {badge.label}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {skill.correct}/{skill.total}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
