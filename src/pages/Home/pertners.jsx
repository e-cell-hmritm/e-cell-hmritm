import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { partners } from '@/data/content';

function isImageSource(source) {
  return (
    typeof source === 'string' &&
    (source.startsWith('http://') ||
      source.startsWith('https://') ||
      source.startsWith('/') ||
      /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i.test(source))
  );
}

function PartnerLogo({ partner }) {
  const { name, image, logo } = partner;
  const sponsorLogo = image || logo;
  const displayLabel = typeof logo === 'string' && !isImageSource(logo) ? logo : name;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="shrink-0 w-44 h-28 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center px-6 hover:border-blue-500/30 hover:glow-blue transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {isImageSource(sponsorLogo) ? (
        <img
          src={sponsorLogo}
          alt={name}
          className="max-w-full max-h-16 object-contain"
        />
      ) : (
        <span className="text-slate-400 group-hover:text-white text-xl font-semibold transition-colors">
          {displayLabel}
        </span>
      )}
    </motion.div>
  );
}

export default function Partners() {
  // Double the partners array for seamless loop
  const doubledPartners = [...partners, ...partners];

  return (
    <section id="partners" className="relative py-24 bg-black overflow-hidden">
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
            Our Partners
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Trusted by leading organizations
          </p>
        </motion.div>

        {/* Marquee Row 1 */}
        <div className="relative mb-6 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-black to-transparent z-10" />
          <motion.div
            animate={{ x: [0, -50 * partners.length * 4] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-4"
          >
            {doubledPartners.map((partner, index) => (
              <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
            ))}
          </motion.div>
        </div>

        {/* Marquee Row 2 - Reverse */}
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-black to-transparent z-10" />
          <motion.div
            animate={{ x: [-50 * partners.length * 4, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-4"
          >
            {[...doubledPartners].reverse().map((partner, index) => (
              <PartnerLogo key={`${partner.name}-rev-${index}`} partner={partner} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-400 mb-4">Interested in partnering with us?</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-5 glow-blue">
              Become a Sponsor
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}