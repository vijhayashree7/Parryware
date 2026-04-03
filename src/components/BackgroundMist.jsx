import React from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundMist = () => {
  const location = useLocation();
  const isBlogDetailPage = location.pathname.startsWith('/blog/');

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-cozy-50">
      
      {/* 
        A perfectly matching, beautiful, light-themed smoking/steam background image. 
        It has a subtle infinite zoom and pan to make the smoke feel alive and gently moving.
      */}
      <div 
        className={`absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center animate-ambient-smoke transition-opacity duration-1000 ${isBlogDetailPage ? 'opacity-100 contrast-125' : 'opacity-80'}`}
        style={{
          backgroundImage: "url('/images/light-steam-bg.png')"
        }}
      ></div>

      <style>{`
        @keyframes ambientSmoke {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }

        .animate-ambient-smoke {
          animation: ambientSmoke 40s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundMist;
