// import { motion, useScroll, useTransform } from "framer-motion";
// import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";
// import { useRef, useEffect } from "react";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { heroFeatures } from "../../data/content";
// import {
//   staggerContainer,
//   fadeUpVariants,
//   heroTextVariants,
// } from "../../lib/animations";

// const iconMap = { Code2, Zap, Sparkles };

// function useHeroCanvas(canvasRef) {
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     let W, H, points = [], animId;
//     const mouse = { x: -999, y: -999 };

//     const isMobile = () => window.innerWidth < 768;

//     function resize() {
//       W = canvas.width = window.innerWidth;
//       H = canvas.height = window.innerHeight;
//       initPoints();
//     }

//     function initPoints() {
//       points = [];
//       const COLS = isMobile() ? 7 : 14;
//       const ROWS = isMobile() ? 5 : 9;
//       const CD = isMobile() ? 90 : 160;
//       const gw = W / (COLS - 1);
//       const gh = H / (ROWS - 1);
//       for (let r = 0; r < ROWS; r++) {
//         for (let c = 0; c < COLS; c++) {
//           points.push({
//             x: c * gw + (Math.random() - 0.5) * gw * 0.6,
//             y: r * gh + (Math.random() - 0.5) * gh * 0.6,
//             ox: c * gw,
//             oy: r * gh,
//             vx: (Math.random() - 0.5) * 0.35,
//             vy: (Math.random() - 0.5) * 0.35,
//             r: 1.0 + Math.random() * 1.0,
//             CD,
//           });
//         }
//       }
//     }

//     function draw() {
//       ctx.clearRect(0, 0, W, H);

//       // Aurora top-right blue
//       const g1 = ctx.createRadialGradient(W * 0.78, H * 0.12, 0, W * 0.78, H * 0.12, W * 0.55);
//       g1.addColorStop(0, "rgba(30,100,255,0.07)");
//       g1.addColorStop(1, "transparent");
//       ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

//       // Aurora bottom-left deep blue
//       const g2 = ctx.createRadialGradient(W * 0.15, H * 0.75, 0, W * 0.15, H * 0.75, W * 0.45);
//       g2.addColorStop(0, "rgba(0,60,200,0.05)");
//       g2.addColorStop(1, "transparent");
//       ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

//       // Mouse spotlight
//       const g3 = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
//       g3.addColorStop(0, "rgba(60,130,255,0.08)");
//       g3.addColorStop(1, "transparent");
//       ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);

//       points.forEach((p, i) => {
//         p.vx += (p.ox - p.x) * 0.0008;
//         p.vy += (p.oy - p.y) * 0.0008;

//         const dx = p.x - mouse.x, dy = p.y - mouse.y;
//         const d = Math.hypot(dx, dy);
//         if (d < 160 && d > 0) {
//           const f = ((160 - d) / 160) * 1.6;
//           p.vx += (dx / d) * f;
//           p.vy += (dy / d) * f;
//         }

//         p.vx *= 0.94; p.vy *= 0.94;
//         p.x += p.vx; p.y += p.vy;

//         for (let j = i + 1; j < points.length; j++) {
//           const q = points[j];
//           const dd = Math.hypot(p.x - q.x, p.y - q.y);
//           if (dd < p.CD) {
//             const alpha = (1 - dd / p.CD) * 0.18;
//             const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
//             const boost = md < 280 ? (1 - md / 280) * 0.5 : 0;
//             ctx.beginPath();
//             ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
//             ctx.strokeStyle = `rgba(80,140,255,${alpha + boost})`;
//             ctx.lineWidth = 0.5;
//             ctx.stroke();
//           }
//         }

//         const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
//         const glow = md < 200 ? (1 - md / 200) * 0.8 : 0;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${100 + glow * 80},${160 + glow * 60},255,${0.3 + glow * 0.55})`;
//         ctx.fill();
//       });

//       animId = requestAnimationFrame(draw);
//     }

//     const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
//     const onTouch = (e) => {
//       const t = e.touches[0];
//       if (t) { mouse.x = t.clientX; mouse.y = t.clientY; }
//     };

//     window.addEventListener("resize", resize);
//     window.addEventListener("mousemove", onMouse);
//     window.addEventListener("touchmove", onTouch, { passive: true });
//     resize();
//     draw();

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("mousemove", onMouse);
//       window.removeEventListener("touchmove", onTouch);
//     };
//   }, [canvasRef]);
// }

// export function Hero() {
//   const sectionRef = useRef(null);
//   const canvasRef = useRef(null);
//   useHeroCanvas(canvasRef);

//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
//   const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

//   return (
//     <section
//       id="home"
//       ref={sectionRef}
//       className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#04050a]"
//       style={{ fontFamily: "'Syne', sans-serif" }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Space+Mono:wght@400;700&display=swap');

