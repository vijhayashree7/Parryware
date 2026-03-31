import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Share2, Globe } from 'lucide-react';

const locations = [
  {
    id: 1,
    city: 'Perambalur',
    name: 'Abirami Agency - Head Office',
    address: 'Opposite to New Bus Stand, Perambalur, Tamil Nadu - 621212',
    phone: '+91 94432 12345',
    hours: 'Mon - Sat: 9:00 AM - 8:30 PM',
    type: 'Main Branch',
    image: 'https://content.jdmagicbox.com/v2/comp/trichy/w5/0431px431.x431.250531045300.g5w5/catalogue/rr-bathware-trichy-bathroom-fitting-dealers-io3cn7w1mi.jpg'
  },
  {
    id: 2,
    city: 'Ariyalur',
    name: 'Abirami Parryware - Ariyalur',
    address: 'Main Road, Near Old Bus Stand, Ariyalur, Tamil Nadu - 621704',
    phone: '+91 98765 43210',
    hours: 'Mon - Sat: 9:30 AM - 8:00 PM',
    type: 'Sales Branch',
    image: 'https://content.jdmagicbox.com/v2/comp/chennai/l1/044pxx44.xx44.180902183544.s9l1/catalogue/lifestyle-galleria-madhavaram-chennai-acid-proof-tile-dealers-7x5yeby1tp.jpg'
  },
  {
    id: 3,
    city: 'Trichy',
    name: 'Abirami Agency - Trichy',
    address: 'Tanjore Road, Kailasapuram, Trichy, Tamil Nadu - 620014',
    phone: '+91 94432 67890',
    hours: 'Mon - Sat: 10:00 AM - 7:30 PM',
    type: 'Experience Center',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
  }
];

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-24 px-6">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-24">
          <h2 className="text-[#A68966] text-sm uppercase tracking-[0.4em] font-medium mb-4">Our Presence</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-[#4E342E] leading-tight mb-8">
            Abirami Parryware <br /> 
            <span className="italic font-light text-shadow-sm">Studio Network</span>
          </h1>
          <p className="text-[#8D6E63] text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the finest collection of luxury bathware and tiles at our strategically located branches across the region.
          </p>
          <div className="w-24 h-px bg-[#A68966] mx-auto opacity-40"></div>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <motion.div 
              key={loc.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(78,52,46,0.05)] border border-[#F5F0EB] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(78,52,46,0.1)]"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={loc.image} 
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                  <span className="text-[#8D6E63] text-[10px] uppercase tracking-widest font-bold">{loc.type}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-serif mb-1 group-hover:translate-x-2 transition-transform duration-500">{loc.city}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-light">
                    <MapPin size={14} className="text-[#A68966]" />
                    <span>Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-10 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[#4E342E] text-xl font-serif leading-tight">{loc.name}</h4>
                  <p className="text-[#8D6E63] font-light leading-relaxed text-base min-h-[3rem]">
                    {loc.address}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#F5F0EB]">
                  <div className="flex items-center gap-4 text-[#4E342E]/80 group/info">
                    <div className="w-10 h-10 bg-[#FDFBF9] rounded-full flex items-center justify-center text-[#A68966] group-hover/info:bg-[#A68966] group-hover/info:text-white transition-all duration-300">
                      <Phone size={18} />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#4E342E]/80 group/info">
                    <div className="w-10 h-10 bg-[#FDFBF9] rounded-full flex items-center justify-center text-[#A68966] group-hover/info:bg-[#A68966] group-hover/info:text-white transition-all duration-300">
                      <Clock size={18} />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{loc.hours}</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-center pt-6 border-t border-[#F5F0EB]">
                  <div className="flex gap-6">
                    <motion.button 
                      whileHover={{ scale: 1.1, y: -2 }} 
                      className="w-12 h-12 rounded-full bg-[#FDFBF9] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all shadow-sm border border-[#F5F0EB]"
                    >
                      <Share2 size={20} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1, y: -2 }} 
                      className="w-12 h-12 rounded-full bg-[#FDFBF9] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all shadow-sm border border-[#F5F0EB]"
                    >
                      <Globe size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Footer Card */}
        <motion.div 
          variants={itemVariants}
          className="mt-20 p-12 bg-[#4E342E] rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-6">Partnership Inquiries</p>
          <h2 className="text-white text-3xl md:text-5xl font-serif mb-10 leading-tight">
            Interested in partnering <br /> with <span className="italic">Abirami Agency?</span>
          </h2>
          <button className="px-10 py-5 bg-[#A68966] text-white text-sm font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-[#4E342E] transition-all duration-500 shadow-xl shadow-black/20">
            Contact Head Office
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Locations;
