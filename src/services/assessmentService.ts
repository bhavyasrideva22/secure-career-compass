import { AssessmentAnswer, AssessmentScore, AssessmentResult, CareerPath, LearningStage } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';

export class AssessmentService {
  static calculateScores(answers: AssessmentAnswer[]): AssessmentScore {
    const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
    
    // Initialize scores
    const scores = {
      psychometric: 0,
      technical: 0,
      domain: 0,
      wiscar: {
        will: 0,
        interest: 0,
        skill: 0,
        cognition: 0,
        ability: 0,
        realWorldFit: 0
      },
      overall: 0
    };

    // Calculate section scores
    const sectionTotals = { psychometric: 0, technical: 0, domain: 0, wiscar: 0 };
    const sectionWeights = { psychometric: 0, technical: 0, domain: 0, wiscar: 0 };
    
    const wiscarTotals = {
      will: 0, interest: 0, skill: 0, cognition: 0, ability: 0, realWorldFit: 0
    };
    const wiscarWeights = {
      will: 0, interest: 0, skill: 0, cognition: 0, ability: 0, realWorldFit: 0
    };

    assessmentQuestions.forEach(question => {
      const answer = answerMap.get(question.id);
      if (answer !== undefined) {
        let normalizedScore = 0;
        
        if (typeof answer === 'number') {
          // For likert scales, normalize to 0-100
          normalizedScore = (answer / (question.options!.length - 1)) * 100;
        } else {
          // For multiple choice, convert to number and normalize
          const answerIndex = parseInt(answer.toString());
          normalizedScore = (answerIndex / (question.options!.length - 1)) * 100;
        }

        const weightedScore = normalizedScore * question.weight;

        if (question.section === 'wiscar' && question.trait) {
          const trait = question.trait as keyof typeof wiscarTotals;
          wiscarTotals[trait] += weightedScore;
          wiscarWeights[trait] += question.weight;
        } else {
          sectionTotals[question.section] += weightedScore;
          sectionWeights[question.section] += question.weight;
        }
      }
    });

    // Calculate final scores
    scores.psychometric = sectionWeights.psychometric > 0 ? sectionTotals.psychometric / sectionWeights.psychometric : 0;
    scores.technical = sectionWeights.technical > 0 ? sectionTotals.technical / sectionWeights.technical : 0;
    scores.domain = sectionWeights.domain > 0 ? sectionTotals.domain / sectionWeights.domain : 0;

    // Calculate WISCAR scores
    Object.keys(wiscarTotals).forEach(trait => {
      const key = trait as keyof typeof wiscarTotals;
      scores.wiscar[key] = wiscarWeights[key] > 0 ? wiscarTotals[key] / wiscarWeights[key] : 0;
    });

    // Calculate overall score (weighted average)
    const overallWeights = {
      psychometric: 0.3,
      technical: 0.25,
      domain: 0.25,
      wiscar: 0.2
    };

    const wiscarAverage = Object.values(scores.wiscar).reduce((sum, score) => sum + score, 0) / 6;
    
    scores.overall = (
      scores.psychometric * overallWeights.psychometric +
      scores.technical * overallWeights.technical +
      scores.domain * overallWeights.domain +
      wiscarAverage * overallWeights.wiscar
    );

    return scores;
  }

  static generateResult(scores: AssessmentScore): AssessmentResult {
    const confidenceScore = scores.overall;
    
    let recommendation: AssessmentResult['recommendation'];
    if (confidenceScore >= 85) {
      recommendation = 'strongly-recommended';
    } else if (confidenceScore >= 65) {
      recommendation = 'recommended';
    } else if (confidenceScore >= 50) {
      recommendation = 'consider-alternatives';
    } else {
      recommendation = 'not-recommended';
    }

    const insights = this.generateInsights(scores);
    const careerPaths = this.getCareerPaths(scores);
    const learningPath = this.getLearningPath(scores);
    const nextSteps = this.getNextSteps(recommendation, scores);

    return {
      scores,
      recommendation,
      confidenceScore,
      insights,
      careerPaths,
      learningPath,
      nextSteps
    };
  }

  private static generateInsights(scores: AssessmentScore): string[] {
    const insights: string[] = [];

    // Psychometric insights
    if (scores.psychometric >= 80) {
      insights.push("Your personality traits and motivation strongly align with cloud security roles.");
    } else if (scores.psychometric >= 60) {
      insights.push("You show good potential for cloud security, with some areas for personal development.");
    } else {
      insights.push("Consider developing stress management and analytical thinking skills for security roles.");
    }

    // Technical insights
    if (scores.technical >= 80) {
      insights.push("Your technical foundation is strong for advanced cloud security topics.");
    } else if (scores.technical >= 60) {
      insights.push("Brush up on networking and Linux fundamentals before diving into cloud security.");
    } else {
      insights.push("Start with foundational IT courses before pursuing cloud security specialization.");
    }

    // Domain insights
    if (scores.domain >= 80) {
      insights.push("You demonstrate solid understanding of cloud security concepts and practices.");
    } else if (scores.domain >= 60) {
      insights.push("Focus on cloud provider security services and compliance frameworks.");
    } else {
      insights.push("Begin with cloud computing basics before tackling security-specific topics.");
    }

    // WISCAR insights
    const wiscarAvg = Object.values(scores.wiscar).reduce((sum, score) => sum + score, 0) / 6;
    if (wiscarAvg >= 75) {
      insights.push("Your learning profile shows excellent readiness for skill development in this field.");
    } else if (wiscarAvg >= 60) {
      insights.push("You have good learning potential with focused effort on skill building.");
    } else {
      insights.push("Consider developing better study habits and seeking mentorship in your learning journey.");
    }

    return insights;
  }

