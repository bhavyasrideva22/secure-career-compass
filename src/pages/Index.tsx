import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Users, Award, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    // Clear any previous assessment data
    localStorage.removeItem('assessmentResult');
    localStorage.removeItem('assessmentProgress');
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
              <Badge className="bg-gradient-primary text-white border-0 px-4 py-2 text-sm font-medium">
                ☁️ Cloud Security Assessment
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Should I Learn{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Cloud Security?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover if a career in Cloud Security aligns with your personality, skills, and aspirations 
              through our comprehensive psychometric and technical assessment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button
              variant="hero"
              size="lg"
              onClick={handleStartAssessment}
              className="text-lg px-8 py-4 h-auto"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Your Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes • Free • Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-xl text-muted-foreground">
              Our scientifically-designed assessment evaluates multiple dimensions of your fit for cloud security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                title: "Personality Fit",
                description: "Assess traits like analytical thinking, stress tolerance, and ethical mindset using validated psychological frameworks."
              },
              {
                icon: <Target className="w-8 h-8 text-accent" />,
                title: "Technical Readiness", 
                description: "Evaluate your current technical foundation in networking, cloud computing, and security fundamentals."
              },
              {
                icon: <Award className="w-8 h-8 text-success" />,
                title: "WISCAR Analysis",
                description: "Comprehensive evaluation of Will, Interest, Skill, Cognition, Ability, and Real-world fit for the field."
              },
              {
                icon: <Users className="w-8 h-8 text-warning" />,
                title: "Career Mapping",
                description: "Get personalized recommendations for specific cloud security roles that match your profile."
              }
            ].map((item, index) => (
              <Card key={index} className="shadow-card border-0 bg-gradient-card hover:shadow-elegant transition-all duration-300 animate-slide-up">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Sections */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Assessment Framework</h2>
            <p className="text-xl text-muted-foreground">
              Four comprehensive sections designed by experts in psychology, education, and cloud security
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                section: "🧠 Psychometric Evaluation",
                duration: "7-10 minutes",
                topics: ["Interest Scale", "Personality Fit (Big 5)", "Motivation Drivers", "Cognitive Preferences", "Resilience & Grit"],
                color: "from-blue-500 to-purple-600"
              },
              {
                section: "⚙️ Technical & Aptitude",
                duration: "7-8 minutes", 
                topics: ["Logical Reasoning", "Numerical Analysis", "Networking Basics", "Linux Fundamentals", "Pattern Recognition"],
                color: "from-green-500 to-teal-600"
              },
              {
                section: "☁️ Cloud Security Domain",
                duration: "5-7 minutes",
                topics: ["Shared Responsibility", "IAM & Encryption", "Threat Detection", "Compliance & Governance", "Security Architecture"],
                color: "from-orange-500 to-red-600"
              },
              {
                section: "📊 WISCAR Framework",
                duration: "3-5 minutes",
                topics: ["Will (Persistence)", "Interest (Engagement)", "Skill (Current Level)", "Cognition (Learning Speed)", "Real-world Fit"],
                color: "from-purple-500 to-pink-600"
              }
            ].map((section, index) => (
              <Card key={index} className="shadow-card border-0 bg-gradient-card animate-slide-up">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{section.section}</CardTitle>
                    <Badge variant="outline">{section.duration}</Badge>
                  </div>
                  <div className={`h-1 w-full bg-gradient-to-r ${section.color} rounded-full`} />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Cloud Security Career Paths</h2>
            <p className="text-xl text-muted-foreground">
              Explore the exciting career opportunities in cloud security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Cloud Security Engineer",
                salary: "$95k - $150k",
                description: "Design and implement security controls for cloud infrastructure",
                skills: ["AWS/Azure Security", "Infrastructure as Code", "Automation"]
              },
              {
                title: "SOC Analyst - Cloud",
                salary: "$70k - $110k", 
                description: "Monitor and respond to security incidents in cloud environments",
                skills: ["SIEM Tools", "Log Analysis", "Incident Response"]
              },
              {
                title: "Cloud Security Architect",
                salary: "$130k - $200k",
                description: "Design secure cloud architectures and security policies",
                skills: ["Enterprise Architecture", "Risk Assessment", "Compliance"]
              },
              {
                title: "DevSecOps Specialist",
                salary: "$100k - $160k",
                description: "Integrate security into CI/CD pipelines and workflows",
                skills: ["Scripting", "Container Security", "Automation Tools"]
              }
            ].map((career, index) => (
              <Card key={index} className="shadow-card border-0 bg-gradient-card hover:shadow-elegant transition-all duration-300 animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-lg">{career.title}</CardTitle>
                  <Badge className="bg-success text-success-foreground w-fit">{career.salary}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{career.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center text-white space-y-8">
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Discover Your Cloud Security Potential?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of professionals who've used our assessment to make informed career decisions. 
              Get your personalized report with actionable insights and learning paths.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleStartAssessment}
              className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Assessment Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <CheckCircle className="w-4 h-4" />
              <span>100% Free • No signup required • Instant results</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
