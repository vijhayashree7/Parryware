import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const mockImages = [
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552322689-1065f3d45e5d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1606509036715-dd0b4ea595ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1585058111532-a5f1ba61ce14?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1620626011685-64bc63b78298?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552322689-c4547285ee0d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1595514535315-062e74e6221c?auto=format&fit=crop&q=80&w=800"
];

const categories = [
  'faucet-sensor',
  'faucet-espirion',
  'faucet-thermostatic',
  'faucet-crust',
  'faucet-agate-pro',
  'faucet-aqua',
  'faucet-uno'
];

export default function GenericFaucetCollection() {
  const { categoryId } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity, setIsSidebarOpen, getProductMin, getProductStep } = useCart();

  const catIndex = categories.indexOf(categoryId);
  
  if (catIndex === -1) {
    return <Navigate to="/faucets" />;
  }

  const getProducts = () => {
    const defaultPrices = [2100, 3400, 4200, 5800, 6500];
    const defaultMRPs = [2800, 4200, 5500, 7500, 8900];
    const startIndex = catIndex * 5;
    
    const fmtTitle = categoryId.replace('faucet-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [0, 1, 2, 3, 4].map((i) => {
      let finalImage = mockImages[(startIndex + i) % mockImages.length];
      
      // Explicitly load uploaded local images for customized categories
      if (categoryId === 'faucet-sensor') {
        finalImage = `/images/faucets/sensor_new_${i+1}.jpg`;
      } else if (categoryId === 'faucet-uno') {
        finalImage = `/images/faucets/uno_new_${i+1}.jpg`;
      } else if (categoryId === 'faucet-aqua') {
        finalImage = `/images/faucets/aqua_new_${i+1}.jpg`;
      } else if (categoryId === 'faucet-agate-pro') {
        finalImage = `/images/faucets/agate_new_${i+1}.jpg`;
      } else if (categoryId === 'faucet-thermostatic') {
        finalImage = `/images/faucets/thermo_new_${i+1}.jpg`;
      } else if (categoryId === 'faucet-espirion') {
        finalImage = `/images/faucets/espirion_new_${i+1}.jpg`;
      } else if (categoryId === 'faucet-crust') {
        finalImage = `/images/faucets/crust_new_${i+1}.jpg`;
      }
      
      return {
        id: `${categoryId}-${i+1}`,
        name: `Premium ${fmtTitle} - Model 0${i+1}`,
        description: `Experience the elegant and modern design perfectly tailored for your luxury bathroom. Built with extreme precision.`,
        price: defaultPrices[i],
        mrp: defaultMRPs[i],
        image: finalImage,
        rating: 4.5 + (i * 0.1),
        reviews: 120 + (i * 35)
      };
    });
  };

  const products = getProducts();

  const displayTitle = categoryId.replace('faucet-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div 
      className="min-h-screen font-sans w-full overflow-y-auto bg-transparent relative"
    >
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#A68966]/10 to-transparent pointer-events-none"></div>
      {/* Glassmorphic Header matching Basin styling */}
      <header className="bg-white/40 backdrop-blur-md h-[70px] flex items-center justify-between px-6 text-gray-900 sticky top-0 z-50 border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link to="/faucets" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">{displayTitle}</h1>
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
