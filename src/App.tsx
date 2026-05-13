/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import './i18n';
import Navbar from '@/src/components/Navbar';
import Landing from '@/src/pages/Landing';
import TripSetup from '@/src/pages/TripSetup';
import LoadingScreen from '@/src/pages/LoadingScreen';
import ItineraryView from '@/src/pages/ItineraryView';
import SavedTrips from '@/src/pages/SavedTrips';
import EasterEggModal from '@/src/components/EasterEggModal';
import Chatbot from '@/src/components/Chatbot';
import SocialFloatingActions from '@/src/components/SocialFloatingActions';
import { TripPreferences, Itinerary } from '@/src/types';
import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please check your environment settings.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

type View = 'landing' | 'setup' | 'loading' | 'result' | 'saved';

const PHI_ITINERARY: Itinerary = {
  id: "phi-ultimate",
  destination: "Phi",
  duration: 7,
  budgetStyle: "Phi",
  travelStyle: "Phi",
  summary: "Phi đẹp trai thanh lịch vô địch khắp vũ trụ. Một tour đặc biệt dành riêng cho huyền thoại Phi.",
  insights: [
    "Phi là duy nhất",
    "Phi là đẳng cấp",
    "Phi là tất cả"
  ],
  days: Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    activities: [
      { time: "08:00", activity: "Phi", description: "Phi", location: "Phi" },
      { time: "12:00", activity: "Phi", description: "Phi", location: "Phi" },
      { time: "18:00", activity: "Phi", description: "Phi", location: "Phi" }
    ]
  })),
  alerts: ["Phi", "Phi", "Phi"],
  totalEstimatedCost: "Phi",
  image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
  travelInsights: {
    warnings: ["Phi quá đẹp trai gây choáng váng", "Khu vực giới hạn cho người không phải fan Phi"],
    tips: ["Luôn mang theo máy ảnh để chụp Phi", "Phi thường xuất hiện ở những nơi sang trọng"]
  },
  travelAlerts: {
    weather: "Nắng đẹp rạng ngời như nụ cười của Phi",
    risks: ["Nguy cơ say mê Phi quá mức"],
    scams: ["Cẩn thận những kẻ giả danh đại diện của Phi"]
  },
  tourPrice: {
    amount: "∞",
    currency: "PHI",
    perPerson: true
  },
  tourIncludes: [
    "Vé máy bay hạng nhất cùng Phi",
    "Nghỉ dưỡng tại dinh thự của Phi",
    "Ăn tối ánh nến cùng Phi",
    "Chụp ảnh chân dung bởi Phi",
    "Bảo hiểm tình yêu vĩnh cửu"
  ],
  tourExcludes: [
    "Sự buồn chán",
    "Người không biết trân trọng cái đẹp",
    "Chi phí phát sinh cho người quá si mê Phi"
  ],
  travelInsurance: {
    coverage: "Vô hạn",
    benefits: [
      "Bảo vệ nhan sắc",
      "Hỗ trợ tâm lý khi xa Phi",
      "Vận chuyển cấp cứu bằng phi thuyền Phi"
    ]
  },
  tourNotes: [
    "Phi luôn đúng",
    "Nếu Phi sai, xem lại điều 1",
    "Hãy luôn mỉm cười khi ở bên Phi"
  ],
  metadata: {
    author: "Phi The Legend",
    createdAt: "2024-01-01T00:00:00Z",
    lastModified: new Date().toISOString()
  }
};

