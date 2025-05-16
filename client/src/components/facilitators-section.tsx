import { Mail, Link2, BookOpen, Award, Users, TrendingUp, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import facilitatorImage from "@assets/WhatsApp Image 2025-05-05 at 16.52.15.jpeg";
import { motion } from "framer-motion";
import { ScrollFadeIn, ScrollSlideFromLeft } from "./scroll-animation";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  name: string;
  level: number; // 1-5
}

interface Experience {
  company: string;
  role: string;
  period: string;
  icon: JSX.Element;
}

export default function FacilitatorsSection() {
  const skills: Skill[] = [
    { name: "Sales Leadership", level: 5 },
    { name: "Team Coaching", level: 5 },
    { name: "Strategic Planning", level: 4 },
    { name: "Negotiation", level: 5 },
    { name: "Client Relationship", level: 4 },
  ];

  const experiences: Experience[] = [
    { 
      company: "Razorpay", 
      role: "Sales Director", 
      period: "2020-Present",
      icon: <Briefcase className="h-4 w-4" />,
    },
    { 
      company: "Zomato", 
      role: "Regional Sales Manager", 
      period: "2017-2020",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    { 
      company: "HDFC Life", 
      role: "Senior Sales Manager", 
      period: "2014-2017",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
    <section id="facilitators" className="py-16 bg-gradient-light relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Your Facilitator
            </h2>
            <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Learn from our experienced sales leader and coach
            </p>
          </ScrollFadeIn>
        </div>

        <ScrollSlideFromLeft>
          <div className="max-w-4xl mx-auto">
            <motion.div
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
              className="card-hover"
            >
              <Card className="bg-light overflow-hidden shadow-md border-border hover:border-primary/40 transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 h-80 md:h-auto overflow-hidden relative group">
                    <motion.img
                      src={facilitatorImage}
                      alt="Sushanth Kodela"
                      className="w-full h-full object-cover transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                          <TooltipProvider key={i}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                                  {skill.name}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="flex items-center gap-1">
                                  {Array(5).fill(0).map((_, i) => (
                                    <span 
                                      key={i} 
                                      className={`h-2 w-2 rounded-full ${i < skill.level ? 'bg-primary' : 'bg-gray-300'}`}
                                    ></span>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-semibold">Sushanth Kodela</h3>
                      <motion.div 
                        whileHover={{ rotate: 15, scale: 1.2 }}
                        className="text-primary"
                      >
                        <Award className="h-6 w-6" />
                      </motion.div>
                    </div>
                    <p className="text-primary mb-4 text-lg">Sales Leader & Coach</p>
                    
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Sushanth Kodela is a distinguished sales leader with over 12 years of dynamic experience across top companies like Zomato, HDFC Life, and Razorpay. His career spans the full spectrum of organizational growth stages—from nimble startups to large-scale enterprises—giving him a rare versatility that few coaches possess.
                      </p>
                      <p>
                        A champion of coaching leadership, Sushanth has trained, hired, and mentored sales representatives and managers across industries. Known for his hands-on approach, deep sales acumen, and people-first philosophy, he has transitioned his passion for mentoring into a full-time coaching career.
                      </p>
                      <p>
                        Through his robust understanding of the B2B sales ecosystem and an unwavering commitment to people development, Sushanth empowers teams to unlock their highest potential—building not just better sales reps but future-ready leaders.
                      </p>
                    </div>
                    
                    <div className="mt-6 mb-6 flex flex-wrap gap-3">
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3, x: 3 }}
                          className="flex items-center gap-2 text-sm bg-primary/5 text-primary px-3 py-1 rounded-full"
                        >
                          {exp.icon}
                          <span>{exp.company}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3 mt-6">
                      <motion.a
                        whileHover={{ y: -2, scale: 1.2 }}
                        href="mailto:sushanth.kodela@razorpay.com"
                        className="text-muted-foreground hover:text-primary transition-colors bg-light p-2 rounded-full"
                      >
                        <Mail className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2, scale: 1.2 }}
                        href="https://www.linkedin.com/in/sushanth-kodela"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors bg-light p-2 rounded-full"
                      >
                        <Link2 className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2, scale: 1.2 }}
                        href="#resources"
                        className="text-muted-foreground hover:text-primary transition-colors bg-light p-2 rounded-full"
                      >
                        <BookOpen className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </ScrollSlideFromLeft>
      </div>
    </section>
  );
}
