import fs from 'fs';
import path from 'path';

const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';

const images = fs.readdirSync(srcFolder).filter(f => f.startsWith('media__') && (f.match(/\.(png|jpg|jpeg|gif)$/i)));
images.sort((a, b) => {
  const statA = fs.statSync(path.join(srcFolder, a)).mtimeMs;
  const statB = fs.statSync(path.join(srcFolder, b)).mtimeMs;
  return statA - statB;
});
const latest10 = images.slice(-10);

const mappings = [
  { img: latest10[0], name: 'praseo_item_1' },
  { img: latest10[1], name: 'praseo_item_2' },
  { img: latest10[2], name: 'praseo_item_3' },
  { img: latest10[3], name: 'praseo_item_4' },
  { img: latest10[4], name: 'praseo_item_5' },
  { img: latest10[5], name: 'praseo_item_6' },
  { img: latest10[6], name: 'praseo_item_7' },
  { img: latest10[7], name: 'praseo_item_8' },
  { img: latest10[8], name: 'praseo_item_9' },
  { img: latest10[9], name: 'praseo_item_10' }
];

mappings.forEach(m => {
  const ext = path.extname(m.img);
  fs.copyFileSync(path.join(srcFolder, m.img), path.join(destFolder, `${m.name}${ext}`));
});

const getPath = (index) => `/images/faucets/${mappings[index].name}${path.extname(mappings[index].img)}`;

const componentContent = `import React, { useState } from 'react';
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
    image: '${getPath(0)}',
    rating: 4.8,
    reviews: 1124
  },
  {
    id: 2,
    name: 'Quattro Bold Geometric',
    description: 'A bold geometric design with sharp edges and clean lines, perfect for contemporary spaces.',
    price: 4999,
    mrp: 5500,
    image: '${getPath(1)}',
    rating: 4.9,
    reviews: 588
  },
  {
    id: 3,
    name: 'Elara Warm Metallic',
    description: 'Crafted with a warm metallic finish, Elara blends luxury and softness.',
    price: 6499,
    mrp: 7500,
    image: '${getPath(2)}',
    rating: 4.9,
    reviews: 415
  },
  {
    id: 4,
    name: 'Nero Minimal Styled',
    description: 'A bold matte minimal silhouette, designed for modern bathrooms.',
    price: 3500,
    mrp: 6000,
    image: '${getPath(3)}',
    rating: 4.8,
    reviews: 254
  },
  {
    id: 5,
    name: 'Aurum Opulence Gold',
    description: 'The Aurum collection features a rich golden finish that elevates your bathroom.',
    price: 8000,
    mrp: 9500,
    image: '${getPath(4)}',
    rating: 5.0,
    reviews: 112
  },
  {
    id: 6,
    name: 'Praseo Minimalist Swan',
    description: 'Elegant swan-inspired gold design with smooth curves and flawless performance.',
    price: 5500,
    mrp: 6500,
    image: '${getPath(5)}',
    rating: 4.7,
    reviews: 340
  },
  {
    id: 7,
    name: 'Quattro Architectural Flat',
    description: 'A flat matte black architectural design optimized for absolute visual harmony.',
    price: 4500,
    mrp: 5200,
    image: '${getPath(6)}',
    rating: 4.8,
    reviews: 215
  },
  {
    id: 8,
    name: 'Elara Crystal Handle',
    description: 'Dazzling gold with stunning crystal textures on the handles, redefining traditional elegance.',
    price: 8500,
    mrp: 9900,
    image: '${getPath(7)}',
    rating: 5.0,
    reviews: 421
  },
  {
    id: 9,
    name: 'Nero Tall Vessel',
    description: 'Tall structured gold vessel tap built specifically for deep countertop basins.',
    price: 6000,
    mrp: 7000,
    image: '${getPath(8)}',
    rating: 4.6,
    reviews: 178
  },
  {
    id: 10,
    name: 'Aurum Waterfall Stream',
    description: 'Innovative matte waterfall architecture allowing a seamless, gentle cascade of water.',
    price: 7500,
    mrp: 8500,
    image: '${getPath(9)}',
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
          <Star key={i} className={\`w-4 h-4 \${i < Math.floor(rating) ? 'fill-current' : ''}\`} />
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
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-[0_1px_5px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col pt-4 border border-gray-200 transition-all duration-200 hover:shadow-xl relative"
              >
                <div className="h-64 px-4 bg-white flex items-center justify-center relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                  {product.rating >= 4.9 && (
                    <div className="absolute top-2 left-0 bg-[#E36611] text-white text-xs px-2 py-1 uppercase tracking-wider rounded-r font-bold shadow-sm">
                      Best Seller
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-[#0F1111] leading-tight mb-1 line-clamp-2">
                    {product.name}
                  </h2>
                  
                  {renderStars(product.rating)}
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-[#0F1111] align-top relative -top-1">₹</span>
                    <span className="text-[28px] font-bold text-[#0F1111] leading-none">
                      {product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    M.R.P: <span className="line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="text-xs text-[#007185] mt-2 mb-4 font-semibold">
                    <Check className="inline w-3 h-3 text-[#FFA41C]" /> Prime Delivery
                  </div>

                  <div className="mt-auto pt-4 h-[55px] flex items-center justify-center">
                    {cartItem ? (
                      <div className="w-full h-[40px] flex items-center justify-between border border-[#FCD200] rounded-[100px] overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all text-[#0F1111]">
                        <button 
                          onClick={() => cartItem.quantity === 1 ? handleRemoveFromCart(product.id) : handleDecrease(product.id)} 
                          className="h-full px-5 hover:bg-gray-50 transition-colors flex items-center justify-center text-[#0F1111]"
                        >
                          {cartItem.quantity === 1 ? 
                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} /> : 
                            <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                          }
                        </button>
                        <span className="font-bold text-[15px]">{cartItem.quantity}</span>
                        <button 
                          onClick={() => handleIncrease(product.id)} 
                          className="h-full px-5 bg-[#F6F6F6] hover:bg-[#EAEAEA] transition-colors flex items-center justify-center text-[#0F1111] border-l border-gray-200/60"
                        >
                          <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full h-[40px] rounded-[100px] text-sm font-semibold transition-colors duration-150 flex items-center justify-center gap-2 bg-[#FFD814] hover:bg-[#F7CA00] shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-[#0F1111]"
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
`;

fs.writeFileSync('c:\\Users\\asus0\\Parryware\\src\\components\\PraseoCollection.jsx', componentContent);
console.log('Successfully embedded 10 images into the Praseo UI without any duplicates!');
