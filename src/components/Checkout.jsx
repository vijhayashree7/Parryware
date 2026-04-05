import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Smartphone, 
  Landmark, 
  Wallet,
  ShieldCheck,
  ArrowRight,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
const Checkout = () => {
  const { cart } = useCart();
  const { isLoggedIn, user: authUser } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [orderId] = useState(() => Math.floor(Math.random() * 100000));

  const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
  const total = subtotal; // Can add tax/shipping logic here

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, isSuccess]);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FCF9F6] pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] p-10 text-center shadow-2xl shadow-[#4E342E]/10 border border-[#F0E6DD]"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 border-2 border-green-500 rounded-full"
            />
          </div>
          <h2 className="font-serif text-3xl text-[#4E342E] mb-4">Payment Successful!</h2>
          <p className="text-[#8D6E63] text-sm font-sans mb-8 leading-relaxed">
            Your transaction has been processed. A luxury ritual for your home will be prepared shortly.
          </p>
          <div className="bg-[#FCF9F6] rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-[#8D6E63]">
              <span>Order Reference</span>
              <span className="text-[#4E342E]">#AB-{orderId}</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-[#8D6E63]">
              <span>Amount Paid</span>
              <span className="text-[#4E342E]">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Link 
            to="/"
            className="block w-full py-5 bg-[#4E342E] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] shadow-lg hover:bg-[#A68966] transition-all"
          >
            Return to Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A68966]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4E342E]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Checkout Section */}
          <div className="flex-1 w-full">
            {/* Step Indicator */}
            <div className="flex items-center gap-6 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-500 ${step >= s ? 'bg-[#4E342E] text-white shadow-lg' : 'bg-white text-[#D1C6BD] border border-[#F0E6DD]'}`}>
                    {s}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-[#4E342E]' : 'text-[#D1C6BD]'}`}>
                    {s === 1 ? 'Identity' : s === 2 ? 'Registry' : 'Payment'}
                  </span>
                  {s < 3 && <div className={`w-12 h-px ${step > s ? 'bg-[#4E342E]' : 'bg-[#D1C6BD]'}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1: IDENTITY (EXACT MATCH) */}
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full"
                >
                  <div 
                    className="bg-white rounded-[40px] p-12 border border-[#F0E6DD] shadow-2xl shadow-[#4E342E]/5 relative overflow-hidden group luxury-smoke-bg"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#A68966]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                      <div className="flex items-center gap-10">
                        <div className="w-24 h-24 bg-white/80 rounded-[30px] flex items-center justify-center border-2 border-[#F5F0EB] shadow-inner transform group-hover:scale-105 transition-transform duration-500 backdrop-blur-sm">
                          <User size={40} className="text-[#A68966]" />
                        </div>
                        <div>
                          <h2 className="font-serif text-3xl text-[#4E342E] mb-2">Welcome Back, {authUser?.name || 'Admin User'}</h2>
                          <p className="text-[#8D6E63] text-sm lowercase mt-1 opacity-60 tracking-wider">authenticated via {authUser?.email || 'admin@abirami.com'}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => setStep(2)}
                        className="px-12 py-6 bg-[#3E2723] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black transition-all group/btn shadow-xl active:scale-95"
                      >
                        CONTINUE TO DETAILS
                        <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[#F5F0EB] flex items-center gap-4 relative z-10">
                      <div className="bg-green-50/80 px-4 py-2 rounded-full border border-green-100 flex items-center gap-3 backdrop-blur-sm">
                        <CheckCircle2 className="text-green-600" size={18} />
                        <span className="text-[10px] font-black text-green-800 uppercase tracking-widest">IDENTITY VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SHIPPING DETAILS */}
              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div 
                    className="bg-white rounded-[32px] p-8 border border-[#F0E6DD] shadow-lg shadow-[#4E342E]/5"
                    style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('/src/assets/smoke-bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <h2 className="font-serif text-2xl text-[#4E342E] mb-8 relative z-10">Shipping Registry</h2>
                    <form className="space-y-6 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-[#8D6E63]">Receiver Name</label>
                          <div className="relative">
                            <input type="text" placeholder="Full Name" className="w-full h-14 pl-12 pr-6 bg-[#FDFBF9] border border-[#F0E6DD] rounded-2xl text-sm focus:border-[#A68966] outline-none transition-all" />
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1C6BD]" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-[#8D6E63]">Phone Identity</label>
                          <div className="relative">
                            <input type="tel" placeholder="+91 00000 00000" className="w-full h-14 pl-12 pr-6 bg-[#FDFBF9] border border-[#F0E6DD] rounded-2xl text-sm focus:border-[#A68966] outline-none transition-all" />
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1C6BD]" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-[#8D6E63]">Residence Address</label>
                        <div className="relative">
                          <textarea placeholder="Line 1, Landmark, Area..." className="w-full h-32 pl-12 pr-6 py-4 bg-[#FDFBF9] border border-[#F0E6DD] rounded-2xl text-sm focus:border-[#A68966] outline-none transition-all resize-none" />
                          <MapPin size={18} className="absolute left-4 top-4 text-[#D1C6BD]" />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 h-16 bg-white border border-[#F0E6DD] rounded-2xl text-[11px] font-bold uppercase tracking-widest text-[#4E342E] flex items-center justify-center gap-3 hover:bg-[#FDFBF9] transition-all">
                      <ChevronLeft size={18} />
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="[flex:2] h-16 bg-[#4E342E] text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#A68966] transition-all">
                      Proceed to Secure Payment
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT PORTAL */}
              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div 
                    className="bg-white rounded-[32px] p-8 border border-[#F0E6DD] shadow-lg shadow-[#4E342E]/5"
                    style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('/src/assets/smoke-bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <h2 className="font-serif text-2xl text-[#4E342E]">Select Payment Mode</h2>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4E342E]/5 rounded-full border border-[#4E342E]/10 backdrop-blur-sm">
                        <ShieldCheck size={14} className="text-[#4E342E]" />
                        <span className="text-[9px] font-bold text-[#4E342E] uppercase tracking-widest">End-to-End Encrypted</span>
                      </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                      {/* Accordion Items */}
                      {[
                        { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                        { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                        { id: 'upi', label: 'Google Pay / Other UPI', icon: Smartphone },
                        { id: 'net', label: 'Netbanking', icon: Landmark },
                        { id: 'wallet', label: 'Digital Wallet', icon: Wallet }
                      ].map((mode) => (
                        <div key={mode.id} className={`rounded-2xl border transition-all duration-500 overflow-hidden ${paymentMethod === mode.id ? 'border-[#A68966] bg-[#FDFBF9]' : 'border-[#F0E6DD] bg-white'}`}>
                          <button 
                            onClick={() => setPaymentMethod(mode.id)}
                            className="w-full p-6 flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${paymentMethod === mode.id ? 'bg-[#A68966] text-white' : 'bg-[#FDFBF9] text-[#8D6E63] group-hover:bg-[#F0E6DD]'}`}>
                                <mode.icon size={20} />
                              </div>
                              <span className="text-sm font-bold uppercase tracking-widest text-[#4E342E]">{mode.label}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === mode.id ? 'bg-[#4E342E] border-[#4E342E]' : 'border-[#D1C6BD]'}`}>
                              {paymentMethod === mode.id && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </button>

                          {/* Expanded Card Form */}
                          {paymentMethod === 'card' && mode.id === 'card' && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              className="px-6 pb-8 space-y-8"
                            >
                              {/* Visual Card Preview */}
                              <div className="relative h-56 w-full max-w-[400px] mx-auto perspective-[1000px] mb-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#4E342E] via-[#2D1B18] to-[#4E342E] rounded-3xl p-8 shadow-2xl shadow-[#4E342E]/40 overflow-hidden">
                                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                  <div className="flex justify-between items-start mb-12">
                                    <div className="w-12 h-10 bg-gradient-to-br from-[#A68966] to-[#634C32] rounded-lg shadow-inner flex items-center justify-center border border-white/20">
                                      <div className="w-8 h-px bg-white/40" />
                                    </div>
                                    <h4 className="text-white/60 text-xs font-serif italic text-right uppercase tracking-widest">Abirami Agency Signature</h4>
                                  </div>
                                  <div className="space-y-6">
                                    <div className="text-white text-xl font-mono tracking-[0.2em] h-8">
                                      {cardData.number || '•••• •••• •••• ••••'}
                                    </div>
                                    <div className="flex justify-between items-end">
                                      <div className="space-y-1">
                                        <p className="text-[8px] text-white/40 uppercase tracking-widest">Card Holder</p>
                                        <p className="text-white text-[10px] uppercase font-bold tracking-widest truncate max-w-[150px]">{cardData.name || 'Your Name'}</p>
                                      </div>
                                      <div className="space-y-1 text-right">
                                        <p className="text-[8px] text-white/40 uppercase tracking-widest">Expiry</p>
                                        <p className="text-white text-[10px] font-bold font-mono">{cardData.expiry || 'MM/YY'}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Form Fields */}
                              <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8D6E63] ml-1">Cardholder Name</label>
                                  <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={cardData.name}
                                    onChange={(e) => setCardData({...cardData, name: e.target.value})}
                                    className="w-full h-12 px-5 bg-white border border-[#F0E6DD] rounded-xl text-sm focus:border-[#A68966] outline-none" 
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8D6E63] ml-1">Card Number</label>
                                  <div className="relative">
                                    <input 
                                      type="text" 
                                      placeholder="0000 0000 0000 0000"
                                      value={cardData.number}
                                      onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)})}
                                      className="w-full h-12 px-5 bg-white border border-[#F0E6DD] rounded-xl text-sm focus:border-[#A68966] outline-none font-mono" 
                                    />
                                    <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D1C6BD]" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#8D6E63] ml-1">Expiry Date</label>
                                    <input 
                                      type="text" 
                                      placeholder="MM/YY"
                                      value={cardData.expiry}
                                      onChange={(e) => setCardData({...cardData, expiry: e.target.value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().slice(0, 5)})}
                                      className="w-full h-12 px-5 bg-white border border-[#F0E6DD] rounded-xl text-sm focus:border-[#A68966] outline-none font-mono" 
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#8D6E63] ml-1">Security Code</label>
                                    <input 
                                      type="password" 
                                      placeholder="CVV"
                                      value={cardData.cvv}
                                      onChange={(e) => setCardData({...cardData, cvv: e.target.value.slice(0, 3)})}
                                      className="w-full h-12 px-5 bg-white border border-[#F0E6DD] rounded-xl text-sm focus:border-[#A68966] outline-none font-mono" 
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-1 h-16 bg-white border border-[#F0E6DD] rounded-2xl text-[11px] font-bold uppercase tracking-widest text-[#4E342E] flex items-center justify-center gap-3 hover:bg-[#FDFBF9] transition-all">
                      <ChevronLeft size={18} />
                      Details
                    </button>
                    <button 
                      onClick={handlePayment} 
                      disabled={isProcessing}
                      className="[flex:2] h-16 bg-[#4E342E] text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#A68966] transition-all relative overflow-hidden group shadow-xl"
                    >
                      {isProcessing ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Make Payment: ₹{total.toLocaleString('en-IN')}
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0 sticky top-32">
            <div className="bg-white rounded-[32px] overflow-hidden border border-[#F0E6DD] shadow-xl shadow-[#4E342E]/5">
              <div className="px-8 py-6 bg-[#4E342E] text-white">
                <h3 className="font-serif text-xl">Sanctuary Summary</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">Review your selections</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-xl bg-[#FDFBF9] border border-[#F5F0EB] overflow-hidden shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-[12px] font-bold text-[#4E342E] uppercase tracking-tight line-clamp-1">{item.product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] text-[#A68966] font-sans">Qty: {item.quantity}</p>
                          <p className="text-[12px] font-serif text-[#4E342E]">₹{(item.quantity * item.product.price).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[#F5F0EB]">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-[#8D6E63]">
                    <span>Acquisitions Total</span>
                    <span className="text-[#4E342E]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-[#8D6E63]">
                    <span>Shipping Logistics</span>
                    <span className="text-green-600">Complimentary</span>
                  </div>
                  <div className="pt-4 border-t border-[#F5F0EB] flex justify-between items-end">
                    <span className="font-serif text-2xl text-[#4E342E]">Order Value</span>
                    <span className="font-serif text-2xl text-[#A68966]">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-4 px-4 py-3 bg-[#FDFBF9] rounded-xl border border-[#F5F0EB] flex items-center gap-3">
                  <Package size={16} className="text-[#A68966]" />
                  <p className="text-[9px] font-bold text-[#8D6E63] leading-relaxed uppercase tracking-widest italic">
                    Certified Genuine Parryware Studio Assets
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
