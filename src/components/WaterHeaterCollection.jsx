import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';

const imageUrls = [
  "https://png.pngtree.com/thumb_back/fh260/background/20230527/pngtree-silver-stainless-steel-water-heater-with-steam-valve-image_2651541.jpg",
  "https://www.jaquar.com/images/uploaded/6%20features%20of%20smart%20water%20heaters/image4.jpg",
  "https://cdn.accentuate.io/119789879600/-1684323366940/water-heater-1-v1695623432791.png?560x800=",
  "https://m.media-amazon.com/images/I/319NSNNPYJL._AC_SR290%2C290_.jpg",
  "https://www.crompton.co.in/cdn/shop/files/Artboard-2-v1761382221096_1920x.jpg?v=1771395861",
  "https://www.vguard.in/uploads/product/contino.jpg",
  "https://m.media-amazon.com/images/I/71fWvSO-i2L._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/41bhhwzAGmL._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/71LCL4KHiEL._AC_UF1000%2C1000_QL80_.jpg",
  "https://images.openai.com/static-rsc-1/-qLpK0JiIdBO1WPT-HXQ_qPGxIvuUWDO5WyHIQy3X7F8yNgH20pZXuJMKZPGNEKxJuB0xhE0McCm89iMyiLAHuxYLTR3au63P-Z3iGWIJRNa_y-UDpQT76fMLr5B0joNM6hGfE_kIrnLGiowTur7zQ",
  "https://image.made-in-china.com/2f0j00IPfGecdnrAou/Latest-Technology-Air-to-Water-Air-Source-Heat-Pump-Water-Heater-for-Hotel.webp",
  "https://m.media-amazon.com/images/I/51z-LKwnMpL._AC_UF1000%2C1000_QL80_.jpg",
  "https://cdn11.bigcommerce.com/s-7wqdm8gvmj/products/15069/images/52324/thumb_product_aerotherm_g2_50gal__33476.1766168095.500.750.png?c=2",
  "https://www.lg.com/content/dam/channelbtb/lgcom/global/es/water-heater/es-hvac-2025-feature-water-heater-03-key-features-01-performance-m.jpg",
  "https://www.lg.com/content/dam/channelbtb/lgcom/global/images/business/heating-waterheater/updated/water-heater-2025-flexible-installation-design-r290-water-heater-251025-m.jpg",
  "https://bluebirdsolar.com/cdn/shop/articles/Solar_Water_Heater_4c141c9f-fb2b-4d73-910c-69dab6af0e9c.jpg?v=1761566083",
  "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/50-litre-solar-water-heater-sy-20240904140002014.png",
  "https://image.made-in-china.com/2f0j00QbaeGTCBRtkz/150L-None-Pressurized-Flat-Plate-Calentador-Solar-Geyser-Solar-Water-Heater.jpg",
  "https://s.alicdn.com/%40sc04/kf/S94ab07b931504d31a3b89225c95aa1480/100L-120L-200L-300L-Non-Pressurized-Solar-Geyser-Solar-Water-Heater-System-for-Home-Commercial-Hotel-or-Residential.png_300x300.jpg",
  "https://image.made-in-china.com/2f0j00HUwoJEusZRpy/Roof-Top-180-Liters-Solar-Water-Geyser-with-SUS304-Tank-and-Color-Steel-Housing-for-India.webp",
  "https://images.openai.com/static-rsc-1/QHiBmyOZrnIU2lT1wTlE_sR6ERM8ae_fUVlKTHQsSMux_z0--RD9EmexSs952UGNNLJNCypLqrmum6qVEEQ5OoAMLaxRL6j3hDiiVn4l0tBiFh_efgfoPSCXEXCzQjYLEMr_FNV75yXrPd1KhOe6hg",
  "https://image.made-in-china.com/2f0j00OWvBzdVqGkbK/60kw-75kw-High-Power-Condensing-System-Wall-Hung-Gas-Boiler-for-Villa.webp",
  "https://www.warmhaus.com/storage/product/October2023/warmhaus-minerwa-combi-boilers-1.jpg",
  "https://www.viessmann-climatesolutions.com/content/dam/public-family-climatesolutions/news/2019/08-07/News_Gas-Brennwerttechnik-der-naechsten-Generation_jpg_Neue-GWG_Bild_1_Vitodens-Wandgeraete.jpg/_jcr_content/renditions/original./News_Gas-Brennwerttechnik-der-naechsten-Generation_jpg_Neue-GWG_Bild_1_Vitodens-Wandgeraete.jpg",
  "https://images.openai.com/static-rsc-1/aPJ3RSB3uAptSpqzj7s6uPl_NcDpOTJqzdNhly40kA3EQB9BUYmYM7BsdUa6cPb_FOgno8CLFLE26dNw2Q7BVNIJPwLjeLbsQKrWe_MbIXjBhizT-Y8jBvEFz_yOYhEWJi9nVDWKN5ex3p40svgrWA",
  "https://tiimg.tistatic.com/fp/1/008/417/gas-water-heater-755.jpg",
  "https://m.media-amazon.com/images/I/71Ue0oqqItL._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/71stAdJVOkL._AC_UF350%2C350_QL80_.jpg",
  "https://gaslandchef.com/cdn/shop/articles/035419ce-921e-48cb-ac97-8deb275c960f_d387ce17-4c60-46b5-a5cd-84745b2d95bc.jpg?v=1761901532",
  "https://image.made-in-china.com/365f3j00ZYioTdUIHCbu/16L-LPG-Propane-Gas-Instant-Digital-Gas-Gyser-Water-Heater-for-Home.webp",
  "https://m.media-amazon.com/images/I/41TDmGKwzAL._AC_UF1000%2C1000_QL80_.jpg",
  "https://www.jaquar.com/images/thumbs/0051309_image4.jpeg",
  "https://m.media-amazon.com/images/I/61q-Ve7smrL._AC_UF1000%2C1000_QL80_.jpg",
  "https://cdn.shopify.com/s/files/1/0843/7897/6562/files/what-is-a-point-of-use-water-heater-bathroom_1024x1024.jpg?v=1728388358",
  "https://m.media-amazon.com/images/I/51oYAh5Te8L._AC_UF1000%2C1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/51mab5hm9-L._AC_UF1000%2C1000_QL80_.jpg",
  "https://image.made-in-china.com/202f0j00TYUokRJWJqrv/High-Technology-Energy-Saving-3500W-Indoor-Small-Size-Digital-Display-Electric-Tankless-Water-Heater.jpg",
  "https://m.media-amazon.com/images/I/511c52JuLkL.jpg",
  "https://images.news18.com/ibnlive/uploads/2025/10/smart-water-geyser-2025-10-e4a05684a436619ef07d68f76bdc2313-16x9.png?height=225&impolicy=website&width=400",
  "https://glenindia.com/cdn/shop/articles/image_28_80e416c0-ebf1-446d-8be6-5f717369857e_1200x675.png?v=1764331803",
  "https://www.hydro-smart.com/cdn/shop/files/CombiPanel.png?v=1723143339&width=1024",
  "https://www.livemint.com/lm-img/img/2025/11/11/600x800/water_heaters_1762862662896_1762862670935_1762865544271.jpg",
  "https://m.media-amazon.com/images/I/71Hb46DvGUL._AC_UF894%2C1000_QL80_.jpg",
  "https://image.made-in-china.com/202f0j00nsFVNHtykoUD/Manufacture-Heating-System-Home-Use-Stainless-Steel-Hot-Water-Tank-60L-100L-200L-500L-1000L-Water-Heater-Tank-Water-Boiler-Heat-Pump-Water-Tank.webp",
  "https://s.alicdn.com/%40sc04/kf/Hb560d383bfd34fe28c2bef657602e4b5S/Custom-Good-Quality-300L-500L-3000L-Hot-Water-Boiler-Electric-Heat-Pump-Water-Heater-Boiler-tank-with-or-Without-Coil.jpg"
];

