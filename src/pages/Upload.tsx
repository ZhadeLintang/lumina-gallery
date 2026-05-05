import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../context/AuthContext';
import { Upload as UploadIcon, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Upload: React.FC = () => {
  const { addItem } = useGallery();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Digital Art');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imagePreview || !user) return;

    setIsUploading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    addItem({
      title,
      description,
      imageUrl: imagePreview,
      category,
      authorId: user.id,
      authorName: user.username
    });

    setIsUploading(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-16 glass border-white/5 max-w-xl w-full shadow-[0_0_100px_rgba(34,197,94,0.1)] rounded-[3rem]"
        >
          <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tighter leading-none">Creation Published!</h2>
          <p className="text-white/50 text-lg font-medium">Your masterpiece is now live in the global gallery.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 inline-block">New Entry</span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">Share Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vision</span></h1>
          <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto">Upload your digital creations and let the world experience your unique perspective.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 glass p-10 lg:p-14 border-white/5 rounded-[2.5rem]">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Masterpiece Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a captivating name"
                className="w-full px-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-black text-lg placeholder:text-white/10"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Description / Story</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What inspired this work?"
                rows={6}
                className="w-full px-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-medium text-lg resize-none placeholder:text-white/10"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Classification</label>
              <div className="relative">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-8 py-5 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white appearance-none font-black text-lg cursor-pointer"
                >
                  <option value="Digital Art">Digital Art</option>
                  <option value="Photography">Photography</option>
                  <option value="Illustration">Illustration</option>
                  <option value="3D Render">3D Render</option>
                  <option value="Abstract">Abstract</option>
                </select>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                   <UploadIcon size={20} className="rotate-180" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
             <div className="space-y-3">
               <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Visual Asset</label>
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className={`relative aspect-square w-full glass border-2 border-dashed ${imagePreview ? 'border-primary/50 shadow-[0_0_50px_rgba(168,85,247,0.1)]' : 'border-white/10 hover:border-primary/30'} rounded-[2.5rem] overflow-hidden cursor-pointer transition-all flex flex-col items-center justify-center group`}
               >
                 {imagePreview ? (
                   <>
                     <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center backdrop-blur-sm">
                       <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4 scale-75 group-hover:scale-100 transition-transform duration-300">
                         <UploadIcon size={24} />
                       </div>
                       <p className="text-white font-black uppercase tracking-widest text-xs">Change Asset</p>
                     </div>
                   </>
                 ) : (
                   <div className="text-center p-12">
                     <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-white/10 group-hover:text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                       <ImageIcon size={48} />
                     </div>
                     <p className="font-black text-2xl mb-2 tracking-tighter">Import Artwork</p>
                     <p className="text-white/30 font-medium">PNG, JPG or WEBP (Max 10MB)</p>
                   </div>
                 )}
                 <input 
                   type="file" 
                   ref={fileInputRef}
                   onChange={handleImageChange}
                   accept="image/*"
                   className="hidden"
                 />
               </div>
             </div>

             <button 
               type="submit"
               disabled={isUploading || !imagePreview || !title}
               className="w-full py-6 bg-primary hover:bg-primary-hover disabled:bg-white/5 disabled:text-white/10 disabled:cursor-not-allowed rounded-[1.5rem] text-white font-black text-xl transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 hover:-translate-y-1 active:translate-y-0"
             >
               {isUploading ? (
                 <>
                   <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                   Publishing to Gallery...
                 </>
               ) : (
                 <>
                   <UploadIcon size={24} /> Publish Masterpiece
                 </>
               )}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
