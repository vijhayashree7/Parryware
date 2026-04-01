import { motion } from 'framer-motion';
import { Clock, Globe, MapPin, Phone, Share2 } from 'lucide-react';
import { useEffect } from 'react';

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
    <div 
      className="min-h-screen pt-24 pb-8 px-6 flex flex-col overflow-hidden relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(253, 251, 249, 0.6), rgba(253, 251, 249, 0.8)), url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div 
        className="max-w-7xl mx-auto flex-1 flex flex-col w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section - More Compact */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-[#A68966] text-xs uppercase tracking-[0.4em] font-medium mb-2">Our Presence</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4E342E] leading-tight mb-4">
            Abirami Parryware <span className="italic font-light">Studio Network</span>
          </h1>
          <div className="w-16 h-px bg-[#A68966] mx-auto opacity-40"></div>
        </motion.div>

        {/* Locations Grid - Filling remaining space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch mb-8 overflow-hidden">
          {locations.map((loc) => (
            <motion.div 
              key={loc.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(78,52,46,0.04)] border border-[#F5F0EB] transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Header - Aspect ratio aware */}
              <div className="relative h-[40%] overflow-hidden">
                <img 
                  src={loc.image} 
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                  <span className="text-[#8D6E63] text-[9px] uppercase tracking-widest font-bold">{loc.type}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-serif mb-0.5">{loc.city}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-light">
                    <MapPin size={12} className="text-[#A68966]" />
                    <span>Tamil Nadu</span>
                  </div>
                </div>
              </div>

              {/* Content Body - Compact flex spacing */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="text-[#4E342E] text-lg font-serif leading-tight">{loc.name}</h4>
                  <p className="text-[#8D6E63] font-light leading-relaxed text-sm">
                    {loc.address}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#F5F0EB]">
                  <div className="flex items-center gap-3 text-[#4E342E]/80">
                    <div className="w-8 h-8 bg-[#FDFBF9] rounded-full flex items-center justify-center text-[#A68966] border border-[#F5F0EB]">
                      <Phone size={14} />
                    </div>
                    <span className="text-xs font-medium tracking-wide">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#4E342E]/80">
                    <div className="w-8 h-8 bg-[#FDFBF9] rounded-full flex items-center justify-center text-[#A68966] border border-[#F5F0EB]">
                      <Clock size={14} />
                    </div>
                    <span className="text-xs font-medium tracking-wide">{loc.hours}</span>
                  </div>
                </div>

                {/* Footer Buttons - Compact */}
                <div className="flex items-center justify-center pt-4 border-t border-[#F5F0EB]">
                  <div className="flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.1, y: -2 }} 
                      className="w-10 h-10 rounded-full bg-[#FDFBF9] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all shadow-sm border border-[#F5F0EB]"
                    >
                      <Share2 size={16} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1, y: -2 }} 
                      className="w-10 h-10 rounded-full bg-[#FDFBF9] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all shadow-sm border border-[#F5F0EB]"
                    >
                      <Globe size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Footer Card - Minimal version to keep in viewport */}
        <motion.div 
          variants={itemVariants}
          className="p-6 bg-[#4E342E] rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <h2 className="text-white text-xl font-serif">
              Interested in partnering with <span className="italic">Abirami Agency?</span>
            </h2>
            <button className="px-8 py-3 bg-[#A68966] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#4E342E] transition-all duration-500 shadow-lg">
              Contact Head Office
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Locations;
