import fs from 'fs';

const files = [
  'c:\\Users\\asus0\\Parryware\\src\\components\\CardinalCollection.jsx',
  'c:\\Users\\asus0\\Parryware\\src\\components\\PraseoCollection.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  const startIdx = content.indexOf('<motion.div');
  const endIdx = content.lastIndexOf('</motion.div>') + '</motion.div>'.length;

  if (startIdx !== -1 && endIdx !== -1) {
    const newDiv = `<motion.div 
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
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#2A2A2A] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Star className="w-[10px] h-[10px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                  </div>
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
              </motion.div>`;
              
    content = content.substring(0, startIdx) + newDiv + content.substring(endIdx);
    fs.writeFileSync(file, content);
  }
});

console.log('Pinterest UI globally rewritten!');
