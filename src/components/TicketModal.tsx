import React from 'react';
import { useEvents } from '../context/EventContext';
import { 
  X, 
  Printer, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  QrCode, 
  Sparkles, 
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

export const TicketModal: React.FC = () => {
  const { ticketToView, setTicketToView, setCurrentView } = useEvents();

  if (!ticketToView) return null;

  const ticket = ticketToView;

  // Generate Google Calendar Link
  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(ticket.eventName);
    const location = encodeURIComponent(ticket.eventVenue);
    const details = encodeURIComponent(
      `Your Confirmed Entry Pass for ${ticket.eventName}.\nTicket ID: ${ticket.id}\nAttendee: ${ticket.studentName} (${ticket.college})`
    );
    const dateFormatted = ticket.eventDate.replace(/-/g, '');
    const dates = `${dateFormatted}T090000Z/${dateFormatted}T180000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header Ribbon */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-200" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              Registration Confirmed!
            </span>
          </div>
          <button
            onClick={() => setTicketToView(null)}
            className="p-1.5 rounded-lg hover:bg-black/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Pass Container */}
        <div id="printable-ticket" className="p-6 space-y-6">
          
          {/* Ticket Card Component */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-dashed border-indigo-500/40 p-6 shadow-xl overflow-hidden">
            {/* Top Pass Brand */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black tracking-wider text-white">SYNAPSE COLLEGE CLUB</p>
                  <p className="text-[10px] text-slate-400">Official Student Entry Pass</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ticket Pass ID</span>
                <span className="text-sm font-mono font-extrabold text-indigo-400 tracking-wider">
                  {ticket.id}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="py-4 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Attendee
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                {ticket.eventName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{new Date(ticket.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span className="truncate">{ticket.eventVenue}</span>
                </div>
              </div>
            </div>

            {/* Attendee Details Grid */}
            <div className="border-t border-b border-slate-800 py-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">Attendee</span>
                <span className="font-bold text-white text-sm">{ticket.studentName}</span>
                <span className="text-[11px] text-slate-400 block truncate">{ticket.email}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">College & Year</span>
                <span className="font-bold text-slate-200 text-xs truncate block">{ticket.college}</span>
                <span className="text-[11px] text-indigo-400 font-medium">{ticket.year}</span>
              </div>
            </div>

            {/* QR Code and Barcode simulation */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Fast Gate Check-In</span>
                </div>
                <p className="text-[11px] text-slate-400">Present this QR pass on phone or printout at the entrance desk.</p>
              </div>

              {/* High Contrast Scalable QR Mock SVG */}
              <div className="w-18 h-18 p-1.5 bg-white rounded-xl shadow-md shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-slate-950" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4-2h2v4h-2v-4zm6 6h-4v2h4v-2zm-6 0h2v2h-2v-2zm4-4h2v2h-2v-2zm-8-3h2v2H8v-2zm-2 2h2v2H6v-2zm4 2h2v2h-2v-2z" />
                </svg>
              </div>
            </div>

            {/* Simulated Barcode at bottom */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>SCAN-ID: {ticket.id}</span>
              <span className="tracking-widest">||| | |||| | ||||| || | |||</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Ticket</span>
              </button>

              <a
                href={createGoogleCalendarLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Add to Google Cal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <button
              onClick={() => {
                setTicketToView(null);
                setCurrentView('events');
              }}
              className="w-full py-2 text-center text-xs text-slate-400 hover:text-white transition-colors"
            >
              Close & Browse More Events
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
