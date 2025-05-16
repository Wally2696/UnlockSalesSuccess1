import { CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const benefits = [
  "Comprehensive training on RazorpayX product suite",
  "Advanced negotiation and closing techniques",
  "Customer-centric approach to fintech solutions",
  "Real-world case studies and practical applications",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            About The Program
          </h2>
          <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-secondary">
              Empowering Sales Excellence
            </h3>
            <p className="text-muted-foreground mb-6">
              The RazorpayX Sales Executive Coaching program is designed to equip our sales team with cutting-edge techniques, industry insights, and practical tools to excel in the dynamic fintech landscape.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-primary mr-3 h-6 w-6 flex-shrink-0" />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Sales coaching session"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
