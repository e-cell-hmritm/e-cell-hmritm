import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";
import { Button } from "../ui/button";
import { eventsArchive, eventsGallery } from "../../data/event_archive";

const compassAngles = {
  east: 0,
  south: 72,
  west: 144,
  north: 216,
  northEast: 288,
};



export function EventsArchive() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const selectedEventGallery = selectedEvent
    ? eventsGallery.filter((imgItem) => imgItem.category === selectedEvent.title)
    : [];

  // Close gallery properly using Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    if (selectedEvent) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

  const ORBIT_DURATION = 40; // slow-medium motion

  return (
    <section
      id="events-archive"
      className="relative py-24 bg-black overflow-hidden min-h-175"
    >
      <div className="absolute inset-0 bg-radial-gradient opacity-50" />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
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
          className="text-center mb-12"
        >
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
           A glimpse into our E-Cell activities workshops, events, and the vibrant community we have built.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-5 glow-blue">
              View All Events
            </Button>
          </motion.div>
        </motion.div>

        {/* Orbital Layout */}
        <div className="relative h-125 flex items-center justify-center">
          <motion.div
            className="absolute w-100 h-100 border border-slate-800/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-75 h-75 border border-slate-800/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          

          {/* Center Logo */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-20 w-32 h-32 bg-linear-to-br from-blue-600 to-blue-800 rounded-full flex flex-col items-center justify-center glow-blue"
          >
            <span className="text-white font-bold text-xl">E-CELL</span>
            <span className="text-blue-200 text-xs">HMRITM</span>
          </motion.div>

          {/* Orbital Container holding the cards */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
          >
            {/* Event Cards */}
            {eventsArchive.map((event, eventIndex) => {
              const angle = compassAngles[event.position] ?? 0;
              const radius = 200; // Distance from center

              return (
                <div
                  key={event.title}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  {/* Counter-rotate the child so it always stays upright */}
                  <motion.div
                    className="pointer-events-auto"
                    animate={{ rotate: -360 }}
                    transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: eventIndex * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        onClick={() => setSelectedEvent(event)}
                        whileHover={{ scale: 1.1, zIndex: 50 }}
                        className="relative w-35 h-25 rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start text-left">
                          <h4 className="text-white text-xs font-semibold leading-tight line-clamp-1">
                            {event.title}
                          </h4>
                          <span className="text-blue-400 text-[10px]">
                            {event.type}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Gallery Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 pt-24 sm:p-6 sm:pt-28" style={{ pointerEvents: 'auto' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-3xl max-h-[75vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-black/20">
                <div className="pr-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 line-clamp-1">
                    {selectedEvent.title} Gallery
                  </h3>
                  <p className="text-blue-400 text-xs sm:text-sm">{selectedEvent.type || selectedEvent.date}</p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {selectedEventGallery.map((imgItem, idx) => (
                    <motion.div
                      key={imgItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative rounded-xl overflow-hidden aspect-video bg-slate-800"
                    >
                      <img
                        src={imgItem.image}
                        alt={imgItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {imgItem.title}
                        </span>
                        <span className="text-blue-400 text-xs translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {imgItem.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {/* Duplicate to fill space playfully to demonstrate a full gallery */}
                  {selectedEventGallery.map((imgItem, idx) => (
                    <motion.div
                      key={`dup-${imgItem.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx + 4) * 0.05 }}
                      className="group relative rounded-xl overflow-hidden aspect-video bg-slate-800"
                    >
                      <img
                        src={imgItem.image}
                        alt={imgItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 hue-rotate-15"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          More {imgItem.title}
                        </span>
                        <span className="text-blue-400 text-xs translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {imgItem.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


