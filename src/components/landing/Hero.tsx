import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-10 sm:py-18">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="aspect-[1100/400] w-[68rem] bg-gradient-to-tr from-emerald-400/20 via-teal-300/15 to-transparent opacity-80" />
      </div>

      {/* Pill badge with live status dot */}
      <Badge
        variant="outline"
        className="mb-6 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide gap-2 rounded-full border-emerald-200 bg-emerald-50/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
        </span>
        <span>🇩🇪 Goethe-Zertifikat & ÖSD A1 Diagnostic</span>
      </Badge>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
        Are you truly ready for your{" "}
        <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
          A1 German Exam?
        </span>
      </h1>

      {/* Value Proposition */}
      <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
        Many learners book their exam prematurely and fail, losing up to{" "}
        <strong className="text-slate-900 dark:text-white">₹10,000+ (€120)</strong> and delaying their move to Germany. Take this{" "}
        <span className="font-semibold text-emerald-700 dark:text-emerald-400">3-minute diagnostic check</span> to evaluate your Vocabulary, Grammar, and Reading before booking.
      </p>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
        <Link href="/quiz" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto text-base px-8 h-13 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            Start 15-Question Check →
          </Button>
        </Link>
        <a
          href="https://www.globio.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base h-13 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Explore Globio Platform ↗
          </Button>
        </a>
      </div>

      {/* Reassurance pills */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span className="flex items-center justify-center size-4 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">✓</span>
          <span>15 Curated Exam Questions</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="flex items-center justify-center size-4 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">✓</span>
          <span>3 Core Skill Breakdowns</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="flex items-center justify-center size-4 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">✓</span>
          <span>2–3 Priority Practice Areas</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="flex items-center justify-center size-4 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">✓</span>
          <span>100% Free & No Sign-up</span>
        </span>
      </div>
    </div>
  );
}
