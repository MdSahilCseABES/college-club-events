import React, { useState, useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { Calendar, Clock, MapPin, Trophy, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ClubEvent } from '../types';

export const FeaturedEvent: React.FC = () => {
  const { events, setSelectedEventForRegister, setSelectedEventForDetails } = useEvents();

  // Find marked featured event or fall back to the largest/first upcoming event
  const featuredEvent: ClubEvent | undefined =
    events.find((e) => e.isFeatured) || events[0];

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    if (!featuredEvent) return;

    const targetDate = new Date(`${featuredEvent.date}T09:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [featuredEvent]);

  if (!featuredEvent) return null;

  const seatsLeft = Math.max(0, featuredEvent.capacity - featuredEvent.registeredCount);
  const fillPercentage = Math.min(100, Math.round((featuredEvent.registeredCount / featuredEvent.capacity) * 100));

  return (
    <section className="relative my-12">
      {/* Background ambient glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-20 blur-xl"></div>

      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Event Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured Flagship Event
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {featuredEvent.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Registrations Open
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {featuredEvent.title}
              </h3>
              <p className="mt-2 text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                {featuredEvent.tagline}
              </p>
            </div>

            <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
              {featuredEvent.description}
            </p>

            {/* Quick Details Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{new Date(featuredEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 sm:col-span-2">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="truncate">{featuredEvent.venue}</span>
              </div>
            </div>

            {/* Prize Pool & Capacity */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
              {featuredEvent.prizes && (
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>{featuredEvent.prizes}</span>
                </div>
              )}
              <div className="text-sm text-slate-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>
                  <strong className="text-white">{featuredEvent.registeredCount}</strong> / {featuredEvent.capacity} Seats Filled ({seatsLeft} remaining)
                </span>
              </div>
            </div>

            {/* Seat Fill Progress Bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${fillPercentage}%` }}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedEventForRegister(featuredEvent)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Register for Flagship</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedEventForDetails(featuredEvent)}
                className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
              >
                Event Details & Schedule
              </button>
            </div>
          </div>

          {/* Right Column: Visual Poster & Countdown Timer */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
              <img
                src={featuredEvent.imageUrl}
                alt={featuredEvent.title}
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Countdown Bar Overlay */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400 text-center mb-2.5 flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Event Kickoff In
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700">
                    <span className="block text-xl font-extrabold text-white">{timeLeft.days}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Days</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700">
                    <span className="block text-xl font-extrabold text-white">{timeLeft.hours}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Hours</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700">
                    <span className="block text-xl font-extrabold text-white">{timeLeft.minutes}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Mins</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700">
                    <span className="block text-xl font-extrabold text-pink-400">{timeLeft.seconds}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks teaser */}
            <div className="w-full mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Certificate
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Food & Swag Kit
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Mentorship
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
