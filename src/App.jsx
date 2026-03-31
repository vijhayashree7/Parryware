import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import BackgroundMist from './components/BackgroundMist';

import BlogsPage from './pages/BlogsPage';
import BlogDetailsPage from './pages/BlogDetailsPage';

import Contact from './components/Contact';
import Catalog from './components/Catalog';
import Locations from './components/Locations';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen font-sans bg-transparent overflow-x-hidden flex flex-col">
      <BackgroundMist />
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Products />
              <WhyChooseUs />
              <div id="blog-section">
                <Blogs />
              </div>
            </>
          } />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
