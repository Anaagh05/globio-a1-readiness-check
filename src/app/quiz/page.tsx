import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { QuizRunner } from "@/components/quiz/QuizRunner";

export default function QuizPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
              globio<span className="text-emerald-500 font-extrabold">.ai</span>
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
            >
              Goethe & ÖSD A1 Diagnostic
            </Badge>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
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
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>15 Questions · 3 Core Skills · Evaluated using Official Goethe/ÖSD Standards</p>
      </footer>
    </div>
  );
}
