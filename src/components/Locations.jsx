import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, MapPin, Phone, Share2, Map, Navigation, X, Mail, MessageSquare, Copy, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const locations = [
  {
    id: 1,
    city: 'Perambalur',
    name: 'Abirami Agency - Head Office',
    address: 'Opposite to New Bus Stand, Perambalur, Tamil Nadu - 621212',
    lat: 11.2333,
    lng: 78.8667,
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
    lat: 11.1401,
    lng: 79.0747,
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
    lat: 10.7905,
    lng: 78.7047,
    phone: '+91 94432 67890',
    hours: 'Mon - Sat: 10:00 AM - 7:30 PM',
    type: 'Experience Center',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
  }
];

const ShareModal = ({ isOpen, onClose, location }) => {
  const [copied, setCopied] = useState(false);
  if (!location) return null;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}&travelmode=driving`;
  const message = `Check out ${location.name} in ${location.city}. Click here to start navigation: ${directionsUrl}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(`Location Details: ${location.name}`);
    const body = encodeURIComponent(`Hi,\n\nI thought you might be interested in visiting ${location.name}.\n\nLocation: ${location.address}\n\nStart your navigation here:\n${directionsUrl}\n\nBest regards.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(directionsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A68966]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#4E342E] text-xl font-serif text-shadow-none">Share Location</h3>
                <button onClick={onClose} className="text-[#8D6E63] hover:text-[#A68966] transition-colors">
                  <X size={20} />
                </button>
              </div>

              <p className="text-[#8D6E63] text-sm mb-8 font-light leading-relaxed">
                Send instructions and directions for <span className="font-medium text-[#4E342E]">{location.name}</span> to your contacts.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={shareWhatsApp}
                  className="flex items-center gap-4 p-4 bg-[#25D366]/10 text-[#075E54] rounded-2xl hover:bg-[#25D366]/20 transition-all group"
                >
                  <div className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-md">
                    <MessageSquare size={18} fill="currentColor" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">WhatsApp</span>
                </button>

                <button 
                  onClick={shareEmail}
                  className="flex items-center gap-4 p-4 bg-[#8D6E63]/10 text-[#4E342E] rounded-2xl hover:bg-[#8D6E63]/20 transition-all group"
                >
                  <div className="w-10 h-10 bg-[#4E342E] text-white rounded-full flex items-center justify-center shadow-md">
                    <Mail size={18} />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">Email Message</span>
                </button>

                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-4 p-4 bg-[#A68966]/10 text-[#8D6E63] rounded-2xl hover:bg-[#A68966]/20 transition-all group"
                >
                  <div className={`w-10 h-10 ${copied ? 'bg-green-500' : 'bg-[#A68966]'} text-white rounded-full flex items-center justify-center shadow-md transition-colors`}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </div>
                  <span className="font-bold text-xs uppercase tracking-widest">
                    {copied ? 'Link Copied!' : 'Copy direction Link'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Locations = () => {
  const [sharingLocation, setSharingLocation] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDirections = (location) => {
    // Try to get user's current position for live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${encodeURIComponent(location.address)}&travelmode=driving`;
          window.open(url, '_blank');
        },
        () => {
          // Fallback to "My Location" if user denies permission
          const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(location.address)}&travelmode=driving`;
          window.open(url, '_blank');
        }
      );
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(location.address)}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8 px-6 flex flex-col overflow-hidden relative bg-transparent">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#A68966]/10 to-transparent pointer-events-none"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto flex-1 flex flex-col w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-[#A68966] text-xs uppercase tracking-[0.4em] font-medium mb-2">Our Presence</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4E342E] leading-tight mb-4">
            Abirami Parryware <span className="italic font-light">Studio Network</span>
          </h1>
          <div className="w-16 h-px bg-[#A68966] mx-auto opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch mb-8">
          {locations.map((loc) => (
            <motion.div 
              key={loc.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(78,52,46,0.04)] border border-[#F5F0EB] transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative h-[250px] overflow-hidden bg-[#F5F0EB]">
                <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                  <span className="text-[#8D6E63] text-[9px] uppercase tracking-widest font-bold">{loc.type}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-serif mb-0.5">{loc.city}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-light font-sans">
                    <MapPin size={12} className="text-[#A68966]" />
                    <span>Tamil Nadu</span>
                  </div>
                </div>
              </div>

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
                    <span className="text-xs font-medium tracking-wide font-sans">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#4E342E]/80">
                    <div className="w-8 h-8 bg-[#FDFBF9] rounded-full flex items-center justify-center text-[#A68966] border border-[#F5F0EB]">
                      <Clock size={14} />
                    </div>
                    <span className="text-xs font-medium tracking-wide font-sans">{loc.hours}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F5F0EB] gap-3">
                  <motion.button 
                    onClick={() => getDirections(loc)}
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-6 rounded-xl bg-[#4E342E] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#A68966] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Navigation size={14} />
                    Get Directions
                  </motion.button>

                  <motion.button 
                    onClick={() => setSharingLocation(loc)}
                    whileHover={{ scale: 1.1, y: -2 }} 
                    className="w-12 h-12 rounded-xl bg-[#FDFBF9] flex-shrink-0 flex items-center justify-center text-[#8D6E63] hover:bg-[#A68966] hover:text-white transition-all shadow-sm border border-[#F5F0EB]"
                  >
                    <Share2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ShareModal 
          isOpen={!!sharingLocation} 
          onClose={() => setSharingLocation(null)} 
          location={sharingLocation} 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-[#4E342E] rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
            <div className="text-center md:text-left">
              <p className="text-[#D7CCC8] text-[10px] uppercase tracking-[0.3em] mb-2 font-medium">Headquarters</p>
              <h2 className="text-white text-2xl font-serif">
                Interested in partnering with <span className="italic">Abirami Agency?</span>
              </h2>
            </div>
            <Link to="/contact" className="px-8 py-4 bg-[#A68966] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#4E342E] transition-all duration-500 shadow-lg">
              Contact Head Office
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Locations;
