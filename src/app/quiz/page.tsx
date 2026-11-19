import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { QuizRunner } from "@/components/quiz/QuizRunner";

export default function QuizPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-primary">
              globio<span className="text-emerald-500">.ai</span>
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex text-xs">
              Goethe & ÖSD A1 Diagnostic
            </Badge>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕ Exit Quiz
          </Link>
        </div>
      </header>

      {/* Main Runner Area */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        <QuizRunner />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        <p>15 Questions · 3 Core Skills · Globio A1 Diagnostic</p>
      </footer>
    </div>
  );
}
