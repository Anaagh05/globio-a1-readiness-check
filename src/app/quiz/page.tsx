import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function QuizPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-primary">
            globio<span className="text-emerald-500">.ai</span>
          </Link>
          <Badge variant="outline">Quiz Section</Badge>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl flex flex-col justify-center">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Phase 1 Placeholder</Badge>
              <span className="text-sm text-muted-foreground">Question 1 of 15</span>
            </div>
            <CardTitle className="text-xl mt-2">A1 Readiness Quiz</CardTitle>
            <CardDescription>
              The quiz UI components and state engine will be connected in Phase 3.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Questions covering Vocabulary, Grammar, and Reading are being prepared in Phase 2.
            </p>
            <div className="flex justify-between pt-4">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link href="/results">
                <Button>Preview Results Page →</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

