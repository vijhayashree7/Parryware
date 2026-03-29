import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Products from './components/Products';
import Blogs from './components/Blogs';
import Footer from './components/Footer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen font-sans bg-cozy-50 overflow-x-hidden">
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
