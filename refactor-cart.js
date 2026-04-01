const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('Collection.jsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already refactored (contains useCart)
  if (content.includes('useCart')) {
    console.log(`Skipping ${file}`);
    continue;
  }

  console.log(`Refactoring ${file}`);

  // 1. Add import
  content = content.replace(
    /import { Link, useParams, Navigate } from 'react-router-dom';/,
    "import { Link, useParams, Navigate } from 'react-router-dom';\nimport { useCart } from '../context/CartContext';"
  );

  // 2. Replace useState
  content = content.replace(
    /const \[cart, setCart\] = useState\(\[\]\);/,
    "const { cart, addToCart, removeFromCart, updateQuantity, setIsSidebarOpen, getProductMin, getProductStep } = useCart();"
  );

  // 3. Remove handlers
  content = content.replace(/const handleAddToCart = [\s\S]*?(?=return \()/m, '');
  // Because 'const products = getProducts();' might also be removed by this regex, we need to be careful.
  // Actually, let's just use replace carefully:
  content = content.replace(/const handleAddToCart = \(product\) => {[\s\S]*?const handleRemoveFromCart = \(productId\) => {[\s\S]*?};/m, '');

  content = content.replace(/const displayTitle = [^\n]+/g, ''); // Fix any lingering stuff if any

  // 4. Update Header Cart Icon
  content = content.replace(
    /<div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">/,
    '<div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setIsSidebarOpen(true)}>'
  );

  content = content.replace(
    /\{cart\.reduce\(\(total, item\) => total \+ [^\n]+/,
    '{cart.length}'
  );

  // 5. Update Buttons
  const buttonsRegex = /<div className="mt-auto">[\s\S]*?<\/div>\s*<\/div>\s*<\/motion\.div>/m;
  const newButtons = `                  <div className="mt-auto">
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
                        <span className="font-bold text-[16px] px-4">{cartItem.quantity} {product.unit}</span>
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
              </motion.div>`;
  
  content = content.replace(buttonsRegex, newButtons);

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Done!");
