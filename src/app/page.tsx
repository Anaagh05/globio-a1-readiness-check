import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-primary">
              globio<span className="text-emerald-500">.ai</span>
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex text-xs font-normal">
              A1 Diagnostic
            </Badge>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              Globio Courses
            </a>
            <Link href="/quiz">
              <Button size="sm" className="font-semibold rounded-lg">
                Start Check
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 container mx-auto px-4 max-w-5xl">
        <Hero />
        <FeatureCards />

        {/* Why Take This Check Banner */}
        <section className="my-12 p-6 sm:p-8 rounded-2xl bg-muted/40 border text-center max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Avoid Wasted Exam Fees & Application Delays
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Official A1 certification is mandatory for spouse visas, vocational training (Ausbildung), and German study visas. Taking this diagnostic pinpoints your exact weak areas before you register.
          </p>
          <div className="mt-6">
            <Link href="/quiz">
              <Button size="lg" className="px-8 font-semibold rounded-xl">
                Take the Free Check Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs sm:text-sm text-muted-foreground">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Globio A1 German Exam Readiness Checker</p>
          <div className="flex gap-4">
            <Link href="/quiz" className="hover:underline">
              Readiness Quiz
            </Link>
            <a
              href="https://www.globio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Globio.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
