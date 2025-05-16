import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { MapPin, Navigation, Clock, Car, Train, Info } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollSlideFromLeft, ScrollSlideFromRight } from "./scroll-animation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  type: "transport" | "food" | "landmark";
  icon: JSX.Element;
}

export default function LocationSection() {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  
  const pointsOfInterest: PointOfInterest[] = [
    {
      id: "metro",
      name: "Metro Station",
      description: "Closest metro station is approximately 2km away.",
      type: "transport",
      icon: <Train className="h-5 w-5" />,
    },
    {
      id: "airport",
      name: "Airport",
      description: "Bengaluru International Airport is 35km away (approximately 1 hour by car).",
      type: "transport",
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "timing",
      name: "Office Hours",
      description: "The office is open from 9:00 AM to 6:00 PM on weekdays.",
      type: "landmark",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "directions",
      name: "Directions",
      description: "Use the interactive map to navigate to our office location.",
      type: "landmark",
      icon: <Navigation className="h-5 w-5" />,
    },
  ];

  const handlePointHover = (id: string) => {
    setActivePoint(id);
  };

  const handlePointLeave = () => {
    setActivePoint(null);
  };

  return (
    <section id="location" className="py-16 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <ScrollSlideFromLeft>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Location Details
            </h2>
            <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
          </ScrollSlideFromLeft>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ScrollSlideFromLeft>
            <div className="space-y-6">
              <div className="flex items-start">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mr-4 flex-shrink-0"
                >
                  <MapPin className="h-8 w-8 text-primary mt-1" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">RazorpayX Office</h3>
                  <p className="text-muted-foreground">
                    Site No 22 Laskar Main road, Hosur Rd, Adugodi, Bengaluru, Karnataka 560030
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                Join us at our Bengaluru headquarters for the in-person sessions of the Sales Executive Coaching workshop. The venue is easily accessible and provides all the amenities needed for a productive learning experience.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <TooltipProvider>
                  {pointsOfInterest.map((point) => (
                    <Tooltip key={point.id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`flex items-center gap-2 transition-all duration-300 ${
                            activePoint === point.id
                              ? "bg-primary/10 border-primary text-primary"
                              : ""
                          }`}
                          onMouseEnter={() => handlePointHover(point.id)}
                          onMouseLeave={handlePointLeave}
                        >
                          {point.icon}
                          {point.name}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{point.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
              
              <motion.a
                href="https://goo.gl/maps/xFJq6GDQd6KeTXyL7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mt-4"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <Navigation className="h-4 w-4" />
                <span>Get directions</span>
              </motion.a>
            </div>
          </ScrollSlideFromLeft>
          
          <ScrollSlideFromRight>
            <motion.div 
              className="h-80 md:h-96 rounded-lg overflow-hidden shadow-lg card-hover"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.458694766615!2d77.60345187497611!3d12.944262887337532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1551cb543ad7%3A0xa3dbe732e3e09ccf!2sSite%20No%2022%20Laskar%20Main%20road%2C%20Hosur%20Rd%2C%20Adugodi%2C%20Bengaluru%2C%20Karnataka%20560030!5e0!3m2!1sen!2sin!4v1681729452987!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="RazorpayX Office Location"
              ></iframe>
            </motion.div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              <span>Click and drag to explore the interactive map</span>
            </div>
          </ScrollSlideFromRight>
        </div>
      </div>
    </section>
  );
}