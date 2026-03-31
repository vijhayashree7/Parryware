import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Products from './components/Products';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import BasinPage from './components/BasinPage';
import FaucetsPage from './components/FaucetsPage';
import WaterHeaterPage from './components/WaterHeaterPage';
import ChimneyPage from './components/ChimneyPage';
import TilesSurfacePage from './components/TilesSurfacePage';
import ClosetPage from './components/ClosetPage';
import ProductDetail from './components/ProductDetail';
import CardinalCollection from './components/CardinalCollection';
import PraseoCollection from './components/PraseoCollection';
import QuattroCollection from './components/QuattroCollection';
import BasinCollection from './components/BasinCollection';
import WaterHeaterCollection from './components/WaterHeaterCollection';
import ClosetCollection from './components/ClosetCollection';
import ChimneyCollection from './components/ChimneyCollection';
import TilesSurfaceCollection from './components/TilesSurfaceCollection';

import GenericFaucetCollection from './components/GenericFaucetCollection';

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Blogs />
    </>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen font-sans bg-cozy-50 overflow-x-hidden">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basin" element={<BasinPage />} />
          <Route path="/faucets" element={<FaucetsPage />} />
          <Route path="/water-heater" element={<WaterHeaterPage />} />
          <Route path="/chimney" element={<ChimneyPage />} />
          <Route path="/tiles-and-surface" element={<TilesSurfacePage />} />
          <Route path="/closet" element={<ClosetPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/basin-collection/:categoryId" element={<BasinCollection />} />
          <Route path="/water-heater-collection/:categoryId" element={<WaterHeaterCollection />} />
          <Route path="/closet-collection/:categoryId" element={<ClosetCollection />} />
          <Route path="/chimney-collection/:categoryId" element={<ChimneyCollection />} />
          <Route path="/tiles-surface-collection/:categoryId" element={<TilesSurfaceCollection />} />
          <Route path="/faucet/cardinal-collection" element={<CardinalCollection />} />
          <Route path="/faucet/praseo-collection" element={<PraseoCollection />} />
          <Route path="/faucet/quattro-collection" element={<QuattroCollection />} />
          <Route path="/faucet-collection/:categoryId" element={<GenericFaucetCollection />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
