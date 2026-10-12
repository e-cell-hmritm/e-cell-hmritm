import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, MapPin, Sliders, Search, X } from 'react-feather';

import './Event.css';
import DarkVeil from './DarkVeil';
import { Button } from '../../components/ui/button';
import SharkTank from '../../assets/UpcomingEvent/sharktank.png';
import fsmiitd01 from '../../assets/EventArchive/FSMIITD/01.jpeg';
import fsmiitd02 from '../../assets/EventArchive/FSMIITD/02.jpeg';
import fsmiitd03 from '../../assets/EventArchive/FSMIITD/03.jpeg';
import fsmiitd04 from '../../assets/EventArchive/FSMIITD/04.jpeg';
import fsmiitd05 from '../../assets/EventArchive/FSMIITD/05.jpeg';
import fsmiitd06 from '../../assets/EventArchive/FSMIITD/06.jpeg';
import fsmiitd07 from '../../assets/EventArchive/FSMIITD/07.jpeg';
import fsmiitd08 from '../../assets/EventArchive/FSMIITD/08.jpeg';
import fsmiitd09 from '../../assets/EventArchive/FSMIITD/09.jpeg';
import fsmiitd10 from '../../assets/EventArchive/FSMIITD/10.jpeg';
import fsmiitd11 from '../../assets/EventArchive/FSMIITD/11.jpeg';
import fsmiitd12 from '../../assets/EventArchive/FSMIITD/12.jpeg';
import fsmiitd13 from '../../assets/EventArchive/FSMIITD/13.jpeg';
import fsmiitd14 from '../../assets/EventArchive/FSMIITD/14.jpeg';
import fsmiitd15 from '../../assets/EventArchive/FSMIITD/15.jpeg';
import fsmiitd16 from '../../assets/EventArchive/FSMIITD/16.jpeg';
import fsmiitd17 from '../../assets/EventArchive/FSMIITD/17.jpeg';
import fsmlab from '../../assets/EventArchive/FSMIITD/iitd.jpeg';

