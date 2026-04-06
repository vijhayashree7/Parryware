import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingCart, CalendarCheck, UtensilsCrossed, Users, 
  Truck, Settings, Search, Plus, LogOut, Edit, Trash2, X, ArrowLeft, 
  ChevronDown, ChevronUp, Bell, CheckCircle2, Tag, Lock, MessageSquare, Star
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area, Legend 
} from 'recharts';
import { format, subDays, startOfDay, endOfDay, isWithinInterval, parseISO, startOfMonth, startOfYear } from 'date-fns';

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
  const [formData, setFormData] = useState({ name: '', description: '', price: '', mrp: '', image: '', tags: [], variants: [], date: new Date().toISOString().split('T')[0] });
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
        variants: product.variants || [],
        date: product.date || new Date().toISOString().split('T')[0]
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', mrp: '', image: '', tags: [], variants: [], date: new Date().toISOString().split('T')[0] });
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

  const [expandedOrder, setExpandedOrder] = useState(null);

  // --- ANALYTICS DATA PROCESSING ---
  const [analyticsTab, setAnalyticsTab] = useState('Daily');
  const [dateRange, setDateRange] = useState({ 
    start: subDays(new Date(), 7), 
    end: new Date() 
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const getFilteredData = () => {
    // Generate dates based on active tab & range
    const data = [];
    let daysToTrack = analyticsTab === 'Daily' ? 7 : analyticsTab === 'Monthly' ? 30 : 365;
    
    for (let i = daysToTrack; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const dStr = format(d, 'yyyy-MM-dd');
      
      const daySignups = users.filter(u => u.createdAt?.startsWith(dStr)).length;
      const dayLogins = users.filter(u => u.logins?.some(l => l.startsWith(dStr))).length;
      
      data.push({
        name: analyticsTab === 'Daily' ? format(d, 'EEE') : format(d, 'MMM dd'),
        signups: daySignups,
        logins: dayLogins,
        fullDate: dStr
      });
    }
    return data;
  };

  const dashboardData = getFilteredData();

  const getMetricStats = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const thisMonth = format(new Date(), 'yyyy-MM');
    
    return {
      totalUsers: users.length,
      dailySignups: users.filter(u => u.createdAt?.startsWith(today)).length,
      dailyLogins: users.filter(u => u.logins?.some(l => l.startsWith(today))).length,
      monthlySignups: users.filter(u => u.createdAt?.startsWith(thisMonth)).length
    };
  };

  const stats = getMetricStats();

  const handleUpdateStatus = (id, newStatus) => {
    updateOrderStatus(id, 'status', newStatus);
    notifySMS(`📞 SMS Sent: Order ${id} is now ${newStatus}!`);
  };

  const THEME_BROWN = '#8C513E';

  // --- SUB-COMPONENTS ---
  const MetricCard = ({ label, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#3E2723]/5 flex items-center gap-6 group hover:shadow-md transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color === 'blue' ? 'bg-blue-50 text-blue-500' : 'bg-teal-50 text-teal-500'}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[12px] font-black uppercase tracking-widest text-[#3E2723]/40 mb-1">{label}</p>
        <h3 className="text-3xl font-serif text-[#3E2723]">{value.toLocaleString()}</h3>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen text-[#3E2723] font-serif overflow-hidden relative bg-white" style={{ fontFamily: 'Times New Roman, serif' }}>
      <div className="absolute inset-0 bg-white z-0 pointer-events-none"></div>
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 border border-green-500"
          >
            <CheckCircle2 size={18} /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-[280px] bg-white border-r border-[#3E2723]/10 flex flex-col h-full flex-shrink-0 relative z-10 transition-colors shadow-2xl">
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
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-xl transition-all duration-300 text-[14px] font-black uppercase tracking-[0.2em] ${
                  isActive ? 'bg-[#3E2723] text-white shadow-xl translate-x-2' : 'text-[#3E2723]/60 hover:text-[#3E2723] hover:bg-[#3E2723]/5'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 bg-white">
        <header className="h-[120px] border-b border-[#3E2723]/10 flex items-center justify-between px-10 flex-shrink-0 sticky top-0 bg-white z-[20]">
          <div>
            <h1 className="text-3xl font-serif text-[#4E342E] tracking-wide relative inline-block">
              Admin Dashboard
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#8c7462] rounded-full"></div>
            </h1>
            <p className="text-[10px] font-black text-[#3E2723]/40 uppercase tracking-[0.3em] mt-3">
              {navItems.find(i => i.id === activeTab)?.label} Control
            </p>
          </div>
          <div className="flex items-center gap-5 bg-[#3E2723]/5 py-3 px-6 rounded-full border border-[#3E2723]/10">
            <div className="w-10 h-10 rounded-full bg-[#3E2723] flex items-center justify-center text-white font-black text-[12px]">AD</div>
            <div>
              <p className="text-[#3E2723] font-black text-[13px] uppercase tracking-widest leading-none">Admin Authority</p>
              <p className="text-[#3E2723]/40 text-[10px] uppercase tracking-widest mt-1.5">Primary Access</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Reference Style Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Total Users" value={stats.totalUsers} icon={Users} color="blue" />
                <MetricCard label="Daily Signups" value={stats.dailySignups} icon={CalendarCheck} color="blue" />
                <MetricCard label="Daily Logins" value={stats.dailyLogins} icon={Lock} color="blue" />
                <MetricCard label="Monthly Enrollment" value={stats.monthlySignups} icon={Tag} color="teal" />
              </div>

              {/* User Analytics Section (Ref Image Style) */}
              <div className="bg-white rounded-[2.5rem] border border-[#3E2723]/5 shadow-sm p-10 overflow-visible relative">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-serif text-[#3E2723] tracking-wide">User Analytics</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Date Formatting Range */}
                    <div className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-widest mr-4">
                      Date Range:
                    </div>

                    {/* Custom Range Picker Toggle */}
                    <div className="relative">
                      <button 
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className="flex items-center gap-3 bg-[#3E2723]/5 px-6 py-3 rounded-xl border border-[#3E2723]/10 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:shadow-md transition-all"
                      >
                        {format(dateRange.start, 'MMM dd, yyyy')} — {format(dateRange.end, 'MMM dd, yyyy')}
                        <CalendarCheck size={14} className="text-blue-500" />
                      </button>

                      <AnimatePresence>
                        {isDatePickerOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-4 w-[320px] bg-white rounded-3xl shadow-2xl border border-[#3E2723]/10 z-[100] p-6 text-[#3E2723]"
                          >
                             <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                  {['Today', 'Yesterday', 'Last 7 Days', 'This Month'].map(preset => (
                                    <button 
                                      key={preset}
                                      onClick={() => {
                                        if (preset === 'Today') setDateRange({ start: new Date(), end: new Date() });
                                        if (preset === 'Last 7 Days') setDateRange({ start: subDays(new Date(), 7), end: new Date() });
                                        if (preset === 'This Month') setDateRange({ start: startOfMonth(new Date()), end: new Date() });
                                        setIsDatePickerOpen(false);
                                      }}
                                      className="py-2 text-[10px] font-black uppercase tracking-widest bg-[#3E2723]/5 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-center"
                                    >
                                      {preset}
                                    </button>
                                  ))}
                                </div>
                                <div className="pt-4 border-t border-[#3E2723]/5">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/30 block mb-2 text-center">Manual Range</label>
                                  <div className="flex items-center gap-2">
                                    <input type="date" className="flex-1 bg-[#3E2723]/5 p-2 rounded-lg text-[10px]" />
                                    <span>-</span>
                                    <input type="date" className="flex-1 bg-[#3E2723]/5 p-2 rounded-lg text-[10px]" />
                                  </div>
                                </div>
                                <button onClick={() => setIsDatePickerOpen(false)} className="w-full bg-blue-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg">Apply</button>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Simple Filter Dropdown */}
                    <div className="flex items-center gap-3 bg-[#3E2723]/5 px-6 py-2 rounded-xl border border-[#3E2723]/10">
                      <span className="text-[10px] font-black text-[#3E2723]/30 uppercase">Filter by:</span>
                      <select className="bg-transparent text-[11px] font-black uppercase outline-none cursor-pointer">
                        <option>All</option>
                        <option>Manual</option>
                        <option>Google</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Daily/Monthly/Yearly Switcher Header */}
                <div className="flex gap-2 mb-8 bg-[#3E2723]/5 p-1.5 rounded-2xl w-fit">
                   {['Daily', 'Monthly', 'Yearly'].map(tab => (
                     <button 
                       key={tab}
                       onClick={() => setAnalyticsTab(tab)}
                       className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                         analyticsTab === tab ? 'bg-white text-blue-500 shadow-sm' : 'text-[#3E2723]/40 hover:text-[#3E2723]'
                       }`}
                     >
                       {tab}
                     </button>
                   ))}
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboardData}>
                      <defs>
                        <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3E2723" strokeOpacity={0.05} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 900, fill: '#3E2723', opacity: 0.4}} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 900, fill: '#3E2723', opacity: 0.4}}
                        dx={-10}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          borderRadius: '16px', 
                          border: '1px solid #3E272310', 
                          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                          padding: '12px' 
                        }}
                        labelStyle={{fontSize: '10px', fontWeight: '900', color: '#3E2723', textTransform: 'uppercase', marginBottom: '8px'}}
                      />
                      <Area type="monotone" dataKey="signups" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSignups)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                      <Area type="monotone" dataKey="logins" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorLogins)" dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center bg-[#8C513E] p-10 rounded-[2.5rem] shadow-xl text-white">
                <h3 className="text-white font-black tracking-[0.3em] text-[14px] uppercase">Logistics Fullfillment Registry</h3>
                <p className="text-white/40 text-[11px] uppercase tracking-widest font-black">Active: {orders.length} Entries</p>
              </div>
              <div className="bg-[#8C513E] rounded-[2.5rem] overflow-hidden shadow-xl text-white">
                <table className="w-full text-left">
                  <thead className="bg-black/20 text-white uppercase tracking-widest text-[11px] font-black">
                    <tr>
                      <th className="px-10 py-8">Identity</th>
                      <th className="px-10 py-8">Customer</th>
                      <th className="px-10 py-8">Status</th>
                      <th className="px-10 py-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-[14px]">
                    {orders.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="px-10 py-8 font-black uppercase tracking-widest text-[13px]">{row.id}</td>
                          <td className="px-10 py-8 font-bold uppercase">{row.cx}</td>
                          <td className="px-10 py-8">
                             <select 
                                value={row.status || 'Ordered'} 
                                onChange={(e) => handleUpdateStatus(row.id, e.target.value)}
                                className="bg-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl outline-none border border-white/10 cursor-pointer focus:bg-[#3E2723]"
                             >
                               {['Ordered', 'Pending', 'Ready to Deliver', 'Delivered'].map(s => (
                                 <option key={s} value={s} className="bg-[#3E2723]">{s}</option>
                               ))}
                             </select>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <button onClick={() => setExpandedOrder(expandedOrder === row.id ? null : row.id)} className="text-[#FFEFE5] font-black uppercase text-[12px] hover:underline">Inspect</button>
                          </td>
                        </tr>
                        {expandedOrder === row.id && (
                          <tr className="bg-black/10">
                            <td colSpan={4} className="px-10 py-8 border-l-8 border-white/20">
                               <p className="text-[10px] text-white/40 uppercase mb-4 font-black">Items Included:</p>
                               <div className="flex flex-wrap gap-4">
                                  {row.items?.map((it, i) => (
                                    <span key={i} className="bg-white/5 px-4 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wide">✓ {it}</span>
                                  ))}
                               </div>
                               <p className="mt-8 text-xl font-black">{row.total}</p>
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

          {activeTab === 'menu' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center bg-[#8C513E] p-10 rounded-[2.5rem] shadow-xl text-white">
                <div>
                   <h3 className="text-white font-black tracking-[0.3em] text-[14px] uppercase mb-1">Catalog Inventory</h3>
                   <p className="text-white/40 text-[11px] uppercase tracking-widest">Manage product details and publication.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="bg-white text-[#8C513E] font-black uppercase tracking-widest text-[12px] px-12 py-5 rounded-2xl hover:bg-[#FFEFE5] shadow-2xl transition-all">+ New Product</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map(product => (
                  <div key={product.id} className="bg-[#8C513E] rounded-[3rem] overflow-hidden shadow-xl p-8 flex flex-col group h-[480px]">
                    <div className="h-48 bg-white/5 rounded-[2rem] flex items-center justify-center p-6 mb-8">
                       <img src={product.image} alt={product.name} className="h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h4 className="text-white font-black uppercase tracking-widest text-[15px] mb-2 line-clamp-1">{product.name}</h4>
                    <p className="text-[#FFEFE5] font-black text-2xl mb-4">₹{product.price.toLocaleString()}</p>
                    <p className="text-white/50 text-[12px] font-bold uppercase italic line-clamp-2 mb-8 leading-relaxed">{product.description}</p>
                    <div className="mt-auto flex gap-4">
                       <button onClick={() => handleOpenModal(product)} className="flex-1 bg-white/10 hover:bg-white text-[#8C513E] py-4 rounded-2xl transition-all shadow-xl"><Edit size={18} className="mx-auto" /></button>
                       <button onClick={() => deleteProduct(product.id)} className="flex-1 bg-white/10 hover:bg-red-500 text-white py-4 rounded-2xl transition-all shadow-xl"><Trash2 size={18} className="mx-auto" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedbacks' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-[#8C513E] p-10 rounded-[2.5rem] shadow-xl text-white">
                  <h3 className="text-white font-black tracking-[0.3em] text-[14px] uppercase mb-1">Customer Sentiment Registry</h3>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest">Analysis of verified user experiences.</p>
               </div>
               <div className="bg-[#8C513E] rounded-[2.5rem] overflow-hidden shadow-xl text-white">
                  <table className="w-full text-left">
                    <thead className="bg-black/20 text-white uppercase tracking-widest text-[11px] font-black">
                      <tr>
                        <th className="px-10 py-8">Customer Name</th>
                        <th className="px-10 py-8">Rating</th>
                        <th className="px-10 py-8">Comment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[14px]">
                      {feedbacks.map((fb) => (
                        <tr key={fb.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-10 py-8 font-black uppercase tracking-widest text-[12px]">{fb.customerName || 'Anonymous'}</td>
                          <td className="px-10 py-8">
                             <div className="flex text-[#FFEFE5] gap-1">
                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < fb.rating ? "currentColor" : "none"} />)}
                             </div>
                          </td>
                          <td className="px-10 py-8 font-bold leading-relaxed text-white/90">{fb.message || fb.suggestion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-[#8C513E] p-10 rounded-[2.5rem] shadow-xl text-white">
                  <h3 className="text-white font-black tracking-[0.3em] text-[14px] uppercase mb-1">Member Activity Registry</h3>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest">Verified enrollment records: {users.length}</p>
               </div>
               <div className="bg-[#8C513E] rounded-[2.5rem] overflow-hidden shadow-xl text-white">
                  <table className="w-full text-left">
                    <thead className="bg-black/20 text-white uppercase tracking-widest text-[11px] font-black">
                      <tr>
                        <th className="px-10 py-8">Identity</th>
                        <th className="px-10 py-8">Enrolled</th>
                        <th className="px-10 py-8">Auth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[14px]">
                      {users.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-10 py-8">
                             <p className="font-black uppercase tracking-widest text-[13px]">{row.name}</p>
                             <p className="text-[10px] text-white/40 font-bold uppercase">{row.email}</p>
                          </td>
                          <td className="px-10 py-8 text-white/60 font-black uppercase text-[11px]">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'Initial'}</td>
                          <td className="px-10 py-8">
                             <span className="text-[10px] font-black uppercase px-4 py-1.5 bg-white/10 rounded-full">{row.authType || 'Manual'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#3E2723]/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden text-[#3E2723]">
              <div className="px-10 py-10 border-b border-[#3E2723]/5 flex justify-between items-center shrink-0">
                 <h3 className="font-black uppercase tracking-[0.3em] text-[18px]">Product Registry</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-[#3E2723]/30 hover:text-[#3E2723] transition-colors"><X size={24} /></button>
              </div>
              <form onSubmit={handleSave} className="p-10 space-y-10 overflow-y-auto flex-1 scrollbar-hide">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/30">Identification Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl font-black uppercase tracking-widest outline-none focus:bg-white focus:shadow-xl transition-all" />
                 </div>
                 <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/30">Valuation (INR)</label>
                       <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl font-black uppercase tracking-widest outline-none focus:bg-white focus:shadow-xl transition-all" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/30">Asset Image URL</label>
                       <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl font-black uppercase tracking-widest outline-none focus:bg-white focus:shadow-xl transition-all" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/30">Enrollment Date</label>
                       <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl font-black uppercase tracking-widest outline-none focus:bg-white focus:shadow-xl transition-all cursor-pointer" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/30">Descriptive Narrative</label>
                    <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#3E2723]/5 px-8 py-6 rounded-2xl font-bold text-[#3E2723] outline-none focus:bg-white focus:shadow-xl transition-all resize-none leading-relaxed" />
                 </div>
              </form>
              <div className="p-10 border-t border-[#3E2723]/5 flex justify-end gap-6 shrink-0">
                 <button onClick={() => setIsModalOpen(false)} className="text-[12px] font-black uppercase tracking-widest text-[#3E2723]/30 hover:text-[#3E2723]">Discard</button>
                 <button onClick={handleSave} className="bg-[#8C513E] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-2xl hover:bg-[#3E2723] transition-all">Authorize Publication</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
