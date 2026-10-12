import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Ticket, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { upcomingEvents } from '@/data/content';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: '',
    category: 'student',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="register" className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Event Registration
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Register for upcoming events and get your digital ticket
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Ticket Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {formData.name || formData.email ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                >
                  {/* Ticket Header */}
                  <div className="bg-blue-600 p-4 text-center">
                    <Ticket className="w-8 h-8 text-white mx-auto mb-2" />
                    <span className="text-white font-bold">DIGITAL TICKET</span>
                  </div>
                  
                  {/* Ticket Body */}
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-slate-500 text-xs uppercase">Attendee</span>
                      <p className="text-white font-semibold">{formData.name || 'Your Name'}</p>
                    </div>
                    <div className="mb-4">
                      <span className="text-slate-500 text-xs uppercase">Event</span>
                      <p className="text-blue-400 font-semibold">
                        {formData.event || 'Select an Event'}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-slate-500 text-xs uppercase">Category</span>
                        <p className="text-white capitalize">{formData.category}</p>
                      </div>
                      <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
                        <span className="text-slate-500 text-xs">QR</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashed Line */}
                  <div className="relative h-px">
                    <div className="absolute inset-0 border-t-2 border-dashed border-slate-700" />
                  </div>
                  
                  {/* Ticket Footer */}
                  <div className="p-4 text-center">
                    <span className="text-slate-500 text-xs">E-Cell Tech | HMRITM</span>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl p-12 text-center">
                  <Ticket className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500">Start filling the form to see your ticket preview</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Event Selection */}
                <div>
                  <Label htmlFor="event" className="text-white mb-2 block">Select Event</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <select
                      id="event"
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    >
                      <option value="">Choose an event</option>
                      {upcomingEvents.map((event) => (
                        <option key={event.id} value={event.title}>
                          {event.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label className="text-white mb-2 block">Category</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'student' })}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.category === 'student'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'professional' })}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.category === 'professional'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      Professional
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 py-6 text-base font-medium glow-blue"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Registration Complete!
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}