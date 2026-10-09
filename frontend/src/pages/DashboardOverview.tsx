import React from "react";
import { 
  HeartPulse, 
  Activity, 
  Moon, 
  Droplets,
  AlertCircle
} from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, Ananya \ud83d\udc4b</h1>
          <p className="text-muted-foreground mt-1">Here's your health summary for today.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Health Score: 85/100
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <HeartPulse className="w-24 h-24" />
        </div>
        <div className="relative z-10 flex items-start space-x-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              MediSense AI Insight
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">New</span>
            </h3>
            <p className="text-foreground/80 mt-1 max-w-3xl">
              Your sleep duration has decreased for 4 consecutive days. Consider maintaining a consistent sleep schedule and reducing screen exposure before bedtime.
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              AI-generated health insight \u2014 not a medical diagnosis. Consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </div>

      {/* Vitals Grid */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Today's Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
              <h3 className="text-2xl font-bold mt-1">72 <span className="text-sm font-normal text-muted-foreground">bpm</span></h3>
            </div>
            <div className="bg-rose-100 text-rose-600 p-2 rounded-lg dark:bg-rose-900/30 dark:text-rose-400">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span>Normal range</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Blood Pressure</p>
              <h3 className="text-2xl font-bold mt-1">118/75 <span className="text-sm font-normal text-muted-foreground">mmHg</span></h3>
            </div>
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span>Optimal</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sleep</p>
              <h3 className="text-2xl font-bold mt-1">5h 45m</h3>
            </div>
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-400">
              <Moon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600">
            <span>Below target (8h)</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hydration</p>
              <h3 className="text-2xl font-bold mt-1">1.2 <span className="text-sm font-normal text-muted-foreground">L</span></h3>
            </div>
            <div className="bg-cyan-100 text-cyan-600 p-2 rounded-lg dark:bg-cyan-900/30 dark:text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600">
            <span>40% of daily goal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Risk Trends</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Cardiometabolic Risk</span>
                <span className="text-green-600">Low</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Sleep Health Risk</span>
                <span className="text-amber-600">Elevated</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Risk indicators are based on lifestyle tracking and are not medical diagnoses.
          </p>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Upcoming Schedule</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="bg-primary/20 text-primary p-2 rounded-md">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Evening Walk Goal</p>
                <p className="text-xs text-muted-foreground">Today, 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="bg-primary/20 text-primary p-2 rounded-md">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Review Sleep Habits</p>
                <p className="text-xs text-muted-foreground">Recommended by AI Copilot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
