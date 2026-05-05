import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag } from 'lucide-react';
import { GalleryItem } from '../hooks/useGallery';

interface ModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl w-full max-h-[90vh] overflow-hidden glass border-white/10 flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-[2.5rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-primary backdrop-blur-xl rounded-full text-white transition-all hover:rotate-90 hover:scale-110"
          >
            <X size={24} />
          </button>

          <div className="lg:w-[65%] h-[40vh] lg:h-auto bg-black/60 flex items-center justify-center overflow-hidden relative group">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-contain p-4 lg:p-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          </div>

          <div className="lg:w-[35%] p-10 lg:p-14 flex flex-col overflow-y-auto bg-gradient-to-br from-white/[0.03] to-transparent border-l border-white/5">
            <div className="mb-10">
              <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block border border-primary/20">
                {item.category}
              </span>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter leading-none bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                {item.title}
              </h2>
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            <div className="space-y-6 mt-auto">
              <div className="flex items-center gap-5 p-4 glass border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mb-0.5">Creator</p>
                  <p className="text-white font-black text-lg">{item.authorName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 p-4 glass border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mb-0.5">Published</p>
                  <p className="text-white font-black text-lg">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            <button 
              className="mt-12 w-full py-5 bg-white text-black hover:bg-primary hover:text-white rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
              onClick={() => window.open(item.imageUrl, '_blank')}
            >
              Open Full Resolution
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
