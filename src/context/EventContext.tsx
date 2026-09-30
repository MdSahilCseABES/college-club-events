import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ClubEvent, Registration, ViewMode, EventCategory } from '../types';
import { INITIAL_EVENTS, INITIAL_REGISTRATIONS } from '../data/initialData';

interface EventContextType {
  events: ClubEvent[];
  registrations: Registration[];
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedCategory: EventCategory;
  setSelectedCategory: (category: EventCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedEventForRegister: ClubEvent | null;
  setSelectedEventForRegister: (event: ClubEvent | null) => void;
  selectedEventForDetails: ClubEvent | null;
  setSelectedEventForDetails: (event: ClubEvent | null) => void;
  ticketToView: Registration | null;
  setTicketToView: (registration: Registration | null) => void;
  addEvent: (eventData: Omit<ClubEvent, 'id' | 'registeredCount'>) => void;
  updateEvent: (id: string, eventData: Partial<ClubEvent>) => void;
  deleteEvent: (id: string) => void;
  registerStudent: (data: {
    eventId: string;
    studentName: string;
    email: string;
    college: string;
    year: string;
    phone: string;
  }) => { success: boolean; message: string; registration?: Registration };
  cancelRegistration: (ticketId: string) => void;
  resetToDemoData: () => void;
}

const STORAGE_KEYS = {
  EVENTS: 'synapse_college_club_events_v1',
  REGISTRATIONS: 'synapse_college_club_registrations_v1',
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<ClubEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load events from storage', e);
    }
    return INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load registrations from storage', e);
    }
    return INITIAL_REGISTRATIONS;
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventForRegister, setSelectedEventForRegister] = useState<ClubEvent | null>(null);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<ClubEvent | null>(null);
  const [ticketToView, setTicketToView] = useState<Registration | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to save events', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error('Failed to save registrations', e);
    }
  }, [registrations]);

  const addEvent = (eventData: Omit<ClubEvent, 'id' | 'registeredCount'>) => {
    const newEvent: ClubEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      tags: eventData.tags && eventData.tags.length > 0 ? eventData.tags : [eventData.category],
    };

    setEvents((prev) => {
      // If marked featured, remove featured from others
      if (newEvent.isFeatured) {
        return [newEvent, ...prev.map((e) => ({ ...e, isFeatured: false }))];
      }
      return [newEvent, ...prev];
    });
  };

  const updateEvent = (id: string, updatedFields: Partial<ClubEvent>) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          return { ...e, ...updatedFields };
        }
        if (updatedFields.isFeatured && e.id !== id) {
          return { ...e, isFeatured: false };
        }
        return e;
      })
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    // Also remove registrations related to this event
    setRegistrations((prev) => prev.filter((r) => r.eventId !== id));
  };

  const registerStudent = (data: {
    eventId: string;
    studentName: string;
    email: string;
    college: string;
    year: string;
    phone: string;
  }) => {
    const targetEvent = events.find((e) => e.id === data.eventId);
    if (!targetEvent) {
      return { success: false, message: 'Event not found.' };
    }

    if (targetEvent.registeredCount >= targetEvent.capacity) {
      return { success: false, message: 'Sorry, this event has reached maximum capacity.' };
    }

    // Check duplicate email for this specific event
    const normalizedEmail = data.email.trim().toLowerCase();
    const existing = registrations.find(
      (r) => r.eventId === data.eventId && r.email.trim().toLowerCase() === normalizedEmail
    );

    if (existing) {
      return {
        success: false,
        message: `You are already registered for this event with ticket ID ${existing.id}.`,
        registration: existing,
      };
    }

    // Generate readable Ticket ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const ticketId = `SYN-${randomSuffix}`;

    const newRegistration: Registration = {
      id: ticketId,
      eventId: targetEvent.id,
      eventName: targetEvent.title,
      eventDate: targetEvent.date,
      eventVenue: targetEvent.venue,
      studentName: data.studentName.trim(),
      email: normalizedEmail,
      college: data.college.trim(),
      year: data.year,
      phone: data.phone.trim(),
      registeredAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setRegistrations((prev) => [newRegistration, ...prev]);

    // Increment registered count and update status if near capacity
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === data.eventId) {
          const newCount = e.registeredCount + 1;
          const status = newCount >= e.capacity ? 'Closed' : newCount >= e.capacity * 0.8 ? 'Filling Fast' : e.status;
          return { ...e, registeredCount: newCount, status };
        }
        return e;
      })
    );

    return {
      success: true,
      message: 'Registration confirmed successfully!',
      registration: newRegistration,
    };
  };

  const cancelRegistration = (ticketId: string) => {
    const target = registrations.find((r) => r.id === ticketId);
    if (!target) return;

    setRegistrations((prev) => prev.filter((r) => r.id !== ticketId));

    // Decrement event registered count
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === target.eventId && e.registeredCount > 0) {
          const newCount = e.registeredCount - 1;
          const status = newCount < e.capacity ? 'Upcoming' : e.status;
          return { ...e, registeredCount: newCount, status };
        }
        return e;
      })
    );
  };

  const resetToDemoData = () => {
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        registrations,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedEventForRegister,
        setSelectedEventForRegister,
        selectedEventForDetails,
        setSelectedEventForDetails,
        ticketToView,
        setTicketToView,
        addEvent,
        updateEvent,
        deleteEvent,
        registerStudent,
        cancelRegistration,
        resetToDemoData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
