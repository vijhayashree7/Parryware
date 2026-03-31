import React from 'react';

const SocialIcon = ({ path }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const socialPaths = [
  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", // Facebook
  "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M5 22h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2z", // Instagram
  "M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z", // Twitter
  "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" // Youtube
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-cozy-50 via-cozy-100 to-cozy-200 border-t-[4px] border-cozy-300/50 shadow-[0_-20px_50px_rgba(40,20,10,0.05)] text-cozy-900 pt-24 pb-12 overflow-hidden mt-20 rounded-t-[3rem] lg:rounded-t-[4rem]">
      
      {/* "Innovation": Ambient glowing dark orbs drifting softly in the deeply dark background */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[100%] bg-gradient-to-r from-white/70 to-transparent rounded-full blur-[80px] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[100%] bg-gradient-to-l from-cozy-300/40 to-transparent rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-[pulse_6s_ease-in-out_infinite]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Branding Section */}
        <div className="flex flex-col items-center justify-center mb-20 space-y-8">
          <h3 className="text-5xl md:text-6xl font-serif tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-cozy-700 via-cozy-900 to-cozy-700 opacity-90 pb-2">
            parryware
          </h3>
          <div className="flex items-center gap-4 md:gap-6 mt-4">
            {socialPaths.map((path, idx) => (
              <div key={idx} className="w-12 h-12 rounded-full bg-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-cozy-300 flex items-center justify-center text-cozy-700 hover:text-white hover:bg-gradient-to-br hover:from-cozy-700 hover:to-cozy-900 hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:shadow-cozy-900/20 transition-all duration-300 cursor-pointer">
                <SocialIcon path={path} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8 text-sm font-medium mb-16 px-4">
          
          <div className="space-y-5">
            <h4 className="font-bold text-cozy-900 mb-6 uppercase tracking-wider text-[11px] opacity-80">Explore By Brands</h4>
            <ul className="space-y-4 text-cozy-700">
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Parryware Italian Collection</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Parryware Smart Appliances</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Truflo By Parryware</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Benelave By Parryware</li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-bold text-cozy-900 mb-6 uppercase tracking-wider text-[11px] opacity-80">Explore By Categories</h4>
            <ul className="space-y-4 text-cozy-700">
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Bathware</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Tiles & Surfaces</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Kitchen Appliances</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Home Appliances</li>
            </ul>
            
            <h4 className="font-bold text-cozy-900 mb-6 mt-8 uppercase tracking-wider text-[11px] opacity-80">Explore By Space</h4>
            <ul className="space-y-4 text-cozy-700">
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Bathroom</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Kitchen</li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-bold text-cozy-900 mb-6 uppercase tracking-wider text-[11px] opacity-80">Business</h4>
            <ul className="space-y-4 text-cozy-700">
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Institutional Business</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">International Business</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Parryware Experience Center</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Store Locator</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Explore Catalogue</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">IoT Devices</li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-bold text-cozy-900 mb-6 uppercase tracking-wider text-[11px] opacity-80">Customer Support</h4>
            <ul className="space-y-4 text-cozy-700">
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Service & Support</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Contact Us</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Warranty & Return Policy</li>
            </ul>
          </div>

          <div className="space-y-5">
             <h4 className="font-bold text-cozy-900 mb-6 uppercase tracking-wider text-[11px] opacity-80">Other Links</h4>
            <ul className="space-y-4 text-cozy-700">
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">About Parryware</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Blogs</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Certifications</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Privacy Policy</li>
              <li className="hover:text-cozy-900 cursor-pointer transition-all hover:translate-x-1">Terms & Conditions</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-cozy-300 pt-8 mt-12 flex flex-col md:flex-row justify-center items-center text-xs text-cozy-700 font-medium">
          <p className="tracking-wide text-center">Copyright © 2026 Abiramy Agency Parryware Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
