import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const rawUrls = "https://m.media-amazon.com/images/I/41WQeWgq5eL._AC_UF1000%2C1000_QL80_.jpg,https://www.inart.co.in/cdn/shop/files/51fG9IZGHGL.jpg?v=1773313930,https://m.media-amazon.com/images/I/71z6Px2d4bL.jpg,https://m.media-amazon.com/images/I/51lUvD4hnhL._AC_UF1000%2C1000_QL80_.jpg,https://www.inart.co.in/cdn/shop/files/51aB8S729zL.jpg?v=1773307100&width=1946,,https://image.made-in-china.com/202f0j00LWnpFyjlcKqA/White-Color-Porcelain-Toilet-Bowl-Bathroom-Ceramic-Two-Piece-Toilet-Bowl.webp,https://www.aquantindia.com/product_images/6869/1803.jpg,https://image.made-in-china.com/202f0j00AjNoBMaPwgqy/Popular-Design-Round-Shape-Rimless-Two-Piece-Toilet-Modern-Style-Bathroom-Two-Piece-P-Trap-Water-Closet-Wc-Full-Back-to-Wall.webp,https://m.media-amazon.com/images/I/71Sh8QhCVUL._AC_UF1000%2C1000_QL80_.jpg,https://m.media-amazon.com/images/I/518xRqo3seL.jpg,https://cdn.bigbathroomshop.co.uk/media/catalog/product/cache/1f8812de34949d65ebdaffa392c2de31/w/h/whtb006_ls_1000_4_new2.jpg,https://m.media-amazon.com/images/I/51kTXb807oL.jpg,https://www.inart.co.in/cdn/shop/files/Hc6c3286411a14a0c90e9100e3c522271r.png_960x960_04302d00-be43-436a-943d-3cf4ea869e85.webp?v=1686210241,https://m.media-amazon.com/images/I/611CvV50lwL._AC_UF1000%2C1000_QL80_.jpg,https://www.inart.co.in/cdn/shop/files/H71947ade45c347589e6112a4949ec9c4j.jpg_960x960_fafae1b0-f744-46af-94ac-ec81b1a677bd.webp?v=1686210221&width=1946,https://www.inart.co.in/cdn/shop/files/71SgNzKuJ0L.jpg?v=1773312060&width=1946,https://m.media-amazon.com/images/I/81rqGbx0EaL.jpg,https://www.inart.co.in/cdn/shop/files/01-Copy_435c9031-4598-444f-a7a3-d764b76f29c2.jpg?v=1726116463&width=1946,https://m.media-amazon.com/images/I/51x2%2B29iExL._AC_UF1000%2C1000_QL80_.jpg,https://m.media-amazon.com/images/I/81gglnNNKGL._AC_UF1000%2C1000_QL80_.jpg,https://s.alicdn.com/%40sc04/kf/H02cdb7aeb41a43cfb5c431d6c51b36b23/Remote-Control-Bathroom-Smart-Toilet-Bowl-Bidet-Inodoro-Toilette-Inteligente-Electric-Intelligent-Automatic-Toilet.png,https://s.alicdn.com/%40sc04/kf/Hecdbd5a7d03446dd8843b965d32784d6a/Intelligent-Electric-Smart-Toilet-with-Bidet-Function-Automatic-Flush-System-Seat-Heating-Remote-Control-Included-Modern-Design.jpg_300x300.jpg,https://s.alicdn.com/%40sc04/kf/Hd9cc1f4cd1f448e6b5849f1dacba815e9/Modern-Style-Bidet-Smart-Toilet-Water-Closet-Commode-Bowl-Ceramic-Toilet-Unit-Smart-Intelligent-Toilets-with-Voice-Control.jpg_300x300.jpg,https://m.media-amazon.com/images/I/61YYT4guo3L._AC_UF1000%2C1000_QL80_.jpg,https://images.openai.com/static-rsc-1/5h9foD-bRiZvO46PM37QzDaoeLdX21resfUNQPJnaal2XkmvFkYd4TFa9ZHyp-V26lVrMlRN68fIefXm_ANEwhJdJG9hjvrfMXFK-j09yJa9r0n3-VOQK2lijhTOPUCPnGCbP_btqmgabV24Y4mYjw,https://m.media-amazon.com/images/I/61TsgFj3OkL._AC_UF1000%2C1000_QL80_.jpg,https://www.queobathrooms.com/QueoBathroomImages/BlogImage/luxury-bathroom-ideas-2020-l.jpg,https://bathxpertz.com/uploads/99fd674e4056fdb7c1e7a0717db119a5_Untitled-1.jpg,https://www.queobathrooms.com/QueoBathroomImages/BlogImage/best-modern-toilet-designs-for-your-next-bathroom-upgrade-l.jpg,https://hindware.com/_next/image?q=75&url=https%3A%2F%2Fhindwarestg.blob.core.windows.net%2Fcontainer1%2Fblog%2Flatest-modern-toilet-designs-for-your-next-bathroom-upgrade.png&w=1920,https://m.media-amazon.com/images/I/71CDbtTiBuL.jpg,https://m.media-amazon.com/images/I/51t%2BX1Z9cIL._AC_UF894%2C1000_QL80_.jpg,https://m.media-amazon.com/images/I/21rwbOh5LpL._AC_UF1000%2C1000_QL80_.jpg,https://image.made-in-china.com/2f0j00LTAougqzCkcy/Modern-Design-High-Quality-White-Color-Floor-Mounted-Ceramic-Squatting-Pan-with-Cover-Save-Space-Wholesale-Price-Squatting-Pan.webp,https://s.alicdn.com/%40sc04/kf/H55810af507384205baab34bad0e1c457U/Modern-Design-One-Piece-Straight-Type-Toilet-Dual-Purpose-Odor-Proof-Anti-Slip-Squatting-Pit-for-Bathroom.jpg,https://s.alicdn.com/%40sc04/kf/Hd598be81b1c342f0a8545bb6d8e47716m/Modern-Platform-Squat-Pan-Asia-Best-Sell-Bathroom-Ceramic-Squat-Toilet-with-Trapway-and-Own-Flushing-System.jpg_300x300.jpg,https://m.media-amazon.com/images/I/51h9gUgSr5L._AC_UF1000%2C1000_QL80_.jpg,https://www.inart.co.in/cdn/shop/files/LOGO-open-Camera.001_1.jpg?v=1746257146&width=1946,https://m.media-amazon.com/images/I/71CDbtTiBuL.jpg,https://soccasanitaryware.in/images/Img-16031749124153.webp,https://www.betterbathrooms.com/Images/BUNBeBa_1729672087_1_15880241_Supersize.jpg?v=5,https://m.media-amazon.com/images/I/81I1h-lkX0L._AC_UF1000%2C1000_QL80_.jpg,https://m.media-amazon.com/images/I/61TlrGYxVPL._AC_UF1000%2C1000_QL80_.jpg,https://m.media-amazon.com/images/I/41IIY9HwPZL.jpg,https://www.cera-india.com/sites/default/files/2021-04/01%20-%20Main%20banner-Mobile_0.jpg,https://m.media-amazon.com/images/I/611CvV50lwL.jpg,https://dolphy.in/assets/efe00ffb-d9fe-498c-b3ad-b44d3ff37ad7,https://m.media-amazon.com/images/I/71ZtvOgjDzL._AC_UF350%2C350_QL80_.jpg,https://34stjohn.com/cdn/shop/files/Bathroom3_SMART_WC_CATALANO_CHROME.jpg?v=1758039609&width=1000,https://tapron.co.uk/cdn/shop/files/1.2m_Pre-Wall_W.C_Cistern_Frame_Wall_Hung_Toilet_with_Seat_and_Chrome_Flush_Plate.jpg?v=1774304510";

