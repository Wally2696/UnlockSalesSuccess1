import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation-wrapper";
import { Loader2, Star } from "lucide-react";
import { Link } from "wouter";

interface Feedback {
  id: number;
  name: string;
  email: string;
  sessionNumber: number;
  rating: number;
  comments: string | null;
  suggestions: string | null;
  createdAt: string;
}

export default function AdminFeedback() {
  const [selectedSession, setSelectedSession] = useState<string>("all");
  
  // Fetch all feedback
  const { data: allFeedback, isLoading, error } = useQuery<Feedback[]>({
    queryKey: ['/api/feedback'],
  });

  // Filter feedback based on selected session
  const filteredFeedback = allFeedback?.filter(feedback => {
    if (selectedSession === "all") return true;
    return feedback.sessionNumber === parseInt(selectedSession);
  });

  // Calculate average rating if we have feedback
  const averageRating = filteredFeedback?.length 
    ? (filteredFeedback.reduce((sum, item) => sum + item.rating, 0) / filteredFeedback.length).toFixed(1)
    : "N/A";
    
  // Get session name based on number
  const getSessionName = (sessionNumber: number) => {
    const sessions = [
      "Pre Assessment and Intro",
      "Product Knowledge",
      "Competitor Analysis & Industry Knowledge",
      "Negotiation",
      "Leadership",
      "CRM",
      "Time Management and Health"
    ];
    
    return sessions[sessionNumber - 1] || `Session ${sessionNumber}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-light">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Feedback Dashboard</h1>
            <p className="text-muted-foreground">Review and analyze feedback from workshop participants</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              Back to Website
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <FadeIn>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : filteredFeedback?.length || 0}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-3xl font-bold">{averageRating}</div>
                  {averageRating !== "N/A" && (
                    <div className="text-yellow-500">
                      <Star className="h-5 w-5" fill="currentColor" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Filter by Session</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="1">Session 1: Pre Assessment</SelectItem>
                    <SelectItem value="2">Session 2: Product Knowledge</SelectItem>
                    <SelectItem value="3">Session 3: Competitor Analysis</SelectItem>
                    <SelectItem value="4">Session 4: Negotiation</SelectItem>
                    <SelectItem value="5">Session 5: Leadership</SelectItem>
                    <SelectItem value="6">Session 6: CRM</SelectItem>
                    <SelectItem value="7">Session 7: Time Management</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
        
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Feedback Results</CardTitle>
              <CardDescription>
                {selectedSession === "all" 
                  ? "Showing feedback from all sessions" 
                  : `Showing feedback for ${getSessionName(parseInt(selectedSession))}`
                }
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  Error loading feedback. Please try again.
                </div>
              ) : filteredFeedback?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No feedback data available for this session yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Session</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Suggestions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeedback?.map((feedback) => (
                        <TableRow key={feedback.id}>
                          <TableCell className="whitespace-nowrap">
                            {formatDate(feedback.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div>{feedback.name}</div>
                            <div className="text-xs text-muted-foreground">{feedback.email}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              Session {feedback.sessionNumber}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-4 w-4" 
                                  fill={i < feedback.rating ? "#FFD700" : "none"} 
                                  stroke={i < feedback.rating ? "#FFD700" : "currentColor"}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {feedback.comments || "-"}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {feedback.suggestions || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}