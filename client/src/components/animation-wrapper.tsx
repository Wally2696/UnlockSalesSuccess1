import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimationWrapper({ 
  children, 
  delay = 0 
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut",
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ 
  children, 
  delay = 0 
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({ 
  children, 
  delay = 0 
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ 
  children, 
  delay = 0 
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ 
  children, 
  delay = 0 
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}