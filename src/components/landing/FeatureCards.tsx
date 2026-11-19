import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    skill: "Vocabulary",
    german: "Wortschatz",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900",
    iconBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    icon: "📖",
    title: "Essential A1 Lexicon",
    description:
      "Tests everyday A1 vocabulary: food, transport, numbers, professions, calendar terms, and noun genders (der, die, das).",
    examFocus: "5 Questions · 10 Points",
  },
  {
    skill: "Grammar",
    german: "Grammatik",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-900",
    iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    icon: "⚙️",
    title: "Sentence Structure & Cases",
    description:
      "Evaluates core grammar pillars: Verb-Second (V2) word order, Akkusativ direct objects, Perfekt auxiliary verbs, and modal verbs.",
    examFocus: "5 Questions · 10 Points",
  },
  {
    skill: "Reading",
    german: "Leseverstehen",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900",
    iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    icon: "🔍",
    title: "Authentic German Texts",
    description:
      "Assesses reading comprehension with authentic emails, public signboards, event notices, train schedules, and business notices.",
    examFocus: "5 Questions · 10 Points",
  },
];

export function FeatureCards() {
  return (
    <div className="w-full py-10">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Official Exam Standards
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1.5">
          What the Readiness Check Measures
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
          Built according to Goethe-Institut and ÖSD A1 Common European Framework of Reference (CEFR) guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature) => (
          <Card
            key={feature.skill}
            className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-1 transition-all duration-200 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-emerald-300 dark:hover:border-emerald-800 hover:-translate-y-0.5"
          >
            <CardHeader className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div className={`size-11 rounded-xl flex items-center justify-center text-xl shadow-xs ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${feature.badgeColor}`}
                >
                  {feature.skill} ({feature.german})
                </span>
              </div>

              <div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-2">
                  {feature.description}
                </CardDescription>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{feature.examFocus}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Included in Check →
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
