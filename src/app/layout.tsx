import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Globio — A1 German Exam Readiness Checker",
  description:
    "Check your readiness for the Goethe-Zertifikat A1 or ÖSD A1 exam across Vocabulary, Grammar, and Reading. Free 3-minute diagnostic test.",
  keywords: [
    "German A1",
    "Goethe Zertifikat A1",
    "ÖSD A1",
    "German exam readiness",
    "Globio",
    "German vocabulary",
    "German grammar",
  ],
  authors: [{ name: "Globio", url: "https://www.globio.ai" }],
  openGraph: {
    title: "Globio — A1 German Exam Readiness Checker",
    description:
      "Assess your readiness before booking your Goethe or ÖSD German exam. Get a skill-wise breakdown and actionable study tips.",
    url: "https://www.globio.ai",
    siteName: "Globio A1 Readiness Checker",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Globio — A1 German Exam Readiness Checker",
    description:
      "Check your Goethe or ÖSD German A1 readiness before booking your exam. 15 questions, instant breakdown.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
