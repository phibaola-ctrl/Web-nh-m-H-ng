import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Globe, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingProps {
  onStart: () => void;
  onViewSaved?: () => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000", // Italy
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000", // Japan
  "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=2000", // Mountains
  "https://images.unsplash.com/photo-1506929113614-bb4885839af9?auto=format&fit=crop&q=80&w=2000", // Beach
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000", // San Francisco bridge/ocean
];

export default function Landing({ onStart, onViewSaved }: LandingProps) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-luxury-bg min-h-screen flex flex-col">
      {/* Cinematic Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.15, filter: "blur(4px)" }}
              animate={{ scale: 1, filter: "blur(12px)" }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMAGES[currentImageIndex]}
                alt="Background"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Cinematic Overlays */}
        {/* Main Darkening Overlay */}
        <div className="absolute inset-0 bg-luxury-espresso/30 backdrop-blur-[1px]" />
        
        {/* Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-espresso/40 via-transparent to-luxury-bg/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,42,37,0.4)_100%)]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex-1 flex flex-col items-center justify-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center w-full max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-12 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
          >
            <Sparkles size={14} className="text-luxury-beige" />
            <span>{t('landing.badge')}</span>
          </motion.div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,6vw,6rem)] font-serif font-bold leading-[1.2] tracking-tight text-white mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {t('landing.titleMain')}
          </h1>
          
          <p className="text-base md:text-xl text-white/90 mb-12 max-w-3xl leading-relaxed font-medium italic tracking-widest px-4 drop-shadow-xl">
            {t('landing.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 w-full justify-center items-center">
            <button 
              onClick={onStart}
              className="group relative px-20 py-7 bg-white text-luxury-espresso rounded-full text-xs font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all duration-700 shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              <span className="relative z-10">{t('landing.plan')}</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" size={20} />
              <div className="absolute inset-0 bg-luxury-beige/50 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12" />
            </button>
            
            <button 
              onClick={() => onViewSaved?.()}
              className="group px-14 py-7 bg-white/5 backdrop-blur-xl border border-white/30 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-white/20 transition-all text-white duration-700 shadow-2xl flex items-center gap-2"
            >
              {t('nav.saved')}
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="mt-32 grid md:grid-cols-3 gap-12 sm:gap-16 w-full max-w-6xl"
        >
          {[
            { icon: <Sparkles size={24} />, title: t('landing.feature1Title'), desc: t('landing.feature1Desc') },
            { icon: <Globe size={24} />, title: t('landing.feature2Title'), desc: t('landing.feature2Desc') },
            { icon: <ArrowRight size={24} />, title: t('landing.feature3Title'), desc: t('landing.feature3Desc') }
          ].map((feature, i) => (
            <div key={i} className="group flex flex-col items-center text-center cursor-default p-8 rounded-[40px] hover:bg-white/5 transition-all duration-700">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-2xl text-white rounded-[20px] flex items-center justify-center mb-10 border border-white/20 group-hover:bg-white group-hover:text-luxury-espresso transition-all duration-700 shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
                {feature.icon}
              </div>
              <h4 className="text-xl font-serif font-bold mb-5 text-white tracking-wide">{feature.title}</h4>
              <p className="text-white/50 leading-relaxed font-medium text-xs uppercase tracking-widest max-w-[240px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}



