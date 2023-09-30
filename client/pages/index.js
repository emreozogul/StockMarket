import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SearchStock from "@/components/home/SearchStock";
import AnimatedText from "@/components/ui/AnimatedText";
import ScrollContainer from "@/components/home/ScrollContainer";

export default function Home() {
  const [display, setDisplay] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true, // Animation will be triggered only once when the element comes into view
  });

  const router = useRouter();

  useEffect(() => {
    if (inView) {
      setDisplay(true);
    }
  }, [inView]);

  return (
    <>
      <section className="w-full bg-gradient- pt-4 pb-24">
        <main className="w-full h-full flex flex-col items-center gap-4">
          <div className="w-2/3 h-full  p-4">
            <AnimatedText
              text="Unlock Your Potential with Real-Time Stock Insights!"
              className="text-custom-primary text-4xl font-bold "
            />
            <p className="text-black text-lg font-semibold ">
              Keep up to date with breaking news, current stock information, and
              strong indicators. Make your experience unique, take advantage of
              possibilities, and assume responsibility over your financial
              destiny. Get going at once!
            </p>
            <div className="flex flex-row items-center justify-center w-full  gap-4">
              <SearchStock></SearchStock>
            </div>
          </div>
        </main>
      </section>
      <section className="w-full  bg-custom-bg pt-4 pb-24">
        <main className="w-full h-full flex flex-col items-center gap-4">
          <ScrollContainer></ScrollContainer>
        </main>
      </section>
    </>
  );
}
