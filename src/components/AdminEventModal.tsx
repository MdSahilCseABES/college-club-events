import React, { useState, useEffect } from 'react';
import type { ClubEvent, EventCategory, EventStatus } from '../types';
import { useEvents } from '../context/EventContext';
import { 
  X, 
  Plus, 
  Save, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles,
  Trophy,
  Check
} from 'lucide-react';

interface AdminEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit: ClubEvent | null;
}

const CATEGORIES: Exclude<EventCategory, 'All'>[] = [
  'Technical',
  'Hackathon',
  'Workshop',
  'Design & Creative',
  'Cultural & Arts',
  'Gaming & Esports',
  'Career & Leadership',
];

const PRESET_IMAGES = [
  { label: 'Hackathon / Coding', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'AI & Workshop', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Robotics & Hardware', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'UI/UX Design', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Music & Cultural Fest', url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Esports Gaming', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80' },
];

export const AdminEventModal: React.FC<AdminEventModalProps> = ({
  isOpen,
  onClose,
  eventToEdit,
}) => {
  const { addEvent, updateEvent } = useEvents();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Exclude<EventCategory, 'All'>>('Technical');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [capacity, setCapacity] = useState(100);
  const [description, setDescription] = useState('');
  const [fullDetails, setFullDetails] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<EventStatus>('Upcoming');
  const [organizer, setOrganizer] = useState('Synapse Club Core');
  const [prizes, setPrizes] = useState('');
  const [tagsStr, setTagsStr] = useState('Tech, Innovation');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setTagline(eventToEdit.tagline || '');
      setCategory(eventToEdit.category);
      setDate(eventToEdit.date);
      setTime(eventToEdit.time);
      setVenue(eventToEdit.venue);
      setCapacity(eventToEdit.capacity);
      setDescription(eventToEdit.description);
      setFullDetails(eventToEdit.fullDetails || '');
      setImageUrl(eventToEdit.imageUrl);
      setIsFeatured(eventToEdit.isFeatured);
      setStatus(eventToEdit.status);
      setOrganizer(eventToEdit.organizer || 'Synapse Club Core');
      setPrizes(eventToEdit.prizes || '');
      setTagsStr(eventToEdit.tags?.join(', ') || '');
    } else {
      // Defaults for new event
      setTitle('');
      setTagline('');
      setCategory('Technical');
      setDate(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
      setTime('10:00 AM - 04:00 PM');
      setVenue('Main Seminar Hall 1, Block A');
      setCapacity(120);
      setDescription('');
      setFullDetails('');
      setImageUrl(PRESET_IMAGES[0].url);
      setIsFeatured(false);
      setStatus('Upcoming');
      setOrganizer('Synapse Club Core');
      setPrizes('');
      setTagsStr('Workshop, Hands-on');
    }
    setErrors({});
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Event title is required.';
    if (!date) errs.date = 'Event date is required.';
    if (!time.trim()) errs.time = 'Time is required.';
    if (!venue.trim()) errs.venue = 'Venue is required.';
    if (!capacity || capacity < 1) errs.capacity = 'Capacity must be at least 1.';
    if (!description.trim()) errs.description = 'Description is required.';
    if (!imageUrl.trim()) errs.imageUrl = 'Banner Image URL is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (eventToEdit) {
      updateEvent(eventToEdit.id, {
        title: title.trim(),
        tagline: tagline.trim(),
        category,
        date,
        time: time.trim(),
        venue: venue.trim(),
        capacity: Number(capacity),
        description: description.trim(),
        fullDetails: fullDetails.trim(),
        imageUrl: imageUrl.trim(),
        isFeatured,
        status,
        organizer: organizer.trim(),
        prizes: prizes.trim(),
        tags,
      });
    } else {
      addEvent({
        title: title.trim(),
        tagline: tagline.trim(),
        category,
        date,
        time: time.trim(),
        venue: venue.trim(),
        capacity: Number(capacity),
        description: description.trim(),
        fullDetails: fullDetails.trim(),
        imageUrl: imageUrl.trim(),
        isFeatured,
        status,
        organizer: organizer.trim(),
        prizes: prizes.trim(),
        tags,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-900/60 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-purple-400">
              Admin Event Management
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              {eventToEdit ? 'Edit Event Details' : 'Create New Club Event'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Title & Tagline */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Event Title <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. HackSynapse 2026: 36h National Hackathon"
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
              {errors.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Catchy Tagline / Subtitle
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Build the future of Agentic AI, Web3, and ClimateTech"
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Category, Status, Capacity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-800/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-800/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Filling Fast">Filling Fast</option>
                <option value="Closed">Closed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Seat Capacity <span className="text-pink-400">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="5000"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full bg-slate-800/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
              {errors.capacity && <p className="text-[11px] text-rose-400 mt-1">{errors.capacity}</p>}
            </div>
          </div>

          {/* Date, Time, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Event Date <span className="text-pink-400">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-800/80 text-white px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
              {errors.date && <p className="text-[11px] text-rose-400 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Time Interval <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 10:00 AM - 04:00 PM"
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
              {errors.time && <p className="text-[11px] text-rose-400 mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Venue <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Audi-2, Block B"
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
              {errors.venue && <p className="text-[11px] text-rose-400 mt-1">{errors.venue}</p>}
            </div>
          </div>

          {/* Description & Full Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Short Description (Cards & Previews) <span className="text-pink-400">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Concise overview of what this event is about..."
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 p-3 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
              {errors.description && <p className="text-[11px] text-rose-400 mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Details (Prerequisites, Agenda, Tracks)
              </label>
              <textarea
                rows={2}
                value={fullDetails}
                onChange={(e) => setFullDetails(e.target.value)}
                placeholder="Additional instructions, requirements, what to bring..."
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 p-3 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Banner Image URL + Preset Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Banner Image URL <span className="text-pink-400">*</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
            />
            {errors.imageUrl && <p className="text-[11px] text-rose-400 mt-1">{errors.imageUrl}</p>}

            {/* Image Presets Selector */}
            <div className="mt-2.5">
              <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Or choose a preset cover:</span>
              <div className="flex flex-wrap gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      imageUrl === preset.url
                        ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                        : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                    }`}
                  >
                    {imageUrl === preset.url && <Check className="w-3 h-3 text-purple-400" />}
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prizes, Organizer, Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Prize Pool / Perks
              </label>
              <input
                type="text"
                value={prizes}
                onChange={(e) => setPrizes(e.target.value)}
                placeholder="e.g. ₹50,000 Cash Pool + Certificates"
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Organizer / Department
              </label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="e.g. AI & Research Division"
                className="w-full bg-slate-800/80 text-white placeholder-slate-500 px-3 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Featured Event Checkbox */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured Flagship Spotlight
              </span>
              <p className="text-[11px] text-slate-400">
                Display this event prominently in the hero spotlight section of the Home Page with live countdown.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{eventToEdit ? 'Save Changes' : 'Create Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
