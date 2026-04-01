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
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

import BlogsPage from './pages/BlogsPage';
import BlogDetailsPage from './pages/BlogDetailsPage';

import Contact from './components/Contact';
import Catalog from './components/Catalog';
import Locations from './components/Locations';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import BasinPage from './components/BasinPage';
import FaucetsPage from './components/FaucetsPage';
import WaterHeaterPage from './components/WaterHeaterPage';
import ChimneyPage from './components/ChimneyPage';
import TilesSurfacePage from './components/TilesSurfacePage';
import ClosetPage from './components/ClosetPage';

import BasinCollection from './components/BasinCollection';
import CardinalCollection from './components/CardinalCollection';
import PraseoCollection from './components/PraseoCollection';
import QuattroCollection from './components/QuattroCollection';
import GenericFaucetCollection from './components/GenericFaucetCollection';
import WaterHeaterCollection from './components/WaterHeaterCollection';
import ChimneyCollection from './components/ChimneyCollection';
import TilesSurfaceCollection from './components/TilesSurfaceCollection';
import ClosetCollection from './components/ClosetCollection';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CartProvider>
      <div className="relative min-h-screen font-sans bg-transparent overflow-x-hidden flex flex-col">
        {/* Render BackgroundMist only on the home page (/) */}
        <Routes>
          <Route path="/" element={<BackgroundMist />} />
        </Routes>
        
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <CartSidebar />
        
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

            {/* Product Routes */}
            <Route path="/basin" element={<BasinPage />} />
            <Route path="/faucets" element={<FaucetsPage />} />
            <Route path="/water-heater" element={<WaterHeaterPage />} />
            <Route path="/chimney" element={<ChimneyPage />} />
            <Route path="/tiles-and-surface" element={<TilesSurfacePage />} />
            <Route path="/closet" element={<ClosetPage />} />

            {/* Product Collection Routes */}
            <Route path="/basin-collection/:categoryId" element={<BasinCollection />} />
            <Route path="/faucet/cardinal-collection" element={<CardinalCollection />} />
            <Route path="/faucet/praseo-collection" element={<PraseoCollection />} />
            <Route path="/faucet/quattro-collection" element={<QuattroCollection />} />
            <Route path="/faucet-collection/:categoryId" element={<GenericFaucetCollection />} />
            <Route path="/water-heater-collection/:categoryId" element={<WaterHeaterCollection />} />
            <Route path="/chimney-collection/:categoryId" element={<ChimneyCollection />} />
            <Route path="/tiles-surface-collection/:categoryId" element={<TilesSurfaceCollection />} />
            <Route path="/closet-collection/:categoryId" element={<ClosetCollection />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;