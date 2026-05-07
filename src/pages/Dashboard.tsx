import React, { useState } from 'react';
import { useGallery, GalleryItem } from '../hooks/useGallery';
import { useAuth } from '../context/AuthContext';
import { Trash2, Edit3, Image as ImageIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EditModal from '../components/EditModal';

const Dashboard: React.FC = () => {
  const { items, deleteItem } = useGallery();
  const { user } = useAuth();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const userItems = items.filter(item => item.authorId === user?.id);

  return (
    <div className="min-h-screen pt-40 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 inline-block">Management</span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">Creator <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</span></h1>
            <p className="text-white/50 text-lg font-medium">Kelola galeri seni digital Anda dan pantau performa karya Anda.</p>
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
                className="glass border-white/5 overflow-hidden group flex flex-col rounded-[2rem]"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="p-3 bg-white/10 hover:bg-primary rounded-xl text-white backdrop-blur-xl transition-all hover:scale-110"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Hapus karya seni ini selamanya?')) {
                          deleteItem(item.id);
                        }
                      }}
                      className="p-3 bg-red-500/20 hover:bg-red-500 rounded-xl text-white backdrop-blur-xl transition-all hover:scale-110 border border-red-500/20"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-black tracking-tight truncate">{item.title}</h3>
                    <span className="text-[9px] px-3 py-1 bg-primary/20 text-primary rounded-full font-black uppercase tracking-widest border border-primary/20">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-xs font-black">
                       <span className="flex items-center gap-1"><Edit3 size={12} /> {item.comments?.length || 0}</span>
                       <span className="flex items-center gap-1 text-red-500/50"><Trash2 size={12} className="hidden" /> {item.likes?.length || 0} Likes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center glass border-white/5 rounded-[3rem] border-dashed border-2">
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-white/10">
              <ImageIcon size={40} />
            </div>
            <h3 className="text-3xl font-black mb-2 tracking-tighter">No masterpieces yet</h3>
            <p className="text-white/40 font-medium mb-10 max-w-md mx-auto">Mulailah perjalanan kreatif Anda dengan mengunggah karya digital pertama Anda ke galeri global.</p>
            <Link to="/upload" className="inline-flex items-center gap-3 px-10 py-5 bg-primary hover:bg-primary-hover rounded-2xl font-black text-white transition-all shadow-2xl shadow-primary/30">
              <Plus size={24} /> Create Your First Post
            </Link>
          </div>
        )}

        <EditModal 
          item={editingItem} 
          onClose={() => setEditingItem(null)} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
