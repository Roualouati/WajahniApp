'use client';

import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OnboardingTest() {
  const [progress, setProgress] = useState(0);

  // Simulate loading progress for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const guidelines = [
    "Answer each statement based on your personal opinion",
    "You cannot skip questions - answer all to proceed",
    "The test takes about 5-7 minutes to complete"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-100 opacity-20"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            animate={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              transition: {
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      {/* Logo with animation */}
      <motion.div 
        className="fixed left-5 top-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img src="/logo.png" alt="Logo" className="w-[180px] h-auto drop-shadow-sm" />
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 relative z-10 px-4 py-20">
        {/* Animated progress bar */}
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-orange-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Illustration with floating animation */}
        <motion.div
          className="w-56 h-56 relative mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute -inset-4 rounded-2xl bg-orange-50 opacity-30 blur-lg"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl border-4 border-white shadow-lg relative"
          >
            <source src="/guide.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Title with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Guidelines</h2>
          <p className="text-gray-500">Let's get you started</p>
        </motion.div>

        {/* Guidelines list with staggered animation */}
        <div className="space-y-4 text-lg max-w-md mx-auto w-full">
          {guidelines.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 text-gray-700 text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <CheckCircle className="text-green-500 w-6 h-6 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Start button with hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="pt-4"
        >
          <Link href="/test" passHref>
            <motion.button
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-green-200 transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin  Test
              <motion.span
                initial={{ x: 0 }}
                animate={{
                  x: [0, 4, 0],
                  transition: { repeat: Infinity, duration: 2 }
                }}
                className="group-hover:translate-x-1 transition-transform"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}