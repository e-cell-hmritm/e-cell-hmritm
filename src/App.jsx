import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader/Preloader';
import { LoadingAnimation } from './components/Preloader/LoadingAnimation';
import Home from './pages/Home/home.jsx';
import Dashboard from './pages/Team/Team.jsx';
import Events from './pages/Event/Event';
import Register from './pages/Register/Register';
import Result from './pages/Result/Result';
import About from './pages/About/about.jsx';
import Contact from './pages/contact/contact.jsx';
// import Preloader from './components/Preloader/Preloader';

import './App.css';
import Footer from './components/Footer/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  const [hasVisitedInitial] = useState(() => localStorage.getItem('ecell_hmritm_visited') === 'true');
  const [loading, setLoading] = useState(true);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(!hasVisitedInitial);
  const [showCircularPreloader, setShowCircularPreloader] = useState(hasVisitedInitial);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // If this is the first time, save the visit to memory.
    if (!hasVisitedInitial) {
      localStorage.setItem('ecell_hmritm_visited', 'true');
    }
    setInitialized(true);
  }, [hasVisitedInitial]);

  const handleLoadingAnimationComplete = () => {
    setShowLoadingAnimation(false);
    setLoading(false);
  };

  const handleCircularPreloaderComplete = () => {
    setShowCircularPreloader(false);
    setLoading(false);
  };

  // Show nothing while initializing to prevent flash
  if (!initialized) {
    return null;
  }

  return (
    <>
      {showLoadingAnimation && (
        <LoadingAnimation onComplete={handleLoadingAnimationComplete} />
      )}
      {showCircularPreloader && (
        <Preloader
          visible={showCircularPreloader}
          zoomOut={!showCircularPreloader}
          onComplete={handleCircularPreloaderComplete}
        />
      )}

      {/* Only render when loaders are done */}
      {!loading && !showLoadingAnimation && !showCircularPreloader && (
        <>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Dashboard />} />
            <Route path="/Team" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<Register />} />
            <Route path="/result" element={<Result />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
