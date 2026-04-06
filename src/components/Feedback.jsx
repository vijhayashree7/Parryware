import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, ChevronLeft, CheckCircle2, User, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const Feedback = () => {
  const navigate = useNavigate();
  const { addFeedback } = useProducts();
  const { user } = useAuth();
  
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [suggestion, setSuggestion] = useState('');
  const [productRef, setProductRef] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    
    await addFeedback({ 
      customerName: customerName || 'Anonymous',
      rating, 
      message: suggestion,
      productReference: productRef,
      date
    });
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setSuggestion('');
      navigate('/');
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-6 flex items-center justify-center relative overflow-hidden bg-transparent">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl w-full bg-white/70 backdrop-blur-3xl p-10 rounded-[40px] shadow-2xl border border-white/40 group relative"
      >
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 flex items-center gap-2 text-[#4E342E]/50 hover:text-[#4E342E] transition-colors uppercase text-[10px] tracking-widest font-bold"
        >
          <ChevronLeft size={16} /> BACK
        </button>

        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#4E342E] mb-6 tracking-wide relative inline-block">
            Feedback & Review
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-[#A68966] text-sm font-light max-w-sm mx-auto leading-relaxed mt-4">
            Your feedback helps us maintain our premium standards. Share your experience with Parryware.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4E342E]/60 ml-1">
                <User size={12} /> YOUR NAME
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Name or Username"
                className="w-full bg-black/5 border border-black/5 rounded-2xl p-4 text-[#4E342E] placeholder-[#4E342E]/30 focus:outline-none focus:ring-1 focus:ring-[#A68966]/30 transition-all font-light"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4E342E]/60 ml-1">
                <Package size={12} /> PRODUCT REF
              </label>
              <input
                type="text"
                value={productRef}
                onChange={(e) => setProductRef(e.target.value)}
                placeholder="e.g. Cardinal Faucet"
                className="w-full bg-black/5 border border-black/5 rounded-2xl p-4 text-[#4E342E] placeholder-[#4E342E]/30 focus:outline-none focus:ring-1 focus:ring-[#A68966]/30 transition-all font-light"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4E342E]/60 ml-1">
                📅 SELECT DATE
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/5 border border-black/5 rounded-2xl p-4 text-[#4E342E] focus:outline-none focus:ring-1 focus:ring-[#A68966]/30 transition-all font-light cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#4E342E]/60 mb-4 text-center">
              RATING
            </label>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-all duration-300 hover:scale-125"
                >
                  <Star 
                    size={32} 
                    fill={star <= rating ? "#A68966" : "transparent"} 
                    stroke={star <= rating ? "#A68966" : "#4E342E"} 
                    strokeWidth={star <= rating ? 0 : 1}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#4E342E]/60 mb-3 ml-1">
              SHARE YOUR EXPERIENCE *
            </label>
            <textarea
              required
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="How can we improve?"
              rows="4"
              className="w-full bg-black/5 border border-black/5 rounded-2xl p-6 text-[#4E342E] placeholder-[#4E342E]/30 focus:outline-none focus:ring-1 focus:ring-[#A68966]/30 transition-all font-light resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#8D6E63] text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#4E342E] transition-all duration-500"
          >
            SUBMIT REVIEW <Send size={16} />
          </motion.button>
        </form>

        <AnimatePresence>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center rounded-[40px] z-50 p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-[#A68966] text-white rounded-full flex items-center justify-center mb-6 shadow-2xl"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 className="text-3xl font-serif text-[#4E342E] mb-2">Thank You!</h3>
              <p className="text-[#A68966] text-sm font-black uppercase tracking-widest leading-loose">
                Your feedback has been received. <br/> Redirecting you home...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Feedback;
