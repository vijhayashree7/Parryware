import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Feedback = () => {
  const navigate = useNavigate();
  const { addFeedback } = useProducts();
  const [rating, setRating] = useState('GOOD');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    
    addFeedback({ rating, suggestion });
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
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-[#FDFBF9] rounded-2xl flex items-center justify-center text-[#A68966] mx-auto mb-6 shadow-sm border border-[#F5F0EB]"
          >
            <MessageSquare size={32} strokeWidth={1} />
          </motion.div>
          <h1 className="text-4xl font-serif text-[#4E342E] mb-3">Feedback & Review</h1>
          <p className="text-[#A68966] text-sm font-light max-w-sm mx-auto leading-relaxed">
            Help us improve our premium experience. We value your thoughts, suggestions, and complaints.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#4E342E]/60 mb-4 text-center">
              OVERALL EXPERIENCE
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['GOOD', 'AVERAGE', 'BAD'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRating(type)}
                  className={`py-4 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-500 border ${
                    rating === type 
                      ? 'bg-[#A68966] text-white border-[#A68966] shadow-lg' 
                      : 'bg-white/50 text-[#4E342E]/40 border-transparent hover:border-[#A68966]/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#4E342E]/60 mb-3 ml-1">
              SUGGESTIONS OR COMPLAINTS *
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
            SUBMIT FEEDBACK <Send size={16} />
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
