import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const rawUrls = "https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/blog%205-b0c3e5c0-9d0c-46e3-84bd-9c6c02760b01.webp,https://img.archiexpo.com/images_ae/photo-mg/153953-10783835.jpg,https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/blog%2018-9f815049-2d8c-443d-986e-e64cea938255.webp,https://glenindia.com/cdn/shop/products/5_92a705bd-c778-4779-aded-252d698b1f71.jpg?v=1633849755&width=800,https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/how-to-choose-the-perfect-kitchen-chimney-for-your-home-ce2d0275-606b-4e98-96f3-9086aed67677.webp,https://www.asenseinterior.com/assets/uploads/bf3fcd33da39df4dadb9d477c171e6c6.webp,https://beyondappliances.in/cdn/shop/articles/blog_2021-d05e4a53-f5f9-4558-9c62-90d8d86b0406_615e6f13-8ab3-4612-a3f1-09f7448eae84.webp?v=1767775808&width=1024,https://blog.sfapp.magefan.top/media/glen-india.myshopify.com/images/1%20Chimney/image3.jpg,https://s.alicdn.com/%40sc04/kf/H8ade2f6db60b4cbabf7dd74f57fa6a246/AI-Smart-Island-Chimney-Range-Hoods-Kitchen-Extractor-Round-Copper-Island-Hood-Range-Stainless-Steel-for-Hotel-Household.png_300x300.jpg,https://www.navilu.in/uploads/productimage/island-ceiling-mounted-kitchen-chimney-1.jpg,https://www.asenseinterior.com/assets/uploads/bf3fcd33da39df4dadb9d477c171e6c6.webp,https://st.hzcdn.com/simgs/7361f90f08e32afb_14-0969/_.jpg,https://robamliving.com/cdn/shop/collections/Built-In_Range_Hood_3_74bbdbea-12ed-4ccc-8cf1-08cd01fa24f6.png?v=1766753904,https://images.squarespace-cdn.com/content/v1/54d11035e4b05e3af80ed873/4b4b1b48-066d-47fb-ba9c-1d0338e3f6d1/concealed%2Brange%2Bhood.jpg,https://www.worldcoppersmith.com/media/.renditions/imagegallery/CopperSmith-DS1-Brass-Range-Hood-009.jpg,https://www.fobestappliance.com/cdn/shop/files/Fobest-Custom-White-Range-Hood-with-Curved-Corner-FSS-29-Stainless-Steel-Range-Hood.webp?v=1745746604,https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/brandimages/5-af9b0079-fb0f-4609-bc29-d31d6fff089c.webp,https://cdn.shopify.com/s/files/1/0558/5557/9327/files/128_480x480.jpg?v=1686336898,https://img.edilportale.com/product-thumbs/b_SOLARIS-FABER-425736-rel3871ab56.jpg,https://www.cliqstudios.com/media/wysiwyg/CliqStudios_Zline_Range_Hood_KBCRN-36_2_1200x800px_.png,https://glenindia.com/cdn/shop/files/Chimney_Rica-07.jpg?v=1764134876&width=800,https://glenindia.com/cdn/shop/files/7-min.jpg?v=1709534418&width=800,https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/blog%202-16813081-cea8-48f7-95ec-c753d6e25efd.webp,https://glenindia.com/cdn/shop/files/Chimney_MESH-04.jpg?v=1764134793&width=800,https://glenindia.com/cdn/shop/files/3-min.jpg?v=1709534418&width=800,https://glenindia.com/cdn/shop/files/Chimney_MESH-04.jpg?v=1764134793&width=800,https://beyondapp-prodin.sangria.tech/blogs/_next/image?q=75&url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Fbeyondapp%2Fblogimages%2Fhow-to-choose-the-perfect-kitchen-chimney-for-your-home-ce2d0275-606b-4e98-96f3-9086aed67677.webp&w=3840,https://m.media-amazon.com/images/I/61MWM6WAzOL.jpg,https://glenindia.com/cdn/shop/files/6052-US-BL-AC-02-_2049x2049_6ca481cd-8455-4236-9861-6b47b8b5b209.jpg?v=1764761554&width=800,https://glenindia.com/cdn/shop/files/2_3057d28b-a858-476f-898c-26babeef30b7.jpg?v=1764761554&width=800,https://m.media-amazon.com/images/I/61Pi0S6BwIS._AC_UF350%2C350_QL80_.jpg,https://images.woodenstreet.de/image/data/blog-images/kitchen-chimney/chimney-for-kitchen.jpg,https://glenindia.com/cdn/shop/files/Suction-power_b24dfd53-d56b-4e15-b2b8-a21b286bd00f.jpg?v=1771060171&width=800,https://st.hzcdn.com/simgs/c94105080bb83edd_14-6524/_.jpg,https://www.jiomart.com/images/product/original/rvwqu1h4f3/ampereus-premium-quality-6-inch-chimney-exhaust-duct-pipe-silver-color-expend-till-6-feet-with-cowl-cover-and-aluminium-tape-suitable-for-all-brand-product-images-orvwqu1h4f3-p603359638-5-202503241506.jpg?im=Resize%3D%28420%2C420%29,https://beyondappliances.in/cdn/shop/articles/5-af9b0079-fb0f-4609-bc29-d31d6fff089c.webp?v=1774430400&width=1200,https://m.media-amazon.com/images/I/815fZWP7STL._AC_UF894%2C1000_QL80_.jpg,https://glenindia.com/cdn/shop/files/duct-free.jpg?v=1768458862&width=800,https://glenindia.com/cdn/shop/files/No-ducting_d5b6776f-7da7-4ebb-8ed5-bb86958287a6.jpg?v=1768458862&width=800,https://m.media-amazon.com/images/I/61ej9d3e4DL._AC_UF350%2C350_QL80_.jpg,https://theelectriconline.com/cdn/shop/files/pl1_aa26bb5c-1ee2-4152-b81d-fca1e0921d8b.webp?v=1736493318&width=1214,https://img.tatacliq.com/images/i25//1348Wx2000H/MP000000027240295_1348Wx2000H_202507041726311.jpeg,https://www.livemint.com/lm-img/img/2026/03/23/1600x900/logo/Best_Chimneys_for_Indian_homes_1774281192606_1774281200413.jpg,https://www.asenseinterior.com/assets/uploads/bf3fcd33da39df4dadb9d477c171e6c6.webp,https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/how-to-choose-the-perfect-modern-chimney-design-126a4f38-5e12-4af3-bd96-76ea283288e5.webp,https://images.woodenstreet.de/image/data/modular%20kitchen/RadianceU.jpg,https://d1msew97rp2nin.cloudfront.net/prodin/beyondapp/blogimages/blog%205-b0c3e5c0-9d0c-46e3-84bd-9c6c02760b01.webp,https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/kitchenaid/en-us/marketing-content/site-assets/page-content/blog/range-hood-sizes/range-hood-sizes_2.jpg?fit=constrain&fmt=jpg&hei=2200&hei=600&resMode=sharp2&utc=2021-09-08T17%3A07%3A25Z,https://dropinblog.net/34241741/files/featured/trhs-best-under-cabinet-range-hoods.jpg,https://d6y5eqdcxq8w3.cloudfront.net/magento-media/catalog/product/2/c/2c15f5f4-f51c-4521-bfd0-40a7aef63256.jpg?w=640";

