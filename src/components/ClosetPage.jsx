import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const closetCategories = [
  {
    id: 'closet-one-piece',
    title: 'One Piece Closet',
    image: 'https://m.media-amazon.com/images/I/518xRqo3seL.jpg',
    description: 'Supreme hygiene featuring a seamless, gapless design integrating the tank and bowl into one beautiful flowing porcelain sculpt.',
    badge: 'Seamless'
  },
  {
    id: 'closet-two-piece',
    title: 'Two Piece Closet',
    image: 'https://m.media-amazon.com/images/I/71Sh8QhCVUL._AC_UF1000%2C1000_QL80_.jpg',
    description: 'The traditional classic. Extremely reliable and robust two-piece construction offering timeless design with highly accessible internal mechanisms.',
    badge: 'Classic'
  },
  {
    id: 'closet-wall-hung',
    title: 'Wall Hung Closet',
    image: 'https://www.inart.co.in/cdn/shop/files/H71947ade45c347589e6112a4949ec9c4j.jpg_960x960_fafae1b0-f744-46af-94ac-ec81b1a677bd.webp?v=1686210221&width=1946',
    description: 'A floating masterpiece that creates the ultimate illusion of space. Makes floor cleaning incredibly effortless while looking stunningly modern.',
    badge: 'Modern'
  },
  {
    id: 'closet-floor-mounted',
    title: 'Floor Mounted Closet',
    image: 'https://www.inart.co.in/cdn/shop/files/untitled_41bc96d5-6936-46c3-acdd-676ccce04e43.png?crop=center&height=2048&v=1728972697&width=2048',
    description: 'A rock-solid foundation anchored securely to the floor. Provides immense stability combined with gorgeous sweeping ceramic curves.',
    badge: 'Sturdy'
  },
  {
    id: 'closet-smart',
    title: 'Smart Toilet',
    image: 'https://m.media-amazon.com/images/I/81a1H58%2B4FL._AC_UF1000%2C1000_QL80_.jpg',
    description: 'The absolute pinnacle of bathroom technology. Auto-opening lids, heated seats, self-cleansing wands, and warm air drying for pure luxury.',
    badge: 'High Tech'
  },
  {
    id: 'closet-western',
    title: 'Western Closet',
    image: 'https://m.media-amazon.com/images/I/61TsgFj3OkL._AC_UF1000%2C1000_QL80_.jpg',
    description: 'Contemporary European standard. Ergonomically designed to perfectly cradle and support posture for extended comfort and absolute premium hygiene.',
    badge: 'Ergonomic'
  },
  {
    id: 'closet-indian',
    title: 'Indian Closet (Squat)',
    image: 'https://s.alicdn.com/%40sc04/kf/H55810af507384205baab34bad0e1c457U/Modern-Design-One-Piece-Straight-Type-Toilet-Dual-Purpose-Odor-Proof-Anti-Slip-Squatting-Pit-for-Bathroom.jpg',
    description: 'Traditional heavy-duty hygienic footprint favoring natural ergonomic posture. Constructed from highly durable ceramic for intense scratch resistance.',
    badge: 'Traditional'
  },
  {
    id: 'closet-rimless',
    title: 'Rimless Closet',
    image: 'https://m.media-amazon.com/images/I/51h9gUgSr5L._AC_UF1000%2C1000_QL80_.jpg',
    description: 'The future of bathroom hygiene. Completely eliminates the hidden rim where bacteria usually hides, offering a flawlessly smooth, ultra-hygienic flush.',
    badge: 'Hygienic'
  },
  {
    id: 'closet-compact',
    title: 'Compact Closet',
    image: 'https://images.openai.com/static-rsc-1/j1D8LwP_Nk60bRd44vzpDsZWpTyaVozxkuRnKZK8orlqXVdE860ILsO5rRMT7HjyOzCAS4fuKsMwzZLVvmWPRkufWUGrWxmHRRyDnnmEVbTMFEr-lXn8j8VmEdl6kXpkDPXiekQz7UYrZYYC5xc8Ug',
    description: 'Intelligently scaled down to maximize extremely tight spaces without ever compromising on flush intensity, seating space, or designer aesthetics.',
    badge: 'Space Saver'
  },
  {
    id: 'closet-concealed',
    title: 'Concealed Cistern Closet',
    image: 'https://m.media-amazon.com/images/I/611CvV50lwL.jpg',
    description: 'Absolute minimalist excellence. The entire water tank is perfectly hidden behind your wall, leaving only a beautiful dual-flush plate and a sleek bowl.',
    badge: 'Minimalist'
  }
];

const ClosetPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#4A3222] relative pt-32 pb-24 px-6 md:px-10 overflow-hidden">
      
      {/* Luxury Ambient Glow Elements for Brown Theme */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#8c7462]/20 to-transparent pointer-events-none"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(170,140,120,0.15)_0%,_transparent_70%)] pointer-events-none blur-3xl"></div>
      <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(170,140,120,0.1)_0%,_transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-14 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-wide relative inline-block">
            Water Closets
            <div className="absolute -bottom-3 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-1/3 md:w-1/2 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-lg md:text-xl text-[#DFD0C6] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Engineered for unparalleled perfection. Discover a range of exquisite master bathroom centerpieces built upon flawless rimless technology and absolute luxury.
          </p>
        </div>

        {/* Layout: Center aligned, strict responsive sizing for 4 cards per row on desktop */}
        <div className="flex flex-wrap gap-6 xl:gap-8 justify-center mx-auto max-w-[1400px]">
          {closetCategories.map((category) => (
            <div 
              key={category.id}
              className="group relative rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-[520px] w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] bg-[#3A2E28]"
            >
              {/* Full Background Image */}
              <img 
                src={category.image} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F241F] via-[#3A2E28]/80 to-transparent/10 z-10"></div>
              
              {/* Top Badges */}
              <div className="absolute top-5 left-5 z-20">
                <span className="bg-[#1C1816]/60 backdrop-blur-md text-[#E1D3C8] text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wide border border-white/5">
                  {category.badge}
                </span>
              </div>
              <div className="absolute top-5 right-5 z-20">
                <button className="bg-[#1C1816]/60 backdrop-blur-md p-2 rounded-full text-[#E1D3C8] hover:bg-white hover:text-[#1C1816] transition-colors border border-white/5">
                  <Bookmark size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Content Section Overlayed at Bottom */}
              <div className="relative z-20 flex flex-col justify-end flex-1 p-6 h-full pb-7">
                <h3 className="text-[22px] md:text-2xl font-bold text-white tracking-tight leading-none mb-3 transform translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  {category.title}
                </h3>
                
                <p className="text-[#D3C7BE] text-[13px] leading-relaxed mb-6 line-clamp-3">
                  {category.description}
                </p>

                <button 
                  onClick={() => navigate(`/closet-collection/${category.id}`)}
                  className="w-full py-4 bg-white hover:bg-gray-100 text-[#2F241F] rounded-full transition-colors duration-300 font-bold tracking-normal text-[15px] shadow-sm transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClosetPage;
