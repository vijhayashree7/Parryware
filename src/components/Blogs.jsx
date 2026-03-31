import React from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';

const Blogs = () => {
  // As requested, strictly slice to exactly 3 blogs to display on the homepage
  const topBlogs = blogsData.slice(0, 3);

  return (
    <section className="py-24 bg-transparent px-6 md:px-12 relative" id="blog-section">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Minimalist Centered Title with absolute right link matching screenshot */}
        <div className="flex justify-center flex-col md:flex-row md:items-center relative mb-16">
          <h2 className="text-6xl md:text-[5rem] font-serif font-light text-cozy-900 tracking-wide drop-shadow-sm text-center">
            Blogs
          </h2>
          <Link 
            to="/blogs" 
            className="md:absolute right-0 mt-6 md:mt-0 text-[10px] tracking-[0.2em] font-bold uppercase text-cozy-900 border-b border-cozy-400 pb-1 self-center hover:text-cozy-500 hover:border-cozy-500 transition-colors pointer-events-auto"
          >
            View All Blogs
          </Link>
        </div>

        {/* Restored the beautiful dark rounded cards CSS from the original layout! */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {topBlogs.map((blog) => (
            <Link 
              to={`/blog/${blog.id}`}
              key={blog.id} 
              className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer h-[460px] shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-end"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                 <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                 />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-100"></div>

              {/* Tag and Date - Hidden by default, reveals on hover */}
              <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                 <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-white uppercase border border-white/20 shadow-sm">
                   {blog.category}
                 </span>
                 <span className="text-white/90 text-[11px] font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                   {blog.date}
                 </span>
              </div>

              {/* Content */}
              <div className="relative p-6 px-8 z-10 flex flex-col justify-end">
                <h3 className="text-[1.35rem] font-serif text-white mb-3 leading-snug drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500">
                  {blog.title}
                </h3>
                
                {/* Description - Hidden by default, expands on hover */}
                <p className="text-white/80 text-[13px] mb-6 font-medium line-clamp-3 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[100px] transition-all duration-500 overflow-hidden">
                  {blog.description}
                </p>

                {/* Footer - Views and Read Time with Circular Arrow Button */}
                <div className="flex items-center justify-between border-transparent pt-4 mt-2 transition-all duration-500 border-t group-hover:border-white/20">
                  <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">
                    {blog.meta}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10 group-hover:bg-white group-hover:text-black text-white transition-all backdrop-blur-sm shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;
