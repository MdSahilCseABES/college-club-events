import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Building2, 
  GraduationCap, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const RegistrationModal: React.FC = () => {
  const { 
    selectedEventForRegister, 
    setSelectedEventForRegister, 
    registerStudent, 
    setTicketToView 
  } = useEvents();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('2nd Year');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  if (!selectedEventForRegister) return null;

  const event = selectedEventForRegister;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 letters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!college.trim()) {
      newErrors.college = 'Please specify your college or university name.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDuplicateWarning(null);

    if (!validate()) return;

    setSubmitting(true);

    setTimeout(() => {
      const result = registerStudent({
        eventId: event.id,
        studentName: fullName,
        email,
        college,
        year,
        phone,
      });

      setSubmitting(false);

      if (result.success && result.registration) {
        // Fire celebration confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore if canvas blocked
        }

        // Close registration modal and open ticket
        setSelectedEventForRegister(null);
        setTicketToView(result.registration);
      } else {
        setDuplicateWarning(result.message);
      }
    }, 400);
  };

  const handleClose = () => {
    setSelectedEventForRegister(null);
    setErrors({});
    setDuplicateWarning(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Banner with Event Info */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900 border-b border-slate-800">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {event.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">Event Registration</span>
          </div>

          <h3 id="modal-title" className="text-xl font-extrabold text-white leading-snug">
            {event.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              <span className="truncate max-w-[200px]">{event.venue}</span>
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {duplicateWarning && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <p className="font-semibold">Notice</p>
                <p className="mt-0.5">{duplicateWarning}</p>
              </div>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="e.g. Sahil Khan"
                className={`w-full bg-slate-800/80 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.fullName
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="e.g. sahil.dev@college.edu"
                className={`w-full bg-slate-800/80 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.email
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
          </div>

          {/* College and Academic Year in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* College */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                College / University <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => {
                    setCollege(e.target.value);
                    if (errors.college) setErrors({ ...errors, college: '' });
                  }}
                  placeholder="e.g. ABES Engg College"
                  className={`w-full bg-slate-800/80 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                    errors.college
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.college && <p className="text-[11px] text-rose-400 mt-1">{errors.college}</p>}
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Academic Year <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-800/80 text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                  <option value="Postgraduate">Postgraduate / Masters</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick College Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
            <span>Quick pick:</span>
            {['ABES EC', 'DTU', 'IIT Roorkee', 'BITS'].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setCollege(item);
                  if (errors.college) setErrors({ ...errors, college: '' });
                }}
                className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="10-digit mobile number (e.g. 9876543210)"
                maxLength={14}
                className={`w-full bg-slate-800/80 text-white placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
            </div>
            {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
          </div>

          {/* Perks notice */}
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Digital event badge & verifiable QR entry pass generated instantly upon submission.</span>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
