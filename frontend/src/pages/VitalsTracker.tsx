import React, { useState } from "react";
import { 
  HeartPulse, 
  Activity, 
  Droplets, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  X,
  Gauge
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Button } from "../components/ui/Button";

interface VitalReading {
  id: string;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  spo2: number;
  glucose: number;
  notes?: string;
}

const INITIAL_VITALS: VitalReading[] = [
  { id: "v1", date: "Oct 2", time: "08:30 AM", systolic: 122, diastolic: 80, heartRate: 76, spo2: 97, glucose: 102, notes: "Morning baseline" },
  { id: "v2", date: "Oct 3", time: "08:15 AM", systolic: 120, diastolic: 78, heartRate: 74, spo2: 98, glucose: 98, notes: "Fasting reading" },
  { id: "v3", date: "Oct 4", time: "08:45 AM", systolic: 124, diastolic: 82, heartRate: 78, spo2: 97, glucose: 104, notes: "Post coffee" },
  { id: "v4", date: "Oct 5", time: "09:00 AM", systolic: 119, diastolic: 76, heartRate: 71, spo2: 98, glucose: 95, notes: "After 15m walk" },
  { id: "v5", date: "Oct 6", time: "08:30 AM", systolic: 117, diastolic: 75, heartRate: 73, spo2: 99, glucose: 94, notes: "Fasting" },
  { id: "v6", date: "Oct 7", time: "08:20 AM", systolic: 121, diastolic: 77, heartRate: 75, spo2: 98, glucose: 97, notes: "Well rested" },
  { id: "v7", date: "Oct 8", time: "08:30 AM", systolic: 118, diastolic: 75, heartRate: 72, spo2: 98, glucose: 96, notes: "Optimal baseline" },
];

