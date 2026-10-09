import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardOverview from "./pages/DashboardOverview";
import SymptomTriage from "./pages/SymptomTriage";
import ReportAnalyzer from "./pages/ReportAnalyzer";
import MedicationsHub from "./pages/MedicationsHub";
import DoctorAssistant from "./pages/DoctorAssistant";
import LandingPage from "./pages/LandingPage";
import AICopilot from "./pages/AICopilot";
import LoginPage from "./pages/LoginPage";
import VitalsTracker from "./pages/VitalsTracker";
import WellnessPlan from "./pages/WellnessPlan";
import HealthTimeline from "./pages/HealthTimeline";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="triage" element={<SymptomTriage />} />
              <Route path="reports" element={<ReportAnalyzer />} />
              <Route path="vitals" element={<VitalsTracker />} />
              <Route path="medications" element={<MedicationsHub />} />
              <Route path="doctor-summary" element={<DoctorAssistant />} />
              <Route path="wellness" element={<WellnessPlan />} />
              <Route path="timeline" element={<HealthTimeline />} />
              <Route path="copilot" element={<AICopilot />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
