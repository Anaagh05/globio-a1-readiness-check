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
    <Card className="w-full shadow-sm border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      <CardHeader className="space-y-2 p-3.5 sm:p-4 pb-2">
        {/* Top meta badge & weight */}
        <div className="flex items-center justify-between">
          <SkillBadge skill={question.skill} difficulty={question.difficulty} />
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {question.weight} {question.weight === 1 ? "pt" : "pts"}
          </span>
        </div>

        {/* Optional passage (reading questions) */}
        {question.passage && (
          <div className="rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-3 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
            <div className="text-[10px] uppercase tracking-wider text-blue-900 dark:text-blue-300 font-bold mb-1 flex items-center gap-1">
              <span>📄</span>
              <span>Lesetext / German Reading Passage</span>
            </div>
            <div className="italic text-slate-700 dark:text-slate-300">
              {question.passage}
            </div>
          </div>
        )}

        {/* Question prompt */}
        <h2 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
          {question.prompt}
        </h2>
      </CardHeader>

      <CardContent className="p-3.5 sm:p-4 pt-1">
        <RadioGroup
          value={selectedIndex !== undefined ? String(selectedIndex) : ""}
          onValueChange={(val) => onSelectOption(Number(val))}
          className="space-y-2"
          aria-label={question.prompt}
        >
          {question.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <label
                key={idx}
                htmlFor={`option-${question.id}-${idx}`}
                className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all duration-150 min-h-[44px] sm:min-h-[48px] select-none ${
                  isSelected
                    ? "border-[#0b1f7a] bg-blue-50/80 dark:bg-blue-950/50 ring-2 ring-[#0b1f7a]/20 shadow-xs"
                    : "border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <RadioGroupItem
                    value={String(idx)}
                    id={`option-${question.id}-${idx}`}
                    className="border-slate-300 text-[#0b1f7a] focus-visible:ring-[#0b1f7a]"
                  />
                </div>

                <span
                  className={`inline-flex items-center justify-center size-6 rounded-md text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#0b1f7a] text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {optionLetters[idx]}
                </span>

                <span
                  className={`text-xs sm:text-sm flex-1 leading-snug ${
                    isSelected
                      ? "font-semibold text-blue-950 dark:text-blue-100"
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
