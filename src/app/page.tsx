import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen lg:h-screen flex flex-col justify-between bg-[#0b1f7a] bg-gradient-to-br from-[#081754] via-[#0e2a9c] to-[#0a1e74] text-white overflow-x-hidden selection:bg-amber-300 selection:text-slate-950 relative">
      {/* Subtle dot matrix background pattern matching globio.ai */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Top Navigation */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-[#081754]/50">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-6xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
              Globio
            </span>
          </Link>

          {/* Center Navigation Links (Matching globio.ai screenshot) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-blue-100">
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              Learn German <span className="text-[10px] opacity-70">▾</span>
            </a>
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              Programs <span className="text-[10px] opacity-70">▾</span>
            </a>
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              Mock Tests <span className="text-[10px] opacity-70">▾</span>
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 transition-all hidden sm:inline-block"
            >
              Log in
            </a>
            <Link href="/quiz">
              <Button
                size="sm"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full px-5 py-2 text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all"
              >
                Start Check
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Single-Viewport Hero Section */}
      <main className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 max-w-6xl flex items-center py-6 sm:py-8 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Pill Tag with yellow bullet */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-blue-100 font-medium">
              <span className="text-amber-400 text-xs">●</span>
              <span>Goethe & ÖSD A1 Diagnostic — all under one roof</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Your Gateway <br />
              to <span className="text-amber-400">Germany</span>
            </h1>

            {/* Subtitle */}
            <div className="text-lg sm:text-xl font-bold tracking-tight">
              <span className="text-amber-400">A1 Exam Readiness</span>{" "}
              <span className="text-blue-100 font-normal">— starts here.</span>
            </div>

            {/* Concise Value Proposition */}
            <p className="text-sm sm:text-base text-blue-100/90 max-w-xl leading-relaxed">
              Don&apos;t risk losing ₹10,000+ (€120) and delaying your visa. Take this quick 3-minute diagnostic check across Vocabulary, Grammar, and Reading to know if you&apos;re ready before booking your official exam.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2 items-stretch sm:items-center">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-7 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-full text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Start Free Readiness Check →
                </Button>
              </Link>
              <a
                href="https://www.globio.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-6 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold backdrop-blur-xs"
                >
                  Explore Globio.ai ↗
                </Button>
              </a>
            </div>

            {/* Reassurance pills */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-blue-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">✓</span> 15 Exam Questions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">✓</span> 3 Core Skills Evaluated
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">✓</span> 100% Free · Instant Score
              </span>
            </div>
          </div>

          {/* Right Column: Sleek Card echoing Globio's registration card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-7 shadow-2xl border border-white/20 space-y-5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    A1 Diagnostic Check
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ⏱ ~3 Mins
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 pt-1 tracking-tight">
                  What You&apos;ll Discover
                </h3>
                <p className="text-xs text-slate-500">
                  Directly mapped to Goethe-Zertifikat & ÖSD A1 standards.
                </p>
              </div>

              {/* 3 Skill Breakdown rows */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📖</span>
                    <div>
                      <div className="font-bold text-slate-900">Vocabulary (Wortschatz)</div>
                      <div className="text-[11px] text-slate-500">Food, time, family, noun genders (der/die/das)</div>
                    </div>
                  </div>
                  <span className="font-bold text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded text-[11px]">
                    5 Qs
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">⚙️</span>
                    <div>
                      <div className="font-bold text-slate-900">Grammar (Grammatik)</div>
                      <div className="text-[11px] text-slate-500">V2 word order, Akkusativ, modal verbs, Perfekt</div>
                    </div>
                  </div>
                  <span className="font-bold text-purple-900 bg-purple-100/70 px-2 py-0.5 rounded text-[11px]">
                    5 Qs
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🔍</span>
                    <div>
                      <div className="font-bold text-slate-900">Reading (Leseverstehen)</div>
                      <div className="text-[11px] text-slate-500">Authentic notices, emails, signs, timetables</div>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                    5 Qs
                  </span>
                </div>
              </div>

              {/* Action Button inside card */}
              <div className="pt-1">
                <Link href="/quiz">
                  <Button
                    size="lg"
                    className="w-full h-12 bg-[#0b1f7a] hover:bg-[#0e2a9c] text-white font-bold rounded-xl text-sm shadow-md transition-all"
                  >
                    Take Readiness Check Now →
                  </Button>
                </Link>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  Instant skill breakdown & top 2–3 practice tips
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Bottom Footer */}
      <footer className="relative z-10 border-t border-white/10 py-3.5 text-xs text-blue-200/70">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p>© 2026 Globio · A1 German Exam Readiness Checker</p>
          <div className="flex items-center gap-4 text-blue-200/90 font-medium">
            <Link href="/quiz" className="hover:text-amber-400 transition-colors">
              Take Quiz
            </Link>
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Globio.ai Website ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
