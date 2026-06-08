import React, { useState } from "react";
import { UserProfile } from "./types";
import Header from "./components/Header";
import LandingHome from "./components/LandingHome";
import StudentPortal from "./components/StudentPortal";
import RecruiterPortal from "./components/RecruiterPortal";
import AdminPortal from "./components/AdminPortal";
import { ShieldCheck } from "lucide-react";

export default function App() {
  // Central mock logged user matched exactly to description metrics
  const [user, setUser] = useState<UserProfile>({
    name: "Alekhya Sangu",
    email: "alekhyareddysangu1352006@gmail.com",
    role: "student",
    avatar: "A",
    badgeCount: 1,
    atsScore: 35,
    escrowWallet: 250,
  });

  // Current active portal role layer
  const [activeRole, setActiveRole] = useState<"student" | "recruiter" | "admin" | "public">("public");
  
  // Current submenu view tab
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleUpdateUser = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const handleChangeRole = (newRole: "student" | "recruiter" | "admin" | "public") => {
    setActiveRole(newRole);
    // Auto-select standard entry route tab based on role
    if (newRole === "student") {
      setActiveTab("dash");
    } else if (newRole === "recruiter") {
      setActiveTab("rec-dash");
    } else if (newRole === "admin") {
      setActiveTab("adm-dash");
    } else {
      setActiveTab("home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/20 text-gray-900 font-sans flex flex-col justify-between">
      
      {/* 1. STICKY SYSTEM HEADER (Matches reference layout visual) */}
      <Header
        user={user}
        activeRole={activeRole}
        onChangeRole={handleChangeRole}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      {/* 2. FULL PORTALS VIEW MATRIX */}
      <main className="flex-1 pb-16">
        {activeRole === "public" && (
          <LandingHome
            onExploreRole={(role) => {
              handleChangeRole(role);
            }}
            activeLandingTab={activeTab}
          />
        )}

        {activeRole === "student" && (
          <StudentPortal
            user={user}
            activeSubTab={activeTab}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {activeRole === "recruiter" && (
          <RecruiterPortal
            onAddInternship={(item) => {
              // Add internship simulation
              console.log("Mock added internship:", item);
            }}
            onAddJob={(item) => {
              // Add entry job simulation
              console.log("Mock added job:", item);
            }}
          />
        )}

        {activeRole === "admin" && (
          <AdminPortal />
        )}
      </main>

      {/* 3. PLATFORM STATUS FOOTER (Precisely aligned to image) */}
      <footer className="bg-white border-t border-gray-100 py-4 px-4 md:px-8 text-center text-gray-400 text-[10px] uppercase font-mono tracking-wider mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 font-semibold">
            <span>© 2026 StepUp Elite Systems</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Security & Escrow Terms</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-emerald-600 font-black">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Platform Status: Operational - Sandbox Enabled</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
