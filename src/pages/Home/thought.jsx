import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import DirectorImage from "../../assets/TeamMember/Vivek_pandey_director.jpeg"
import FemaleImage from "../../assets/TeamMember/female.webp";

import shalini from "../../assets/TeamMember/shalini_dd.jpeg";

const testimonials = [
  {
    id: 1,
    name: "Dr. V C Pandey",
    role: "Director of HMRITM",
    image: DirectorImage,
    quote:
      "It gives me immense pleasure to witness the vibrant efforts of the E-Cell Society at HMR Institute of Technology & Management in fostering a culture of innovation and entrepreneurship among our students. In today’s dynamic and competitive world, nurturing an entrepreneurial mindset is not just desirable but essential.\nInitiatives like Campus Shark Tank reflect our commitment to experiential learning, critical thinking, and real-world problem-solving. Such platforms empower students to transform ideas into impactful solutions while building confidence and leadership skills. \n I commend the dedication and vision of the E-Cell team for creating opportunities that inspire creativity and collaboration. These efforts significantly contribute to shaping future-ready professionals and responsible innovators. \n I encourage all students to actively participate, explore their potential, and embrace the spirit of innovation. Wishing the E-Cell continued success in all its endeavours.",
  },
  {
    id: 2,
    name: "Dr. Shalini Gupta",
    role: "Deputy Director of HMRITM",
    image: shalini,
    quote:
      "E-Cell should always feel like a launchpad for curiosity. When students get a space to experiment, collaborate, and present ideas without fear, they build the confidence to turn a thought into an actual venture. That is the environment we want to keep strengthening here.",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      type: "spring",
      bounce: 0.3,
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  }),
};

export function Thought() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const activeTestimonial = testimonials[activeIndex];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const showPrevious = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeIndex, isHovered]);

  return (
    <section id="thought" className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-80 z-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(36, 96, 255, 0.14) 0%, transparent 34%), radial-gradient(circle at 50% 0%, rgba(202, 164, 92, 0.08) 0%, transparent 26%), radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.04) 0%, transparent 24%), radial-gradient(circle at 15% 80%, rgba(36, 96, 255, 0.06) 0%, transparent 22%)",
        }}
      />

      <motion.div
        className="absolute left-[8%] top-[12%] h-32 w-32 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(202,164,92,0.12) 0%, transparent 70%)" }}
        animate={{ y: [0, -16, 0], x: [0, 10, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[8%] h-40 w-40 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(36,96,255,0.10) 0%, transparent 70%)" }}
        animate={{ y: [0, 18, 0], x: [0, -12, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col items-center justify-center text-center"
        >
          <p
            className="text-[clamp(1.9rem,10vw,5rem)] leading-none font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em]"
            style={{
              color: "#caa45c",
              fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
            }}
          >
            TESTIMONIALS
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-8">
            
            {/* Prev Button (Desktop) */}
            <div className="hidden lg:block shrink-0">
              <button
                onClick={showPrevious}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#11141a]/80 text-[#caa45c] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#caa45c]/50 hover:bg-[#caa45c]/10 hover:shadow-[0_0_20px_rgba(202,164,92,0.3)]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
            </div>

            {/* Testimonial Card */}
            <div 
              className="group relative w-full lg:flex-1 perspective-[2000px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0c10]/80 px-6 py-12 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:px-12 sm:py-20 lg:p-16"
              >
                {/* Spotlight effect */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(202, 164, 92, 0.12),
                        transparent 80%
                      )
                    `,
                  }}
                />

                <div className="absolute right-6 top-6 text-white/5 sm:right-10 sm:top-10">
                   <Quote size={140} className="rotate-12" />
                </div>

                <div className="relative z-10 w-full min-h-64 flex items-center justify-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col items-center text-center w-full"
                    >
                      {/* Image */}
                      <div className="relative mb-10 h-28 w-28 sm:h-32 sm:w-32">
                        <motion.div 
                           className="absolute inset-0 rounded-full bg-linear-to-br from-[#caa45c]/80 to-blue-600/80 blur-lg opacity-40"
                           animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-black p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                          <img
                            src={activeTestimonial.image}
                            alt={activeTestimonial.name}
                            className="h-full w-full rounded-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                      </div>

                      {/* Quote */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative mb-10 max-w-3xl"
                      >
                         <Quote className="absolute -left-4 -top-4 sm:-left-8 sm:-top-6 h-6 w-6 sm:h-8 sm:w-8 text-[#caa45c]/40 rotate-180" />
                         <p className="text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl lg:text-2xl lg:leading-loose">
                           {activeTestimonial.quote}
                         </p>
                         <Quote className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-6 h-6 w-6 sm:h-8 sm:w-8 text-[#caa45c]/40" />
                      </motion.div>

                      {/* Author */}
                      <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4, duration: 0.8 }}
                      >
                        <h3 className="text-2xl font-bold tracking-wide text-white sm:text-3xl" style={{ fontFamily: "'Oswald', 'Arial Narrow', sans-serif" }}>
                          {activeTestimonial.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-[#caa45c] uppercase">
                          {activeTestimonial.role}
                        </p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Indicators */}
                <div className="mt-12 flex items-center justify-center gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > activeIndex ? 1 : -1);
                        setActiveIndex(index);
                      }}
                      className="group relative h-2 py-2"
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      <span 
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full transition-all duration-500 ease-out ${
                          index === activeIndex ? "w-10 bg-[#caa45c] shadow-[0_0_10px_rgba(202,164,92,0.8)]" : "w-4 bg-white/20 group-hover:bg-white/40 group-hover:w-6"
                        }`} 
                      />
                    </button>
                  ))}
                </div>

              </motion.div>
            </div>

            {/* Next Button (Desktop) */}
            <div className="hidden lg:block shrink-0">
              <button
                onClick={showNext}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#11141a]/80 text-[#caa45c] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#caa45c]/50 hover:bg-[#caa45c]/10 hover:shadow-[0_0_20px_rgba(202,164,92,0.3)]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile Navigation controls */}
            <div className="mt-8 flex w-full items-center justify-between lg:hidden px-4">
              <button
                onClick={showPrevious}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#11141a]/80 text-[#caa45c] backdrop-blur-sm active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={showNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#11141a]/80 text-[#caa45c] backdrop-blur-sm active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