//         .hero-outlined-text {
//           color: transparent;
//           -webkit-text-stroke: 1.5px rgba(255,255,255,0.12);
//         }
//         @media (max-width: 480px) {
//           .hero-outlined-text { -webkit-text-stroke: 1px rgba(255,255,255,0.12); }
//         }

//         .hero-gradient-text {
//           background: linear-gradient(110deg, #ffffff 0%, #6ab0ff 45%, #3060ff 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .glow-blue {
//           box-shadow: 0 0 28px rgba(48,96,255,0.4), 0 0 70px rgba(48,96,255,0.12);
//         }

//         .noise-overlay {
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
//           mix-blend-mode: overlay;
//         }

//         .ticker-badge {
//           background: rgba(48,96,255,0.1);
//           border: 1px solid rgba(80,140,255,0.3);
//         }

//         .scan-line {
//           background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.06) 50%);
//           background-size: 100% 4px;
//           pointer-events: none;
//         }

//         @keyframes float-y {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-18px); }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(360deg); }
//         }
//         .float-orb   { animation: float-y 7s ease-in-out infinite; }
//         .float-orb-2 { animation: float-y 9s ease-in-out infinite 2s; }
//         .spin-ring   { animation: spin-slow 18s linear infinite; }

//         @keyframes scanMove {
//           0%   { transform: translateY(-100%); }
//           100% { transform: translateY(100vh); }
//         }
//         .hero-scan-beam {
//           position: absolute;
//           left: 0; right: 0; height: 2px;
//           background: linear-gradient(to right, transparent, rgba(60,120,255,0.12), transparent);
//           animation: scanMove 10s linear infinite;
//           pointer-events: none;
//           z-index: 2;
//         }

//         /* Mobile: stack feature cards with horizontal separator */
//         .feature-card {
//           border-bottom: 1px solid rgba(255,255,255,0.05);
//         }
//         .feature-card:last-child {
//           border-bottom: none;
//         }
//         @media (min-width: 640px) {
//           .feature-card {
//             border-bottom: none;
//           }
//         }

//         /* Badge text truncation on very small screens */
//         @media (max-width: 400px) {
//           .badge-full  { display: none; }
//           .badge-short { display: inline; }
//         }
//         @media (min-width: 401px) {
//           .badge-full  { display: inline; }
//           .badge-short { display: none; }
//         }

//         /* CTA buttons full-width on mobile */
//         @media (max-width: 639px) {
//           .cta-wrap { width: 100%; }
//           .cta-wrap button { width: 100% !important; justify-content: center; }
//         }

//         /* Tighter letter-spacing on mobile for h1 */
//         @media (max-width: 640px) {
//           .hero-h1 { letter-spacing: -1.5px !important; }
//         }

//         /* Hide decorative ring on small screens */
//         @media (max-width: 640px) {
//           .spin-ring-wrap { display: none; }
//         }
//       `}</style>

//       {/* Interactive canvas */}
//       <canvas
//         ref={canvasRef}
//         aria-hidden="true"
//         style={{
//           position: "absolute", inset: 0,
//           width: "100%", height: "100%",
//           zIndex: 1, opacity: 0.7,
//           pointerEvents: "none",
//         }}
//       />

//       <div className="hero-scan-beam" aria-hidden="true" />
//       <div className="noise-overlay absolute inset-0 z-0 pointer-events-none" />
//       <div className="scan-line absolute inset-0 z-0 pointer-events-none opacity-30" />

//       {/* Deep radial base */}
//       <div className="absolute inset-0 z-0"
//         style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,70,180,0.1) 0%, transparent 70%)" }} />

//       {/* Blue accent orb — top-right */}
//       <motion.div
//         className="float-orb absolute z-0 pointer-events-none"
//         style={{
//           top: "-80px", right: "-60px",
//           width: "clamp(220px, 38vw, 520px)", height: "clamp(220px, 38vw, 520px)",
//           background: "radial-gradient(circle, rgba(40,100,255,0.1) 0%, transparent 70%)",
//           borderRadius: "50%",
//         }}
//       />

//       {/* Dark-blue orb — bottom-left */}
//       <motion.div
//         className="float-orb-2 absolute z-0 pointer-events-none"
//         style={{
//           bottom: "80px", left: "-100px",
//           width: "clamp(180px, 32vw, 400px)", height: "clamp(180px, 32vw, 400px)",
//           background: "radial-gradient(circle, rgba(20,60,180,0.08) 0%, transparent 70%)",
//           borderRadius: "50%",
//         }}
//       />

