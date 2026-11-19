import type { SkillResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ScoreBreakdownProps {
  skills: SkillResult[];
  overallScore: number;
}

const verdictConfig = {
  strong: { label: "Strong", class: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300" },
  needs_work: { label: "Needs Work", class: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300" },
  weak: { label: "Weak", class: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300" },
};

const skillLabels = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
};

export function ScoreBreakdown({ skills, overallScore }: ScoreBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Skill</span>
            <span className="text-center">Score</span>
            <span className="text-center">Correct</span>
            <span className="text-right">Verdict</span>
          </div>

          <Separator />

          {/* Skill rows */}
          {skills.map((skill) => {
            const badge = verdictConfig[skill.verdict];
            return (
              <div key={skill.skill}>
                <div className="grid grid-cols-4 gap-2 py-3 items-center text-sm">
                  <span className="font-semibold">{skillLabels[skill.skill]}</span>
                  <span className="text-center font-bold font-mono">{skill.score}%</span>
                  <span className="text-center text-muted-foreground font-mono">
                    {skill.correct}/{skill.total}
                  </span>
                  <div className="flex justify-end">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.class}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
                <Separator />
              </div>
            );
          })}

          {/* Overall total row */}
          <div className="grid grid-cols-4 gap-2 pt-3 items-center text-sm">
            <span className="font-bold">Overall</span>
            <span className="text-center font-black font-mono text-base">{overallScore}%</span>
            <span className="text-center text-muted-foreground font-mono">
              {skills.reduce((s, sk) => s + sk.correct, 0)}/{skills.reduce((s, sk) => s + sk.total, 0)}
            </span>
            <span />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
