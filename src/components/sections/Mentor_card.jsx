import React, { useEffect, useRef } from "react";
import { sharkTankMentors } from "../../data/content";
import mentorOne from "../../assets/Menter_of_sharkTank/mentor1.png";
import mentorTwo from "../../assets/Menter_of_sharkTank/mentor2.png";
import mentorThree from "../../assets/Menter_of_sharkTank/mentor3.png";
import mentorFour from "../../assets/Menter_of_sharkTank/mento4.png";

const mentorImages = [mentorOne, mentorTwo, mentorThree];
const mentorImageByFileName = {
  mentor1: mentorOne,
  "mentor1.png": mentorOne,
  mentor2: mentorTwo,
  "mentor2.png": mentorTwo,
  mentor3: mentorThree,
  "mentor3.png": mentorThree,
  mentor4: mentorFour,
  "mentor4.png": mentorFour,
};

const mentorImageByMentorName = {
  "Dr. Rajesh Kumar": mentorOne,
  "Amit Sharma": mentorTwo,
  "Priya Patel": mentorThree,
  "Rahul Singh": mentorFour,
};

function normalizeImageKey(value) {
  return String(value || "").trim().toLowerCase();
}

function resolveMentorImage(mentor, index, images) {
  const imageNameKey = normalizeImageKey(mentor.imageName || mentor.imageKey);

  if (imageNameKey && mentorImageByFileName[imageNameKey]) {
    return mentorImageByFileName[imageNameKey];
  }

  if (images && !Array.isArray(images)) {
    if (mentor.name && images[mentor.name]) return images[mentor.name];
    if (imageNameKey && images[imageNameKey]) return images[imageNameKey];
  }

  if (mentor.name && mentorImageByMentorName[mentor.name]) {
    return mentorImageByMentorName[mentor.name];
  }

  if (Array.isArray(images) && images.length) {
    return images[index % images.length];
  }

  return null;
}

function getMentorPoints(mentor) {
  if (Array.isArray(mentor.highlights) && mentor.highlights.length) {
    return mentor.highlights.slice(0, 3);
  }

  const role = (mentor.role || "").toLowerCase();
  if (role.includes("advisor")) {
    return [
      "Strategic startup mentorship",
      "Faculty and industry guidance",
      "Academic to market bridge",
    ];
  }
  if (role.includes("president")) {
    return [
      "Leadership and team building",
      "Pitch and presentation support",
      "Community growth initiatives",
    ];
  }
  if (role.includes("vice")) {
    return [
      "Product validation playbooks",
      "Early traction strategies",
      "Mentor network coordination",
    ];
  }
  if (role.includes("technical")) {
    return [
      "Technical architecture reviews",
      "MVP development roadmaps",
      "Execution and delivery focus",
    ];
  }

  return [
    "Startup mentoring and guidance",
    "Hands-on strategic support",
    "Growth-first execution approach",
  ];
}

function MentorCard({
  mentors = sharkTankMentors,
  images = mentorImages,
  title = "Meet Our Shark Tank Mentors",
  subtitle = " ",
  autoScrollMs = 3200,
  showHint = true,
}) {
  const scrollRef = useRef(null);

  const scrollByCard = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const next = container.scrollLeft + direction * container.clientWidth;
    container.scrollTo({ left: Math.max(0, next), behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timer = null;

    const moveNext = () => {
      const next = container.scrollLeft + container.clientWidth;
      const max = container.scrollWidth - container.clientWidth;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      if (next >= max - 4) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      container.scrollTo({ left: next, behavior: "smooth" });
    };

    const startAutoScroll = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(moveNext, autoScrollMs);
    };

    const stopAutoScroll = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    startAutoScroll();

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);
    container.addEventListener("touchstart", stopAutoScroll, { passive: true });
    container.addEventListener("touchend", startAutoScroll);

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
      container.removeEventListener("touchstart", stopAutoScroll);
      container.removeEventListener("touchend", startAutoScroll);
    };
  }, [autoScrollMs]);

  return (
    <section className="w-full">
      <style>{`
        .mentor-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="mb-3 sm:mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="h-8 w-8 rounded-md border border-white/15 text-slate-200 hover:text-white hover:border-blue-400/60"
            aria-label="Previous mentor"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="h-8 w-8 rounded-md border border-white/15 text-slate-200 hover:text-white hover:border-blue-400/60"
            aria-label="Next mentor"
          >
            →
          </button>
        </div>
      </div>

      <div className="max-w-md">
        <div
          ref={scrollRef}
          className="mentor-scroll overflow-x-auto snap-x snap-mandatory rounded-2xl"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <div className="flex w-full">
          {mentors.map((mentor, index) => {
            const points = getMentorPoints(mentor);

            const mentorImage = resolveMentorImage(mentor, index, images);
            const initial = mentor.name?.charAt(0)?.toUpperCase() || "M";

            return (
              <article
                key={mentor.name}
                className="min-w-full snap-start rounded-2xl p-4 border border-white/10 bg-[rgba(9,12,28,0.88)] backdrop-blur-sm flex flex-col"
                style={{ minHeight: "420px" }}
              >
                {mentorImage ? (
                  <img
                    src={mentorImage}
                    alt={mentor.name}
                    className="w-full h-48 sm:h-52 rounded-xl object-cover border border-blue-500/20"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-52 rounded-xl border border-blue-500/20 bg-blue-950/40 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-300">{initial}</span>
                  </div>
                )}

                <h4 className="text-white text-base font-semibold mt-3">{mentor.name}</h4>
                <p className="text-blue-300 text-xs mt-0.5">{mentor.role}</p>

                <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </article>
            );
          })}
          </div>
        </div>
          
      </div>
    </section>
  );
}

export default MentorCard;