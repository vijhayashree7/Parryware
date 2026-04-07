import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingCart, CalendarCheck, UtensilsCrossed, Users, 
  Truck, Settings, Search, Plus, LogOut, Edit, Trash2, X, ArrowLeft, 
  ChevronDown, ChevronUp, Bell, CheckCircle2, Tag, Lock, MessageSquare, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area, Legend, Bar, BarChart
} from 'recharts';
import { format, subDays, startOfDay, endOfDay, isWithinInterval, parseISO, startOfMonth, startOfYear } from 'date-fns';
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
  const [viewMode, setViewMode] = useState('Daily'); // Daily, Monthly
  const [customStartDate, setCustomStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [customEndDate, setCustomEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Helper to parse currency string (e.g., "₹26,798") to number
  const parseTotal = (totalStr) => {
    if (!totalStr) return 0;
    // Remove currency symbol and commas
    const cleaned = totalStr.replace(/[₹,]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const getBusinessData = () => {
    const start = startOfDay(parseISO(customStartDate));
    const end = endOfDay(parseISO(customEndDate));
    
    return orders.filter(o => {
      const orderDate = parseISO(o.date);
      return isWithinInterval(orderDate, { start, end });
    }).map(o => ({
      ...o,
      numericTotal: parseTotal(o.total),
      paymentStatus: o.packed ? 'Paid' : 'Pending', // Mocking based on status
      deliveryDate: o.delivery === 'Delivered' ? o.date : 'Estimated: TBD'
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const businessData = getBusinessData();

  const getMetricStats = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const thisMonth = format(new Date(), 'yyyy-MM');
    
    return {
      totalUsers: users.length,
      dailySignups: users.filter(u => u.createdAt?.startsWith(today)).length,
      dailyLogins: users.filter(u => u.logins?.some(l => l.startsWith(today))).length,
      monthlySignups: users.filter(u => u.createdAt?.startsWith(thisMonth)).length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + parseTotal(o.total), 0),
      filteredOrders: businessData.length,
      filteredRevenue: businessData.reduce((sum, o) => sum + o.numericTotal, 0)
    };
  };

  const stats = getMetricStats();

  const handleUpdateStatus = (id, newStatus) => {
    updateOrderStatus(id, 'status', newStatus);
    notifySMS(`📞 SMS Sent: Order ${id} is now ${newStatus}!`);
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Total Users" value={stats.totalUsers} icon={Users} color="blue" />
                <MetricCard label="Daily Signups" value={stats.dailySignups} icon={CalendarCheck} color="blue" />
                <MetricCard label="Orders (Range)" value={stats.filteredOrders} icon={ShoppingCart} color="teal" />
                <MetricCard label="Revenue (Range)" value={`₹${stats.filteredRevenue.toLocaleString()}`} icon={Tag} color="teal" />
              </div>

              <div className="bg-[#FFEFE5]/30 rounded-[2.5rem] border border-[#3E2723]/5 shadow-sm p-10 overflow-visible relative">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-serif text-[#3E2723] tracking-wide">Calendar-based Business Dashboard</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <p className="text-[10px] font-black uppercase text-[#3E2723]/40 tracking-widest">From</p>
                      <input 
                        type="date" 
                        value={customStartDate} 
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-white border border-[#3E2723]/10 rounded-xl px-4 py-2 text-[11px] font-black uppercase outline-none focus:border-[#8C513E] transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-[10px] font-black uppercase text-[#3E2723]/40 tracking-widest">To</p>
                      <input 
                        type="date" 
                        value={customEndDate} 
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-white border border-[#3E2723]/10 rounded-xl px-4 py-2 text-[11px] font-black uppercase outline-none focus:border-[#8C513E] transition-all"
                      />
                    </div>
                    <div className="flex gap-2 bg-[#3E2723]/5 p-1 rounded-xl">
                      {['Daily', 'Monthly'].map(mode => (
                        <button 
                          key={mode} 
                          onClick={() => {
                            setViewMode(mode);
                            if (mode === 'Daily') {
                              setCustomStartDate(format(new Date(), 'yyyy-MM-dd'));
                              setCustomEndDate(format(new Date(), 'yyyy-MM-dd'));
                            } else if (mode === 'Monthly') {
                              setCustomStartDate(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
                              setCustomEndDate(format(new Date(), 'yyyy-MM-dd'));
                            }
                          }}
                          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-[#3E2723] text-white shadow-lg' : 'text-[#3E2723]/40 hover:text-[#3E2723]'}`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#3E2723] rounded-[2.5rem] overflow-hidden shadow-2xl text-white">
                  <div className="p-8 bg-black/20 border-b border-white/5 flex justify-between items-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] italic text-[#FFEFE5]">Business Timeline Registry</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Filtered: {businessData.length} records</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-black/10 text-white uppercase tracking-widest text-[10px] font-black">
                        <tr>
                          <th className="px-8 py-6">Order #</th>
                          <th className="px-8 py-6 text-center">Date</th>
                          <th className="px-8 py-6">Customer</th>
                          <th className="px-8 py-6 text-center">Status</th>
                          <th className="px-8 py-6 text-center">Revenue</th>
                          <th className="px-8 py-6">Delivery Date</th>
                          <th className="px-8 py-6 text-right">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-[13px]">
                        {businessData.map((order, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-all duration-300">
                            <td className="px-8 py-6 font-black uppercase tracking-widest text-[12px]">{order.id}</td>
                            <td className="px-8 py-6 font-bold uppercase text-[11px] text-[#FFEFE5] text-center">
                              {format(parseISO(order.date), 'dd-MM-yyyy')}
                            </td>
                            <td className="px-8 py-6 font-bold uppercase">{order.cx}</td>
                            <td className="px-8 py-6 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                order.delivery === 'Delivered' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}>
                                {order.delivery || 'Pending'}
                              </span>
                            </td>
                            <td className="px-8 py-6 font-black uppercase text-center text-[#FFEFE5]">{order.total}</td>
                            <td className="px-8 py-6 font-bold uppercase text-[11px] text-white/60">{order.deliveryDate}</td>
                            <td className="px-8 py-6 text-right">
                              <span className={`text-[10px] font-black uppercase tracking-widest ${order.paymentStatus === 'Paid' ? 'text-teal-400' : 'text-amber-400'}`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {businessData.length === 0 && (
                    <div className="p-20 text-center text-white/20 uppercase tracking-[0.4em] font-black text-[11px]">
                      No logistical data found for the selected period
                    </div>
                  )}
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
                             <select value={row.status || 'Ordered'} onChange={(e) => handleUpdateStatus(row.id, e.target.value)} className="bg-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl outline-none border border-white/10 cursor-pointer focus:bg-[#3E2723]">
                               {['Ordered', 'Pending', 'Ready to Deliver', 'Delivered'].map(s => <option key={s} value={s} className="bg-[#3E2723]">{s}</option>)}
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
                                  {row.items?.map((it, i) => <span key={i} className="bg-white/5 px-4 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wide">✓ {it}</span>)}
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
                        <th className="px-10 py-8">Member</th>
                        <th className="px-10 py-8">Enrollment Date</th>
                        <th className="px-10 py-8">Last Presence</th>
                        <th className="px-10 py-8">Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[14px]">
                      {users.map((user, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-[10px] uppercase">
                                 {user.picture ? <img src={user.picture} alt="" className="w-full h-full rounded-full" /> : user.name?.charAt(0) || 'U'}
                               </div>
                               <div>
                                 <p className="font-black uppercase tracking-widest text-[12px]">{user.name || 'Anonymous'}</p>
                                 <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{user.email}</p>
                               </div>
                             </div>
                          </td>
                          <td className="px-10 py-8 font-bold uppercase text-[11px] text-white/60">{user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : 'Unknown'}</td>
                          <td className="px-10 py-8 font-black uppercase text-[11px]">{user.lastLogin ? format(new Date(user.lastLogin), 'hh:mm a') : 'N/A'}</td>
                          <td className="px-10 py-8">
                             <span className="bg-white/10 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#FFEFE5]">{user.authType || 'MANUAL'}</span>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#3E2723]/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-[#3E2723]/5 flex justify-between items-center bg-[#8C513E] text-white">
                <div>
                  <h3 className="text-xl font-serif tracking-wide">{editingProduct ? 'Update Product Details' : 'Add New Inventory'}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2">Registry Publication System</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                <form onSubmit={handleSave} className="space-y-10">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#3E2723]/30">Primary Information</p>
                      <input type="text" placeholder="Product Name" className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl border border-[#3E2723]/10 outline-none focus:border-[#8C513E] font-bold uppercase text-[13px] tracking-widest transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                      <textarea placeholder="Technical Specification" className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl border border-[#3E2723]/10 outline-none focus:border-[#8C513E] font-bold uppercase text-[12px] tracking-widest transition-all h-32 resize-none leading-relaxed" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                    </div>
                    <div className="space-y-6">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#3E2723]/30">Valuation & Assets</p>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="Net Price" className="bg-[#3E2723]/5 px-8 py-5 rounded-2xl border border-[#3E2723]/10 outline-none focus:border-[#8C513E] font-bold text-[15px]" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                        <input type="number" placeholder="MRP" className="bg-[#3E2723]/5 px-8 py-5 rounded-2xl border border-[#3E2723]/10 outline-none focus:border-[#8C513E] font-bold text-[15px]" value={formData.mrp} onChange={e => setFormData({ ...formData, mrp: e.target.value })} />
                      </div>
                      <input type="text" placeholder="Media URL" className="w-full bg-[#3E2723]/5 px-8 py-5 rounded-2xl border border-[#3E2723]/10 outline-none focus:border-[#8C513E] font-bold text-[12px]" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#3E2723]/30">Dynamic Variants</p>
                    <div className="grid grid-cols-2 gap-6">
                       {formData.variants.map(v => (
                         <div key={v.id} className="flex gap-2 items-center bg-[#3E2723]/5 p-2 rounded-xl border border-[#3E2723]/10">
                            <input type="text" placeholder="Key" className="flex-1 bg-transparent px-4 py-2 text-[11px] font-black uppercase outline-none" value={v.key} onChange={e => updateVariant(v.id, 'key', e.target.value)} />
                            <input type="text" placeholder="Value" className="flex-1 bg-transparent px-4 py-2 text-[11px] font-black uppercase outline-none border-l border-[#3E2723]/10" value={v.value} onChange={e => updateVariant(v.id, 'value', e.target.value)} />
                            <button type="button" onClick={() => removeVariant(v.id)} className="p-2 text-red-500"><Trash2 size={16} /></button>
                         </div>
                       ))}
                       <button type="button" onClick={addVariantField} className="border-2 border-dashed border-[#3E2723]/10 rounded-xl p-4 flex items-center justify-center text-[#3E2723]/40 hover:border-[#8C513E] hover:text-[#8C513E] transition-all"><Plus size={20} /></button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#3E2723]/30">Taxonomy Tags</p>
                    <div className="flex flex-wrap gap-3">
                       {AVAILABLE_TAGS.map(tag => (
                         <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.tags.includes(tag) ? 'bg-[#3E2723] text-white shadow-xl' : 'bg-[#3E2723]/5 text-[#3E2723]/40 hover:bg-[#3E2723]/10'}`}>{tag}</button>
                       ))}
                    </div>
                  </div>
                  <div className="pt-10 border-t border-[#3E2723]/5 flex gap-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-[#3E2723]/5 text-[#3E2723] py-6 font-black uppercase tracking-[0.3em] text-[12px] rounded-3xl hover:bg-[#3E2723]/10 transition-all">Cancel</button>
                    <button type="submit" className="flex-[2] bg-[#8C513E] text-white py-6 font-black uppercase tracking-[0.3em] text-[12px] rounded-3xl hover:bg-black transition-all shadow-2xl">Publish</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
