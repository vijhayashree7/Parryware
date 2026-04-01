import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { cart, setIsSidebarOpen } = useCart();
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
            <Link to="/" className={`hidden md:flex items-center space-x-2 ${textColor} hover:opacity-70 transition-all duration-300 font-medium tracking-widest text-sm uppercase pt-1`}>
              Home
            </Link>
          </div>
        </div>

        {/* Center - Logo */}
        <Link to="/" className={`absolute left-1/2 -translate-x-1/2 ${textColor} text-3xl md:text-5xl font-serif tracking-widest text-shadow cursor-pointer transition-transform hover:scale-105 pb-1`}>
          Abirami
        </Link>

        {/* Right - Icons */}
        <div className={`flex items-center gap-6 ${textColor}`}>
          <Search size={24} strokeWidth={1.5} className="hover:text-[#A68966] transition-colors cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
            <ShoppingBag size={24} strokeWidth={1.5} className="hover:text-[#A68966] transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A68966] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>
            )}
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
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
