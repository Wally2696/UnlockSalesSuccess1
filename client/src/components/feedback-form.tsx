import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FadeIn } from "./animation-wrapper";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

// Validation schema for feedback form
const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  sessionNumber: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Please select a session",
  }),
  rating: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Please provide a rating",
  }),
  comments: z.string().optional(),
  suggestions: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      sessionNumber: "",
      rating: "",
      comments: "",
      suggestions: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Convert string values to numbers for API
      const apiData = {
        ...data,
        sessionNumber: parseInt(data.sessionNumber),
        rating: parseInt(data.rating),
      };
      
      // Submit feedback to API
      await apiRequest('POST', '/api/feedback', apiData);
      
      // Show success toast
      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been submitted successfully.",
      });
      
      // Reset form
      form.reset();
      setSelectedRating(null);
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
      
      // Show error toast
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Star rating component
  const StarRating = ({ rating, onRatingChange }: { rating: number | null; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onRatingChange(star);
              form.setValue("rating", star.toString());
            }}
            className={`text-2xl focus:outline-none ${
              (rating || 0) >= star
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            <Star className="h-8 w-8" fill={(rating || 0) >= star ? "currentColor" : "none"} />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <FadeIn>
      <Card className="w-full max-w-3xl mx-auto border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Session Feedback</CardTitle>
          <CardDescription>
            We value your input! Please share your thoughts on the workshop session.
          </CardDescription>
          <Separator className="mt-4" />
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Session Selection */}
              <FormField
                control={form.control}
                name="sessionNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which session are you rating?</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a session" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Session 1: Pre Assessment and Intro</SelectItem>
                        <SelectItem value="2">Session 2: Product Knowledge</SelectItem>
                        <SelectItem value="3">Session 3: Competitor Analysis & Industry Knowledge</SelectItem>
                        <SelectItem value="4">Session 4: Negotiation</SelectItem>
                        <SelectItem value="5">Session 5: Leadership</SelectItem>
                        <SelectItem value="6">Session 6: CRM</SelectItem>
                        <SelectItem value="7">Session 7: Time Management and Health</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How would you rate this session?</FormLabel>
                    <FormControl>
                      <div className="py-2">
                        <StarRating 
                          rating={selectedRating} 
                          onRatingChange={(rating) => setSelectedRating(rating)} 
                        />
                        <input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Comments */}
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What did you like about this session?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your thoughts about what worked well..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Suggestions */}
              <FormField
                control={form.control}
                name="suggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How could we improve this session?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any suggestions for improvement..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pt-6 pb-0 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </FadeIn>
  );
}