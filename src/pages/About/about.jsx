import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
    Eye, Rocket, Lightbulb, Users, ShieldCheck,
    Mail, Linkedin, Zap, Globe, Trophy, TrendingUp,
    Code2, Handshake, Flame, Star, ArrowRight, ChevronDown
} from 'lucide-react';
import { BackgroundBeams } from './bg-animation';
import DirectorImage from '../../assets/About/Director.jpeg'
import Image2 from '../../assets/About/abouttop2.png';
import Image3 from '../../assets/About/aboutTop3.png';
import Image4 from '../../assets/About/aboutTop4.jpeg';

/* ════════════════════ MAGNETIC BUTTON ══════════════════════════════════ */
function MagneticBtn({ children, className, variant = 'primary', onClick }) {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 200, damping: 15 });
    const y = useSpring(0, { stiffness: 200, damping: 15 });
    const onMove = e => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * .3);
        y.set((e.clientY - r.top - r.height / 2) * .3);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    return (
        <motion.button ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}
            whileTap={{ scale: .95 }} onClick={onClick}
            className={`relative overflow-hidden font-display font-bold tracking-wide transition-all duration-300 ${variant === 'primary'
                ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_0_32px_rgba(59,130,246,.4)] hover:shadow-[0_0_52px_rgba(59,130,246,.6)]'
                : 'bg-transparent border border-blue-500/35 text-white/80 hover:border-blue-400/70 hover:text-white backdrop-blur-sm'
                } ${className}`}>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.button>
    );
}

/* ════════════════════ ANIMATED COUNTER ═════════════════════════════════ */
function Counter({ value, duration = 1.8 }) {
    const num = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/[0-9]/g, '');
    const ref = useRef(null); const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let start = 0; const steps = 60;
        const step = Math.ceil(num / steps);
        const t = setInterval(() => {
            start = Math.min(start + step, num);
            if (ref.current) ref.current.textContent = start.toLocaleString() + suffix;
            if (start >= num) clearInterval(t);
        }, (duration * 1000) / steps);
        return () => clearInterval(t);
    }, [inView, num, suffix, duration]);
    return <span ref={ref}>0{suffix}</span>;
}

/* ════════════════════ FLOATING ORB ═════════════════════════════════════ */
function Orb({ size, color, top, left, delay = 0, blur = 80 }) {
    return (
        <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: size, height: size, top, left, background: color, filter: `blur(${blur}px)` }}
            animate={{ y: [0, -28, 0], scale: [1, 1.07, 1], opacity: [.3, .5, .3] }}
            transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }} />
    );
}

