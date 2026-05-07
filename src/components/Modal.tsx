import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Send, MessageCircle } from 'lucide-react';
import { GalleryItem, useGallery } from '../hooks/useGallery';
import { useAuth } from '../context/AuthContext';

interface ModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  const { addComment } = useGallery();
  const { user, isLoggedIn } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!item) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    addComment(item.id, {
      userId: user.id,
      username: user.username,
      text: commentText
    });
    setCommentText('');
  };

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
          className="relative max-w-7xl w-full max-h-[95vh] overflow-hidden glass border-white/10 flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-[2.5rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-primary backdrop-blur-xl rounded-full text-white transition-all hover:rotate-90 hover:scale-110"
          >
            <X size={24} />
          </button>

          {/* Image Side */}
          <div className="lg:w-[55%] h-[35vh] lg:h-auto bg-black/60 flex items-center justify-center overflow-hidden relative group">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-contain p-4 lg:p-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Content Side */}
          <div className="lg:w-[45%] flex flex-col h-[60vh] lg:h-auto bg-gradient-to-br from-white/[0.03] to-transparent border-l border-white/5 overflow-hidden">
            <div className="p-10 lg:p-12 overflow-y-auto flex-1 scrollbar-hide">
              <div className="mb-10">
                <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block border border-primary/20">
                  {item.category}
                </span>
                <h2 className="text-4xl font-black mb-6 tracking-tighter leading-none bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                  {item.title}
                </h2>
                <p className="text-white/50 text-lg leading-relaxed font-medium mb-8">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 p-3 glass border-white/5 rounded-2xl flex-1 min-w-[150px]">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Creator</p>
                      <p className="text-white font-black text-sm">{item.authorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 glass border-white/5 rounded-2xl flex-1 min-w-[150px]">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Date</p>
                      <p className="text-white font-black text-sm">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t border-white/5 pt-10">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle size={24} className="text-primary" />
                  <h3 className="text-xl font-black tracking-tight">Gallery Comments</h3>
                  <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-black">{item.comments?.length || 0}</span>
                </div>

                <div className="space-y-6">
                  {item.comments && item.comments.length > 0 ? (
                    item.comments.map(comment => (
                      <div key={comment.id} className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-black">
                            {comment.username.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-black text-sm">{comment.username}</span>
                          <span className="text-[10px] text-white/20 font-bold ml-auto">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed pl-11">
                          {comment.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center glass border-white/5 rounded-[2rem] border-dashed">
                      <p className="text-white/20 font-bold italic">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="p-8 border-t border-white/5 bg-black/20">
              {isLoggedIn ? (
                <form onSubmit={handleAddComment} className="relative">
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full pl-6 pr-16 py-4 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-medium text-sm placeholder:text-white/10"
                  />
                  <button 
                    type="submit"
                    disabled={!commentText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary hover:bg-primary-hover disabled:bg-white/5 disabled:text-white/10 rounded-xl text-white transition-all active:scale-90"
                  >
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                    Please <a href="/login" className="text-primary hover:underline">login</a> to join the conversation
                  </p>
                </div>
              )}
              <button 
                className="mt-6 w-full py-4 bg-white text-black hover:bg-primary hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                onClick={() => window.open(item.imageUrl, '_blank')}
              >
                Open Full Resolution
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
