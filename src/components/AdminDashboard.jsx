import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Edit,
  LayoutDashboard,
  MessageSquare,
  Plus,
  ShoppingCart,
  Trash2,
  Users,
  UtensilsCrossed,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useProducts } from '../context/ProductContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'menu', label: 'Manage Products', icon: UtensilsCrossed },
  { id: 'users', label: 'Members', icon: Users },
  { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare },
];

const AVAILABLE_TAGS = ['Offer', 'Discount', 'Best Seller', 'Prime Products'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, orders, updateOrderStatus, feedbacks, users, fetchUsers, fetchOrders } = useProducts();

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

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
    <div className="flex h-screen text-[#3E2723] font-serif-elegant overflow-hidden relative bg-transparent">
      <div className="absolute inset-0 bg-white/10 z-0 pointer-events-none backdrop-blur-sm"></div>

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
      <div className="w-[280px] bg-white/80 backdrop-blur-xl border-r border-[#3E2723]/10 flex flex-col h-full flex-shrink-0 relative z-10 transition-colors shadow-2xl">
        <div className="p-8 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-[#3E2723] hover:text-[#A68966] transition-colors p-2 -ml-2 rounded-full hover:bg-[#3E2723]/5">
            <ArrowLeft size={20} />
          </button>
          <div className="text-2xl font-black tracking-tighter text-[#3E2723]">
            PARRYWARE<span className="text-[#A68966]">.</span>
          </div>
        </div>
        <p className="px-8 text-[10px] uppercase tracking-widest text-[#3E2723]/40 font-black mb-4">Admin Registry</p>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-xl transition-all duration-300 text-[14px] font-black uppercase tracking-[0.2em] ${isActive ? 'bg-[#3E2723] text-white shadow-xl translate-x-2' : 'text-[#3E2723]/60 hover:text-[#3E2723] hover:bg-[#3E2723]/5'
                  }`}
              >
                <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-[100px] border-b border-[#3E2723]/10 bg-white/90 backdrop-blur-xl flex items-center justify-between px-10 flex-shrink-0 sticky top-0 transition-colors z-[20]">
          <h2 className="text-[15px] font-black text-[#3E2723] uppercase tracking-[0.4em] flex items-center gap-3">
            {navItems.find(i => i.id === activeTab)?.label} Control
          </h2>
          <div className="flex items-center gap-5 bg-[#3E2723]/5 py-3 px-6 rounded-full border border-[#3E2723]/10">
            <div className="w-10 h-10 rounded-full bg-[#3E2723] flex items-center justify-center text-white font-black text-[12px]">AD</div>
            <div className="pr-2">
              <p className="text-[#3E2723] font-black text-[13px] uppercase tracking-widest leading-none">Admin Authority</p>
              <p className="text-[#3E2723]/40 text-[10px] uppercase tracking-widest mt-1.5">Primary Access</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">

          {/* 1. Dashboard Tab & User Analytics */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Analytics Header */}
              <div className="flex justify-between items-center bg-white/60 border border-[#3E2723]/10 p-10 rounded-3xl shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-[#3E2723] font-black tracking-[0.3em] text-[13px] uppercase mb-1.5">Registry Surveillance</h3>
                  <p className="text-[#3E2723]/40 text-[11px] uppercase tracking-widest">Tracking visitor velocity and enrollment metrics.</p>
                </div>
                <div className="flex bg-[#3E2723]/5 rounded-xl p-2 border border-[#3E2723]/10">
                  {['Daily', 'Weekly', 'Monthly'].map(f => (
                    <button key={f} onClick={() => setAnalyticsFilter(f)} className={`px-8 py-3 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${analyticsFilter === f ? 'bg-[#3E2723] text-white shadow-lg' : 'text-[#3E2723]/40 hover:text-[#3E2723]'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/60 border border-[#3E2723]/10 p-10 rounded-3xl shadow-xl backdrop-blur-md">
                  <p className="text-[12px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black mb-4">Identified Logins ({analyticsFilter})</p>
                  <h3 className="text-6xl font-light text-[#3E2723] tracking-tight font-serif italic">{currentStats.loggedIn.toLocaleString()}</h3>
                </div>
                <div className="bg-white/60 border border-[#3E2723]/10 p-10 rounded-3xl shadow-xl backdrop-blur-md">
                  <p className="text-[12px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black mb-4">New Enrollments ({analyticsFilter})</p>
                  <h3 className="text-6xl font-light text-[#3E2723] tracking-tight font-serif italic">{currentStats.signedUp.toLocaleString()}</h3>
                </div>
                <div className="bg-white/60 border border-[#3E2723]/10 p-10 rounded-3xl shadow-xl backdrop-blur-md relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-[#3E2723]"><Users size={140} /></div>
                  <p className="text-[12px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black mb-4">Total Path Impressions</p>
                  <h3 className="text-6xl font-light text-[#A68966] tracking-tight font-serif italic">{currentStats.visitors.toLocaleString()}</h3>
                </div>
              </div>

              {/* Recharts Data Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/60 border border-[#3E2723]/10 p-8 rounded-3xl shadow-xl backdrop-blur-md h-[400px] flex flex-col">
                  <h4 className="text-[9px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black mb-6">Revenue Trajectory (Weekly)</h4>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3E2723" strokeOpacity={0.05} vertical={false} />
                        <XAxis dataKey="name" stroke="#3E2723" strokeOpacity={0.3} tick={{ fontSize: 12, fontWeight: 900 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#3E2723" strokeOpacity={0.3} tick={{ fontSize: 12, fontWeight: 900 }} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'white', borderColor: '#3E272310', borderRadius: '16px', color: '#3E2723', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#3E2723', fontSize: '13px', fontWeight: '900', textTransform: 'uppercase' }} />
                        <Line type="monotone" dataKey="revenue" stroke="#3E2723" strokeWidth={3} dot={{ fill: 'white', stroke: '#3E2723', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#A68966' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white/60 border border-[#3E2723]/10 p-8 rounded-3xl shadow-xl backdrop-blur-md h-[400px] flex flex-col">
                  <h4 className="text-[9px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black mb-6">Category Distribution</h4>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3E2723" strokeOpacity={0.05} vertical={false} />
                        <XAxis dataKey="name" stroke="#3E2723" strokeOpacity={0.3} tick={{ fontSize: 12, fontWeight: 900 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#3E2723" strokeOpacity={0.3} tick={{ fontSize: 12, fontWeight: 900 }} tickLine={false} axisLine={false} />
                        <RechartsTooltip cursor={{ fill: '#3E2723', opacity: 0.03 }} contentStyle={{ backgroundColor: 'white', borderColor: '#3E272310', borderRadius: '16px', color: '#3E2723', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#3E2723', fontSize: '13px', fontWeight: '900' }} />
                        <Bar dataKey="sales" fill="#3E2723" fillOpacity={0.8} radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Order Management Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-white/60 border border-[#3E2723]/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-[#3E2723] font-black tracking-[0.3em] text-[10px] uppercase mb-1">Logistics & Fullfillment</h3>
                  <p className="text-[#3E2723]/40 text-[9px] uppercase tracking-widest">Total Active Transactions: <span className="text-[#3E2723] font-black">{orders.length}</span></p>
                </div>
              </div>

              <div className="bg-white/60 border border-[#3E2723]/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
                <table className="w-full text-left text-[15px]">
                  <thead className="bg-[#3E2723]/5 text-[#3E2723] uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-8 font-black">Transaction ID</th>
                      <th className="px-10 py-8 font-black">Client</th>
                      <th className="px-10 py-8 font-black">Fullfillment</th>
                      <th className="px-10 py-8 font-black">Logistics Status</th>
                      <th className="px-10 py-8 font-black text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3E2723]/5">
                    {orders.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="hover:bg-[#3E2723]/5 transition-colors group">
                          <td className="px-10 py-8">
                            <p className="font-black text-[#3E2723] leading-none mb-1.5 uppercase tracking-widest">{row.id}</p>
                            <p className="text-[11px] text-[#3E2723]/40 uppercase font-black">{row.date}</p>
                          </td>
                          <td className="px-10 py-8 text-[#3E2723] font-bold uppercase tracking-widest">{row.cx}</td>
                          <td className="px-10 py-8">
                            <select
                              value={row.packed ? 'packed' : 'not_packed'}
                              onChange={(e) => handleUpdateStatus(row.id, 'packed', e.target.value === 'packed')}
                              className={`bg-white/80 text-[13px] font-black uppercase tracking-widest px-6 py-3 rounded-full border outline-none cursor-pointer transition-all ${row.packed ? 'border-green-600/30 text-green-700' : 'border-red-600/30 text-red-700'}`}
                            >
                              <option value="not_packed">NOT PREPARED</option>
                              <option value="packed">FULLFILLED</option>
                            </select>
                          </td>
                          <td className="px-10 py-8">
                            <select
                              value={row.delivery}
                              onChange={(e) => handleUpdateStatus(row.id, 'delivery', e.target.value)}
                              className="bg-white/80 text-[13px] font-black uppercase tracking-widest px-6 py-3 rounded-full border border-[#A68966]/30 text-[#A68966] outline-none cursor-pointer"
                            >
                              <option value="Pending">QUEUED</option>
                              <option value="In Transit">TRANSIT</option>
                              <option value="Delivered">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button
                              onClick={() => setExpandedOrder(expandedOrder === row.id ? null : row.id)}
                              className="text-[13px] font-black uppercase tracking-widest text-[#3E2723] hover:underline underline-offset-4"
                            >
                              {expandedOrder === row.id ? 'Collapse' : 'Inspect'}
                            </button>
                          </td>
                        </tr>
                        {expandedOrder === row.id && (
                          <tr className="bg-white/40 backdrop-blur-xl">
                            <td colSpan={5} className="px-10 py-8 border-l-8 border-[#3E2723]">
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-10">
                                <div>
                                  <p className="text-[13px] font-black text-[#3E2723]/40 uppercase tracking-[0.3em] mb-4">Registry Payload:</p>
                                  <ul className="list-none space-y-3 mb-6">
                                    {row.items.map((it, idx) => (
                                      <li key={idx} className="text-[15px] text-[#3E2723] font-black uppercase tracking-widest flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#3E2723]/20" /> {it}
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="pt-6 border-t border-[#3E2723]/5">
                                    <p className="text-[11px] text-[#3E2723]/40 uppercase tracking-widest font-black">Valuation Accumulation:</p>
                                    <p className="text-[#3E2723] font-black text-xl tracking-tighter mt-2">{row.total}</p>
                                  </div>
                                </div>
                                <div className="space-y-8 flex-1 max-w-sm">
                                  <p className="text-[13px] text-[#3E2723]/40 uppercase font-black tracking-[0.2em]">Logistics Synchronization</p>
                                  <div className="space-y-4">
                                    <input type="text" placeholder="AWB / Tracking Identity" className="w-full glass-input-premium !text-[15px] !py-4" id={`track-${row.id}`} />
                                    <button onClick={() => {
                                      const val = document.getElementById(`track-${row.id}`).value;
                                      if (val) notifySMS(`📞 SMS to Mobile: Your Order ${row.id} Tracking Details: ${val}`);
                                    }} className="w-full bg-[#3E2723] text-white text-[12px] font-black px-10 py-5 uppercase tracking-[0.3em] rounded-xl hover:bg-black transition-all shadow-xl active:scale-95">Dispatch SMS</button>
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

              <div className="bg-white/60 border border-[#3E2723]/10 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-[#3E2723] font-black tracking-[0.3em] text-[13px] uppercase mb-1.5">Catalog Inventory</h3>
                  <p className="text-[#3E2723]/40 text-[11px] uppercase tracking-widest">Manage product details, pricing architectures, and variants.</p>
                </div>
                <button
                  onClick={() => handleOpenModal()}
                  className="bg-[#3E2723] hover:bg-black text-white font-black uppercase tracking-widest text-[11px] px-10 py-5 rounded-xl flex items-center gap-3 transition-all shadow-xl active:scale-95"
                >
                  <Plus size={18} strokeWidth={3} /> Append Registry
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map(product => (
                  <div key={product.id} className="bg-white/60 rounded-3xl overflow-hidden border border-[#3E2723]/10 hover:border-[#3E2723]/30 transition-all group flex flex-col shadow-xl relative backdrop-blur-md">

                    {/* Render Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                        {product.tags.map(tag => (
                          <span key={tag} className="bg-[#3E2723] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-xl">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="relative h-56 bg-[#3E2723]/5 flex items-center justify-center p-8">
                      <img src={product.image} alt={product.name} className="h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button onClick={() => handleOpenModal(product)} className="w-10 h-10 rounded-full bg-white/90 shadow-xl border border-[#3E2723]/10 flex items-center justify-center text-[#3E2723] hover:bg-[#3E2723] hover:text-white transition-all"><Edit size={16} /></button>
                        <button onClick={() => deleteProduct(product.id)} className="w-10 h-10 rounded-full bg-white/90 shadow-xl border border-[#3E2723]/10 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="p-10 flex-1 flex flex-col">
                      <h4 className="text-[#3E2723] font-black leading-snug line-clamp-2 text-[15px] uppercase tracking-widest mb-3">{product.name}</h4>
                      <span className="text-[#A68966] font-black tracking-widest text-[18px] mb-5">₹{product.price.toLocaleString()}</span>

                      {/* Render Variant Info */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="flex flex-wrap gap-2.5 mb-5">
                          {product.variants.map((v, i) => (
                            <span key={i} className="bg-[#3E2723]/5 text-[#3E2723]/40 border border-[#3E2723]/10 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded">
                              {v.key}: {v.value}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-[#3E2723]/60 text-[12px] line-clamp-3 leading-relaxed font-bold uppercase tracking-wider mt-auto italic">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Feedback Management Tab */}
          {activeTab === 'feedbacks' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-white/60 border border-[#3E2723]/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-[#3E2723] font-black tracking-[0.3em] text-[10px] uppercase mb-1">Customer Sentiment</h3>
                  <p className="text-[#3E2723]/40 text-[9px] uppercase tracking-widest">Total Feedback Entries: <span className="text-[#3E2723] font-black">{feedbacks.length}</span></p>
                </div>
              </div>

              <div className="bg-white/60 border border-[#3E2723]/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
                <table className="w-full text-left text-[15px]">
                  <thead className="bg-[#3E2723]/5 text-[#3E2723] uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-8 font-black">Submission Date</th>
                      <th className="px-10 py-8 font-black">Experience</th>
                      <th className="px-10 py-8 font-black">Feedback & Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3E2723]/5">
                    {feedbacks.map((fb) => (
                      <tr key={fb.id} className="hover:bg-[#3E2723]/5 transition-colors group">
                        <td className="px-10 py-8">
                          <p className="font-black text-[#3E2723] uppercase tracking-widest leading-none mb-1">{fb.date}</p>
                          <p className="text-[10px] text-[#3E2723]/40 uppercase font-black">Verified User</p>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${fb.rating === 'GOOD' ? 'bg-green-100 text-green-700 border border-green-200' :
                            fb.rating === 'AVERAGE' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                              'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            {fb.rating}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <p className="text-[#3E2723] font-black uppercase tracking-widest text-[13px] leading-relaxed max-w-lg">
                            {fb.suggestion}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-white/60 border border-[#3E2723]/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-[#3E2723] font-black tracking-[0.3em] text-[10px] uppercase mb-1">User Activity Registry</h3>
                  <p className="text-[#3E2723]/40 text-[9px] uppercase tracking-widest">Tracking signups and logins: <span className="text-[#3E2723] font-black">{users.length} Enrolled</span></p>
                </div>
              </div>

              <div className="bg-white/60 border border-[#3E2723]/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#3E2723]/5 text-[#3E2723] uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-7 font-black">User Identity</th>
                      <th className="px-10 py-7 font-black">Signed Up</th>
                      <th className="px-10 py-7 font-black">Last Login</th>
                      <th className="px-10 py-7 font-black">Auth Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3E2723]/5">
                    {users.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#3E2723]/5 transition-colors group">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#3E2723]/10 flex items-center justify-center border border-[#3E2723]/10">
                              {row.picture ? (
                                <img src={row.picture} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-[12px] font-black text-[#3E2723]/40 uppercase">{row.name?.substring(0, 2)}</div>
                              )}
                            </div>
                            <div>
                              <p className="font-black text-[#3E2723] uppercase tracking-widest text-[13px]">{row.name}</p>
                              <p className="text-[10px] text-[#3E2723]/40 font-bold uppercase">{row.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <p className="font-black text-[#3E2723] uppercase tracking-widest text-[11px]">{row.createdAt ? new Date(row.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Initial'}</p>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <p className="font-black text-[#3E2723] uppercase tracking-widest text-[11px]">{row.lastLogin ? new Date(row.lastLogin).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : 'Never'}</p>
                          <p className="text-[9px] text-[#3E2723]/40 uppercase font-black">{row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : 'N/A'}</p>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${row.authType === 'GOOGLE' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-[#3E2723]/10 text-[#3E2723] border border-[#3E2723]/10'
                            }`}>
                            {row.authType || 'MANUAL'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-10 py-20 text-center text-[#3E2723]/40 font-black uppercase tracking-widest italic">
                          No registered user records detected in registry.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#3E2723]/20 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white/90 backdrop-blur-3xl border border-[#3E2723]/10 w-full max-w-2xl rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative z-10 flex flex-col max-h-[90vh] overflow-hidden">

              <div className="px-10 py-8 border-b border-[#3E2723]/5 flex justify-between items-center bg-white/50">
                <div>
                  <h3 className="text-[#3E2723] font-black tracking-[0.3em] uppercase text-[15px]">
                    {editingProduct ? 'Update Registry Entry' : 'New Registry Enrollment'}
                  </h3>
                  <p className="text-[#3E2723]/40 text-[11px] uppercase tracking-widest mt-2">Product Inventory System</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-[#3E2723]/40 hover:text-[#3E2723] transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="p-10 space-y-10 overflow-y-auto custom-scrollbar flex-1">

                {/* Core Details */}
                <div className="space-y-6">
                  <h4 className="text-[12px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black border-b border-[#3E2723]/5 pb-4">Primary Specifications</h4>
                  <div className="space-y-4">
                    <label className="luxury-label !mb-2">Identification Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full glass-input-premium !text-lg" placeholder="e.g. Cardinal Faucet" />
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="luxury-label !mb-2">Valuation (INR)</label>
                      <input required type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full glass-input-premium !text-lg" placeholder="2799" />
                    </div>
                    <div className="space-y-4">
                      <label className="luxury-label !mb-2 flex justify-between">
                        <span>Digital Asset URL</span>
                      </label>
                      <input required type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full glass-input-premium !text-lg" placeholder="/images/product-id.png" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="luxury-label !mb-2">Descriptive Narrative</label>
                    <textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full glass-input-premium !text-lg resize-none" placeholder="Enter product details..." />
                  </div>
                </div>

                {/* Taglines */}
                <div className="space-y-8">
                  <h4 className="text-[12px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black border-b border-[#3E2723]/5 pb-4 flex items-center gap-3">Marketing Classifiers</h4>
                  <div className="flex gap-4 flex-wrap">
                    {AVAILABLE_TAGS.map(tag => {
                      const active = formData.tags.includes(tag);
                      return (
                        <button type="button" key={tag} onClick={() => toggleTag(tag)} className={`px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${active ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg' : 'bg-white text-[#3E2723]/40 border-[#3E2723]/10 hover:border-[#3E2723]'}`}>
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Variants */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-[#3E2723]/5 pb-4">
                    <h4 className="text-[12px] text-[#3E2723]/40 uppercase tracking-[0.3em] font-black">Variant Parameters</h4>
                    <button type="button" onClick={addVariantField} className="text-[#3E2723] text-[11px] font-black uppercase tracking-widest hover:underline">+ Append Parameter</button>
                  </div>

                  {formData.variants.length === 0 && <p className="text-[11px] text-[#3E2723]/20 uppercase tracking-widest italic font-black">No parameters defined.</p>}

                  <div className="space-y-6">
                    {formData.variants.map((variant) => (
                      <div key={variant.id} className="flex items-center gap-6">
                        <input type="text" placeholder="Key" value={variant.key} onChange={e => updateVariant(variant.id, 'key', e.target.value)} className="w-1/3 glass-input-premium !text-lg !py-2" />
                        <span className="text-[#3E2723]/20 font-black text-lg">:</span>
                        <input type="text" placeholder="Value" value={variant.value} onChange={e => updateVariant(variant.id, 'value', e.target.value)} className="flex-1 glass-input-premium !text-lg !py-2" />
                        <button type="button" onClick={() => removeVariant(variant.id)} className="text-red-400 hover:text-red-600 p-3"><Trash2 size={24} /></button>
                      </div>
                    ))}
                  </div>
                </div>

              </form>

              <div className="p-10 border-t border-[#3E2723]/5 flex justify-end gap-6 bg-white/50 backdrop-blur-xl">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-4 text-[12px] font-black uppercase tracking-widest text-[#3E2723]/40 hover:text-[#3E2723] transition-colors">Discard</button>
                <button onClick={handleSave} className="px-12 py-5 text-[12px] font-black uppercase tracking-widest bg-[#3E2723] text-white rounded-xl hover:bg-black transition-all shadow-2xl active:scale-95">
                  {editingProduct ? 'Commit Updates' : 'Authorize Publication'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