/* ════════════════════ SECTION HEADER ══════════════════════════════════ */
function SectionLabel({ label, title, center = false }) {
    return (
        <motion.div className={center ? 'text-center mb-16' : 'mb-14'}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
            {label && (
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/6 mb-4 ${center ? '' : ''}`}>
                    <span className="font-body text-xs text-blue-400 tracking-[.15em] uppercase">{label}</span>
                </div>
            )}
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
            {center && <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-5" />}
        </motion.div>
    );
}

/* ════════════════════ DATA ════════════════════════════════════════════ */
const STATS = [
    { value: "4+", label: "Events Hosted", Icon: Trophy, grad: "from-yellow-500/20 to-yellow-600/5" },
    { value: "7+", label: "Startups Mentored", Icon: Rocket, grad: "from-blue-500/20 to-blue-600/5" },
    { value: "1500+", label: "Students Impacted", Icon: Users, grad: "from-green-500/20 to-green-600/5" },
    { value: "5+", label: "Years of Impact", Icon: Star, grad: "from-purple-500/20 to-purple-600/5" },
];
const DIFF = [
    { Icon: Flame, label: "Founder-First Approach" },
    { Icon: TrendingUp, label: "Real-World Execution" },
    { Icon: Handshake, label: "Industry Mentorship" },
    { Icon: Code2, label: "Hands-On Workshops" },
    { Icon: Zap, label: "Hackathons & Events" },
    { Icon: Globe, label: "Community Culture" },
];
const MILESTONES = [
    { year: "2018", title: "Foundation", desc: "Inaugurated with 20 core members and a bold vision.", Icon: Star },
    { year: "2020", title: "First E-Summit", desc: "Flagship event with 500+ participants and industry leaders.", Icon: Trophy },
    { year: "2022", title: "Incubation Launch", desc: "Pre-incubation centre for campus startups established.", Icon: Rocket },
    { year: "2023", title: "Collaboration", desc: "National accelerators & investor networks onboarded.", Icon: Handshake },
    { year: "Now", title: "Expansion Phase", desc: "Empowering 1000+ students annually across programs.", Icon: Globe },
];

const VALUES = [
    { Icon: Lightbulb, title: "Innovation", desc: "Pushing limits of technology and business to craft meaningful solutions for tomorrow.", grad: "from-yellow-500/12 to-orange-500/4" },
    { Icon: Users, title: "Collaboration", desc: "The power of many minds working as one — we build stronger through shared vision.", grad: "from-blue-500/12 to-cyan-500/4" },
    { Icon: ShieldCheck, title: "Integrity", desc: "Unwavering ethics in every decision. Trust is the foundation of every great venture.", grad: "from-emerald-500/12 to-green-500/4" },
];

/* ══════════════════════════════════════════════════════════════════════ */
const About = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, .7], [1, 0]);

    return (
        <div className="text-white overflow-x-hidden relative min-h-screen" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            <BackgroundBeams className="fixed opacity-40" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
                .font-display{font-family:'Clash Display','Syne',sans-serif!important}
                .font-body{font-family:'DM Sans',sans-serif!important}
                .bg-grid{
                    background-image:linear-gradient(rgba(59,130,246,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.05) 1px,transparent 1px);
                    background-size:64px 64px;
                }
                .glass{background:rgba(255,255,255,.03);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
                .glass-md{background:rgba(255,255,255,.055);backdrop-filter:blur(20px)}
                .border-glow{border:1px solid rgba(59,130,246,.2)}
                .text-gradient{background:linear-gradient(135deg,#63b3ed,#3b82f6,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
                .lift{transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease}
                .lift:hover{transform:translateY(-8px) scale(1.015)}
                .neon{box-shadow:0 0 0 1px rgba(59,130,246,.25),inset 0 0 0 1px rgba(59,130,246,.08)}
                .neon:hover{box-shadow:0 0 0 1px rgba(59,130,246,.55),0 0 28px rgba(59,130,246,.14),inset 0 0 0 1px rgba(59,130,246,.18)}
                @keyframes aurora{0%,100%{transform:rotate(0deg) scale(1)}33%{transform:rotate(120deg) scale(1.1)}66%{transform:rotate(240deg) scale(.95)}}
                .animate-aurora{animation:aurora 14s linear infinite}
                @keyframes scan{0%{top:-5%}100%{top:105%}}
                .scan{animation:scan 5s linear infinite}
                ::-webkit-scrollbar{width:4px}
                ::-webkit-scrollbar-track{background:#020510}
                ::-webkit-scrollbar-thumb{background:rgba(59,130,246,.4);border-radius:4px}
                .shimmer::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.07) 50%,transparent 60%);transform:translateX(-100%);transition:transform .65s ease}
                .shimmer:hover::after{transform:translateX(100%)}
            `}</style>




            {/* ─── OUR STORY ────────────────────────────────────────── */}
            <section className="py-32 relative overflow-hidden">
                <Orb size={350} color="rgba(139,92,246,.06)" top="20%" left="-5%" blur={100} delay={1} />
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <SectionLabel title="Our Story" center />
                    <div className="grid lg:grid-cols-2 gap-20 items-center mt-12">
                        {/* mosaic */}
                        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="grid grid-cols-2 gap-3">
                            {[
                                { src: Image2, cls: "h-44 mt-10" },
                                { src: DirectorImage, cls: "h-64" },
                                { src: Image4, cls: "h-64" },
                                { src: Image3, cls: "h-44 mb-10" },
                            ].map((img, i) => (
                                <motion.div key={i} whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? .5 : -.5 }} transition={{ type: 'spring', stiffness: 300 }}
                                    className={`${img.cls} rounded-2xl overflow-hidden border border-white/7 group`} style={{ boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
                                    <img src={img.src} alt="" className="w-full h-full object-cover opacity-75 group-hover:opacity-96 group-hover:scale-105 transition-all duration-700" />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
                            <div className="space-y-4 font-body text-white/48 leading-[1.82] text-base mb-10">
                                <p><span className="text-white font-medium">E-Cell HMRITM</span> started in 2018 as small workshops and awareness campaigns. Now, it is a lively center of innovation. It has changed over time by hosting competitions like Hacknovate 4.0 and the G20 Case Study, adapting to virtual events, and promoting initiatives like Cyber Jagrookta Diwas. With flagship events like E-Summit, it gives students the tools they need to make a difference in the real world by working together, being creative, following through, and being a strong entrepreneurial leader.</p>
                                
                                <p>Every line of code, every pitch, and every late-night brainstorm is a testament to our belief that innovation isn't a goal; it's our heartbeat. We obliterate the gap between imagination and execution, creating a playground where <span className="text-blue-400">bold ideas</span> meet <span className="text-blue-400">execution</span>.</p>
                            </div>

                            <div className="flex items-center gap-0">
                                {MILESTONES.map((m, i) => (
                                    <React.Fragment key={m.year}>
                                        <motion.div whileHover={{ scale: 1.15 }} className="group flex flex-col items-center cursor-default">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-400/38 flex items-center justify-center group-hover:bg-blue-500/30 group-hover:border-blue-400 transition-all" style={{ boxShadow: '0 0 12px rgba(59,130,246,.22)' }}>
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                            </div>
                                            <span className="font-display text-[9px] font-bold text-blue-400 mt-1.5">{m.year}</span>
                                        </motion.div>
                                        {i < MILESTONES.length - 1 && <div className="flex-1 h-px bg-gradient-to-r from-blue-500/38 to-blue-900/18 mx-1" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── STATS + TAGLINE ──────────────────────────────────── */}
            <section className="py-24 border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div className="flex-1" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
                            <p className="font-display text-3xl md:text-4xl font-bold leading-[1.22]">
                                We are not just a college<br />society. We are a{" "}
                                <span className="text-gradient">startup ecosystem.</span>
                            </p>
                            <p className="font-body text-white/38 mt-4 text-sm leading-relaxed max-w-xs">
                                Bridging the gap between raw ideas and real execution since 2018.
                            </p>
                        </motion.div>
                        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                            {STATS.map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}
                                    className={`relative rounded-2xl p-6 bg-gradient-to-br ${s.grad} border border-white/5 neon lift shimmer overflow-hidden`}>
                                    <div className="absolute top-3 right-3 opacity-15"><s.Icon size={44} /></div>
                                    <s.Icon size={20} className="text-white/55 mb-3" />
                                    <p className="font-display text-3xl font-bold text-white"><Counter value={s.value} /></p>
                                    <p className="font-body text-xs text-white/45 mt-1">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── VISION & MISSION ─────────────────────────────────── */}
            <section className="py-32 relative bg-grid overflow-hidden">
                <Orb size={400} color="rgba(59,130,246,.05)" top="10%" left="50%" blur={100} />
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <SectionLabel title="Our Purpose" center />
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Vision */}
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
                            className="relative rounded-3xl p-10 border border-white/7 glass lift neon group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/14 border border-blue-500/20 flex items-center justify-center mb-7 group-hover:bg-blue-500/24 transition-colors">
                                    <Eye size={22} className="text-blue-400" />
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="font-body text-white/53 leading-[1.75]">
                                    To create a culture where entrepreneurship is not an option — but a{" "}
                                    <span className="text-white font-medium">mindset</span>. A campus where every student sees themselves as a potential founder capable of changing the world.
                                </p>
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <p className="font-body text-xs text-blue-400/60 uppercase tracking-widest">Core Belief</p>
                                    <p className="font-body text-sm text-white/38 mt-1.5">Every engineer has the potential to be a creator.</p>
                                </div>
                            </div>
                        </motion.div>
                        {/* Mission */}
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .15 }}
                            className="relative rounded-3xl p-10 lift neon group overflow-hidden"
                            style={{ background: 'linear-gradient(135deg,rgba(37,99,235,.12) 0%,rgba(29,78,216,.04) 100%)', border: '1px solid rgba(59,130,246,.2)' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/4 to-purple-500/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-600/10 blur-3xl rounded-full" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/28 flex items-center justify-center mb-7 group-hover:bg-blue-500/30 transition-colors">
                                    <Rocket size={22} className="text-blue-300" />
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-5">Our Mission</h3>
                                <ul className="space-y-3.5">
                                    {["Empower student founders with real-world skills", "Provide Mentorship & Resources at every stage", "Build a Startup-First Campus Culture", "Connect Ideas with Industry & Investors"].map((item, i) => (
                                        <motion.li key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .3 + i * .08 }}
                                            className="flex items-start gap-3 font-body text-white/62 text-sm leading-relaxed">
                                            <div className="mt-1.5 w-4 h-4 rounded-full border border-blue-400/38 flex items-center justify-center flex-shrink-0 bg-blue-500/10">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            </div>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── DIFFERENTIATORS ──────────────────────────────────── */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-900/50" />
                        <span className="font-body text-xs text-white/28 whitespace-nowrap tracking-[.15em] uppercase">Why E-Cell HMRITM Is Different</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-900/50" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                        {DIFF.map((d, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: .92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .07, type: 'spring', stiffness: 200 }}
                                whileHover={{ scale: 1.03 }} className="group border border-white/5 glass rounded-2xl px-5 py-4 flex items-center gap-4 cursor-default neon shimmer overflow-hidden relative transition-all duration-300">
                                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/18 flex items-center justify-center flex-shrink-0 text-blue-400/80 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                                    <d.Icon size={17} />
                                </div>
                                <span className="font-display text-sm font-semibold text-white/65 group-hover:text-white transition-colors">{d.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* ─── MILESTONES ───────────────────────────────────────── */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-55" />
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <SectionLabel title="Key Milestones" center />
                    <div className="relative grid md:grid-cols-5 gap-6">
                        <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-600/28 to-transparent" />
                        {MILESTONES.map((m, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1, type: 'spring', stiffness: 180 }}
                                whileHover={{ y: -6 }} className="group text-center relative">
                                <div className="w-[88px] h-[88px] rounded-full glass border border-blue-500/22 flex items-center justify-center mx-auto mb-5 group-hover:border-blue-400/55 group-hover:shadow-[0_0_24px_rgba(59,130,246,.18)] transition-all"
                                    style={{ background: 'radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 70%)' }}>
                                    <m.Icon size={28} className="text-blue-400/78 group-hover:text-blue-300 transition-colors" />
                                </div>
                                <span className="font-display text-blue-400 font-bold text-lg">{m.year}</span>
                                <h4 className="font-display font-bold text-white text-sm mt-1.5 mb-2">{m.title}</h4>
                                <p className="font-body text-xs text-white/32 leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CORE VALUES ──────────────────────────────────────── */}
            <section className="py-28 relative overflow-hidden">
                <Orb size={500} color="rgba(16,185,129,.04)" top="30%" left="30%" blur={120} delay={2} />
                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <SectionLabel title="Core Values" center />
                    <div className="grid sm:grid-cols-3 gap-6">
                        {VALUES.map((v, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .15, duration: .6 }}
                                className={`group relative rounded-3xl p-9 border border-white/6 bg-gradient-to-br ${v.grad} neon lift shimmer overflow-hidden text-center`}>
                                <div className="absolute inset-0 bg-white/[.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                                <motion.div whileHover={{ rotate: 8, scale: 1.1 }} className="w-20 h-20 rounded-full glass border border-white/7 flex items-center justify-center mx-auto mb-7 group-hover:border-blue-400/38 transition-all">
                                    <v.Icon size={34} className="text-white/65 group-hover:text-white transition-colors" />
                                </motion.div>
                                <h4 className="font-display text-xl font-bold text-white mb-3">{v.title}</h4>
                                <p className="font-body text-sm text-white/42 leading-[1.75]">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ─── CTA ──────────────────────────────────────────────── */}
            {/* <section className="relative py-40 overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.01]" />
                <div className="absolute inset-0 bg-grid opacity-38" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[.07]"
                    style={{ background: 'radial-gradient(ellipse,#3b82f6 0%,#8b5cf6 40%,transparent 70%)', filter: 'blur(60px)' }} />
                <Orb size={280} color="rgba(59,130,246,.08)" top="8%" left="8%" blur={80} delay={0} />
                <Orb size={220} color="rgba(139,92,246,.07)" top="55%" left="72%" blur={70} delay={2} />

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease: [.16, 1, .3, 1] }}>
                        <motion.div initial={{ scale: .8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: .1 }}
                            className="inline-flex items-center gap-2 glass border-glow rounded-full px-4 py-2 mb-8">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                                <Zap size={12} className="text-blue-400" />
                            </motion.div>
                            <span className="font-body text-xs text-blue-300 tracking-[.15em] uppercase">Join the movement</span>
                        </motion.div>

                        <h2 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
                            We Build{" "}<span className="text-gradient">Founders.</span><br />
                            Not{" "}
                            <span className="relative inline-block">
                                Followers.
                                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                    <path d="M0 6 Q100 1 200 6" stroke="url(#ug)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="ug" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h2>

                        <p className="font-body text-white/42 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
                            Every idea deserves a stage. Every founder deserves a launchpad. Be part of the revolution happening right here at HMRITM.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <MagneticBtn className="px-9 py-4 rounded-2xl text-base" variant="primary">
                                Become a Member <ArrowRight size={16} />
                            </MagneticBtn>
                            <MagneticBtn className="px-9 py-4 rounded-2xl text-base" variant="outline">
                                Contact Us
                            </MagneticBtn>
                        </div>
                    </motion.div>
                </div>
            </section> */}
        </div>
    );
};

export default About;