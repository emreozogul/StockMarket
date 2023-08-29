import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SearchStock from "@/components/home/SearchStock";

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
      <section className="w-full bg-tremor-background pt-4 pb-24">
        <main className="w-full h-full flex flex-col items-center gap-4">
          <div className="w-2/3 h-full bg-gradient-to-r from-custom-primary to-custom-secondary rounded-lg p-4">
            <motion.h1
              className="text-custom-text text-4xl font-bold "
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3 }}
            >
              Unlock Your Potential with Real-Time Stock Insights!
            </motion.h1>
            <motion.p
              className="text-custom-text text-lg font-semibold "
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3 }}
            >
              Keep up to date with breaking news, current stock information, and
              strong indicators. Make your experience unique, take advantage of
              possibilities, and assume responsibility over your financial
              destiny. Get going at once!
            </motion.p>
            <motion.div
              className="flex flex-row items-center justify-center w-full  gap-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3 }}
            >
              <SearchStock></SearchStock>
            </motion.div>
          </div>
        </main>
      </section>
      <section className="w-full h-screen bg-tremor-background pt-4 pb-24">
        <main className="w-full h-full flex flex-col items-center gap-4">
          <div className="w-2/3 h-full bg-gradient-to-r from-custom-primary to-custom-secondary rounded-lg p-4">
            <motion.h1
              className="text-custom-text text-4xl font-bold "
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3 }}
            >
              Recent news
            </motion.h1>
            <motion.p
              className="text-custom-text text-lg font-semibold "
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3 }}
            >
              Keep up to date with breaking news, current stock information, and
              strong indicators. Make your experience unique, take advantage of
              possibilities, and assume responsibility over your financial
              destiny. Get going at once!
            </motion.p>
          </div>
        </main>
      </section>
    </>
  );
}

/**
 * <div
            className="w-2/3 h-full bg-gradient-to-r from-custom-primary to-custom-secondary rounded-lg p-4"
            ref={ref}
          >
            <motion.h1
              className="text-custom-text text-4xl font-bold py-4"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: display ? 1 : 0, x: display ? 0 : -100 }}
              transition={{ duration: 1.3 }}
            >
              Search for a Stock
            </motion.h1>
            <motion.p
              className="text-custom-text text-lg font-semibold py-4"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: display ? 1 : 0, x: display ? 0 : -100 }}
              transition={{ duration: 1.3 }}
            >
              Search for a stock by its ticker symbol. For example, search for
              "AAPL" to get information about Apple.
            </motion.p>
          </div>
 */
