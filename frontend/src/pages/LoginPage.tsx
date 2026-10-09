import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { 
  HeartPulse, 
  ShieldCheck, 
  Brain, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff,
  Stethoscope,
  CheckCircle2
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, switchDemoUser } = useAuth();

  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("ananya.sharma@medisense.health");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Ananya Sharma");
  const [role, setRole] = useState<"patient" | "doctor" | "guest">("patient");
  const [age, setAge] = useState("24");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, role, {
        name: name.trim() || (role === "doctor" ? "Dr. Rajesh Mehta" : "Ananya Sharma"),
        age: parseInt(age) || 24,
        bloodGroup: bloodGroup || "O+",
        role,
      });
      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  const handleQuickDemo = (userType: "patient" | "doctor" | "guest") => {
    setLoading(true);
    switchDemoUser(userType);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      {/* Top Header */}
      <header className="px-6 lg:px-12 h-16 flex items-center justify-between border-b bg-card/60 backdrop-blur-md">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <HeartPulse className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">MediSense AI</span>
        </Link>
        <div className="flex items-center space-x-3 text-sm">
          <span className="text-muted-foreground hidden sm:inline">Prototype Sandbox</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Banner (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:pr-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Healthcare AI Platform</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Welcome to your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  Intelligent Health Companion
                </span>
              </h1>
              <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
                Experience comprehensive AI-driven symptom triage, multimodal diagnostic report analysis, and clinical visit agenda preparation.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-card border shadow-xs">
                <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Gemini 1.5 Multimodal Analysis</h4>
                  <p className="text-xs text-muted-foreground">Extracts biomarkers from lab images, scans, and PDFs instantly.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-card border shadow-xs">
                <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Instant Clinical PDF Export</h4>
                  <p className="text-xs text-muted-foreground">Generate comprehensive single-page summaries for doctor visits.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-card border shadow-xs">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Secure Health Sandbox</h4>
                  <p className="text-xs text-muted-foreground">Test the interactive prototype with preloaded clinical profiles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Login / Signup Box (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-card border rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Quick Demo Personas */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  One-Click Prototype Quick Access
                </span>
                <span className="text-xs text-primary font-medium">Instant Test</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("patient")}
                  className="flex flex-col items-start p-3 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-primary group-hover:underline">Patient Demo</span>
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold mt-1">Ananya S.</span>
                  <span className="text-[11px] text-muted-foreground">Preloaded logs</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo("doctor")}
                  className="flex flex-col items-start p-3 rounded-xl border border-muted hover:border-blue-400 bg-muted/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-blue-600 group-hover:underline">Doctor Demo</span>
                    <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold mt-1">Dr. Mehta</span>
                  <span className="text-[11px] text-muted-foreground">Clinical review</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo("guest")}
                  className="flex flex-col items-start p-3 rounded-xl border border-muted hover:border-foreground/30 bg-muted/40 hover:bg-muted/70 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-foreground group-hover:underline">Guest User</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className="text-sm font-semibold mt-1">Clean Slate</span>
                  <span className="text-[11px] text-muted-foreground">Empty history</span>
                </button>
              </div>
            </div>

            {/* Tabs for Sign In vs Register */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex space-x-2 bg-muted p-1 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    !isSignUp ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    isSignUp ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Create Account
                </button>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {isSignUp ? "Set up new profile" : "Enter credentials"}
              </span>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Ananya Sharma"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min={1}
                        max={120}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Blood Group</label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-foreground">Password</label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => alert("Prototype mode: any password is accepted!")}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-input text-primary focus:ring-primary" />
                  <span>Remember session</span>
                </label>
                <span>Demo mode active</span>
              </div>

              <Button type="submit" size="lg" className="w-full h-11 text-base mt-2" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Entering MediSense...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {isSignUp ? "Create Prototype Account" : "Sign In to Dashboard"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-xs text-muted-foreground">
                By entering the MediSense prototype, you acknowledge this is a clinical demonstration sandbox and not medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t text-center text-xs text-muted-foreground">
        © 2026 MediSense AI • Hack2Skill Healthcare Innovation Sandbox
      </footer>
    </div>
  );
}
