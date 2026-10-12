import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { eventsGallery } from "../../data/content";
import G20 from "../../assets/EventGallery/G20.jpeg";
import Hacknovate from "../../assets/EventGallery/Hacknovate.jpeg";
import Seminar from "../../assets/EventGallery/Seminar.jpeg";
import ECellIPL from "../../assets/EventGallery/ecellipl.png";
import Image1 from "../../assets/EventGallery/eventgallery1.png";
import Image2 from "../../assets/EventGallery/eventGallery2.png";
import Image3 from "../../assets/EventGallery/eventGallery3.png";
import IITDFSM from "../../assets/EventGallery/iitdFSM.jpeg";

// ─── Add more images here as you import them ───────────────────────────────
// e.g.  import event2 from "../../assets/Logo/event2";
//       import event3 from "../../assets/Logo/event3";
// Then add them to the array:  const localImages = [logo, event2, event3];


const localImages = [G20, IITDFSM, Hacknovate, Seminar, ECellIPL, Image1, Image2, Image3];


export function EventsGallery() {
  const baseX = useMotionValue(0);
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const CARD_WIDTH = 354; // card width + gap
  const TOTAL_WIDTH = eventsGallery.length * CARD_WIDTH;

  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    let current = baseX.get();
    current -= (delta / 1000) * 55; // 55px per second
    if (current <= -TOTAL_WIDTH) current = 0;
    baseX.set(current);
  });

  // Triple-duplicate for seamless infinite loop
  const loopItems = [...eventsGallery, ...eventsGallery, ...eventsGallery];

  return (
    <section id="gallery" className="relative py-16 bg-black overflow-hidden">

      {/* Film Strip Top */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900 flex items-center justify-around z-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-3 bg-slate-800 rounded-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Film Strip Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-900 flex items-center justify-around z-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-3 bg-slate-800 rounded-sm"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Left fade edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, black, transparent)" }}
      />

      {/* Right fade edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, black, transparent)" }}
      />

      {/* Scrolling track */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-4 px-4 will-change-transform"
          style={{ x: baseX, width: "max-content" }}
        >
          {loopItems.map((event, index) => (
            <GalleryCard
              key={`${event.title}-${index}`}
              event={event}
              // Cycles through localImages — once you add more images they fill in automatically
              image={localImages[index % localImages.length]}
            />
          ))}
        </motion.div>
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />
    </section>
  );
}

function GalleryCard({ event, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 w-[300px] sm:w-[350px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="relative h-[200px] rounded-xl overflow-hidden cursor-pointer">

        {/* Local image — cycles through localImages array */}
        <motion.img
          src={image}
          alt={event.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Dark gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
          animate={{ opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
        />

        {/* Blue tint on hover */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(48,96,255,0.15), transparent)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Number badge */}
        <motion.div
          className="absolute top-3 right-3 backdrop-blur-sm px-2 py-1 rounded"
          animate={{
            backgroundColor: hovered ? "rgba(48,96,255,0.7)" : "rgba(0,0,0,0.6)",
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-white text-xs font-mono">{event.number}</span>
        </motion.div>

        {/* Shimmer line on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #6ab0ff, transparent)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Bottom info */}
        <motion.div
          className="absolute bottom-3 left-3 right-3"
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h4 className="text-white font-semibold text-sm mb-1">{event.title}</h4>
          <motion.p
            className="text-blue-400 text-xs"
            animate={{ opacity: hovered ? 1 : 0.7 }}
          >
            {event.date}
          </motion.p>
        </motion.div>

        {/* Corner accent on hover */}
        <motion.div
          className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(48,96,255,0.4), transparent)",
            borderRadius: "0 100% 0 12px",
          }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}