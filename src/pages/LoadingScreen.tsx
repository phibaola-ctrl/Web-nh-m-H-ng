import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function LoadingScreen() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const STEPS = t('loading.steps', { returnObjects: true }) as string[];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(s => (s < STEPS.length - 1 ? s + 1 : s));
    }, 1500);
    return () => clearInterval(timer);
  }, [STEPS.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-luxury-bg">
      <div className="relative mb-24">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
            borderRadius: ["40%", "48%", "40%"]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 bg-luxury-espresso flex items-center justify-center text-luxury-ivory relative z-10 shadow-2xl shadow-luxury-espresso/10"
        >
          <Sparkles size={48} className="text-luxury-beige" />
        </motion.div>
        <div className="absolute inset-0 bg-luxury-beige blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="text-center mb-20">
        <h2 className="text-5xl font-serif font-bold mb-6 tracking-tight text-luxury-espresso italic">{t('loading.progress')}</h2>
        <p className="text-luxury-espresso/40 font-bold uppercase tracking-[0.3em] text-[10px]">{t('loading.engine')}</p>
      </div>

      <div className="w-full max-w-sm space-y-8">
        {STEPS.map((step, idx) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "flex items-center gap-6 p-6 rounded-[32px] border transition-all duration-1000",
              idx === currentStep 
                ? "bg-white border-luxury-espresso/20 shadow-xl scale-105" 
                : idx < currentStep 
                ? "bg-white/40 border-transparent opacity-60"
                : "bg-transparent border-luxury-beige/20 opacity-30"
            )}
          >
            <div className={cn(
              "flex-shrink-0 transition-colors duration-700",
              idx < currentStep ? "text-luxury-cacao" : idx === currentStep ? "text-luxury-espresso animate-pulse" : "text-luxury-beige"
            )}>
              {idx < currentStep ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </div>
            <span className={cn(
               "font-bold text-xs uppercase tracking-[0.2em]",
               idx === currentStep ? "text-luxury-espresso" : "text-luxury-espresso/40"
            )}>{step}</span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-24 flex flex-col items-center gap-4"
      >
        <div className="w-24 h-px bg-luxury-beige/30" />
        <p className="text-[9px] text-luxury-espresso/30 font-bold uppercase tracking-[0.4em]">
          {t('loading.heritage')}
        </p>
      </motion.div>
    </div>
  );
}
