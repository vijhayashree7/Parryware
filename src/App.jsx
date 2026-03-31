import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import BackgroundMist from './components/BackgroundMist'; // ✅ ADD THIS

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen font-sans bg-transparent overflow-x-hidden flex flex-col">
      <BackgroundMist />
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main>
        <Hero />
        <Products />
        <Blogs />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;