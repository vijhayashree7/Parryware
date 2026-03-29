import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  { id: 1, title: 'Water Heaters', subtitle: 'Instant & Storage', color: 'from-cozy-600 to-cozy-800' },
  { id: 2, title: 'Closets', subtitle: 'Smart & Premium', color: 'from-cozy-300 to-cozy-500' },
  { id: 3, title: 'Basins', subtitle: 'Countertop & Wall Hung', color: 'from-zinc-300 to-zinc-500 text-cozy-900' },
  { id: 4, title: 'Faucets', subtitle: 'Elegant Designs', color: 'from-cozy-700 to-cozy-900' },
  { id: 5, title: 'Chimneys', subtitle: 'Modular Kitchens', color: 'from-stone-800 to-stone-950' },
  { id: 6, title: 'Tiles & Surfaces', subtitle: 'Imported Marble Textures', color: 'from-cozy-100 to-cozy-300 text-cozy-900' }
];

const Products = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-cozy-900 mb-4">Explore Product Categories</h2>
        <p className="text-lg text-cozy-600 font-light max-w-xl">Top-rated, best-selling products trusted and loved by our customers. Crafted with perfection.</p>
      </div>

      {/* Vertical Layout as requested */}
      <div className="flex flex-col gap-8 w-full">
        {categories.map((cat, index) => (
          <div 
            key={cat.id} 
            className={`group relative overflow-hidden rounded-2xl h-64 md:h-80 w-full flex items-end p-8 cursor-pointer transition-transform duration-500 hover:scale-[1.02] bg-gradient-to-br ${cat.color}`}
          >
            {/* Adding a subtle overlay gradient for depth */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            
            <div className="relative z-10 w-full flex justify-between items-end">
              <div>
                <p className={`text-sm tracking-widest uppercase mb-2 ${cat.color.includes('text-cozy-900') ? 'text-cozy-700/80' : 'text-cozy-200/80'}`}>{cat.subtitle}</p>
                <h3 className={`text-3xl md:text-4xl font-serif font-light ${cat.color.includes('text-cozy-900') ? 'text-cozy-900' : 'text-white'}`}>{cat.title}</h3>
              </div>
              
              <div className={`p-4 rounded-full border border-current backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${cat.color.includes('text-cozy-900') ? 'text-cozy-900' : 'text-white'}`}>
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
