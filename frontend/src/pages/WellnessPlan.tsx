import React, { useState } from "react";
import { 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Moon, 
  Utensils, 
  Footprints, 
  Droplets, 
  Plus, 
  Flame, 
  Clock, 
  RefreshCw, 
  Download,
  CalendarCheck
} from "lucide-react";
import { Button } from "../components/ui/Button";

interface Habit {
  id: string;
  category: "movement" | "nutrition" | "sleep" | "mind";
  title: string;
  description: string;
  time: string;
  completed: boolean;
}

const INITIAL_HABITS: Habit[] = [
  { id: "h1", category: "movement", title: "Morning 25-Min Zone 2 Brisk Walk", description: "Supports endothelial nitric oxide release & lowers blood pressure.", time: "07:30 AM", completed: true },
  { id: "h2", category: "nutrition", title: "Metformin with Balanced Breakfast", description: "Pair complex carbs + protein (eggs/oats) to minimize gastrointestinal discomfort.", time: "08:30 AM", completed: true },
  { id: "h3", category: "nutrition", title: "Electrolyte Hydration (Target 2.5L)", description: "Maintain blood viscosity and reduce resting heart rate elevation.", time: "Throughout Day", completed: true },
  { id: "h4", category: "movement", title: "10-Min Post-Lunch Glucose Walk", description: "Blunts postprandial blood glucose spikes by up to 30%.", time: "02:00 PM", completed: false },
  { id: "h5", category: "sleep", title: "Digital Screen Curfew & Dim Lighting", description: "Cease blue-light exposure 45 mins prior to bedtime to boost melatonin production.", time: "10:00 PM", completed: false },
  { id: "h6", category: "sleep", title: "8-Hour Circadian Sleep Target", description: "Bedtime at 10:30 PM to recover sleep deficit accumulated over the week.", time: "10:30 PM", completed: false },
];

