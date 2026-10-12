import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingAnimation({ onComplete }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["INNOVATE", "CREATE", "GROW", "E-CELL HMRITM"];

  useEffect(() => {
    const wordDuration = 1500; // Each word stays for 1.5 seconds
    const totalDuration = words.length * wordDuration;

    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, wordDuration);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDuration + 800); // Extra time for the last word

    return () => {
      clearInterval(wordTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, words.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Subtle animated gradient overlay - navy blue only */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(30, 58, 138, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(30, 58, 138, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Words animation */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWordIndex}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider"
                style={{
                  WebkitTextStroke: "2px #1e3a8a",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(30, 58, 138, 0.6)",
                }}
              >
                {words[currentWordIndex]}
              </h1>
              
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent mt-8 mx-auto"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-900 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