//       {/* Spinning ring — hidden on mobile */}
//       <div className="spin-ring spin-ring-wrap absolute z-0 pointer-events-none"
//         style={{ top: "8%", right: "6%", width: "140px", height: "140px" }}>
//         <svg viewBox="0 0 180 180" fill="none" style={{ width: "100%", height: "100%" }}>
//           <circle cx="90" cy="90" r="85" stroke="rgba(80,140,255,0.12)" strokeWidth="1" strokeDasharray="8 6" />
//           <circle cx="90" cy="90" r="70" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
//         </svg>
//       </div>

//       {/* Vertical grid lines */}
//       <div className="absolute inset-0 z-0 pointer-events-none" style={{
//         backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 12.5%)",
//         backgroundSize: "12.5% 100%"
//       }} />

//       {/* Diagonal accent line — hidden on mobile */}
//       <div className="hidden sm:block absolute z-0 pointer-events-none"
//         style={{
//           top: 0, right: "18%", width: "1px", height: "100%",
//           background: "linear-gradient(to bottom, transparent 0%, rgba(80,140,255,0.2) 35%, transparent 100%)"
//         }} />

//       {/* Floating particles */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: i % 3 === 0 ? "2px" : "1px",
//               height: i % 3 === 0 ? "2px" : "1px",
//               background: i % 2 === 0 ? "rgba(106,176,255,0.7)" : "rgba(255,255,255,0.35)",
//               left: `${5 + (i * 4.7) % 90}%`,
//               top: `${10 + (i * 7.3) % 80}%`,
//             }}
//             animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
//             transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i * 0.3) % 4, ease: "easeInOut" }}
//           />
//         ))}
//       </div>

//       {/* Ghost background word */}
//       <motion.div
//         style={{ y: yBg, opacity }}
//         className="absolute z-0 select-none pointer-events-none"
//         aria-hidden="true"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2, delay: 0.2 }}
//       >
//         <div style={{
//           position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
//           fontFamily: "'Syne', sans-serif", fontWeight: 800,
//           fontSize: "clamp(64px, 16vw, 220px)",
//           letterSpacing: "-8px", whiteSpace: "nowrap",
//           color: "transparent",
//           WebkitTextStroke: "1px rgba(255,255,255,0.025)",
//         }}>
//           E·CELL
//         </div>
//       </motion.div>

//       {/* ─── MAIN CONTENT ─── */}
//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate="visible"
//         className="relative z-10 w-full px-5 sm:px-10 lg:px-20 pb-16 sm:pb-20 pt-28 sm:pt-36 flex flex-col items-center text-center"
//       >
//         {/* Status badge */}
//         <motion.div variants={fadeUpVariants} className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
//           <Badge
//             className="ticker-badge px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase font-semibold"
//             style={{ fontFamily: "'Space Mono', monospace", color: "#6ab0ff", borderRadius: "4px" }}
//           >
//             <span className="inline-block w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-[#6ab0ff] mr-2 animate-pulse" />
//             <span className="badge-full">HMRITM — Entrepreneurship Cell</span>
//             <span className="badge-short">E-Cell HMRITM</span>
//           </Badge>
//           <span style={{
//             fontFamily: "'Space Mono', monospace", fontSize: "9px",
//             letterSpacing: "0.12em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase"
//           }}>
//             Est. 2018
//           </span>
//         </motion.div>

//         {/* Hero Title */}
//         <motion.div variants={heroTextVariants} className="mb-7 sm:mb-8">
//           <h1
//             className="hero-h1"
//             style={{
//               fontFamily: "'Syne', sans-serif", fontWeight: 800,
//               lineHeight: 0.92, letterSpacing: "-3px", margin: 0,
//             }}
//           >
//             <span className="block text-gray-600"
//               style={{ fontSize: "clamp(44px, 10vw, 116px)" }}>
//               Ignite
//             </span>
//             <span className="block text-white"
//               style={{ fontSize: "clamp(44px, 10vw, 116px)" }}>
//               Build.
//             </span>
//             <span className="block hero-gradient-text"
//               style={{ fontSize: "clamp(44px, 10vw, 116px)" }}>
//               Scale_
//             </span>
//           </h1>
//         </motion.div>

//         {/* Description + CTA */}
//         <motion.div
//           variants={fadeUpVariants}
//           className="flex flex-col items-center gap-8 sm:gap-10 mb-14 sm:mb-20"
//         >
//           <p style={{
//             fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
//             fontSize: "clamp(13px, 2vw, 15px)",
//             lineHeight: 1.85, color: "rgba(255,255,255,0.42)",
//             maxWidth: "min(520px, 100%)",
//             textAlign: "center",
//           }}>
//             Where{" "}
//             <span style={{ color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>raw ideas</span>{" "}
//             become ventures. We equip the next generation of founders with mentorship, capital
//             connections, and an ecosystem built to{" "}
//             <span style={{ color: "#6ab0ff", fontWeight: 500 }}>launch fast.</span>
//           </p>

