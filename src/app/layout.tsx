import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Globio — A1 German Exam Readiness Checker",
  description:
    "Check your readiness for the Goethe or ÖSD A1 German exam across Vocabulary, Grammar, and Reading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
