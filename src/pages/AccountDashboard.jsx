import React, { useState, useEffect } from 'react';
import { 
  User, 
  Package, 
  Shield, 
  LogOut, 
  ChevronRight, 
  Clock, 
  MapPin, 
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import smokeBg from '../assets/smoke-bg.jpg';

const AccountDashboard = () => {
  const { user, logout } = useAuth();
  const { orders } = useProducts();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const userOrders = orders.filter(o => o.cx === user?.name || o.email === user?.email);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF9] pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#3E2723] mb-4">Member Sanctuary</h1>
            <p className="text-[#A68966] text-[10px] uppercase tracking-[0.4em] font-black">Authentication Verified • {user?.name}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-[10px] uppercase tracking-widest transition-colors mb-2"
          >
            <LogOut size={16} />
            Detach Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-[#3E2723] text-white shadow-xl translate-x-2' 
                    : 'bg-white text-[#3E2723] hover:bg-[#F5F0EB]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 1.5} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                </div>
                <ChevronRight size={14} className={activeTab === tab.id ? 'opacity-100' : 'opacity-20'} />
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[40px] border border-[#F0E6DD] shadow-2xl p-8 md:p-12 relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96)), url(${smokeBg})`, backgroundSize: 'cover' }}
              >
                
                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24 rounded-3xl bg-[#3E2723] flex items-center justify-center text-white text-3xl font-serif">
                        {user?.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-serif text-3xl text-[#3E2723] mb-1">{user?.name}</h3>
                        <p className="text-[#8D6E63] font-medium tracking-wide">{user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-[#FDFBF9] rounded-3xl border border-[#F0E6DD] space-y-4">
                        <div className="flex items-center gap-3 text-[#A68966]">
                          <Clock size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Active Since</span>
                        </div>
                        <p className="text-[13px] text-[#3E2723] font-bold uppercase tracking-tight">Enrolled Apr 2026</p>
                      </div>
                      <div className="p-8 bg-[#FDFBF9] rounded-3xl border border-[#F0E6DD] space-y-4">
                        <div className="flex items-center gap-3 text-[#A68966]">
                          <Package size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Total Orders</span>
                        </div>
                        <p className="text-[13px] text-[#3E2723] font-bold uppercase tracking-tight">{userOrders.length} Completed / Pending</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3E2723]/30 border-b border-[#F0E6DD] pb-4">Digital Identity Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#8D6E63] font-bold">Email Handle</label>
                          <p className="font-serif text-lg text-[#3E2723]">{user?.email}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#8D6E63] font-bold">Phone Link</label>
                          <p className="font-serif text-lg text-[#3E2723] opacity-30 italic">Not Linked</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ORDERS TAB */}
                {activeTab === 'orders' && (
                  <div className="space-y-8">
                    <h3 className="font-serif text-3xl text-[#3E2723]">Ordering History</h3>
                    
                    {userOrders.length > 0 ? (
                      <div className="space-y-6">
                        {userOrders.map((order, idx) => (
                          <div key={idx} className="p-8 bg-white border border-[#F0E6DD] rounded-3xl group hover:border-[#A68966] transition-all duration-500 shadow-sm hover:shadow-xl">
                            <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
                              <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#F5F0EB] rounded-2xl flex items-center justify-center text-[#A68966]">
                                  <Package size={24} />
                                </div>
                                <div>
                                  <p className="text-[#3E2723] font-black uppercase tracking-widest text-[13px] mb-1">{order.id}</p>
                                  <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-widest">{order.date}</p>
                                </div>
                              </div>
                              <div className="flex flex-col md:items-end gap-2">
                                <p className="font-serif text-xl text-[#3E2723]">{order.total}</p>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
                                  <CheckCircle2 size={12} />
                                  <span className="text-[9px] font-black uppercase tracking-widest">{order.delivery}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[#F5F0EB] space-y-8">
                              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#8D6E63]">
                                <span>Collection Summary</span>
                                <span>Estimated Dispatch: 2 Days</span>
                              </div>
                              
                              <p className="text-[12px] text-[#3E2723] font-serif italic truncate max-w-[400px]">
                                {order.items.join(' • ')}
                              </p>

                              {/* Luxury Tracking Progress Bar */}
                              <div className="relative pt-10 pb-4">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#F0E6DD]"></div>
                                <div className="flex items-center justify-between relative">
                                  {[
                                    { label: 'Confirmed', status: 'done' },
                                    { label: 'Crafting', status: 'done' },
                                    { label: 'Transit', status: 'active' },
                                    { label: 'Arrival', status: 'pending' }
                                  ].map((step, sIdx) => (
                                    <div key={sIdx} className="flex flex-col items-center gap-3 relative z-10">
                                      <div className={`w-3 h-3 rounded-full border-2 transition-all duration-700 ${
                                        step.status === 'done' ? 'bg-[#3E2723] border-[#3E2723]' : 
                                        step.status === 'active' ? 'bg-white border-[#A68966] scale-125 shadow-[0_0_10px_rgba(166,137,102,0.4)]' : 
                                        'bg-white border-[#F0E6DD]'
                                      }`} />
                                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors ${
                                        step.status === 'pending' ? 'text-[#D1C6BD]' : 'text-[#3E2723]'
                                      }`}>
                                        {step.label}
                                      </span>
                                    </div>
                                  ))}
                                  {/* Progress Line Overlay */}
                                  <div className="absolute top-[5.5px] left-0 w-2/3 h-[2px] bg-[#3E2723]/30 z-0 opacity-20"></div>
                                </div>
                              </div>

                              <div className="pt-4 flex items-center justify-between">
                                <span className="text-[9px] text-green-700 font-bold uppercase tracking-widest flex items-center gap-2">
                                  <CheckCircle2 size={10} /> Live Tracking Active
                                </span>
                                <button className="text-[10px] font-black text-[#A68966] uppercase tracking-widest hover:text-[#3E2723] transition-all border-b border-transparent hover:border-[#3E2723] pb-1">
                                  View Full Registry Record
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center space-y-6">
                        <div className="w-20 h-20 bg-[#F5F0EB] rounded-full flex items-center justify-center mx-auto opacity-50">
                          <Package size={32} strokeWidth={1} />
                        </div>
                        <p className="text-[#8D6E63] font-serif text-xl italic">No luxury acquisitions detected in your registry.</p>
                        <button 
                          onClick={() => navigate('/catalog')}
                          className="px-10 py-4 bg-[#3E2723] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all"
                        >
                          Explore Collections
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SECURITY TAB */}
                {activeTab === 'security' && (
                  <div className="space-y-12">
                    <h3 className="font-serif text-3xl text-[#3E2723]">Account Sanctuary & Privacy</h3>
                    
                    <div className="space-y-8">
                      <div className="p-8 bg-[#FDFBF9] border border-[#F0E6DD] rounded-3xl space-y-6">
                        <div className="flex items-center gap-4 text-[#A68966]">
                          <Shield size={20} />
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Credential Management</h4>
                        </div>
                        <div className="space-y-6">
                          <p className="text-[12px] text-[#8D6E63] leading-relaxed max-w-lg">
                            Ensure your sanctuary remains private by updating your passkey regularly. We recommend a complex alphanumeric sequence for maximum registry security.
                          </p>
                          
                          <form className="space-y-4 max-w-md pt-4" onSubmit={(e) => { e.preventDefault(); alert('Security Registry Updated'); }}>
                            <div className="space-y-1">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[#8D6E63] opacity-60">Existing Passkey</label>
                              <input type="password" placeholder="••••••••" className="w-full bg-white border border-[#F0E6DD] rounded-xl px-5 py-4 text-xs font-serif focus:border-[#A68966] focus:ring-0 outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[#8D6E63] opacity-60">Revised Secret</label>
                              <input type="password" placeholder="••••••••" className="w-full bg-white border border-[#F0E6DD] rounded-xl px-5 py-4 text-xs font-serif focus:border-[#A68966] focus:ring-0 outline-none transition-all" />
                            </div>
                            <button 
                              type="submit"
                              className="w-full py-4 bg-[#3E2723] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl shadow-[#3E2723]/10 mt-2"
                            >
                              Update Credentials
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="p-8 bg-red-50/50 border border-red-100 rounded-3xl space-y-6">
                        <div className="flex items-center gap-4 text-red-700">
                          <AlertCircle size={20} />
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Danger Zone</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-[12px] text-red-600/70 leading-relaxed max-w-lg">
                            Permanently expunge your identity and ordering records from our secure registry. This action is irreversible.
                          </p>
                          <button className="px-8 py-4 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                            Expunge Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
