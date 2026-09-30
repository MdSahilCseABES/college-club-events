import React from 'react';
import { useEvents } from '../context/EventContext';
import { 
  Terminal, 
  Cpu, 
  Palette, 
  Gamepad2, 
  Users2, 
  Award, 
  CheckCircle2, 
  Compass, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ClubAboutSection: React.FC = () => {
  const { setCurrentView } = useEvents();

  const wings = [
    {
      icon: Terminal,
      name: 'Software & Agentic AI Wing',
      lead: 'DevOps, Web3 & LLM Systems',
      description: 'Building production-grade web applications, autonomous agentic frameworks, and microservices.',
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      icon: Cpu,
      name: 'Hardware & Combat Robotics',
      lead: 'Embedded Systems & IoT',
      description: 'Designing custom PCBs, 3D-printed chassis, pneumatics, and autonomous battle bots.',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      icon: Palette,
      name: 'Design & Creative Media',
      lead: 'Product Design & Motion',
      description: 'Crafting pixel-perfect design systems, interactive prototypes, 3D renders, and brand aesthetics.',
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30'
    },
    {
      icon: Gamepad2,
      name: 'Competitive Esports & Media',
      lead: 'LAN Leagues & Broadcasting',
      description: 'Organizing inter-college tactical tournaments, professional live streaming, and esports bootcamps.',
      color: 'from-red-500/20 to-purple-500/20 text-red-400 border-red-500/30'
    }
  ];

  const faqs = [
    {
      q: 'Who can register for Synapse events?',
      a: 'All undergraduate and postgraduate students from any recognized college or university are welcome! Entry is completely free unless explicitly noted.'
    },
    {
      q: 'Do I get a certificate after attending?',
      a: 'Yes, every verified attendee receives an official, verifiable digital certificate of participation from Synapse Club signed by faculty mentors.'
    },
    {
      q: 'How does team registration work for Hackathons?',
      a: 'Each team member registers individually with their details. You will be prompted for your Team Name during the hackathon check-in or discord onboarding.'
    },
    {
      q: 'Where do events take place?',
      a: 'Most events occur on campus at the Innovation Hub, Central Auditorium, or designated Computer Science labs. Virtual events take place via Discord & YouTube.'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Intro Mission */}
      <section className="relative rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Compass className="w-3.5 h-3.5" />
            Our Mission & DNA
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cultivating the Next Generation of Tech Leaders & Creators
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Founded in 2021 by a cohort of passionate student engineers, <strong className="text-white">SYNAPSE</strong> has grown into the university’s largest technical and creative community. We bridge the gap between classroom theory and industry-grade engineering through real hackathons, hands-on workshops, and collaborative open-source sprints.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Workshops
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Industry Mentorship
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hardware Lab Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Recruitment Access
            </span>
          </div>
        </div>
      </section>

      {/* 4 Specialized Divisions */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Specialized Club Wings & Divisions
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Choose your track or cross-collaborate across multiple creative disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wings.map((wing, idx) => {
            const Icon = wing.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wing.color} flex items-center justify-center border shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{wing.name}</h4>
                  <p className="text-xs font-semibold text-indigo-400">{wing.lead}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{wing.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Got questions about joining or participating? We've got answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
              <h5 className="text-sm font-bold text-white flex items-start gap-2">
                <span className="text-indigo-400 font-extrabold">Q.</span>
                <span>{faq.q}</span>
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-slate-900 border border-indigo-500/30 p-8 text-center space-y-4">
        <Sparkles className="w-8 h-8 text-purple-400 mx-auto" />
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to attend your next big event?
        </h3>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Explore upcoming workshops, hackathons, and tournaments. Registration takes under 30 seconds!
        </p>
        <button
          onClick={() => {
            setCurrentView('events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <span>Browse Events Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
