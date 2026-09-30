import React from 'react';
import { EventProvider, useEvents } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedEvent } from './components/FeaturedEvent';
import { UpcomingEventsPreview } from './components/UpcomingEventsPreview';
import { ClubAboutSection } from './components/ClubAboutSection';
import { EventsPage } from './components/EventsPage';
import { AdminDashboard } from './components/AdminDashboard';
import { RegistrationModal } from './components/RegistrationModal';
import { TicketModal } from './components/TicketModal';
import { EventDetailsModal } from './components/EventDetailsModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView } = useEvents();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <FeaturedEvent />
            <UpcomingEventsPreview />
            <ClubAboutSection />
          </>
        )}

        {currentView === 'events' && <EventsPage />}

        {currentView === 'about' && (
          <div className="py-6">
            <ClubAboutSection />
          </div>
        )}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Interactive Modals */}
      <RegistrationModal />
      <TicketModal />
      <EventDetailsModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <EventProvider>
      <MainContent />
    </EventProvider>
  );
}

export default App;
