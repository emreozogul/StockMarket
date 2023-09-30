import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

const AnimatedText = ({ text, className }) => {
  const letters = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: i * 0.04,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true, // Animation will be triggered only once when the element comes into view
  });

  return (
    <motion.div
      className={
        "flex flex-row items-center justify-center w-full gap-2 " + className
      }
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
