import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, User } from 'lucide-react';
import { GalleryItem } from '../hooks/useGallery';

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="masonry-item group relative overflow-hidden rounded-[2rem] glass border-white/5 cursor-pointer shadow-xl hover:shadow-primary/20 transition-all"
      onClick={onClick}
    >
      <div className="relative aspect-auto overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-auto block transition-transform duration-1000 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                {item.category}
              </span>
              <div className="p-2.5 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-primary transition-colors">
                <Maximize2 size={18} />
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2 leading-tight">{item.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-white/50 font-bold">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={12} />
              </div>
              <span>{item.authorName}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
