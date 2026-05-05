import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 glass text-primary font-bold text-xs uppercase tracking-widest border-primary/20">
              The Future of Art
            </span>
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
              Digital <span className="bg-gradient-to-br from-primary via-purple-400 to-accent bg-clip-text text-transparent">Galeri</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
              Sebuah wadah premium untuk para kreator digital. Rasakan seni dalam lingkungan berkualitas tinggi yang dibangun untuk generasi visioner berikutnya.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/gallery" className="group relative px-12 py-5 bg-primary hover:bg-primary-hover rounded-full text-white font-black text-lg transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] flex items-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Gallery</span> 
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/register" className="px-12 py-5 glass glass-hover rounded-full text-white font-black text-lg transition-all border-white/10 hover:border-white/20">
                Daftar Sekarang
              </Link>
            </div>
          </motion.div>

          {/* Floating previews */}
          <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden glass border-white/5 group relative"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-${[
                    '1605142859862-978be7eba909',
                    '1541701494587-cb58502866ab',
                    '1462331940025-496dfbfc7564',
                    '1441974231531-c6227db76b6e'
                  ][i-1]}?auto=format&fit=crop&q=80&w=600`} 
                  alt="Feature Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Kurasi Premium", desc: "Rasakan seni dalam lingkungan berkualitas tinggi yang dirancang khusus untuk kreator digital.", color: "primary" },
              { icon: Zap, title: "Secepat Kilat", desc: "Performa yang dioptimalkan memastikan interaksi yang lancar dan pemuatan instan di semua perangkat.", color: "accent" },
              { icon: Shield, title: "Etalase Aman", desc: "Data Anda terlindungi dan karya Anda tersimpan dengan aman di dalam brankas digital kami.", color: "white" }
            ].map((f, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 glass border-white/5 hover:border-white/10 transition-all group"
              >
                <div className={`w-16 h-16 bg-${f.color}/10 rounded-2xl flex items-center justify-center text-${f.color} mb-8 group-hover:scale-110 transition-transform`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
