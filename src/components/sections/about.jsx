// import { motion } from "framer-motion";
// import { Target, Users, Lightbulb, Rocket } from "lucide-react";
// import { aboutCards } from "../../data/content";
// import { staggerContainer, fadeUpVariants } from "../../lib/animations";

// const iconMap = { Target, Users, Lightbulb, Rocket };

// export function About() {
//   return (
//     <section id="about" className="relative py-24 bg-black overflow-hidden">
//       <div className="absolute inset-0 bg-radial-gradient opacity-50" />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
//             About E-Cell
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             The Entrepreneurship Cell at HMRITM is dedicated to nurturing the
//             next generation of innovators and business leaders.
//           </p>
//         </motion.div>

//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {aboutCards.map((card) => {
//             const Icon = iconMap[card.icon];
//             return (
//               <motion.div
//                 key={card.title}
//                 variants={fadeUpVariants}
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
//               >
//                 <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:glow-blue transition-all duration-300">
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-white font-semibold text-lg mb-3">
//                   {card.title}
//                 </h3>
//                 <p className="text-slate-400 text-sm leading-relaxed">
//                   {card.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
