import React, { useState } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function AICopilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I'm your MediSense AI Copilot. I can explain medical terms, analyze your health trends, or help you prepare for a doctor's visit. What would you like to know?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentText = input;
    const userMessage = { role: "user", content: currentText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentText }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: data.reply || "I am ready to help you with your health questions." },
        ]);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Backend chat unavailable, using fallback:", err);
    }

    // Fallback response if backend is offline
    setTimeout(() => {
      setLoading(false);
      let reply = "I'm your MediSense AI Health Copilot. When evaluating health symptoms or biomarkers, tracking progression and consulting a licensed clinician are essential steps.";
      const low = currentText.toLowerCase();
      if (low.includes("hba1c")) {
        reply = "HbA1c (Hemoglobin A1c) measures your average blood sugar levels over the past 3 months. A normal level is below 5.7%, 5.7%-6.4% indicates prediabetes, and 6.5%+ indicates diabetes.";
      } else if (low.includes("score")) {
        reply = "Your health score reflects daily vitals, sleep quality, and active habits. Consistent sleep and hydration help boost your score.";
      } else if (low.includes("cholesterol") || low.includes("ldl")) {
        reply = "LDL is commonly monitored as 'bad' cholesterol because excessive amounts deposit in arteries. Dietary fiber, exercise, and reducing saturated fats are common recommendations.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: reply,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Sparkles className="w-8 h-8 text-primary mr-2" />
          MediSense Copilot
        </h1>
        <p className="text-muted-foreground mt-1">Ask questions about your health data, reports, or general wellness.</p>
      </div>

      <div className="flex-1 flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="flex-1 p-6 overflow-y-auto space-y-6 z-10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start max-w-[80%] space-x-3`}>
                {msg.role === "ai" && (
                  <div className="bg-primary/20 p-2 rounded-full mt-1 flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className={`rounded-2xl p-4 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3 max-w-[80%]">
                <div className="bg-primary/20 p-2 rounded-full mt-1">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-background z-10">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <button className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors" onClick={() => setInput("What does HbA1c mean?")}>
                "What does HbA1c mean?"
              </button>
              <button className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full transition-colors" onClick={() => setInput("Why did my health score change?")}>
                "Why did my health score change?"
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask MediSense anything..."
                className="flex-1 border border-input rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} className="rounded-full h-11 w-11 p-0 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              AI Copilot can make mistakes. Verify important medical information with a doctor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
