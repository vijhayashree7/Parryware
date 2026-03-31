import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-cozy-900">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          src="/hero-video.mp4" 
          className="w-full h-full object-cover filter brightness-[0.6]"
        />
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-white z-10 pointer-events-none">
        
        {/* Animated text block */}
        <div className="text-center transform translate-y-8 opacity-0 animate-[fadeUp_1s_ease-out_0.5s_forwards]">
          <h1 className="text-5xl md:text-7xl font-serif tracking-widest font-light mb-4 drop-shadow-xl">Bathware</h1>
          <p className="text-sm md:text-lg tracking-[0.3em] uppercase text-cozy-200">Elevate Your Sanctuary</p>
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
