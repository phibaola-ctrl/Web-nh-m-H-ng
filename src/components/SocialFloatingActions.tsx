import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SocialFloatingActions() {
  const { t } = useTranslation();
  const phoneNumber = "0862679235";
  const zaloUrl = "https://zalo.me/0862679235";

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-[100] flex flex-col gap-4 items-center pointer-events-none">
      <div className="flex flex-col gap-4 items-center pointer-events-auto">
        {/* Phone Button */}
        <motion.a
          href={`tel:${phoneNumber}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)] group relative transition-all duration-300 hover:bg-green-600"
          title={t('itinerary.callNow') || 'Gọi điện'}
        >
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10" />
          <Phone size={24} className="relative z-10" />
          
          {/* Tooltip/Label */}
          <span className="absolute right-full mr-4 bg-luxury-espresso text-luxury-ivory px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl translate-x-4 group-hover:translate-x-0 hidden md:block">
            {t('itinerary.callNow') || 'GỌI NGAY'}
          </span>
        </motion.a>

        {/* Zalo Button */}
        <motion.a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 md:w-14 md:h-14 bg-[#0068ff] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(0,104,255,0.4)] group relative transition-all duration-300 hover:bg-[#0056d6]"
          title="Zalo"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-10 group-hover:animate-none" />
          <svg className="w-6 h-6 md:w-7 md:h-7 fill-current relative z-10" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.95.56 3.77 1.52 5.32L2.09 21.6c-.15.42.24.81.66.66l4.28-1.43C8.42 21.44 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.5 13.5c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8s.1-.6.3-.8.5-.3.8-.3.7.1.9.3c.2.2.3.5.3.8s-.1.6-.3.8-.5.3-.9.3zm0-2c-.1 0-.2.05-.3.1s-.15.15-.2.2c-.05.05-.05.15-.05.25v.05c0 .1.01.2.05.3.05.15.15.2.2.25.1.05.2.1.3.1.1 0 .2-.05.3-.1s.15-.1.2-.25.05-.2.05-.3V15c0-.1-.01-.2-.05-.25-.05-.1-.15-.2-.2-.2s-.2-.05-.3-.05zM12 15.5c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8s.1-.6.3-.8.5-.3.8-.3c.1 0 .2.01.4.05.15.05.25.15.3.3s.1.3.1.5c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3.1 0 .2-.01.3-.01V15c.01 0 .01.01.01.01s.05.05.05.05h.05z" />
          </svg>
          
          {/* Tooltip/Label */}
          <span className="absolute right-full mr-4 bg-luxury-espresso text-luxury-ivory px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl translate-x-4 group-hover:translate-x-0 hidden md:block">
            ZALO
          </span>
        </motion.a>
      </div>
    </div>
  );
}
