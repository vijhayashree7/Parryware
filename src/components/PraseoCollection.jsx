import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Praseo Classic Chrome',
    description: 'Defined by elegant curves and a timeless chrome finish, bringing classic sophistication.',
    price: 3500,
    mrp: 4500,
    image: '/images/faucets/praseo_item_1.jpg',
    rating: 4.8,
    reviews: 1124
  },
  {
    id: 2,
    name: 'Quattro Bold Geometric',
    description: 'A bold geometric design with sharp edges and clean lines, perfect for contemporary spaces.',
    price: 4999,
    mrp: 5500,
    image: '/images/faucets/praseo_item_2.jpg',
    rating: 4.9,
    reviews: 588
  },
  {
    id: 3,
    name: 'Elara Warm Metallic',
    description: 'Crafted with a warm metallic finish, Elara blends luxury and softness.',
    price: 6499,
    mrp: 7500,
    image: '/images/faucets/praseo_item_3.jpg',
    rating: 4.9,
    reviews: 415
  },
  {
    id: 4,
    name: 'Nero Minimal Styled',
    description: 'A bold matte minimal silhouette, designed for modern bathrooms.',
    price: 3500,
    mrp: 6000,
    image: '/images/faucets/praseo_item_4.jpg',
    rating: 4.8,
    reviews: 254
  },
  {
    id: 5,
    name: 'Aurum Opulence Gold',
    description: 'The Aurum collection features a rich golden finish that elevates your bathroom.',
    price: 8000,
    mrp: 9500,
    image: '/images/faucets/praseo_item_5.jpg',
    rating: 5.0,
    reviews: 112
  },
  {
    id: 6,
    name: 'Praseo Minimalist Swan',
    description: 'Elegant swan-inspired gold design with smooth curves and flawless performance.',
    price: 5500,
    mrp: 6500,
    image: '/images/faucets/praseo_item_6.jpg',
    rating: 4.7,
    reviews: 340
  },
  {
    id: 7,
    name: 'Quattro Architectural Flat',
    description: 'A flat matte black architectural design optimized for absolute visual harmony.',
    price: 4500,
    mrp: 5200,
    image: '/images/faucets/praseo_item_7.jpg',
    rating: 4.8,
    reviews: 215
  },
  {
    id: 8,
    name: 'Elara Crystal Handle',
    description: 'Dazzling gold with stunning crystal textures on the handles, redefining traditional elegance.',
    price: 8500,
    mrp: 9900,
    image: '/images/faucets/praseo_item_8.jpg',
    rating: 5.0,
    reviews: 421
  },
  {
    id: 9,
    name: 'Nero Tall Vessel',
    description: 'Tall structured gold vessel tap built specifically for deep countertop basins.',
    price: 6000,
    mrp: 7000,
    image: '/images/faucets/praseo_item_9.jpg',
    rating: 4.6,
    reviews: 178
  },
  {
    id: 10,
    name: 'Aurum Waterfall Stream',
    description: 'Innovative matte waterfall architecture allowing a seamless, gentle cascade of water.',
    price: 7500,
    mrp: 8500,
    image: '/images/faucets/praseo_item_10.jpg',
    rating: 4.9,
    reviews: 310
  }
];