const imageUrls = rawUrls.split(',').map(s => s.trim()).filter(Boolean); // removes empty strings

const categories = [
  'closet-one-piece',
  'closet-two-piece',
  'closet-wall-hung',
  'closet-floor-mounted',
  'closet-smart',
  'closet-western',
  'closet-indian',
  'closet-rimless',
  'closet-compact',
  'closet-concealed'
];

export default function ClosetCollection() {
  const { categoryId } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity, setIsSidebarOpen, getProductMin, getProductStep } = useCart();

  const catIndex = categories.indexOf(categoryId);
  
  if (catIndex === -1) {
    return <Navigate to="/closet" />;
  }

  const getProducts = () => {
    const defaultPrices = [12499, 14299, 18199, 22499, 28999];
    const defaultMRPs = [15499, 18499, 22999, 29499, 35999];
    
    // We have 50 URLs, gracefully handle perfectly mapped 5 each
    const startIndex = (catIndex * 5) % imageUrls.length;
    
    // Create a beautiful properly cased title from category id
    const fmtTitle = categoryId.replace('closet-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [0, 1, 2, 3, 4].map((i) => {
      const imgIndex = (startIndex + i) % imageUrls.length;
      return {
        id: `${categoryId}-${i+1}`,
        name: `Premium ${fmtTitle} Closet - Model 0${i+1}`,
        description: `Experience supreme hygiene and elegant modern design perfectly tailored for your luxury bathroom. Built with extreme precision.`,
        price: defaultPrices[i],
        mrp: defaultMRPs[i],
        image: imageUrls[imgIndex],
        rating: 4.5 + (i * 0.1),
        reviews: 120 + (i * 35)
      };
    });
  };

  const products = getProducts();

  return (
    <div className="min-h-screen font-sans w-full overflow-y-auto bg-transparent relative">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#A68966]/10 to-transparent pointer-events-none"></div>
      {/* Glassmorphic Header */}
      <header className="bg-white/40 backdrop-blur-md h-[70px] flex items-center justify-between px-6 text-gray-900 sticky top-0 z-50 border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link to="/closet" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">{categoryId.replace('closet-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
        </div>
        <div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setIsSidebarOpen(true)}>
          <ShoppingCart className="w-7 h-7 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-[#E33939] text-white font-bold text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center shadow-md">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-4 md:p-8 pb-16 mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 justify-center">
          {products.map((product, i) => {
            const cartItem = cart.find(item => item.product.id === product.id);
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-[28px] p-3 shadow-sm hover:shadow-lg flex flex-col transition-all duration-300 border border-gray-100/50"
              >
                <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden bg-gray-50 flex items-center justify-center mb-1 group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#222222] text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Star className="w-[12px] h-[12px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                  </div>

                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                  </div>
                </div>

                <div className="px-2 pt-4 pb-2 flex flex-col flex-grow">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[22px] font-extrabold text-[#111111] tracking-tight">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[13px] text-gray-500 font-medium tracking-wide">
                      List price
                    </span>
                  </div>

                  <h2 className="text-[15px] font-medium text-[#222222] leading-snug truncate whitespace-nowrap overflow-hidden text-ellipsis mb-5">
                    <span className="font-bold">{product.name.split(' ')[0]}</span> • {product.name.substring(product.name.indexOf(' ') + 1) || product.description}
                  </h2>
                  
                  <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
                  
                  <div className="flex items-center text-[13px] text-gray-600 font-medium mb-4">
                    <div className="flex flex-1 items-center justify-center gap-2 border-r border-gray-100">
                      <Star className="w-[16px] h-[16px] text-gray-400" />
                      <span>{product.rating} Rating</span>
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2">
                      <svg className="w-[16px] h-[16px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      <span>1 Unit</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-gray-100 mb-4"></div>

                  <div className="flex items-center justify-between text-[13px] text-gray-500 mb-6">
                    <div>By • <span className="text-gray-900 font-semibold underline underline-offset-2">Parryware</span></div>
                    <div>In Stock</div>
                  </div>

                  <div className="mt-auto">
                    {cartItem ? (
                      <div className="w-full h-[52px] flex items-center justify-between border-[1px] border-gray-800 rounded-full overflow-hidden bg-white text-gray-900 shadow-sm">
                        <button 
                          onClick={() => {
                            if (cartItem.quantity <= getProductMin(product)) {
                              removeFromCart(product.id);
                            } else {
                              updateQuantity(product.id, cartItem.quantity - getProductStep(product));
                            }
                          }}
                          className="h-full px-5 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          {cartItem.quantity <= getProductMin(product) ? 
                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} /> : 
                            <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                          }
                        </button>
                        <span className="font-bold text-[16px] px-4">{cartItem.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(product.id, cartItem.quantity + getProductStep(product))} 
                          className="h-full px-5 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center border-l border-gray-200"
                        >
                          <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full h-[52px] rounded-full text-[15px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] text-white shadow-md transform hover:scale-[1.01]"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
