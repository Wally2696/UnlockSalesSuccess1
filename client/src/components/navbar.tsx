import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
  import logo from "@assets/X-logo.png";

const navLinks = [
  { href: "#home", label: "Home", active: true },
  { href: "#about", label: "About", active: false },
  { href: "#selection", label: "Selection", active: false },
  { href: "#sessions", label: "Sessions", active: false },
  { href: "#facilitators", label: "Facilitators", active: false },
  { href: "#resources", label: "Resources", active: false },
  { href: "#rsvp", label: "RSVP", active: false },
  { href: "#location", label: "Location", active: false },
  { href: "#feedback", label: "Feedback", active: false },
  { href: "#contact", label: "Contact", active: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center mr-12">
          import razorpayXLogo from "@assets/X-logo.png";
          <img
            src={razorpayXLogo}
            alt="RazorpayX Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={cn(
                "text-[14px] font-medium transition-colors tracking-wide",
                link.active 
                  ? "text-primary" 
                  : "text-gray-600 hover:text-primary"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-foreground focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full absolute shadow-lg py-2 z-50">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={cn(
                  "py-2 text-[14px] font-medium hover:bg-gray-100 rounded px-2 transition-colors",
                  link.active 
                    ? "text-primary" 
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
