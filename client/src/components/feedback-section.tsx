import { Separator } from "@/components/ui/separator";
import FeedbackForm from "./feedback-form";
import { ScrollFadeIn } from "./scroll-animation";

export default function FeedbackSection() {
  return (
    <section id="feedback" className="py-16 bg-light relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Share Your Feedback
            </h2>
            <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Your feedback helps us improve the workshop experience. Please take a moment to share your thoughts.
            </p>
          </ScrollFadeIn>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}