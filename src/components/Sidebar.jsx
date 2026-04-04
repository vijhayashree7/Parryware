import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const handleProductClick = (prod) => {
    if (prod === 'Basin') navigate('/basin');
    else if (prod === 'Faucets') navigate('/faucets');
    else if (prod === 'Water Heater') navigate('/water-heater');
    else if (prod === 'Chimney') navigate('/chimney');
    else if (prod === 'Tiles and Surface') navigate('/tiles-and-surface');
    else if (prod === 'Closet') navigate('/closet');

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] pointer-events-auto"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white/90 backdrop-blur-[30px] text-[#3E2723] z-[70] transform transition-transform duration-500 flex flex-col shadow-2xl border-r border-[#3E2723]/10 font-serif-elegant ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-10 border-b border-[#3E2723]/5">
          <span className="text-[12px] font-black uppercase tracking-[0.6em]">Registry Menu</span>
          <motion.button 
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-[#3E2723]/40 hover:text-[#3E2723] transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto py-10 px-10 space-y-8 custom-scrollbar">
          <div>
            <div 
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="flex items-center justify-between text-[20px] font-black uppercase tracking-widest cursor-pointer group hover:text-[#A68966] transition-colors"
            >
              Our Products 
              <motion.div
                animate={{ rotate: isProductsOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>

            <AnimatePresence>
              {isProductsOpen && (
                <motion.ul 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="pl-6 space-y-5 overflow-hidden mt-6"
                >
                  {['Water Heater', 'Closet', 'Basin', 'Faucets', 'Chimney', 'Tiles and Surface'].map(prod => (
                    <motion.li
                      key={prod}
                      whileHover={{ x: 10 }}
                      onClick={() => handleProductClick(prod)}
                      className="text-[14px] font-black uppercase tracking-widest cursor-pointer text-[#3E2723]/60 hover:text-[#3E2723] transition-all flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A68966]/40" />
                      {prod}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="h-px bg-[#3E2723]/5 my-10"></div>

          <Link to="/locations" onClick={onClose} className="block text-[20px] font-black uppercase tracking-widest hover:text-[#A68966] transition-colors">Location of Store</Link>
          <Link to="/catalog" onClick={onClose} className="block text-[20px] font-black uppercase tracking-widest hover:text-[#A68966] transition-colors">Catalogue</Link>
          <Link to="/contact" onClick={onClose} className="block text-[20px] font-black uppercase tracking-widest hover:text-[#A68966] transition-colors">Contact Us</Link>
          <Link to="/admin" onClick={onClose} className="block text-[14px] font-black uppercase tracking-[0.4em] text-[#A68966] mt-10 hover:text-[#3E2723] transition-colors border-t border-[#3E2723]/5 pt-10">Admin Authority Dashboard</Link>
        </div>

        <div className="p-10 text-[10px] text-[#3E2723]/30 uppercase tracking-[0.3em] font-black bg-white/50 border-t border-[#3E2723]/5">
          <p>© 2026 Abirami Agency Parryware</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;