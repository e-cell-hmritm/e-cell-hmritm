import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import { teamMembers } from "../../data/content";
import { staggerContainer, fadeUpVariants } from "../../lib/animations";

export function Team() {
  return (
    <section id="team" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-2">
            Talented individuals working together to make a difference
          </p>
          <p className="text-blue-600 text-sm">
            Click on a card to learn more about each team member
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUpVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>

                <div className="flex justify-center gap-3">
                  <motion.a
                    href={member.socials.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.socials.linkedin}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.socials.twitter}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.socials.globe}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-green-500 hover:text-white transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
