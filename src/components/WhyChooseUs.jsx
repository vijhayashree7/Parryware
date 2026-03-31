import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 'durable-materials',
    title: 'Durable Materials',
    description: 'Engineered with industrial-grade resilience, our fixtures resist tarnishing, scratches, and wear to look brand new for decades.',
    image: '/images/durable-material.jpg', 
  },
  {
    id: 'smart-innovation',
    title: 'Smart Innovation',
    description: 'Experience the future of personal care with intuitive touch controls, precise temperature monitoring, and intelligent efficiency features.',
    image: '/images/smart-innovation.jpg', 
  },
  {
    id: 'modern-design',
    title: 'Modern Design',
    description: 'Sleek, minimalist aesthetics that integrate seamlessly with contemporary interiors, ensuring your bathroom is a sanctuary of calm.',
    image: '/images/modern-design.jpg', 
  },
  {
    id: 'premium-quality',
    title: 'Premium Quality',
    description: 'Experience unparalleled luxury with perfectly crafted materials designed to stand the test of time, elevating your everyday spaces into works of art.',
    image: '/images/premium-quality.jpg', 
  },
  {
    id: 'water-saving',
    title: 'Water Saving Technology',
    description: 'Our innovative aerodynamic flow systems significantly reduce water consumption without ever compromising on the pressure or experience.',
    image: '/images/water-saving.jpg', 
  }
];

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const ITEM_HEIGHT = 260; // 240px height + 20px gap

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, clientHeight } = scrollRef.current;
    
    const scrollCenter = scrollTop + (clientHeight / 2);
    const closestIndex = Math.floor(scrollCenter / ITEM_HEIGHT);
    const clampedIndex = Math.min(Math.max(closestIndex, 0), features.length - 1);
    
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  };

  const scrollToActive = (index) => {
    if (scrollRef.current) {
      const topPos = index * ITEM_HEIGHT - (scrollRef.current.clientHeight / 2) + (ITEM_HEIGHT / 2);
      scrollRef.current.scrollTo({
        top: Math.max(0, topPos),
        behavior: 'smooth'
      });
    }
  };

  // Auto-play interval
  useEffect(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      const nextIdx = (activeIndex + 1) % features.length;
      setActiveIndex(nextIdx);
      scrollToActive(nextIdx);
    }, 4500); 
    
    return () => clearTimeout(scrollTimeoutRef.current);
  }, [activeIndex]);

  const activeFeature = features[activeIndex];

  return (
    <section className="py-12 md:py-16 max-w-[100vw] overflow-hidden bg-transparent flex flex-col justify-center items-center min-h-screen" id="why-choose-us">
      
      {/* Tighter gap so the title and box fit on the same screen perfectly */}
      <div className="w-full flex flex-col items-center gap-6 md:gap-8 px-4">
        
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-cozy-900 tracking-wide drop-shadow-sm font-light">
            Why Choose Us
          </h2>
        </div>

        {/* The Box - BOLD borders, 3D tilt animation, compact height */}
        <div className="w-full max-w-[1000px] h-[480px] md:h-[500px] border-[5px] border-cozy-900 rounded-[2rem] overflow-hidden flex bg-white/70 backdrop-blur-2xl shadow-[10px_10px_0px_#4A3B32] md:shadow-[15px_15px_0px_#4A3B32] animate-floatbox relative mx-auto">
          
          {/* Left Side: Single Dynamic Content Container */}
          <div className="w-[50%] flex relative overflow-hidden bg-transparent">
             
            {/* Decorative Side Ribbon */}
            <div className="w-12 h-full flex flex-col justify-between py-8 items-center border-r-[3px] border-cozy-900/10 text-cozy-900/70 text-[11px] font-serif tracking-[0.2em] uppercase bg-cozy-50/50" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              <span>Why Us</span>
              <span>Abirami</span>
              <span>Excellence</span>
            </div>

            {/* Exactly ONE Title and Description transitions in/out */}
            <div className="flex-1 px-8 md:px-12 flex flex-col justify-center relative">
               <AnimatePresence mode="wait">
                 <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col gap-4"
                 >
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-cozy-900 leading-tight">
                      {activeFeature.title}
                    </h3>
                    <p className="text-base md:text-lg text-cozy-700 leading-relaxed font-medium">
                      {activeFeature.description}
                    </p>
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Scrollable Non-Blurred Images popping on focus */}
          <div 
            className="w-[50%] bg-[#efeeee] h-full overflow-y-auto no-scrollbar scroll-smooth border-l-[3px] border-cozy-900/10"
            ref={scrollRef}
            onScroll={handleScroll}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <div className="px-6 py-4 flex flex-col gap-5 items-center">
              {/* Top Padding */}
              <div className="h-[calc(500px/2-120px-10px)] shrink-0 w-full opacity-0 pointer-events-none" />
              
              {features.map((feature, idx) => {
                const isActive = activeIndex === idx;
                
                return (
                  <div 
                    key={feature.id} 
                    className={`w-full max-w-[360px] h-[240px] shrink-0 rounded-2xl overflow-hidden transition-all duration-500 relative border-2 cursor-pointer 
                      ${isActive 
                        ? 'scale-105 border-cozy-900 shadow-2xl z-20 top-0 opacity-100' 
                        : 'scale-90 opacity-80 border-transparent shadow-md hover:opacity-100 z-10'}`}
                    onClick={() => { setActiveIndex(idx); scrollToActive(idx); }}
                  >
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className={`w-full h-full object-cover transition-transform duration-[800ms] ${isActive ? 'scale-110' : 'scale-100'}`}
                    />
                    {/* Dark gradient for bold contrast */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-30' : 'opacity-10'}`}></div>
                    
                    {/* Optional numerical indicator inside the image bounding box */}
                    <div className="absolute top-4 left-4 text-white bg-black/40 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center font-bold font-serif shadow-sm">
                      {idx + 1}
                    </div>
                  </div>
                )
              })}
              
              {/* Bottom Padding */}
              <div className="h-[calc(500px/2-120px-10px)] shrink-0 w-full opacity-0 pointer-events-none" />
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Styles for scrollbars and float animation */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes floatbox {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .animate-floatbox {
          animation: floatbox 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
