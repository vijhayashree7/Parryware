import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
      window.scrollTo(0, 0);
      // Small delay to ensure React has rendered the home page before hiding splash
      setTimeout(() => {
        onComplete();
        window.scrollTo(0, 0);
      }, 100);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Full-screen background image — your golden wave reference */}
      <motion.img 
        src="/images/splash-bg.jpeg"
        alt="Splash Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      {/* Soft overlay so text is readable */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main Text Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-wider mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        >
          Welcome to
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl italic font-serif text-white/90 tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        >
          Abirami Agency
        </motion.h2>

        {/* Loading Indicator elegant line */}
        <motion.div 
          className="h-[2px] bg-white/70 mt-10 origin-left rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "250px", opacity: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 1.2 }}
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
