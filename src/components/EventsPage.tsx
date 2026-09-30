import React, { useState, useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import { EventCard } from './EventCard';
import type { EventCategory } from '../types';
import { Search, Filter, Calendar, X, SlidersHorizontal, AlertCircle } from 'lucide-react';

const CATEGORIES: EventCategory[] = [
  'All',
  'Technical',
  'Hackathon',
  'Workshop',
  'Design & Creative',
  'Cultural & Arts',
  'Gaming & Esports',
  'Career & Leadership',
];

export const EventsPage: React.FC = () => {
  const { events, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useEvents();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Filling Fast'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'title'>('date');

  // Filtered and sorted events
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Category filter
        if (selectedCategory !== 'All' && event.category !== selectedCategory) {
          return false;
        }

        // Search query filter (checks name, tagline, description, venue, tags)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = event.title.toLowerCase().includes(q);
          const matchTagline = event.tagline?.toLowerCase().includes(q) || false;
          const matchDesc = event.description.toLowerCase().includes(q);
          const matchVenue = event.venue.toLowerCase().includes(q);
          const matchTags = event.tags?.some((t) => t.toLowerCase().includes(q)) || false;

          if (!matchName && !matchTagline && !matchDesc && !matchVenue && !matchTags) {
            return false;
          }
        }

        // Status filter
        if (statusFilter === 'Open') {
          if (event.status === 'Closed' || event.registeredCount >= event.capacity) return false;
        } else if (statusFilter === 'Filling Fast') {
          if (event.status !== 'Filling Fast' && event.registeredCount < event.capacity * 0.8) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === 'popular') {
          return b.registeredCount - a.registeredCount;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [events, selectedCategory, searchQuery, statusFilter, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setStatusFilter('All');
    setSortBy('date');
  };

  return (
    <div className="py-8 space-y-8">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Discover & Participate
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Club Events Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Explore hackathons, workshops, technical bootcamps, and cultural festivals. Filter by track or search by keyword to register.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-semibold bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 self-start md:self-auto">
          Showing <strong className="text-indigo-400 font-bold">{filteredEvents.length}</strong> of {events.length} Events
        </div>
      </div>

      {/* Search and Filters Control Panel */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-4">
        {/* Search Bar + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by name, topic, venue, or keyword (e.g. AI, Hackathon, Robot)..."
              className="w-full bg-slate-900/90 text-white placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-900/90 text-white text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="date">Earliest Date First</option>
              <option value="popular">Most Popular (Registrations)</option>
              <option value="title">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Status Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mr-1 hidden sm:inline">
              Category:
            </span>
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === 'All'
                  ? events.length
                  : events.filter((e) => e.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Status Pill Filter */}
          <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Status:</span>
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              {(['All', 'Open', 'Filling Fast'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === status
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Results Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No Matching Events Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              No events matched your current search filters or category. Try clearing filters to see all available events.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
