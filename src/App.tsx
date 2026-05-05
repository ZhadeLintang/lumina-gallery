import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      
      {/* Footer */}
      {showNavbar && (
        <footer className="py-12 border-t border-white/5 mt-20 text-center text-text-secondary text-sm">
          <p>© 2026 ZhadeLintang. Built for the digital age.</p>
        </footer>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
