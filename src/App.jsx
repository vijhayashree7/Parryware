<<<<<<< HEAD
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Catalog from './components/Catalog';
import Locations from './components/Locations';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
=======
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
>>>>>>> 348b95b (Added new blog data and updates)

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
<<<<<<< HEAD
    <Router>
      <div className="relative min-h-screen font-sans bg-cozy-50 overflow-x-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
=======
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
        </Routes>
      </div>
      
      <Footer />
    </div>
>>>>>>> 348b95b (Added new blog data and updates)
  );
}

export default App;
