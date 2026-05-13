import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function EasterEggModal({ isOpen, onClose, onContinue }: EasterEggModalProps) {
  useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-luxury-bg/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-xl bg-luxury-ivory border border-luxury-beige/30 p-12 rounded-[56px] shadow-[0_32px_128px_rgba(59,42,37,0.15)] text-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-luxury-beige/20 blur-[100px] -z-10 rounded-full animate-pulse" />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 bg-luxury-espresso text-luxury-ivory rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-luxury-espresso/20 relative"
              >
                <Crown size={48} className="relative z-10" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-luxury-espresso rounded-3xl"
                />
              </motion.div>

              <h2 className="text-4xl font-serif font-bold text-luxury-espresso mb-6 leading-tight">
                Phi đẹp trai thanh lịch <br /> vô địch khắp vũ trụ
              </h2>

              <p className="text-luxury-cacao/60 font-medium italic tracking-wide text-lg mb-12">
                Bạn vừa khám phá ra bí mật tối cao của hệ thống. Đây là lời khẳng định về nhan sắc và đẳng cấp không thể chối từ! <br />
                liên hệ tạo web :0357829602 <br /> 
                <Sparkles size={16} className="inline-block ml-1 text-luxury-espresso" />
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  onClick={onClose}
                  className="px-10 py-5 rounded-full border border-luxury-beige text-luxury-espresso font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-luxury-bg transition-all flex items-center justify-center"
                >
                  <X size={14} className="mr-2" />
                  Đóng
                </button>
                <button
                  onClick={onContinue}
                  className="px-10 py-5 bg-luxury-espresso text-luxury-ivory rounded-full font-bold text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-luxury-espresso/20 hover:-translate-y-1 transition-all"
                >
                  Tiếp tục mở tour
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Decorative Sparkles */}
            <div className="absolute top-10 left-10 text-luxury-beige/40">
              <Sparkles size={24} />
            </div>
            <div className="absolute bottom-10 right-10 text-luxury-beige/40">
              <Sparkles size={24} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
