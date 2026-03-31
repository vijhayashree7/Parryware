import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }
    }
  };

  return (
    <div className="h-screen bg-[#FDFBF9] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#A68966]/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#4E342E]/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        className="w-full max-w-lg relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(78,52,46,0.08)] border border-[#F5F0EB] overflow-hidden"
        >
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif text-[#4E342E] mb-2">Welcome Back</h1>
              <p className="text-[#8D6E63] font-light tracking-wide text-sm">Please enter your details to sign in</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[#4E342E] text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]" size={18} strokeWidth={1.5} />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-[#FDFBF9] border border-[#F5F0EB] rounded-2xl py-4 pl-12 pr-4 text-[#4E342E] placeholder-[#A68966]/40 focus:outline-none focus:border-[#A68966] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[#4E342E] text-[10px] uppercase tracking-[0.2em] font-bold">Password</label>
                  <a href="#" className="text-[#A68966] text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#4E342E] transition-colors">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68966]" size={18} strokeWidth={1.5} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-[#FDFBF9] border border-[#F5F0EB] rounded-2xl py-4 pl-12 pr-4 text-[#4E342E] placeholder-[#A68966]/40 focus:outline-none focus:border-[#A68966] transition-all"
                  />
                </div>
              </div>

              {/* Login Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#4E342E] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-black/10 hover:bg-[#8D6E63] transition-all flex items-center justify-center gap-3 mt-8"
              >
                Sign In <ArrowRight size={16} />
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F5F0EB]"></div>
              </div>
              <span className="relative px-6 bg-white text-[#A68966] text-[10px] uppercase tracking-widest font-medium">Or continue with</span>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 border border-[#F5F0EB] rounded-2xl text-[#4E342E] text-xs font-medium hover:bg-[#FDFBF9] transition-all">
                <User size={18} strokeWidth={1.5} /> Github
              </button>
              <button className="flex items-center justify-center gap-3 py-4 border border-[#F5F0EB] rounded-2xl text-[#4E342E] text-xs font-medium hover:bg-[#FDFBF9] transition-all">
                <User size={18} strokeWidth={1.5} /> Guest
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#FDFBF9] p-6 text-center border-t border-[#F5F0EB]">
            <p className="text-[#8D6E63] text-sm font-light">
              Don't have an account? {' '}
              <Link to="/signup" className="text-[#4E342E] font-bold hover:text-[#A68966] transition-colors underline underline-offset-4">Sign Up</Link>
            </p>
          </div>
        </motion.div>

        <Link to="/" className="block mt-8 text-center text-[#A68966] text-[10px] uppercase tracking-[0.4em] font-medium hover:text-[#4E342E] transition-colors">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default SignIn;
