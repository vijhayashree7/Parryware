import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Camera, ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import waterHeaterCover from '../assets/catalog/water_heater_cover.png';
import closetCover from '../assets/catalog/closet_cover.jpg';
import basinCover from '../assets/catalog/basin_cover.png';
import faucetsCover from '../assets/catalog/faucets_cover.png';
import chimneyCover from '../assets/catalog/chimney_cover.png';
import tilesCover from '../assets/catalog/tiles_cover.jpg';
import faucetsP1 from '../assets/catalog/faucets_p1.png';
import faucetsP2 from '../assets/catalog/faucets_p2.png';
import faucetsP3 from '../assets/catalog/faucets_p3.png';
import faucetsP4 from '../assets/catalog/faucets_p4.png';
import faucetsP5 from '../assets/catalog/faucets_p5.png';
import faucetsP6 from '../assets/catalog/faucets_p6.png';
import faucetsP7 from '../assets/catalog/faucets_p7.png';
import faucetsP8 from '../assets/catalog/faucets_p8.png';
import closetP1 from '../assets/catalog/closet_p1.png';
import closetP2 from '../assets/catalog/closet_p2.png';
import closetP3 from '../assets/catalog/closet_p3.png';
import closetP4 from '../assets/catalog/closet_p4.png';
import closetP5 from '../assets/catalog/closet_p5.png';
import basinP1 from '../assets/catalog/basin_p1.png';
import basinP2 from '../assets/catalog/basin_p2.png';
import basinP3 from '../assets/catalog/basin_p3.png';
import basinP4 from '../assets/catalog/basin_p4.png';
import basinP5 from '../assets/catalog/basin_p5.png';
import waterHeaterP1 from '../assets/catalog/water_heater_p1.png';
import chimneyP1 from '../assets/catalog/chimney_p1.png';
import chimneyP2 from '../assets/catalog/chimney_p2.png';
import chimneyP3 from '../assets/catalog/chimney_p3.png';
import chimneyP4 from '../assets/catalog/chimney_p4.png';
import chimneyP5 from '../assets/catalog/chimney_p5.png';

