import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Testimonial {
  quote: string;
  name: string;
  position: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The workshop provided practical insights that I could immediately apply to my sales process. My conversion rate has improved by 30% since implementing these techniques.",
    name: "Aditya Kumar",
    position: "Senior Sales Executive",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
  },
  {
    quote: "The objection handling techniques we learned were game-changers. I feel much more confident navigating complex sales conversations with enterprise clients.",
    name: "Meera Patel",
    position: "Account Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
  },
  {
    quote: "The product knowledge I gained helped me effectively communicate RazorpayX's value proposition to potential clients. My demo-to-deal conversion has improved significantly.",
    name: "Raj Malhotra",
    position: "Enterprise Sales Executive",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Hear from previous workshop participants about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-light rounded-lg p-6 shadow-md">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Quote className="text-primary h-6 w-6" />
                </div>
                <p className="text-muted-foreground italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
