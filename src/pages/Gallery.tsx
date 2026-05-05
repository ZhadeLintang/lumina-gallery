import React, { useState } from 'react';
import { useGallery, GalleryItem } from '../hooks/useGallery';
import GalleryCard from '../components/GalleryCard';
import Modal from '../components/Modal';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const { items } = useGallery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-40 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4">Curated Collection</span>
            <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">
              Gallery <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Photorapy</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-4 max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors z-10" size={20} />
              <input 
                type="text" 
                placeholder="Search masterpieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white placeholder:text-white/20 font-medium relative z-10 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto scrollbar-hide px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-full text-sm font-black transition-all whitespace-nowrap tracking-wide border-2 ${
                    selectedCategory === cat 
                      ? 'bg-primary border-primary text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]' 
                      : 'glass border-white/5 text-white/40 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {filteredItems.length > 0 ? (
          <div className="masonry-grid">
            {filteredItems.map(item => (
              <GalleryCard 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center glass border-white/5">
            <p className="text-text-secondary text-lg">No items found matching your criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 text-primary hover:underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        <Modal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      </div>
    </div>
  );
};

export default Gallery;
