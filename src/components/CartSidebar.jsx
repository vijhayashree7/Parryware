import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const {
    cart,
    isSidebarOpen,
    setIsSidebarOpen,
    removeFromCart,
    updateQuantity,
    toggleSelect,
    selectAll,
    deselectAll,
    getProductStep,
    getProductMin
  } = useCart();

  const navigate = useNavigate();
  const handleClose = () => setIsSidebarOpen(false);

  // Calculate totals for selected items
  const selectedItems = cart.filter(item => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
  const allSelected = cart.length > 0 && selectedItems.length === cart.length;

  const sidebarVariants = {
    closed: { x: '100%', transition: { type: 'spring', damping: 30, stiffness: 300 } },
    open: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300, staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#4E342E]/40 backdrop-blur-[4px] z-[100] transition-all duration-500"
          />

          {/* Slide-out Sidebar */}
          <motion.div 
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#FCF9F6] z-[101] shadow-[-20px_0_50px_rgba(78,52,46,0.15)] flex flex-col overflow-hidden"
          >
            
            {/* Header - Luxury Minimalist */}
            <div className="px-8 py-7 border-b border-[#F0E6DD] flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-[#4E342E] tracking-tight">Your Selection</span>
                  <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-[#A68966] text-white rounded-full text-[10px] font-bold font-sans">
                    {cart.length}
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D6E63] mt-1 font-bold font-sans">Abirami Parryware Studio</p>
              </div>
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F5EFE9] text-[#4E342E] transition-colors bg-[#FDFBF9] border border-[#F0E6DD]"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Contents */}
            <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-[#F5EFE9] rounded-full flex items-center justify-center relative">
                    <ShoppingBag className="w-10 h-10 text-[#A68966] stroke-1" />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#4E342E] rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#4E342E] mb-2">The Sanctuary is Empty</h3>
                    <p className="text-[#8D6E63] text-sm font-sans font-light max-w-[240px] leading-relaxed mx-auto">
                      Explore our collections and discover the perfect additions for your home.
                    </p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleClose();
                      navigate('/catalog');
                    }}
                    className="flex items-center gap-2 group text-[#A68966] font-bold text-xs uppercase tracking-widest pt-4"
                  >
                    Explore Catalog
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Select All Bar */}
                  <div className="flex items-center justify-between pb-6">
                    <button 
                      onClick={allSelected ? deselectAll : selectAll}
                      className="flex items-center gap-3 group px-4 py-2 rounded-full border border-[#F0E6DD] bg-white transition-all hover:border-[#A68966]/30"
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${allSelected ? 'bg-[#4E342E] border-[#4E342E]' : 'border-[#D1C6BD] bg-white'}`}>
                        {allSelected && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#4E342E]">
                        {allSelected ? 'Deselect All Items' : 'Select All Items'}
                      </span>
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="space-y-6">
                    {cart.map((item) => {
                      const step = getProductStep(item.product);
                      const min = getProductMin(item.product);
                      
                      return (
                        <motion.div 
                          key={item.product.id}
                          variants={itemVariants}
                          className={`group relative bg-white rounded-3xl p-5 flex gap-5 shadow-[0_10px_30px_rgba(78,52,46,0.02)] border transition-all duration-500 ${item.selected ? 'border-[#A68966]/30 shadow-[0_15px_40px_rgba(166,137,102,0.08)]' : 'border-transparent'}`}
                        >
                          {/* Selection Toggle */}
                          <button 
                            onClick={() => toggleSelect(item.product.id)}
                            className="absolute top-4 left-4 z-10"
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${item.selected ? 'bg-[#4E342E] border-[#4E342E]' : 'border-[#D1C6BD] bg-white shadow-sm'}`}>
                              {item.selected && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                          </button>

                          {/* Image */}
                          <div className="w-[110px] h-[110px] rounded-2xl overflow-hidden bg-[#FDFBF9] flex-shrink-0 relative border border-[#F5F0EB]">
                            {item.product.image && (
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            )}
                            <div className="absolute inset-0 bg-[#4E342E]/5 group-hover:bg-transparent transition-colors" />
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                              <div className="flex justify-between items-start gap-4">
                                <h3 className="text-[16px] font-serif text-[#4E342E] leading-tight line-clamp-1 group-hover:text-[#A68966] transition-colors uppercase tracking-tight">
                                  {item.product.name}
                                </h3>
                                <button 
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#D1C6BD] hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p className="text-[11px] text-[#A68966] mt-1 line-clamp-1 uppercase tracking-widest font-sans font-bold opacity-80">
                                {item.product.category || 'Premium Collection'}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="font-serif text-xl text-[#4E342E]">
                                <span className="text-[11px] font-sans font-bold tracking-widest text-[#8D6E63] mr-1 opacity-60">INR</span>
                                {item.product.price.toLocaleString('en-IN')}
                              </div>
                              
                              {/* Quantity Controls - Sleeker */}
                              <div className="h-9 p-0.5 flex items-center bg-[#FDFBF9] rounded-full border border-[#F0E6DD] overflow-hidden">
                                <motion.button 
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => {
                                    if (item.quantity <= min) removeFromCart(item.product.id);
                                    else updateQuantity(item.product.id, item.quantity - step);
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-[#8D6E63] hover:text-[#4E342E] rounded-full transition-colors"
                                >
                                  {item.quantity <= min ? <Trash2 size={12} strokeWidth={2.5} /> : <Minus size={12} strokeWidth={2.5} />}
                                </motion.button>
                                <div className="w-10 text-center text-[13px] font-bold text-[#4E342E] font-sans">
                                  {item.quantity}
                                </div>
                                <motion.button 
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.product.id, item.quantity + step)}
                                  className="w-8 h-8 flex items-center justify-center text-[#8D6E63] hover:text-[#4E342E] rounded-full transition-colors"
                                >
                                  <Plus size={12} strokeWidth={2.5} />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer / Checkout - Premium Gradient */}
            {cart.length > 0 && (
              <div className="border-t border-[#F0E6DD] bg-white p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-[#8D6E63]">
                    <span>Item Summary</span>
                    <span>{selectedItems.length} Selected</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-serif text-2xl text-[#4E342E]">Total Est.</span>
                    <div className="text-right">
                      <div className="font-serif text-3xl text-[#4E342E] tracking-tighter">
                        ₹{subtotal.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[10px] text-[#A68966] font-bold font-sans uppercase tracking-widest mt-1">incl. luxury taxes</p>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/checkout"
                  onClick={handleClose}
                  className={`block w-full py-5 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl transition-all duration-500 overflow-hidden relative group text-center ${
                    selectedItems.length === 0 
                      ? 'bg-[#F0E6DD] text-[#D1C6BD] pointer-events-none' 
                      : 'bg-[#4E342E] hover:shadow-[0_20px_40px_rgba(78,52,46,0.25)]'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4E342E] via-[#8D6E63] to-[#4E342E] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-20" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
