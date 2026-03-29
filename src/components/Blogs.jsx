import React from 'react';

const blogs = [
  {
    id: 1,
    title: 'Why Should You Choose a Countertop Basin?',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Elegant Bedroom Wall Tile Ideas to Suit Every Style',
    image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Creative Kitchen Chimney Design Ideas for Your Home',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80',
  }
];

const Blogs = () => {
  return (
    <section className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-16 border-b border-cozy-200 pb-6">
          <h2 className="text-4xl md:text-5xl font-serif text-cozy-900">Blogs</h2>
          <span className="text-cozy-600 uppercase tracking-widest text-sm font-medium hover:text-cozy-900 cursor-pointer transition-colors border-b border-transparent hover:border-cozy-900 pb-1">View All Blogs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <div key={blog.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6 aspect-w-4 aspect-h-3">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-72 object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-cozy-900 leading-snug group-hover:text-cozy-600 transition-colors">
                {blog.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
