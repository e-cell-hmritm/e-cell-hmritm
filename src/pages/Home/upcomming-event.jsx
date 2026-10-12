import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Plane } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { upcomingEvents } from '@/data/content';
import { staggerContainer, fadeUpVariants } from '@/lib/animations';

export default function UpcomingEvents() {
  return (
    <section id="events" className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Upcoming Events
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your boarding passes to innovation - secure your seat at our upcoming events
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={fadeUpVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:glow-blue transition-all duration-300"
            >
              {/* Boarding Pass Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Destination</span>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                    {event.id}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>
                
                {/* Flight Line */}
                <div className="relative flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <div className="flex-1 h-0.5 bg-linear-to-r from-blue-500 to-blue-300 relative">
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                  </div>
                  <div className="w-3 h-3 bg-blue-300 rounded-full" />
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="uppercase">Gate</span>
                    </div>
                    <p className="text-blue-400 text-sm font-medium">{event.location}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="uppercase">Departure</span>
                    </div>
                    <p className="text-blue-400 text-sm font-medium">{event.date}</p>
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
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Clock className="w-3 h-3" />
                      <span className="uppercase">Seat</span>
                    </div>
                    <p className="text-white font-semibold">{event.time}</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-slate-500 text-xs">QR</span>
                    </div>
                  </div>
                </div>

                {/* Passengers Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">Passengers</span>
                  <span className="text-blue-400 text-xs font-medium">{event.seats} seats available</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 w-3 rounded-sm ${
                        i < 5 ? 'bg-blue-600' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}