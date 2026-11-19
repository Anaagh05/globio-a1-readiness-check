import { Badge } from "@/components/ui/badge";
import type { Skill, Difficulty } from "@/lib/types";

interface SkillBadgeProps {
  skill: Skill;
  difficulty?: Difficulty;
}

const skillConfig: Record<
  Skill,
  { label: string; german: string; icon: string; colorClass: string }
> = {
  vocabulary: {
    label: "Vocabulary",
    german: "Wortschatz",
    icon: "📖",
    colorClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  grammar: {
    label: "Grammar",
    german: "Grammatik",
    icon: "⚙️",
    colorClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
  },
  reading: {
    label: "Reading",
    german: "Leseverstehen",
    icon: "🔍",
    colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
};

const difficultyConfig: Record<Difficulty, { label: string; class: string }> = {
  easy: {
    label: "Easy",
    class: "text-slate-500 bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800",
  },
  medium: {
    label: "Medium",
    class: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-800",
  },
  hard: {
    label: "Exam Standard",
    class: "text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-800",
  },
};

export function SkillBadge({ skill, difficulty }: SkillBadgeProps) {
  const config = skillConfig[skill];
  const diff = difficulty ? difficultyConfig[difficulty] : null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.colorClass}`}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
        <span className="text-[11px] opacity-75 font-normal">({config.german})</span>
      </span>

      {diff && (
        <Badge variant="outline" className={`text-[11px] rounded-full px-2.5 py-0.5 font-medium ${diff.class}`}>
          {diff.label}
        </Badge>
      )}
    </div>
  );
}
