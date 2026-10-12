import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Calendar, Rocket, Heart } from "lucide-react";
import { stats } from "../../data/content";
import { staggerContainer, fadeUpVariants } from "../../lib/animations";

const iconMap = { Users, Calendar, Rocket, Heart };

function useCountUp(end, duration = 2, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatCard({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.value, 2, isInView);
  const Icon = iconMap[stat.icon];

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center hover:border-blue-500/30 hover:glow-blue transition-all duration-300"
    >
      <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600/30 transition-colors">
        <Icon className="w-7 h-7 text-blue-400" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-slate-400 font-medium">{stat.label}</div>
    </motion.div>
  );
}

export function Impact() {
  return (
    <section id="impact" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Our Impact
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Numbers that showcase our journey and achievements
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
