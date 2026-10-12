import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/Logo/logo.png';
import CircularText from './CircularText';


const Preloader = ({ visible = true, zoomOut = false, onComplete }) => {
  // Custom ring texts with dots
  const ShashankRing = 'H M R I T M      H M R I T M      H M R I T M   ';
  const innerRing = 'E-Cell • E-Cell • E-Cell • E-Cell •';


  const [fly, setFly] = useState(false);
  const [flyDone, setFlyDone] = useState(false);
  const [startRect, setStartRect] = useState(null);
  const [endRect, setEndRect] = useState(null);
  const logoRef = useRef();

  // Find navbar logo on DOM
  useEffect(() => {
    if (fly && logoRef.current) {
      const navLogo = document.querySelector('.navbar-logo .logo-img');
      if (navLogo) {
        setStartRect(logoRef.current.getBoundingClientRect());
        setEndRect(navLogo.getBoundingClientRect());
      }
    }
  }, [fly]);

  // When preloader is about to end, trigger fly
  useEffect(() => {
    if (zoomOut && !fly && !flyDone) {
      setFly(true);
    }
  }, [zoomOut, fly, flyDone]);

  // Hide preloader after fly animation
  useEffect(() => {
    if (flyDone) {
      setTimeout(() => {
        setFly(false);
      }, 200);
    }
  }, [flyDone]);

  // Notify parent to hide the preloader after a short display time
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      if (typeof onComplete === 'function') onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible, onComplete]);

  if (!visible && !fly) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: zoomOut ? 1.2 : 1, opacity: zoomOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="relative w-screen h-screen">
          {/* Big circle centered */}
          <div className="absolute top-1/2 left-1/2 w-150 h-150" style={{ transform: 'translate(-50%,-50%)' }}>
            <CircularText text={ShashankRing} spinDuration={8} className="absolute top-0 left-0 w-150 h-150 text-3xl text-white font-extrabold tracking-widest" />
            {/* Center logo and event name */}
            <div className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center z-10" style={{ transform: 'translate(-50%,-50%)' }}>
              {/* Animated logo with motion */}
              {!fly && (
                <img
                  ref={logoRef}
                  src={logo}
                  alt="Logo"
                  className="w-28 h-28 object-contain"
                />
              )}
              <div className="text-white text-xl font-bold ">E-Cell HMRITM</div>
            </div>
          </div>
          {/* Small circle centered in screen */}
          <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%)' }}>
            <CircularText text={innerRing} spinDuration={-5} className="w-75 h-75 text-xl text-white font-extrabold tracking-widest" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
