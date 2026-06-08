import React, { useState } from "react";
import { initialInternships, initialJobs, initialFreelanceProjects, mockMentors } from "../mockData";
import { ShieldAlert, Users, CreditCard, Activity, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Layers } from "lucide-react";

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [approvalsList, setApprovalsList] = useState([
    { id: "app-r1", type: "Recruiter Account", name: "Anish Gupta from Stripe", status: "Pending Verification" },
    { id: "app-r2", type: "Partner Internship", name: "Django backend engineer role by Shopify", status: "Pending Approval" },
    { id: "app-r3", type: "Freelance Project", name: "Web development gig by Heritage Coffee", status: "Pending Verification" }
  ]);

  const [supportLogs] = useState([
    { id: "sup-1", user: "alekhyareddysangu1352006@gmail.com", text: "Escrow wallet secure payments release delayed on contract #231", date: "2026-06-06" },
    { id: "sup-2", user: "recruiter@stripesystems.io", text: "Stripe transaction log duplicate webhook detected", date: "2026-06-05" }
  ]);

  const handleApprove = (id: string) => {
    setApprovalsList(prev => prev.filter(item => item.id !== id));
    alert("Approved Successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      
      {/* Admin Title Capsule */}
      <div className="bg-slate-950 p-6 rounded-2xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            StepUp <span className="text-emerald-400 font-extrabold">Enterprise Administration</span>
          </h1>
          <p className="text-[11px] font-mono tracking-widest text-gray-400 uppercase mt-1">Ecosystem Control plane</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-900 p-0.5 rounded-lg text-xs font-semibold">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`px-3 py-1.5 rounded-md ${activeTab === "dashboard" ? "bg-white text-slate-950 shadow-xs" : "text-gray-400 hover:text-white"}`}
          >
            Dashboard Overview
          </button>
          <button 
            onClick={() => setActiveTab("approvals")} 
            className={`px-3 py-1.5 rounded-md ${activeTab === "approvals" ? "bg-white text-slate-950 shadow-xs" : "text-gray-400 hover:text-white"}`}
          >
            Approvals ({approvalsList.length})
          </button>
          <button 
            onClick={() => setActiveTab("support")} 
            className={`px-3 py-1.5 rounded-md ${activeTab === "support" ? "bg-white text-slate-950 shadow-xs" : "text-gray-400 hover:text-white"}`}
          >
            Support Tickets
          </button>
        </div>
      </div>

      {/* TABS 1: ADMIN CONTROL DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border p-4 rounded-xl bg-white flex items-center gap-4 shadow-xs">
              <Users className="w-8 h-8 text-indigo-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-mono">System Students</p>
                <p className="text-xl font-bold">1,410</p>
              </div>
            </div>
            <div className="border p-4 rounded-xl bg-white flex items-center gap-4 shadow-xs">
              <Users className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-mono">Verified Recruiters</p>
                <p className="text-xl font-bold">142</p>
              </div>
            </div>
            <div className="border p-4 rounded-xl bg-white flex items-center gap-4 shadow-xs">
              <CreditCard className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-mono">Razorpay Volume</p>
                <p className="text-xl font-bold">$12,450</p>
              </div>
            </div>
            <div className="border p-4 rounded-xl bg-white flex items-center gap-4 shadow-xs">
              <Cpu className="w-8 h-8 text-violet-500 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 font-mono">Gemini API Load</p>
                <p className="text-xl font-bold">99.8% OK</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Diagnostic panel */}
            <div className="border rounded-2xl p-5 bg-white text-left space-y-3">
              <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Global AI Diagnostic Variables</h3>
              <div className="space-y-2 text-xs leading-none pt-1">
                <div className="flex justify-between p-2.5 bg-gray-50 border rounded-lg">
                  <span className="text-gray-500 font-medium">1. Gemini v3.5-flash Endpoint ping:</span>
                  <span className="font-bold text-emerald-600">✓ 85ms (Healthy)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-gray-50 border rounded-lg">
                  <span className="text-gray-500 font-medium">2. AI Resume Score cache index:</span>
                  <span className="font-bold">Enabled (L2 Pool)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-gray-50 border rounded-lg">
                  <span className="text-gray-500 font-medium">3. Candidate Matching model parsing load:</span>
                  <span className="font-bold">Active (0 queues)</span>
                </div>
              </div>
            </div>

            {/* Payments Ledger verification */}
            <div className="border rounded-2xl p-5 bg-white text-left space-y-3">
              <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Razorpay & Escrow Wallet Settlements</h3>
              <div className="space-y-2 text-xs">
                {initialFreelanceProjects.map(proj => (
                  <div key={proj.id} className="flex justify-between items-center text-[11px] p-2 bg-gray-50/50 rounded">
                    <div>
                      <p className="font-bold text-slate-900">{proj.client}</p>
                      <p className="text-[9px] text-gray-400">Task: {proj.title}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold text-[10px]">
                      Stripe Escrow Locked: {proj.budget}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPROVAL PANEL */}
      {activeTab === "approvals" && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">Review pending recruiters credentials and newly proposed paid internship listings.</p>

          {approvalsList.length === 0 ? (
            <div className="p-12 border border-dashed text-gray-400 text-center text-xs rounded-xl">
              ✓ All credential and roles submissions have been reviewed and approved!
            </div>
          ) : (
            <div className="space-y-2">
              {approvalsList.map(item => (
                <div key={item.id} className="p-4 border rounded-xl bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="px-1.5 py-0.5 bg-red-55 text-red-800 text-[10px] font-bold rounded">{item.type}</span>
                    <h3 className="font-bold text-slate-900 mt-1">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 lowercase">{item.status}</p>
                  </div>

                  <button 
                    onClick={() => handleApprove(item.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg"
                  >
                    Confirm Approval
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SUPPORT LOGS */}
      {activeTab === "support" && (
        <div className="space-y-3Text text-left">
          <p className="text-xs text-gray-500 mb-4">Review open customer queries regarding Razorpay payments or mock interview preparation loops.</p>
          <div className="space-y-3">
            {supportLogs.map(sup => (
              <div key={sup.id} className="border p-4 rounded-xl bg-white space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold text-emerald-600 font-mono">{sup.user}</span>
                  <span className="text-gray-400 font-mono">{sup.date}</span>
                </div>
                <p className="text-xs text-slate-800 leading-normal font-medium">"{sup.text}"</p>
                <div className="flex gap-2 pt-2 border-t mt-2">
                  <button onClick={() => alert("Direct reply sent to student.")} className="px-2 py-1 bg-slate-900 text-white font-bold text-[10px] rounded">
                    Reply
                  </button>
                  <button onClick={() => alert("Escrow settlement forced successfully.")} className="px-2 py-1 text-[10px] text-emerald-800 bg-emerald-50 rounded">
                    Bypass Wallet lock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
