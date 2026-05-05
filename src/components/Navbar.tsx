import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Upload, LayoutGrid, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass sticky top-6 z-50 mx-auto max-w-7xl px-8 py-4 flex items-center justify-between border-white/5 shadow-2xl backdrop-blur-xl">
      <Link to="/" className="text-3xl font-black bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent hover:scale-105 transition-transform" style={{ fontFamily: 'var(--font-heading)' }}>
        ZhadeLintang
      </Link>
      
      <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide uppercase">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-primary transition-all">
          <Home size={16} /> Home
        </Link>
        <Link to="/gallery" className="flex items-center gap-2 text-white/70 hover:text-primary transition-all">
          <LayoutGrid size={16} /> Gallery
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/upload" className="flex items-center gap-2 text-white/70 hover:text-primary transition-all">
              <Upload size={16} /> Upload
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-primary transition-all">
              <User size={16} /> Dashboard
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-white/40 uppercase tracking-tighter hidden sm:inline">Creator: {user?.username}</span>
            <button 
              onClick={handleLogout}
              className="p-2.5 hover:bg-red-500/10 rounded-full transition-all text-red-400 hover:scale-110"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-6 py-2.5 text-sm font-bold hover:text-primary transition-all">
              Masuk
            </Link>
            <Link to="/register" className="px-8 py-3 text-sm font-black bg-primary hover:bg-primary-hover rounded-full transition-all shadow-xl shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0">
              Daftar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