export default function WellnessPlan() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [waterMl, setWaterMl] = useState(1500);
  const [activePillar, setActivePillar] = useState<"all" | "movement" | "nutrition" | "sleep">("all");
  const [regenerating, setRegenerating] = useState(false);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const adherencePercent = Math.round((completedCount / habits.length) * 100);

  const addWater = (amount: number) => {
    setWaterMl(prev => Math.min(prev + amount, 3500));
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
    }, 900);
  };

  const filteredHabits = activePillar === "all" ? habits : habits.filter(h => h.category === activePillar);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Activity className="w-8 h-8 mr-3 text-primary" />
            Personalized Wellness & Lifestyle Plan
          </h1>
          <p className="text-muted-foreground mt-1">
            Clinical AI-synthesized schedule tailored to your vitals, sleep deficit, and medication regimen.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={regenerating}>
            <RefreshCw className={`w-4 h-4 mr-2 ${regenerating ? "animate-spin" : ""}`} />
            {regenerating ? "Synthesizing..." : "AI Re-sync"}
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" /> Export Plan
          </Button>
        </div>
      </div>

      {/* AI Personalized Directive Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-transparent border border-primary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/20 text-primary rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground text-base">MediSense Clinical Synthesis</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                Adapted for Ananya
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Based on your recent LDL elevation (115 mg/dL) and 4-day sleep duration dip (&lt;6 hours), this plan prioritizes <strong>aerobic vascular conditioning</strong>, <strong>high-soluble-fiber nutrition</strong> to bound excess bile acids, and <strong>parasympathetic down-regulation</strong> for deep restorative REM cycles.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards: Adherence, Hydration, Sleep Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Adherence Card */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today's Adherence</span>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">{adherencePercent}%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              {completedCount} of {habits.length} habits done
            </p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-muted flex items-center justify-center relative">
            <span className="text-sm font-bold text-primary">{adherencePercent}%</span>
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Daily Hydration</span>
              <div className="mt-2 text-2xl font-bold">{(waterMl / 1000).toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/ 2.5 L</span></div>
            </div>
            <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, Math.round((waterMl / 2500) * 100))}%` }}
            />
          </div>
          <div className="mt-3 flex space-x-2">
            <button 
              onClick={() => addWater(250)}
              className="text-xs px-2.5 py-1 bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-medium rounded-md hover:bg-cyan-500/25 transition-colors"
            >
              +250 ml
            </button>
            <button 
              onClick={() => addWater(500)}
              className="text-xs px-2.5 py-1 bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-medium rounded-md hover:bg-cyan-500/25 transition-colors"
            >
              +500 ml
            </button>
          </div>
        </div>

        {/* Sleep Optimization */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sleep Target</span>
            <div className="mt-2 text-2xl font-bold">8h 00m</div>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center">
              <Moon className="w-3.5 h-3.5 mr-1" /> Target Bedtime: 10:30 PM
            </p>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Pillar Tabs & Habit Checklist */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <CalendarCheck className="w-5 h-5 mr-2 text-primary" /> Daily Action Checklist
            </h2>
            <p className="text-xs text-muted-foreground">Click habits to toggle completion state</p>
          </div>
          <div className="flex space-x-1 bg-muted/40 p-1 rounded-lg border">
            {(["all", "movement", "nutrition", "sleep"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActivePillar(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                  activePillar === tab 
                    ? "bg-card text-foreground shadow-sm font-bold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredHabits.map(habit => {
            const Icon = 
              habit.category === "movement" ? Footprints :
              habit.category === "nutrition" ? Utensils :
              habit.category === "sleep" ? Moon : Activity;

            const categoryColor =
              habit.category === "movement" ? "text-emerald-500 bg-emerald-500/10" :
              habit.category === "nutrition" ? "text-amber-500 bg-amber-500/10" :
              "text-indigo-500 bg-indigo-500/10";

            return (
              <div 
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`py-4 px-3 flex items-start justify-between cursor-pointer rounded-xl transition-colors hover:bg-muted/30 ${
                  habit.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <button className="mt-1 flex-shrink-0 text-primary">
                    {habit.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-sm font-semibold ${habit.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {habit.title}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${categoryColor}`}>
                        {habit.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                      {habit.description}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 pl-2">
                  <span className="text-xs text-muted-foreground font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {habit.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Regimen Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Movement Pillar */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <Footprints className="w-4 h-4" />
            <span>Cardiovascular & Strength</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Targeting 150 minutes of moderate-intensity zone 2 training weekly to reduce arterial stiffness and elevate HDL cholesterol.
          </p>
          <ul className="text-xs space-y-1.5 text-foreground/85">
            <li className="flex items-center">• <strong>Mon/Wed/Fri:</strong> 30-min brisk outdoor walk</li>
            <li className="flex items-center">• <strong>Tue/Thu:</strong> Low-impact core & resistance bands</li>
            <li className="flex items-center">• <strong>Weekend:</strong> 45-min gentle nature hike or cycling</li>
          </ul>
        </div>

        {/* Nutrition Pillar */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
            <Utensils className="w-4 h-4" />
            <span>Cardioprotective Nutrition</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Focused on soluble fiber (beta-glucans), monounsaturated fatty acids (olive oil), and low glycemic index meals.
          </p>
          <ul className="text-xs space-y-1.5 text-foreground/85">
            <li className="flex items-center">• Steel-cut oats with chia seeds for breakfast</li>
            <li className="flex items-center">• Leafy greens, chickpeas, and walnuts for lunch</li>
            <li className="flex items-center">• Grilled salmon or lentils with steamed broccoli</li>
          </ul>
        </div>

        {/* Sleep Pillar */}
        <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Moon className="w-4 h-4" />
            <span>Circadian Sleep Architecture</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Stabilizing cortisol rhythms to improve insulin sensitivity and support cognitive rejuvenation.
          </p>
          <ul className="text-xs space-y-1.5 text-foreground/85">
            <li className="flex items-center">• Consistent wake time: 06:30 AM daily</li>
            <li className="flex items-center">• 10 mins direct sunlight within 1 hr of waking</li>
            <li className="flex items-center">• 19°C bedroom temperature & blackout curtains</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
