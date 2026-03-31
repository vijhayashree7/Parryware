import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Globe, Share2, MessageSquare } from 'lucide-react';

const Contact = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <div className="h-screen bg-[#FDFBF9] pt-24 pb-8 px-6 flex flex-col overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto flex-1 flex flex-col w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section - Compact */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-[#A68966] text-xs uppercase tracking-[0.4em] font-medium mb-2">Get in Touch</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4E342E] leading-tight mb-4">
            Abirami Agency <span className="italic font-light">Parryware</span>
          </h1>
          <div className="w-16 h-px bg-[#A68966] mx-auto opacity-40"></div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-between max-w-5xl mx-auto w-full mb-8 overflow-hidden">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Phone, label: 'Call Us', values: ['+91 94432 12345', '+91 4328 276543'] },
              { icon: Mail, label: 'Email Us', values: ['info@abiramiagency.com', 'sales@abiramiagency.com'] },
              { icon: Clock, label: 'Working Hours', values: ['Mon - Sat: 9am - 8:30pm', 'Sun: 10am - 2pm'] }
            ].map((detail, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-[0_10px_35px_rgba(78,52,46,0.04)] border border-[#F5F0EB] flex flex-col items-center text-center group hover:border-[#A68966]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#FDFBF9] rounded-full flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-500 border border-[#F5F0EB] mb-6 shadow-sm">
                  <detail.icon size={20} />
                </div>
                <p className="text-[#A68966] text-[10px] uppercase tracking-widest mb-4 font-bold">{detail.label}</p>
                <div className="space-y-1">
                  {detail.values.map((val, vIdx) => (
                    <p key={vIdx} className="text-[#4E342E] text-base font-light">{val}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social & Head Office Card - Compact */}
          <motion.div 
            variants={itemVariants}
            className="bg-[#4E342E] p-8 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-left">
                <p className="text-[#D7CCC8] text-[10px] uppercase tracking-[0.3em] mb-2 font-medium">Connect With Us</p>
                <h3 className="text-white text-xl font-serif">Stay updated with our <span className="italic">latest collections.</span></h3>
              </div>
              
              <div className="flex gap-4">
                {[Globe, MessageSquare, Share2].map((Icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#" 
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#A68966] transition-all duration-300 border border-white/10"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>

              <button className="px-8 py-3 bg-[#A68966] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#4E342E] transition-all duration-500 shadow-lg">
                View Catalogues
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
