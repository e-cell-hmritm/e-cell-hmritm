import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Github, Linkedin, X } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    
    // Scale down radius for mobile to fit inside viewport
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
    const radius = isMobile ? 128 : 192; // Matches w-64 (128) vs w-96 (192) size
    
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full min-h-150 flex flex-col items-center justify-center bg-transparent overflow-hidden my-8 touch-auto pointer-events-auto"
      ref={containerRef}
      onClick={handleContainerClick}
      style={{ touchAction: "pan-y pinch-zoom" }}
    >
      <div className="relative w-full max-w-4xl h-125 flex items-center justify-center pointer-events-auto">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-linear-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-slate-700/50 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-slate-800/50 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-slate-800/30 border-dashed"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 0 : position.opacity, // Hide the node circle slightly while expanded to focus on popup, or leave it. Actually opacity 1 is good, let's keep opacity: isExpanded ? 1 : position.opacity.
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  ...nodeStyle,
                  opacity: Object.keys(expandedItems).some(k => expandedItems[k]) ? (isExpanded ? 1 : 0.2) : nodeStyle.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${(item.energy || 80) * 0.5 + 40}px`,
                    height: `${(item.energy || 80) * 0.5 + 40}px`,
                    left: `-${((item.energy || 80) * 0.5 + 40 - 40) / 2}px`,
                    top: `-${((item.energy || 80) * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-white/50 text-black"
                      : "bg-slate-900 text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-white/30"
                      : isRelated
                      ? "border-white animate-pulse"
                      : "border-slate-700"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-[1.1] sm:scale-[1.2]" : ""}
                `}
                >
                  {Icon && <Icon size={16} />}
                </div>

                <div
                  className={`
                  absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] sm:text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-110" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>
              </div>
            );
          })}

          {/* Centered Expanded Popup Card */}
          {Object.keys(expandedItems).some(k => expandedItems[k]) && (
            (() => {
              const expandedId = parseInt(Object.keys(expandedItems).find(k => expandedItems[k]));
              const item = timelineData.find((i) => i.id === expandedId);
              if (!item) return null;
              
              return (
                <Card 
                  className="fixed sm:absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-sm sm:max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl shadow-blue-500/20 max-h-[80vh] overflow-y-auto text-white p-0 pointer-events-auto custom-scrollbar z-300"
                  style={{ touchAction: "auto" }}
                >
                  <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md pb-3 pt-5 px-5 border-b border-slate-800">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-8 h-1 bg-slate-600 rounded-b-md"></div>
                    <div className="flex justify-between items-center">
                      <Badge
                        className={`px-2 text-[8px] sm:text-[10px] ${getStatusStyles(
                          item.status
                        )}`}
                      >
                        {item.status === "completed"
                          ? "COMPLETE"
                          : item.status === "in-progress"
                          ? "IN PROGRESS"
                          : "PENDING"}
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-start mt-3">
                      <div>
                        <CardTitle className="text-lg sm:text-xl text-white">
                          {item.title}
                        </CardTitle>
                        {item.role && <div className="text-xs sm:text-sm text-purple-400 mt-1 font-medium">{item.role}</div>}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }} className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <CardContent className="px-4 sm:px-5 py-4 text-xs text-slate-300">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      {item.image && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-black shadow-lg mx-auto sm:mx-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <p className="leading-relaxed text-sm opacity-90 text-center sm:text-left">{item.content}</p>
                    </div>

                    {/* Tech Stack */}
                    {item.tech && item.tech.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-800/60">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-3.5 bg-purple-500 rounded" />
                          <h4 className="font-semibold text-white/90 text-xs sm:text-sm uppercase tracking-wider">Tech Stack</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((t, i) => (
                            <div key={i} className="px-2.5 py-1 border border-slate-700 rounded-md text-[10px] sm:text-[11px] font-medium text-purple-300 bg-black/40">{t}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mission Contribution */}
                    {item.mission && (
                      <div className="mt-4 pt-4 border-t border-slate-800/60">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-3.5 bg-purple-500 rounded" />
                          <h4 className="font-semibold text-white/90 text-xs sm:text-sm uppercase tracking-wider">Mission Contribution</h4>
                        </div>
                        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">{item.mission}</p>
                      </div>
                    )}

                    {/* Communication Channels & Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-800/60 mb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-3.5 bg-purple-500 rounded" />
                        <h4 className="font-semibold text-white/90 text-xs sm:text-sm uppercase tracking-wider">Communication Channels</h4>
                      </div>
                      
                      <div className="mt-3 flex flex-row items-center justify-start gap-4">
                        <div className="flex gap-3">
                          {item.socials && item.socials.github && (
                            <a href={item.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-md border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors bg-slate-800/50"> <Github className="w-5 h-5" /> </a>
                          )}
                          {item.socials && item.socials.linkedin && (
                            <a href={item.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-md border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors bg-slate-800/50"> <Linkedin className="w-5 h-5" /> </a>
                          )}
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}
