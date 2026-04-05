import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../utils/api';
import smokeBg from '../assets/smoke-bg.jpg';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  React.useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        if (!res.ok) throw new Error();
        console.log('--- Server Protocol Online ---');
      } catch (err) {
        setError('CRITICAL: Server Offline. Please start backend terminal.');
      }
    };
    checkServer();
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setSuccess('Verified. Identifying Records...');
    
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setEmail(decoded.email || '');
      setPassword('••••••••'); 

      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      const data = await response.json();
      
      if (data.success) {
        setSuccess('SIGNED IN SUCCESSFULLY!');
        authLogin(data.user, data.token);
        
        const from = location.state?.from || (data.user.email.toLowerCase().includes('admin') ? '/admin' : '/');
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setError(data.message || 'Google Auth Failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Server Error: Connection Failed');
      setSuccess('');
    }
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('Checking Registry...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.success) {
        setSuccess('SIGNED IN SUCCESSFULLY!');
        authLogin(data.user, data.token);
        
        const from = location.state?.from || (email.toLowerCase().includes('admin') ? '/admin' : '/');
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 3000);
      } else {
        setError(data.message || 'Invalid Credentials');
        setSuccess('');
      }
    } catch (err) {
      setError('Server Error: Access Timed Out');
      setSuccess('');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Enter Email Handle First');
      return;
    }
    setError('');
    setSuccess(`Reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center px-4 relative pt-24 md:pt-32 pb-20 overflow-hidden" 
      style={{ 
        fontFamily: "'Times New Roman', Times, serif",
        backgroundImage: `linear-gradient(rgba(252, 251, 249, 0.96), rgba(252, 251, 249, 0.96)), url(${smokeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Motifs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A68966]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4E342E]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="authenticate-box z-10 p-6 flex flex-col items-center shadow-xl">
        <div className="text-center mb-4">
          <h2 className="font-serif-elegant text-2xl text-[#3E2723] mb-1 font-bold tracking-tight">
            Sign In
          </h2>
          <div className="w-8 h-[2px] bg-[#3E2723]/20 mx-auto mb-2" />
          <p className="luxury-label">Registry Access</p>
        </div>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-[10px] font-black uppercase tracking-widest leading-tight">
            <AlertCircle size={14} className="shrink-0" /> {error.includes('Google') || error.includes('Token') ? 'GOOGLE AUTH SYSTEM ERROR' : error}
          </div>
        )}

        {success && (
          <div className="w-full mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 text-[11px] font-black uppercase tracking-widest leading-tight text-center">
            <CheckCircle size={16} className="shrink-0" /> {success}
          </div>
        )}

        <div className="w-full mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Identity Error: System Offline')}
            theme="filled_black"
            size="large"
            shape="rectangular"
          />
        </div>

        <div className="w-full relative mb-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#3E2723]/10"></div>
          </div>
          <span className="relative px-3 bg-[#FCFBF9] text-[#3E2723]/30 text-[8px] uppercase tracking-[0.5em] font-black italic">OR</span>
        </div>

        <form className="w-full space-y-3" onSubmit={handleManualLogin}>
          <div className="space-y-0.5">
            <label className="luxury-label">Email Handle</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="id@residence.com"
              className="w-full glass-input-premium"
            />
          </div>

          <div className="space-y-0.5 relative">
            <div className="flex justify-between items-center">
              <label className="luxury-label">Passphrase</label>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-[9px] uppercase tracking-widest font-black text-[#A68966] hover:text-[#3E2723] transition-colors"
              >
                Lost Access?
              </button>
            </div>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input-premium pr-10"
                style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
              />
              <button
                type="button"
                onClick={() => {
                  console.log('Toggling Password:', !showPassword);
                  setShowPassword(!showPassword);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#3E2723] hover:text-black transition-colors z-20 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#3E2723] text-white py-4 rounded-lg font-black uppercase tracking-[0.6em] text-[10px] shadow-2xl hover:bg-black transition-all active:scale-95"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#3E2723]/5 w-full">
          <p className="text-[#3E2723]/40 text-[10px] font-black uppercase tracking-widest">
            New Identity? {' '}
            <Link to="/signup" state={location.state} className="text-[#3E2723] hover:underline underline-offset-8 decoration-2">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
