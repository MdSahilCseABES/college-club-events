import React from 'react';
import type { ClubEvent } from '../types';
import { useEvents } from '../context/EventContext';
import { Calendar, Clock, MapPin, Users, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface EventCardProps {
  event: ClubEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { setSelectedEventForRegister, setSelectedEventForDetails } = useEvents();

  const isFull = event.registeredCount >= event.capacity;
  const isClosed = event.status === 'Closed' || event.status === 'Completed' || isFull;
  const seatsRemaining = Math.max(0, event.capacity - event.registeredCount);
  const fillPercent = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Hackathon':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Workshop':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Technical':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Design & Creative':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'Cultural & Arts':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Gaming & Esports':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  const getStatusBadge = () => {
    if (isFull) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          Housefull
        </span>
      );
    }
    if (event.status === 'Filling Fast') {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
          🔥 Filling Fast
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        Open
      </span>
    );
  };

  return (
    <div className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Event Banner Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          <div className="backdrop-blur-md rounded-full">{getStatusBadge()}</div>
        </div>

        {event.isFeatured && (
          <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Flagship Event
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h3
            onClick={() => setSelectedEventForDetails(event)}
            className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
            title={event.title}
          >
            {event.title}
          </h3>

          <p className="mt-1 text-xs text-slate-400 font-medium line-clamp-1">
            {event.tagline || event.organizer}
          </p>

          {/* Description */}
          <p className="mt-2.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Meta Details */}
          <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span className="truncate" title={event.venue}>
                {event.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Capacity Progress & Actions */}
        <div className="space-y-3 pt-2">
          {/* Capacity Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {event.registeredCount} / {event.capacity} Registered
              </span>
              <span className={seatsRemaining < 15 ? 'text-amber-400 font-bold' : ''}>
                {seatsRemaining > 0 ? `${seatsRemaining} left` : 'Full'}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  fillPercent >= 100
                    ? 'bg-rose-500'
                    : fillPercent >= 80
                    ? 'bg-amber-500'
                    : 'bg-indigo-500'
                }`}
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>

          {/* Buttons: Details & Register */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setSelectedEventForDetails(event)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setSelectedEventForRegister(event)}
              disabled={isClosed}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md ${
                isClosed
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <span>{isClosed ? 'Closed' : 'Register'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
