import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';
import { CalendarDays, Share2, CornerUpLeft } from 'lucide-react';
import Blogs from '../components/Blogs'; // Reusing Blogs for the 'more blogs' section

const BlogDetailsPage = () => {
  const { id } = useParams();
  const blogId = parseInt(id);
  const blog = blogsData.find((b) => b.id === blogId);

  // Get next 3 blogs for 'related blogs'
  const relatedBlogs = blogsData.filter(b => b.id !== blogId).slice(0, 3);

  useEffect(() => {
    const el = document.getElementById('blog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [id]);

  if (!blog) {
    return (
      <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center bg-white flex-col gap-6">
        <h1 className="text-4xl font-sans text-gray-900">Blog not found</h1>
        <Link to="/blogs" className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
          Return to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-transparent pt-28 pb-10">
      <article className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Back button */}
        <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 text-sm font-medium">
          <CornerUpLeft className="w-4 h-4" />
          Back to all blogs
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-[42px] font-sans font-medium text-gray-900 mb-6 leading-tight max-w-4xl tracking-tight">
          {blog.title}
        </h1>

        {/* Meta (Date and Share) */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 stroke-[1.5]" /> 
            <span>{blog.date}</span>
          </div>
          <button className="flex items-center gap-2 hover:text-gray-900 transition-colors font-medium">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Main Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 mb-12 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg md:prose-xl max-w-none text-gray-700 font-sans 
            prose-headings:font-sans prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:mb-4
            prose-h3:text-2xl prose-h3:mt-10
            prose-p:leading-relaxed prose-p:mb-6
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
            prose-li:mb-2 prose-li:marker:text-gray-400"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Category: <span className="text-gray-900">{blog.category}</span></span>
            <Link to="/blogs" className="text-gray-900 font-semibold border-b border-gray-900 pb-0.5 hover:text-gray-600 transition-colors">
              Explore More Articles
            </Link>
          </div>
        </div>
      </article>

      {/* Recommended Blogs Section Below */}
      <div className="mt-20 pt-16 bg-transparent border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <h2 className="text-3xl font-serif text-cozy-900 mb-2">Related Articles</h2>
          <p className="text-cozy-600">Continue reading our latest insights.</p>
        </div>
        
        {/* We reuse the grid layout from BlogsPage/Blogs component but manually render the top 3 related ones */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 placeholder">
            {relatedBlogs.map((b) => (
              <Link 
                to={`/blog/${b.id}`}
                key={b.id} 
                className="group relative rounded-[2rem] overflow-hidden cursor-pointer h-[400px] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end"
              >
                <div className="absolute inset-0">
                  <img 
                    src={b.image} 
                    alt={b.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="relative p-6 z-10 flex flex-col justify-end">
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:underline decoration-white/30 underline-offset-4">{b.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{b.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
