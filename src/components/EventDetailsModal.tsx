import React from 'react';
import { useEvents } from '../context/EventContext';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Share2
} from 'lucide-react';

export const EventDetailsModal: React.FC = () => {
  const { selectedEventForDetails, setSelectedEventForDetails, setSelectedEventForRegister } = useEvents();

  if (!selectedEventForDetails) return null;

  const event = selectedEventForDetails;
  const isFull = event.registeredCount >= event.capacity;
  const isClosed = event.status === 'Closed' || event.status === 'Completed' || isFull;
  const seatsRemaining = Math.max(0, event.capacity - event.registeredCount);
  const fillPercentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
      >
        {/* Banner with close button */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-950 shrink-0">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            onClick={() => setSelectedEventForDetails(null)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-all backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/80 text-white backdrop-blur-md border border-indigo-400/40">
              {event.category}
            </span>
            {event.isFeatured && (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured Flagship
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-indigo-400 font-semibold">
              {event.tagline || `Organized by ${event.organizer}`}
            </p>
          </div>

          {/* Quick Schedule & Location Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Date
              </span>
              <p className="font-semibold text-white">
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Timing
              </span>
              <p className="font-semibold text-white">{event.time}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-400" /> Venue
              </span>
              <p className="font-semibold text-white truncate" title={event.venue}>{event.venue}</p>
            </div>
          </div>

          {/* Description & Full Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">About This Event</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>
            {event.fullDetails && (
              <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                {event.fullDetails}
              </p>
            )}
          </div>

          {/* Prizes / Perks if any */}
          {event.prizes && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-amber-300">Prizes & Recognition</p>
                <p className="text-sm font-semibold text-white">{event.prizes}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Event Tags</span>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Capacity Progress */}
          <div className="space-y-2 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Attendance Capacity: <strong>{event.registeredCount} / {event.capacity}</strong></span>
              </span>
              <span className="font-bold text-indigo-300">{seatsRemaining} seats remaining</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer with Registration CTA */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 shrink-0 flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedEventForDetails(null)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              setSelectedEventForDetails(null);
              setSelectedEventForRegister(event);
            }}
            disabled={isClosed}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
              isClosed
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <span>{isClosed ? 'Event Registration Closed' : 'Proceed to Register'}</span>
            {!isClosed && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
