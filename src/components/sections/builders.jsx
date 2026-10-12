import { motion } from "framer-motion";
import { CheckCircle, Users, Rocket, Target, Lightbulb, User } from "lucide-react";
import { builders } from "../../data/content";
import RadialOrbitalTimeline from "../ui/radial-orbital-timeline";

const iconMap = { CheckCircle, Users, Rocket, Target, Lightbulb };

export function Builders() {
  const timelineData = builders.map((b, i) => {
    return {
      id: i + 1,
      title: b.name || b.title || `Builder ${i + 1}`,
      date: b.code || b.count || `B-${(i + 1).toString().padStart(3, '0')}`,
      content: b.description || b.role || "Elite builder operating the command center.",
      category: "Builder",
      icon: iconMap[b.icon] || iconMap[b.iconMapKey] || User,
      relatedIds: [], 
      status: b.status === "pending" ? "pending" : (b.status === "in-progress" ? "in-progress" : "completed"),
      image: b.image,
      role: b.role,
      tech: b.tech,
      mission: b.mission,
      socials: b.socials,
      profile: b.profile
    };
  });

  timelineData.forEach((item, i) => {
    item.relatedIds = [
      ((i + 1) % timelineData.length) + 1,
      (i === 0) ? timelineData.length : i
    ].filter(id => id !== item.id && id > 0);
    item.relatedIds = [...new Set(item.relatedIds)];
  });

  return (
    <section
      id="builders"
      className="relative pt-12 pb-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black overflow-hidden min-h-[900px]"
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="section-premium-heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Meet the Builders
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-2">
            Elite crew operating the command center
          </p>
        </motion.div>

        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
