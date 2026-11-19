import { Badge } from "@/components/ui/badge";
import type { Skill, Difficulty } from "@/lib/types";

interface SkillBadgeProps {
  skill: Skill;
  difficulty?: Difficulty;
}

const skillConfig: Record<
  Skill,
  { label: string; german: string; variant: "default" | "secondary" | "outline"; colorClass: string }
> = {
  vocabulary: {
    label: "Vocabulary",
    german: "Wortschatz",
    variant: "secondary",
    colorClass: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  grammar: {
    label: "Grammar",
    german: "Grammatik",
    variant: "secondary",
    colorClass: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
  },
  reading: {
    label: "Reading",
    german: "Leseverstehen",
    variant: "secondary",
    colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
};

const difficultyConfig: Record<Difficulty, { label: string; class: string }> = {
  easy: {
    label: "Easy",
    class: "text-zinc-500 border-zinc-200 dark:border-zinc-800",
  },
  medium: {
    label: "Medium",
    class: "text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-800",
  },
  hard: {
    label: "Hard",
    class: "text-rose-600 border-rose-200 dark:text-rose-400 dark:border-rose-800",
  },
};

export function SkillBadge({ skill, difficulty }: SkillBadgeProps) {
  const config = skillConfig[skill];
  const diff = difficulty ? difficultyConfig[difficulty] : null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${config.colorClass}`}
      >
        <span>{config.label}</span>
        <span className="text-[10px] opacity-75 font-normal">({config.german})</span>
      </span>

      {diff && (
        <Badge variant="outline" className={`text-[11px] ${diff.class}`}>
          {diff.label}
        </Badge>
      )}
    </div>
  );
}

