import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const imageUrls = [
  "https://m.media-amazon.com/images/I/71pO2DYe9mL.jpg",
  "https://bathoutlet.in/cdn/shop/products/20201003_142913.jpg?crop=center&height=2048&v=1656477308&width=2048",
  "https://m.media-amazon.com/images/I/61BBn9NyWjL._AC_UF1000%2C1000_QL80_.jpg",
  "https://www.inart.co.in/cdn/shop/files/71hv9D1snOL.jpg?v=1773470985&width=360",
  "https://www.inart.co.in/cdn/shop/files/81edSovqynL.jpg?v=1773472772&width=1946",
  "https://m.media-amazon.com/images/I/510SkLiw7fL._AC_UF1000%2C1000_QL80_.jpg",
  "https://www.cera-india.com/sites/default/files/2022-02/Wash%20basin%20with%20full%20pedestal%20Mobile%20Banner.jpg",
  "https://www.artize.com/in/image/catalog/2025/VCS-WHT-503301.jpg",
  "https://www.jaquar.com/images/thumbs/0009687_wall-hung-basin-with-full-pedestal_960.jpeg",
  "https://www.inart.co.in/cdn/shop/files/Camera.003_160b55d6-98bb-4a10-9ae2-5aea98865ccf.jpg?v=1751257627",
  "https://m.media-amazon.com/images/I/31RgQDATi4L._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/71EF6l7hTNL._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/51f1c8m7L5L._AC_UF1000%2C1000_QL80_.jpg",
  "https://ruheindia.com/cdn/shop/files/1_ed689375-0b2d-4067-8ee4-738f60188054.png?v=1754914333",
  "https://www.inart.co.in/cdn/shop/files/71gU7Hl6LQL.jpg?crop=center&height=2048&v=1773323744&width=2048",
  "https://www.decorpot.com/images/1927620867Title.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20240424/pngtree-water-tap-sink-with-faucet-in-expensive-loft-bathroom-image_15666876.jpg",
  "https://m.media-amazon.com/images/I/61dVVRssAFL.jpg",
  "https://m.media-amazon.com/images/I/81D7NEYzaXL._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/41vXfLysfbS._AC_UF1000%2C1000_QL80_.jpg",
  "https://www.peelorange.com/cdn/shop/files/1469002e2cc6aa8772048bcb49818f8c.jpg?v=1727069559",
  "https://www.queobathrooms.com/QueoBathroomImages/BlogImage/creating-a-rejuvenating-space-with-contemporary-bath-fixtures.jpg",
  "https://www.kotabaths.com/data/watermark/main/20251012/68eb4bb27a64b.jpg",
  "https://m.media-amazon.com/images/I/716e4MRHJIL._AC_UF350%2C350_QL80_.jpg",
  "https://www.fontanashowers.com/v/vspfiles/photos/FS70547-2.jpg?v-cache=1765282397",
  "https://m.media-amazon.com/images/I/61EkmhyHBXL._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/61A4-NDW%2BUL.jpg",
  "https://www.aquaticabath.eu/cache/images/1280x800a-ffffff/aquatica/Aquatica-Solace-A-Wht-Round-Stone-Bathroom-Vessel-Sink-02-%28web%29.jpg",
  "https://m.media-amazon.com/images/I/713JkEQY8ML.jpg",
  "https://images.openai.com/thumbnails/url/bLQwJHicDclJDoIwAADAF8kiAkJiDCEBidoIBJcTgbYsBaGllcXn-Ct_o3Od76cSgnJblnEHh4UKjFYi7zSp5CITNZRg_5R51VNad-We7f5nOwBZPgyvA6I-CZDlAn0Z2mkmSnSxcn10yAtrZlEVGl-TcTKDU-TgrTcXcZkm51USEn7sbpvkXoLcsQxDxEzzHkKJdDdtmXoYccMYhX32XsxUbcAPZQw6Yw",
  "https://www.jaquar.com/images/thumbs/0056306_under-counter-basin_960.jpeg",
  "https://www.inart.co.in/cdn/shop/files/71iQuEFqr_L.jpg?v=1773470580&width=1946",
  "https://image.made-in-china.com/202f0j00cgnqwHpdkoub/Hot-Rectangle-White-Ceramic-Undermount-Basin-Sink-1813.webp",
  "https://simpolo-web.s3.ap-south-1.amazonaws.com/uploads/media/blog/Classic-White-Oval-Undermount-Basin-with-Marble-Look-Countertop.jpeg",
  "https://m.media-amazon.com/images/I/71hOGsrsK7L._AC_UF1000%2C1000_QL80_.jpg",
  "https://www.inart.co.in/cdn/shop/files/Camera.006-Copy.png?v=1744439931",
  "https://www.inart.co.in/cdn/shop/files/Camera.001.png?v=1731923117",
  "https://bassinoimpex.com/cdn/shop/files/BPB-742_512x512.jpg?v=1757590883",
  "https://images.openai.com/thumbnails/url/ZjfvBHicDclJDoIwFADQEyFGiAyJMSiTMipGDBtjC0oLlOkjyqm8jrfRt33fTw7Q9CrPZwx37waylAPE5rNHDzcgeIbriu_zumkIe6zb1f9UzU8VCx9oF-_L7gVCOGXCeTTlqDjlMeWssCXlAsQTqpVqgSVmOYjEI91OnpxIl0GkbRSaxhN5qDADp3xtytFuzbsfJDZ1j7reG4OvKNFwcAttvKLdXreXopvGwJ5erf0A63I_Xg",
  "https://images.openai.com/static-rsc-1/A3A-XQvvK7bbDbkcwn6Oriptyzrr7DPuCau6bq1bIBjcAmOMbIk_l6e3rw1AHNQTLKY4ZzzS4qMwO4cQ07xnZEXhw7D3hxs2x7GfOeDr6DAsxeRiqiWr_x3KPvU-1NFIJwxcqCnX1_wBThZF43ekww",
  "https://images.openai.com/static-rsc-1/H3rMIqcZ9JBFsRyGM8Ig40t8K-2uezJU4meRvIODpG-Uorfpm4I8K8bUUbE6RA5GhiNXw5nsElVGD5zAJIh_imTTEEv28rRHFWnxJdooJP8h4jJ0mKma1YAyuNp3i28KXI6xYyFpKMGQxD1xYG3IQQ",
  "https://m.media-amazon.com/images/I/317PqKGP1CL._AC_UF1000%2C1000_QL80_.jpg",
  "https://images.openai.com/thumbnails/url/_H50Y3icDclJDoIwAADAFwF1QyAxpgQlYixLEAMXAi07QqVFlEf5H3-jc53vp-ScMk2Ssg4Pb8ozIvC0A2LBeMIrLOL-LrGyp7Tqiv1j9z8NIqKa2LPdCPk5zH2_bhOZIj00wAUSlQ5lZDDgHO_shcdNJZzDarUl1gI1MFUCECbPKziPjpf2pcuFWjabbhnIOrwF8bSeZWK2aZbYeB6bE3MOb8-0bJqzqVVQFP8AA54-FA",
  "https://www.simplexfurniture.in/uploaded-files/product-images/Laboratory-Sinks.1713530378.jpg",
  "https://image.made-in-china.com/202f0j00DebWjHZKbpYT/Luxury-Design-Black-Color-Floor-Standing-Wash-Basin-Sink-Wc-Bathroom-Pedestal-Basin-for-Hotle-or-Hosehold.webp",
  "https://image.made-in-china.com/2f0j00ISTlQNnqJtGP/Factory-Price-Pedestal-Basin-Black-Funnel-Shaped-Basin-One-Piece-Bathroom-Free-Standing-Pedestal-Sink-Hand-Wash-Basin-for-Hotel.webp",
  "https://www.inart.co.in/cdn/shop/files/71hv9D1snOL.jpg?v=1773470985&width=360",
  "https://m.media-amazon.com/images/I/510SkLiw7fL._AC_UF1000%2C1000_QL80_.jpg",
  "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1000&q=80"
];

