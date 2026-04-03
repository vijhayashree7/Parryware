import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingCart, CalendarCheck, UtensilsCrossed, Users, 
  Truck, Settings, Search, Plus, LogOut, Edit, Trash2, X, ArrowLeft, 
  ChevronDown, ChevronUp, Bell, CheckCircle2, Tag, Lock
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'menu', label: 'Manage Products', icon: UtensilsCrossed },
];

const AVAILABLE_TAGS = ['Offer', 'Discount', 'Best Seller', 'Prime Products'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default to dashboard to see charts
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus } = useProducts();
  
  // Tag / Variant states for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', mrp: '', image: '', tags: [], variants: [] });
  const [toastMessage, setToastMessage] = useState(null);

  // Show a mock Toast SMS notification
  const notifySMS = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        mrp: product.mrp || (product.price * 1.5) || '',
        image: product.image || '',
        tags: product.tags || [],
        variants: product.variants || []
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', mrp: '', image: '', tags: [], variants: [] });
    }
    setIsModalOpen(true);
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  const addVariantField = () => {
    setFormData(prev => ({ ...prev, variants: [...prev.variants, { id: Date.now(), key: '', value: '' }] }));
  };
  
  const updateVariant = (id, field, val) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.id === id ? { ...v, [field]: val } : v)
    }));
  };

  const removeVariant = (id) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter(v => v.id !== id) }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      mrp: Number(formData.mrp),
      category: 'faucets',
      rating: 4.8,
      reviews: 100
    };

    if (editingProduct) updateProduct(editingProduct.id, payload);
    else addProduct(payload);
    
    setIsModalOpen(false);
    notifySMS(editingProduct ? 'Product Updated Successfully' : 'Product Added Successfully');
  };

  // User Analytics state
  const [analyticsFilter, setAnalyticsFilter] = useState('Daily');
  const [baseStats, setBaseStats] = useState({ loggedIn: 120, signedUp: 45, visitors: 3450 });

  useEffect(() => {
    // Simulate real-time stats updating to simulate users coming in
    const interval = setInterval(() => {
      setBaseStats(prev => ({
        loggedIn: prev.loggedIn + Math.floor(Math.random() * 3),
        signedUp: prev.signedUp + Math.floor(Math.random() * 2),
        visitors: prev.visitors + Math.floor(Math.random() * 5)
      }));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const getAnalytics = (filter) => {
    const mult = filter === 'Daily' ? 1 : filter === 'Weekly' ? 7 : 30;
    return { 
      loggedIn: baseStats.loggedIn * mult, 
      signedUp: baseStats.signedUp * mult, 
      visitors: baseStats.visitors * mult 
    };
  };
  const currentStats = getAnalytics(analyticsFilter);

  // Mock Recharts Data
  const revenueData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 6000 },
    { name: 'Thu', revenue: 8000 },
    { name: 'Fri', revenue: 5000 },
    { name: 'Sat', revenue: 12000 },
    { name: 'Sun', revenue: 14000 },
  ];

  const categoryData = [
    { name: 'Faucets', sales: 400 },
    { name: 'Basins', sales: 300 },
    { name: 'Heaters', sales: 200 },
    { name: 'Closets', sales: 278 },
    { name: 'Tiles', sales: 189 },
  ];

  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleUpdateStatus = (id, field, value) => {
    updateOrderStatus(id, field, value);
    
    // Trigger mock SMS
    if (field === 'packed' && value === true) {
      notifySMS(`📞 SMS Sent: Order ${id} has been packed!`);
    } else if (field === 'delivery') {
      if (value === 'In Transit') notifySMS(`📞 SMS Sent: Order ${id} is in transit!`);
      if (value === 'Delivered') notifySMS(`📞 SMS Sent: Order ${id} has been delivered!`);
    }
  };

  return (
    <div className="flex h-screen text-[#E1D3C8] font-sans overflow-hidden relative" style={{ backgroundImage: "url('/admin_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#2b1c11]/85 z-0 pointer-events-none mix-blend-multiply"></div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 border border-green-400"
          >
            <CheckCircle2 size={18} /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-[280px] bg-[#362316]/90 backdrop-blur-sm border-r border-[#523A2A]/50 flex flex-col h-full flex-shrink-0 relative z-10 transition-colors">
        <div className="p-8 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-[#E1D3C8] hover:text-[#F08804] transition-colors p-2 -ml-2 rounded-full hover:bg-white/5">
            <ArrowLeft size={20} />
          </button>
          <div className="text-2xl font-black tracking-tighter text-white">
            PARRYWARE<span className="text-[#F08804]">.</span>
          </div>
        </div>
        <p className="px-8 text-[10px] uppercase tracking-widest text-white font-bold mb-4">Admin Dashboard</p>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive ? 'bg-[#4A3222] text-[#F08804] border border-[#6D4A38]' : 'text-[#A8988D] hover:text-white hover:bg-[#4A3222]/50'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-[80px] border-b border-[#523A2A]/50 bg-[#362316]/90 backdrop-blur-sm flex items-center justify-between px-8 flex-shrink-0 sticky top-0 transition-colors">
          <h2 className="text-lg font-bold text-white capitalize tracking-wide flex items-center gap-2">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-3 bg-[#4A3222] py-1.5 px-3 rounded-full border border-[#6D4A38]">
            <div className="w-7 h-7 rounded-full bg-[#F08804] flex items-center justify-center text-[#362316] font-bold text-xs">AD</div>
            <div className="text-xs pr-2">
              <p className="text-white font-bold leading-none">Admin User</p>
              <p className="text-[#BBA594] text-[10px] mt-0.5">Manager</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          
          {/* 1. Dashboard Tab & User Analytics */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Analytics Header */}
              <div className="flex justify-between items-center bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg">
                <div>
                  <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">User Analytics Overview</h3>
                  <p className="text-[#BBA594] text-xs">Track user activity, logins, and direct page metrics.</p>
                </div>
                <div className="flex bg-[#2D1B12] rounded-lg p-1 border border-[#523A2A]">
                  {['Daily', 'Weekly', 'Monthly'].map(f => (
                    <button key={f} onClick={() => setAnalyticsFilter(f)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${analyticsFilter === f ? 'bg-[#F08804] text-[#2D1B12]' : 'text-[#BBA594] hover:text-white'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg">
                  <p className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold mb-2">Users Logged In ({analyticsFilter})</p>
                  <h3 className="text-4xl font-bold text-white tracking-tight">{currentStats.loggedIn.toLocaleString()}</h3>
                </div>
                <div className="bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg">
                  <p className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold mb-2">New Signups ({analyticsFilter})</p>
                  <h3 className="text-4xl font-bold text-white tracking-tight">{currentStats.signedUp.toLocaleString()}</h3>
                </div>
                <div className="bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-5"><Users size={120} /></div>
                  <p className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold mb-2">Total Visitors / Views</p>
                  <h3 className="text-4xl font-bold text-[#F08804] tracking-tight">{currentStats.visitors.toLocaleString()}</h3>
                </div>
              </div>

              {/* Recharts Data Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg h-[350px] flex flex-col">
                  <h4 className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold mb-4">Revenue Pulse (Last 7 Days)</h4>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#523A2A" vertical={false} />
                        <XAxis dataKey="name" stroke="#A8988D" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                        <YAxis stroke="#A8988D" tick={{fontSize: 10}} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                        <RechartsTooltip contentStyle={{backgroundColor: '#362316', borderColor: '#523A2A', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#F08804'}} />
                        <Line type="monotone" dataKey="revenue" stroke="#F08804" strokeWidth={3} dot={{fill: '#4A3222', stroke: '#F08804', strokeWidth: 2, r: 4}} activeDot={{r: 6, fill: '#F08804'}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg h-[350px] flex flex-col">
                  <h4 className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold mb-4">Category Sales Volume</h4>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#523A2A" vertical={false} />
                        <XAxis dataKey="name" stroke="#A8988D" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                        <YAxis stroke="#A8988D" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                        <RechartsTooltip cursor={{fill: '#523A2A', opacity: 0.4}} contentStyle={{backgroundColor: '#362316', borderColor: '#523A2A', color: '#fff', borderRadius: '8px'}} itemStyle={{color: '#8c7462'}} />
                        <Bar dataKey="sales" fill="#8c7462" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Order Management Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl shadow-lg">
                <div>
                  <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Order Management</h3>
                  <p className="text-[#BBA594] text-xs">Total Orders Received: <span className="text-[#F08804] font-bold">{orders.length}</span></p>
                </div>
              </div>

              <div className="bg-[#3E2A1E] border border-[#523A2A] rounded-2xl overflow-hidden shadow-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#362316] text-[#BBA594] text-[10px] uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4 font-bold">Order Details</th>
                      <th className="px-6 py-4 font-bold">Customer</th>
                      <th className="px-6 py-4 font-bold">Packaging</th>
                      <th className="px-6 py-4 font-bold">Delivery Status</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#523A2A]">
                    {orders.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="hover:bg-[#4A3222] transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-white leading-none mb-1">{row.id}</p>
                            <p className="text-[10px] text-[#A8988D] uppercase">{row.date}</p>
                          </td>
                          <td className="px-6 py-4 text-[#D3C7BE]">{row.cx}</td>
                          <td className="px-6 py-4">
                            <select 
                              value={row.packed ? 'packed' : 'not_packed'} 
                              onChange={(e) => handleUpdateStatus(row.id, 'packed', e.target.value === 'packed')}
                              className={`bg-[#2D1B12] text-xs font-bold px-3 py-1.5 rounded-full border outline-none ${row.packed ? 'border-green-500/50 text-green-400' : 'border-red-500/50 text-red-400'}`}
                            >
                              <option value="not_packed">Not Packed</option>
                              <option value="packed">Packed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              value={row.delivery} 
                              onChange={(e) => handleUpdateStatus(row.id, 'delivery', e.target.value)}
                              className="bg-[#2D1B12] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-500/50 text-blue-400 outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => setExpandedOrder(expandedOrder === row.id ? null : row.id)}
                              className="text-xs font-bold text-[#F08804] hover:underline"
                            >
                              {expandedOrder === row.id ? 'Hide Details' : 'View Details'}
                            </button>
                          </td>
                        </tr>
                        {expandedOrder === row.id && (
                          <tr className="bg-[#2D1B12]/80">
                            <td colSpan={5} className="px-6 py-4 border-l-4 border-[#F08804]">
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div>
                                  <p className="text-xs font-bold text-[#BBA594] uppercase tracking-widest mb-2">Order Items:</p>
                                  <ul className="list-disc list-inside space-y-1 mb-3">
                                    {row.items.map((it, idx) => <li key={idx} className="text-sm text-white">{it}</li>)}
                                  </ul>
                                  <p className="text-xs text-[#BBA594]">Total Amount: <span className="text-white font-bold text-sm tracking-wider">{row.total}</span></p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-[10px] text-[#A8988D] uppercase font-bold tracking-widest">Update Tracking & Notify Customer</p>
                                  <div className="flex gap-2">
                                    <input type="text" placeholder="AWB / Tracking Link" className="bg-[#3E2A1E] text-white text-xs px-3 py-2 rounded-lg border border-[#523A2A] outline-none focus:border-[#F08804] w-48" id={`track-${row.id}`} />
                                    <button onClick={() => {
                                      const val = document.getElementById(`track-${row.id}`).value;
                                      if(val) notifySMS(`📞 SMS to Mobile: Your Order ${row.id} Tracking Details: ${val}`);
                                    }} className="bg-[#F08804] text-[#2D1B12] text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-lg hover:bg-[#d67800] transition-colors">Send SMS</button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Manage Menu / Products Tab */}
          {activeTab === 'menu' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-[#3E2A1E] border border-[#523A2A] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
                <div>
                  <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Inventory Control</h3>
                  <p className="text-[#BBA594] text-xs">Manage products, tags, dynamic variant fields, and pricing.</p>
                </div>
                <button 
                  onClick={() => handleOpenModal()}
                  className="bg-[#F08804] hover:bg-[#d67800] text-[#362316] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-md"
                >
                  <Plus size={16} strokeWidth={3} /> Add Product
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-[#3E2A1E] rounded-2xl overflow-hidden border border-[#523A2A] hover:border-[#F08804] transition-colors group flex flex-col shadow-lg relative">
                    
                    {/* Render Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                        {product.tags.map(tag => (
                          <span key={tag} className="bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="relative h-48 bg-[#2b1c11] flex items-center justify-center p-4">
                      <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-plus-lighter" />
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button onClick={() => handleOpenModal(product)} className="w-8 h-8 rounded-full bg-black/60 shadow-lg border border-white/10 flex items-center justify-center text-white hover:text-[#F08804] transition-colors"><Edit size={14} /></button>
                        <button onClick={() => deleteProduct(product.id)} className="w-8 h-8 rounded-full bg-black/60 shadow-lg border border-white/10 flex items-center justify-center text-white hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h4 className="text-white font-bold leading-snug line-clamp-2 text-sm mb-1">{product.name}</h4>
                      <span className="text-[#F08804] font-black tracking-tight mb-3">₹{product.price}</span>
                      
                      {/* Render Variant Info */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.variants.map((v, i) => (
                            <span key={i} className="bg-[#2D1B12] text-[#BBA594] border border-[#523A2A] text-[10px] px-2 py-0.5 rounded">
                              {v.key}: {v.value}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-[#BBA594] text-xs line-clamp-2 leading-relaxed font-light mt-auto">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#1C110C]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-[#3E2A1E] border border-[#523A2A] w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
              
              <div className="px-6 py-5 border-b border-[#523A2A] flex justify-between items-center bg-[#362316]">
                <h3 className="text-white font-bold tracking-widest uppercase text-sm">
                  {editingProduct ? 'Edit Product Details' : 'Add New Product'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#BBA594] hover:text-white transition-colors"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                
                {/* Core Details */}
                <div className="space-y-4">
                  <h4 className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold border-b border-[#523A2A] pb-2">Core Information</h4>
                  <div className="space-y-2">
                    <label className="block text-[10px] text-[#BBA594] font-bold uppercase tracking-widest">Product Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#4A3222] text-white border border-[#523A2A] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F08804] text-sm" placeholder="e.g. Cardinal Faucet" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-[#BBA594] font-bold uppercase tracking-widest">Price (₹)</label>
                      <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#4A3222] text-white border border-[#523A2A] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F08804] text-sm" placeholder="2799" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] text-[#BBA594] font-bold uppercase tracking-widest flex justify-between">
                        <span>Image Upload / URL</span>
                        <span className="text-[#A8988D] text-[9px] lowercase italic">Supports Card View updates</span>
                      </label>
                      <input type="file" accept="image/*" onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          const fileUrl = URL.createObjectURL(e.target.files[0]);
                          setFormData({...formData, image: fileUrl});
                        }
                      }} className="block w-full text-xs text-[#A8988D] file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-[#F08804] file:text-[#362316] file:font-bold hover:file:bg-[#d67800] file:cursor-pointer transition-colors" />
                      <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[#4A3222] text-white border border-[#523A2A] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F08804] text-sm mt-1" placeholder="Or enter URL here (/images/...)" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] text-[#BBA594] font-bold uppercase tracking-widest">Description</label>
                    <textarea required rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#4A3222] text-white border border-[#523A2A] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F08804] text-sm resize-none" placeholder="Enter product details..." />
                  </div>
                </div>

                {/* Taglines */}
                <div className="space-y-4">
                  <h4 className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold border-b border-[#523A2A] pb-2 flex items-center gap-2"><Tag size={12} /> Assign Tags</h4>
                  <div className="flex gap-2 flex-wrap">
                    {AVAILABLE_TAGS.map(tag => {
                      const active = formData.tags.includes(tag);
                      return (
                        <button type="button" key={tag} onClick={() => toggleTag(tag)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors ${active ? 'bg-[#F08804] text-black border-[#F08804]' : 'bg-[#2D1B12] text-[#BBA594] border-[#523A2A] hover:border-[#F08804]'}`}>
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Variants */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#523A2A] pb-2">
                    <h4 className="text-[11px] text-[#A8988D] uppercase tracking-widest font-bold">Dynamic Fields (Variants)</h4>
                    <button type="button" onClick={addVariantField} className="text-[#F08804] text-xs font-bold hover:underline flex items-center gap-1">+ Add Field</button>
                  </div>
                  
                  {formData.variants.length === 0 && <p className="text-xs text-[#888] italic">No dynamic variants added.</p>}
                  
                  <div className="space-y-3">
                    {formData.variants.map((variant) => (
                      <div key={variant.id} className="flex items-center gap-3">
                        <input type="text" placeholder="e.g. Size, Type" value={variant.key} onChange={e => updateVariant(variant.id, 'key', e.target.value)} className="w-1/3 bg-[#4A3222] text-white border border-[#523A2A] rounded-lg px-3 py-2 text-sm focus:border-[#F08804] outline-none" />
                        <span className="text-[#BBA594]">:</span>
                        <input type="text" placeholder="e.g. 15mm, Matte" value={variant.value} onChange={e => updateVariant(variant.id, 'value', e.target.value)} className="flex-1 bg-[#4A3222] text-white border border-[#523A2A] rounded-lg px-3 py-2 text-sm focus:border-[#F08804] outline-none" />
                        <button type="button" onClick={() => removeVariant(variant.id)} className="text-red-400 hover:text-red-500 p-2"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>

              </form>
              
              <div className="p-6 border-t border-[#523A2A] flex justify-end gap-3 bg-[#362316]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#BBA594] hover:text-white transition-colors">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-[#F08804] text-[#362316] rounded-xl hover:bg-[#d67800] transition-colors shadow-lg">
                  {editingProduct ? 'Save Updates' : 'Publish Product'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
