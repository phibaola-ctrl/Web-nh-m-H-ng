import { useEffect, useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, ExternalLink, Search, Crosshair, ChevronRight } from 'lucide-react';
import { Activity } from '@/src/types';

// Fix for default marker icons in Vite/React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationData {
  id: string;
  lat: number;
  lon: number;
  name: string;
  description: string;
}

interface MapViewProps {
  destination: string;
  activities: Activity[];
  selectedId: string | null;
  onPointSelect?: (id: string) => void;
}

function ChangeView({ bounds, center }: { bounds?: L.LatLngBoundsExpression; center?: L.LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.flyTo(center, 15, { duration: 1.5 });
    }
  }, [bounds, center, map]);
  return null;
}

export default function MapView({ destination, activities, selectedId, onPointSelect }: MapViewProps) {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Geocoding logic using Nominatim
  useEffect(() => {
    const geocodeLocations = async () => {
      setLoading(true);
      const results: LocationData[] = [];
      const cache = new Map<string, LocationData>();

      for (let i = 0; i < activities.length; i++) {
        const act = activities[i];
        const id = `marker-${i}`;
        const query = act.location ? `${act.location}, ${destination}` : `${act.activity}, ${destination}`;
        
        if (cache.has(query)) {
          results.push({ ...cache.get(query)!, id });
          continue;
        }

        try {
          // Add a small delay to respect Nominatim usage policy (1 request per second recommended)
          if (i > 0) await new Promise(r => setTimeout(r, 1000));
          
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
          const data = await response.json();
          
          if (data && data.length > 0) {
            const loc = {
              id,
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
              name: act.activity,
              description: act.description
            };
            results.push(loc);
            cache.set(query, loc);
          }
        } catch (error) {
          console.error(`Geocoding failed for ${query}:`, error);
        }
      }
      setLocations(results);
      setLoading(false);
    };

    if (activities.length > 0) {
      geocodeLocations();
    }
  }, [activities, destination]);

  const bounds = useMemo(() => {
    if (locations.length === 0) return undefined;
    const lats = locations.map(l => l.lat);
    const lons = locations.map(l => l.lon);
    return L.latLngBounds(
      [Math.min(...lats), Math.min(...lons)],
      [Math.max(...lats), Math.max(...lons)]
    );
  }, [locations]);

  const selectedCenter = useMemo(() => {
    if (!selectedId) return undefined;
    const loc = locations.find(l => l.id === selectedId);
    return loc ? [loc.lat, loc.lon] as [number, number] : undefined;
  }, [selectedId, locations]);

  const polylinePositions = locations.map(l => [l.lat, l.lon] as [number, number]);

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        setUserLocation([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-[56px] overflow-hidden shadow-2xl group border-4 border-luxury-beige/10">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1000] bg-luxury-bg/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-12 h-12 border-4 border-luxury-cacao/20 border-t-luxury-cacao rounded-full animate-spin" />
            <p className="text-sm font-medium text-luxury-cacao/60 animate-pulse">Mapping your journey...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form 
        onSubmit={handleSearch}
        className="absolute top-6 left-6 z-[999] flex items-center gap-2 group/search"
      >
        <div className="flex items-center gap-3 px-6 py-4 glass-luxury rounded-3xl shadow-xl border border-luxury-espresso/5 min-w-[300px]">
          <Search size={18} className="text-luxury-cacao/40" />
          <input 
            type="text" 
            placeholder="Search location..."
            className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-luxury-cacao/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && <div className="w-4 h-4 border-2 border-luxury-cacao/20 border-t-luxury-cacao rounded-full animate-spin" />}
        </div>
      </form>

      <div className="absolute top-6 right-6 z-[999] flex flex-col gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetCurrentLocation}
          className="w-14 h-14 glass-luxury flex items-center justify-center rounded-2xl shadow-xl border border-luxury-espresso/5 text-luxury-espresso hover:text-luxury-cacao transition-colors"
          title="My Location"
        >
          <Crosshair size={22} />
        </motion.button>
      </div>

      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="grayscale invert brightness-90 contrast-90 dark:grayscale-0 dark:invert-0"
        />
        
        <ZoomControl position="bottomright" />
        
        {(bounds || selectedCenter) && <ChangeView bounds={bounds} center={selectedCenter} />}

        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lon]}
            eventHandlers={{
              click: () => onPointSelect?.(loc.id)
            }}
          >
            <Popup className="luxury-popup">
              <div className="p-4 min-w-[200px] space-y-3">
                <h3 className="font-serif font-bold text-lg text-luxury-espresso">{loc.name}</h3>
                <p className="text-xs text-luxury-cacao/80 leading-relaxed font-medium">{loc.description}</p>
                <div className="flex gap-2 pt-2">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-luxury-espresso text-luxury-ivory rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-luxury-cacao transition-colors"
                  >
                    <Navigation size={12} />
                    Directions
                  </a>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center glass-luxury rounded-xl hover:bg-luxury-beige/20 transition-colors"
                  >
                    <ExternalLink size={14} className="text-luxury-espresso" />
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker 
            position={userLocation}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          >
            <Popup className="luxury-popup">
              <div className="p-3 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-luxury-espresso">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {locations.length > 1 && (
          <Polyline 
            positions={polylinePositions}
            pathOptions={{ 
              color: '#5A3E36', 
              weight: 3, 
              dashArray: '10, 10',
              lineCap: 'round',
              opacity: 0.6
            }}
          />
        )}
      </MapContainer>

      {/* Map Overlay Bottom */}
      <div className="absolute bottom-8 left-8 right-8 z-[999] pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="glass-luxury px-6 py-4 rounded-3xl shadow-xl border border-luxury-espresso/5 flex items-center gap-4 pointer-events-auto">
            <div className="w-10 h-10 bg-luxury-espresso rounded-2xl flex items-center justify-center text-luxury-ivory shadow-lg shadow-luxury-espresso/20">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-luxury-cacao/40 uppercase tracking-[0.2em]">Viewing</p>
              <h4 className="text-sm font-serif font-bold text-luxury-espresso">{destination}</h4>
            </div>
          </div>
          
          <div className="flex gap-2 pointer-events-auto">
            {locations.length > 0 && (
              <div className="glass-luxury p-1 rounded-2xl shadow-xl flex gap-1 border border-luxury-espresso/5">
                {locations.slice(0, 5).map((loc, i) => (
                  <button 
                    key={loc.id}
                    onClick={() => onPointSelect?.(loc.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all hover:bg-luxury-espresso hover:text-luxury-ivory"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
