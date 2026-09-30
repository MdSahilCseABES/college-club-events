import React from 'react';
import { useEvents } from '../context/EventContext';
import { EventCard } from './EventCard';
import { ArrowRight, Calendar } from 'lucide-react';

export const UpcomingEventsPreview: React.FC = () => {
  const { events, setCurrentView } = useEvents();

  // Pick top 3 upcoming events (excluding or including featured)
  const upcomingEvents = [...events]
    .filter((e) => e.status !== 'Completed')
    .slice(0, 3);

  return (
    <section className="my-16 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Upcoming Lineup
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Upcoming Club Events
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Register early to secure your seat. All verified participants receive official club certificates, hands-on learning resources, and networking passes.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="self-start sm:self-auto flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors group"
        >
          <span>View All {events.length} Events</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};
