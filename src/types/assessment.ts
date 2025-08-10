export interface Question {
  id: string;
  section: 'psychometric' | 'technical' | 'domain' | 'wiscar';
  category: string;
  question: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'boolean';
  options?: string[];
  weight: number;
  trait?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentScore {
  psychometric: number;
  technical: number;
  domain: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognition: number;
    ability: number;
    realWorldFit: number;
  };
  overall: number;
}

export interface AssessmentResult {
  scores: AssessmentScore;
  recommendation: 'strongly-recommended' | 'recommended' | 'consider-alternatives' | 'not-recommended';
  confidenceScore: number;
  insights: string[];
  careerPaths: CareerPath[];
  learningPath: LearningStage[];
  nextSteps: string[];
}

export interface CareerPath {
  title: string;
  description: string;
  skillGaps: string[];
  alignment: number;
}

export interface LearningStage {
  stage: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  tools: string[];
  certifications: string[];
  duration: string;
}