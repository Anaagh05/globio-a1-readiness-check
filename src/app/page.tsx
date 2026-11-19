import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
              globio<span className="text-emerald-500 font-extrabold">.ai</span>
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
            >
              A1 Diagnostic
            </Badge>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors hidden sm:inline"
            >
              German Courses ↗
            </a>
            <Link href="/quiz">
              <Button
                size="sm"
                className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 shadow-sm shadow-emerald-600/20"
              >
                Start Free Check
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 container mx-auto px-4 max-w-5xl pb-16">
        <Hero />
        <FeatureCards />

        {/* Exam Risk & Fee Breakdown Callout */}
        <section className="my-10 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800">
                ⚠️ The Real Cost of Booking Too Early
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Don&apos;t Lose ₹10,000+ & 60 Days on an Exam Retake
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Official Goethe-Zertifikat A1 slots fill up months in advance across India. If you score below 60%, you forfeit the exam fee and must wait for the next open registration window, putting your visa or Ausbildung timeline on hold.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span> Know your exact score today
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span> Find weak grammar/vocab patterns
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span> Book only when 100% confident
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 h-13 font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20"
                >
                  Take 3-Min Check Free →
                </Button>
              </Link>
              <span className="text-[11px] text-slate-400 mt-2 font-medium">
                No credit card · Instant evaluation
              </span>
            </div>
          </div>
        </section>

        {/* Globio Advantage Section */}
        <section className="my-14 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              The Pathway to Germany
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Why Indian Learners Learn German with Globio
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
              Globio connects structured A1–B2 German training with direct career pathways and relocation assistance to Germany.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-2xl">🤖</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Speaking & Writing</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                24/7 AI tutor evaluates pronunciation, grammar, and exam formats with instant feedback.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-2xl">📚</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Physical Books Delivered</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Comprehensive study guides and workbooks for A1 to B2 shipped right to your home.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-2xl">🎯</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Goethe & telc Prep</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dedicated mock test series designed to maximize your pass rates on the first attempt.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-2xl">🇩🇪</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Germany Relocation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ausbildung placement, Chancenkarte support, and nursing/engineering career pathways.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 text-xs text-slate-500">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-black text-lg text-slate-900 dark:text-white">
              globio<span className="text-emerald-500">.ai</span>
            </div>
            <p>© 2026 Globio AI · German Exam Readiness Checker</p>
            <p className="text-[11px] text-slate-400">
              Diagnostic tool designed for self-assessment. Not officially affiliated with Goethe-Institut e.V. or ÖSD.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <Link href="/quiz" className="hover:text-emerald-600 transition-colors">
              Take Readiness Quiz
            </Link>
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors"
            >
              Globio.ai Website ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
