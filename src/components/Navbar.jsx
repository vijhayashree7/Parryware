import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setIsSidebarOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const isHomePage = location.pathname === '/';

  const handleSearch = () => {
    if (!searchQuery) {
      setIsSearchOpen(!isSearchOpen);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    if (query.includes('basin') || query.includes('sink')) {
      navigate('/basin');
    } else if (query.includes('faucet') || query.includes('tap')) {
      navigate('/faucets');
    } else if (query.includes('heater') || query.includes('geyser')) {
      navigate('/water-heater');
    } else if (query.includes('chimney') || query.includes('hood')) {
      navigate('/chimney');
    } else if (query.includes('tile') || query.includes('surface')) {
      navigate('/tiles-and-surface');
    } else if (query.includes('closet') || query.includes('toilet') || query.includes('commode')) {
      navigate('/closet');
    } else {
      navigate('/catalog');
    }
    
    setSearchQuery('');
    setIsSearchOpen(false);
  };

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
        <Link to="/" className={`absolute left-1/2 -translate-x-1/2 ${textColor} text-2xl md:text-4xl font-serif tracking-widest text-shadow cursor-pointer transition-transform hover:scale-105 pb-1 text-center whitespace-nowrap`}>
          Abirami Agency
        </Link>

        {/* Right - Icons */}
        <div className={`flex items-center gap-6 ${textColor}`}>
          
          {/* Search Bar */}
          <div className="flex items-center relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: window.innerWidth < 640 ? 120 : 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    setTimeout(() => {
                      if (!searchQuery) setIsSearchOpen(false);
                    }, 200);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className={`bg-transparent border-b ${textColor === 'text-white' ? 'border-white/50 text-white placeholder:text-white/70' : 'border-[#4E342E]/30 text-[#4E342E] placeholder:text-[#4E342E]/70'} px-2 py-1 outline-none text-sm mr-2`}
                  autoFocus
                />
              )}
            </AnimatePresence>
            <Search 
              size={24} 
              strokeWidth={1.5} 
              className="hover:text-[#A68966] transition-colors cursor-pointer" 
              onClick={handleSearch}
            />
          </div>

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
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-6 w-56 bg-white rounded-3xl shadow-lg border py-6 px-2"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  <div className="px-6 mb-4">
                    <p className="text-[#A68966] text-[10px] uppercase tracking-[0.2em] font-bold">
                      {isLoggedIn ? `Greeting, ${user?.name?.split(' ')[0]}` : 'Welcome Sanctuary'}
                    </p>
                    {isLoggedIn && (
                      <p className="text-[#3E2723]/60 text-[10px] lowercase truncate mt-1">{user?.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {!isLoggedIn ? (
                      <>
                        <Link 
                          to="/signin" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-6 py-3 text-sm text-[#3E2723] hover:bg-gray-100 rounded-xl gap-3 font-medium transition-colors"
                        >
                          <User size={14} />
                          Sign In
                        </Link>

                        <Link 
                          to="/signup" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-6 py-3 text-sm text-[#3E2723] hover:bg-gray-100 rounded-xl gap-3 font-medium transition-colors"
                        >
                          <Search size={14} />
                          Create Account
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/account" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-6 py-3 text-sm text-[#3E2723] hover:bg-gray-100 rounded-xl gap-3 font-medium transition-colors"
                        >
                          <User size={14} />
                          Member Dashboard
                        </Link>
                        
                        <Link 
                          to="/account?tab=orders" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-6 py-3 text-sm text-[#3E2723] hover:bg-gray-100 rounded-xl gap-3 font-medium transition-colors"
                        >
                          <ShoppingBag size={14} />
                          Order History
                        </Link>

                        <button 
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                            navigate('/');
                          }}
                          className="w-full flex items-center px-6 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl gap-3 font-medium transition-colors mt-2 border-t border-gray-100 pt-4"
                        >
                          <X size={14} />
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>

                  {!isLoggedIn && (
                    <>
                      <div className="mx-6 my-4 h-px bg-gray-200"></div>
                      <div className="px-6">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                          Enter your sanctuary to manage wishlist & orders.
                        </p>
                      </div>
                    </>
                  )}
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