import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    skill: "Vocabulary",
    german: "Wortschatz",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    icon: "📚",
    title: "Essential A1 Lexicon",
    description:
      "Tests core everyday words: food, family, transport, time, directions, and noun genders (der/die/das).",
  },
  {
    skill: "Grammar",
    german: "Grammatik",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    icon: "⚙️",
    title: "Sentence Structure & Rules",
    description:
      "Evaluates Verb-Second (V2) positioning, Akkusativ cases, Perfekt auxiliary verbs, and modal constructions.",
  },
  {
    skill: "Reading",
    german: "Leseverstehen",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    icon: "🔍",
    title: "Authentic German Texts",
    description:
      "Assesses your ability to extract critical details from real-life emails, signboards, event notices, and ads.",
  },
];

export function FeatureCards() {
  return (
    <div className="w-full py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          What the Readiness Check Covers
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
          Aligned directly with the Goethe-Institut and ÖSD A1 examination formats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature) => (
          <Card
            key={feature.skill}
            className="border transition-all hover:shadow-md hover:border-foreground/20"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{feature.icon}</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${feature.badgeColor}`}
                >
                  {feature.skill}
                </span>
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