//           {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
//             <motion.div className="cta-wrap" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
//               <Button
//                 size="lg"
//                 className="glow-blue group"
//                 style={{
//                   background: "#3060ff", color: "#ffffff",
//                   fontFamily: "'Space Mono', monospace", fontWeight: 700,
//                   fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
//                   borderRadius: "4px", padding: "14px 28px", border: "none", height: "auto",
//                 }}
//               >
//                 Get Started
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </motion.div>

//             <motion.div className="cta-wrap" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 style={{
//                   background: "transparent", color: "rgba(255,255,255,0.55)",
//                   fontFamily: "'Space Mono', monospace", fontWeight: 400,
//                   fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
//                   borderRadius: "4px", padding: "14px 28px",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   height: "auto", transition: "border-color 0.25s, color 0.25s",
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(106,176,255,0.5)"; e.currentTarget.style.color = "#6ab0ff"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";  e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
//               >
//                 Explore Dashboard
//               </Button>
//             </motion.div>
//           </div> */}
//         </motion.div>

//         {/* Feature Cards */}
//         <motion.div
//           variants={staggerContainer}
//           className="grid grid-cols-1 sm:grid-cols-3 w-full"
//           style={{
//             background: "rgba(255,255,255,0.03)",
//             border: "1px solid rgba(255,255,255,0.06)",
//             borderRadius: "8px",
//             overflow: "hidden",
//           }}
//         >
//           {heroFeatures.map((feature, idx) => {
//             const Icon = iconMap[feature.icon];
//             const isLast = idx === heroFeatures.length - 1;
//             return (
//               <motion.div
//                 key={feature.title}
//                 variants={fadeUpVariants}
//                 whileHover={{ y: -3 }}
//                 className="group relative cursor-pointer feature-card"
//                 style={{
//                   background: "#04050a",
//                   padding: "clamp(22px, 4vw, 40px) clamp(18px, 3.5vw, 36px)",
//                   transition: "background 0.35s",
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.background = "rgba(40,90,255,0.05)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = "#04050a"; }}
//               >
//                 {/* Right border on desktop */}
//                 {!isLast && (
//                   <div className="hidden sm:block absolute top-0 right-0 w-px h-full"
//                     style={{ background: "rgba(255,255,255,0.05)" }} />
//                 )}

//                 {/* Top accent line on hover */}
//                 <div
//                   className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   style={{ background: "linear-gradient(90deg, #3060ff, #6ab0ff)" }}
//                 />

//                 <span style={{
//                   fontFamily: "'Space Mono', monospace", fontSize: "9px",
//                   letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)",
//                   textTransform: "uppercase", display: "block", marginBottom: "14px"
//                 }}>
//                   0{idx + 1}
//                 </span>

//                 <div className="mb-4" style={{
//                   width: "42px", height: "42px",
//                   background: "rgba(48,96,255,0.08)",
//                   border: "1px solid rgba(48,96,255,0.2)",
//                   borderRadius: "8px",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   transition: "background 0.3s",
//                 }}>
//                   <Icon style={{ width: "17px", height: "17px", color: "#6ab0ff" }} />
//                 </div>

//                 <h3 style={{
//                   fontFamily: "'Syne', sans-serif", fontWeight: 700,
//                   fontSize: "clamp(14px, 2vw, 16px)",
//                   letterSpacing: "-0.3px", color: "#fff", marginBottom: "8px"
//                 }}>
//                   {feature.title}
//                 </h3>

//                 <p style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: "clamp(12px, 1.8vw, 13px)",
//                   lineHeight: 1.7, color: "rgba(255,255,255,0.35)", fontWeight: 300,
//                 }}>
//                   {feature.description}
//                 </p>

//                 <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                   <ArrowRight style={{ width: "14px", height: "14px", color: "#6ab0ff" }} />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </motion.div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
//       >
//         <span style={{
//           fontFamily: "'Space Mono', monospace", fontSize: "9px",
//           letterSpacing: "0.22em", textTransform: "uppercase",
//           color: "rgba(255,255,255,0.18)"
//         }}>
//           Scroll
//         </span>
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//           style={{
//             width: "22px", height: "38px", borderRadius: "11px",
//             border: "1px solid rgba(255,255,255,0.1)",
//             display: "flex", justifyContent: "center", paddingTop: "6px"
//           }}
//         >
//           <motion.div
//             animate={{ opacity: [1, 0.2, 1], y: [0, 10, 0] }}
//             transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//             style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#6ab0ff" }}
//           />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }