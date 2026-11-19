import type { Recommendation } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const skillIcon = {
  vocabulary: "📚",
  grammar: "⚙️",
  reading: "🔍",
};

const priorityColors = [
  "bg-rose-500 text-white",       // Priority 1
  "bg-amber-500 text-white",      // Priority 2
  "bg-blue-500 text-white",       // Priority 3
];

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30">
        <CardContent className="pt-6 text-center space-y-2">
          <span className="text-4xl">🎉</span>
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
            No Weak Areas Found!
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Congratulations! You scored strong across all three skills. You&apos;re ready to register for your Goethe or ÖSD A1 exam.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <span>🎯</span>
        <span>What to Practise Before Booking</span>
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Card key={rec.priority} className="overflow-hidden">
            <div className="flex">
              {/* Priority indicator */}
              <div
                className={`flex items-center justify-center w-12 sm:w-14 shrink-0 text-lg font-black ${
                  priorityColors[rec.priority - 1] || "bg-zinc-500 text-white"
                }`}
              >
                #{rec.priority}
              </div>

              <div className="flex-1 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span>{skillIcon[rec.skill]}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {rec.skill}
                  </span>
                </div>
                <h4 className="font-bold text-base mb-1.5">{rec.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
