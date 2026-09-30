export type EventCategory =
  | 'All'
  | 'Technical'
  | 'Hackathon'
  | 'Workshop'
  | 'Design & Creative'
  | 'Cultural & Arts'
  | 'Gaming & Esports'
  | 'Career & Leadership';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Filling Fast' | 'Closed';

export interface ClubEvent {
  id: string;
  title: string;
  tagline: string;
  category: Exclude<EventCategory, 'All'>;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM - 04:00 PM"
  venue: string;
  description: string;
  fullDetails?: string;
  capacity: number;
  registeredCount: number;
  isFeatured: boolean;
  status: EventStatus;
  imageUrl: string;
  organizer: string;
  prizes?: string;
  tags: string[];
}

export interface Registration {
  id: string; // Ticket ID e.g. "SYN-84920"
  eventId: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  studentName: string;
  email: string;
  college: string;
  year: string; // "1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"
  phone: string;
  registeredAt: string; // ISO string
  status: 'Confirmed' | 'Waitlist' | 'Cancelled';
}

export type ViewMode = 'home' | 'events' | 'admin' | 'about';