const catalogues = [
  {
    id: 1,
    title: 'Water Heater',
    category: 'Appliances',
    image: waterHeaterCover,
    description: 'Advanced heating technology for consistent comfort and efficiency.',
    downloadUrl: 'https://hindwarestg.blob.core.windows.net/container1/catalog/Bathware%20Collection%202025-26-New.pdf',
    pages: [
      waterHeaterCover,
      waterHeaterP1,
      'https://img.freepik.com/free-vector/electronic-water-heater-hanging-wall_1441-4122.jpg',
      'https://static.vecteezy.com/system/resources/thumbnails/056/142/897/small/pipes-water-heater-isolated-photo.jpg',
      'https://static.vecteezy.com/system/resources/thumbnails/065/875/371/small/man-repairing-water-heater-with-screwdriver-in-clean-interior-free-photo.jpeg',
      'https://static.vecteezy.com/system/resources/thumbnails/056/024/234/small/tank-water-heating-photo.jpg',
    ],
  },
  {
    id: 2,
    title: 'Closet',
    category: 'Sanitaryware',
    image: closetCover,
    description: 'Premium closets with superior flushing systems and ergonomic designs.',
    downloadUrl: 'https://hindwarestg.blob.core.windows.net/container1/catalog/Bathware%20Collection%202025-26-New.pdf',
    pages: [
      closetP1,
      closetP2,
      closetP3,
      closetP4,
      closetP5,
    ],
  },
  {
    id: 3,
    title: 'Basin',
    category: 'Sanitaryware',
    image: basinCover,
    description: 'Artistic basins that redefine elegance in your bathroom space.',
    downloadUrl: 'https://hindwarestg.blob.core.windows.net/container1/catalog/Bathware%20Collection%202025-26-New.pdf',
    pages: [
      basinCover,
      basinP1,
      basinP2,
      basinP3,
      basinP4,
      basinP5,
    ],
  },
  {
    id: 4,
    title: 'Faucets',
    category: 'Fittings',
    image: faucetsCover,
    description: 'Precision-engineered faucets with striking finishes and water-saving tech.',
    downloadUrl: 'https://hindwarestg.blob.core.windows.net/container1/catalog/Bathware%20Collection%202025-26-New.pdf',
    pages: [
      faucetsP1,
      'https://t3.ftcdn.net/jpg/03/88/93/22/360_F_388932211_RuO271Qr1diwiSptd2Ncnd7TC3N3O5cg.jpg',
      'https://assets.architecturaldigest.in/photos/68b967798ccafba316b6d809/16:9/w_2560%2Cc_limit/Collection%2520JAIPUR_volevatch%25203%2520(1).jpg',
      'https://www.kohler.co.in/content/dam/kohler-com-INDIA/Authored%20Content/Thumbnail-Images/Thumbnail-Images-aah25592.jpg',
      'https://media.istockphoto.com/id/1808052822/photo/woman-filling-glass-with-tap-water-from-faucet-in-kitchen-closeup.jpg?s=612x612&w=0&k=20&c=3PEwKufN2EbMpa7F0QCvP5_DOt289V5ye5l8cn6hl7s=',
      'https://static.vecteezy.com/system/resources/thumbnails/070/854/149/small/modern-single-handle-chrome-kitchen-faucet-and-stainless-steel-sink-with-blurred-fruit-bowl-background-in-a-bright-home-interior-setting-photo.jpg',
      'https://thumbs.dreamstime.com/b/wall-mounted-brass-bathroom-faucet-above-modern-white-washbasin-wall-mounted-brass-bathroom-faucet-above-modern-white-washbasin-431050275.jpg',
    ],
  },
  {
    id: 5,
    title: 'Chimney',
    category: 'Kitchen',
    image: chimneyCover,
    description: 'Powerful suction and silent operation for a smoke-free kitchen.',
    downloadUrl: 'https://hindwarestg.blob.core.windows.net/container1/catalog/Bathware%20Collection%202025-26-New.pdf',
    pages: [
      chimneyCover,
      'https://assets.architecturaldigest.in/photos/66e9684095e7a9c69670d605/1:1/w_1080,h_1080,c_limit/Untitled%20design%20(37).png',
      'https://www.shutterstock.com/image-photo/chimney-placed-kitchen-above-cooktop-600nw-2621477301.jpg',
      'https://static.vecteezy.com/system/resources/thumbnails/026/545/568/small/cooker-hood-in-the-kitchen-table-foodgraphy-ai-generated-photo.jpg',
      'https://img.freepik.com/free-photo/modern-kitchen-with-with-copy-space_43614-903.jpg',
      'https://images.pexels.com/photos/8146317/pexels-photo-8146317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    ],
  },
  {
    id: 6,
    title: 'Tiles and Surface',
    category: 'Surfaces',
    image: tilesCover,
    description: 'Exquisite tiles and surfaces that add character to your floors and walls.',
    downloadUrl: 'https://hindwarestg.blob.core.windows.net/container1/catalog/Bathware%20Collection%202025-26-New.pdf',
    pages: [
      tilesCover,
      'https://server.orientbell.com/media/black-tiles.jpg',
      'https://cdn.magicdecor.in/com/2023/02/29202844/image-1686137388-788-710x488.jpg',
      'https://static.vecteezy.com/system/resources/thumbnails/033/292/560/small/marble-granite-white-with-gold-texture-background-wall-surface-black-pattern-graphic-abstract-light-elegant-gray-floor-ceramic-counter-texture-stone-slab-smooth-tile-silver-natural-ai-generative-photo.jpeg',
      'https://cdn.magicdecor.in/com/2023/11/06181615/Tile-Tango-Triumph-Portugese-Wallpaper-710x488.jpg',
      'https://www.shutterstock.com/shutterstock/videos/3821882205/thumb/1.jpg?ip=x480',
    ],
  },
];

/* ─────────────────────────────────────────────
   SIMPLE CATALOG VIEWER (Fallback)
───────────────────────────────────────────── */
const FlipBookViewer = ({ catalog, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = catalog.pages.length;

  const goNext = () => { if (currentPage < totalPages - 1) setCurrentPage(c => c + 1); };
  const goPrev = () => { if (currentPage > 0) setCurrentPage(c => c - 1); };

  const handleDownload = () => {
    if (catalog.downloadUrl) window.open(catalog.downloadUrl, '_blank');
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 backdrop-blur-sm bg-black/20">
        <div className="flex items-center gap-3">
          <BookOpen size={20} className="text-[#D7CCC8]" />
          <div>
            <p className="text-white font-bold tracking-wide text-sm uppercase">{catalog.title}</p>
            <p className="text-[#A68966] text-[10px] tracking-widest uppercase">{catalog.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8D6E63] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#6D4C41] transition-colors shadow-lg"
          >
            <Download size={15} />
            Download PDF
          </motion.button>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>

      {/* ── Book Stage ── */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black/30 p-6 md:p-12">
        {/* Prev Arrow */}
        <motion.button
          onClick={goPrev}
          whileHover={{ scale: 1.15, x: -4 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute left-4 lg:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm border border-white/10 ${currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Image Container */}
        <div className="relative w-full h-full flex justify-center items-center rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={catalog.pages[currentPage]} 
            alt={`Page ${currentPage + 1}`} 
            className="max-w-full max-h-full object-contain pointer-events-none select-none" 
          />
        </div>

        {/* Next Arrow */}
        <motion.button
          onClick={goNext}
          whileHover={{ scale: 1.15, x: 4 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute right-4 lg:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-sm border border-white/10 ${currentPage >= totalPages - 1 ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="px-6 py-4 border-t border-white/10 flex-shrink-0 bg-black/20 backdrop-blur-sm flex items-center justify-center gap-6">
        <p className="text-[#A68966] text-xs font-bold tracking-widest uppercase">
          {totalPages > 0
            ? currentPage === 0 ? 'Cover' : `Page ${currentPage} / ${totalPages - 1}`
            : '—'}
        </p>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   WHATSAPP / INSTAGRAM / MAIL ICONS
───────────────────────────────────────────── */
const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12.393 2.003C6.71 2.003 2.091 6.621 2.091 12.305c0 1.815.474 3.591 1.376 5.156L2 22l4.697-1.233c1.517.828 3.228 1.264 4.975 1.265h.005c5.681 0 10.301-4.619 10.301-10.302 0-2.755-1.071-5.344-3.02-7.291s-4.537-3.036-7.565-3.036zm0 18.87h-.004c-1.575 0-3.121-.422-4.472-1.221l-.321-.19-3.324.872.887-3.24-.208-.332A8.518 8.518 0 013.73 12.3c0-4.699 3.824-8.522 8.527-8.522 2.277 0 4.417.888 6.026 2.499a8.49 8.49 0 012.494 6.027c-.002 4.699-3.827 8.569-8.384 8.569z" />
    <path d="M16.604 14.49c-.253-.126-1.498-.739-1.73-.823-.232-.085-.4-.127-.569.126-.168.253-.652.823-.8.992-.147.168-.295.19-.547.063-.253-.126-1.068-.393-2.034-1.255-.752-.671-1.259-1.499-1.406-1.752-.147-.253-.016-.39.11-.516.114-.114.254-.295.38-.443.126-.148.168-.253.253-.421.084-.169.042-.316-.022-.443-.063-.126-.568-1.37-.779-1.877-.205-.491-.414-.425-.569-.432-.148-.007-.316-.009-.485-.009-.168 0-.442.063-.674.316-.232.253-.885.864-.885 2.108s.906 2.445 1.032 2.614c.126.168 1.784 2.722 4.322 3.818.604.261 1.075.416 1.443.533.606.193 1.158.166 1.594.101.486-.072 1.498-.612 1.709-1.203.211-.59.211-1.096.148-1.203-.064-.105-.232-.168-.485-.294z" />
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const MailLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.139h-18.892l5.626-8.134zm11.201-3.442l4.623-3.746v9.458l-4.623-5.712z" />
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN CATALOG COMPONENT
───────────────────────────────────────────── */
const Catalog = () => {
  const [activeCatalog, setActiveCatalog] = useState(null);

  const handleShare = (platform, catalog) => {
    const text = `Check out the ${catalog.title} from Parryware!`;
    const url = window.location.href;
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(catalog.title)}&body=${encodeURIComponent(text + '\n' + url)}`;
        break;
      case 'instagram':
        alert('Link copied to clipboard! Share it on your Instagram story.');
        navigator.clipboard.writeText(`${text} ${url}`);
        break;
      default:
        if (navigator.share) navigator.share({ title: catalog.title, text, url });
    }
  };

  return (
    <>
      <section 
        id="catalog" 
        className="py-24 overflow-hidden relative bg-transparent"
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#4E342E] mb-4 tracking-tighter uppercase">Product Catalogues</h2>
            <div className="w-20 h-1.5 bg-[#A68966] rounded-full mb-6" />
            <p className="text-lg text-[#8D6E63] max-w-2xl font-light">
              Experience our high-fidelity digital lookbooks. Click any catalogue to flip through our collections.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {catalogues.map((catalog) => (
              <motion.div
                key={catalog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catalog.id * 0.08 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#D7CCC8]/30 flex flex-col h-full"
              >
                {/* Image area */}
                <div
                  onClick={() => setActiveCatalog(catalog)}
                  className="h-80 relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={catalog.image}
                    alt={catalog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4E342E]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block text-[#D7CCC8]">{catalog.category}</span>
                    <h3 className="text-2xl font-bold leading-tight tracking-tight uppercase">{catalog.title}</h3>
                  </div>
                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#4E342E]/30 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full text-white font-semibold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
                      <Camera size={20} className="text-[#D7CCC8]" /> Open Lookbook
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <p className="text-[#8D6E63] text-sm mb-8 line-clamp-3 font-light leading-relaxed">{catalog.description}</p>
                  <div className="mt-auto space-y-4">
                    {/* Download PDF */}
                    <button
                      onClick={() => window.open(catalog.downloadUrl, '_blank')}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[#8D6E63] text-white rounded-xl font-bold hover:bg-[#4E342E] transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      <Download size={18} />
                      Download PDF
                    </button>

                    {/* Share row */}
                    <div className="flex items-center gap-3">
                      {[
                        { platform: 'whatsapp', Icon: WhatsAppLogo },
                        { platform: 'instagram', Icon: InstagramLogo },
                        { platform: 'email', Icon: MailLogo },
                      ].map(({ platform, Icon }) => (
                        <button
                          key={platform}
                          onClick={() => handleShare(platform, catalog)}
                          className="flex-1 flex items-center justify-center p-3 bg-[#FDFBF9] text-[#8D6E63] border border-[#D7CCC8]/30 rounded-lg hover:bg-[#8D6E63] hover:text-white transition-all duration-300"
                        >
                          <Icon />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLIP BOOK OVERLAY */}
      <AnimatePresence>
        {activeCatalog && (
          <FlipBookViewer
            catalog={activeCatalog}
            onClose={() => setActiveCatalog(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Catalog;
