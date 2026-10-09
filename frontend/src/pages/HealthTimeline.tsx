import React, { useState } from "react";
import { 
  Calendar, 
  FileText, 
  Pill, 
  User, 
  HeartPulse, 
  Filter, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: "reports" | "medications" | "visits" | "vitals";
  doctor?: string;
  summary: string;
  tags: string[];
  link?: string;
  badge?: {
    text: string;
    variant: "normal" | "warning" | "success" | "info";
  };
}

const INITIAL_EVENTS: TimelineEvent[] = [
  {
    id: "e1",
    date: "Oct 1, 2026",
    title: "Comprehensive Metabolic & Lipid Profile",
    category: "reports",
    doctor: "Dr. Lal PathLabs",
    summary: "CBC within normal limits. LDL cholesterol slightly elevated at 115 mg/dL. Fasting glucose at 96 mg/dL.",
    tags: ["Blood Test", "Lipid Panel", "HbA1c"],
    link: "/dashboard/reports",
    badge: { text: "LDL Review Needed", variant: "warning" }
  },
  {
    id: "e2",
    date: "Sep 24, 2026",
    title: "Cardiometabolic Consultation",
    category: "visits",
    doctor: "Dr. Rajesh Mehta, MD (Cardiology)",
    summary: "Routine 6-month checkup. Blood pressure optimal at 118/75 mmHg. Recommended dietary fiber increase and daily 25-min walks.",
    tags: ["Outpatient", "Cardiology"],
    link: "/dashboard/doctor-summary",
    badge: { text: "Follow-up in 3 Mo", variant: "info" }
  },
  {
    id: "e3",
    date: "Sep 15, 2026",
    title: "Medication Regimen Updated",
    category: "medications",
    summary: "Initiated Metformin 500mg with breakfast and Vitamin D3 1000 IU daily following annual lab review.",
    tags: ["Prescription", "Metformin", "Supplements"],
    link: "/dashboard/medications",
    badge: { text: "Active Regimen", variant: "success" }
  },
  {
    id: "e4",
    date: "Aug 20, 2026",
    title: "Biometric Baseline Stabilization",
    category: "vitals",
    summary: "Continuous 14-day wearable sync confirmed average resting heart rate stabilized at 72 bpm with 98% SpO2.",
    tags: ["Vitals", "Heart Rate", "SpO2"],
    link: "/dashboard/vitals",
    badge: { text: "Optimal Baseline", variant: "normal" }
  },
  {
    id: "e5",
    date: "Jul 10, 2026",
    title: "MediSense AI Health Onboarding",
    category: "visits",
    summary: "Comprehensive personal health profile initialized with personal history, family risk factors, and biometric sync.",
    tags: ["Profile Setup", "Baseline"],
    badge: { text: "Profile Active", variant: "normal" }
  }
];

export default function HealthTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>(INITIAL_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "visits" as const,
    doctor: "",
    summary: "",
    tags: ""
  });

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const item: TimelineEvent = {
      id: "ev_" + Date.now(),
      date: "Today",
      title: newEvent.title,
      category: newEvent.category,
      doctor: newEvent.doctor || undefined,
      summary: newEvent.summary,
      tags: newEvent.tags ? newEvent.tags.split(",").map(t => t.trim()) : ["User Note"],
      badge: { text: "New", variant: "info" }
    };
    setEvents([item, ...events]);
    setIsModalOpen(false);
    setNewEvent({ title: "", category: "visits", doctor: "", summary: "", tags: "" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-primary" />
            Health & Medical Timeline
          </h1>
          <p className="text-muted-foreground mt-1">
            Chronological continuum of clinical consultations, uploaded reports, and biometric milestones.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Milestone
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-card border rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filter Events:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Milestones" },
            { id: "reports", label: "Lab Reports" },
            { id: "visits", label: "Doctor Consultations" },
            { id: "medications", label: "Medications" },
            { id: "vitals", label: "Biometrics" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline Section */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/20 space-y-8 my-6">
        {filteredEvents.map((ev) => {
          const CategoryIcon = 
            ev.category === "reports" ? FileText :
            ev.category === "medications" ? Pill :
            ev.category === "visits" ? User : HeartPulse;

          const iconColor =
            ev.category === "reports" ? "bg-blue-500 text-white" :
            ev.category === "medications" ? "bg-emerald-500 text-white" :
            ev.category === "visits" ? "bg-purple-500 text-white" :
            "bg-rose-500 text-white";

          return (
            <div key={ev.id} className="relative group">
              {/* Dot Icon on Timeline line */}
              <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md ring-4 ring-background ${iconColor}`}>
                <CategoryIcon className="w-4 h-4" />
              </div>

              {/* Event Card */}
              <div className="bg-card border rounded-2xl p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-primary">{ev.date}</span>
                      {ev.badge && (
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          ev.badge.variant === "warning" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                          ev.badge.variant === "success" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                          ev.badge.variant === "info" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {ev.badge.text}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mt-1">{ev.title}</h3>
                    {ev.doctor && (
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{ev.doctor}</p>
                    )}
                  </div>
                  {ev.link && (
                    <Link
                      to={ev.link}
                      className="inline-flex items-center text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
                    >
                      View Details <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  )}
                </div>

                <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
                  {ev.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ev.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] bg-muted/60 text-muted-foreground px-2.5 py-0.5 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Milestone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-muted/30">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Add Health Milestone</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddEvent} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Milestone Title</label>
                <input
                  type="text"
                  placeholder="e.g. Ophthalmology Checkup, Dental Cleaning"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={e => setNewEvent({ ...newEvent, category: e.target.value as any })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="visits">Doctor Visit</option>
                    <option value="reports">Lab Report</option>
                    <option value="medications">Medication</option>
                    <option value="vitals">Biometrics</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Physician / Clinic</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Sharma"
                    value={newEvent.doctor}
                    onChange={e => setNewEvent({ ...newEvent, doctor: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Clinical Summary & Observations</label>
                <textarea
                  rows={3}
                  placeholder="Notes, findings, prescriptions..."
                  value={newEvent.summary}
                  onChange={e => setNewEvent({ ...newEvent, summary: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Vision, Routine, Prescription"
                  value={newEvent.tags}
                  onChange={e => setNewEvent({ ...newEvent, tags: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Milestone
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
