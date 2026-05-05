import React from 'react';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../context/AuthContext';
import { Trash2, Edit3, Image as ImageIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { items, deleteItem } = useGallery();
  const { user } = useAuth();

  const userItems = items.filter(item => item.authorId === user?.id);

  return (
    <div className="min-h-screen pt-40 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 inline-block">Management</span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">Welcome, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</span></h1>
            <p className="text-white/50 text-lg font-medium">Kelola Galeri Anda dan lacak aset digital Anda.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="glass px-8 py-5 border-white/5 flex items-center gap-5 shadow-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <ImageIcon size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-white/30 tracking-widest mb-1">Total Works</p>
                <p className="text-3xl font-black">{userItems.length}</p>
              </div>
            </div>
            <Link to="/upload" className="group bg-primary hover:bg-primary-hover px-10 py-5 rounded-2xl flex items-center gap-3 font-black text-white transition-all shadow-xl shadow-primary/30 hover:-translate-y-1">
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" /> New Upload
            </Link>
          </div>
        </header>

        {userItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userItems.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass border-white/5 overflow-hidden group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button 
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this art?')) {
                          deleteItem(item.id);
                        }
                      }}
                      className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white backdrop-blur-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      className="p-2 bg-white/20 hover:bg-white/40 rounded-lg text-white backdrop-blur-md transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold truncate">{item.title}</h3>
                    <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-white/60 font-bold uppercase">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
                    Uploaded on {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center glass border-white/5 rounded-3xl border-dashed border-2">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
              <ImageIcon size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No uploads yet</h3>
            <p className="text-text-secondary mb-8">Start your creative journey by uploading your first digital work.</p>
            <Link to="/upload" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover rounded-full font-bold transition-all shadow-lg shadow-primary/20">
              <Plus size={20} /> Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
