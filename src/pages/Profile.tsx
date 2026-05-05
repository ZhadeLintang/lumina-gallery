import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGallery } from '../hooks/useGallery';
import { User, Mail, Shield, Camera, Save, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useGallery();
  
  const userItems = items.filter(item => item.authorId === user?.id);
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 inline-block">Account Settings</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none">Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Profile</span></h1>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="md:col-span-1">
            <div className="glass p-8 border-white/5 rounded-[2.5rem] text-center">
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white text-black rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-black mb-1">{user?.username}</h2>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-6">Digital Creator</p>
              
              <div className="flex justify-center gap-4 border-t border-white/5 pt-6">
                <div className="text-center">
                  <p className="text-xl font-black">{userItems.length}</p>
                  <p className="text-[10px] text-white/30 uppercase font-black">Works</p>
                </div>
                <div className="w-px h-10 bg-white/5" />
                <div className="text-center">
                  <p className="text-xl font-black">1.2k</p>
                  <p className="text-[10px] text-white/30 uppercase font-black">Views</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="w-full mt-6 py-4 glass border-white/5 hover:bg-red-500/10 text-red-400 font-black rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout Session
            </button>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass p-10 lg:p-12 border-white/5 rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black tracking-tight">Personal Information</h3>
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${
                    isEditing ? 'bg-green-500 text-white' : 'bg-primary text-white'
                  }`}
                >
                  {isEditing ? <><Save size={16} /> Save Changes</> : 'Edit Profile'}
                </button>
              </div>

              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-sm font-bold"
                >
                  Profile updated successfully!
                </motion.div>
              )}

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={20} />
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-bold disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={20} />
                    <input 
                      type="email" 
                      disabled={!isEditing}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 glass border-white/5 focus:border-primary/50 outline-none transition-all text-white font-bold disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Account Tier</label>
                  <div className="flex items-center gap-3 p-4 glass border-white/5 rounded-2xl bg-white/5">
                    <Shield className="text-primary" size={24} />
                    <div>
                      <p className="text-white font-black uppercase tracking-tighter">Premium Creator</p>
                      <p className="text-[10px] text-white/30 uppercase font-black">Unlimited Uploads & High Priority Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-10 border-white/5 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent">
               <h3 className="text-xl font-black mb-2">Creator Insights</h3>
               <p className="text-white/40 text-sm font-medium mb-6">Your activity over the last 30 days.</p>
               <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-2/3 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
               </div>
               <div className="flex justify-between mt-3">
                 <p className="text-[10px] font-black text-white/30 uppercase">65% Engagement</p>
                 <p className="text-[10px] font-black text-primary uppercase">+12% Growth</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
