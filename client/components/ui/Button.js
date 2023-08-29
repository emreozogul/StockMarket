import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import Link from "next/link";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Button({ className, ref, children, ...rest }) {
  return (
    <motion.button
      ref={ref}
      variants={variants}
      initial="hidden"
      animate="visible"
      {...rest}
      className={` h-10 rounded-xl font-semibold px-2 ` + className}
    >
      {children}
    </motion.button>
  );
}