const imageUrls = rawUrls.split(',').map(s => s.trim()).filter(Boolean); // removes empty strings

const categories = [
  'chimney-wall-mounted',
  'chimney-island',
  'chimney-built-in',
  'chimney-corner',
  'chimney-auto-clean',
  'chimney-filterless',
  'chimney-ducted',
  'chimney-ductless',
  'chimney-smart',
  'chimney-slim'
];

export default function ChimneyCollection() {
  const { categoryId } = useParams();
  const { cart, addToCart, removeFromCart, updateQuantity, setIsSidebarOpen, getProductMin, getProductStep } = useCart();

  const catIndex = categories.indexOf(categoryId);
  
  if (catIndex === -1) {
    return <Navigate to="/chimney" />;
  }

  const getProducts = () => {
    const defaultPrices = [18499, 22299, 26199, 32499, 45999];
    const defaultMRPs = [22499, 27499, 31999, 39499, 52999];
    
    // We have 50 URLs, gracefully handle perfectly mapped 5 each
    const startIndex = (catIndex * 5) % imageUrls.length;
    
    // Create a beautiful properly cased title from category id
    const fmtTitle = categoryId.replace('chimney-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [0, 1, 2, 3, 4].map((i) => {
      const imgIndex = (startIndex + i) % imageUrls.length;
      return {
        id: `${categoryId}-${i+1}`,
        name: `Premium ${fmtTitle} Chimney - Model 0${i+1}`,
        description: `Experience uncompromising extraction power and elegant modern design perfectly tailored for your luxury kitchen. Built with extreme precision.`,
        price: defaultPrices[i],
        mrp: defaultMRPs[i],
        image: imageUrls[imgIndex],
        rating: 4.5 + (i * 0.1),
        reviews: 210 + (i * 35)
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
          <Link to="/chimney" className="hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold tracking-tight">{categoryId.replace('chimney-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
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
