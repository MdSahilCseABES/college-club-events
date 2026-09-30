# ⚡ SYNAPSE — College Club Event Management Portal

> A responsive, full-featured web application for exploring, registering, and managing college club events and student attendees. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Highlights & Features

### 1. 🎓 Student & Attendee Experience
- **Interactive Home Page**:
  - **Club Introduction**: Mission, vision, core pillars (Agentic AI, Robotics, Creative Media, Competitive Esports), and live community statistics (2,500+ Active Members, 40+ Annual Events, ₹5.5L+ Grants).
  - **Featured Event Spotlight**: Dedicated hero showcase for the club's flagship event (*HackSynapse 2026: 36h National Hackathon*) with a **live countdown timer** (Days, Hours, Minutes, Seconds), seat occupancy progress bar, and instant registration CTA.
  - **Upcoming Events Preview**: Top curated upcoming events for quick registration.
  - **About Society Section**: Detailed breakdown of club wings, leadership mentors, and answers to common student FAQs.
- **Dynamic Events Catalog (`/events`)**:
  - **Comprehensive Event Cards**: Displays event title, date, timing, venue, description, organizer, and category badge.
  - **Live Seat Availability Indicator**: Real-time progress bar showing registered count vs. capacity (e.g., *284 / 350 seats filled — "🔥 Filling Fast"*).
  - **Real-Time Search**: Search events across title, description, venue, or keywords.
  - **Category Filter Pills**: Filter across *Technical*, *Hackathons*, *Workshops*, *Design & Creative*, *Cultural & Arts*, *Gaming & Esports*, and *Career & Leadership*.
  - **Status & Sorting**: Filter by *Open / Filling Fast* and sort by *Earliest Date*, *Most Popular*, or *Alphabetical*.
  - **Detailed Modal View**: Detailed prerequisites, schedule tracks, prize pools, and venue directions.
- **Event Registration Flow**:
  - **Modal Form**: Capture Student Full Name, Email, College/University (with quick presets), Academic Year (1st through Postgraduate), and Phone Number.
  - **Client-Side Validation**: Real-time input checking for valid email formats and 10-digit mobile numbers.
  - **Duplicate Prevention**: Intelligently prevents double registrations with the same email for an event.
  - **Celebration Confetti**: High-energy confetti blast on successful submission (`canvas-confetti`).
  - **Digital Event Pass / Boarding Ticket**: Generates a digital pass with a unique Ticket ID (e.g. `SYN-84920`), QR code mock, print/save to PDF option, and one-click **"Add to Google Calendar"** integration.

---

### 2. 🛡️ Administrator Dashboard (`/admin`)
- **Key Metric KPI Cards**:
  - Total Events & Upcoming Active Events.
  - Total Registered Students count across all events.
  - Average Fill Rate % and Flagship Event Status.
- **Events Management**:
  - **Add Event**: Form modal to create events with custom titles, categories, dates, times, venues, capacities, descriptions, prizes, and a curated cover image selector.
  - **Edit Event**: Edit any event property with instant reactive synchronization.
  - **Delete Event**: Safe deletion with a double-confirmation modal dialog.
  - **Toggle Featured**: Spotlight any event to the homepage hero card with a single switch.
- **Registered Students Roster**:
  - View full roster: Ticket ID, Student Name, Email, College, Academic Year, Phone, Event Name, and Timestamp.
  - **Search & Filter**: Search attendees by name, email, or ticket ID, and filter registrations by specific event.
  - **Export to CSV**: One-click download of the complete attendee roster as a clean `.csv` spreadsheet.
  - **Digital Ticket Re-Print**: View and print any attendee's entry pass on demand.
  - **Cancel Registration**: Free up seats when an attendee cancels.
- **Analytics & Demographics**:
  - Attendee breakdown by event category.
  - Demographic distribution across academic years (1st, 2nd, 3rd, 4th Year, Postgrad).
- **Demo Reset Button**: One-click restore button to reset all data back to the clean seed state for evaluators.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (Glassmorphic dark UI, accessible typography, fluid responsiveness)
- **Icons**: Lucide React
- **Delight & Animations**: Canvas Confetti
- **State & Storage**: React Context + Reactive LocalStorage persistence (instant synchronization across views and persistent between browser refreshes)

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MdSahilCseABES/college-club-events.git
   cd college-club-events
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled static assets will be located in the `dist/` directory, ready to deploy to any hosting provider.

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the `college-club-events` repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**.

### Deploy to GitHub Pages
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. The project is pre-configured with relative asset paths (`base: './'` in `vite.config.ts`), making it deployable on GitHub Pages or any static CDN.

---

## 📁 Project Directory Structure

```text
college-club-events/
├── index.html                   # HTML template & fonts
├── package.json                 # Dependencies & build scripts
├── vite.config.ts               # Vite configuration with Tailwind plugin & base path
├── tsconfig.json                # TypeScript compiler configuration
├── src/
│   ├── types.ts                 # TypeScript types (ClubEvent, Registration, Category, ViewMode)
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root application component with view routing & modals
│   ├── index.css                # Tailwind CSS v4 stylesheet & custom utilities
│   ├── context/
│   │   └── EventContext.tsx     # Reactive event & registration store with LocalStorage sync
│   ├── data/
│   │   └── initialData.ts       # Realistic college events & registration seed data
│   └── components/
│       ├── Navbar.tsx           # Sticky glassmorphic navbar with view switcher
│       ├── HeroSection.tsx      # Club introduction hero & stats
│       ├── FeaturedEvent.tsx    # Flagship event spotlight with live countdown timer
│       ├── UpcomingEventsPreview.tsx # Upcoming events grid preview
│       ├── ClubAboutSection.tsx # Club mission, wings, leadership, and FAQs
│       ├── EventsPage.tsx       # Search, filter, sort & all event cards
│       ├── EventCard.tsx        # Event card with meta details & registration CTA
│       ├── EventDetailsModal.tsx# Comprehensive event details modal
│       ├── RegistrationModal.tsx# Student registration form with validation
│       ├── TicketModal.tsx      # Verified digital boarding ticket with QR & Google Cal
│       ├── AdminDashboard.tsx   # Full admin console: events, attendees, CSV export, analytics
│       ├── AdminEventModal.tsx  # Add / Edit event modal with cover presets
│       ├── ConfirmModal.tsx     # Reusable confirmation dialog
│       └── Footer.tsx           # Footer with social links, campus secretariat, and credits
```

---

## 👤 Author

- **Md Sahil**
- College: ABES Engineering College
- Email: md.25b01010870@abes.ac.in
- GitHub: [@MdSahilCseABES](https://github.com/MdSahilCseABES)
