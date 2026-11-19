import type { SkillResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ScoreBreakdownProps {
  skills: SkillResult[];
  overallScore: number;
}

const verdictConfig = {
  strong: {
    label: "Strong",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  },
  needs_work: {
    label: "Needs Work",
    class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  },
  weak: {
    label: "Weak",
    class: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
  },
};

const skillLabels = {
  vocabulary: { title: "Vocabulary", german: "Wortschatz", icon: "📖" },
  grammar: { title: "Grammar", german: "Grammatik", icon: "⚙️" },
  reading: { title: "Reading", german: "Leseverstehen", icon: "🔍" },
};

export function ScoreBreakdown({ skills, overallScore }: ScoreBreakdownProps) {
  return (
    <Card className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📊</span>
          <span>Exam Skill Breakdown</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-2 pb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Skill</span>
            <span className="text-center">Score</span>
            <span className="text-center">Correct</span>
            <span className="text-right">Verdict</span>
          </div>

          <Separator className="bg-slate-100 dark:bg-slate-800" />

          {/* Skill rows */}
          {skills.map((skill) => {
            const badge = verdictConfig[skill.verdict];
            const info = skillLabels[skill.skill];
            return (
              <div key={skill.skill}>
                <div className="grid grid-cols-4 gap-2 py-3.5 items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{info.icon}</span>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {info.title}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {info.german}
                      </span>
                    </div>
                  </div>
                  <span className="text-center font-bold font-mono text-slate-800 dark:text-slate-200">
                    {skill.score}%
                  </span>
                  <span className="text-center text-slate-500 font-mono text-xs">
                    {skill.correct}/{skill.total}
                  </span>
                  <div className="flex justify-end">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.class}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                </div>
                <Separator className="bg-slate-100 dark:bg-slate-800" />
              </div>
            );
          })}

          {/* Overall total row */}
          <div className="grid grid-cols-4 gap-2 pt-4 items-center text-sm">
            <span className="font-extrabold text-slate-900 dark:text-white">Overall Readiness</span>
            <span className="text-center font-black font-mono text-base text-emerald-600 dark:text-emerald-400">
              {overallScore}%
            </span>
            <span className="text-center text-slate-500 font-mono text-xs">
              {skills.reduce((s, sk) => s + sk.correct, 0)}/{skills.reduce((s, sk) => s + sk.total, 0)} Total
            </span>
            <span />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
