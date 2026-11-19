import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-8 sm:py-16">
      <Badge
        variant="secondary"
        className="mb-6 px-3.5 py-1 text-xs sm:text-sm font-semibold tracking-wide gap-1.5"
      >
        <span>🇩🇪</span>
        <span>Goethe-Zertifikat A1 & ÖSD A1 Diagnostic</span>
      </Badge>

      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
        Are you truly ready for your{" "}
        <span className="text-primary underline decoration-emerald-500/60 decoration-wavy decoration-2">
          A1 German Exam?
        </span>
      </h1>

      <p className="mt-5 text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Many learners book their exam prematurely and fail, losing money and delaying their German journey.
        Take this <strong>3-minute diagnostic check</strong> across Vocabulary, Grammar, and Reading to know where you stand.
      </p>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
        <Link href="/quiz" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto text-base px-8 h-13 rounded-xl shadow-md hover:shadow-lg transition-all"
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
            className="w-full sm:w-auto text-base h-13 rounded-xl"
          >
            Explore Globio Platform
          </Button>
        </a>
      </div>

      {/* Quick reassurance points */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 15 Questions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 3 Core Skills
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> Instant Actionable Feedback
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-bold">✓</span> 100% Free
        </span>
      </div>
    </div>
  );
}

