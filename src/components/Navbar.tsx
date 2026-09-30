import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { Calendar, Shield, Sparkles, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, events, registrations } = useEvents();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const upcomingCount = events.filter((e) => e.status !== 'Completed' && e.status !== 'Closed').length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Club Brand */}
          <div
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                  SYNAPSE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  College Club
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Apex Innovation & Tech Society</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'home'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentView('events')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                currentView === 'events'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
              <span className="px-1.5 py-0.2 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-300">
                {upcomingCount}
              </span>
            </button>

            <button
              onClick={() => setCurrentView('about')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'about'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About Club
            </button>
          </nav>

          {/* Right Action: Admin / Role Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setCurrentView('events')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView !== 'admin'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-purple-400 text-xs flex items-center gap-1 font-semibold"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{currentView === 'admin' ? 'Student' : 'Admin'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              setCurrentView('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setCurrentView('events');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentView === 'events' ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events Catalog
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/20 text-indigo-300">
              {events.length}
            </span>
          </button>
          <button
            onClick={() => {
              setCurrentView('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'about' ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'text-slate-300'
            }`}
          >
            About Club
          </button>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 text-purple-200 text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                Go to Admin Dashboard
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
