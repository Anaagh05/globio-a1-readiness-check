import type { Recommendation } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const skillIcon = {
  vocabulary: "📖",
  grammar: "⚙️",
  reading: "🔍",
};

const priorityBadges = [
  { label: "#1 Priority", class: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800" },
  { label: "#2 Priority", class: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800" },
  { label: "#3 Priority", class: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800" },
];

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <Card className="rounded-2xl border-emerald-200 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/30">
        <CardContent className="pt-8 pb-8 text-center space-y-3">
          <span className="text-5xl">🎉</span>
          <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-200">
            No Critical Weak Areas Detected!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Outstanding! You demonstrated solid competency across Vocabulary, Grammar, and Reading. You are ready to book your Goethe or ÖSD A1 exam slot.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎯</span>
          <span>What to Practise Before Booking</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Based on your error patterns
        </span>
      </div>

      <div className="space-y-3.5">
        {recommendations.map((rec) => {
          const badge = priorityBadges[rec.priority - 1] || priorityBadges[0];
          return (
            <Card
              key={rec.priority}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex items-center gap-2 sm:flex-col sm:items-start shrink-0">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge.class}`}
                  >
                    {badge.label}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    <span>{skillIcon[rec.skill]}</span>
                    <span>{rec.skill}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
