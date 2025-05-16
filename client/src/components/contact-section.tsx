import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // In a real implementation, this would send the form data to the server
    console.log("Form submitted:", data);
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <section id="contact" className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Need More Information?</h2>
            <p className="mb-8">
              Have questions about the workshop or need additional resources? Our team is here to help you succeed.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="mr-3 h-6 w-6 flex-shrink-0" />
                <div>
                  <p>learning.development@razorpay.com</p>
                  <p>walter.shaun@razorpay.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-3 h-6 w-6 flex-shrink-0" />
                <p>+91 8792252656</p>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-6 w-6 flex-shrink-0" />
                <p>SJR Cyber, Bengaluru, India</p>
              </div>
            </div>
          </div>

          <Card className="bg-white rounded-lg shadow-lg p-8 text-foreground">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    {...register("message", { required: "Message is required" })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary transition-colors"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
