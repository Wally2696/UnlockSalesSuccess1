import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  Clock, 
  Users, 
  ListChecks,
  ChevronRight
} from "lucide-react";
import { ScrollSlideFromLeft, ScrollSlideFromRight } from "./scroll-animation";

interface Session {
  number: number;
  title: string;
  description: string;
  detailedDescription?: string;
  learningOutcomes?: string[];
  duration?: string;
  participants?: string;
}

const sessions: Session[] = [
  {
    number: 1,
    title: "Pre Assessment and Intro",
    description: "An initial evaluation and introduction to the comprehensive coaching program for RazorpayX sales executives.",
    detailedDescription: "This session establishes a baseline of your current sales knowledge and skills through various assessment tools. We'll introduce the program structure, set expectations, and help you understand how to maximize your learning journey.",
    learningOutcomes: [
      "Complete personal skills assessment",
      "Understand program structure and timeline",
      "Set personal development goals",
      "Meet program facilitators and fellow participants"
    ],
    duration: "3 hours",
    participants: "All selected sales executives"
  },
  {
    number: 2,
    title: "Product Knowledge",
    description: "Deep dive into RazorpayX's product suite, features, benefits, and value propositions to effectively communicate with clients.",
    detailedDescription: "Master the technical and business aspects of RazorpayX's product offerings. Learn how to articulate value propositions that resonate with different customer segments and address specific pain points.",
    learningOutcomes: [
      "Comprehensive understanding of RazorpayX product suite",
      "Ability to match products to client needs",
      "Effective communication of key features and benefits",
      "Confidence in product demonstrations"
    ],
    duration: "6 hours",
    participants: "All selected sales executives"
  },
  {
    number: 3,
    title: "Competitor Analysis & Industry Knowledge",
    description: "Comprehensive overview of the competitive landscape and industry trends to position RazorpayX solutions strategically.",
    detailedDescription: "Gain detailed insight into the competitive landscape, market positioning, and industry trends. Learn how to position RazorpayX's offerings against competitors and leverage market opportunities.",
    learningOutcomes: [
      "Competitive landscape mapping",
      "Differentiation strategies",
      "Industry trend analysis",
      "Strategic positioning techniques"
    ],
    duration: "4 hours",
    participants: "All selected sales executives"
  },
  {
    number: 4,
    title: "Negotiation",
    description: "Advanced techniques for handling objections, negotiating terms, and closing deals successfully.",
    detailedDescription: "Develop advanced negotiation skills through role-play scenarios and case studies. Learn proven techniques to overcome objections, address client concerns, and reach mutually beneficial agreements.",
    learningOutcomes: [
      "Effective objection handling",
      "Strategic negotiation frameworks",
      "Win-win agreement techniques",
      "Closing strategies for complex sales"
    ],
    duration: "5 hours",
    participants: "All selected sales executives"
  },
  {
    number: 5,
    title: "Leadership",
    description: "Developing leadership skills essential for guiding clients through the sales process and building long-term relationships.",
    detailedDescription: "Explore leadership principles that enhance your ability to guide clients, influence decisions, and establish yourself as a trusted advisor rather than just a vendor.",
    learningOutcomes: [
      "Consultative selling approaches",
      "Client relationship management",
      "Strategic account leadership",
      "Team collaboration techniques"
    ],
    duration: "4 hours",
    participants: "All selected sales executives"
  },
  {
    number: 6,
    title: "CRM",
    description: "Best practices for utilizing customer relationship management tools to track, manage, and optimize sales processes.",
    detailedDescription: "Master RazorpayX's CRM systems to efficiently manage your sales pipeline, track client interactions, and generate actionable insights to improve conversion rates.",
    learningOutcomes: [
      "Efficient CRM utilization",
      "Pipeline management best practices",
      "Data-driven decision making",
      "Activity and outcome tracking"
    ],
    duration: "3 hours",
    participants: "All selected sales executives"
  },
  {
    number: 7,
    title: "Time Management and Health",
    description: "Strategies for optimizing productivity while maintaining work-life balance and personal wellbeing.",
    detailedDescription: "Learn techniques to maximize productivity, prioritize effectively, and maintain your physical and mental wellbeing in a high-pressure sales environment.",
    learningOutcomes: [
      "Effective time management strategies",
      "Prioritization frameworks",
      "Stress management techniques",
      "Work-life balance optimization"
    ],
    duration: "3 hours",
    participants: "All selected sales executives"
  },
];

export default function SessionsSection() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDetails = (session: Session) => {
    setSelectedSession(session);
    setIsDialogOpen(true);
  };

  return (
    <section id="sessions" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Workshop Sessions
          </h2>
          <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Our comprehensive program is structured into focused sessions to build your skills progressively.
          </p>
        </div>

        <div className="pl-8 space-y-8 relative">
          {/* Vertical line connecting timeline dots */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-primary/30 -translate-x-8"></div>
          
          {sessions.map((session, index) => (
            <div key={index} className="timeline-item relative">
              {/* Timeline dot with animation */}
              <motion.div 
                className="absolute left-0 -translate-x-8 w-6 h-6 rounded-full bg-primary z-10 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-white text-xs font-bold">{session.number}</span>
              </motion.div>
              
              {/* Session card with animation */}
              {index % 2 === 0 ? (
                <ScrollSlideFromLeft delay={index * 0.1}>
                  <SessionCard 
                    session={session} 
                    handleOpenDetails={handleOpenDetails} 
                  />
                </ScrollSlideFromLeft>
              ) : (
                <ScrollSlideFromRight delay={index * 0.1}>
                  <SessionCard 
                    session={session} 
                    handleOpenDetails={handleOpenDetails} 
                  />
                </ScrollSlideFromRight>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Session Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedSession && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Badge className="bg-primary text-white">Session {selectedSession.number}</Badge>
                  {selectedSession.title}
                </DialogTitle>
                <DialogDescription className="mt-4 text-base">
                  {selectedSession.detailedDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <ListChecks className="h-4 w-4 text-primary" /> 
                  Learning Outcomes
                </h4>
                <ul className="space-y-2">
                  {selectedSession.learningOutcomes?.map((outcome, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                {selectedSession.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{selectedSession.duration}</span>
                  </div>
                )}
                {selectedSession.participants && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{selectedSession.participants}</span>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

interface SessionCardProps {
  session: Session;
  handleOpenDetails: (session: Session) => void;
}

function SessionCard({ session, handleOpenDetails }: SessionCardProps) {
  return (
    <motion.div 
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      className="card-hover cursor-pointer"
      onClick={() => handleOpenDetails(session)}
    >
      <Card className="border border-border hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-4">
            Session {session.number}
          </Badge>
          <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
          <p className="text-muted-foreground mb-4">{session.description}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary flex items-center gap-1 pl-0 hover:pl-1 transition-all"
          >
            View Details <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
