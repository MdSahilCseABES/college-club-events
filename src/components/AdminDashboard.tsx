import React, { useState, useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import { AdminEventModal } from './AdminEventModal';
import { ConfirmModal } from './ConfirmModal';
import type { ClubEvent, Registration, EventCategory } from '../types';
import { 
  Shield, 
  Plus, 
  Calendar, 
  Users, 
  Download, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw,
  CheckCircle2, 
  Ticket, 
  BarChart3, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    events, 
    registrations, 
    setCurrentView, 
    deleteEvent, 
    cancelRegistration, 
    resetToDemoData,
    setTicketToView,
    updateEvent
  } = useEvents();

  const [activeTab, setActiveTab] = useState<'events' | 'registrations' | 'analytics'>('events');

  // Modal states
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<ClubEvent | null>(null);

  // Confirm delete states
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'event' | 'registration' | 'reset';
    id?: string;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'event',
    title: '',
    message: '',
  });

  // Admin Events Filtering
  const [adminEventSearch, setAdminEventSearch] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<EventCategory>('All');

  // Admin Registrations Filtering
  const [regSearch, setRegSearch] = useState('');
  const [selectedEventIdForRegFilter, setSelectedEventIdForRegFilter] = useState<string>('all');

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (adminCategoryFilter !== 'All' && e.category !== adminCategoryFilter) return false;
      if (adminEventSearch.trim()) {
        const q = adminEventSearch.toLowerCase().trim();
        return (
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.organizer?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, adminCategoryFilter, adminEventSearch]);

  // Filtered Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      if (selectedEventIdForRegFilter !== 'all' && r.eventId !== selectedEventIdForRegFilter) {
        return false;
      }
      if (regSearch.trim()) {
        const q = regSearch.toLowerCase().trim();
        return (
          r.studentName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.college.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.eventName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [registrations, selectedEventIdForRegFilter, regSearch]);

  // Key Stats
  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const totalRegistered = registrations.length;
  const avgFillRate = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;
  const activeEventsCount = events.filter((e) => e.status !== 'Completed' && e.status !== 'Closed').length;

  // Export to CSV Function
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      alert('No registrations available to export.');
      return;
    }

    const headers = ['Ticket ID', 'Student Name', 'Email', 'College', 'Academic Year', 'Phone', 'Event Name', 'Event Date', 'Event Venue', 'Registered At', 'Status'];
    const rows = filteredRegistrations.map((r) => [
      `"${r.id}"`,
      `"${r.studentName}"`,
      `"${r.email}"`,
      `"${r.college}"`,
      `"${r.year}"`,
      `"${r.phone}"`,
      `"${r.eventName.replace(/"/g, '""')}"`,
      `"${r.eventDate}"`,
      `"${r.eventVenue.replace(/"/g, '""')}"`,
      `"${new Date(r.registeredAt).toLocaleString()}"`,
      `"${r.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `college_club_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenAddEvent = () => {
    setEventToEdit(null);
    setEventModalOpen(true);
  };

  const handleOpenEditEvent = (event: ClubEvent) => {
    setEventToEdit(event);
    setEventModalOpen(true);
  };

  const handleDeleteEventClick = (event: ClubEvent) => {
    setDeleteModalState({
      isOpen: true,
      type: 'event',
      id: event.id,
      title: 'Delete Event?',
      message: `Are you sure you want to delete "${event.title}"? This will also remove all associated student registrations (${event.registeredCount} attendees). This action cannot be undone.`,
    });
  };

  const handleDeleteRegClick = (reg: Registration) => {
    setDeleteModalState({
      isOpen: true,
      type: 'registration',
      id: reg.id,
      title: 'Cancel Registration?',
      message: `Are you sure you want to cancel the registration for ${reg.studentName} (Ticket ID: ${reg.id}) from "${reg.eventName}"?`,
    });
  };

  const handleResetDataClick = () => {
    setDeleteModalState({
      isOpen: true,
      type: 'reset',
      title: 'Reset Demo Data?',
      message: 'This will restore all sample events, registrations, and metrics back to the original demo state. Any custom events or registrations created during testing will be reset.',
    });
  };

  const handleConfirmAction = () => {
    if (deleteModalState.type === 'event' && deleteModalState.id) {
      deleteEvent(deleteModalState.id);
    } else if (deleteModalState.type === 'registration' && deleteModalState.id) {
      cancelRegistration(deleteModalState.id);
    } else if (deleteModalState.type === 'reset') {
      resetToDemoData();
    }
    setDeleteModalState({ isOpen: false, type: 'event', title: '', message: '' });
  };

  return (
    <div className="py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 border border-purple-500/30 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Shield className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-purple-300">
              Administrator Console
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Club Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Create, edit, and organize events, track student registrations, and export attendee rosters.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCurrentView('events')}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Student View</span>
          </button>

          <button
            onClick={handleResetDataClick}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
            title="Reset to default seed data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleOpenAddEvent}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Events</span>
            <Calendar className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{events.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium">{activeEventsCount} active / upcoming</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Registrations</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{registrations.length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Verified student tickets</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Fill Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{avgFillRate}%</p>
          <p className="text-[11px] text-slate-400 font-medium">{totalRegistered} / {totalCapacity} seats</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Featured Flagship</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-sm font-extrabold text-white truncate">
            {events.find((e) => e.isFeatured)?.title || 'None Selected'}
          </p>
          <p className="text-[11px] text-pink-400 font-medium">Hero countdown active</p>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'events'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Manage Events</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs bg-purple-500/30 text-purple-200">
            {events.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'registrations'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Students</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs bg-purple-500/30 text-purple-200">
            {registrations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* TAB 1: MANAGE EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {/* Search & Category Filter for Admin */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={adminEventSearch}
                onChange={(e) => setAdminEventSearch(e.target.value)}
                placeholder="Search events by title, venue..."
                className="w-full bg-slate-900 text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={adminCategoryFilter}
                onChange={(e) => setAdminCategoryFilter(e.target.value as any)}
                className="bg-slate-900 text-white px-3 py-2 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-purple-500 cursor-pointer w-full sm:w-auto"
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Cultural & Arts">Cultural & Arts</option>
                <option value="Gaming & Esports">Gaming & Esports</option>
                <option value="Career & Leadership">Career & Leadership</option>
              </select>

              <button
                onClick={handleOpenAddEvent}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          {/* Events Table Container */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Event Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Venue</th>
                    <th className="py-3 px-4">Registrations / Seats</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredEvents.map((event) => {
                    const fill = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
                    return (
                      <tr key={event.id} className="hover:bg-slate-850/50 transition-colors">
                        {/* Event Name & Thumbnail */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm hover:text-indigo-400 transition-colors">
                                  {event.title}
                                </span>
                                {event.isFeatured && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    Flagship
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1">{event.organizer}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            {event.category}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <p className="font-semibold text-white">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-[11px] text-slate-400">{event.time}</p>
                        </td>

                        {/* Venue */}
                        <td className="py-3 px-4 max-w-[150px] truncate" title={event.venue}>
                          {event.venue}
                        </td>

                        {/* Capacity Progress */}
                        <td className="py-3 px-4">
                          <div className="w-32 space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-bold text-white">{event.registeredCount}</span>
                              <span className="text-slate-400">/ {event.capacity}</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-purple-500 h-1.5 rounded-full"
                                style={{ width: `${fill}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {event.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedEventIdForRegFilter(event.id);
                                setActiveTab('registrations');
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="View registered students for this event"
                            >
                              <Users className="w-3.5 h-3.5 text-indigo-400" />
                            </button>

                            <button
                              onClick={() => handleOpenEditEvent(event)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="Edit Event"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                            </button>

                            <button
                              onClick={() => handleDeleteEventClick(event)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredEvents.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  No events found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED STUDENTS */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          {/* Search, Filter by Event & CSV Export */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-4 rounded-2xl border border-slate-800">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                placeholder="Search by student, email, ticket..."
                className="w-full bg-slate-900 text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Filter by Event Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="w-full sm:w-64">
                <select
                  value={selectedEventIdForRegFilter}
                  onChange={(e) => setSelectedEventIdForRegFilter(e.target.value)}
                  className="w-full bg-slate-900 text-white px-3 py-2 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-purple-500 cursor-pointer truncate"
                >
                  <option value="all">All Events ({registrations.length} total)</option>
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title} ({e.registeredCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Export to CSV Button */}
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-emerald-600/20"
                title="Download roster as CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Registrations Table Container */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">College & Year</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Registered Event</th>
                    <th className="py-3 px-4">Registered Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-850/50 transition-colors">
                      {/* Ticket ID */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {reg.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                        {reg.studentName}
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                        {reg.email}
                      </td>

                      {/* College & Year */}
                      <td className="py-3 px-4">
                        <p className="text-white font-medium truncate max-w-[160px]">{reg.college}</p>
                        <p className="text-[11px] text-purple-400">{reg.year}</p>
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4 font-mono text-slate-300 whitespace-nowrap">
                        {reg.phone}
                      </td>

                      {/* Event Name */}
                      <td className="py-3 px-4 max-w-[200px] truncate" title={reg.eventName}>
                        <span className="text-slate-200 font-medium">{reg.eventName}</span>
                      </td>

                      {/* Registered Date */}
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                        {new Date(reg.registeredAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setTicketToView(reg)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-white transition-colors"
                            title="View / Print Digital Ticket"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteRegClick(reg)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Cancel Registration"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRegistrations.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  No registrations found matching your search or event filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS & INSIGHTS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registrations by Category */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Registrations by Category
            </h3>

            <div className="space-y-3">
              {['Hackathon', 'Workshop', 'Technical', 'Design & Creative', 'Cultural & Arts', 'Gaming & Esports'].map((cat) => {
                const count = events
                  .filter((e) => e.category === cat)
                  .reduce((sum, e) => sum + e.registeredCount, 0);
                const percent = totalRegistered > 0 ? Math.round((count / totalRegistered) * 100) : 0;

                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{cat}</span>
                      <span className="text-slate-400 font-bold">{count} attendees ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registrations by Academic Year */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" />
              Attendee Demographic by Academic Year
            </h3>

            <div className="space-y-3">
              {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'].map((yr) => {
                const count = registrations.filter((r) => r.year === yr).length;
                const percent = registrations.length > 0 ? Math.round((count / registrations.length) * 100) : 0;

                return (
                  <div key={yr} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{yr}</span>
                      <span className="text-slate-400 font-bold">{count} students ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-amber-500 h-2 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Admin Event Add / Edit Modal */}
      <AdminEventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        eventToEdit={eventToEdit}
      />

      {/* Confirmation Dialog */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title={deleteModalState.title}
        message={deleteModalState.message}
        onConfirm={handleConfirmAction}
        onCancel={() => setDeleteModalState({ ...deleteModalState, isOpen: false })}
      />
    </div>
  );
};
