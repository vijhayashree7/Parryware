import React from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-transparent px-6 py-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left - Menu Button */}
        <div className="flex items-center gap-4 cursor-pointer text-white hover:text-cozy-300 transition-colors" onClick={onMenuClick}>
          <Menu size={32} strokeWidth={1.5} />
          <span className="hidden md:inline text-sm uppercase tracking-widest font-medium">Menu</span>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-white text-3xl md:text-5xl font-serif tracking-widest text-shadow cursor-pointer transition-transform hover:scale-105">
          Parryware
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-6 text-white cursor-pointer">
          <Search size={24} strokeWidth={1.5} className="hover:text-cozy-300 transition-colors" />
          <div className="relative">
            <ShoppingBag size={24} strokeWidth={1.5} className="hover:text-cozy-300 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-cozy-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
          </div>
          <User size={24} strokeWidth={1.5} className="hover:text-cozy-300 transition-colors" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
