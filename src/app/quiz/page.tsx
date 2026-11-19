import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { QuizRunner } from "@/components/quiz/QuizRunner";

export default function QuizPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0b1f7a] text-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Globio
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[11px] font-semibold text-amber-300 border-amber-400/40 bg-amber-400/10 rounded-full"
            >
              Goethe & ÖSD A1 Diagnostic
            </Badge>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-blue-100 hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-white/10"
          >
            <span>✕ Exit Check</span>
          </Link>
        </div>
      </header>

      {/* Main Runner Area */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        <QuizRunner />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>15 Questions · 3 Core Skills · Aligned with Goethe & ÖSD A1 Standards</p>
      </footer>
    </div>
  );
}
