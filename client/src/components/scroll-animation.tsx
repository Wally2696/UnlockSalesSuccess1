import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export default function ScrollAnimation({
  children,
  variants,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const defaultVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1
}: Omit<ScrollAnimationProps, "variants">) {
  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        delay
      }
    }
  };

  return (
    <ScrollAnimation 
      variants={fadeVariants} 
      className={className} 
      delay={delay}
      once={once}
      threshold={threshold}
    >
      {children}
    </ScrollAnimation>
  );
}

export function ScrollSlideFromLeft({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1
}: Omit<ScrollAnimationProps, "variants">) {
  const slideVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay
      }
    }
  };

  return (
    <ScrollAnimation 
      variants={slideVariants} 
      className={className} 
      delay={delay}
      once={once}
      threshold={threshold}
    >
      {children}
    </ScrollAnimation>
  );
}

export function ScrollSlideFromRight({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1
}: Omit<ScrollAnimationProps, "variants">) {
  const slideVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay
      }
    }
  };

  return (
    <ScrollAnimation 
      variants={slideVariants} 
      className={className} 
      delay={delay}
      once={once}
      threshold={threshold}
    >
      {children}
    </ScrollAnimation>
  );
}

export function ScrollScaleIn({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1
}: Omit<ScrollAnimationProps, "variants">) {
  const scaleVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay
      }
    }
  };

  return (
    <ScrollAnimation 
      variants={scaleVariants} 
      className={className} 
      delay={delay}
      once={once}
      threshold={threshold}
    >
      {children}
    </ScrollAnimation>
  );
}