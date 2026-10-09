import React, { useState } from "react";
import { Pill, Plus, Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function MedicationsHub() {
  const [medications] = useState([
    { id: 1, name: "Metformin", dosage: "500mg", frequency: "Twice daily", nextDose: "8:00 PM", status: "pending", type: "Prescription" },
    { id: 2, name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", nextDose: "Taken at 8:00 AM", status: "taken", type: "Supplement" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", nextDose: "9:00 PM", status: "pending", type: "Prescription" },
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medication Hub</h1>
          <p className="text-muted-foreground mt-1">Track your medications and supplements safely.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Medication
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
              <h2 className="font-semibold text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> Today's Schedule
              </h2>
              <span className="text-sm text-muted-foreground">Oct 8, 2026</span>
            </div>
            <div className="divide-y">
              {medications.map((med) => (
                <div key={med.id} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${med.status === 'taken' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-primary/10 text-primary'}`}>
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{med.name} <span className="text-sm font-normal text-muted-foreground ml-1">{med.dosage}</span></h3>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {med.nextDose}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{med.frequency}</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{med.type}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {med.status === 'taken' ? (
                      <div className="flex items-center text-green-600 font-medium">
                        <CheckCircle2 className="w-5 h-5 mr-1" /> Taken
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                          <XCircle className="w-4 h-4 mr-1" /> Skip
                        </Button>
                        <Button size="sm">
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Take
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Adherence</h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary stroke-current"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">85%</span>
                  <span className="text-xs text-muted-foreground">This week</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center mb-2">
              <AlertCircle className="w-5 h-5 mr-2" /> AI Medication Insight
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              You are currently taking Metformin. Remember to take it with meals to reduce stomach upset.
            </p>
            <p className="text-xs text-blue-600/70 dark:text-blue-500 mt-3 italic">
              AI-generated health insight \u2014 not a medical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