const categories = [
  'bowl-basin',
  'wall-hung-full-pedestal',
  'wall-hung-half-pedestal',
  'wall-hung-no-pedestal',
  'integrated-basin',
  'countertop-basin',
  'below-counter-basin',
  'pedestals',
  'lab-sink',
  'freestanding-basin'
];

export default function BasinCollection() {
  const { categoryId } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity, setIsSidebarOpen, getProductMin, getProductStep } = useCart();

  const catIndex = categories.indexOf(categoryId);
  
  if (catIndex === -1) {
    return <Navigate to="/basin" />;
  }

  const getProducts = () => {
    const defaultPrices = [2499, 3299, 4199, 5499, 8999];
    const defaultMRPs = [3499, 4499, 5999, 7499, 12999];
    const startIndex = catIndex * 5;
    
    // Create a beautiful properly cased title from category id
    const fmtTitle = categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [0, 1, 2, 3, 4].map((i) => ({
      id: `${categoryId}-${i+1}`,
      name: `Premium ${fmtTitle} - Model 0${i+1}`,
      description: `Experience the elegant and modern design perfectly tailored for your luxury bathroom. Built with extreme precision.`,
      price: defaultPrices[i],
      mrp: defaultMRPs[i],
      image: imageUrls[startIndex + i],
      rating: 4.5 + (i * 0.1),
      reviews: 120 + (i * 35)
    }));
  };

  const products = getProducts();

  return (
    <div 
      className="min-h-screen font-sans w-full overflow-y-auto bg-[#F4F6F8]"
    >
      {/* Amazon Style Header but light themed to match */}
      <header className="bg-white h-[70px] flex items-center justify-between px-6 text-gray-900 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/basin" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">{categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
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
                {/* Image Container */}
                <div className="relative w-full h-[260px] rounded-[20px] overflow-hidden bg-gray-50 flex items-center justify-center mb-1 group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  
                  {/* Dynamic Badges */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#222222] text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Star className="w-[12px] h-[12px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                  </div>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-white/50"></div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="px-2 pt-4 pb-2 flex flex-col flex-grow">
                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[22px] font-extrabold text-[#111111] tracking-tight">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[13px] text-gray-500 font-medium tracking-wide">
                      List price
                    </span>
                  </div>

                  {/* Title Row */}
                  <h2 className="text-[15px] font-medium text-[#222222] leading-snug truncate whitespace-nowrap overflow-hidden text-ellipsis mb-5">
                    <span className="font-bold">{product.name.split(' ')[0]}</span> • {product.name.substring(product.name.indexOf(' ') + 1) || product.description}
                  </h2>
                  
                  <div className="h-[1px] w-full bg-gray-100 mb-4"></div>
                  
                  {/* Specs Row */}
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
                    <div>2 days ago</div>
                  </div>

                  {/* Buttons */}
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
