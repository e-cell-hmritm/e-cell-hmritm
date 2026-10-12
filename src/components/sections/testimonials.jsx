import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/content";
import { staggerContainer, slideInLeft, slideInRight } from "../../lib/animations";

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              i < rating ? "text-blue-400 fill-blue-400" : "text-slate-700"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Single Card ─────────────────────────────────────────────────────────────
function TestimonialCard({ testimonial, index }) {
  const initial = testimonial.name?.trim()?.charAt(0)?.toUpperCase() || "A";

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <div
        className="relative w-80 sm:w-96 shrink-0 rounded-2xl p-5 overflow-hidden transition-all duration-500"
        style={{
          background: "rgba(10,12,24,0.92)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Quote icon */}
        <motion.div
          className="absolute top-4 right-4 opacity-10"
          whileHover={{ rotate: 10, scale: 1.2 }}
        >
          <Quote className="w-8 h-8 text-blue-400" />
        </motion.div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative shrink-0">
            {/* Ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(48,96,255,0.5)" }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-blue-200"
              style={{
                border: "1.5px solid rgba(48,96,255,0.3)",
                background:
                  "linear-gradient(135deg, rgba(22,34,72,0.95), rgba(38,68,146,0.85))",
              }}
              aria-label={testimonial.name}
            >
              {initial}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm leading-tight">
              {testimonial.name}
            </h4>
            <p className="text-blue-400 text-xs mt-0.5">{testimonial.role}</p>
          </div>
        </div>

        {/* Quote text */}
        <p className="text-slate-400 text-xs leading-relaxed mb-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <StarRating rating={testimonial.rating} />
          <div className="h-px w-12 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #6ab0ff)" }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Infinite Scroll Row ─────────────────────────────────────────────────────
function MarqueeRow({ items, direction = "left", speed = 30 }) {
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...items, ...items, ...items];
  const CARD_AND_GAP_WIDTH = 408;
  const TOTAL = items.length * CARD_AND_GAP_WIDTH;

  useEffect(() => {
    x.set(direction === "right" ? -TOTAL : 0);
  }, [x, direction, TOTAL]);

  useAnimationFrame((_, delta) => {
    if (isPaused || TOTAL <= 0) return;

    const move = (delta / 1000) * speed;
    let current = x.get();

    if (direction === "left") {
      current -= move;
      if (current <= -TOTAL) current = 0;
    } else {
      current += move;
      if (current >= 0) current = -TOTAL;
    }

    x.set(current);
  });

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #000000, transparent)" }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #000000, transparent)" }}
      />

      <motion.div className="flex gap-6 px-2 will-change-transform" style={{ x, width: "max-content" }}>
        {doubled.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export function Testimonials() {
  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3, 6);
  const thirdRow = testimonials.slice(6, 9);
  
  
  return (
    <section
      id="testimonials"
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Background radial */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(30,70,180,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Floating ambient orbs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "5%", width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(48,96,255,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "15%", right: "5%", width: "250px", height: "250px",
          background: "radial-gradient(circle, rgba(106,176,255,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-premium-heading text-4xl sm:text-5xl mb-4"
          >
            What People Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-400 text-base max-w-xl mx-auto"
          >
            Testimonials from our community members
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-6 h-px w-32"
            style={{ background: "linear-gradient(90deg, transparent, #3060ff, transparent)" }}
          />
        </motion.div>

        {/* Three auto-scroll rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {/* Row 1 */}
          <motion.div variants={slideInLeft}>
            <MarqueeRow items={firstRow} direction="left" speed={28} />
          </motion.div>

          {/* Row 2 */}
          <motion.div variants={slideInRight} className="sm:pl-8 lg:pl-16">
            <MarqueeRow items={secondRow} direction="right" speed={24} />
          </motion.div>

          {/* Row 3 */}
          <motion.div variants={slideInLeft} className="sm:pr-8 lg:pr-16">
            <MarqueeRow items={thirdRow} direction="left" speed={22} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
