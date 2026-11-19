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
    <Card className="w-full shadow-sm border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="space-y-4 p-5 sm:p-7 pb-4">
        {/* Top meta badge & weight */}
        <div className="flex items-center justify-between">
          <SkillBadge skill={question.skill} difficulty={question.difficulty} />
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {question.weight} {question.weight === 1 ? "point" : "points"}
          </span>
        </div>

        {/* Optional passage (reading questions) */}
        {question.passage && (
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 text-sm font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
            <div className="text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
              <span>📄</span>
              <span>Lesetext / German Reading Passage</span>
            </div>
            <div className="italic text-slate-700 dark:text-slate-300">
              {question.passage}
            </div>
          </div>
        )}

        {/* Question prompt */}
        <h2 className="text-lg sm:text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white pt-1">
          {question.prompt}
        </h2>
      </CardHeader>

      <CardContent className="p-5 sm:p-7 pt-2">
        <RadioGroup
          value={selectedIndex !== undefined ? String(selectedIndex) : ""}
          onValueChange={(val) => onSelectOption(Number(val))}
          className="space-y-3"
          aria-label={question.prompt}
        >
          {question.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <label
                key={idx}
                htmlFor={`option-${question.id}-${idx}`}
                className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all duration-150 min-h-[56px] select-none ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 shadow-xs"
                    : "border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <RadioGroupItem
                    value={String(idx)}
                    id={`option-${question.id}-${idx}`}
                    className="border-slate-300 text-emerald-600 focus-visible:ring-emerald-500"
                  />
                </div>

                <span
                  className={`inline-flex items-center justify-center size-7 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {optionLetters[idx]}
                </span>

                <span
                  className={`text-sm sm:text-base flex-1 ${
                    isSelected
                      ? "font-semibold text-emerald-950 dark:text-emerald-100"
                      : "text-slate-700 dark:text-slate-200"
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
