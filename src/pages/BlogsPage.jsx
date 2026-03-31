import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';

const BlogsPage = () => {
  useEffect(() => {
    const el = document.getElementById('blog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-cozy-50 pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="mb-16 border-b border-cozy-200 pb-10">
          <h1 className="text-5xl md:text-6xl font-serif text-cozy-900 mb-4">Our Blog</h1>
          <p className="text-cozy-600 text-lg md:text-xl font-light">Insights, tips, and trends to inspire your next home transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blogsData.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.id}`}
              className="group relative rounded-[2rem] overflow-hidden flex flex-col h-[460px] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                 <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white uppercase border border-white/20">
                   {blog.category}
                 </span>
                 <span className="text-white/80 text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                   {blog.date}
                 </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-serif text-white mb-3 leading-tight drop-shadow-md decoration-[1.5px] decoration-white/30 underline-offset-[6px] group-hover:underline">
                  {blog.title}
                </h3>
                <p className="text-white/80 text-sm mb-6 font-medium line-clamp-3 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[100px] transition-all duration-500 overflow-hidden">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs font-medium uppercase tracking-wider">{blog.meta}</span>
                  <div className="bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full p-2.5 transition-colors border border-white/20 relative group/btn overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
