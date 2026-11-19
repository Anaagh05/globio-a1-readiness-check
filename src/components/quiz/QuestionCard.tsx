"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SkillBadge } from "./SkillBadge";
import type { ClientQuestion } from "@/lib/types";

interface QuestionCardProps {
  question: ClientQuestion;
  selectedIndex: number | undefined;
  onSelectOption: (index: number) => void;
}

const optionLetters = ["A", "B", "C", "D"];

export function QuestionCard({
  question,
  selectedIndex,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <Card className="w-full shadow-sm border">
      <CardHeader className="space-y-3 pb-4">
        {/* Top meta badge */}
        <div className="flex items-center justify-between">
          <SkillBadge skill={question.skill} difficulty={question.difficulty} />
          <span className="text-xs font-mono text-muted-foreground">
            Weight: {question.weight} {question.weight === 1 ? "pt" : "pts"}
          </span>
        </div>

        {/* Optional passage (reading questions) */}
        {question.passage && (
          <div className="rounded-lg bg-muted/60 border border-muted p-4 text-sm font-medium leading-relaxed whitespace-pre-line text-foreground/90">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 flex items-center gap-1">
              <span>📄 Lesetext / Text Passage</span>
            </div>
            {question.passage}
          </div>
        )}

        {/* Question prompt */}
        <h2 className="text-lg sm:text-xl font-bold leading-snug tracking-tight text-foreground">
          {question.prompt}
        </h2>
      </CardHeader>

      <CardContent className="pt-2">
        <RadioGroup
          value={selectedIndex !== undefined ? String(selectedIndex) : ""}
          onValueChange={(val) => onSelectOption(Number(val))}
          className="space-y-2.5"
          aria-label={question.prompt}
        >
          {question.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <label
                key={idx}
                htmlFor={`option-${question.id}-${idx}`}
                className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all min-h-[52px] select-none ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-xs"
                    : "border-border hover:bg-accent/50 hover:border-border/80"
                }`}
              >
                <div className="flex items-center justify-center">
                  <RadioGroupItem
                    value={String(idx)}
                    id={`option-${question.id}-${idx}`}
                  />
                </div>

                <span
                  className={`inline-flex items-center justify-center size-6 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {optionLetters[idx]}
                </span>

                <span
                  className={`text-sm sm:text-base flex-1 ${
                    isSelected ? "font-semibold text-foreground" : "text-foreground/90"
                  }`}
                >
                  {option}
                </span>
              </label>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
