import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.classList.contains('card-hover') ||
          target.closest('.card-hover')) {
        setCursorVariant('hover');
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    // Add event listeners
    window.addEventListener('mousemove', mouseMove);
    
    // Add hover detection for interactive elements
    document.querySelectorAll('button, a, .card-hover').forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      
      // Clean up hover listeners
      document.querySelectorAll('button, a, .card-hover').forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(45, 136, 255, 0)',
      border: '2px solid rgba(45, 136, 255, 0.5)',
      mixBlendMode: 'difference' as 'difference',
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(45, 136, 255, 0.15)',
      border: '2px solid rgba(45, 136, 255, 0.6)',
      mixBlendMode: 'normal' as 'normal',
    },
  };

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}