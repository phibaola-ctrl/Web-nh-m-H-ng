export interface TripPreferences {
  destination: string;
  days: number;
  companions: 'solo' | 'couple' | 'family' | 'friends';
  interests: string[];
  budget: 'budget' | 'medium' | 'luxury';
}

export interface Activity {
  time: string;
  activity: string;
  description: string;
  location?: string;
}

export interface DayPlan {
  day: number;
  activities: Activity[];
}

export interface Itinerary {
  id?: string;
  image?: string;
  destination: string;
  duration: number;
  budgetStyle: string;
  travelStyle: string;
  summary: string;
  insights: string[];
  days: DayPlan[];
  alerts: string[];
  totalEstimatedCost?: string;
  tourPrice?: {
    amount: string;
    currency: string;
    perPerson: boolean;
  };
  tourIncludes?: string[];
  tourExcludes?: string[];
  travelInsurance?: {
    coverage: string;
    benefits: string[];
  };
  tourNotes?: string[];
  travelInsights?: {
    warnings: string[];
    tips: string[];
  };
  travelAlerts?: {
    weather: string;
    risks: string[];
    scams: string[];
  };
  metadata?: {
    author: string;
    createdAt: string;
    lastModified: string;
  };
}