const labGallery = [
  fsmiitd01,
  fsmiitd02,
  fsmiitd03,
  fsmiitd04,
  fsmiitd05,
  fsmiitd06,
  fsmiitd07,
  fsmiitd08,
  fsmiitd09,
  fsmiitd10,
  fsmiitd11,
  fsmiitd12,
  fsmiitd13,
  fsmiitd14,
  fsmiitd15,
  fsmiitd16,
  fsmiitd17,
];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filters = ['All Events', 'Workshops', 'Guest Lectures', 'Competitions', 'Hackathons'];

  const events = [
    {
      id: 1,
      title: 'Campus Shark Tank 2026',
      category: 'Competitions',
      date: 'April 17',
      time: '10:00 AM - 04:00 PM',
      location: 'HMRITM Auditorium',
      image: SharkTank,
      status: 'Ongoing',
      ctaLabel: 'Registration Closed',
      registrationClosed: true,
      ctaHref: '',
      downloadHref: 'https://drive.google.com/file/d/1hIEkxG9n6MmTyLDOeGwCKuzrTkDLmVup/view?usp=sharing',
    },
    {
      id: 2,
      title: 'FSM Lab Industrial Visit',
      category: 'Workshops',
      date: 'April 06, 2026',
      time: '11:00 AM - 01:00 PM',
      location: 'FSM Lab, IIT Delhi',
      image: fsmlab,
      status: 'Past',
      ctaLabel: 'Click',
      recapTitle: 'What we saw inside the lab',
      recapDescription:
        'The visit focused on how the FSM Lab operates as a hands-on prototyping space. Students explored practical setups, observed the workflow behind fabrication and experimentation, and discussed how an idea moves from a sketch to a testable build.',
      recapPoints: [
        'How a structured lab workflow helps ideas move faster from concept to prototype.',
        'The importance of iteration, precision, and safe handling of tools during build work.',
        'How collaborative problem-solving improves both the process and the final output.',
      ],
      learnings: [
        'Prototyping is strongest when teams validate early and improve quickly.',
        'Clean documentation and disciplined execution matter as much as the final model.',
        'A modern lab is a mix of tools, process, and teamwork rather than just equipment.',
      ],
      gallery: labGallery,
    },
  ];

  const visibleEvents = activeFilter === 'All Events'
    ? events
    : events.filter((event) => event.category === activeFilter);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [selectedEvent]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <DarkVeil
          hueShift={17}
          noiseIntensity={0.25}
          scanlineIntensity={0.05}
          speed={2}
          scanlineFrequency={2.5}
          warpAmount={0.15}
        />
      </div>

      <div className="relative z-10">
        <section className="relative px-6 py-12 lg:px-20 lg:py-20 max-w-7xl mx-auto">
          {/* <div className="flex justify-center">
            <Button className="rounded-full bg-blue-950 hover:bg-blue-900 text-white border border-blue-700/60 px-6 py-5 shadow-lg shadow-blue-950/30">
              View All Events
            </Button>
          </div> */}
        </section>

        <section className="px-6 py-4 lg:px-20 sticky top-18.25 z-40 bg-background-dark/95 backdrop-blur-sm border-b border-white/5">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === filter ? 'bg-blue-950 text-white border border-blue-700/70' : 'bg-blue-950/30 text-slate-200 border border-blue-800/40 hover:bg-blue-900/50'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-neutral-muted md:mt-0 mt-2">
              <Sliders size={18} />
              <span>Sort by: Newest</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleEvents.map((event, index) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -10 }}
                className="glass-card group overflow-hidden border-white/5 hover:border-primary/50 transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900/80 border border-dashed border-white/20 flex items-center justify-center text-xs text-slate-400 uppercase tracking-wider">
                      Add imported event image
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-950/80 backdrop-blur-md text-white text-xs rounded-full border border-blue-700/50">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blue-950/85 text-white border border-blue-700/50 backdrop-blur-md">
                    {event.status}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors font-display">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-6 text-sm text-neutral-muted">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {event.status === 'Upcoming' ? (
                    <div className="grid grid-cols-2 gap-3">
                      {event.registrationClosed || !event.ctaHref ? (
                        <button
                          type="button"
                          disabled
                          className="w-full bg-white/5 text-slate-400 font-bold py-3 rounded-xl transition-all border border-white/10 cursor-not-allowed opacity-70"
                        >
                          {event.ctaLabel || 'Registration Closed'}
                        </button>
                      ) : (
                        <a
                          href={event.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="w-full bg-white/5 hover:bg-primary hover:text-neutral-dark font-bold py-3 rounded-xl transition-all border border-white/10 hover:border-primary">
                            {event.ctaLabel}
                          </button>
                        </a>
                      )}
                      <a
                        href={event.downloadHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition-all border border-blue-700/60 shadow-lg shadow-blue-950/30">
                          Download
                        </button>
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={event.registrationClosed ? undefined : () => setSelectedEvent(event)}
                      disabled={Boolean(event.registrationClosed)}
                      className={`w-full bg-blue-950 text-white font-bold py-3 rounded-xl transition-all border border-blue-700/60 shadow-lg shadow-blue-950/30 ${event.registrationClosed ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-900 hover:scale-[1.01]'}`}
                    >
                      {event.ctaLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-x-0 top-20 bottom-0 z-100 flex items-start justify-center overflow-hidden p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEvent(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xl cursor-pointer pointer-events-auto"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                className="relative z-10 w-full max-w-6xl max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-slate-950 shadow-[0_40px_120px_rgba(0,0,0,0.55)] pointer-events-auto"
              >
                  <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative h-72 sm:h-80 lg:min-h-full lg:h-auto">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-md">
                        {selectedEvent.status} event recap
                      </span>
                      <h3 className="mt-4 text-3xl sm:text-4xl font-black text-white leading-tight">
                        {selectedEvent.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-200/90">
                        {selectedEvent.recapDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col bg-slate-950/95">
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">Lab visit details</p>
                        <h4 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                          {selectedEvent.recapTitle}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-700/50 bg-blue-950/70 text-white transition-colors hover:bg-blue-900"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="p-5 sm:p-6 custom-scrollbar">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {selectedEvent.recapPoints.map((point) => (
                          <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-slate-200 leading-6">{point}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-5 sm:p-6">
                        <h5 className="text-lg font-bold text-white mb-3">What we learned</h5>
                        <ul className="space-y-3">
                          {selectedEvent.learnings.map((learning) => (
                            <li key={learning} className="flex gap-3 text-sm text-slate-200/90 leading-6">
                              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.8)]" />
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-lg font-bold text-white">Captured moments</h5>
                          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">FSMIITD Gallery</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                          {selectedEvent.gallery.slice(0, 9).map((image, imageIndex) => (
                            <motion.div
                              key={`${selectedEvent.id}-${imageIndex}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: imageIndex * 0.03 }}
                              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
                            >
                              <img
                                src={image}
                                alt={`${selectedEvent.title} moment ${imageIndex + 1}`}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* <section className="px-6 py-20 lg:px-20 bg-neutral-dark/30 text-white mt-12 border-y border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-display">Our Legacy & Impact</h2>
              <p className="text-neutral-muted max-w-2xl mx-auto">Revisit the milestones that have shaped the entrepreneurial culture at HMRITM. Over 2000+ students impacted through 50+ events.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative group h-64 rounded-2xl overflow-hidden col-span-1 lg:col-span-2">
                <img className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" src={SharkTank} alt="Legacy" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-primary font-bold text-sm mb-1 uppercase tracking-wider">Impact Event</span>
                  <h4 className="text-xl font-bold mb-1 font-display">E-Summit '23 Highlights</h4>
                  <p className="text-xs text-neutral-muted uppercase tracking-widest">500+ Participants • 12 Speakers</p>
                </div>
              </div>
              <div className="relative group h-64 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-slate-900/80 border border-dashed border-white/20 flex items-center justify-center text-xs text-slate-400 uppercase tracking-wider">
                  Import legacy image
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-lg font-bold mb-1 font-display">Code-to-Cash Hack</h4>
                  <p className="text-xs text-neutral-muted">48 Hours of Innovation</p>
                </div>
              </div>
              <div className="relative group h-64 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-slate-900/80 border border-dashed border-white/20 flex items-center justify-center text-xs text-slate-400 uppercase tracking-wider">
                  Import legacy image
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-lg font-bold mb-1 font-display">Founder's Circle</h4>
                  <p className="text-xs text-neutral-muted">1:1 Mentorship Sessions</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Events;
