import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bookmark } from 'lucide-react';

const faucetCategories = [
  {
    id: 'faucet-cardinal',
    title: 'Cardinal Faucet',
    image: '/images/faucets/faucet_cardinal_1774835577142.png',
    description: 'A striking minimalist faucet featuring a high arc and sleek profile. Cardinal offers exceptional reach and precise temperature control.',
    badge: 'Premium'
  },
  {
    id: 'faucet-praseo',
    title: 'Praseo',
    image: '/images/faucets/faucet_praseo_1774835616136.png',
    description: 'Defined by elegant curves and a timeless chrome finish, Praseo adds a touch of classic sophistication to any modern basin.',
    badge: 'Best Seller'
  },
  {
    id: 'faucet-quattro',
    title: 'Quattro',
    image: '/images/faucets/faucet_quattro_1774835852581.png',
    description: 'Distinctive right-angled luxury. The Quattro series boasts an ultra-modern geometric design with absolute water efficiency.',
    badge: 'Trending'
  },
  {
    id: 'faucet-sensor',
    title: 'sensor Faucet',
    image: '/images/faucets/faucet_sensor_1774835921942.png',
    description: 'Touchless, hygienic, and extremely smart. The Sensor Faucet activates instantly upon detecting absolute proximity for supreme convenience.',
    badge: 'Smart Tech'
  },
  {
    id: 'faucet-espirion',
    title: 'Espirion',
    image: '/images/faucets/faucet_espirion_1774835952503.png',
    description: 'Flowing, organic lines inspired by nature. Espirion provides a gentle, aerated water flow mimicking a natural spring.',
    badge: 'Organic'
  },
  {
    id: 'faucet-thermostatic',
    title: 'Thermostatic Diverter',
    image: '/images/faucets/faucet_thermostatic_1774836019478.png',
    description: 'Ensure exact, unwavering temperature control. Automatically mixes water to eliminate scalds and provide consistent luxury.',
    badge: 'Safety'
  },
  {
    id: 'faucet-crust',
    title: 'crust',
    image: '/images/faucets/faucet_quattro_1774835852581.png',
    description: 'Crust – a tall modern kitchen faucet with a curved spout and side lever handle, designed for smooth water flow and a clean minimal look.',
    badge: 'Industrial'
  },
  {
    id: 'faucet-agate-pro',
    title: 'agate pro',
    image: '/images/faucets/faucet_espirion_1774835952503.png',
    description: 'Agate Pro – a premium faucet with a high-arc curved spout and ergonomic side handle, offering a refined design for modern kitchens.',
    badge: 'Pro Grade'
  },
  {
    id: 'faucet-aqua',
    title: 'aqua',
    image: '/images/faucets/faucet_sensor_1774835921942.png',
    description: 'Aqua – a wall-mounted faucet with a sleek flat spout design, ideal for compact spaces with a simple and functional style.',
    badge: 'Waterfall'
  },
  {
    id: 'faucet-uno',
    title: 'uno',
    image: '/images/faucets/faucet_praseo_1774835616136.png',
    description: 'Uno – a compact single-lever faucet with a minimal cylindrical body, perfect for small basins and modern interiors.',
    badge: 'Minimalist'
  }
];

const FaucetsPage = () => {
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
            Faucet Collection
            <div className="absolute -bottom-3 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-1/3 md:w-1/2 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-lg md:text-xl text-[#DFD0C6] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Explore our precision-engineered luxury faucets, beautifully combining cutting-edge water-saving technology with masterclass design.
          </p>
        </div>

        {/* Layout: Center aligned, strict responsive sizing for 4 cards per row on desktop */}
        <div className="flex flex-wrap gap-6 xl:gap-8 justify-center mx-auto max-w-[1400px]">
          {faucetCategories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-[520px] w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)] bg-[#3A2E28]"
            >
              {/* Full Background Image - Height limited to allow solid bottom */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay moving directly into deep brown background */}
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
                  onClick={() => {
                    if (category.id === 'faucet-cardinal') navigate('/faucet/cardinal-collection');
                    else if (category.id === 'faucet-praseo') navigate('/faucet/praseo-collection');
                    else if (category.id === 'faucet-quattro') navigate('/faucet/quattro-collection');
                    else navigate(`/faucet-collection/${category.id}`);
                  }}
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

export default FaucetsPage;
