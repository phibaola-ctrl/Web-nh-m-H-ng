import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  AlertTriangle, 
  Download, 
  RefreshCw,
  Info,
  Map as MapIcon,
  CheckCircle2,
  Circle,
  Edit3,
  Check,
  X,
  Heart,
  Plane,
  Hotel,
  Ticket,
  User,
  ChevronRight,
  Calendar,
  Clock,
  DollarSign,
  PieChart,
  Utensils,
  Crown,
  Sparkles,
  Star,
  Lightbulb,
  CloudRain,
  TrendingDown,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Itinerary, Activity } from '@/src/types';
import confetti from 'canvas-confetti';
import { cn } from '@/src/lib/utils';
import MapView from '@/src/components/MapView';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onRestart: () => void;
}

export default function ItineraryView({ itinerary: initialItinerary, onRestart }: ItineraryViewProps) {
  const { t } = useTranslation();
  const [itinerary, setItinerary] = useState<Itinerary>(initialItinerary);
  const [showMap, setShowMap] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [isFavorite, setIsFavorite] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    guests: '2'
  });
  const [guestError, setGuestError] = useState<string | null>(null);

  const toggleBookingPanel = () => {
    setShowBookingModal(!showBookingModal);
    if (isSuccess) setIsSuccess(false);
  };

  const handleGuestChange = (val: string) => {
    // Only allow digits
    const cleaned = val.replace(/[^0-9]/g, '');
    
    if (cleaned === '') {
      setBookingForm(prev => ({ ...prev, guests: '' }));
      setGuestError(null);
      return;
    }

    const num = parseInt(cleaned, 10);
    if (num <= 0) {
      setGuestError(t('itinerary.guestErrorPositive') || 'Số lượng khách phải lớn hơn 0');
    } else if (num > 50) {
      setGuestError(t('itinerary.guestErrorLimit') || 'Tối đa 50 khách cho mỗi lượt đặt');
    } else {
      setGuestError(null);
    }
    
    setBookingForm(prev => ({ ...prev, guests: cleaned }));
  };

  // Rating State
  const [overallRating, setOverallRating] = useState<number>(() => {
    const key = `rating_overall_${itinerary.id || itinerary.destination}`;
    return Number(localStorage.getItem(key)) || 0;
  });

  const [activityRatings, setActivityRatings] = useState<Record<string, number>>(() => {
    const key = `rating_activities_${itinerary.id || itinerary.destination}`;
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  });

  const [insightsExpanded, setInsightsExpanded] = useState(true);
  const [alertsExpanded, setAlertsExpanded] = useState(true);

  const handleRateOverall = (rating: number) => {
    setOverallRating(rating);
    localStorage.setItem(`rating_overall_${itinerary.id || itinerary.destination}`, rating.toString());
  };

  const handleRateActivity = (dayIdx: number, actIdx: number, rating: number) => {
    const id = `${dayIdx}-${actIdx}`;
    const newRatings = { ...activityRatings, [id]: rating };
    setActivityRatings(newRatings);
    localStorage.setItem(`rating_activities_${itinerary.id || itinerary.destination}`, JSON.stringify(newRatings));
  };

  const StarRating = ({ 
    rating, 
    onRate, 
    size = 16, 
    className = "" 
  }: { 
    rating: number; 
    onRate: (rating: number) => void; 
    size?: number;
    className?: string;
  }) => (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => {
            e.stopPropagation();
            onRate(star);
          }}
          className="transition-transform hover:scale-125 focus:outline-none"
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              star <= rating 
                ? "fill-luxury-espresso text-luxury-espresso" 
                : "text-luxury-cacao/20 hover:text-luxury-cacao/40"
            )}
          />
        </button>
      ))}
    </div>
  );

  const isPhiMode = itinerary.id === 'phi-ultimate';

  useEffect(() => {
    if (showBookingModal) {
      const handleClose = (e: MouseEvent | KeyboardEvent) => {
        if (e instanceof KeyboardEvent && e.key === 'Escape') {
          setShowBookingModal(false);
          return;
        }
        
        // Check if click is outside the panel
        const panel = document.getElementById('booking-floating-panel');
        const button = document.getElementById('booking-toggle-button');
        if (panel && !panel.contains(e.target as Node) && button && !button.contains(e.target as Node)) {
          setShowBookingModal(false);
        }
      };
      
      window.addEventListener('mousedown', handleClose);
      window.addEventListener('keydown', handleClose);
      return () => {
        window.removeEventListener('mousedown', handleClose);
        window.removeEventListener('keydown', handleClose);
      };
    }
  }, [showBookingModal]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      let bookings;
      try {
        bookings = JSON.parse(localStorage.getItem('demo_bookings') || '[]');
      } catch {
        bookings = [];
      }
      bookings.push({
        ...bookingForm,
        destination: itinerary.destination,
        date: new Date().toISOString()
      });
      localStorage.setItem('demo_bookings', JSON.stringify(bookings));

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5A3E36', '#D8CBBE']
      });
    }, 2000);
  };

  const [startDate, setStartDate] = useState<string | null>(() => {
    return localStorage.getItem(`start_date_${initialItinerary.destination}_${initialItinerary.duration}`);
  });

  const progress = useMemo(() => {
    if (!startDate) return { currentDay: 0, percentage: 0, isActive: false };
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    const isPast = diffDays > itinerary.duration;
    const isFuture = diffDays < 1;
    
    return {
      currentDay: Math.min(Math.max(diffDays, 0), itinerary.duration),
      percentage: Math.min(Math.max((diffDays / itinerary.duration) * 100, 0), 100),
      isActive: !isPast && !isFuture,
      isFinished: isPast,
      isUpcoming: isFuture
    };
  }, [startDate, itinerary.duration, initialItinerary.destination]);

  const handleSetStartDate = (date: string) => {
    setStartDate(date);
    localStorage.setItem(`start_date_${initialItinerary.destination}_${initialItinerary.duration}`, date);
  };

  useEffect(() => {
    // Check if current trip is in favorites
    const saved = localStorage.getItem('saved_itineraries');
    if (saved) {
      const favorites = JSON.parse(saved);
      const exists = favorites.some((fav: Itinerary) => 
        (fav.id && itinerary.id && fav.id === itinerary.id) ||
        (fav.destination === itinerary.destination && fav.summary === itinerary.summary)
      );
      setIsFavorite(exists);
    }
  }, [itinerary]);

  const toggleFavorite = () => {
    const saved = localStorage.getItem('saved_itineraries');
    let favorites = saved ? JSON.parse(saved) : [];
    
    if (isFavorite) {
      favorites = favorites.filter((fav: Itinerary) => 
        !((fav.id && itinerary.id && fav.id === itinerary.id) ||
          (fav.destination === itinerary.destination && fav.summary === itinerary.summary))
      );
      setIsFavorite(false);
    } else {
      favorites.push(itinerary);
      setIsFavorite(true);
      // Small celebratory burst when saving
      confetti({
        particleCount: 40,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#5A3E36', '#D8CBBE']
      });
    }
    
    localStorage.setItem('saved_itineraries', JSON.stringify(favorites));
  };

  const [editForm, setEditForm] = useState<{ activity: string; description: string; location: string }>({
    activity: '',
    description: '',
    location: ''
  });

  const toggleActivity = (dayIdx: number, actIdx: number) => {
    const id = `${dayIdx}-${actIdx}`;
    setCompletedActivities(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startEditing = (dayIdx: number, actIdx: number, activity: Activity) => {
    setEditingId(`${dayIdx}-${actIdx}`);
    setEditForm({
      activity: activity.activity,
      description: activity.description,
      location: activity.location || ''
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (dayIdx: number, actIdx: number) => {
    const nextItinerary = { ...itinerary };
    const nextDays = [...nextItinerary.days];
    const nextActivities = [...nextDays[dayIdx].activities];
    
    nextActivities[actIdx] = {
      ...nextActivities[actIdx],
      activity: editForm.activity,
      description: editForm.description,
      location: editForm.location
    };
    
    nextDays[dayIdx] = { ...nextDays[dayIdx], activities: nextActivities };
    nextItinerary.days = nextDays;
    
    setItinerary(nextItinerary);
    setEditingId(null);
  };

  const allActivities = useMemo(() => {
    const acts: { activity: string; description: string; location?: string }[] = [];
    itinerary.days.forEach(day => {
      day.activities.forEach(activity => {
        acts.push(activity);
      });
    });
    return acts.slice(0, 8); // Display first 8 points for clarity
  }, [itinerary]);

  const allLocations = useMemo(() => {
    const locs: string[] = [];
    itinerary.days.forEach(day => {
      day.activities.forEach(activity => {
        if (activity.location) locs.push(`${activity.location}, ${itinerary.destination}`);
        else locs.push(`${activity.activity}, ${itinerary.destination}`);
      });
    });
    return Array.from(new Set(locs)).slice(0, 8);
  }, [itinerary]);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F5F1EB', '#D8CBBE', '#5A3E36', '#3B2A25']
    });
  }, []);

  const handleDownload = () => {
    let content = `PLANTRIPGO - CẨM NANG DU LỊCH ĐỘC BẢN\n`;
    content += `==========================================\n\n`;
    content += `ĐIỂM ĐẾN: ${itinerary.destination.toUpperCase()}\n`;
    content += `THỜI GIAN: ${itinerary.duration} NGÀY\n`;
    content += `PHONG CÁCH: ${itinerary.travelStyle.toUpperCase()}\n\n`;
    content += `TỔNG QUAN: ${itinerary.summary}\n\n`;
    content += `------------------------------------------\n`;
    content += `LỊCH TRÌNH CHI TIẾT\n`;
    content += `------------------------------------------\n\n`;

    itinerary.days.forEach(day => {
      content += `NGÀY ${day.day}\n`;
      day.activities.forEach(act => {
        content += `[${act.time}] ${act.activity}\n`;
        content += `${act.description}\n`;
        if (act.location) content += `Địa điểm: ${act.location}\n`;
        content += `\n`;
      });
      content += `------------------------------------------\n\n`;
    });

    if (itinerary.tourIncludes && itinerary.tourIncludes.length > 0) {
      content += `BAO GỒM:\n`;
      itinerary.tourIncludes.forEach(item => content += `- ${item}\n`);
      content += `\n`;
    }

    content += `NHẬN ĐỊNH TỪ CHUYÊN GIA:\n`;
    itinerary.insights.forEach(insight => {
        content += `- ${insight}\n`;
    });
    content += `\n`;

    content += `LƯU Ý ĐIỂM ĐẾN:\n`;
    itinerary.alerts.forEach(alert => {
      content += `- ${alert}\n`;
    });
    content += `\n`;
    
    content += `==========================================\n`;
    content += `Cảm ơn quý khách đã tin tưởng PLANTRIPGO.\n`;
    content += `Chúc quý khách có một hành trình đáng nhớ!\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     url);
    downloadAnchorNode.setAttribute("download", `Plantripgo-${itinerary.destination.toLowerCase().replace(/\s+/g, '-')}.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    URL.revokeObjectURL(url);
  };

  const selectedMarkerId = useMemo(() => {
    if (!highlightedId) return null;
    let flatIdx = -1;
    let found = false;
    itinerary.days.forEach((day, dIdx) => {
      day.activities.forEach((_, aIdx) => {
        if (!found) flatIdx++;
        if (`${dIdx}-${aIdx}` === highlightedId) found = true;
      });
    });
    return found ? `marker-${flatIdx}` : null;
  }, [highlightedId, itinerary.days]);

  return (
    <div className={cn("max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-40 space-y-20", isPhiMode && "phi-theme")}>
      {isPhiMode && (
        <style dangerouslySetInnerHTML={{ __html: `
          .phi-theme .glass-luxury {
            background: linear-gradient(135deg, rgba(216, 203, 190, 0.4) 0%, rgba(196, 181, 166, 0.4) 100%);
            box-shadow: 0 0 40px rgba(165, 124, 0, 0.2);
            border-color: rgba(165, 124, 0, 0.3);
          }
          .phi-theme h1 {
            background: linear-gradient(90deg, #3B2A25 0%, #D8CBBE 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
          }
        `}} />
      )}
      {/* Header Overview */}
      <div className={cn("bg-luxury-ivory/40 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-[60px] p-10 md:p-20 relative overflow-hidden glass-luxury shadow-xl shadow-luxury-beige/10 transition-colors duration-500", isPhiMode && "ring-4 ring-luxury-beige/40")}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none skew-x-12 translate-x-24">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill={isPhiMode ? "#A57C00" : "#5A3E36"} d="M47.7,-62.7C61.4,-54.3,71.1,-39.1,76.5,-22.8C81.9,-6.5,83.1,10.9,76.9,26C70.7,41.1,57.1,53.9,41.5,63.1C25.9,72.4,8.3,78,-9.5,77.2C-27.3,76.4,-45.3,69.2,-58.5,56.5C-71.7,43.8,-80.1,25.6,-80.4,7.8C-80.7,-10.1,-72.8,-27.6,-61,-42.2C-49.2,-56.8,-33.5,-68.5,-17.1,-72.1C-0.7,-75.7,14, -58.3,47.7,-62.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-luxury-cacao font-bold uppercase tracking-[0.4em] text-[10px]">
              <div className="w-1.5 h-1.5 bg-luxury-cacao rounded-full opacity-50" />
              <span>{isPhiMode ? "Huyền thoại" : t('itinerary.archive')}</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif font-bold text-luxury-espresso leading-[1.1] tracking-tight">
              {itinerary.destination}
              {isPhiMode && <Crown size={64} className="inline-block ml-4 text-luxury-espresso align-top animate-bounce" />}
            </h1>
            <p className="text-2xl text-luxury-espresso/60 max-w-2xl leading-relaxed italic font-serif">
              "{itinerary.summary}"
              {isPhiMode && <Sparkles size={24} className="inline-block ml-2 text-luxury-beige animate-pulse" />}
            </p>

            <div className="flex items-center gap-6 pt-4">
              <span className="text-[10px] font-bold text-luxury-cacao uppercase tracking-[0.3em] opacity-40">{t('itinerary.ratingLabel', { defaultValue: 'ĐÁNH GIÁ' })}</span>
              <StarRating rating={overallRating} onRate={handleRateOverall} size={24} />
              {overallRating > 0 && (
                <span className="text-sm font-serif font-bold text-luxury-espresso italic">{overallRating}/5</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-12 pt-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-luxury-cacao uppercase tracking-[0.3em] opacity-40">{isPhiMode ? "Phi" : t('itinerary.duration')}</span>
                <span className="text-2xl font-serif font-bold text-luxury-espresso">{isPhiMode ? "Phi" : `${itinerary.duration} ${t('itinerary.days')}`}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-luxury-cacao uppercase tracking-[0.3em] opacity-40">{isPhiMode ? "Phi" : t('itinerary.style')}</span>
                <span className="text-2xl font-serif font-bold text-luxury-espresso capitalize italic">{isPhiMode ? "Phi" : itinerary.travelStyle}</span>
              </div>
              {itinerary.totalEstimatedCost && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-luxury-cacao uppercase tracking-[0.3em] opacity-40">{isPhiMode ? "Phi" : t('itinerary.provision')}</span>
                  <span className="text-2xl font-serif font-bold text-luxury-cacao">{itinerary.totalEstimatedCost}</span>
                </div>
              )}
              <div className="flex flex-col gap-2 min-w-[200px]">
                <span className="text-[10px] font-bold text-luxury-cacao uppercase tracking-[0.3em] opacity-40">{isPhiMode ? "Phi" : t('itinerary.progressHeader')}</span>
                <div className="flex flex-col gap-3">
                  {startDate ? (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-luxury-espresso font-serif uppercase tracking-widest">
                          {t('itinerary.dayXofY', { current: progress.currentDay, total: itinerary.duration })}
                        </span>
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-md",
                          progress.isActive ? "bg-green-100 text-green-700" : 
                          progress.isFinished ? "bg-luxury-beige text-luxury-espresso" : "bg-blue-100 text-blue-700"
                        )}>
                          {progress.isActive ? t('itinerary.tripActive') : 
                           progress.isFinished ? t('itinerary.tripFinished') : t('itinerary.tripUpcoming')}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-luxury-beige/30 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.percentage}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-luxury-espresso"
                        />
                      </div>
                      <button 
                        onClick={() => handleSetStartDate('')}
                        className="text-[8px] font-bold uppercase tracking-widest text-luxury-cacao/40 hover:text-luxury-espresso transition-colors text-left"
                      >
                        {t('itinerary.changeDates')}
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-luxury-cacao/40" />
                      <input 
                        type="date"
                        onChange={(e) => handleSetStartDate(e.target.value)}
                        className="bg-transparent border-none text-xs font-bold text-luxury-espresso uppercase tracking-widest focus:ring-0 cursor-pointer p-0"
                        title={t('itinerary.setStartDate')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="flex gap-4">
              <button 
                onClick={toggleFavorite}
                className={cn(
                  "flex-1 md:flex-none p-4 md:p-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl group border transition-colors",
                  isFavorite 
                    ? "bg-luxury-beige text-luxury-espresso border-luxury-espresso" 
                    : "bg-luxury-ivory border-luxury-beige text-luxury-espresso hover:bg-luxury-bg dark:bg-luxury-ivory/20"
                )}
                title={isFavorite ? t('itinerary.removeFromFav') : t('itinerary.saveToFav')}
              >
                <Heart size={16} className={cn("transition-transform duration-300 group-hover:scale-125", isFavorite && "fill-luxury-espresso")} />
                <span className="inline">{isFavorite ? (isPhiMode ? "Phi" : t('itinerary.savedBtnActive')) : (isPhiMode ? "Phi" : t('itinerary.savedBtn'))}</span>
              </button>
              <button 
                onClick={handleDownload}
                className="hidden sm:flex p-4 md:p-5 bg-luxury-ivory dark:bg-luxury-ivory/20 border border-luxury-beige text-luxury-espresso rounded-full font-bold text-[10px] uppercase tracking-[0.3em] items-center gap-3 hover:bg-luxury-bg transition-all"
              >
                <Download size={16} />
                <span className="hidden md:inline">{isPhiMode ? "Phi" : t('itinerary.downloadBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Floating Panel */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div 
            id="booking-floating-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 0 }}
            className="fixed bottom-[100px] md:bottom-[120px] right-6 md:right-10 z-[100] w-[calc(100vw-48px)] sm:w-[400px] bg-luxury-bg rounded-3xl shadow-[0_20px_50px_rgba(59,42,37,0.2)] border border-luxury-beige/30 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-luxury-gold">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('itinerary.bookNow')}</span>
                </div>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-luxury-cacao/40 hover:text-luxury-espresso transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-4 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-luxury-espresso">{t('itinerary.bookingSuccessTitle')}</h3>
                  <p className="text-luxury-espresso/60 text-xs leading-relaxed">{t('itinerary.bookingSuccessMsg')}</p>
                  <button 
                    onClick={() => { setShowBookingModal(false); setIsSuccess(false); }}
                    className="w-full mt-4 bg-luxury-espresso text-luxury-ivory py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-luxury-espresso/90 transition-all"
                  >
                    {t('itinerary.bookingClose')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-luxury-cacao uppercase tracking-widest opacity-60 ml-1">{t('itinerary.bookingName')}</label>
                    <input 
                      required
                      value={bookingForm.name}
                      onChange={e => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-luxury-ivory/60 border border-luxury-beige/30 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-luxury-espresso/10 transition-all text-luxury-espresso"
                      placeholder={t('itinerary.placeholder_name')}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-luxury-cacao uppercase tracking-widest opacity-60 ml-1">{t('itinerary.bookingPhone')}</label>
                    <input 
                      required
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-luxury-ivory/60 border border-luxury-beige/30 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-luxury-espresso/10 transition-all text-luxury-espresso"
                      placeholder={t('itinerary.placeholder_phone')}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-luxury-cacao uppercase tracking-widest opacity-60 ml-1">{t('itinerary.bookingGuests')}</label>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={bookingForm.guests}
                      onChange={e => handleGuestChange(e.target.value)}
                      className="w-full bg-luxury-ivory/60 border border-luxury-beige/30 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-luxury-espresso/10 transition-all text-luxury-espresso"
                      placeholder={t('itinerary.placeholder_guests')}
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full relative bg-luxury-espresso text-luxury-ivory py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] overflow-hidden group hover:bg-luxury-espresso/90 transition-all disabled:opacity-70 mt-4 shadow-lg shadow-luxury-espresso/10"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw size={14} className="animate-spin" />
                        <span>{t('itinerary.securingSelection')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Ticket size={14} />
                        <span>{t('itinerary.bookingConfirm')}</span>
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-24">
          {/* Timeline */}
          <div className="space-y-16">
            <div className="flex items-center justify-between border-b border-luxury-beige/30 pb-10">
              <h2 className="text-5xl font-serif font-bold text-luxury-espresso leading-[1.2]">{isPhiMode ? "Phi" : t('itinerary.timeline')}</h2>
            </div>

            <div className="space-y-32 relative">
              <div className="absolute left-[39px] top-6 bottom-6 w-px bg-luxury-beige/30 -z-10" />
              
              {itinerary.days.map((day, dIdx) => {
                const isToday = progress.isActive && progress.currentDay === day.day;
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={day.day} 
                    className="space-y-16"
                  >
                    <div className="flex items-center gap-16">
                      <div className={cn(
                        "w-20 h-20 rounded-[28px] flex flex-col items-center justify-center flex-shrink-0 shadow-2xl border-[6px] border-luxury-ivory z-20 relative transition-all duration-700",
                        isToday ? "bg-luxury-espresso text-luxury-ivory scale-110 ring-4 ring-luxury-beige/30" : "bg-luxury-ivory text-luxury-espresso shadow-luxury-beige/20"
                      )}>
                        {isToday && (
                          <div className="absolute -top-3 bg-green-600 text-white text-[7px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                            {t('itinerary.tripActive')}
                          </div>
                        )}
                        <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70">{t('itinerary.day')}</span>
                        <span className="text-3xl font-serif font-bold leading-none">{day.day}</span>
                      </div>
                      <div className="flex-1 h-px bg-luxury-beige/30" />
                    </div>

                  <div className="pl-6 md:pl-28 space-y-20">
                    {day.activities.map((act, aIdx) => {
                      const id = `${dIdx}-${aIdx}`;
                      const isCompleted = completedActivities.has(id);
                      const isEditing = editingId === id;

                      return (
                        <motion.div 
                          key={aIdx} 
                          id={`activity-${dIdx}-${aIdx}`}
                          initial={false}
                          animate={highlightedId === id ? {
                            scale: 1.02,
                            backgroundColor: 'rgba(216, 203, 190, 0.15)',
                            boxShadow: '0 20px 40px rgba(90, 62, 54, 0.1)'
                          } : {
                            scale: 1,
                            backgroundColor: 'rgba(216, 203, 190, 0)',
                            boxShadow: '0 0px 0px rgba(90, 62, 54, 0)'
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className={cn(
                            "flex gap-12 group transition-all duration-500 rounded-[32px] p-6 -mx-6 relative overflow-hidden",
                            highlightedId === id && "ring-2 ring-luxury-espresso/20"
                          )}
                        >
                          {highlightedId === id && (
                            <motion.div 
                              layoutId="highlight-shine"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                            />
                          )}
                          <div className="w-20 pt-2 flex-shrink-0 text-right flex flex-col items-end gap-5">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-luxury-cacao/40 group-hover:text-luxury-espresso transition-colors">{act.time}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleActivity(dIdx, aIdx);
                              }}
                              className={cn(
                                "p-2.5 rounded-full transition-all duration-500 shadow-sm",
                                isCompleted ? "bg-luxury-espresso text-luxury-ivory" : "bg-luxury-ivory/50 text-luxury-cacao/20 hover:text-luxury-espresso hover:bg-luxury-beige/20"
                              )}
                            >
                              {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                            </button>
                          </div>
                          
                          <div className={cn(
                            "flex-1 space-y-4 pb-12 border-b border-luxury-beige/20 group-last:border-none transition-all duration-700",
                            isCompleted && !isEditing && "opacity-40 grayscale-[0.5]"
                          )}>
                            {isEditing ? (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6 bg-white/60 p-8 rounded-3xl border border-luxury-beige/30"
                              >                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-cacao opacity-40">{t('itinerary.activityName')}</label>
                                  <input 
                                    value={editForm.activity}
                                    onChange={e => setEditForm(prev => ({ ...prev, activity: e.target.value }))}
                                    className="w-full bg-luxury-ivory/80 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-xl px-4 py-3 text-lg font-serif font-bold text-luxury-espresso focus:outline-none focus:ring-2 focus:ring-luxury-espresso/10 transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-cacao opacity-40">{t('itinerary.activityDescription')}</label>
                                  <textarea 
                                    value={editForm.description}
                                    onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full bg-luxury-ivory/80 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-xl px-4 py-3 text-sm text-luxury-espresso/80 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-luxury-espresso/10 transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-luxury-cacao opacity-40">{t('itinerary.spatialIndex')}</label>
                                  <input 
                                    value={editForm.location}
                                    onChange={e => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full bg-luxury-ivory/80 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-xl px-4 py-3 text-sm text-luxury-espresso/70 focus:outline-none focus:ring-2 focus:ring-luxury-espresso/10 transition-all"
                                    placeholder={t('itinerary.location_placeholder')}
                                  />
                                </div>
                                <div className="flex gap-4 pt-4">
                                  <button 
                                    onClick={() => saveEditing(dIdx, aIdx)}
                                    className="flex-1 bg-luxury-espresso text-luxury-ivory py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-luxury-espresso/90 transition-all shadow-xl shadow-luxury-espresso/10"
                                  >
                                    <Check size={14} />
                                    <span>{t('itinerary.saveCuration')}</span>
                                  </button>
                                  <button 
                                    onClick={cancelEditing}
                                    className="px-6 bg-luxury-ivory dark:bg-luxury-ivory/10 border border-luxury-beige py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-luxury-bg transition-all text-luxury-espresso"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>

                              </motion.div>
                            ) : (
                              <div 
                                onClick={() => startEditing(dIdx, aIdx, act)}
                                className="cursor-pointer group/item relative"
                              >
                                <div className="absolute -left-4 -top-4 -right-4 -bottom-4 bg-luxury-beige/5 opacity-0 group-hover/item:opacity-100 rounded-3xl transition-opacity -z-10" />
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <h4 className={cn(
                                        "text-3xl font-serif font-bold text-luxury-espresso transition-all duration-700",
                                        isCompleted ? "line-through italic" : "group-hover:italic"
                                      )}>
                                        {act.activity}
                                      </h4>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <div className="flex items-center gap-3">
                                        <motion.button 
                                          whileHover={{ scale: 1.1, rotate: 5 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setHighlightedId(id);
                                            // Scroll map into view
                                            const mapEl = document.querySelector('.leaflet-container');
                                            if (mapEl) {
                                              mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }
                                          }}
                                          className={cn(
                                            "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm",
                                            highlightedId === id 
                                              ? "bg-luxury-gold text-white shadow-luxury-gold/20" 
                                              : "bg-luxury-ivory text-luxury-cacao/40 hover:text-luxury-espresso hover:bg-luxury-beige/30"
                                          )}
                                          title={t('itinerary.showOnMap')}
                                        >
                                          <MapIcon size={16} />
                                        </motion.button>
                                        <StarRating 
                                          rating={activityRatings[id] || 0} 
                                          onRate={(r) => handleRateActivity(dIdx, aIdx, r)} 
                                          size={14} 
                                        />
                                        <Edit3 size={14} className="text-luxury-cacao/20 group-hover/item:text-luxury-espresso transition-colors" />
                                      </div>
                                    </div>
                                  </div>
                                <p className="text-lg text-luxury-espresso/60 leading-relaxed font-medium max-w-xl mt-4">{act.description}</p>
                                {act.location && (
                                  <div className="flex items-center gap-2 text-luxury-cacao text-xs font-bold uppercase tracking-[0.3em] pt-4 opacity-60">
                                    <MapPin size={12} />
                                    <span>{act.location}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
          </div>

          {/* Detailed Tour Info - NEW SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16 pt-12 border-t border-luxury-beige/30"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h2 className="text-5xl font-serif font-bold text-luxury-espresso leading-[1.2]">{t('itinerary.tourDetails.title')}</h2>
                <div className="w-24 h-1 bg-luxury-espresso/20 rounded-full" />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Includes */}
              <div className="bg-luxury-ivory/40 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-[40px] p-10 space-y-8 glass-luxury">
                <div className="flex items-center gap-4 border-b border-luxury-beige/30 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-luxury-espresso">{t('itinerary.tourDetails.includes')}</h3>
                </div>
                <div className="grid gap-4">
                  {(itinerary.tourIncludes || [
                    "Vé máy bay khứ hồi", "Lưu trú resort 5 sao", "Tất cả các bữa ăn tinh hoa", "Tour trải nghiệm bản địa", "Bảo hiểm du lịch cao cấp"
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-luxury-espresso/80 font-medium group">
                      <div className="w-5 h-5 rounded-full border border-green-500/30 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                        <Check size={10} className="text-green-600 group-hover:text-white" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excludes */}
              <div className="bg-luxury-ivory/40 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-[40px] p-10 space-y-8 glass-luxury">
                <div className="flex items-center gap-4 border-b border-luxury-beige/30 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600">
                    <X size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-luxury-espresso">{t('itinerary.tourDetails.excludes')}</h3>
                </div>
                <div className="grid gap-4">
                  {(itinerary.tourExcludes || [
                    "Thị thực nhập cảnh", "Tiền tip cho hướng dẫn viên", "Chi phí cá nhân ngoài chương trình"
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-luxury-espresso/80 font-medium group">
                      <div className="w-5 h-5 rounded-full border border-red-500/30 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                        <X size={10} className="text-red-600 group-hover:text-white" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div className="md:col-span-2 bg-luxury-ivory/40 dark:bg-luxury-ivory/10 border border-luxury-beige/30 rounded-[40px] p-10 md:p-16 space-y-10 glass-luxury relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <ShieldAlert size={160} />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-3xl bg-luxury-espresso text-luxury-ivory flex items-center justify-center shadow-xl shadow-luxury-espresso/20">
                        <ShieldAlert size={28} />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-luxury-espresso">{t('itinerary.tourDetails.insurance')}</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-luxury-cacao uppercase tracking-widest opacity-40">{t('itinerary.tourDetails.coverage')}</p>
                      <p className="text-2xl font-serif font-bold text-luxury-espresso">{itinerary.travelInsurance?.coverage || "1.200.000.000 - 1.800.000.000 VNĐ/khách"}</p>
                    </div>
                  </div>
                  <div className="flex-1 max-w-xl">
                    <p className="text-[10px] font-bold text-luxury-cacao uppercase tracking-widest opacity-40 mb-6">{t('itinerary.tourDetails.benefits')}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(itinerary.travelInsurance?.benefits || [
                        "Hỗ trợ y tế khẩn cấp", "HOTLINE hỗ trợ 24/7", "Bồi hoàn hành lý thất lạc", "Chuyến bay cấp cứu"
                      ]).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-luxury-espresso/70 text-sm font-medium">
                          <Sparkles size={14} className="text-luxury-beige" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="md:col-span-2 bg-amber-50/30 border border-amber-200/50 rounded-[40px] p-10 space-y-6">
                <div className="flex items-center gap-3 text-amber-800">
                  <Lightbulb size={20} />
                  <h3 className="text-lg font-serif font-bold">{t('itinerary.tourDetails.notes')}</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-6">
                  {(itinerary.tourNotes || [
                    "Quý khách vui lòng có mặt tại sân bay 3 tiếng trước giờ khởi hành.",
                    "Trang phục trang trọng cho các bữa tối tại nhà hàng."
                  ]).map((note, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-luxury-espresso/70 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Travel Insights & Alerts Sections */}
          <div className="space-y-12">
            {/* Travel Insights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-luxury-ivory/60 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-[48px] p-8 md:p-12 space-y-8 glass-luxury overflow-hidden"
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setInsightsExpanded(!insightsExpanded)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-espresso text-luxury-ivory rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-luxury-espresso">{t('itinerary.travelInsights.title')}</h2>
                  </div>
                </div>
                {insightsExpanded ? <ChevronUp size={24} className="text-luxury-cacao/40" /> : <ChevronDown size={24} className="text-luxury-cacao/40" />}
              </div>

              <AnimatePresence>
                {insightsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-10 overflow-hidden"
                  >
                    <div className="max-w-3xl">
                       {/* Warnings & Tips */}
                       <div className="grid sm:grid-cols-2 gap-8">
                         <div className="space-y-4">
                           <div className="flex items-center gap-3 text-luxury-espresso">
                             <AlertTriangle size={18} className="text-amber-600" />
                             <h3 className="text-lg font-serif font-bold">{t('itinerary.travelInsights.warnings')}</h3>
                           </div>
                           <div className="space-y-3">
                             {(itinerary.travelInsights?.warnings || [t('itinerary.insightText')]).map((w, i) => (
                               <div key={i} className="flex gap-3 text-sm text-luxury-espresso/70 leading-relaxed bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-luxury-beige/10">
                                 <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                                 <p>{w}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                         <div className="space-y-4">
                           <div className="flex items-center gap-3 text-luxury-espresso">
                             <Lightbulb size={18} className="text-yellow-600" />
                             <h3 className="text-lg font-serif font-bold">{t('itinerary.travelInsights.tips')}</h3>
                           </div>
                           <div className="space-y-3">
                             {(itinerary.travelInsights?.tips || ["Explore early morning", "Carry water"]).map((tip, i) => (
                               <div key={i} className="flex gap-3 text-sm text-luxury-espresso/70 leading-relaxed bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-luxury-beige/10">
                                 <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0" />
                                 <p>{tip}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Travel Alerts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-luxury-ivory/60 dark:bg-luxury-ivory/20 border border-luxury-beige/30 rounded-[48px] p-8 md:p-12 space-y-8 glass-luxury overflow-hidden"
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setAlertsExpanded(!alertsExpanded)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-900/10 text-red-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-luxury-espresso">{t('itinerary.travelAlerts.title')}</h2>
                  </div>
                </div>
                {alertsExpanded ? <ChevronUp size={24} className="text-luxury-cacao/40" /> : <ChevronDown size={24} className="text-luxury-cacao/40" />}
              </div>

              <AnimatePresence>
                {alertsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-8 overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-3 gap-6">
                      {/* Weather */}
                      <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100/50 space-y-4">
                        <div className="flex items-center gap-3 text-blue-900 dark:text-blue-200">
                          <CloudRain size={20} />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest">{t('itinerary.travelAlerts.weather')}</h4>
                        </div>
                        <p className="text-sm text-blue-900/70 dark:text-blue-200/70 leading-relaxed font-medium">
                          {itinerary.travelAlerts?.weather || t('itinerary.clear')}
                        </p>
                      </div>

                      {/* Risks */}
                      <div className="bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100/50 space-y-4">
                        <div className="flex items-center gap-3 text-amber-900 dark:text-amber-200">
                          <TrendingDown size={20} />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest">{t('itinerary.travelAlerts.risks')}</h4>
                        </div>
                        <div className="space-y-2">
                          {(itinerary.travelAlerts?.risks || itinerary.alerts).map((r, i) => (
                            <p key={i} className="text-sm text-amber-900/70 dark:text-amber-200/70 leading-relaxed font-medium">
                               • {r}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Scams */}
                      <div className="bg-red-50/50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100/50 space-y-4">
                        <div className="flex items-center gap-3 text-red-900 dark:text-red-200">
                          <ShieldAlert size={20} />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest">{t('itinerary.travelAlerts.scams')}</h4>
                        </div>
                        <div className="space-y-2">
                          {(itinerary.travelAlerts?.scams || ["Tiền tip quá cao", "Hướng dẫn viên lậu", "Giá taxi không niêm yết"]).map((s, i) => (
                            <p key={i} className="text-sm text-red-900/70 dark:text-red-200/70 leading-relaxed font-medium">
                               • {s}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Journey Map Section */}
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-luxury-beige/30 pb-10">
              <div className="space-y-2">
                <h2 className="text-5xl font-serif font-bold text-luxury-espresso">{isPhiMode ? "Phi" : t('itinerary.mapHeader')}</h2>
                <p className="text-sm text-luxury-cacao/60 font-medium italic">{isPhiMode ? "Phi" : t('itinerary.spatialDesc')}</p>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-luxury-bg rounded-full border border-luxury-beige/30">
                <MapIcon size={14} className="text-luxury-espresso" />
                <span className="text-[10px] font-bold text-luxury-espresso uppercase tracking-widest">{isPhiMode ? "Phi" : `${allLocations.length} ${t('itinerary.points')}`}</span>
              </div>
            </div>
            
              <MapView 
                locations={allLocations} 
                destination={itinerary.destination} 
                activities={allActivities} 
                selectedId={selectedMarkerId}
                onPointSelect={(idx) => {
                  if (idx === -1) {
                    setHighlightedId(null);
                    return;
                  }
                  // Determine day index and activity index from flat allActivities list
                  let count = 0;
                  itinerary.days.forEach((day, dIdx) => {
                    day.activities.forEach((_, aIdx) => {
                      if (count === idx) {
                        const id = `${dIdx}-${aIdx}`;
                        setHighlightedId(id);
                        
                        // Find element and scroll to it
                        const el = document.getElementById(`activity-${dIdx}-${aIdx}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }
                      count++;
                    });
                  });
                }}
              />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
          {/* Smart Insights */}
          <div className="bg-luxury-espresso text-luxury-ivory p-12 rounded-[56px] space-y-10 shadow-2xl shadow-luxury-espresso/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-[0.4em]">{isPhiMode ? "Phi" : t('itinerary.curationNote')}</div>
            </div>
            <p className="text-xl md:text-2xl font-serif font-bold leading-relaxed italic">{isPhiMode ? "Phi" : t('itinerary.insightText')}</p>
            <div className="space-y-8 pt-6">
              {itinerary.insights.map((insight, idx) => (
                <div key={idx} className="flex gap-5 text-luxury-ivory/80">
                  <div className="w-1.5 h-1.5 bg-luxury-beige rounded-full mt-2.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed font-medium">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Local Alerts */}
          <div className="bg-luxury-beige/10 p-12 rounded-[56px] border border-luxury-beige/20 space-y-8">
            <div className="flex items-center gap-4 text-luxury-espresso opacity-60">
              <AlertTriangle size={20} />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">{isPhiMode ? "Phi" : t('itinerary.localIntelligence')}</h3>
            </div>
            <div className="space-y-6">
              {itinerary.alerts.map((alert, idx) => (
                <p key={idx} className="text-xs text-luxury-espresso/70 leading-relaxed font-medium italic border-l border-luxury-espresso/20 pl-6">
                  " {alert} "
                </p>
              ))}
            </div>
          </div>

          {/* Booking & Reservations */}
          <div className="bg-luxury-ivory dark:bg-luxury-ivory/20 border border-luxury-beige/30 p-12 rounded-[56px] space-y-10 shadow-xl shadow-luxury-beige/5 transition-colors duration-500">
            {/* ... (existing booking content) */}
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-cacao opacity-60">{t('itinerary.bookingHeader')}</h3>
              <div className="w-8 h-8 rounded-full bg-luxury-bg flex items-center justify-center">
                <Check size={12} className="text-luxury-espresso" />
              </div>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://www.vietjetair.com/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between p-6 bg-luxury-bg/50 hover:bg-luxury-espresso hover:text-luxury-ivory rounded-3xl transition-all duration-500 border border-luxury-beige/20"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-luxury-ivory dark:bg-luxury-ivory/20 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Plane size={20} className="text-luxury-espresso group-hover:text-luxury-ivory" />
                  </div>
                  <span className="font-serif font-bold tracking-tight">{t('itinerary.bookingFlights')}</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>

              <a 
                href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(itinerary.destination)}`} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between p-6 bg-luxury-bg/50 hover:bg-luxury-espresso hover:text-luxury-ivory rounded-3xl transition-all duration-500 border border-luxury-beige/20"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-luxury-ivory dark:bg-luxury-ivory/20 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Hotel size={20} className="text-luxury-espresso group-hover:text-luxury-ivory" />
                  </div>
                  <span className="font-serif font-bold tracking-tight">{t('itinerary.bookingHotels')}</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>

              <a 
                href={`https://www.tripadvisor.com/Search?q=${encodeURIComponent(itinerary.destination)}`} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between p-6 bg-luxury-bg/50 hover:bg-luxury-espresso hover:text-luxury-ivory rounded-3xl transition-all duration-500 border border-luxury-beige/20"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-luxury-ivory dark:bg-luxury-ivory/20 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Ticket size={20} className="text-luxury-espresso group-hover:text-luxury-ivory" />
                  </div>
                  <span className="font-serif font-bold tracking-tight">{t('itinerary.bookingActivities')}</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <p className="text-[9px] text-center text-luxury-cacao/40 font-medium uppercase tracking-[0.2em] pt-4">
              {t('itinerary.externalLinks')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-32 pb-12 text-center">
        <div className="w-24 h-px bg-luxury-beige/30 mx-auto mb-8" />
      </div>
      {/* Metadata Section */}
      {itinerary.metadata && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-luxury-beige/30 flex flex-wrap gap-x-12 gap-y-6 text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-cacao/40"
        >
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-luxury-ivory/40 group-hover:bg-luxury-beige/20 transition-colors">
              <User size={14} className="text-luxury-espresso" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-60">{t('itinerary.author')}</span>
              <span className="text-luxury-espresso tracking-[0.4em]">{itinerary.metadata.author}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-luxury-ivory/40 group-hover:bg-luxury-beige/20 transition-colors">
              <Calendar size={14} className="text-luxury-espresso" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-60">{t('itinerary.created')}</span>
              <span className="text-luxury-espresso tracking-[0.4em]">
                {new Date(itinerary.metadata.createdAt).toLocaleDateString('vi-VN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-luxury-ivory/40 group-hover:bg-luxury-beige/20 transition-colors">
              <Edit3 size={14} className="text-luxury-espresso" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-60">{t('itinerary.lastModified')}</span>
              <span className="text-luxury-espresso tracking-[0.4em]">
                {new Date(itinerary.metadata.lastModified).toLocaleDateString('vi-VN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Booking Button */}
      <div className="fixed bottom-24 right-6 md:bottom-28 md:right-10 z-[80] flex flex-col items-end">
        <motion.button
          id="booking-toggle-button"
          onClick={toggleBookingPanel}
          initial={{ scale: 0, x: 100 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="px-6 md:px-10 py-5 md:py-6 bg-luxury-espresso text-luxury-ivory rounded-full shadow-2xl shadow-luxury-espresso/40 hover:scale-105 active:scale-95 transition-all relative group overflow-hidden ring-4 ring-luxury-espresso/10"
        >
          <div className="absolute inset-0 rounded-full bg-luxury-espresso animate-pulse opacity-20 scale-125" />
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          <div className="flex items-center justify-center gap-3">
            <Sparkles size={16} className="text-luxury-beige" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] relative z-10">
              {isSubmitting ? t('itinerary.processing') : isSuccess ? t('itinerary.success') : t('itinerary.bookNow')}
            </span>
          </div>
        </motion.button>
      </div>

    </div>
  );
}
