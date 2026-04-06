import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MessageSquare, ArrowRight, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ReviewsSection = () => {
  const navigate = useNavigate();
  const { feedbacks, fetchFeedbacks } = useProducts();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const averageRating = feedbacks.length 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1) 
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <section className="py-12 px-6 bg-transparent relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A68966]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8D6E63]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A68966] mb-4 block">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-[#4E342E] leading-tight mb-6">
              What Our <br/> Customers Say
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-serif text-[#4E342E]">{averageRating}</span>
                  <div className="flex text-[#A68966]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.round(averageRating) ? "currentColor" : "none"} strokeWidth={1.5} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4E342E]/40">
                  Avg. Rating based on {feedbacks.length} reviews
                </span>
              </div>
              <div className="h-10 w-[1px] bg-[#4E342E]/10" />
              <button 
                onClick={() => navigate('/feedback')}
                className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#4E342E] hover:text-[#A68966] transition-colors"
              >
                Write a Review <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scrollable Reviews Container */}
        <motion.div 
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-12 gap-8 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {feedbacks.length === 0 ? (
            <div className="w-full text-center py-20 text-[#4E342E]/30 uppercase tracking-[0.3em] font-black italic">
              No reviews available yet.
            </div>
          ) : (
            feedbacks.map((review) => (
              <motion.div 
                key={review.id}
                variants={cardVariants}
                className="min-w-[320px] md:min-w-[400px] bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] border border-white/40 hover:shadow-2xl hover:shadow-[#A68966]/10 transition-all duration-500 snap-center group relative"
              >
                <div className="absolute top-8 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={60} fill="#4E342E" stroke="none" />
                </div>
                
                <div className="flex text-[#A68966] mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>

                <p className="text-[#4E342E] text-lg font-light leading-relaxed mb-8 min-h-[100px]">
                  "{review.message}"
                </p>

                <div className="mt-auto pt-8 border-t border-[#4E342E]/5 flex justify-between items-end">
                  <div>
                    <h4 className="text-[13px] font-black text-[#4E342E] uppercase tracking-widest mb-1.5">
                      {review.customerName}
                    </h4>
                    <p className="text-[10px] text-[#A68966] font-bold uppercase tracking-widest">
                      {review.productReference || 'Verified Customer'}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#4E342E]/30 font-black uppercase tracking-widest">
                    {review.date}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* CSS for hiding scrollbar */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ` }} />
      </div>
    </section>
  );
};

export default ReviewsSection;