  private static getCareerPaths(scores: AssessmentScore): CareerPath[] {
    const paths: CareerPath[] = [
      {
        title: "Cloud Security Engineer",
        description: "Designs and implements security controls for cloud infrastructure and applications.",
        skillGaps: scores.technical < 70 ? ["Cloud architecture", "Infrastructure as Code"] : [],
        alignment: (scores.technical + scores.domain + scores.wiscar.skill) / 3
      },
      {
        title: "Security Operations Center (SOC) Analyst - Cloud Focus",
        description: "Monitors and responds to security incidents in cloud environments.",
        skillGaps: scores.domain < 70 ? ["SIEM tools", "Log analysis", "Incident response"] : [],
        alignment: (scores.psychometric + scores.domain + scores.wiscar.will) / 3
      },
      {
        title: "Cloud Security Architect",
        description: "Designs secure cloud architectures and develops security policies and standards.",
        skillGaps: scores.overall < 80 ? ["Enterprise architecture", "Risk assessment", "Strategic thinking"] : [],
        alignment: (scores.domain + scores.wiscar.cognition + scores.wiscar.realWorldFit) / 3
      },
      {
        title: "DevSecOps Specialist",
        description: "Integrates security practices into CI/CD pipelines and development workflows.",
        skillGaps: scores.technical < 75 ? ["Scripting", "Automation tools", "Container security"] : [],
        alignment: (scores.technical + scores.wiscar.ability + scores.wiscar.skill) / 3
      }
    ];

    return paths.sort((a, b) => b.alignment - a.alignment);
  }

  private static getLearningPath(scores: AssessmentScore): LearningStage[] {
    const stages: LearningStage[] = [];

    if (scores.overall < 60) {
      stages.push({
        stage: 'beginner',
        topics: ['Cloud computing fundamentals', 'Networking basics', 'Linux command line', 'Basic cybersecurity concepts'],
        tools: ['AWS Free Tier', 'Linux virtual machines', 'Network simulation tools'],
        certifications: ['AWS Cloud Practitioner', 'CompTIA Network+', 'CompTIA Security+'],
        duration: '3-6 months'
      });
    }

    if (scores.overall >= 40) {
      stages.push({
        stage: 'intermediate',
        topics: ['Cloud security architecture', 'Identity and Access Management', 'Encryption and key management', 'Compliance frameworks'],
        tools: ['AWS IAM', 'Azure Security Center', 'Terraform', 'CloudFormation'],
        certifications: ['AWS Certified Security - Specialty', 'Azure Security Engineer', 'CISSP'],
        duration: '6-12 months'
      });
    }

    if (scores.overall >= 70) {
      stages.push({
        stage: 'advanced',
        topics: ['Advanced threat detection', 'Security automation', 'Incident response', 'Cloud forensics'],
        tools: ['AWS GuardDuty', 'Splunk', 'Kubernetes security', 'Infrastructure as Code security'],
        certifications: ['GCLD', 'CISSP', 'SABSA', 'OSCP Cloud'],
        duration: '12+ months'
      });
    }

    return stages;
  }

  private static getNextSteps(recommendation: AssessmentResult['recommendation'], scores: AssessmentScore): string[] {
    const steps: string[] = [];

    switch (recommendation) {
      case 'strongly-recommended':
        steps.push("Enroll in advanced cloud security certification programs");
        steps.push("Start building hands-on projects in cloud security");
        steps.push("Join cloud security communities and forums");
        steps.push("Consider specialized training in your preferred cloud platform");
        break;

      case 'recommended':
        steps.push("Strengthen your foundational knowledge in identified weak areas");
        steps.push("Complete a cloud security bootcamp or structured course");
        steps.push("Get hands-on experience with cloud security tools");
        steps.push("Network with cloud security professionals");
        break;

      case 'consider-alternatives':
        steps.push("Explore related fields like general IT security or network administration");
        steps.push("Improve technical skills through online courses and practice");
        steps.push("Consider mentorship or guided learning programs");
        steps.push("Reassess after 6 months of focused preparation");
        break;

      case 'not-recommended':
        steps.push("Focus on building fundamental IT and networking skills first");
        steps.push("Explore alternative technology career paths");
        steps.push("Consider roles in IT support or system administration");
        steps.push("Develop analytical and problem-solving skills");
        break;
    }

    return steps;
  }
}