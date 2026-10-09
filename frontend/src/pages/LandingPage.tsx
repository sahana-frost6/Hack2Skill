import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Activity, ShieldCheck, Brain, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 lg:px-14 h-20 flex items-center justify-between border-b bg-card/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="flex items-center space-x-2">
          <HeartPulse className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-primary tracking-tight">MediSense AI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</a>
          <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/login?mode=signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-14 py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 flex flex-col items-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Your Intelligent Health Companion
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Understand your health.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Act earlier. Live better.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              From symptom triage and medical report analysis to preventive insights and personalized wellness — MediSense AI brings the power of advanced healthcare AI directly to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto group">
                  Start Your Health Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto">
                Explore AI Features
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 lg:px-14 py-24 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">Powerful AI Healthcare Features</h2>
              <p className="text-muted-foreground text-lg">Designed to keep you informed, prepared, and in control of your well-being.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI Symptom Triage", icon: Activity, desc: "Describe your symptoms naturally. Get immediate insights on potential causes and urgency levels before you see a doctor." },
                { title: "Smart Report Analyzer", icon: FileText, desc: "Upload blood tests or prescriptions. We'll extract the data, explain complex terms, and detect trends over time." },
                { title: "Doctor Visit Assistant", icon: HeartPulse, desc: "Automatically generate a concise, professional summary of your health timeline and current concerns for your doctor." },
              ].map((feat, i) => (
                <div key={i} className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <feat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section id="privacy" className="px-6 lg:px-14 py-24 border-t">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center">
                <ShieldCheck className="w-10 h-10 text-green-500 mr-3" />
                Responsible AI & Privacy First
              </h2>
              <p className="text-lg text-muted-foreground">
                Your health data is highly sensitive. We employ end-to-end encryption and robust access controls. Our AI is designed as a copilot—never a replacement for your doctor—and is strictly bound by medical safety guardrails.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-foreground font-medium"><CheckCircle2 className="w-5 h-5 text-primary mr-3" /> Transparent AI Explainability</li>
                <li className="flex items-center text-foreground font-medium"><CheckCircle2 className="w-5 h-5 text-primary mr-3" /> Complete Data Ownership</li>
                <li className="flex items-center text-foreground font-medium"><CheckCircle2 className="w-5 h-5 text-primary mr-3" /> Built-in Emergency Escalation</li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64 bg-card rounded-full border-[8px] border-muted flex items-center justify-center shadow-lg">
                <Brain className="w-24 h-24 text-primary opacity-80" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card py-12 px-6 lg:px-14 text-center">
        <p className="text-muted-foreground text-sm">
          \u00a9 2026 MediSense AI. A Hack2Skill Innovation Project. <br className="md:hidden" />
          <span className="font-semibold text-primary mt-2 inline-block">Disclaimer: This is a hackathon prototype and not a certified medical device.</span>
        </p>
      </footer>
    </div>
  );
}
