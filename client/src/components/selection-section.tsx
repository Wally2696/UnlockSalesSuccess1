import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SelectionSection() {
  return (
    <section id="selection" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            You must be wondering- "How was I selected?"
          </h2>
          <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
        </div>

        <Card className="bg-light rounded-lg overflow-hidden shadow-md">
          <CardContent className="p-8">
            <p className="text-muted-foreground mb-4">
              The participants chosen for this Sales Coaching intervention represent a handpicked cohort of exceptional performers—Titans within RazorpayX—selected through a rigorous nomination process in close collaboration with HR and business leaders. These individuals have consistently demonstrated outstanding ownership, resilience, and execution across key performance areas including target achievement, structured follow-ups, and annual reviews.
            </p>
            <p className="text-muted-foreground mb-4">
              More than just high performers, they embody the values and behaviors that set the standard for their peers—role models who lead by example and drive impact within their teams. Their ability to navigate complex sales cycles, maintain client trust, and sustain results over time signals not just present excellence but future leadership potential. This program is designed as a high-impact, high-investment intervention, built to challenge, sharpen, and elevate already accomplished individuals.
            </p>
            <p className="text-muted-foreground">
              The learnings from this series are not only expected to accelerate individual growth but also ripple outward, shaping stronger, more strategic sales leadership across RazorpayX. Being selected for this cohort is not just recognition—it's a responsibility to lead the way forward.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}