const categories = [
  'heater-storage',
  'heater-tankless',
  'heater-heat-pump',
  'heater-solar',
  'heater-condensing',
  'heater-electric-pump',
  'heater-gas',
  'heater-point-of-use',
  'heater-smart',
  'heater-hydrolic-boiler'
];

export default function WaterHeaterCollection() {
  const { categoryId } = useParams();
  const [cart, setCart] = useState([]);

  const catIndex = categories.indexOf(categoryId);
  
  if (catIndex === -1) {
    return <Navigate to="/water-heater" />;
  }

  const getProducts = () => {
    const defaultPrices = [12499, 14299, 18199, 22499, 28999];
    const defaultMRPs = [15499, 18499, 22999, 29499, 35999];
    
    // We have 45 images, gracefully handle 10 categories mapping to 5 each
    const startIndex = (catIndex * 5) % imageUrls.length;
    
    const fmtTitle = categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [0, 1, 2, 3, 4].map((i) => {
      const imgIndex = (startIndex + i) % imageUrls.length;
      return {
        id: `${categoryId}-${i+1}`,
        name: `Premium ${fmtTitle} - Model 0${i+1}`,
        description: `Experience limitless hot water and elegant modern design perfectly tailored for your luxury bathroom. Built with extreme precision.`,
        price: defaultPrices[i],
        mrp: defaultMRPs[i],
        image: imageUrls[imgIndex],
        rating: 4.5 + (i * 0.1),
        reviews: 120 + (i * 35)
      };
    });
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
    <div className="min-h-screen font-sans w-full overflow-y-auto bg-[#F4F6F8]">
      <header className="bg-white h-[70px] flex items-center justify-between px-6 text-gray-900 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/water-heater" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">{categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
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
