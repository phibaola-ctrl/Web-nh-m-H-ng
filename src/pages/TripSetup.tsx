import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Users, 
  Heart, 
  Wallet,
  User,
  Heart as Couple,
  Home,
  Users as Friends,
  Palmtree,
  Camera,
  Coffee,
  Utensils,
  Music,
  ShoppingBag,
  History,
  Mountain
} from 'lucide-react';
import { TripPreferences } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface TripSetupProps {
  onSubmit: (prefs: TripPreferences) => void;
  onBack: () => void;
}

export default function TripSetup({ onSubmit, onBack }: TripSetupProps) {
  const { t } = useTranslation();
  
  const INTERESTS = [
    { id: 'culture', icon: <History />, label: t('setup.step3.interests.culture') },
    { id: 'nature', icon: <Palmtree />, label: t('setup.step3.interests.nature') },
    { id: 'food', icon: <Utensils />, label: t('setup.step3.interests.food') },
    { id: 'adventure', icon: <Mountain />, label: t('setup.step3.interests.adventure') },
    { id: 'shopping', icon: <ShoppingBag />, label: t('setup.step3.interests.shopping') },
    { id: 'nightlife', icon: <Music />, label: t('setup.step3.interests.nightlife') },
    { id: 'art', icon: <Camera />, label: t('setup.step3.interests.art') },
    { id: 'relaxation', icon: <Coffee />, label: t('setup.step3.interests.relaxation') },
  ];

  const COMPANIONS = [
    { id: 'solo', icon: <User />, label: t('setup.step2.solo') },
    { id: 'couple', icon: <Couple />, label: t('setup.step2.couple') },
    { id: 'family', icon: <Home />, label: t('setup.step2.family') },
    { id: 'friends', icon: <Friends />, label: t('setup.step2.friends') },
  ];

  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<Partial<TripPreferences>>({
    destination: '',
    days: 3,
    companions: 'solo',
    interests: [],
    budget: 'medium'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleInterest = (id: string) => {
    setPrefs(p => ({
      ...p,
      interests: p.interests?.includes(id) 
        ? p.interests.filter(i => i !== id)
        : [...(p.interests || []), id]
    }));
  };

  const isStepValid = () => {
    if (step === 1) return prefs.destination!.trim().length > 0 && prefs.days! > 0;
    if (step === 2) return !!prefs.companions;
    if (step === 3) return (prefs.interests || []).length > 0;
    if (step === 4) return !!prefs.budget;
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-40 min-h-screen flex flex-col">
      <div className="mb-8 md:mb-12">
        <button onClick={onBack} className="flex items-center gap-3 text-luxury-espresso/60 hover:text-luxury-espresso transition-colors font-bold uppercase tracking-[0.3em] text-[10px]">
          <ChevronLeft size={16} />
          <span>{t('setup.exit')}</span>
        </button>
      </div>

      <div className="flex gap-4 mb-12 md:mb-24">
        {[1, 2, 3, 4].map(s => (
          <div 
            key={s} 
            className="flex-1 flex flex-col gap-3 group cursor-pointer"
            onClick={() => s < step && setStep(s)}
          >
            <div className={cn(
              "h-1 w-full rounded-full transition-all duration-1000",
              step >= s ? "bg-luxury-espresso" : "bg-luxury-beige/30"
            )} />
            <span className={cn(
               "text-[12px] font-bold uppercase tracking-[0.3em] transition-opacity duration-700",
               step === s ? "opacity-100 text-luxury-espresso" : "opacity-30 text-luxury-cacao"
            )}>
              {t(`setup.steps.${s as 1|2|3|4}`)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-[400px] py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-7xl font-serif font-bold mb-6 text-luxury-espresso leading-[1.2] tracking-tight">{t('setup.step1.title')}</h2>
                <p className="text-luxury-cacao/60 text-xl font-medium italic tracking-wide">{t('setup.step1.subtitle')}</p>
              </div>
              <div className="space-y-16">
                <div className="relative group">
                  <label className="block text-[14px] font-bold uppercase tracking-[0.4em] text-luxury-cacao/60 mb-6">{t('setup.step1.label')}</label>
                  <input 
                    type="text"
                    value={prefs.destination}
                    onChange={e => setPrefs(p => ({ ...p, destination: e.target.value }))}
                    placeholder={t('setup.step1.placeholder')}
                    className="w-full text-5xl font-serif font-bold py-8 bg-transparent border-b border-luxury-beige focus:border-luxury-espresso outline-none transition-all placeholder:text-luxury-beige/40"
                    autoFocus
                  />
                  <div className="absolute bottom-0 left-0 h-px bg-luxury-espresso w-0 group-focus-within:w-full transition-all duration-1000" />
                </div>
                <div>
                  <label className="block text-[14px] font-bold uppercase tracking-[0.4em] text-luxury-cacao/60 mb-8">{t('setup.step1.daysLabel')}</label>
                  <div className="flex items-center gap-12">
                    <button 
                      onClick={() => setPrefs(p => ({ ...p, days: Math.max(1, (p.days || 3) - 1) }))}
                      className="w-16 h-16 rounded-full border border-luxury-beige flex items-center justify-center font-bold text-2xl hover:bg-luxury-ivory dark:hover:bg-luxury-ivory/20 hover:border-luxury-espresso transition-all text-luxury-espresso shadow-sm"
                    >—</button>
                    <span className="text-7xl font-serif font-bold w-24 text-center text-luxury-espresso">{prefs.days}</span>
                    <button 
                      onClick={() => setPrefs(p => ({ ...p, days: (p.days || 3) + 1 }))}
                      className="w-16 h-16 rounded-full border border-luxury-beige flex items-center justify-center font-bold text-2xl hover:bg-luxury-ivory dark:hover:bg-luxury-ivory/20 hover:border-luxury-espresso transition-all text-luxury-espresso shadow-sm"
                    >+</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-7xl font-serif font-bold mb-6 text-luxury-espresso leading-[1.2] tracking-tight">{t('setup.step2.title')}</h2>
                <p className="text-luxury-cacao/60 text-xl font-medium italic">{t('setup.step2.subtitle')}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {COMPANIONS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setPrefs(p => ({ ...p, companions: c.id as any }))}
                    className={cn(
                      "p-12 rounded-[56px] border transition-all duration-700 flex flex-col items-center gap-6 group",
                      prefs.companions === c.id 
                        ? "bg-luxury-ivory border-luxury-espresso shadow-xl shadow-luxury-espresso/5 text-luxury-espresso scale-[1.02]" 
                        : "bg-luxury-ivory/40 dark:bg-luxury-ivory/10 border-luxury-beige/30 hover:border-luxury-espresso/40 text-luxury-espresso/60"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500",
                      prefs.companions === c.id ? "bg-luxury-espresso text-luxury-ivory" : "bg-luxury-ivory/40 dark:bg-luxury-ivory/20"
                    )}>
                      {c.icon}
                    </div>
                    <span className="font-serif font-bold text-2xl uppercase tracking-widest">{c.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-7xl font-serif font-bold mb-6 text-luxury-espresso leading-[1.2] tracking-tight">{t('setup.step3.title')}</h2>
                <p className="text-luxury-cacao/60 text-xl font-medium italic">{t('setup.step3.subtitle')}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {INTERESTS.map(i => (
                  <button
                    key={i.id}
                    onClick={() => toggleInterest(i.id)}
                    className={cn(
                      "p-10 rounded-[48px] border transition-all duration-700 flex flex-col items-center gap-5 group",
                      prefs.interests?.includes(i.id)
                        ? "bg-luxury-ivory border-luxury-espresso shadow-xl shadow-luxury-espresso/5 text-luxury-espresso scale-105"
                        : "bg-luxury-ivory/40 dark:bg-luxury-ivory/10 border-luxury-beige/30 hover:border-luxury-espresso/40 text-luxury-espresso/40"
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all duration-500",
                      prefs.interests?.includes(i.id) ? "bg-luxury-espresso text-luxury-ivory" : "bg-luxury-ivory/40 dark:bg-luxury-ivory/20"
                    )}>
                      {i.icon}
                    </div>
                    <span className="font-bold text-[12px] uppercase tracking-[0.2em] text-center leading-relaxed h-8 flex items-center">{i.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-7xl font-serif font-bold mb-6 text-luxury-espresso leading-[1.2] tracking-tight">{t('setup.step4.title')}</h2>
                <p className="text-luxury-cacao/60 text-xl font-medium italic tracking-wide">{t('setup.step4.subtitle')}</p>
              </div>
              <div className="space-y-8">
                {[
                  { id: 'budget', label: t('setup.step4.budget.modest.label'), desc: t('setup.step4.budget.modest.desc'), price: '$' },
                  { id: 'medium', label: t('setup.step4.budget.balanced.label'), desc: t('setup.step4.budget.balanced.desc'), price: '$$' },
                  { id: 'luxury', label: t('setup.step4.budget.luxury.label'), desc: t('setup.step4.budget.luxury.desc'), price: '$$$' },
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => setPrefs(p => ({ ...p, budget: b.id as any }))}
                    className={cn(
                      "w-full p-12 rounded-[56px] border transition-all duration-700 flex items-center justify-between text-left group",
                      prefs.budget === b.id
                        ? "bg-luxury-ivory border-luxury-espresso shadow-xl shadow-luxury-espresso/5 scale-[1.02]"
                        : "bg-luxury-ivory/40 dark:bg-luxury-ivory/10 border-luxury-beige/30 hover:border-luxury-espresso/40 text-luxury-espresso/40"
                    )}
                  >
                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-3xl uppercase tracking-tighter text-luxury-espresso">{b.label}</h3>
                      <p className="text-sm font-medium tracking-wide text-luxury-cacao/60">{b.desc}</p>
                    </div>
                    <span className="text-3xl font-mono italic opacity-40">{b.price}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-20 flex justify-between items-center glass-luxury p-8 rounded-[60px] border border-luxury-ivory/40 dark:border-luxury-ivory/10">
        {step > 1 ? (
          <button 
            onClick={prevStep}
            className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.4em] text-luxury-espresso/60 hover:text-luxury-espresso transition-all px-10 py-3"
          >
            <ChevronLeft size={16} />
            <span>{t('setup.back')}</span>
          </button>
        ) : <div />}

        <button
          onClick={step === 4 ? () => onSubmit(prefs as TripPreferences) : nextStep}
          disabled={!isStepValid()}
          className={cn(
            "px-16 py-5 bg-luxury-espresso text-luxury-ivory rounded-full font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 transition-all duration-700 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed",
            isStepValid() && "hover:shadow-luxury-espresso/20 hover:-translate-y-1 active:translate-y-0"
          )}
        >
          <span>{step === 4 ? t('setup.finish') : t('setup.advance')}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

