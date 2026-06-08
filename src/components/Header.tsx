import React from "react";
import { UserProfile } from "../types";
import { Briefcase, Sliders, ShieldCheck, Heart, LogIn } from "lucide-react";

interface HeaderProps {
  user: UserProfile;
  activeRole: "student" | "recruiter" | "admin" | "public";
  onChangeRole: (newRole: "student" | "recruiter" | "admin" | "public") => void;
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

export default function Header({
  user,
  activeRole,
  onChangeRole,
  activeTab,
  onChangeTab,
}: HeaderProps) {
  // Navigation tabs list based on role
  const getTabsByRole = () => {
    switch (activeRole) {
      case "student":
        return [
          { id: "dash", label: "Student Dashboard" },
          { id: "resume", label: "Resume Lab & ATS" },
          { id: "jobs", label: "Internships & Jobs" },
          { id: "challenges", label: "Skill Challenges" },
          { id: "coach", label: "AI Career Coach" },
          { id: "interview", label: "AI Mock Interviews" },
          { id: "networks", label: "Networking Hub" },
        ];
      case "recruiter":
        return [
          { id: "rec-dash", label: "Recruiter Dashboard" },
          { id: "rec-post", label: "Post Internship/Job" },
          { id: "rec-candidates", label: "AI Candidate Ranking" },
          { id: "rec-analytics", label: "Sub & Analytics" },
        ];
      case "admin":
        return [
          { id: "adm-dash", label: "Admin Dashboard" },
          { id: "adm-approvals", label: "Approvals Feed" },
          { id: "adm-users", label: "User Audit Logs" },
        ];
      default: // public landing
        return [
          { id: "home", label: "Landing Home" },
          { id: "about", label: "About Us" },
          { id: "contact", label: "Contact Us" },
          { id: "success", label: "Success Stories" },
          { id: "blog", label: "Insight Blogs" },
        ];
    }
  };

  const currentTabs = getTabsByRole();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo exactly like image */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            onChangeRole("public");
            onChangeTab("home");
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xl tracking-tight shadow-sm hover:scale-105 transition-transform">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5 h-6">
              StepUp <span className="text-emerald-500 font-extrabold">Elite</span>
            </h1>
            <p className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
              Career Ecosystem
            </p>
          </div>
        </div>

        {/* Central Nav Tabs */}
        <nav className="flex items-center flex-wrap gap-1 md:gap-2">
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* User control widgets & Role selector exactly like image */}
        <div className="flex items-center gap-3">
          {/* Active Portal Switching Pills */}
          <div className="bg-gray-100 p-0.5 rounded-full flex items-center">
            <button
              onClick={() => {
                onChangeRole("student");
                onChangeTab("dash");
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                activeRole === "student"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => {
                onChangeRole("recruiter");
                onChangeTab("rec-dash");
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                activeRole === "recruiter"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Recruiter
            </button>
            <button
              onClick={() => {
                onChangeRole("admin");
                onChangeTab("adm-dash");
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                activeRole === "admin"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Admin
            </button>
          </div>

          {/* User profile capsule aligned to user's identity */}
          {activeRole !== "public" ? (
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs uppercase shadow-xs ring-2 ring-emerald-50/50">
                {user.name.charAt(0)}
              </div>
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {user.name}
                </p>
                <span className="text-[10px] font-mono text-gray-400 capitalize bg-gray-50 px-1 rounded block">
                  {activeRole} portal
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                onChangeRole("student");
                onChangeTab("dash");
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-2 shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
