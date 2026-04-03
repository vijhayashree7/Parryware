import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const imageUrls = [
  "/images/faucets/quattro_new_1.jpg",
  "/images/faucets/quattro_new_2.jpg",
  "/images/faucets/quattro_new_3.jpg",
  "/images/faucets/quattro_new_4.jpg",
  "/images/faucets/quattro_new_5.jpg"
];

export default function QuattroCollection() {
  const [cart, setCart] = useState([]);

  const getProducts = () => {
    const defaultPrices = [3800, 3200, 4200, 4500, 5900];
    const defaultMRPs = [5500, 4800, 5800, 6200, 8100];
    const names = [
      'Quattro Wall Mounted Faucet',
      'Quattro Single Lever Basin Mixer',
      'Quattro Black Precision Mixer',
      'Quattro Tall Basin Mixer',
      'Quattro Linear Sensor Tap'
    ];
    
    return [0, 1, 2, 3, 4].map((i) => ({
      id: `faucet-quattro-${i+1}`,
      name: names[i],
      description: `Experience uncompromising water efficiency and elegant modern geometric design perfectly tailored for your luxury architectural needs. Built with extreme precision.`,
      price: defaultPrices[i],
      mrp: defaultMRPs[i],
      image: imageUrls[i],
      rating: 4.5 + (i * 0.1),
      reviews: 120 + (i * 35)
    }));
  };

  const products = getProducts();

  const handleAddToCart = (product) => {
    if (!cart.find(item => item.product.id === product.id)) {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleIncrease = (productId) => {
    setCart(cart.map(item => 
      item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (productId) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        if (item.quantity === 1) return null;
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(Boolean));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  return (
    <div 
      className="min-h-screen font-sans w-full overflow-y-auto bg-transparent relative"
    >
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#A68966]/10 to-transparent pointer-events-none"></div>
      {/* Amazon Style Header but light themed to match Basin styling */}
      {/* Glassmorphic Header */}
      <header className="bg-white/40 backdrop-blur-md h-[70px] flex items-center justify-between px-6 text-gray-900 sticky top-0 z-50 border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link to="/faucets" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">Quattro Collection</h1>
        </div>
        <div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ShoppingCart className="w-7 h-7 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-[#E33939] text-white font-bold text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center shadow-md">
              {cart.reduce((total, item) => total + item.quantity, 0)}
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
                          onClick={() => cartItem.quantity === 1 ? handleRemoveFromCart(product.id) : handleDecrease(product.id)} 
                          className="h-full px-5 hover:bg-gray-100 transition-colors flex items-center justify-center"
                        >
                          {cartItem.quantity === 1 ? 
                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} /> : 
                            <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                          }
                        </button>
                        <span className="font-bold text-[16px] px-4">{cartItem.quantity}</span>
                        <button 
                          onClick={() => handleIncrease(product.id)} 
                          className="h-full px-5 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center border-l border-gray-200"
                        >
                          <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
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
