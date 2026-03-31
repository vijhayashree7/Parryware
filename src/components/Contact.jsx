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
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-20 px-6">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="text-[#A68966] text-sm uppercase tracking-[0.4em] font-medium mb-4">Get in Touch</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-[#4E342E] leading-tight mb-6">
            Abirami Agency <br /> 
            <span className="italic font-light">Parryware</span>
          </h1>
          <div className="w-24 h-px bg-[#A68966] mx-auto opacity-50"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          
          {/* Contact Details Column */}
          <motion.div variants={itemVariants} className="bg-white p-10 md:p-20 rounded-3xl shadow-[0_20px_50px_rgba(78,52,46,0.03)] border border-[#F5F0EB]">
            <div>
              <h3 className="text-3xl font-serif text-[#4E342E] mb-16 text-center">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="flex flex-col items-center text-center gap-6 group">
                  <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[#A68966] text-xs uppercase tracking-widest mb-3 font-bold">Call Us</p>
                    <p className="text-[#4E342E] text-lg font-light hover:text-[#8D6E63] transition-colors">+91 94432 12345</p>
                    <p className="text-[#4E342E] text-lg font-light hover:text-[#8D6E63] transition-colors">+91 4328 276543</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center gap-6 group">
                  <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[#A68966] text-xs uppercase tracking-widest mb-3 font-bold">Email Us</p>
                    <p className="text-[#4E342E] text-lg font-light hover:text-[#8D6E63] transition-colors">info@abiramiagency.com</p>
                    <p className="text-[#4E342E] text-lg font-light hover:text-[#8D6E63] transition-colors">sales@abiramiagency.com</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center gap-6 group">
                  <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[#A68966] text-xs uppercase tracking-widest mb-3 font-bold">Working Hours</p>
                    <p className="text-[#4E342E] text-lg font-light">Mon - Sat: 9am - 8:30pm</p>
                    <p className="text-[#4E342E] text-lg font-light">Sun: 10am - 2pm</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Links */}
            <div className="mt-20 pt-12 border-t border-[#F5F0EB] flex flex-col items-center">
              <p className="text-[#A68966] text-xs uppercase tracking-[0.2em] mb-8 font-bold">Follow Our Collection</p>
              <div className="flex gap-6">
                {[Globe, MessageSquare, Share2].map((Icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#" 
                    className="w-14 h-14 border border-[#D7CCC8] rounded-full flex items-center justify-center text-[#8D6E63] hover:bg-[#4E342E] hover:text-white hover:border-[#4E342E] transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
