import React from 'react';
import { useEvents } from '../context/EventContext';
import { Sparkles, Heart, Globe, MessageSquare, Share2, Send, Shield, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useEvents();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Club Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                SYNAPSE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                College Club
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering students through cutting-edge technology, hackathons, robotics, creative arts, and esports. The central hub for innovation, leadership, and lifelong peer collaboration.
            </p>

            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors" title="GitHub">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors" title="Community Chat">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors" title="Professional Network">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors" title="Announcements Channel">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Events Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Society
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Campus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Campus Secretariat</h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>Student Innovation Complex, APJ Abdul Kalam Block, Campus 1</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>synapse.club@abes.ac.in</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98765 43210</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} SYNAPSE College Club. Built for Campus Community.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for College Club Recruitment
          </p>
        </div>
      </div>
    </footer>
  );
};
