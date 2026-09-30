import React from 'react';
import { useEvents } from '../context/EventContext';
import { Sparkles, Calendar, ArrowRight, Award, Zap, Code, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, events } = useEvents();

  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Decorative gradient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        
        {/* Top Announcement Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Semester 2026 Event Calendar is LIVE</span>
          <span className="text-slate-500">•</span>
          <span className="text-purple-400 font-bold">{events.length} Events Open</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
          Where Campus Innovation <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Meets Limitless Ambition
          </span>
        </h1>

        {/* Club Introduction Paragraph */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
          Welcome to <strong className="text-white font-semibold">SYNAPSE</strong>, the official college tech and creative society. From 36-hour national hackathons to robotics combat, developer bootcamps, and cultural fest nights — this is your stage to lead, build, and conquer.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentView('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <span>Explore All Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentView('about')}
            className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Club Overview & Wings</span>
          </button>
        </div>

        {/* Key Club Metrics Bar */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-4 text-center border border-slate-800/80">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Code className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">2,500+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Active Members</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-slate-800/80">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">40+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Annual Events</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-slate-800/80">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">₹5.5L+</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Prize Grants Won</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-slate-800/80">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-lg bg-pink-500/10 text-pink-400">
              <Zap className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Student-Driven</p>
          </div>
        </div>

      </div>
    </section>
  );
};
