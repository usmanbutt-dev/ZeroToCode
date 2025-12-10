/**
 * Shared Animation Variants for ZeroToCode
 * Use these with framer-motion for consistent animations across pages
 */

// Spring configurations
export const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  bouncy: { type: "spring", stiffness: 300, damping: 20 },
  stiff: { type: "spring", stiffness: 400, damping: 30 },
  smooth: { type: "spring", stiffness: 100, damping: 20 },
};

// Duration presets
export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.8,
};

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: duration.normal }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: duration.normal, ease: "easeOut" }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: duration.normal, ease: "easeOut" }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: duration.normal, ease: "easeOut" }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: duration.normal, ease: "easeOut" }
  }
};

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springConfig.bouncy
  }
};

export const scaleInSoft = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: duration.normal, ease: "easeOut" }
  }
};

// Stagger container - wrap children with staggered animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

// Stagger item - use as child of stagger container
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: duration.normal, ease: "easeOut" }
  }
};

export const staggerItemScale = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: springConfig.gentle
  }
};

// Hero text animation (for headlines)
export const heroTextContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    }
  }
};

export const heroTextItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Float animation for decorative elements
export const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatSlow = {
  initial: { y: 0 },
  animate: {
    y: [-15, 15, -15],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation
export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Card hover animation props
export const cardHover = {
  whileHover: { 
    y: -8, 
    scale: 1.02,
    transition: springConfig.gentle
  },
  whileTap: { scale: 0.98 }
};

export const cardHoverSubtle = {
  whileHover: { 
    y: -4, 
    transition: { duration: 0.2 }
  }
};

// Button hover props
export const buttonHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

// Viewport animation settings (for whileInView)
export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: "-50px"
};

export const viewportRepeat = {
  once: false,
  amount: 0.2,
  margin: "-100px"
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Utility function to create delayed variants
export const withDelay = (variants, delay) => ({
  ...variants,
  visible: {
    ...variants.visible,
    transition: {
      ...variants.visible?.transition,
      delay
    }
  }
});

// Utility to create index-based stagger delay
export const getStaggerDelay = (index, baseDelay = 0.1) => ({
  transition: { delay: index * baseDelay }
});
