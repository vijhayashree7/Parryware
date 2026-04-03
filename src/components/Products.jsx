import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 0, title: 'Water Heater', bgImage: '/images/heater_new.png', desc: 'Instant & Storage Systems', path: '/water-heater' },
  { id: 1, title: 'Closet', bgImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80', desc: 'Smart & Premium Designs', path: '/closet' },
  { id: 2, title: 'Basin', bgImage: '/images/basin.png', desc: 'Countertop & Wall Hung', path: '/basin' },
  { id: 3, title: 'Faucets', bgImage: '/images/faucet_new.png', desc: 'Elegant Chrome & Matte', path: '/faucets' },
  { id: 4, title: 'Chimney', bgImage: '/images/chimney.png', desc: 'Slanted & Island Models', path: '/chimney' },
  { id: 5, title: 'Tiles and Surface', bgImage: '/images/tiles.jpg', desc: 'Large Format & Marble', path: '/tiles-and-surface' }
];

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Unstoppable auto-play every 2000ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index) => {
    const offset = (index - activeIndex + categories.length) % categories.length;

    if (offset === 0) {
      return { x: 0, y: 0, scale: 1, rotate: 0, zIndex: 30, opacity: 1 };
    } else if (offset === 1) {
      return { x: "50%", y: 30, scale: 0.85, rotate: 10, zIndex: 20, opacity: 1 };
    } else if (offset === 2) {
      return { x: "90%", y: 60, scale: 0.7, rotate: 20, zIndex: 10, opacity: 1 };
    } else if (offset === 5) {
      return { x: "-50%", y: 30, scale: 0.85, rotate: -10, zIndex: 20, opacity: 1 };
    } else if (offset === 4) {
      return { x: "-90%", y: 60, scale: 0.7, rotate: -20, zIndex: 10, opacity: 1 };
    } else {
      return { x: 0, y: -40, scale: 0.5, rotate: 0, zIndex: 0, opacity: 0 };
    }
  };

  return (
    <section className="py-24 max-w-[100vw] overflow-hidden bg-transparent">
      
      <div className="mb-20 flex flex-col items-center text-center relative z-40 px-6">
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-sans font-bold text-cozy-900 mb-4 tracking-tight">Redefine Your Sanctuary</h2>
        <p className="text-xl md:text-2xl text-cozy-700 max-w-3xl font-serif italic leading-relaxed mx-auto text-center">
          Immerse yourself in our masterfully crafted collections. Elevate your daily rituals with uncompromising quality and breathtaking design. Explore our products below.
        </p>
      </div>

      <div 
        className="relative h-[450px] md:h-[600px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1000px]"
      >
        {categories.map((cat, idx) => {
          const style = getCardStyle(cat.id);
          const isActive = style.zIndex === 30;

          return (
            <motion.div
              key={cat.id}
              className="absolute w-[280px] md:w-[380px] h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.2)] bg-cozy-900 origin-bottom"
              initial={false}
              animate={{
                x: style.x,
                y: style.y,
                scale: style.scale,
                rotateZ: style.rotate,
                zIndex: style.zIndex,
                opacity: style.opacity
              }}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 14,
                mass: 1
              }}
              onClick={() => {
                if (isActive) {
                  navigate(cat.path);
                } else {
                  setActiveIndex(cat.id);
                }
              }}
            >
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={cat.bgImage} 
                  alt={cat.title} 
                  className="w-full h-full object-cover rounded-3xl"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1606709794025-a7b3dbd3269b?auto=format&fit=crop&q=80" }} // fallback if PNG was actually JPG
                />
              </div>

              <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-black/90 via-[#663b2f]/40 to-transparent' : 'bg-black/40'}`}></div>
              
              <div className={`absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-white/80 text-sm tracking-widest uppercase mb-2 font-medium">{cat.desc}</p>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 drop-shadow-lg">{cat.title}</h3>
                
                <div className="w-full border-t border-white/20 pt-4 flex items-center justify-between group">
                  <span className="text-white text-sm font-bold tracking-widest uppercase group-hover:text-cozy-200 transition-colors">Explore Now</span>
                  <div className="bg-white/30 border border-white/40 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center group-hover:bg-white transition-all">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-cozy-900" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;

