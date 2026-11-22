import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout/layout';
import { Linkedin, X, Mail, ArrowUpRight, ChevronLeft, ChevronRight } from 'react-feather';
import LightRays from './animation/LightRays';


import ankushrana from '../../assets/TeamMember/ankushrana.jpg'
import PandaMam from '../../assets/TeamMember/pandamam.PNG'
import sarita from '../../assets/TeamMember/sarita.jpg'
import nidhi from '../../assets/TeamMember/nidhi.jpg'

import krishna from '../../assets/TeamMember/2026/krishna.jpg'
import sanskriti from '../../assets/TeamMember/2026/sanskriti.jpg'
import navya from '../../assets/TeamMember/2026/navya.jpg'
import kirti from '../../assets/TeamMember/2026/kirti.jpg'
import himanshi from '../../assets/TeamMember/2026/himanshi.jpg'
import yashraj from '../../assets/TeamMember/2026/yashraj.jpg'
import nirbhay from '../../assets/TeamMember/2026/nirbhay.jpg'
import daksh from '../../assets/TeamMember/2026/daksh.jpg'
import akshita from '../../assets/TeamMember/2026/akshita.jpg'
import shaurya from '../../assets/TeamMember/2026/shaurya.jpg'
import harshit from '../../assets/TeamMember/2026/harshit.jpg'
import arnav from '../../assets/TeamMember/2026/arnav.jpg'
import prateek from '../../assets/TeamMember/2026/prateek.jpg'
import jiya from '../../assets/TeamMember/2026/jiya.jpg'
import ashish from '../../assets/TeamMember/2026/ashish.jpg'
import anshul from '../../assets/TeamMember/2026/anshul.jpg'
import ayush from '../../assets/TeamMember/2026/ayush.jpg'
import udhav from '../../assets/TeamMember/2026/udhav.jpg'
import yuvika from '../../assets/TeamMember/2026/yuvika.jpg'
import ishika from '../../assets/TeamMember/2026/ishika.jpg'
import diya from '../../assets/TeamMember/2026/diya.jpg'
import samaksh from '../../assets/TeamMember/2026/samaksh.jpg'
import aanya from '../../assets/TeamMember/2026/aanya.jpg'
import arvind from '../../assets/TeamMember/2026/arvind.jpg'
import progya from '../../assets/TeamMember/2026/progya.jpg'
import aeshna from '../../assets/TeamMember/2026/aeshna.jpg'
import parul from '../../assets/TeamMember/2026/parul.jpg'

// All photos directly in TeamMember/ (the 2026/ subfolder is not included)
const oldPhotos = import.meta.glob('../../assets/TeamMember/*.{jpg,jpeg,png,PNG,webp}', {
    eager: true,
    import: 'default',
});

// People who should NOT appear under Past Members (matched by start of file name)
const excludedPast = ['vivek', 'shalini'];

// Finds a photo in TeamMember/ by the start of its file name (undefined if not found)
const findOldPhoto = (prefix) => {
    const entry = Object.entries(oldPhotos).find(([path]) =>
        path.split('/').pop().toLowerCase().startsWith(prefix)
    );
    return entry ? entry[1] : undefined;
};
const anishPhoto = findOldPhoto('anish');
const aakritiPhoto = findOldPhoto('aakriti');

// Optional: nicer display names. Key = file name without extension, in lowercase.
const pastNameOverrides = {
    // adityakumar: "Aditya Kumar",
    // aradhaygupta: "Aradhay Gupta",
};


// Auto-advancing slideshow of past members (pauses on hover, arrows to navigate)
const PastMembersSlideshow = ({ members }) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = members.length;

    const next = () => setIndex((i) => (i + 1) % count);
    const prev = () => setIndex((i) => (i - 1 + count) % count);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (paused || reduceMotion || count < 2) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % count), 3000);
        return () => clearInterval(id);
    }, [paused, count]);

    if (count === 0) return null;
    const current = members[index];

    return (
        <div
            className="relative mx-auto w-full max-w-sm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-dark aspect-3/4">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current.name}
                        src={current.img}
                        alt={current.name}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 bg-linear-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-black text-white font-display leading-tight">{current.name}</h3>
                </div>
            </div>

            <button
                type="button"
                onClick={prev}
                aria-label="Previous past member"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-neutral-900/80 backdrop-blur-md p-2 rounded-full text-white border border-neutral-700/60 hover:bg-neutral-800/90 transition-all hover:scale-110"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                type="button"
                onClick={next}
                aria-label="Next past member"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-neutral-900/80 backdrop-blur-md p-2 rounded-full text-white border border-neutral-700/60 hover:bg-neutral-800/90 transition-all hover:scale-110"
            >
                <ChevronRight size={20} />
            </button>

            <p className="mt-4 text-center text-sm text-neutral-muted" aria-live="polite">
                {index + 1} / {count}
            </p>
        </div>
    );
};

