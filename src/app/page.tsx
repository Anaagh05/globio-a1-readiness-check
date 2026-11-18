import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-primary">
              globio<span className="text-emerald-500">.ai</span>
            </span>
            <Badge variant="outline" className="text-xs">
              A1 Readiness Check
            </Badge>
          </div>
          <Link href="/quiz">
            <Button size="sm">Start Check</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl flex flex-col items-center justify-center text-center">
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
          🇩🇪 Goethe-Zertifikat & ÖSD A1 Diagnostic
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl">
          Know If You&apos;re Ready Before You Book Your Exam
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Don&apos;t risk your exam fee or migration timeline. Take a quick 10–15 question check across Vocabulary, Grammar, and Reading to get your skill-by-skill readiness breakdown.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/quiz">
            <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12">
              Start Readiness Check →
            </Button>
          </Link>
          <a
            href="https://www.globio.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12">
              Learn about Globio
            </Button>
          </a>
        </div>

        {/* 3 Pillars Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full text-left">
          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2" variant="secondary">Skill 1</Badge>
              <CardTitle className="text-lg">Vocabulary</CardTitle>
              <CardDescription>
                Core A1 words, everyday topics, family, food, and daily life contexts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2" variant="secondary">Skill 2</Badge>
              <CardTitle className="text-lg">Grammar</CardTitle>
              <CardDescription>
                Sentence order (V2), Nominativ/Akkusativ cases, and essential verb forms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2" variant="secondary">Skill 3</Badge>
              <CardTitle className="text-lg">Reading Comprehension</CardTitle>
              <CardDescription>
                Authentic short notices, emails, and announcements in exam format.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Built for Globio A1 German Learners · Free & Open Diagnostic</p>
      </footer>
    </div>
  );
}
