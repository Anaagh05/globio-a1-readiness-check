import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { QuizRunner } from "@/components/quiz/QuizRunner";

export default function QuizPage() {
  return (
    <div className="h-screen max-h-screen flex flex-col justify-between overflow-y-auto lg:overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Compact Top Header */}
      <header className="border-b border-white/10 bg-[#0b1f7a] text-white sticky top-0 z-50 shadow-sm shrink-0">
        <div className="container mx-auto px-4 h-13 flex items-center justify-between max-w-3xl">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-extrabold text-xl tracking-tight text-white">
              Globio
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] font-semibold text-amber-300 border-amber-400/40 bg-amber-400/10 rounded-full py-0.5 px-2"
            >
              Goethe & ÖSD A1 Diagnostic
            </Badge>
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-blue-100 hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-white/10"
          >
            <span>✕ Exit Check</span>
          </Link>
        </div>
      </header>

      {/* Main Runner Area: centered and fit to viewport */}
      <main className="flex-1 container mx-auto px-4 py-2 sm:py-4 flex flex-col justify-center max-w-2xl w-full">
        <QuizRunner />
      </main>

      {/* Minimal Bottom Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-1.5 text-center text-[11px] text-slate-400 shrink-0">
        <p>15 Questions · 3 Core Skills · Official Goethe & ÖSD A1 Standards</p>
      </footer>
    </div>
  );
}
