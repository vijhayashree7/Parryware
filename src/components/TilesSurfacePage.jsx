import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const tileAndSurfaceCategories = [
  {
    id: 'tiles-floor',
    title: 'Floor Tiles',
    image: 'https://content.iconworldoftile.com/content/tiles/glazed-porcelain-tiles-marble-look-tiles-floors-and-walls-elegant-onyx-grande.jpg',
    description: 'Ultra-durable, slip-resistant floor tiles offering incredible resilience to heavy foot traffic without ever compromising on supreme aesthetic beauty.',
    badge: 'Heavy Duty'
  },
  {
    id: 'tiles-wall',
    title: 'Wall Tiles',
    image: 'https://images.openai.com/thumbnails/url/Z-LH03icDclhEoFAGADQEyWMKZkxJpUwIyKhP6Z2t9poW-23Gw7lPm7D-_u-nxKAi4muE4baFweCNcjYoFcISIGiHmpqXZQN55QVs8f0fxM7wJaPwoStPDl850upyiPZmeck6KrYcrCk2zpKGzV_5tcOTuAoLEgEdyNnnWUsHIVs7uJ2fxjNKV0LoE1gvuXK8vp-OPZuqj1FPskuMj5jJdB647IqKLQqzpMF-gHOWkBh',
    description: 'Transform dull vertical spaces into captivating works of art. Highly decorative wall tiles engineered perfectly to resist moisture and stains.',
    badge: 'Decorative'
  },
  {
    id: 'tiles-vitrified',
    title: 'Vitrified Tiles',
    image: 'https://images.openai.com/thumbnails/url/7KV6PHicDclREkJAGADgE2FpMJppGu1gonigUi-G3RWTtmX_tF2q-3Sb-l6_76cDEHJpGIyT6S2AUQ0abulXCTX0RCePuyG7hxA9v67H1f-Wfkq9iBS50l48D6ZdgjJantpMpRmSr0VT-MmexNV0dspnUgDYYRwq7OJKbc3jdnBGfBD-227pBe1JsAncvpQztqrJw505Mj5rA7_Xad2gclSWhRhF5LaJYgbB8AMSJD2g',
    description: 'Non-porous luxury. Exceptionally dense vitrified tiles provide absolute zero water absorption and a stunning, uniform crystal-clear finish.',
    badge: 'Premium Finish'
  },
  {
    id: 'tiles-ceramic',
    title: 'Ceramic Tiles',
    image: 'https://images.openai.com/thumbnails/url/bSdernicDclJDoIwAADAFyFVxCKJMUIQ0LhhKngyCqUWpBtNAF_ld_yNznW-n6fWonVNE7NcDULjwtAPNhmRVt81zUc5b8z2yYWgjCzl4n_ual_Mw_zUBbUILj51IFIZclJkh3hb1ENhr73Ao43aO6DRu6HDUNn94ZwdJK2vvGJWBN7lMAU0no1nxzu-1bInjEAfJfJYlSXyubQgjYztK_T8jMPNDhtxEmBgqbT7Aa3sPmU',
    description: 'A classic staple of high-end home design. Versatile, colorful, incredibly hygienic ceramic tiles perfect for any bespoke modern kitchen or bathroom.',
    badge: 'Classic'
  },
  {
    id: 'tiles-porcelain',
    title: 'Porcelain Tiles',
    image: 'https://images.openai.com/thumbnails/url/vzaUAXicDclJDoIwAADAF5XNhC0xBgFZItVIJMUbtFCILIXWIPzGZ_kbnet8P40QjNuyXA14XpmoCBDloEmUi0K0WMJjL_NmZKwd6GHa_892ILECfBOh7oZzfQ_0BcdbklqAWuoEzGV7eqQDHOSooE7IMVOvcxZC5ZKQvqu9KKXU0E7o-Ch4djZovEG_dPxX9qa62_lAgyhflEAgsFtVNzJ_3kg4Dg',
    description: 'The absolute pinnacle of clay baking technology. Porcelain offers unmatched strength, making it perfectly suitable for both lush indoors and tough outdoors.',
    badge: 'Ultra Strong'
  },
  {
    id: 'tiles-mosaic',
    title: 'Mosaic Tiles',
    image: 'https://images.openai.com/thumbnails/url/qfTozHicDcndCoIwGADQJyphpq4gQiRdYSpWCt3E2pw_2Zz6JauH6n16mzq35_upANS4MoxCsuGloOAzuElzXo5AoWZz1j2MseqUqmW56df_W7kRXwYsJZLudk1eE2Qh3E_IOze6peTMLjjqntxVlWNBzNAyiKx9KP1DVtoAYJ4gcSyusX0tihCbXqdz4WuaCS9KYzU8FjbhMyGOYtRi39B2S4aEI3PqXXjff_t2Pgo',
    description: 'Intricate, mesmerizing small-format tiles designed to create stunning feature walls and breathtaking shower niches with intricate geometric patterns.',
    badge: 'Artistic'
  },
  {
    id: 'surface-marble',
    title: 'Marble Surface',
    image: 'https://images.openai.com/thumbnails/url/eK5NhXicDclRCoIwAADQE6llgSlETEFXgZlaE39CN50KuukGtp2kq3Wber_v--mk5MKzrGbCi-KyIYasp61Jhaxkj03MRkt0jPN-oqf5-D8PxMSN8J3dBjbQXevbTaQhxdfUr4wXEVqFsFSte9BnAGaV1QBAXpSKFAgNLJZBnWfr5h3Q55okeR_MS-oADH2CLo5G414-QnsXrj9K3jck',
    description: 'The golden standard of absolute luxury. Natural, deeply veined marble slabs providing unmatched opulence and a cool, smooth timeless touch.',
    badge: 'True Luxury'
  },
  {
    id: 'surface-granite',
    title: 'Granite Surface',
    image: 'https://images.openai.com/thumbnails/url/8b451nicDclbCoJAFADQFamTwmRChCloRGmUr34G5-EjGTW9UrqSttZu6vye76cC6EdL00TLhrkHwRWgLVLLEXKomco6qY1V1_d1W-6e2_9Z9plvPHYp0R5H3DMfBn3djYR1aHYQjQonH1JdObhyGmkqpf8uzcknwYDXxKOdkekiWxo3E3GIBljhE1-apAhB6lOEiINv8RGTa2D_APZYNek',
    description: 'Nature\'s toughest beautiful stone. Granite delivers immense scratch and heat resistance while boasting deep, rich earthy tones for any high-end countertop.',
    badge: 'Indestructible'
  },
  {
    id: 'surface-quartz',
    title: 'Quartz Surface',
    image: 'https://images.openai.com/thumbnails/url/adNk93icDclXDoIwAADQEwEGHEBiDDgaB2UER_whUJACWgp0qIfyPt5G3-_7fjBjdLA1rSCof1FW5ArLyEgtB5ayCqmofWgDbimtSLno5v-zHZhbAIXLxE9SeW1yacy6xujiGkoZiKJNM-xa8h21ZWBwveJiishIcbg3OU3iy0MA2lv-Gh7A4U73Itw25fnOfb0GAii4W_Wmi81o_ASxudwEYJdweGtICAdvd1R-hJM-ng',
    description: 'Engineered stone perfection. Quartz combines the beauty of natural stone with completely non-porous, maintenance-free futuristic durability.',
    badge: 'Engineered'
  },
  {
    id: 'surface-wooden-finish',
    title: 'Wooden Finish Surface',
    image: 'https://content.iconworldoftile.com/content/tiles/glazed-porcelain-tiles-marble-look-tiles-floors-and-walls-elegant-marquina-grande.jpg',
    description: 'The warming comfort of rich natural hardwood, masterfully crafted into highly durable surface material that completely resists water and warping.',
    badge: 'Warm Aesthetic'
  }
];

const TilesSurfacePage = () => {
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
            Tiles & Surfaces
            <div className="absolute -bottom-3 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-1/3 md:w-1/2 h-1 bg-[#8c7462] rounded-full"></div>
          </h1>
          <p className="text-lg md:text-xl text-[#DFD0C6] max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Discover a world of breathtaking materials. From high-grade vitrified tiles to exotic natural marble slabs, build your masterpiece from the ground up.
          </p>
        </div>

        {/* Layout: Center aligned, strict responsive sizing for 4 cards per row on desktop */}
        <div className="flex flex-wrap gap-6 xl:gap-8 justify-center mx-auto max-w-[1400px]">
          {tileAndSurfaceCategories.map((category) => (
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
                  onClick={() => navigate(`/tiles-surface-collection/${category.id}`)}
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

export default TilesSurfacePage;
