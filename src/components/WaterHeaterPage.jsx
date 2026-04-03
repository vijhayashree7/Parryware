import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bookmark } from 'lucide-react';

const waterHeaterCategories = [
  {
    id: 'heater-storage',
    title: 'Storage Tank Heater',
    image: 'https://m.media-amazon.com/images/I/31X4m1a4sxL._AC_SR290%2C290_.jpg',
    description: 'Traditional and extremely reliable. A heavy-duty insulated storage tank that keeps a vast reserve of hot water ready for immediate luxury use.',
    badge: 'Classic'
  },
  {
    id: 'heater-tankless',
    title: 'Tankless Heater',
    image: 'https://m.media-amazon.com/images/I/51oYAh5Te8L._AC_UF1000%2C1000_QL80_.jpg',
    description: 'Instant, limitless hot water on demand. The tankless design saves massive amounts of space while providing incredible energy efficiency.',
    badge: 'Efficient'
  },
  {
    id: 'heater-heat-pump',
    title: 'Heat Pump Heater',
    image: 'https://m.media-amazon.com/images/I/51z-LKwnMpL.jpg',
    description: 'Highly advanced technology that moves heat from the air to the water. Incredibly eco-friendly, offering massive savings on heating bills.',
    badge: 'Eco-Friendly'
  },
  {
    id: 'heater-solar',
    title: 'Solar Heater',
    image: 'https://irp.cdn-website.com/7f3e26cd/dms3rep/multi/Solar.jpg',
    description: 'Harness the power of the sun. Integrated solar panels provide a completely renewable, zero-emission way to heat your massive bathroom reserves.',
    badge: 'Renewable'
  },
  {
    id: 'heater-condensing',
    title: 'Condensing Boiler',
    image: 'https://img.edilportale.com/product-thumbs/h_Fondital_ITACA-CH-KR_3KzeWN5JD5.jpeg',
    description: 'Capture exhausting exhaust gases to pre-heat cold water entering the boiler, achieving unmatched energy transfer efficiency for large homes.',
    badge: 'Pro Grade'
  },
  {
    id: 'heater-electric-pump',
    title: 'Electric Heat Pump',
    image: 'https://www.schusterboilers.com/upload/blocchi/X1635foto3-1X_bwaf-100-115-ap-min_fondo-grigio.jpg',
    description: 'Combines standard electric heating with high-tech pump mechanics for ultra-fast recovery times and consistent reliable heating.',
    badge: 'Hybrid'
  },
  {
    id: 'heater-gas',
    title: 'Gas Water Heater',
    image: 'https://www.jaquar.com/images/thumbs/0051911_The%20Ultimate%20Guide%20to%20Selecting%20Water%20Heaters%20for%20Indian%20Homes.jpeg',
    description: 'Powered by natural gas, offering extremely fast heating and reliable operation even during electrical power outages.',
    badge: 'Reliable'
  },
  {
    id: 'heater-point-of-use',
    title: 'Point-of-Use Heater',
    image: 'https://m.media-amazon.com/images/I/41TDmGKwzAL._AC_UF1000%2C1000_QL80_.jpg',
    description: 'Compact, rapid heating units installed directly at the fixture. Eliminates long waits for hot water and saves incredible amounts of water.',
    badge: 'Compact'
  },
  {
    id: 'heater-smart',
    title: 'Smart Water Heater',
    image: 'https://image.made-in-china.com/202f0j00TYUokRJWJqrv/High-Technology-Energy-Saving-3500W-Indoor-Small-Size-Digital-Display-Electric-Tankless-Water-Heater.jpg',
    description: 'Wi-Fi enabled luxury. Monitor energy usage, adjust temperatures remotely, and set schedules perfectly tailored to your lifestyle routines.',
    badge: 'Smart Tech'
  },
  {
    id: 'heater-hydrolic-boiler',
    title: 'Water Heater with Hydrolic Boiler',
    image: 'https://cdn2.hubspot.net/hubfs/2004318/indirectwaterheater.jpg',
    description: 'The absolute pinnacle of heavy-duty hybrid engineering. A hydraulic boiler system integrated for massive estates and continuous extreme capacity.',
    badge: 'Heavy Duty'
  }
];

const WaterHeaterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent relative pt-32 pb-24 px-6 md:px-10 overflow-hidden">
      
      {/* Luxury Ambient Glow Elements for Brown Theme */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#8c7462]/20 to-transparent pointer-events-none"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(170,140,120,0.15)_0%,_transparent_70%)] pointer-events-none blur-3xl"></div>
      <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(170,140,120,0.1)_0%,_transparent_70%)] pointer-events-none blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-14 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4E342E] mb-6 tracking-wide relative inline-block">
            Water Heater Collection
            <div className="absolute -bottom-3 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-1/3 md:w-1/2 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-lg md:text-xl text-[#8C7462] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Advanced heating technology for consistent comfort and efficiency. Explore our range of energy-efficient water heaters.
          </p>
        </div>

        {/* Layout: Center aligned, strict responsive sizing for 4 cards per row on desktop */}
        <div className="flex flex-wrap gap-6 xl:gap-8 justify-center mx-auto max-w-[1400px]">
          {waterHeaterCategories.map((category) => (
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
                  onClick={() => navigate(`/water-heater-collection/${category.id}`)}
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

export default WaterHeaterPage;
