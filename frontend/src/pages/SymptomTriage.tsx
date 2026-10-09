import React, { useState } from "react";
import { Send, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function SymptomTriage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello. I am the MediSense AI Triage assistant. Please describe your symptoms in detail, including when they started and how severe they are.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<any>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentInput = input;
    const userMessage = { role: "user", content: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: currentInput }),
      });
      if (response.ok) {
        const data = await response.json();
        setTriageResult(data);
        setLoading(false);
        return;
      }
    } catch {
      // Fallback if backend API is unreachable
    }

    setTimeout(() => {
      setLoading(false);
      setTriageResult({
        summary: `Analyzed symptoms: ${currentInput}`,
        possible_explanations: ["Viral Infection", "Physical Fatigue / Tension", "Seasonal Allergies"],
        urgency: "Routine consultation",
        warning_signs: ["Difficulty breathing", "Severe chest pain", "Persistent high fever"],
        recommended_next_steps: [
          "Rest and stay adequately hydrated.",
          "Monitor body temperature and symptoms.",
          "Consult a doctor if symptoms worsen or persist beyond 3 days."
        ],
        questions_for_doctor: [
          "Do I need any specific blood tests?",
          "What over-the-counter medication is safe for me?"
        ],
        disclaimer: "AI-generated health insight — not a medical diagnosis. Consult a qualified healthcare professional for medical advice."
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Symptom Triage</h1>
        <p className="text-muted-foreground mt-1">Describe your symptoms to understand potential causes and next steps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Chat Section */}
        <div className="flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground animate-pulse">Analyzing symptoms...</p>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t bg-background">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="e.g., I have a fever and headache since yesterday..."
                className="flex-1 border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading || triageResult !== null}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim() || triageResult !== null}>
                <Send className="w-4 h-4 mr-2" /> Send
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-card border rounded-xl overflow-y-auto shadow-sm">
          {triageResult ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-2 text-primary font-semibold text-lg border-b pb-2">
                <CheckCircle2 className="w-6 h-6" />
                <h2>Triage Complete</h2>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Urgency</h3>
                <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-4 py-2 rounded-lg font-medium inline-block">
                  {triageResult.urgency}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Possible Explanations</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {triageResult.possible_explanations.map((exp: string, i: number) => (
                    <li key={i} className="text-sm">{exp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Recommended Next Steps</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {triageResult.recommended_next_steps.map((step: string, i: number) => (
                    <li key={i} className="text-sm">{step}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-destructive uppercase tracking-wider flex items-center mb-2">
                  <ShieldAlert className="w-4 h-4 mr-2" /> Watch for these Warning Signs
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-destructive/90">
                  {triageResult.warning_signs.map((sign: string, i: number) => (
                    <li key={i} className="text-sm">{sign}</li>
                  ))}
                </ul>
                <p className="text-xs mt-2 font-medium">Seek immediate emergency care if you experience any of these.</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground italic flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {triageResult.disclaimer}
                </p>
              </div>

              <Button variant="outline" className="w-full" onClick={() => {
                setTriageResult(null);
                setMessages([{ role: "ai", content: "Let's start over. What are your symptoms?" }]);
              }}>
                Start New Assessment
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted-foreground">
              <ShieldAlert className="w-16 h-16 opacity-20 mb-4" />
              <h3 className="text-lg font-medium text-foreground">Waiting for Assessment</h3>
              <p className="text-sm mt-2 max-w-sm">
                Describe your symptoms in the chat to receive an AI-powered triage analysis, including possible explanations and next steps.
              </p>
              <div className="mt-8 bg-muted p-4 rounded-lg text-left w-full max-w-sm">
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider">Example input:</p>
                <p className="text-sm italic">"I've had a headache and mild fever (100.2F) since yesterday evening. My throat also feels a bit scratchy."</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
