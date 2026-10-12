import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { upcomingEvents } from "../../data/content";
import { staggerContainer, fadeUpVariants } from "../../lib/animations";
import { UpcomingEventsVideoBackground } from "../../pages/Home/animation/animation.jsx";

// Calculate date-based animation progress from 1st of month to event date
function getDateProgress(dateString, now) {
  try {
    const normalizedDate = dateString.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
    const eventDate = new Date(normalizedDate);
    const today = now;
    
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.getMonth();
    const eventYear = eventDate.getFullYear();
    
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    // Days from 1st to event date
    const totalDays = eventDay - 1;
    
    // If today is in the same month and year as event
    if (todayMonth === eventMonth && todayYear === eventYear) {
      const daysSinceFirst = todayDay - 1;
      const progress = Math.max(0, Math.min(100, (daysSinceFirst / totalDays) * 100));
      return { progress };
    } else if (today < eventDate) {
      // Event is in the future, not yet started
      return { progress: 0 };
    } else {
      // Event has passed
      return { progress: 100 };
    }
  } catch (e) {
    console.warn("Could not parse date:", dateString);
    return { progress: 50 };
  }
}

function getMonthStartLabel(dateString) {
  const normalizedDate = dateString.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
  const eventDate = new Date(normalizedDate);
  if (Number.isNaN(eventDate.getTime())) return "1st";

  const monthLabel = eventDate.toLocaleString("en-US", { month: "long" });
  return `1 ${monthLabel}`;
}

export function UpcomingEvents() {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="events" className="relative py-24 bg-black overflow-hidden">
      <UpcomingEventsVideoBackground />
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-premium-heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Upcoming Events
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your boarding passes to innovation - secure your seat at our
            upcoming events
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {upcomingEvents.map((event) => {
            const progress = getDateProgress(event.date, now).progress;

            return (
              <motion.div
                key={event.id}
                variants={fadeUpVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:glow-blue transition-all duration-300"
              >
              {/* Boarding Pass Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    Destination
                  </span>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                    {event.id}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {event.title}
                </h3>

                {/* Flight Line - Date-based Progress */}
                <div className="relative flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <div className="flex-1 h-0.5 bg-linear-to-r from-blue-500 to-blue-300 relative">
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2"
                      initial={{ left: "0%" }}
                      animate={{ left: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Plane className="w-4 h-4 text-blue-400 -translate-x-1/2" />
                    </motion.div>
                  </div>
                  <div className="w-3 h-3 bg-blue-300 rounded-full" />
                </div>
                {/* Date Progress Label */}
                <div className="text-xs text-slate-500 mt-2">
                  Departing: {getMonthStartLabel(event.date)} → Arriving: {event.date}
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="uppercase">Gate</span>
                    </div>
                    <p className="text-blue-400 text-sm font-medium">
                      {event.location}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="uppercase">Departure</span>
                    </div>
                    <p className="text-blue-400 text-sm font-medium">
                      {event.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dashed Separator */}
              <div className="relative h-px">
                <div className="absolute inset-0 border-t-2 border-dashed border-slate-700" />
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full" />
              </div>

              {/* Boarding Pass Footer */}
              <div className="p-6 pt-4">
                <div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Clock className="w-3 h-3" />
                      <span className="uppercase">Seat</span>
                    </div>
                    <p className="text-white font-semibold">{event.time}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
