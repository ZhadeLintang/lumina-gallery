import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative"
      >
        <div className="text-center mb-10">
          <Link to="/" className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            LUMINA
          </Link>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-text-secondary mt-2">Sign in to manage your digital gallery</p>
        </div>

        <form onSubmit={handleSubmit} className="glass border-white/5 p-8 space-y-6 shadow-2xl">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Anda"
                className="w-full pl-12 pr-6 py-4 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password Anda"
                className="w-full pl-12 pr-6 py-4 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 rounded-xl text-white font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 mt-8"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} /> Login
              </>
            )}
          </button>

          <p className="text-center text-sm text-text-secondary mt-8">
            Belum punya akun? <Link to="/register" className="text-primary hover:underline font-bold">Daftar Sekarang</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
