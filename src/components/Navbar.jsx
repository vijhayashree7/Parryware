<<<<<<< HEAD
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const navBg = scrolled || !isHomePage ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6';
  const textColor = scrolled || !isHomePage ? 'text-[#4E342E]' : 'text-white';
  const accentColor = scrolled || !isHomePage ? 'text-[#A68966]' : 'text-[#D7CCC8]';

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 pointer-events-none ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 pointer-events-auto">

        {/* Left - Menu Button */}
        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-12">
            <motion.button 
              onClick={onMenuClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex items-center space-x-3 ${textColor} hover:opacity-70 transition-all duration-300`}
            >
              <Menu size={32} strokeWidth={1.5} />
              <span className="hidden md:inline text-sm uppercase tracking-widest font-medium">Menu</span>
            </motion.button>
          </div>
        </div>

        {/* Center - Logo */}
        <Link to="/" className={`absolute left-1/2 -translate-x-1/2 ${textColor} text-3xl md:text-5xl font-serif tracking-widest cursor-pointer transition-transform hover:scale-105`}>
          Parryware
        </Link>

        {/* Right - Icons */}
        <div className={`flex items-center gap-6 ${textColor}`}>
          <Search size={24} strokeWidth={1.5} className="hover:text-[#A68966] transition-colors cursor-pointer" />
          <div className="relative cursor-pointer">
            <ShoppingBag size={24} strokeWidth={1.5} className="hover:text-[#A68966] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#A68966] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
          </div>
          
          {/* User Dropdown */}
          <div className="relative user-dropdown-container">
            <motion.button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-[#A68966] transition-colors pt-1"
            >
              <User size={24} strokeWidth={1.5} />
            </motion.button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute right-0 mt-6 w-56 bg-white rounded-3xl shadow-[0_20px_50px_rgba(78,52,46,0.12)] border border-[#F5F0EB] py-6 px-2 overflow-hidden"
                >
                  <div className="px-6 mb-4">
                    <p className="text-[#A68966] text-[10px] uppercase tracking-[0.2em] font-bold">Welcome</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Link 
                      to="/signin" 
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center px-6 py-3 text-[#4E342E] text-sm hover:bg-[#FDFBF9] hover:text-[#A68966] transition-all rounded-xl gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#F5F0EB] flex items-center justify-center group-hover:bg-[#A68966] group-hover:text-white transition-colors">
                        <User size={14} />
                      </div>
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center px-6 py-3 text-[#4E342E] text-sm hover:bg-[#FDFBF9] hover:text-[#A68966] transition-all rounded-xl gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#F5F0EB] flex items-center justify-center group-hover:bg-[#A68966] group-hover:text-white transition-colors">
                        <Search size={14} />
                      </div>
                      Create Account
                    </Link>
                  </div>

                  <div className="mx-6 my-4 h-px bg-[#F5F0EB]"></div>

                  <div className="px-6">
                    <p className="text-[#8D6E63] text-[9px] font-light leading-relaxed">
                      Log in to access your wishlist and orders.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
=======
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Dynamic logic: once the user scrolls slightly past the top edge, convert Navbar to dark glassmode
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When scrolled down into the light mist, we apply a clear frosty glass and dark brown text to maintain visibility.
  // When at the very top (over the dark hero section), it stays completely transparent with pure white text.
  const navClasses = isScrolled 
    ? 'bg-white/85 backdrop-blur-xl border-b border-cozy-200/50 shadow-sm text-cozy-900 py-4' 
    : 'bg-transparent text-white py-6';

  const iconClasses = `transition-colors duration-300 ${isScrolled ? 'hover:text-cozy-600' : 'hover:text-cozy-300'}`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 px-6 transition-all duration-500 pointer-events-none ${navClasses}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Left - Menu Button */}
        <div className={`flex items-center gap-4 cursor-pointer ${iconClasses}`} onClick={onMenuClick}>
          <Menu size={28} strokeWidth={1.5} />
          <span className="hidden md:inline text-[11px] uppercase tracking-[0.25em] font-medium">Menu</span>
        </div>

        {/* Center - Stylish Modern Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-[2.5rem] md:text-[3.5rem] font-serif font-light tracking-wide cursor-pointer hover:scale-[1.02] transition-transform duration-500 pb-1">
          Abirami
        </div>

        {/* Right - Icons */}
        <div className={`flex items-center gap-5 md:gap-8 cursor-pointer`}>
          <Search size={22} strokeWidth={1.5} className={iconClasses} />
          <div className="relative">
            <ShoppingBag size={22} strokeWidth={1.5} className={iconClasses} />
            <span className={`absolute -top-2 -right-2 w-4 h-4 text-[9px] rounded-full flex items-center justify-center font-bold shadow-sm transition-colors duration-300 ${isScrolled ? 'bg-cozy-900 text-white' : 'bg-cozy-600 text-white'}`}>
              1
            </span>
          </div>
          <User size={22} strokeWidth={1.5} className={iconClasses} />
>>>>>>> 348b95b (Added new blog data and updates)
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
