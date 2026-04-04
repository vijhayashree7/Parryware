import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ShoppingCart, Star, Check, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function CardinalCollection() {
  const { products } = useProducts();
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


  return (
    <div 
      className="min-h-screen font-sans w-full overflow-y-auto bg-transparent relative"
    >
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#A68966]/10 to-transparent pointer-events-none"></div>
      {/* Amazon Style Header */}
      {/* Glassmorphic Header */}
      <header className="bg-white/40 backdrop-blur-md h-[60px] flex items-center justify-between px-4 text-gray-900 sticky top-0 z-50 shadow-sm border-b border-gray-200/30">
        <div className="flex items-center gap-4">
          <Link to="/faucets" className="hover:text-gray-300">
            <ArrowLeft className="w-6 h-6" />
          </Link>
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
                  {/* Dynamic Tags assigned via Admin Portal */}
                  {product.tags && product.tags.length > 0 ? (
                    <div className="absolute top-3 inset-x-3 flex flex-col gap-2 pointer-events-none">
                      {product.tags.map(tag => (
                        <div key={tag} className="self-start text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border bg-[#FFF8E6]/95 backdrop-blur-md text-[#F5A623] border-[#FFEDCC]">
                          <Star className="w-[10px] h-[10px] fill-[#F5A623]" /> {tag}
                        </div>
                      ))}
                    </div>
                  ) : null}
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
                  
                  {/* Specs Row & Variants */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-[13px] text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <Star className="w-[14px] h-[14px] text-gray-400" />
                        {product.rating} <span className="text-gray-400 font-normal">Rating</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <Check className="w-[14px] h-[14px] text-gray-400" />
                        {product.reviews} <span className="text-gray-400 font-normal">Reviews</span>
                      </div>
                    </div>
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.variants.map((v, i) => (
                          <span key={i} className="text-[10px] font-bold border border-gray-200 bg-gray-50 rounded px-2 py-1 text-gray-600">
                            {v.key}: <span className="text-gray-800">{v.value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="h-[1px] w-full bg-gray-100 my-4"></div>
                  
                  {/* Footer Row */}
                  <div className="flex items-center justify-between text-[12px] text-gray-500 mb-5 font-medium">
                    <div>By • <span className="text-gray-800 font-semibold underline underline-offset-2">Parryware</span></div>
                    <div className="text-emerald-600 font-semibold px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100 shadow-sm text-[11px] flex items-center gap-1">In Stock</div>
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
