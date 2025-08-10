import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'interest-1',
    section: 'psychometric',
    category: 'Interest Scale',
    question: 'How excited are you about the prospect of securing cloud applications and networks?',
    type: 'likert',
    options: ['Not at all excited', 'Slightly excited', 'Moderately excited', 'Very excited', 'Extremely excited'],
    weight: 1.5,
    trait: 'interest'
  },
  {
    id: 'interest-2',
    section: 'psychometric',
    category: 'Interest Scale',
    question: 'How interested are you in staying updated with the latest cybersecurity threats and trends?',
    type: 'likert',
    options: ['Not interested', 'Slightly interested', 'Moderately interested', 'Very interested', 'Extremely interested'],
    weight: 1.3,
    trait: 'interest'
  },
  {
    id: 'interest-3',
    section: 'psychometric',
    category: 'Interest Scale',
    question: 'How much do you enjoy solving complex security puzzles and investigating incidents?',
    type: 'likert',
    options: ['Not at all', 'A little', 'Somewhat', 'Quite a bit', 'A great deal'],
    weight: 1.4,
    trait: 'interest'
  },

  // Personality Fit - Big 5 Traits
  {
    id: 'personality-1',
    section: 'psychometric',
    category: 'Personality Fit',
    question: 'You are working on a critical security incident at 2 AM. The pressure is high and stakeholders are asking for updates. How do you typically respond?',
    type: 'scenario',
    options: [
      'I feel overwhelmed and struggle to think clearly under pressure',
      'I feel stressed but can still function adequately',
      'I remain calm and focused, working methodically through the problem',
      'I thrive under pressure and perform at my best during crises'
    ],
    weight: 2.0,
    trait: 'emotional_stability'
  },
  {
    id: 'personality-2',
    section: 'psychometric',
    category: 'Personality Fit',
    question: 'How do you typically approach learning about new cloud security technologies?',
    type: 'multiple-choice',
    options: [
      'I prefer structured courses and step-by-step guides',
      'I like to experiment and learn through hands-on practice',
      'I enjoy reading documentation and research papers',
      'I prefer learning from colleagues and community forums'
    ],
    weight: 1.8,
    trait: 'openness'
  },
  {
    id: 'personality-3',
    section: 'psychometric',
    category: 'Personality Fit',
    question: 'When implementing security policies, how important is attention to detail to you?',
    type: 'likert',
    options: ['Not important', 'Slightly important', 'Moderately important', 'Very important', 'Extremely important'],
    weight: 2.2,
    trait: 'conscientiousness'
  },

  // Motivation Drivers
  {
    id: 'motivation-1',
    section: 'psychometric',
    category: 'Motivation Drivers',
    question: 'What primarily motivates you to pursue a career in cloud security?',
    type: 'multiple-choice',
    options: [
      'High salary potential and job security',
      'The intellectual challenge of protecting digital assets',
      'Making a positive impact on society and protecting people',
      'Career advancement opportunities and prestige'
    ],
    weight: 1.6,
    trait: 'motivation'
  },
  {
    id: 'motivation-2',
    section: 'psychometric',
    category: 'Motivation Drivers',
    question: 'How important is continuous learning and skill development to you in your career?',
    type: 'likert',
    options: ['Not important', 'Slightly important', 'Moderately important', 'Very important', 'Extremely important'],
    weight: 1.7,
    trait: 'growth_mindset'
  },

  // Cognitive Preferences
  {
    id: 'cognitive-1',
    section: 'psychometric',
    category: 'Cognitive Preferences',
    question: 'Do you prefer solving well-defined security problems with clear procedures, or exploring undefined threats that require creative investigation?',
    type: 'multiple-choice',
    options: [
      'I strongly prefer well-defined problems with clear procedures',
      'I somewhat prefer structured problems',
      'I enjoy both equally',
      'I somewhat prefer exploring undefined problems',
      'I strongly prefer creative investigation of undefined threats'
    ],
    weight: 1.5,
    trait: 'cognitive_style'
  },

  // Resilience & Grit
  {
    id: 'grit-1',
    section: 'psychometric',
    category: 'Resilience & Grit',
    question: 'How do you handle setbacks when working on complex security projects?',
    type: 'scenario',
    options: [
      'I often feel discouraged and consider giving up',
      'I feel frustrated but usually push through',
      'I view setbacks as learning opportunities',
      'I become more determined and focused when facing challenges'
    ],
    weight: 2.1,
    trait: 'grit'
  },
  {
    id: 'grit-2',
    section: 'psychometric',
    category: 'Resilience & Grit',
    question: 'When facing a security incident that takes weeks to resolve, how do you maintain focus?',
    type: 'multiple-choice',
    options: [
      'I struggle to maintain focus over long periods',
      'I need frequent breaks and support to stay engaged',
      'I can maintain steady focus with occasional motivation',
      'I naturally sustain focus and energy throughout long projects'
    ],
    weight: 1.9,
    trait: 'persistence'
  },

  // Technical & Aptitude Section
  {
    id: 'aptitude-1',
    section: 'technical',
    category: 'General Aptitude',
    question: 'If A is greater than B, and B is greater than C, and you know that C equals 10 and A equals 15, what can you conclude about B?',
    type: 'multiple-choice',
    options: [
      'B must be exactly 12.5',
      'B must be between 10 and 15 (exclusive)',
      'B could be any number greater than 10',
      'There is insufficient information to determine B'
    ],
    weight: 1.0,
    trait: 'logical_reasoning'
  },
  {
    id: 'aptitude-2',
    section: 'technical',
    category: 'General Aptitude',
    question: 'A security system processes 1000 events per minute. If the error rate is 0.5%, how many false positives would you expect in 2 hours?',
    type: 'multiple-choice',
    options: [
      '600 false positives',
      '60 false positives',
      '6 false positives',
      '6000 false positives'
    ],
    weight: 1.2,
    trait: 'numerical_reasoning'
  },
  {
    id: 'aptitude-3',
    section: 'technical',
    category: 'General Aptitude',
    question: 'In this sequence: 2, 6, 18, 54, ?, what is the next number?',
    type: 'multiple-choice',
    options: ['108', '162', '216', '270'],
    weight: 1.0,
    trait: 'pattern_recognition'
  },

  // Prerequisite Knowledge
  {
    id: 'prereq-1',
    section: 'technical',
    category: 'Prerequisite Knowledge',
    question: 'What protocol is primarily used for secure web traffic?',
    type: 'multiple-choice',
    options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
    weight: 0.8,
    trait: 'networking_basics'
  },
  {
    id: 'prereq-2',
    section: 'technical',
    category: 'Prerequisite Knowledge',
    question: 'Which Linux command would you use to view the contents of a log file in real-time?',
    type: 'multiple-choice',
    options: ['cat', 'grep', 'tail -f', 'ls -la'],
    weight: 0.9,
    trait: 'linux_basics'
  },
  {
    id: 'prereq-3',
    section: 'technical',
    category: 'Prerequisite Knowledge',
    question: 'What does DNS stand for and what is its primary function?',
    type: 'multiple-choice',
    options: [
      'Domain Name System - translates domain names to IP addresses',
      'Data Network Security - encrypts network traffic',
      'Dynamic Network Storage - manages cloud storage',
      'Distributed Network Service - balances network load'
    ],
    weight: 0.8,
    trait: 'networking_basics'
  },

  // Domain-Specific Quiz
  {
    id: 'domain-1',
    section: 'domain',
    category: 'Cloud Security Fundamentals',
    question: 'In the AWS Shared Responsibility Model, who is responsible for security "in" the cloud?',
    type: 'multiple-choice',
    options: [
      'AWS is responsible for all security',
      'The customer is responsible for all security',
      'AWS handles infrastructure, customer handles their data and applications',
      'Responsibility is shared equally for all components'
    ],
    weight: 2.0,
    trait: 'cloud_fundamentals'
  },
  {
    id: 'domain-2',
    section: 'domain',
    category: 'Identity and Access Management',
    question: 'What is the principle of least privilege in IAM?',
    type: 'multiple-choice',
    options: [
      'Users should have no access by default',
      'Users should have only the minimum access needed to perform their job',
      'Only administrators should have access to cloud resources',
      'All users should have the same level of access'
    ],
    weight: 1.8,
    trait: 'iam_knowledge'
  },
  {
    id: 'domain-3',
    section: 'domain',
    category: 'Encryption & Data Protection',
    question: 'What is the difference between encryption at rest and encryption in transit?',
    type: 'multiple-choice',
    options: [
      'At rest encrypts stored data, in transit encrypts data being transmitted',
      'At rest is for databases, in transit is for applications',
      'At rest uses symmetric encryption, in transit uses asymmetric encryption',
      'There is no difference, they are the same concept'
    ],
    weight: 1.9,
    trait: 'encryption_knowledge'
  },
  {
    id: 'domain-4',
    section: 'domain',
    category: 'Threat Detection',
    question: 'You notice unusual API calls in your cloud environment at 3 AM. What should be your first step?',
    type: 'scenario',
    options: [
      'Immediately shut down all access',
      'Check if the calls are from legitimate users or automated systems',
      'Ignore it as it might be scheduled maintenance',
      'Wait to see if the pattern continues'
    ],
    weight: 2.2,
    trait: 'threat_analysis'
  },
  {
    id: 'domain-5',
    section: 'domain',
    category: 'Compliance & Governance',
    question: 'Which of these is a key requirement of GDPR that affects cloud security?',
    type: 'multiple-choice',
    options: [
      'All data must be stored in Europe',
      'Data subjects have the right to have their personal data deleted',
      'Only government entities can process personal data',
      'All data must be encrypted with 256-bit keys'
    ],
    weight: 1.6,
    trait: 'compliance_knowledge'
  },

  // WISCAR Framework
  {
    id: 'wiscar-will-1',
    section: 'wiscar',
    category: 'Will',
    question: 'How likely are you to continue pursuing difficult cloud security challenges even when progress is slow?',
    type: 'likert',
    options: ['Very unlikely', 'Unlikely', 'Neither likely nor unlikely', 'Likely', 'Very likely'],
    weight: 1.8,
    trait: 'will'
  },
  {
    id: 'wiscar-interest-1',
    section: 'wiscar',
    category: 'Interest',
    question: 'How much do you enjoy reading about new cloud security vulnerabilities and attack methods?',
    type: 'likert',
    options: ['Not at all', 'A little', 'Somewhat', 'Quite a bit', 'A great deal'],
    weight: 1.6,
    trait: 'interest'
  },
  {
    id: 'wiscar-skill-1',
    section: 'wiscar',
    category: 'Skill',
    question: 'Rate your current ability to configure basic cloud security settings (IAM, firewalls, etc.)',
    type: 'likert',
    options: ['No ability', 'Basic ability', 'Moderate ability', 'Good ability', 'Expert ability'],
    weight: 1.4,
    trait: 'skill'
  },
  {
    id: 'wiscar-cognition-1',
    section: 'wiscar',
    category: 'Cognition',
    question: 'How quickly do you typically understand new technical concepts in cybersecurity?',
    type: 'likert',
    options: ['Very slowly', 'Slowly', 'At average speed', 'Quickly', 'Very quickly'],
    weight: 1.5,
    trait: 'cognition'
  },
  {
    id: 'wiscar-ability-1',
    section: 'wiscar',
    category: 'Ability',
    question: 'How do you typically respond to feedback about your security implementations?',
    type: 'multiple-choice',
    options: [
      'I prefer not to receive criticism',
      'I accept feedback but don\'t always act on it',
      'I appreciate feedback and usually incorporate it',
      'I actively seek out feedback to improve my work'
    ],
    weight: 1.7,
    trait: 'ability'
  },
  {
    id: 'wiscar-realworld-1',
    section: 'wiscar',
    category: 'Real-world Fit',
    question: 'How comfortable are you with the idea of being on-call for security incidents outside normal business hours?',
    type: 'likert',
    options: ['Very uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very comfortable'],
    weight: 1.3,
    trait: 'realWorldFit'
  }
];