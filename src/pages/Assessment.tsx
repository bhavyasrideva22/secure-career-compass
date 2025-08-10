import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentQuestion } from '@/components/assessment/AssessmentQuestion';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { AssessmentAnswer } from '@/types/assessment';
import { AssessmentService } from '@/services/assessmentService';

export const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [startTime] = useState(new Date());

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === assessmentQuestions.length - 1;

  // Get current answer for the question
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleAnswer = (questionId: string, value: number | string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => 
          a.questionId === questionId 
            ? { ...a, value, timestamp: new Date() }
            : a
        );
      } else {
        return [...prev, { questionId, value, timestamp: new Date() }];
      }
    });
  };

  const handleNext = () => {
    if (isLast) {
      // Complete assessment
      completeAssessment();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const scores = AssessmentService.calculateScores(answers);
    const result = AssessmentService.generateResult(scores);
    
    // Store results and timing data
    const assessmentData = {
      result,
      answers,
      startTime,
      endTime: new Date(),
      duration: Date.now() - startTime.getTime()
    };
    
    localStorage.setItem('assessmentResult', JSON.stringify(assessmentData));
    navigate('/results');
  };

  // Auto-save progress
  useEffect(() => {
    localStorage.setItem('assessmentProgress', JSON.stringify({
      currentQuestionIndex,
      answers,
      startTime
    }));
  }, [currentQuestionIndex, answers, startTime]);

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('assessmentProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
      setAnswers(progress.answers || []);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <AssessmentQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={currentQuestionIndex}
        totalQuestions={assessmentQuestions.length}
        isFirst={isFirst}
        isLast={isLast}
        selectedValue={currentAnswer?.value}
      />
    </div>
  );
};