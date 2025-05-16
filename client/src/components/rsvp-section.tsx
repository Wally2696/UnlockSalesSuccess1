import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Video } from "lucide-react";

export default function RSVPSection() {
  return (
    <section id="rsvp" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            RSVP for the Event
          </h2>
          <Separator className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Secure your spot in the upcoming kick-off session by clicking the button below
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-lg">Tuesday, May 13</h3>
                <p className="text-muted-foreground">11:00 AM - 1:00 PM IST</p>
              </div>
            </div>
            <div className="flex items-center">
              <Video className="h-10 w-10 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-lg">Google Meet</h3>
                <p className="text-muted-foreground">Virtual Kick-Off Session</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white py-6 px-8 text-lg rounded-md"
              onClick={() => window.open("https://meet.google.com/bwq-jweb-yrd", "_blank")}
            >
              Add to Calendar & Join
            </Button>
            
            <div className="mt-6 space-y-3 text-muted-foreground">
              <p className="text-base font-medium">Google Meet joining info</p>
              <p className="mt-2">
                Video call link: {' '}
                <a 
                  href="https://meet.google.com/bwq-jweb-yrd" 
                  target="_blank" 
                  className="text-primary hover:text-primary/80 underline font-medium"
                >
                  https://meet.google.com/bwq-jweb-yrd
                </a>
              </p>
              <p className="mt-2">
                Or dial: ‪(US) +1 917-818-0316‬ {' '}
                <span className="font-medium">PIN: ‪911 394 859‬#</span>
              </p>
              <p>
                More phone numbers: {' '}
                <a 
                  href="https://tel.meet/bwq-jweb-yrd?pin=4042666506432" 
                  target="_blank" 
                  className="text-primary hover:text-primary/80 underline break-all"
                >
                  https://tel.meet/bwq-jweb-yrd?pin=4042666506432
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}