import { useState } from 'react';
import { Question } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AssessmentQuestionProps {
  question: Question;
  onAnswer: (questionId: string, value: number | string) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalQuestions: number;
  isFirst: boolean;
  isLast: boolean;
  selectedValue?: number | string;
}

export const AssessmentQuestion = ({
  question,
  onAnswer,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  isFirst,
  isLast,
  selectedValue
}: AssessmentQuestionProps) => {
  const [localValue, setLocalValue] = useState<number | string>(selectedValue || '');

  const handleValueChange = (value: string) => {
    setLocalValue(value);
    onAnswer(question.id, question.type === 'likert' ? parseInt(value) : value);
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'psychometric':
        return 'bg-gradient-to-r from-blue-500 to-purple-600';
      case 'technical':
        return 'bg-gradient-to-r from-green-500 to-teal-600';
      case 'domain':
        return 'bg-gradient-to-r from-orange-500 to-red-600';
      case 'wiscar':
        return 'bg-gradient-to-r from-purple-500 to-pink-600';
      default:
        return 'bg-primary';
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'psychometric':
        return '🧠';
      case 'technical':
        return '⚙️';
      case 'domain':
        return '☁️';
      case 'wiscar':
        return '📊';
      default:
        return '❓';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-slide-up">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Section Badge */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2",
          getSectionColor(question.section)
        )}>
          <span>{getSectionIcon(question.section)}</span>
          {question.section.charAt(0).toUpperCase() + question.section.slice(1)}
        </div>
        <div className="text-sm text-muted-foreground">
          {question.category}
        </div>
      </div>

      {/* Question Card */}
      <Card className="shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-2xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {question.options && (
            <RadioGroup
              value={localValue.toString()}
              onValueChange={handleValueChange}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-muted/50",
                    localValue.toString() === index.toString()
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleValueChange(index.toString())}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className="text-primary"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 text-base cursor-pointer leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirst}
              size="lg"
            >
              Previous
            </Button>
            <Button
              variant={isLast ? "success" : "default"}
              onClick={onNext}
              disabled={!localValue && localValue !== 0}
              size="lg"
              className="min-w-32"
            >
              {isLast ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};