import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function LiveDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#ff4d4d",
        flexShrink: 0,
        animation: "ecell-livePulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

function CountBox({ value, label }) {
  return (
    <div style={styles.countBox}>
      <div style={styles.countNum}>{String(value).padStart(2, "0")}</div>
      <div style={styles.countLabel}>{label}</div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div style={styles.detailRow}>
      <div style={styles.detailIcon}>{icon}</div>
      <div style={styles.detailInfo}>
        <span style={styles.detailLabel}>{label}</span>
        <span style={styles.detailValue}>{value}</span>
      </div>
    </div>
  );
}

function SpotsBar({ filled, total }) {
  const pct = Math.min(100, Math.round((filled / total) * 100));
  return (
    <div style={styles.spotsWrap}>
      <div style={styles.spotsTop}>
        <span style={styles.spotsText}>Spots filled</span>
        <span style={styles.spotsCount}>
          {filled} / {total} registered
        </span>
      </div>
      <div style={styles.spotsTrack}>
        <div
          style={{
            ...styles.spotsFill,
            width: `${pct}%`,
            animation: "ecell-fillBar 1.4s 0.6s ease both",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Keyframes injected once into <head>
───────────────────────────────────────── */

const KEYFRAMES = `
  @keyframes ecell-livePulse {
    0%   { box-shadow: 0 0 0 0 rgba(255,77,77,0.55); }
    70%  { box-shadow: 0 0 0 8px rgba(255,77,77,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,77,77,0); }
  }
  @keyframes ecell-shimmer {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ecell-cardFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes ecell-glowPulse {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%       { opacity: 1;    transform: scale(1.06); }
  }
  @keyframes ecell-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ecell-fillBar {
    from { width: 0; }
  }
`;

function injectKeyframes() {
  if (document.getElementById("ecell-popup-kf")) return;
  const tag = document.createElement("style");
  tag.id = "ecell-popup-kf";
  tag.textContent = KEYFRAMES;
  document.head.appendChild(tag);
}

/* ─────────────────────────────────────────
   Default event data (override via props)
───────────────────────────────────────── */

const DEFAULT_EVENT = {
  title: "CAMPUS SHARK TANK",
  subtitle:
    "CAMPUS SHARK TANK is ECell's premier intra college stage for bold thinkers and future founders.",

  date: "April 17, 2025",
  venue: "HMRITM Campus, Hamidpur",
  prize: "Exciting prizes and rewards",
  targetDate: "2025-04-17T09:00:00",
  //spotsTotal: 60,
  //spotsFilled: 45,
};
//registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSc2f2M2D3eHWGR3mSULx0gZLQdmuLHs36Sthi5JrebbCHRntA/viewform",

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */

export function EventPopup({ event = {} }) {
  const ev = { ...DEFAULT_EVENT, ...event };

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Inject keyframes on mount */
  useEffect(() => {
    injectKeyframes();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateSize = () => setIsMobile(mediaQuery.matches);

    updateSize();
    mediaQuery.addEventListener("change", updateSize);
    return () => mediaQuery.removeEventListener("change", updateSize);
  }, []);

  /* Live countdown */
  useEffect(() => {
    function tick() {
      const diff = new Date(ev.targetDate) - new Date();
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setCountdown({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ev.targetDate]);

  return (
    <motion.div
      style={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.7, delay: 0.25, ease: "easeOut" },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.25 },
      }}
    >
      {/* Ambient glow behind card */}
      <div style={styles.glow} />

      {/* Card */}
      <div
        tabIndex={0}
        style={{
          ...styles.card,
          boxShadow: hovered
            ? "0 32px 90px rgba(0,0,0,0.64), 0 0 0 1px rgba(120,255,230,0.22) inset, 0 0 46px rgba(0,255,220,0.16)"
            : "0 24px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 28px rgba(0,180,255,0.08)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div style={styles.reflection} />
        <div style={styles.edgeGlowTop} />
        <div style={styles.edgeGlowBottom} />

        {/* Shimmer accent top bar */}
        <div
          style={{
            ...styles.accentBar,
            animation: "ecell-shimmer 3s linear infinite",
          }}
        />

        {/* Card header */}
        <div style={{ ...styles.cardHeader, ...(isMobile ? styles.cardHeaderMobile : null) }}>
          <div style={{ ...styles.liveBadge, ...(isMobile ? styles.liveBadgeMobile : null) }}>
            <LiveDot />
            <span style={{ ...styles.liveBadgeText, ...(isMobile ? styles.liveBadgeTextMobile : null) }}>
              Ongoing Event
            </span>
          </div>
        </div>

        {/* Card body */}
        <div style={{ ...styles.cardBody, ...(isMobile ? styles.cardBodyMobile : null) }}>
          <h3 style={{ ...styles.eventTitle, ...(isMobile ? styles.eventTitleMobile : null) }}>{ev.title}</h3>
          <p style={{ ...styles.eventSubtitle, ...(isMobile ? styles.eventSubtitleMobile : null) }}>{ev.subtitle}</p>

          {/* Countdown */}
          <p style={styles.countdownLabel}>Starts in</p>
          <div style={{ ...styles.countdownRow, ...(isMobile ? styles.countdownRowMobile : null) }}>
            <div style={isMobile ? styles.countBoxMobile : undefined}><CountBox value={countdown.d} label="Days" /></div>
            <div style={isMobile ? styles.countBoxMobile : undefined}><CountBox value={countdown.h} label="Hours" /></div>
            <div style={isMobile ? styles.countBoxMobile : undefined}><CountBox value={countdown.m} label="Mins" /></div>
            <div style={isMobile ? styles.countBoxMobile : undefined}><CountBox value={countdown.s} label="Secs" /></div>
          </div>

          {/* Details */}
          <div style={styles.detailsBox}>
            <DetailRow icon="📅" label="Date" value={ev.date} />
            <DetailRow icon="📍" label="Venue" value={ev.venue} />
            <DetailRow icon="💰" label="Prize Pool" value={ev.prize} />
          </div>

          {/* Spots progress */}
          {/*<SpotsBar filled={ev.spotsFilled} total={ev.spotsTotal} />*/}

          {/* CTA */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            style={{
              ...styles.cta,
              ...(isMobile ? styles.ctaMobile : null),
              opacity: hovered ? 0.92 : 1,
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            Registration closed
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EventPopup;

/* ─────────────────────────────────────────
   Style object — all in JS for portability
───────────────────────────────────────── */

const styles = {
  /* Outer wrapper — positions glow behind card */
  wrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 360,
    minWidth: 0,
    padding: 0,
    borderRadius: 24,
    fontFamily: "'Space Grotesk', sans-serif",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    overflow: "hidden",
  },

  /* Soft ambient glow */
  glow: {
    position: "absolute",
    inset: 0,
    borderRadius: 24,
    background:
      "radial-gradient(circle at 18% 18%, rgba(45,255,214,0.22), transparent 28%), radial-gradient(circle at 82% 78%, rgba(0,196,255,0.18), transparent 34%), radial-gradient(circle at 50% 50%, rgba(0,120,255,0.12), transparent 68%)",
    pointerEvents: "none",
    animation: "ecell-glowPulse 5s ease-in-out infinite",
    zIndex: 0,
  },

  reflection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "58%",
    height: "42%",
    borderTopLeftRadius: 24,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 28%, transparent 68%)",
    filter: "blur(1px)",
    pointerEvents: "none",
    zIndex: 1,
  },

  edgeGlowTop: {
    position: "absolute",
    inset: 0,
    borderRadius: 24,
    background:
      "linear-gradient(135deg, rgba(62,255,226,0.08) 0%, transparent 22%, transparent 100%)",
    pointerEvents: "none",
    zIndex: 1,
  },

  edgeGlowBottom: {
    position: "absolute",
    inset: 0,
    borderRadius: 24,
    background:
      "linear-gradient(180deg, transparent 55%, rgba(0,120,255,0.07) 100%)",
    pointerEvents: "none",
    zIndex: 1,
  },

  /* Main card surface */
  card: {
    position: "relative",
    zIndex: 1,
    background:
      "linear-gradient(180deg, rgba(9,14,30,0.42) 0%, rgba(4,10,22,0.26) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    overflow: "hidden",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)",
  },

  /* Shimmer top bar */
  accentBar: {
    height: 3,
    background: "linear-gradient(90deg, #10d7c4 0%, #27d7ff 48%, #2bd86f 100%)",
    backgroundSize: "200% auto",
  },

  /* Header strip */
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background:
      "linear-gradient(135deg, rgba(8,18,38,0.72), rgba(13,30,52,0.4))",
  },

  liveBadge: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
    gap: 7,
    background: "rgba(17, 31, 45, 0.42)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "5px 12px",
    borderRadius: 50,
  },

  liveBadgeText: {
    fontSize: 11,
    color: "#9feee2",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },

  typeBadge: {
    background: "rgba(20,50,72,0.42)",
    border: "1px solid rgba(105,225,235,0.16)",
    color: "#8ff7e2",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 50,
    whiteSpace: "nowrap",
  },

  /* Body */
  cardBody: {
    padding: "18px 16px 14px",
  },

  eventTitle: {
    fontSize: 21,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    marginBottom: 6,
    margin: "0 0 6px 0",
  },

  eventSubtitle: {
    fontSize: 12,
    color: "rgba(228,245,255,0.52)",
    lineHeight: 1.65,
    fontWeight: 300,
    margin: "0 0 14px 0",
  },

  /* Countdown */
  countdownLabel: {
    fontSize: 10,
    color: "rgba(210,240,255,0.42)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: 500,
    margin: "0 0 8px 0",
  },

  countdownRow: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },

  countBoxMobile: {
    flex: "1 1 calc(50% - 4px)",
    minWidth: "calc(50% - 4px)",
  },

  countBox: {
    flex: 1,
    background: "rgba(8, 21, 45, 0.38)",
    border: "1px solid rgba(155,255,235,0.12)",
    borderRadius: 10,
    padding: "8px 4px",
    textAlign: "center",
  },

  countNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    color: "#b2fff1",
    lineHeight: 1,
    marginBottom: 3,
  },

  countLabel: {
    fontSize: 9,
    color: "rgba(210,240,255,0.36)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  /* Detail rows */
  detailsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 12,
    background: "rgba(6, 14, 28, 0.32)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: 14,
  },

  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  detailIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    background: "linear-gradient(135deg, rgba(20,225,214,0.16), rgba(38,168,255,0.16))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    flexShrink: 0,
  },

  detailInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  detailLabel: {
    fontSize: 10,
    color: "rgba(210,240,255,0.34)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },

  detailValue: {
    fontSize: 13,
    color: "rgba(245,250,255,0.9)",
    fontWeight: 500,
  },

  /* Spots */
  spotsWrap: {
    marginBottom: 14,
  },

  spotsTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  spotsText: {
    fontSize: 12,
    color: "rgba(210,240,255,0.42)",
  },

  spotsCount: {
    fontSize: 12,
    color: "#8ff7e2",
    fontWeight: 600,
  },

  spotsTrack: {
    height: 4,
    background: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    overflow: "hidden",
  },

  spotsFill: {
    height: "100%",
    borderRadius: 10,
    background: "linear-gradient(90deg, #1df0cf 0%, #2bc7ff 55%, #30e081 100%)",
  },

  /* CTA button */
  cta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "11px 0",
    background: "linear-gradient(135deg, #0b255d 0%, #0c387f 52%, #0e4ea1 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "0.04em",
    cursor: "not-allowed",
    textDecoration: "none",
    boxSizing: "border-box",
    boxShadow: "0 12px 24px rgba(7, 72, 163, 0.32), 0 0 0 1px rgba(113, 223, 255, 0.18) inset",
  },

  cardHeaderMobile: {
    padding: "10px 12px",
    gap: 8,
    alignItems: "flex-start",
    flexDirection: "column",
  },

  liveBadgeMobile: {
    padding: "4px 10px",
  },

  liveBadgeTextMobile: {
    fontSize: 10,
    letterSpacing: "0.08em",
  },

  typeBadgeMobile: {
    fontSize: 9,
    padding: "4px 8px",
  },

  cardBodyMobile: {
    padding: "14px 12px 12px",
  },

  eventTitleMobile: {
    fontSize: 18,
    lineHeight: 1.25,
  },

  eventSubtitleMobile: {
    fontSize: 11,
    lineHeight: 1.5,
  },

  countdownRowMobile: {
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 14,
  },

  ctaMobile: {
    padding: "10px 0",
    fontSize: 13,
  },
};