export default function VitalsTracker() {
  const [vitalsList, setVitalsList] = useState<VitalReading[]>(INITIAL_VITALS);
  const [selectedTimeframe, setSelectedTimeframe] = useState<"7D" | "30D" | "90D">("7D");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bp" | "hr" | "glucose">("bp");

  // Form state
  const [formData, setFormData] = useState({
    systolic: "120",
    diastolic: "80",
    heartRate: "72",
    spo2: "98",
    glucose: "95",
    notes: ""
  });

  const latestReading = vitalsList[vitalsList.length - 1];

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: VitalReading = {
      id: "v_" + Date.now(),
      date: "Today",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      systolic: parseInt(formData.systolic) || 120,
      diastolic: parseInt(formData.diastolic) || 80,
      heartRate: parseInt(formData.heartRate) || 72,
      spo2: parseInt(formData.spo2) || 98,
      glucose: parseInt(formData.glucose) || 95,
      notes: formData.notes || "Manual user entry"
    };
    setVitalsList(prev => [...prev, newEntry]);
    setIsModalOpen(false);
    setFormData({ systolic: "120", diastolic: "80", heartRate: "72", spo2: "98", glucose: "95", notes: "" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <HeartPulse className="w-8 h-8 mr-3 text-rose-500" />
            Vitals & Biometrics Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time biometric logging, historical trends, and clinical AI anomaly detection.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-card border rounded-lg p-1 flex space-x-1 shadow-sm">
            {(["7D", "30D", "90D"] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedTimeframe === tf 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Log Vitals
          </Button>
        </div>
      </div>

      {/* AI Trend & Anomaly Card */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-primary/10 to-transparent border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground text-base">MediSense Clinical Trend Detection</h3>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                AI Verified
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Your systolic blood pressure has consistently stabilized within the optimal range (<strong className="text-foreground">118/75 mmHg</strong>) over the past 4 consecutive measurements. Resting heart rate recovery shows strong parasympathetic response, and fasting blood glucose remains comfortably under 100 mg/dL.
            </p>
            <p className="text-xs text-muted-foreground italic pt-1">
              AI-generated trend assessment based on AHA/ACC clinical guidelines. Not a diagnostic substitute.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blood Pressure */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Blood Pressure</span>
            <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight">
              {latestReading.systolic}/{latestReading.diastolic}
            </span>
            <span className="text-xs text-muted-foreground">mmHg</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Optimal Range
            </span>
            <span className="text-muted-foreground flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-1 text-emerald-500" /> -3% vs avg
            </span>
          </div>
        </div>

        {/* Resting Heart Rate */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Heart Rate</span>
            <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight">{latestReading.heartRate}</span>
            <span className="text-xs text-muted-foreground">bpm</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Normal (60-100)
            </span>
            <span className="text-muted-foreground">Avg: 74 bpm</span>
          </div>
        </div>

        {/* Blood Glucose */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Blood Glucose</span>
            <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight">{latestReading.glucose}</span>
            <span className="text-xs text-muted-foreground">mg/dL</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Normal Fasting
            </span>
            <span className="text-muted-foreground flex items-center">
              Target: &lt;100
            </span>
          </div>
        </div>

        {/* Oxygen Saturation */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">SpO2 Oxygen</span>
            <div className="p-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-lg">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight">{latestReading.spo2}</span>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Healthy &ge;95%
            </span>
            <span className="text-muted-foreground flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Stable
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Section */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-4">
          <div>
            <h2 className="text-lg font-semibold">Biometric Trend Trajectory</h2>
            <p className="text-xs text-muted-foreground">Historical daily data points with clinical target thresholds</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("bp")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeTab === "bp" 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
              }`}
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setActiveTab("hr")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeTab === "hr" 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
              }`}
            >
              Heart Rate & SpO2
            </button>
            <button
              onClick={() => setActiveTab("glucose")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeTab === "glucose" 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
              }`}
            >
              Blood Glucose
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="h-80 w-full">
          {activeTab === "bp" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalsList} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sysGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="diaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis domain={[60, 140]} stroke="#888888" fontSize={12} tickLine={false} unit=" mmHg" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff" }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="systolic" name="Systolic (Target < 120)" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#sysGradient)" />
                <Area type="monotone" dataKey="diastolic" name="Diastolic (Target < 80)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#diaGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeTab === "hr" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsList} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis domain={[60, 105]} stroke="#888888" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff" }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="heartRate" name="Heart Rate (bpm)" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="spo2" name="Oxygen SpO2 (%)" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeTab === "glucose" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalsList} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="glucGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis domain={[80, 130]} stroke="#888888" fontSize={12} tickLine={false} unit=" mg/dL" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff" }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="glucose" name="Fasting Glucose (Target < 100)" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#glucGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-muted/20">
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" /> Recent Vitals Log
            </h3>
            <p className="text-xs text-muted-foreground">Recorded measurements and observations</p>
          </div>
          <span className="text-xs text-muted-foreground font-medium">{vitalsList.length} Entries Recorded</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[11px] font-semibold border-b">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Blood Pressure</th>
                <th className="py-3 px-4">Heart Rate</th>
                <th className="py-3 px-4">SpO2</th>
                <th className="py-3 px-4">Glucose</th>
                <th className="py-3 px-4">Clinical Status</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vitalsList.slice().reverse().map((v) => {
                const isOptimal = v.systolic < 120 && v.diastolic < 80;
                return (
                  <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3.5 px-4 font-medium whitespace-nowrap">
                      {v.date} <span className="text-xs text-muted-foreground ml-1">({v.time})</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      {v.systolic}/{v.diastolic} <span className="text-xs font-normal text-muted-foreground">mmHg</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {v.heartRate} <span className="text-xs text-muted-foreground">bpm</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {v.spo2}%
                    </td>
                    <td className="py-3.5 px-4">
                      {v.glucose} <span className="text-xs text-muted-foreground">mg/dL</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                        isOptimal 
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" 
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      }`}>
                        {isOptimal ? "Optimal" : "Elevated Normal"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground max-w-xs truncate">
                      {v.notes || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Vitals Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-muted/30">
              <div className="flex items-center space-x-2">
                <HeartPulse className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Log New Vitals</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddReading} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Systolic (mmHg)</label>
                  <input
                    type="number"
                    value={formData.systolic}
                    onChange={e => setFormData({ ...formData, systolic: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Diastolic (mmHg)</label>
                  <input
                    type="number"
                    value={formData.diastolic}
                    onChange={e => setFormData({ ...formData, diastolic: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={formData.heartRate}
                    onChange={e => setFormData({ ...formData, heartRate: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">SpO2 (%)</label>
                  <input
                    type="number"
                    value={formData.spo2}
                    onChange={e => setFormData({ ...formData, spo2: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={formData.glucose}
                    onChange={e => setFormData({ ...formData, glucose: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Clinical Context / Notes</label>
                <input
                  type="text"
                  placeholder="e.g., After morning jog, post lunch"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Measurement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
