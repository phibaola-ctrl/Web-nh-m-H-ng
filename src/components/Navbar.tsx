import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';

const LANGUAGES = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'lo', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'km', name: 'ខ្មែរ', flag: '🇰🇭' }
];

interface NavbarProps {
  onNavigate: (view: 'landing' | 'setup' | 'loading' | 'result' | 'saved') => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isTourGenerated = currentView === 'result';
  const currentLanguage = LANGUAGES.find(l => l.code === i18n.language.split('-')[0]) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-luxury-ivory/40 dark:bg-luxury-ivory/20 backdrop-blur-md border border-luxury-beige/20 rounded-[32px] px-8 py-3 glass-luxury">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 bg-luxury-espresso rounded-xl flex items-center justify-center text-luxury-ivory font-serif font-bold text-xs transition-colors duration-500">P</div>
          <span className="font-serif font-bold text-lg tracking-tight text-luxury-espresso transition-colors duration-500">{t('nav.logo')}</span>
        </motion.div>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-espresso/60 transition-colors duration-500">
            <button 
              onClick={() => onNavigate('landing')}
              className={cn("hover:text-luxury-espresso transition-colors", currentView === 'landing' && "text-luxury-espresso border-b border-luxury-espresso pb-1")}
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => onNavigate('saved')}
              className={cn("hover:text-luxury-espresso transition-colors", currentView === 'saved' && "text-luxury-espresso border-b border-luxury-espresso pb-1")}
            >
              {t('nav.saved')}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-luxury-ivory/60 hover:bg-luxury-ivory dark:bg-luxury-bg/40 dark:hover:bg-luxury-bg/60 border border-luxury-beige/30 text-luxury-espresso transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <motion.div 
              initial={false}
              animate={{ 
                opacity: isTourGenerated ? 0 : 1,
                pointerEvents: isTourGenerated ? 'none' : 'auto',
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-luxury-ivory/60 hover:bg-luxury-ivory dark:bg-luxury-bg/40 dark:hover:bg-luxury-bg/60 transition-all px-4 py-2 rounded-full border border-luxury-beige/30 text-xs font-bold text-luxury-espresso"
              >
                <span>{currentLanguage.flag}</span>
                <span className="hidden sm:inline uppercase tracking-widest">{currentLanguage.code}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-500", isOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-48 bg-luxury-ivory/95 dark:bg-luxury-ivory/90 backdrop-blur-xl border border-luxury-beige/20 rounded-3xl shadow-2xl overflow-hidden p-2 z-[60]"
                  >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                        i18n.language.startsWith(lang.code) 
                          ? "bg-luxury-espresso text-luxury-ivory" 
                          : "text-luxury-espresso hover:bg-luxury-bg"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {i18n.language.startsWith(lang.code) && (
                        <div className="w-1.5 h-1.5 bg-luxury-beige rounded-full" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  </nav>
  );
}
