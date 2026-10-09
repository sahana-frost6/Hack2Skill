import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "guest";
  age?: number;
  gender?: string;
  bloodGroup?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: "patient" | "doctor" | "guest", customProfile?: Partial<UserProfile>) => void;
  logout: () => void;
  switchDemoUser: (userType: "patient" | "doctor" | "guest") => void;
}

const DEMO_USERS: Record<string, UserProfile> = {
  patient: {
    id: "usr_patient_01",
    name: "Ananya Sharma",
    email: "ananya.sharma@medisense.health",
    role: "patient",
    age: 24,
    gender: "Female",
    bloodGroup: "O+",
  },
  doctor: {
    id: "usr_doc_01",
    name: "Dr. Rajesh Mehta, MD",
    email: "dr.mehta@carehospital.org",
    role: "doctor",
    age: 48,
    gender: "Male",
    bloodGroup: "B+",
  },
  guest: {
    id: "usr_guest_01",
    name: "Guest Explorer",
    email: "guest@medisense.ai",
    role: "guest",
    age: 30,
    gender: "Not specified",
    bloodGroup: "Unknown",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem("medisense_user");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Default prototype user
    return DEMO_USERS.patient;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("medisense_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("medisense_user");
    }
  }, [user]);

  const login = (
    email: string,
    role: "patient" | "doctor" | "guest" = "patient",
    customProfile?: Partial<UserProfile>
  ) => {
    const base = DEMO_USERS[role] || DEMO_USERS.patient;
    const newUser: UserProfile = {
      ...base,
      email: email || base.email,
      ...customProfile,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoUser = (userType: "patient" | "doctor" | "guest") => {
    setUser(DEMO_USERS[userType] || DEMO_USERS.patient);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
