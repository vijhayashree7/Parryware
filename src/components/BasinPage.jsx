import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bookmark } from 'lucide-react';

const basinCategories = [
  {
    id: 'bowl-basin',
    title: 'Bowl Basin',
    image: 'https://m.media-amazon.com/images/I/61eQom2r3-L.jpg',
    description: 'Elegant round countertop basin designed to be the focal point of modern bathroom interiors. Perfectly smooth glaze for easy cleaning.',
    badge: 'Top Pick'
  },
  {
    id: 'wall-hung-full-pedestal',
    title: 'Wall Hung with Full Pedestal',
    image: 'https://m.media-amazon.com/images/I/51HrBTXHVUL._AC_UF1000%2C1000_QL80_.jpg',
    description: 'Classic wall-mounted basin featuring a full-length ceramic pedestal that completely conceals all plumbing for a pristine look.',
    badge: 'Best Seller'
  },
  {
    id: 'wall-hung-half-pedestal',
    title: 'Wall Hung with Half Pedestal',
    image: 'https://www.inart.co.in/cdn/shop/files/71d7mjwW2DL.jpg?v=1773323997',
    description: 'A contemporary floating appearance that features a short pedestal, keeping the floor clear for easy maintenance.',
    badge: 'Trending'
  },
  {
    id: 'wall-hung-no-pedestal',
    title: 'Wall Hung without Pedestal',
    image: 'https://m.media-amazon.com/images/I/81BzdAIvi-L._AC_UF1000%2C1000_QL80_.jpg',
    description: 'Minimalist sink fixed directly to the wall. Maximizes floor space while offering a sleek, industrial-chic exposed pipe aesthetic.',
    badge: 'Minimalist'
  },
  {
    id: 'integrated-basin',
    title: 'Integrated Basin',
    image: 'https://s.alicdn.com/%40sc04/kf/H5fa6dd5e2cc145a38f6e038f0211d1e2K/Modern-Double-Floating-Marble-Solid-Surface-Sink-Hotel-Bathroom-Rectangular-Integrated-Washbasin.jpg_300x300.jpg',
    description: 'Seamless single-piece setup where the basin flows directly into the countertop. Offers zero joints for unmatched modern hygiene.',
    badge: 'Premium'
  },
  {
    id: 'countertop-basin',
    title: 'Countertop Basin',
    image: 'https://m.media-amazon.com/images/I/61A4-NDW%2BUL.jpg',
    description: 'Sophisticated rectangular vessel sink that rests completely on your bathroom vanity, commanding absolute attention.',
    badge: 'Top Pick'
  },
  {
    id: 'below-counter-basin',
    title: 'Below Counter Basin',
    image: 'https://www.aquantindia.com/product_images/6469/1637-3.jpg',
    description: 'Discreet undermount installation providing a flush, uninterrupted countertop surface for extremely easy wipedowns.',
    badge: 'Best Rated'
  },
  {
    id: 'pedestals',
    title: 'Pedestals',
    image: 'https://images.openai.com/thumbnails/url/zHU_xXicDcnbDoIgAADQL0qLREdba6VWy6Lb0OqlKTIvIWKSTT6q_-lv6rye7ydXSrYT02SCPnupWDpQiRgbWatiVVCD1pXZ5rWUhchmzfR_kzlO0YqeijBveJxiDUEfeTB7ORa6jDXcuYuw1OdF7FkauTDyazwqr9ZaSl9TYndDymJYQbI8Ho6Du8Av58YCDgDf7LcBa7hrv-c8E-TMgqQ7OJWPQ4BIwsgj7N0f6u09Jg',
    description: 'Robust and beautiful standalone ceramic pillars. Designed to provide structural support while enhancing traditional aesthetics.',
    badge: 'Classic'
  },
  {
    id: 'lab-sink',
    title: 'Lab Sink',
    image: 'https://image.made-in-china.com/202f0j00LrVqlzjPnJoh/Modern-School-Lab-Furniture-Design-Laboratory-Chemistry-Biology-Equipment-Center-Lab-Table-with-Sink-Central-Work-Benches-Faucet.webp',
    description: 'Extra deep, utilitarian sink forged from fireclay. Built for extreme resistance and heavy-duty utility washing needs.',
    badge: 'Utility'
  },
  {
    id: 'freestanding-basin',
    title: 'Freestanding Basin',
    image: 'https://m.media-amazon.com/images/I/71nHSL%2BgZZL._AC_UF1000%2C1000_QL80_.jpg',
    description: 'A monolithic, fully independent floor-standing masterpiece. Crafted to bring extreme luxury and an architectural statement.',
    badge: 'Exclusive'
  }
];

const BasinPage = () => {
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
            Basin Collection
            <div className="absolute -bottom-3 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-1/3 md:w-1/2 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-lg md:text-xl text-[#DFD0C6] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Discover our premium range of wash basins, designed to bring absolute elegance, durability, and a touch of grand luxury to your spaces.
          </p>
        </div>

        {/* Layout: Center aligned, strict responsive sizing for 4 cards per row on desktop */}
        <div className="flex flex-wrap gap-6 xl:gap-8 justify-center mx-auto max-w-[1400px]">
          {basinCategories.map((category) => (
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

              {/* Content Section Overlayed at Bottom - perfectly styled to reference */}
              <div className="relative z-20 flex flex-col justify-end flex-1 p-6 h-full pb-7">
                <h3 className="text-[22px] md:text-2xl font-bold text-white tracking-tight leading-none mb-3 transform translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                  {category.title}
                </h3>
                
                <p className="text-[#D3C7BE] text-[13px] leading-relaxed mb-6 line-clamp-3">
                  {category.description}
                </p>

                <button 
                  onClick={() => navigate(`/basin-collection/${category.id}`)}
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

export default BasinPage;