const Team = () => {
    const FacultyCoordinator = [
        {
            name: "Mr. Ankush Rana",
            role: "Faculty Coordinator",
            img: ankushrana
        }
    ];

    const Coordinator = [
        { name: "Dr. Padmaja Panda", role: "Coordinator", img: PandaMam },
        { name: "Ms. Sarita", role: "Coordinator", img: sarita },
        { name: "Ms. Nidhi", role: "Coordinator", img: nidhi },
    ];

    const leadership = [
        { name: "Anish", role: "President", img: anishPhoto, linkedin: "", email: "" },
        { name: "Aakriti", role: "President", img: aakritiPhoto, linkedin: "", email: "" },
    ];

    const heads = [
        { name: "Kirti", role: "Content Creation Team Leader", img: kirti },
        { name: "Daksh Gahlot", role: "Corporate Relations Team Leader", img: daksh },
        { name: "Arnav", role: "Design Team Leader", img: arnav },
        { name: "Anshul", role: "Operation Team Leader", img: anshul },
        { name: "Udhav", role: "Social Media Team Leader", img: udhav },
        { name: "Ishika", role: "Sponsor Team Leader", img: ishika },
        { name: "Arvind Singh", role: "Web and Technical Team Leader", img: arvind, linkedin: "https://www.linkedin.com/in/arvind2005/", email: "arvind42005@gmail.com" },
    ];

    const Content = [
        { name: "Krishna", role: "Content Creation Team Member", img: krishna },
        { name: "Sanskriti", role: "Content Creation Team Member", img: sanskriti },
        { name: "Navya", role: "Content Creation Team Member", img: navya },
    ];

    const CorporateRelations = [
        { name: "Himanshi", role: "Corporate Relations Team Member", img: himanshi },
        { name: "Yashraj", role: "Corporate Relations Team Member", img: yashraj },
        { name: "Nirbhay", role: "Corporate Relations Team Member", img: nirbhay },
    ];

    const Design = [
        { name: "Akshita", role: "Design Team Member", img: akshita },
        { name: "Shaurya", role: "Design Team Member", img: shaurya },
        { name: "Harshit", role: "Design Team Member", img: harshit },
    ];

    const Operations = [
        { name: "Prateek", role: "Operation Team Member", img: prateek },
        { name: "Jiya", role: "Operation Team Member", img: jiya },
        { name: "Ashish", role: "Operation Team Member", img: ashish },
    ];

    const Social_Media = [
        { name: "Ayush", role: "Social Media Team Member", img: ayush },
        { name: "Yuvika", role: "Social Media Team Member", img: yuvika },
    ];

    const Sponsor = [
        { name: "Diya", role: "Sponsor Team Member", img: diya },
        { name: "Samaksh", role: "Sponsor Team Member", img: samaksh },
        { name: "Aanya", role: "Sponsor Team Member", img: aanya },
    ];

    const Technical = [
        { name: "Progya Pal", role: "Web and Technical Team Member", img: progya },
        { name: "Aeshna Jain", role: "Web and Technical Team Member", img: aeshna },
        { name: "Parul Singh", role: "Web and Technical Team Member", img: parul },
    ];

    // Photos already used elsewhere on the page (faculty, coordinators, presidents)
    const usedElsewhere = new Set([ankushrana, PandaMam, sarita, nidhi, anishPhoto, aakritiPhoto]);

    // First names of everyone on the current page, so continuing members aren't listed as past
    const currentFirstNames = new Set(
        [...heads, ...Content, ...CorporateRelations, ...Design, ...Operations, ...Social_Media, ...Sponsor, ...Technical]
            .map((m) => m.name.split(' ')[0].toLowerCase())
    );

    const PastMembers = Object.entries(oldPhotos)
        .map(([path, img]) => {
            const key = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
            return { key, img };
        })
        .filter(({ key, img }) =>
            !usedElsewhere.has(img) &&
            !currentFirstNames.has(key) &&
            !['male', 'female'].includes(key) &&
            !excludedPast.some((n) => key.startsWith(n))
        )
        .map(({ key, img }) => ({
            name: pastNameOverrides[key] || key.charAt(0).toUpperCase() + key.slice(1),
            role: 'Past Member',
            img,
        }));


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const TeamCard = ({ member, isLarge = false, priority = false }) => {
        const [isClicked, setIsClicked] = useState(false);

        const getXUrl = (xValue) => {
            if (!xValue) return "";
            if (xValue === "#") return "";
            if (xValue.startsWith("http://") || xValue.startsWith("https://")) return xValue;
            const handle = xValue.replace(/^@/, "").trim();
            return handle ? `https://x.com/${handle}` : "";
        };

        const getMailtoUrl = (emailValue) => {
            if (!emailValue) return "";
            if (emailValue.startsWith("mailto:")) return emailValue;
            return `mailto:${emailValue.trim()}`;
        };

        const socialLinks = [
            { Icon: Linkedin, href: member.linkedin || "", label: "LinkedIn" },
            { Icon: X, href: getXUrl(member.twitter || member.X || member.x || ""), label: "X" },
            { Icon: Mail, href: getMailtoUrl(member.email || ""), label: "Email" },
        ];

        return (
            <motion.div
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-3xl bg-neutral-dark border border-white/5 hover:border-primary/50 transition-all duration-500 ${isLarge ? 'md:col-span-1' : ''}`}
                onClick={() => setIsClicked(!isClicked)}
            >
                <div className={`relative overflow-hidden aspect-4/5 sm:aspect-3/4 ${isLarge ? 'lg:aspect-4/5' : 'lg:aspect-3/4'}`}>
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-dark via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    <img
                        src={member.img}
                        alt={member.name}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={priority ? 'high' : 'low'}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="w-full h-full object-cover object-center scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                    />

                    {/* Social Overlay */}
                    <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 transition-transform duration-300 flex flex-col gap-2 ${isClicked ? 'translate-x-0' : 'translate-x-12 group-hover:translate-x-0'}`}>
                        {socialLinks.map(({ Icon, href, label }, i) => {
                            const isAvailable = Boolean(href);

                            if (!isAvailable) {
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        disabled
                                        aria-label={`${member.name} ${label} unavailable`}
                                        title={`${label} unavailable`}
                                        className="bg-neutral-900/80 backdrop-blur-md p-2 rounded-full text-white/40 cursor-not-allowed border border-neutral-700/60"
                                    >
                                        <Icon size={16} />
                                    </button>
                                );
                            }

                            return (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} ${label}`}
                                    title={`${member.name} ${label}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-neutral-900/80 backdrop-blur-md p-2 rounded-full text-white border border-neutral-700/60 hover:bg-neutral-800/90 hover:text-white hover:border-neutral-600 transition-all hover:scale-110"
                                >
                                    <Icon size={16} />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 z-20">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{member.role}</p>
                        <div className="flex items-end justify-between">
                            <h3 className={`font-black text-white font-display leading-tight ${isLarge ? 'text-3xl' : 'text-2xl'}`}>
                                {member.name}
                            </h3>
                            <ArrowUpRight className="text-white opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const teamSections = [
        { title: "Faculty Coordinator", members: FacultyCoordinator, isLarge: true },
        { title: "E-Cell Coordinators", members: Coordinator, isLarge: true },
        { title: "E-Cell Society Heads", members: leadership, isLarge: true },
        { title: "Team Leads", members: heads, isLarge: true },
        { title: "Web and Technical Team", members: Technical, isLarge: false },
        { title: "Content Creation Team", members: Content, isLarge: false },
        { title: "Social Media Team", members: Social_Media, isLarge: false },
        { title: "Operation Team", members: Operations, isLarge: false },
        { title: "Design Team", members: Design, isLarge: false },
        { title: "Corporate Relations Team", members: CorporateRelations, isLarge: false },
        { title: "Sponsor Team", members: Sponsor, isLarge: false },
    ];

    return (
        <Layout>
            {/* LightRays full-page background */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>
            <section className="pt-24 pb-32 px-6 lg:px-20 max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 font-display"
                    >
                        Meet the Members
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-muted text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        A collective of builders, dreamers, and executors driven by a single mission: to cultivate the next generation of unicorns from HMRITM.
                    </motion.p>
                </div>

                {teamSections.map((section, sectionIndex) => (
                    <div className="mb-20" key={section.title}>
                        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">{section.title}</h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {section.members.map((member, memberIndex) => (
                                <TeamCard
                                    key={`${sectionIndex}-${member.name}-${memberIndex}`}
                                    member={member}
                                    isLarge={section.isLarge}
                                    priority={sectionIndex === 0 && memberIndex === 0}
                                />
                            ))}
                        </motion.div>
                    </div>
                ))}

                {/* Past Members - slideshow (always last) */}
                {PastMembers.length > 0 && (
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">Past Members</h2>
                        <PastMembersSlideshow members={PastMembers} />
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default Team;