export default function App() {
  const { i18n, t } = useTranslation();
  const [view, setView] = useState<View>('landing');
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [pendingPrefs, setPendingPrefs] = useState<TripPreferences | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const currentLang = i18n.language.split('-')[0];
  const langNames: Record<string, string> = {
    vi: 'Vietnamese',
    en: 'English',
    zh: 'Chinese Simplified',
    ja: 'Japanese',
    ko: 'Korean',
    fr: 'French',
    es: 'Spanish',
    ru: 'Russian',
    th: 'Thai',
    lo: 'Lao',
    km: 'Khmer'
  };

  const startSetup = () => setView('setup');

  const generateItinerary = async (prefs: TripPreferences) => {
    // Check for Easter Egg
    const normalizedDest = prefs.destination.trim().toLowerCase();
    if (normalizedDest === 'phi') {
      setPendingPrefs(prefs);
      setShowEasterEgg(true);
      return;
    }

    setPreferences(prefs);
    setView('loading');
    setError(null);

    try {
      await executeGeneration(prefs);
    } catch (err) {
      console.error(err);
      setError(t('generalError') || "Failed to generate itinerary. Please try again.");
      setView('setup');
    }
  };

  const executeGeneration = async (prefs: TripPreferences) => {
    const normalizedDest = prefs.destination.trim().toLowerCase();
    if (normalizedDest === 'phi') {
      // Simulate loading for effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      setItinerary(PHI_ITINERARY);
      setView('result');
      return;
    }

    try {
      const prompt = `Create a detailed travel itinerary for ${prefs.days} days in ${prefs.destination}. 
      Travelers: ${prefs.companions}. 
      Budget: ${prefs.budget}. 
      Interests: ${prefs.interests.join(', ')}.
      
      CRITICAL: You MUST provide the entire response in ${langNames[currentLang] || 'English'}.
      Currency formatting should follow the local customs of ${langNames[currentLang]}.
      
      For each activity, specify a "location" that is a specific, iconic landmark or public place (e.g., "Fushimi Inari-taisha" instead of just "Shrine") to ensure high-quality 360° visual previews.
      
      Provide the response in the specified JSON format. 
      IMPORTANT: Keep all text descriptions, summaries, and travel style notes concise (max 200 characters each). DO NOT use repetitive phrases or filler text.
      Include:
      1. A summary of the trip style.
      2. 3-4 "Smart Insights" explaining why this trip fits the user.
      3. A detailed daily timeline (at least 3-4 activities per day).
      4. 2-3 "Travel Alerts" (weather, safety, local tips).
      5. "travelInsights": {
         "warnings": [string],
         "tips": [string]
      }
      6. "travelAlerts": {
         "weather": string,
         "risks": [string],
         "scams": [string]
      }
      7. "tourPrice": { "amount": string, "currency": string, "perPerson": boolean }
      8. "tourIncludes": [string]
      9. "tourExcludes": [string]
      10. "travelInsurance": { "coverage": string, "benefits": [string] }
      11. "tourNotes": [string]
      12. Total estimated cost with appropriate currency symbol.`;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: `You are an expert Luxury Travel Planner. 
          Your goal is to create high-end, detailed travel itineraries.
          Structure your response strictly according to the provided JSON schema.
          Keep all text descriptions and summaries concise (max 200 characters).`,
          responseMimeType: "application/json",
          temperature: 0.1,
          maxOutputTokens: 12000,
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              destination: { type: Type.STRING },
              duration: { type: Type.NUMBER },
              travelStyle: { type: Type.STRING },
              summary: { type: Type.STRING },
              insights: { type: Type.ARRAY, items: { type: Type.STRING } },
              alerts: { type: Type.ARRAY, items: { type: Type.STRING } },
              totalEstimatedCost: { type: Type.STRING },
              travelInsights: {
                type: Type.OBJECT,
                properties: {
                  warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
                  tips: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["warnings", "tips"]
              },
              travelAlerts: {
                type: Type.OBJECT,
                properties: {
                  weather: { type: Type.STRING },
                  risks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  scams: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["weather", "risks", "scams"]
              },
              tourPrice: {
                type: Type.OBJECT,
                properties: {
                  amount: { type: Type.STRING },
                  currency: { type: Type.STRING },
                  perPerson: { type: Type.BOOLEAN }
                },
                required: ["amount", "currency", "perPerson"]
              },
              tourIncludes: { type: Type.ARRAY, items: { type: Type.STRING } },
              tourExcludes: { type: Type.ARRAY, items: { type: Type.STRING } },
              travelInsurance: {
                type: Type.OBJECT,
                properties: {
                  coverage: { type: Type.STRING },
                  benefits: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["coverage", "benefits"]
              },
              tourNotes: { type: Type.ARRAY, items: { type: Type.STRING } },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING },
                          activity: { type: Type.STRING },
                          description: { type: Type.STRING },
                          location: { type: Type.STRING }
                        },
                        required: ["time", "activity", "description", "location"]
                      }
                    }
                  },
                  required: ["day", "activities"]
                }
              }
            },
            required: ["destination", "duration", "summary", "insights", "days", "alerts", "travelInsights", "travelAlerts", "tourPrice"]
          }
        }
      });

      const responseText = response.text || '';

      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON Parse Error. Full response text:", responseText);
        throw new Error("THE AI RETURNED AN INVALID RESPONSE FORMAT. PLEASE TRY AGAIN.");
      }
      // Assign unique ID and image if missing
      parsedData.id = Math.random().toString(36).substr(2, 9);
      parsedData.image = `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800&q=80`; // Placeholder
      
      const now = new Date().toISOString();
      parsedData.metadata = {
        author: "AI LUXURY PLANNER",
        createdAt: now,
        lastModified: now
      };
      
      setItinerary(parsedData);
      setView('result');
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-espresso font-sans selection:bg-luxury-beige/30 transition-colors duration-700">
      <Navbar onNavigate={setView} currentView={view} />

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Landing onStart={startSetup} onViewSaved={() => setView('saved')} />
          </motion.div>
        )}

        {view === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <TripSetup onSubmit={generateItinerary} onBack={() => setView('landing')} />
          </motion.div>
        )}

        {view === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {view === 'result' && itinerary && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <ItineraryView itinerary={itinerary} onRestart={() => setView('landing')} />
          </motion.div>
        )}

        {view === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <SavedTrips onSelect={(savedTrip) => {
              setItinerary(savedTrip);
              setView('result');
            }} onBack={() => setView('landing')} />
          </motion.div>
        )}
      </AnimatePresence>

      <EasterEggModal 
        isOpen={showEasterEgg} 
        onClose={() => {
          setShowEasterEgg(false);
          setPendingPrefs(null);
        }}
        onContinue={() => {
          if (pendingPrefs) {
            setShowEasterEgg(false);
            const prefsToUse = pendingPrefs;
            setPendingPrefs(null);
            setPreferences(prefsToUse);
            setView('loading');
            executeGeneration(prefsToUse).catch(err => {
              console.error(err);
              setError(t('generalError') || "Failed to generate itinerary. Please try again.");
              setView('setup');
            });
          }
        }}
      />

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50">
          {error}
        </div>
      )}

      <Chatbot />
      {view === 'result' && <SocialFloatingActions />}
    </div>
  );
}
