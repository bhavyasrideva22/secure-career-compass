import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { Shield, TrendingUp, BookOpen, Target, Users, Award, ChevronRight } from 'lucide-react';

export const Results = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('assessmentResult');
    if (!stored) {
      navigate('/');
      return;
    }

    const data = JSON.parse(stored);
    setAssessmentData(data);
    setResult(data.result);
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading your results...</div>
      </div>
    );
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'strongly-recommended':
        return 'bg-success text-success-foreground';
      case 'recommended':
        return 'bg-primary text-primary-foreground';
      case 'consider-alternatives':
        return 'bg-warning text-warning-foreground';
      case 'not-recommended':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'strongly-recommended':
        return 'Strongly Recommended';
      case 'recommended':
        return 'Recommended';
      case 'consider-alternatives':
        return 'Consider Alternatives';
      case 'not-recommended':
        return 'Not Recommended';
      default:
        return 'Unknown';
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="flex items-center justify-center gap-2 text-4xl">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Assessment Complete!
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your personalized cloud security career assessment results and recommendations
          </p>
          
          {assessmentData?.duration && (
            <Badge variant="outline" className="text-sm">
              Completed in {formatDuration(assessmentData.duration)}
            </Badge>
          )}
        </div>

        {/* Overall Score & Recommendation */}
        <Card className="shadow-elegant border-0 bg-gradient-card animate-slide-up">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {Math.round(result.confidenceScore)}%
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Confidence Score</div>
                <Badge className={getRecommendationColor(result.recommendation)}>
                  {getRecommendationText(result.recommendation)}
                </Badge>
              </div>
            </div>
            <Progress value={result.confidenceScore} className="w-full h-3" />
          </CardHeader>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Section Scores */}
          <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Section Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>🧠 Psychometric Fit</span>
                  <span>{Math.round(result.scores.psychometric)}%</span>
                </div>
                <Progress value={result.scores.psychometric} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>⚙️ Technical Aptitude</span>
                  <span>{Math.round(result.scores.technical)}%</span>
                </div>
                <Progress value={result.scores.technical} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>☁️ Domain Knowledge</span>
                  <span>{Math.round(result.scores.domain)}%</span>
                </div>
                <Progress value={result.scores.domain} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Analysis */}
          <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                WISCAR Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(result.scores.wiscar).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span>{Math.round(value)}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {result.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {result.careerPaths.slice(0, 3).map((path, index) => (
                <div key={index} className="p-4 border rounded-lg bg-background/50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{path.title}</h3>
                    <Badge variant="outline">
                      {Math.round(path.alignment)}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  {path.skillGaps.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Areas to develop:</p>
                      <div className="flex flex-wrap gap-1">
                        {path.skillGaps.map((gap, gapIndex) => (
                          <Badge key={gapIndex} variant="secondary" className="text-xs">
                            {gap}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Your Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {result.learningPath.map((stage, index) => (
                <div key={index} className="relative">
                  {index < result.learningPath.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold capitalize">{stage.stage}</h3>
                        <Badge variant="outline">{stage.duration}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Topics:</p>
                          <ul className="space-y-1">
                            {stage.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-center gap-1">
                                <ChevronRight className="w-3 h-3" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Tools:</p>
                          <div className="flex flex-wrap gap-1">
                            {stage.tools.map((tool, toolIndex) => (
                              <Badge key={toolIndex} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Certifications:</p>
                          <div className="flex flex-wrap gap-1">
                            {stage.certifications.map((cert, certIndex) => (
                              <Badge key={certIndex} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {result.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => window.print()}
          >
            Download Report
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              localStorage.removeItem('assessmentResult');
              localStorage.removeItem('assessmentProgress');
              navigate('/');
            }}
          >
            Take Again
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};