// ...existing code...
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, User, Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { contestWinners } from '@/data/content';
import { staggerContainer, fadeUpVariants } from '@/lib/animations';

const rankColors = {
  '1st Place': 'from-yellow-500 to-amber-600',
  '2nd Place': 'from-slate-400 to-slate-500',
  '3rd Place': 'from-amber-700 to-amber-800',
  'Winner': 'from-blue-500 to-blue-600',
};

const rankBadges = {
  '1st Place': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  '2nd Place': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  '3rd Place': 'bg-amber-700/20 text-amber-600 border-amber-700/30',
  'Winner': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export default function Winners() {
  const featuredWinner = contestWinners[0];
  const otherWinners = contestWinners.slice(1);

  return (
    <section id="winners" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
            Contest Winners
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            Celebrating innovation and excellence
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-5 glow-blue">
              View All Past Winners
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 hover:glow-blue transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className={`w-32 h-32 rounded-full bg-linear-to-br ${rankColors[featuredWinner.rank]} flex items-center justify-center glow-blue`}>
                  <Trophy className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <Badge className={`mb-4 ${rankBadges[featuredWinner.rank]}`}>
                  <Star className="w-3 h-3 mr-1" />
                  {featuredWinner.rank}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {featuredWinner.name}
                </h3>
                <p className="text-blue-400 font-medium mb-2">{featuredWinner.project}</p>
                <p className="text-slate-400 mb-4">{featuredWinner.description}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
                  <div>
                    <span className="text-slate-500 text-xs uppercase block mb-1">Event</span>
                    <span className="text-white font-medium">{featuredWinner.event}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs uppercase block mb-1">Prize</span>
                    <span className="text-blue-400 font-medium">{featuredWinner.prize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{featuredWinner.id}</span>
                  </div>
                  <Barcode className="w-16 h-8 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {otherWinners.map((winner) => (
            <motion.div
              key={winner.name}
              variants={fadeUpVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${rankColors[winner.rank]} flex items-center justify-center`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <Badge className={rankBadges[winner.rank]}>
                  {winner.rank}
                </Badge>
              </div>

              <h4 className="text-lg font-bold text-white mb-1">{winner.name}</h4>
              <p className="text-blue-400 text-sm font-medium mb-1">{winner.project}</p>
              <p className="text-slate-500 text-xs mb-4">{winner.description}</p>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-slate-500 text-xs uppercase block mb-1">Prize</span>
                <span className="text-blue-400 font-semibold">{winner.prize}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
// ...existing code...