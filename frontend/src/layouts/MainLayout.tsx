import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Activity, 
  FileText, 
  Pill, 
  HeartPulse, 
  Calendar, 
  MessageSquare, 
  User, 
  AlertTriangle, 
  Menu, 
  Bell, 
  Search,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Symptom Triage", href: "/dashboard/triage", icon: AlertTriangle },
    { name: "Report Analyzer", href: "/dashboard/reports", icon: FileText },
    { name: "Vitals", href: "/dashboard/vitals", icon: HeartPulse },
    { name: "Medications", href: "/dashboard/medications", icon: Pill },
    { name: "Doctor Summary", href: "/dashboard/doctor-summary", icon: User },
    { name: "Wellness Plan", href: "/dashboard/wellness", icon: Activity },
    { name: "Timeline", href: "/dashboard/timeline", icon: Calendar },
    { name: "AI Copilot", href: "/dashboard/copilot", icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.name || "Ananya Sharma";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r">
        <div className="flex h-16 items-center px-4 border-b">
          <HeartPulse className="w-8 h-8 text-primary mr-2" />
          <span className="text-xl font-bold text-primary">MediSense AI</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs flex-shrink-0">
                {initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold truncate leading-tight">{displayName}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{user?.role || "patient"} profile</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 bg-card border-b relative z-30">
          <div className="flex items-center">
            <button className="md:hidden p-2 -ml-2 mr-2 text-muted-foreground">
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search my health history... (Ctrl+K)"
                className="h-9 w-64 lg:w-96 rounded-md border border-input bg-background pl-9 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-2 text-muted-foreground hover:text-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {initials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold leading-none">{displayName}</div>
                  <div className="text-[10px] text-muted-foreground capitalize mt-0.5">{user?.role || "patient"}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || "ananya@medisense.health"}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {user?.role || "patient"}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                    >
                      Dashboard Home
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                    >
                      Switch Persona / Re-login
                    </Link>
                  </div>
                  <div className="border-t pt-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
