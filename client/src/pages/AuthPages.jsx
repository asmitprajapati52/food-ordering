import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('user@hungerrush.com');
  const [password, setPassword] = useState('password123');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate(redirect);
    }
  };

  const fillAdmin = () => {
    setEmail('admin@hungerrush.com');
    setPassword('password123');
  };

  const fillUser = () => {
    setEmail('user@hungerrush.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-xl space-y-6">
        
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFC857] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/20 text-white font-black text-2xl">
            ⚡
          </div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Welcome Back</h2>
          <p className="text-xs text-neutral-500">Sign in to your Hunger Rush account</p>
        </div>

        {/* Demo Fast Login Pills */}
        <div className="p-3 rounded-2xl bg-orange-50 dark:bg-neutral-900 border border-orange-200/60 dark:border-neutral-700 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-wider text-[#FF6B35]">Instant Demo Credentials</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillUser}
              className="flex-1 py-1.5 rounded-xl bg-white dark:bg-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:border-[#FF6B35]"
            >
              👤 Customer Demo
            </button>
            <button
              type="button"
              onClick={fillAdmin}
              className="flex-1 py-1.5 rounded-xl bg-white dark:bg-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:border-[#FF6B35]"
            >
              🛡️ Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85924] text-white font-black text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#FF6B35] hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password, phone);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-xl space-y-6">
        
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFC857] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/20 text-white font-black text-2xl">
            ⚡
          </div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Create Account</h2>
          <p className="text-xs text-neutral-500">Join Hunger Rush for lightning fast gourmet food</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Mobile Phone</label>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
              />
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85924] text-white font-black text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Creating...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#FF6B35] hover:underline">
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
};

