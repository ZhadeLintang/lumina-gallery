import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Image as ImageIcon } from 'lucide-react';
import { GalleryItem, useGallery } from '../hooks/useGallery';

interface EditModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose }) => {
  const { updateItem } = useGallery();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateItem(item.id, { title, description, category });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          className="relative max-w-2xl w-full glass border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-10 lg:p-14">
            <header className="flex items-center justify-between mb-10">
              <div>
                <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2 inline-block">Management</span>
                <h2 className="text-4xl font-black tracking-tighter leading-none">Edit <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Artwork</span></h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all"
              >
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="aspect-video w-full glass border-white/5 rounded-[1.5rem] overflow-hidden relative mb-4">
                 <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/50 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <ImageIcon size={12} /> Image is read-only
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-black text-lg"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Description</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-medium text-lg resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-black text-lg appearance-none"
                >
                  <option value="Digital Art">Digital Art</option>
                  <option value="Photography">Photography</option>
                  <option value="Illustration">Illustration</option>
                  <option value="3D Render">3D Render</option>
                  <option value="Abstract">Abstract</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-white text-black hover:bg-primary hover:text-white rounded-[1.5rem] font-black text-xl transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95"
              >
                <Save size={24} /> Update Masterpiece
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditModal;
