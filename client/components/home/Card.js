import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Card({ title, description, icon, index }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      className="w-full  "
      style={{
        scale: scaleProgess,
        opacity: opacityProgress,
      }}
      ref={ref}
    >
      <section
        className="group bg-custom-primary text-white hover:text-custom-primary  border border-custom-green hover:border-custom-border overflow-hidden relative 
        rounded-lg shadow-lg cursor-pointer hover:shadow-xl w-full
       hover:bg-gray-100 transition flex flex-row items-center justify-between gap-4 p-4 shadow-md hover:translate-y-0.5 hover:translate-x-0.5"
      >
        <div className="flex flex-col h-full">
          <h3 className="text-2xl font-semibold"> {title}</h3>
          <p className="mt-2 leading-relaxed ">{description}</p>
        </div>
        <div className=" h-full transition group-hover:scale-[1.3]  ">
          {icon}
        </div>
      </section>
    </motion.div>
  );
}