export default function PraseoCollection() {
  const [cart, setCart] = useState([]);

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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center text-[#FFA41C]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
        ))}
        <span className="text-[#007185] ml-2 text-sm font-normal">{rating}</span>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen font-sans w-full overflow-y-auto"
      style={{ backgroundImage: "url('/images/faucets/cardinal_bg.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}
    >
      <header className="bg-[#131921] h-[60px] flex items-center justify-between px-4 text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/faucets" className="hover:text-gray-300">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex-1 px-4 text-sm font-bold text-center uppercase tracking-widest text-[#E36611]">
          Praseo Edition
        </div>
        <div className="relative flex items-center cursor-pointer">
          <ShoppingCart className="w-8 h-8" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#F08804] text-black font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-4 md:p-6 pb-12 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const cartItem = cart.find(item => item.product.id === product.id);
            return (
              <motion.div 
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[24px] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative w-full h-[220px] rounded-[16px] overflow-hidden bg-[#F8F9FA] flex items-center justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply p-4"
                  />
                  {/* Dynamic Badges */}
                  {product.rating >= 4.9 ? (
                    <div className="absolute top-3 left-3 bg-[#FFF0E6]/95 backdrop-blur-md text-[#E36611] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#FFE0CC]">
                      <Star className="w-[10px] h-[10px] fill-[#E36611] text-[#E36611]" /> Best Seller
                    </div>
                  ) : product.price <= 3500 ? (
                    <div className="absolute top-3 left-3 bg-[#E6F4EA]/95 backdrop-blur-md text-[#1E8E3E] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#CCE8D5]">
                      <Check className="w-[10px] h-[10px] text-[#1E8E3E]" strokeWidth={3} /> Value Choice
                    </div>
                  ) : product.id % 3 === 0 ? (
                    <div className="absolute top-3 left-3 bg-[#F3E8FF]/95 backdrop-blur-md text-[#8B5CF6] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#E9D5FF]">
                      <Star className="w-[10px] h-[10px] fill-[#8B5CF6] text-[#8B5CF6]" /> New Arrival
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-[#FFF8E6]/95 backdrop-blur-md text-[#F5A623] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#FFEDCC]">
                      <Star className="w-[10px] h-[10px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="px-1 flex flex-col flex-grow">
                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-[22px] font-extrabold text-[#111111] tracking-tight">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[13px] text-gray-500 font-medium tracking-wide">
                      M.R.P: <span className="line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                    </span>
                  </div>

                  {/* Title Row */}
                  <h2 className="text-[14px] font-medium text-gray-600 leading-snug line-clamp-2">
                    <span className="font-bold text-gray-800">{product.name.split(' ')[0]}</span> • {product.name.substring(product.name.indexOf(' ') + 1) || product.description}
                  </h2>
                  
                  <div className="h-[1px] w-full bg-gray-100 my-4"></div>
                  
                  {/* Specs Row */}
                  <div className="flex items-center gap-6 text-[13px] text-gray-700 font-medium">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      <Star className="w-[14px] h-[14px] text-gray-400" />
                      {product.rating} <span className="text-gray-400 font-normal">Rating</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      <Check className="w-[14px] h-[14px] text-gray-400" />
                      {product.reviews} <span className="text-gray-400 font-normal">Reviews</span>
                    </div>
                  </div>
                  
                  <div className="h-[1px] w-full bg-gray-100 my-4"></div>
                  
                  {/* Footer Row */}
                  <div className="flex items-center justify-between text-[12px] text-gray-500 mb-5 font-medium">
                    <div>By • <span className="text-gray-800 font-semibold underline underline-offset-2">Parryware Luxury</span></div>
                    <div className="text-emerald-600 font-semibold px-2 py-0.5 bg-emerald-50 rounded text-[11px]">In Stock</div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto">
                    {cartItem ? (
                      <div className="w-full h-[48px] flex items-center justify-between border-[1.5px] border-[#2A2A2A] rounded-full overflow-hidden bg-white shadow-sm transition-all text-[#0F1111]">
                        <button 
                          onClick={() => cartItem.quantity === 1 ? handleRemoveFromCart(product.id) : handleDecrease(product.id)} 
                          className="h-full px-5 hover:bg-gray-100 transition-colors flex items-center justify-center text-[#0F1111]"
                        >
                          {cartItem.quantity === 1 ? 
                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} /> : 
                            <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                          }
                        </button>
                        <span className="font-bold text-[16px] px-4">{cartItem.quantity}</span>
                        <button 
                          onClick={() => handleIncrease(product.id)} 
                          className="h-full px-5 bg-[#F6F6F6] hover:bg-[#EAEAEA] transition-colors flex items-center justify-center text-[#0F1111] border-l border-gray-200"
                        >
                          <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full h-[48px] rounded-full text-[15px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-b from-[#333333] to-[#111111] hover:from-[#222222] hover:to-[#000000] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transform hover:-translate-y-[1px] active:translate-y-0"
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
