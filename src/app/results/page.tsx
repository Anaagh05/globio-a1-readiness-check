import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-primary">
            globio<span className="text-emerald-500">.ai</span>
          </Link>
          <Badge variant="outline">Evaluation Summary</Badge>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl flex flex-col gap-6">
        <Card className="text-center p-6">
          <CardHeader>
            <Badge className="mx-auto w-fit mb-2" variant="secondary">
              Phase 1 Placeholder
            </Badge>
            <CardTitle className="text-2xl">Exam Readiness Results</CardTitle>
            <CardDescription>
              Detailed breakdown across Vocabulary, Grammar, Reading, and 2–3 actionable recommendations will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4 pt-4">
            <Link href="/quiz">
              <Button variant="outline">Retake Check</Button>
            </Link>
            <Link href="/">
              <Button>Home</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

