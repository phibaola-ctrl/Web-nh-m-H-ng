import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Trash2, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Itinerary } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface SavedTripsProps {
  onSelect: (itinerary: Itinerary) => void;
  onBack: () => void;
}

export default function SavedTrips({ onSelect, onBack }: SavedTripsProps) {
  const { t } = useTranslation();
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('saved_itineraries');
    if (saved) {
      try {
        setSavedTrips(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved itineraries:', error);
      }
    }
  }, []);

  const removeTrip = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = [...savedTrips];
    updated.splice(index, 1);
    setSavedTrips(updated);
    localStorage.setItem('saved_itineraries', JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-40 min-h-screen space-y-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-luxury-beige/30 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-luxury-cacao font-bold uppercase tracking-[0.4em] text-[10px]">
            <div className="w-1.5 h-1.5 bg-luxury-cacao rounded-full opacity-50" />
            <span>{t('nav.saved')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-luxury-espresso leading-[1.1] tracking-tight">{t('itinerary.savedTitle')}</h1>
          <p className="text-xl text-luxury-espresso/60 max-w-xl leading-relaxed italic font-serif">{t('itinerary.savedSub')}</p>
        </div>
        
        <button 
          onClick={onBack}
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-espresso/40 hover:text-luxury-espresso transition-colors"
        >
          {t('itinerary.savedBack')}
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-40 space-y-10 text-center"
        >
          <div className="w-32 h-32 bg-luxury-ivory/60 dark:bg-luxury-ivory/10 rounded-full flex items-center justify-center border border-luxury-beige/20 shadow-led transition-colors">
            <Heart size={40} className="text-luxury-cacao/20" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-bold text-luxury-espresso">{t('itinerary.savedEmpty')}</h3>
            <p className="text-luxury-espresso/40 max-w-md mx-auto leading-relaxed">
              {t('itinerary.savedEmptySub')}
            </p>
          </div>
          <button 
            onClick={onBack}
            className="px-12 py-5 bg-luxury-espresso text-luxury-ivory rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-luxury-espresso/90 transition-all shadow-xl shadow-luxury-espresso/10"
          >
            {t('itinerary.savedStart')}
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {savedTrips.map((trip, idx) => (
              <motion.div
                key={`${trip.destination}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -10 }}
                onClick={() => onSelect(trip)}
                 className="group cursor-pointer bg-luxury-ivory/40 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-[48px] overflow-hidden glass-luxury flex flex-col shadow-xl shadow-luxury-beige/5 hover:shadow-2xl hover:shadow-luxury-beige/10 transition-all duration-500"
              >
                {/* Visual Placeholder for Image */}
                <div className="h-64 bg-luxury-ivory dark:bg-luxury-ivory/10 relative overflow-hidden transition-colors">
                  {trip.image && (
                    <img 
                      src={trip.image} 
                      alt={trip.destination}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-luxury-ivory/80 dark:bg-luxury-ivory/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-luxury-espresso flex items-center gap-2 transition-colors">
                    <Sparkles size={12} />
                    <span>{trip.travelStyle}</span>
                  </div>
                  <button 
                    onClick={(e) => removeTrip(e, idx)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-luxury-ivory/80 dark:bg-luxury-ivory/90 backdrop-blur-md flex items-center justify-center text-luxury-espresso hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  {/* Mock abstract patterns since we don't have real images */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="#5A3E36" strokeWidth="0.5" />
                      <line x1="0" y1="0" x2="100" y2="100" stroke="#5A3E36" strokeWidth="0.1" />
                    </svg>
                  </div>
                </div>

                <div className="p-10 space-y-8 flex-1 flex flex-col">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-luxury-cacao text-[10px] font-bold uppercase tracking-widest opacity-60">
                      <MapPin size={12} />
                      <span>{trip.destination}</span>
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-luxury-espresso group-hover:italic transition-all duration-500">{trip.destination}</h3>
                    <p className="text-sm text-luxury-espresso/60 leading-relaxed font-medium line-clamp-2">
                      {trip.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-4 border-t border-luxury-beige/10">
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-luxury-cacao/40" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-espresso/80">{trip.duration} {t('itinerary.days')}</span>
                    </div>
                    {trip.totalEstimatedCost && (
                      <div className="flex items-center gap-3">
                        <ArrowRight size={14} className="text-luxury-cacao/40" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-espresso/80">{trip.totalEstimatedCost}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-auto">
                    <div className="w-full py-5 bg-luxury-bg border border-luxury-beige/30 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-luxury-espresso group-hover:text-luxury-ivory transition-all duration-500">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{t('itinerary.savedView')}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
