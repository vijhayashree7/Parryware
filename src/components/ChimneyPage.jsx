import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const chimneyCategories = [
  {
    id: 'chimney-wall-mounted',
    title: 'Wall Mounted Chimney',
    image: 'https://www.decorpot.com/images/blogimage555782063pyramid-chimney-on-the-ceiling-with-led-lighting.jpg',
    description: 'A classic and versatile choice. Mounted flush against the wall to provide powerful, immediate extraction of smoke and odors directly above your premium cooktop.',
    badge: 'Classic'
  },
  {
    id: 'chimney-island',
    title: 'Island Chimney',
    image: 'https://www.asenseinterior.com/assets/uploads/bf3fcd33da39df4dadb9d477c171e6c6.webp',
    description: 'Suspended from the ceiling over your kitchen island. A stunning architectural centerpiece that provides massive extraction power for open-concept culinary spaces.',
    badge: 'Centerpiece'
  },
  {
    id: 'chimney-built-in',
    title: 'Built-in Chimney',
    image: 'https://st.hzcdn.com/simgs/7361f90f08e32afb_14-0969/_.jpg',
    description: 'Concealed perfectly within your cabinetry. Offers an utterly seamless, minimalist kitchen aesthetic while maintaining uncompromising high-velocity suction.',
    badge: 'Seamless'
  },
  {
    id: 'chimney-corner',
    title: 'Corner Chimney',
    image: 'https://cdn.shopify.com/s/files/1/0558/5557/9327/files/128_480x480.jpg?v=1686336898',
    description: 'Intelligently designed to fit into angular spaces. Maximizes your kitchen layout efficiency without sacrificing an ounce of performance or visual elegance.',
    badge: 'Space Saver'
  },
  {
    id: 'chimney-auto-clean',
    title: 'Auto Clean Chimney',
    image: 'https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/blog%202-16813081-cea8-48f7-95ec-c753d6e25efd.webp',
    description: 'Equipped with absolute state-of-the-art thermal technology to automatically melt and collect grease, virtually eliminating manual cleaning and maintenance.',
    badge: 'Low Maintenance'
  },
  {
    id: 'chimney-filterless',
    title: 'Filterless Chimney',
    image: 'https://beyondapp-prodin.sangria.tech/blogs/_next/image?q=75&url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Fbeyondapp%2Fblogimages%2Fhow-to-choose-the-perfect-kitchen-chimney-for-your-home-ce2d0275-606b-4e98-96f3-9086aed67677.webp&w=3840',
    description: 'Zero filters to wash. Advanced aerodynamic motor positioning ensures heavy oil and smoke are expelled cleanly, ensuring a lifetime of zero clogging.',
    badge: 'Advanced'
  },
  {
    id: 'chimney-ducted',
    title: 'Ducted Chimney',
    image: 'https://m.media-amazon.com/images/I/61Pi0S6BwIS._AC_UF350%2C350_QL80_.jpg',
    description: 'The absolute professional standard. Expels all smoke, moisture, and heat completely out of your home through heavy-duty ductwork for the freshest air.',
    badge: 'Pro Grade'
  },
  {
    id: 'chimney-ductless',
    title: 'Ductless Chimney',
    image: 'https://beyondappliances.in/cdn/shop/articles/5-af9b0079-fb0f-4609-bc29-d31d6fff089c.webp?v=1774430400&width=1200',
    description: 'Complete freedom of installation. Utilizes supreme carbon filtration to purify and recirculate flawless, clean air back into your living space.',
    badge: 'Flexible'
  },
  {
    id: 'chimney-smart',
    title: 'Smart Chimney',
    image: 'https://img.tatacliq.com/images/i25//1348Wx2000H/MP000000027240295_1348Wx2000H_202507041726311.jpeg',
    description: 'Voice-controlled, gesture-enabled luxury. Features intelligent auto-suction that adjusts powerfully to the exact volume of smoke detecting in real-time.',
    badge: 'Smart Tech'
  },
  {
    id: 'chimney-slim',
    title: 'Slim/Compact Chimney',
    image: 'https://images.woodenstreet.de/image/data/modular%20kitchen/RadianceU.jpg',
    description: 'Incredibly thin and sleek. Engineered to bring uncompromising extraction power to modern apartments and compact high-end studio kitchens.',
    badge: 'Ultra Slim'
  }
];

const ChimneyPage = () => {
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
            Designer Chimneys
            <div className="absolute -bottom-3 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-1/3 md:w-1/2 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-lg md:text-xl text-[#DFD0C6] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Engineered for absolute extraction power, our luxury chimneys ensure an eternally pristine, smoke-free kitchen atmosphere.
          </p>
        </div>

        {/* Layout: Center aligned, strict responsive sizing for 4 cards per row on desktop */}
        <div className="flex flex-wrap gap-6 xl:gap-8 justify-center mx-auto max-w-[1400px]">
          {chimneyCategories.map((category) => (
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
                  onClick={() => navigate(`/chimney-collection/${category.id}`)}
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

export default ChimneyPage;
