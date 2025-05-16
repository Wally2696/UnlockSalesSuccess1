import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SelectionSection from "@/components/selection-section";
import SessionsSection from "@/components/sessions-section";
import FacilitatorsSection from "@/components/facilitators-section";
import ResourcesSection from "@/components/resources-section";
import RSVPSection from "@/components/rsvp-section";
import LocationSection from "@/components/location-section";
import FeedbackSection from "@/components/feedback-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SelectionSection />
        <SessionsSection />
        <FacilitatorsSection />
        <ResourcesSection />
        <RSVPSection />
        <LocationSection />
        <FeedbackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
