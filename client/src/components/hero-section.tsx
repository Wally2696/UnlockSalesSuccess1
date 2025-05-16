import { Button } from "@/components/ui/button";
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn } from "./animation-wrapper";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section id="home" className="relative">
      {/* Parallax Background */}
      <Parallax
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
        strength={300}
        className="min-h-[600px] md:min-h-[700px]"
      >
        <div className="absolute inset-0 hero-gradient"></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FadeIn>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                }}
                initial={{ 
                  opacity: 0, 
                  y: -20,
                  scale: 0.95
                }}
                transition={{ 
                  duration: 0.7,
                  delay: 0.2
                }}
              >
                Unlock Sales Success
              </motion.h1>
            </FadeIn>
            
            <ScaleIn delay={0.4}>
              <p className="text-xl md:text-2xl mb-8">
                Comprehensive coaching for RazorpayX Sales Executives
              </p>
            </ScaleIn>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.7
              }}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  className="bg-white text-primary hover:bg-white/90"
                  size="lg"
                  onClick={() => scrollToSection("#sessions")}
                >
                  Explore Sessions
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline" 
                  className="border-2 border-white text-white bg-primary/30 hover:bg-white/20"
                  size="lg"
                  onClick={() => scrollToSection("#resources")}
                >
                  View Resources
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
