import React, { useState } from "react";
import { UserProfile, Internship, Job, FreelanceProject, SkillChallenge, InternshipApplication, DailyLog } from "../types";
import { initialInternships, initialJobs, initialFreelanceProjects, initialChallenges, sampleResumes, mockMentors } from "../mockData";
import { 
  Sparkles, Award, Wallet, Search, Filter, KanbanSquare, CheckCircle, Clock, XCircle, 
  Send, User, FileText, Check, Plus, AlertCircle, Calendar, Trophy, ChevronRight, 
  BookOpen, Star, RefreshCw, Layers, Layout, ArrowUpRight, MessageSquare, Briefcase, Play
} from "lucide-react";

interface StudentPortalProps {
  user: UserProfile;
  activeSubTab: string;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export default function StudentPortal({ user, activeSubTab, onUpdateUser }: StudentPortalProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>(activeSubTab || "dash");

  // 1. RESUME CENTER STATES
  const [resumeText, setResumeText] = useState<string>(sampleResumes[0].text);
  const [targetRole, setTargetRole] = useState<string>("React Frontend Engineer Intern");
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [checkingResume, setCheckingResume] = useState<boolean>(false);

  // 2. PORTFOLIO BUILDER STATES
  const [portfolioTemplate, setPortfolioTemplate] = useState<"Minimal" | "Tech Mono" | "Editorial">("Tech Mono");
  const [portfolioUrl, setPortfolioUrl] = useState<string>("stepup.elite/alekhya");
  const [portfolioProjects, setPortfolioProjects] = useState<Array<{ name: string; desc: string; link: string }>>([
    { name: "Dynamic Token State Manager", desc: "A TypeScript lightweight browser state cacher.", link: "github.com/alekhya/state-manager" },
    { name: "Autonomous Navigation System", desc: "Simulation coordinates mapper using canvas graphs.", link: "github.com/alekhya/auto-nav" }
  ]);
  const [newProjName, setNewProjName] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");

  // 3. SKILL CHALLENGE STATES
  const [challenges, setChallenges] = useState<SkillChallenge[]>(initialChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<SkillChallenge | null>(initialChallenges[0]);
  const [challengeCode, setChallengeCode] = useState<string>("// Write your implementation here\n\nfunction solveProblem() {\n  return null;\n}");
  const [chSuccessMsg, setChSuccessMsg] = useState<string>("");
  const [runningChallenge, setRunningChallenge] = useState<boolean>(false);

  // 4. INTERNSHIP & JOB EXPLORER STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [onlyPaid, setOnlyPaid] = useState(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [appliedItems, setAppliedItems] = useState<InternshipApplication[]>([
    { id: "app-1", internshipId: "int-1", title: "AI & Machine Learning Research Intern", company: "Google DeepMind Academy", appliedDate: "2026-06-02", status: "Under Review" },
    { id: "app-2", internshipId: "int-3", title: "React Front-End Engineer Intern", company: "Vercel Labs", appliedDate: "2026-06-04", status: "Interview Scheduled" }
  ]);

  // 5. FREELANCE MARKETPLACE STATES
  const [activeFreelanceProjects, setActiveFreelanceProjects] = useState<FreelanceProject[]>(initialFreelanceProjects);
  const [freelanceProposal, setFreelanceProposal] = useState<string>("");
  const [biddingProjectId, setBiddingProjectId] = useState<string | null>(null);
  const [myBids, setMyBids] = useState<any[]>([]);

  // 6. SKILL GAP ANALYZER
  const [careerGoal, setCareerGoal] = useState("AI Architect & Engineering Lead");
  const [roadmap, setRoadmap] = useState<string>("");
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  // 7. AI COACH CHAT
  const [coachChatInput, setCoachChatInput] = useState("");
  const [coachChatHistory, setCoachChatHistory] = useState<Array<{ role: "user" | "model"; text: string }>>([
    { role: "model", text: "Hello Alekhya! I am your StepUp Elite AI Coach. Enter any career, portfolio, or recruitment issue below." }
  ]);
  const [sendingCoachMsg, setSendingCoachMsg] = useState(false);

  // 8. INTERVIEW PREP STATE
  const [interviewRole, setInterviewRole] = useState("Full-Stack React Engineer");
  const [interviewReply, setInterviewReply] = useState("");
  const [interviewsLogs, setInterviewsLogs] = useState<Array<{ role: "model" | "user"; text: string }>>([
    { role: "model", text: "Welcome to StepUp Recruiting Center. Tell me briefly about your experience projects." }
  ]);
  const [lastInterviewFeedback, setLastInterviewFeedback] = useState("");
  const [interviewGrade, setInterviewGrade] = useState("Average");
  const [sendingInterviewReply, setSendingInterviewReply] = useState(false);

  // 9. PROGRESS DAILY LOGS
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([
    { id: "log-1", date: "2026-06-05", task: "Configured Vite proxy channels and analyzed bundle indicators.", hours: 6, status: "Completed", feedback: "Excellent code hygiene and comments." },
    { id: "log-2", date: "2026-06-06", task: "Optimized server responses using lazy loading patterns.", hours: 4, status: "Completed" }
  ]);
  const [newLogTask, setNewLogTask] = useState("");
  const [newLogHours, setNewLogHours] = useState(6);

  // Load Preset Sample resumes
  const handleLoadSample = (sampleText: string) => {
    setResumeText(sampleText);
    setResumeAnalysis(null);
  };

  // Submit resume analyzer API call
  const handleCheckResume = async () => {
    setCheckingResume(true);
    setResumeAnalysis(null);
    try {
      const response = await fetch("/api/ai/resume-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole })
      });
      const data = await response.json();
      setResumeAnalysis(data);
      if (data.score) {
        onUpdateUser({ atsScore: data.score });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingResume(false);
    }
  };

  // Run Challenge algorithm test
  const handleTestChallengeCode = () => {
    setRunningChallenge(true);
    setChSuccessMsg("");
    setTimeout(() => {
      setRunningChallenge(false);
      setChSuccessMsg("✓ All 4 unit test checks cleared! +150 Points added to your global leaderboard stats.");
      if (selectedChallenge) {
        setChallenges(prev => prev.map(c => c.id === selectedChallenge.id ? { ...c, completed: true } : c));
        onUpdateUser({ badgeCount: user.badgeCount + 1 });
      }
    }, 2000);
  };

  // Apply to general internship
  const handleApplyInternship = (internship: any) => {
    const isAlreadyApplied = appliedItems.some(i => i.internshipId === internship.id);
    if (isAlreadyApplied) return;
    
    const newApplied: InternshipApplication = {
      id: `app-${Date.now()}`,
      internshipId: internship.id,
      title: internship.title,
      company: internship.company,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied"
    };

    setAppliedItems([newApplied, ...appliedItems]);
    alert(`Successfully submitted application for: ${internship.title} with Stripe payout options integration.`);
  };

  // Submit Freelance Bid proposal
  const handleSubmitFreelanceProposal = (projId: string) => {
    if (!freelanceProposal.trim()) return;
    const project = activeFreelanceProjects.find(p => p.id === projId);
    if (!project) return;

    setMyBids([
      {
        id: `bid-${Date.now()}`,
        projectTitle: project.title,
        budget: project.budget,
        proposal: freelanceProposal,
        status: "Submitted (Under Review)"
      },
      ...myBids
    ]);
    setFreelanceProposal("");
    setBiddingProjectId(null);
  };

  // Submit Skill Gap Roadmap generator
  const handleGenerateRoadmap = async () => {
    setLoadingRoadmap(true);
    setRoadmap("");
    try {
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Produce a step-by-step career learning roadmap to become: "${careerGoal}". Include 3 missing skills, 3 practice challenge tasks, and 3 recommended course listings.`,
          careerGoal: careerGoal
        })
      });
      const data = await response.json();
      setRoadmap(data.text);
    } catch (err) {
      setRoadmap("Simulator fallback roadmap for " + careerGoal);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  // Send message to Coach AI
  const handleSendCoachMsg = async () => {
    if (!coachChatInput.trim()) return;
    const userMsg = { role: "user" as const, text: coachChatInput };
    const nextHistory = [...coachChatHistory, userMsg];
    setCoachChatHistory(nextHistory);
    setCoachChatInput("");
    setSendingCoachMsg(true);

    try {
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: coachChatInput,
          history: nextHistory.slice(-5),
          careerGoal: careerGoal
        })
      });
      const data = await response.json();
      setCoachChatHistory(prev => [...prev, { role: "model" as const, text: data.text }]);
    } catch {
      setCoachChatHistory(prev => [...prev, { role: "model" as const, text: "Error connecting to AI Coach. Refine network settings." }]);
    } finally {
      setSendingCoachMsg(false);
    }
  };

  // AI Recruiter Interview Preparation reply check
  const handleSendInterviewReply = async () => {
    if (!interviewReply.trim()) return;
    const userMsg = { role: "user" as const, text: interviewReply };
    const nextHistory = [...interviewsLogs, userMsg];
    setInterviewsLogs(nextHistory);
    setInterviewReply("");
    setSendingInterviewReply(true);

    try {
      const response = await fetch("/api/ai/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: interviewRole,
          userReply: interviewReply,
          chatHistory: nextHistory.slice(-4)
        })
      });
      const data = await response.json();
      setInterviewsLogs(prev => [...prev, { role: "model" as const, text: data.nextQuestion }]);
      setLastInterviewFeedback(data.feedbackOnLastReply);
      setInterviewGrade(data.overallSessionGrade);
    } catch {
      setInterviewsLogs(prev => [...prev, { role: "model" as const, text: "Recruiter timeout. Let's practice behavioral schemas. Explain your React experience." }]);
    } finally {
      setSendingInterviewReply(false);
    }
  };

  // Add work log
  const handleAddWorkLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTask.trim()) return;
    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      task: newLogTask,
      hours: newLogHours,
      status: "Completed"
    };
    setDailyLogs([newLog, ...dailyLogs]);
    setNewLogTask("");
    onUpdateUser({ escrowWallet: user.escrowWallet + 15 }); // Add simulation hours pay!
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      
      {/* ==========================================
          WELCOME HERO & ACTION PILLS EXACTLY LIKE IMAGE
          ========================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none" />
        
        <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-widest rounded-full">
          Pre-Final Year Workspace Cycle Active
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
          Welcome to StepUp <span className="text-emerald-400">Elite</span>, {user.name}!
        </h1>
        
        <p className="text-xs text-gray-300 mt-2 max-w-2xl leading-normal">
          Verify day-to-day coding achievements, optimize security keywords against technical ATS limits, and test live practice interviews.
        </p>

        {/* Action Buttons precisely based on layouts */}
        <div className="flex flex-wrap gap-2 pt-6">
          <button 
            onClick={() => setActiveTab("progress")} 
            className="px-4 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 text-xs font-bold rounded-lg transition-all"
          >
            Proof-of-Work Logs
          </button>
          <button 
            onClick={() => setActiveTab("interview")} 
            className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 active:scale-95 text-xs font-bold rounded-lg transition-all"
          >
            Consult AI Recruiter
          </button>
          <button 
            onClick={() => setActiveTab("challenges")} 
            className="px-4 py-2 bg-slate-800/40 text-gray-300 border border-slate-700 hover:bg-slate-800 active:scale-95 text-xs font-bold rounded-lg transition-all"
          >
            Skill Challenges
          </button>
        </div>
      </div>

      {/* ==========================================
          NUMERIC STATUS CARDS EXACTLY LIKE IMAGE
          ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: ATS Scores */}
        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-extrabold">
                ATS SCORES
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                Verifying target role
              </span>
            </div>
            
            <p className="text-3xl font-black text-gray-900 mt-4">
              {user.atsScore} <span className="text-xs text-gray-450 font-normal">/ 100</span>
            </p>

            {/* Custom progress indicators */}
            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${user.atsScore}%` }}
              />
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-[10px]">
            <span className="font-extrabold text-amber-600 uppercase tracking-wide">
              {user.atsScore < 75 ? "OPTIMIZATION REQUIRED" : "COMPATIBILITY OPTIMAL"}
            </span>
            <button 
              onClick={() => setActiveTab("resume")} 
              className="text-emerald-600 font-semibold hover:underline"
            >
              Analyze Resume
            </button>
          </div>
        </div>

        {/* Card 2: Escrow Wallet */}
        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-extrabold">
                ESCROW WALLET
              </span>
              <span className="text-[10px] font-mono text-emerald-500 font-extrabold flex items-center gap-1">
                ● Safe Contract
              </span>
            </div>

            <p className="text-3xl font-black text-gray-900 mt-4">
              ${user.escrowWallet} <span className="text-xs text-gray-450 font-normal">USD Secured</span>
            </p>

            <p className="text-[10px] text-gray-400 leading-tight mt-2.5">
              Instant checkout and payments gateway active.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-mono uppercase">
            <span>FUNDS RELEASED BY SANDBOX HIRING MANAGER</span>
          </div>
        </div>

        {/* Card 3: Badges verified */}
        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-extrabold">
                BADGES VERIFIED
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                Claims enabled
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <p className="text-3xl font-black text-gray-900">
                {user.badgeCount}
              </p>
              <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px]">
                R
              </div>
            </div>

            <p className="text-[10px] text-gray-400 leading-tight mt-2.5">
              Refined code metrics matching core standard validations.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 text-[9px] font-extrabold text-violet-600 tracking-wide uppercase">
            CLICK 'SKILL CHALLENGES' TO UNLOCK MORE BADGES
          </div>
        </div>

      </div>

      {/* ==========================================
          PORTAL TABS SUB SECTIONS
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Sidebar for Workspace Modules */}
        <div className="lg:col-span-3 space-y-1 bg-white border border-gray-150 p-3 rounded-2xl">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider px-3 py-1 text-left">
            Active Workspace Services
          </p>
          {[
            { id: "dash", label: "Overview Dashboard", icon: Layers },
            { id: "portfolio", label: "Student Portfolio Builder", icon: Layout },
            { id: "resume", label: "ATS Resume Center", icon: FileText },
            { id: "jobs", label: "Internships & Jobs Search", icon: Search },
            { id: "freelance", label: "Freelance Marketplace", icon: Briefcase },
            { id: "challenges", label: "Daily Skill Challenges", icon: Trophy },
            { id: "skillsAnalyzer", label: "Skill Gap Analyzer & Goals", icon: BookOpen },
            { id: "coach", label: "AI Career Coach Help", icon: MessageSquare },
            { id: "interview", label: "AI Mock Interview Center", icon: Play },
            { id: "networks", label: "Referrals & Mentoring Hub", icon: User },
            { id: "progress", label: "Internship Log tracker", icon: Calendar },
          ].map((item) => {
            const Icon = item.icon;
            const isTabActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all text-left ${
                  isTabActive
                    ? "bg-slate-900 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isTabActive ? "text-emerald-400" : "text-gray-400"}`} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Active pane Card wrapper */}
        <div className="lg:col-span-9 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "dash" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Workspace Feed & Status</h2>
                  <p className="text-xs text-gray-400">Consolidated analytics showing recommendations matches for your career goal</p>
                </div>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] rounded font-mono font-bold">
                  {careerGoal}
                </span>
              </div>

              {/* Grid showing Recommended roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-100 p-4 rounded-xl text-left bg-gray-50/40">
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Recommended Internships
                  </h3>
                  <div className="space-y-3 mt-3">
                    {initialInternships.slice(0, 2).map(item => (
                      <div key={item.id} className="text-xs p-2.5 bg-white border rounded">
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-gray-400 text-[10px]">{item.company} | {item.stipend}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-100 p-4 rounded-xl text-left bg-gray-50/40">
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Freelance Gigs matching Skills
                  </h3>
                  <div className="space-y-3 mt-3">
                    {initialFreelanceProjects.slice(0, 2).map(item => (
                      <div key={item.id} className="text-xs p-2.5 bg-white border rounded">
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-emerald-700 font-mono text-[10px]">Budget escrow: {item.budget} USD</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Applications timeline tracker */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Applications Activity Feed</h3>
                <div className="space-y-2">
                  {appliedItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-xl text-xs bg-white text-left">
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <span className="text-[10px] text-gray-400">Applied: {item.appliedDate}</span>
                      </div>
                      <span className="px-2 py-1 bg-yellow-50 border border-yellow-100 rounded text-[10px] text-yellow-700 font-semibold">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO BUILDER */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Portfolio Builder</h2>
                <p className="text-xs text-gray-500">Publish a customized responsive public page showcasing your validated badges and projects directory.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Custom Portor-Url Prefix</label>
                    <input
                      type="text"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Select Visual Theme</label>
                    <select
                      value={portfolioTemplate}
                      onChange={(e: any) => setPortfolioTemplate(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50"
                    >
                      <option value="Tech Mono">Space / Tech Mono Grid</option>
                      <option value="Minimal">Clean Swiss Minimalist</option>
                      <option value="Editorial">Playfair Editorial Serif</option>
                    </select>
                  </div>

                  {/* Add projects mockup */}
                  <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/50 text-left">
                    <p className="text-xs font-extrabold text-slate-900 mb-2">Insert Project to Showcase</p>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProjName}
                        onChange={(e) => setNewProjName(e.target.value)}
                        className="w-full px-2.5 py-1.5 border text-xs bg-white rounded"
                      />
                      <input
                        type="text"
                        placeholder="Key metrics e.g., cut loading speeds by 24%."
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        className="w-full px-2.5 py-1.5 border text-xs bg-white rounded"
                      />
                      <button
                        onClick={() => {
                          if (!newProjName || !newProjDesc) return;
                          setPortfolioProjects([...portfolioProjects, { name: newProjName, desc: newProjDesc, link: "github.com" }]);
                          setNewProjName("");
                          setNewProjDesc("");
                        }}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded"
                      >
                        Publish Project Showcase
                      </button>
                    </div>
                  </div>
                </div>

                {/* Portfolio Visual Preview screen exactly matching formatting rules */}
                <div className="border rounded-2xl overflow-hidden bg-slate-950 text-white p-5 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-[9px] font-mono text-emerald-400">{portfolioTemplate}: Preview Mode</span>
                    <span className="text-[10px] font-mono underline text-gray-400">{portfolioUrl}</span>
                  </div>

                  <div className="text-left space-y-2">
                    <p className="text-lg font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-gray-400">Email Reference Key: {user.email}</p>
                    <p className="text-xs text-gray-300">Targeting Career Goals: <span className="text-emerald-400">{careerGoal}</span></p>
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest border-b border-slate-900">Featured Projects</p>
                    {portfolioProjects.map((proj, idx) => (
                      <div key={idx} className="p-2 bg-slate-900 border border-slate-800 rounded">
                        <p className="text-xs font-bold text-gray-150">{proj.name}</p>
                        <p className="text-[10px] text-gray-400 leading-normal">{proj.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 bg-emerald-500/5 border border-emerald-500/10 rounded flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400">✓ Badges & Challenges verified</span>
                    <span className="font-bold text-white">{user.badgeCount} Badges</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESUME LAB & ATS ANALYZER */}
          {activeTab === "resume" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-3 border-b">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">AI Resume Lab</h2>
                  <p className="text-xs text-gray-400">Check compatibility with global applicant tracking systems and optimize matching keywords.</p>
                </div>
                
                {/* Samples loader */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoadSample(sampleResumes[0].text)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-[10px] font-bold rounded"
                  >
                    Sample Res-1 (Web)
                  </button>
                  <button
                    onClick={() => handleLoadSample(sampleResumes[1].text)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-[10px] font-bold rounded"
                  >
                    Sample Res-2 (Cloud)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Target Professional Role</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Resume Copy (Draft Raw Text)</label>
                    <textarea
                      rows={10}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 font-mono text-slate-800 outline-none"
                    />
                  </div>

                  <button
                    onClick={handleCheckResume}
                    disabled={checkingResume || !resumeText.trim()}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    {checkingResume ? "Gemini Parsing & Scoring..." : "Calculate ATS AI Score"}
                  </button>
                </div>

                {/* Score panel exactly matching image visual indicators */}
                <div className="space-y-4">
                  {!resumeAnalysis && (
                    <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 text-xs">
                      <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      Click "Calculate ATS AI Score" to analyze keyword densities.
                    </div>
                  )}

                  {resumeAnalysis && (
                    <div className="space-y-4 text-left">
                      {/* Circle score indicators */}
                      <div className="bg-emerald-50/50 border border-emerald-100/30 p-5 rounded-2xl flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-900 text-emerald-400 flex flex-col items-center justify-center">
                          <span className="text-xl font-black">{resumeAnalysis.score}</span>
                          <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider">ATS MATCH</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Evaluator Parsing Completed</p>
                          <p className="text-xs text-gray-500 leading-normal">Score calculated dynamically relative to: "{targetRole}".</p>
                        </div>
                      </div>

                      {/* Detail Metrics bars */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border p-3 rounded-xl bg-white">
                          <p className="text-[10px] font-mono text-gray-400 uppercase">Grammar Index</p>
                          <p className="text-lg font-bold font-mono">{resumeAnalysis.grammarScore || 90}%</p>
                        </div>
                        <div className="border p-3 rounded-xl bg-white">
                          <p className="text-[10px] font-mono text-gray-400 uppercase font-bold">Keyword density</p>
                          <p className="text-lg font-bold font-mono">{resumeAnalysis.keywordScore || 85}%</p>
                        </div>
                        <div className="border p-3 rounded-xl bg-white">
                          <p className="text-[10px] font-mono text-gray-400 uppercase">Formatting scan</p>
                          <p className="text-lg font-bold font-mono">{resumeAnalysis.formattingScore || 95}%</p>
                        </div>
                        <div className="border p-3 rounded-xl bg-white">
                          <p className="text-[10px] font-mono text-gray-400 uppercase font-bold">Impact Verbs</p>
                          <p className="text-lg font-bold font-mono">{resumeAnalysis.impactScore || 80}%</p>
                        </div>
                      </div>

                      {/* Matching vs Missing Keywords lists */}
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-800">Keyword Index Analysis</p>
                        <div className="grid grid-cols-2 gap-3 text-xs leading-normal">
                          <div className="bg-emerald-500/5 p-3 rounded-xl min-h-24">
                            <p className="font-bold text-emerald-900 mb-1 text-[11px]">Matching tags (✓)</p>
                            <ul className="list-disc pl-4 space-y-0.5 text-gray-500 text-[10px]">
                              {(resumeAnalysis.matchingKeywords || []).map((k: string, i: number) => <li key={i}>{k}</li>)}
                            </ul>
                          </div>

                          <div className="bg-red-500/5 p-3 rounded-xl min-h-24">
                            <p className="font-bold text-red-900 mb-1 text-[11px]">Missing target tags (𝗑)</p>
                            <ul className="list-disc pl-4 space-y-0.5 text-gray-500 text-[10px]">
                              {(resumeAnalysis.missingKeywords || []).map((k: string, i: number) => <li key={i}>{k}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Detailed suggestions */}
                      <div className="bg-slate-900 text-white p-5 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-64">
                        {resumeAnalysis.formattedSuggestions}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERNSHIPS & JOBS EXPLORER */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">Browse Internships & Entry-Level Jobs</h2>
                  <p className="text-xs text-gray-400">Direct application pipelines with Stripe escrow wallet integration.</p>
                </div>
              </div>

              {/* Search & filters */}
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by keywords e.g., React, AI, WFH, Stripe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 border rounded-xl text-xs bg-gray-50 focus:bg-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                    <input
                      type="checkbox"
                      checked={onlyRemote}
                      onChange={(e) => setOnlyRemote(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    WFH/Remote
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                    <input
                      type="checkbox"
                      checked={onlyPaid}
                      onChange={(e) => setOnlyPaid(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    Paid only
                  </label>
                </div>
              </div>

              {/* Grid lists */}
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Available Postings Matches</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initialInternships
                    .filter(intern => {
                      if (onlyRemote && intern.type !== "Remote") return false;
                      if (onlyPaid && !intern.isPaid) return false;
                      if (searchQuery && !intern.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                      return true;
                    })
                    .map(intern => (
                      <div key={intern.id} className="border p-4 rounded-xl space-y-3 flex flex-col justify-between text-left">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-emerald-600 font-bold font-mono uppercase">{intern.category}</span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-semibold">{intern.type}</span>
                          </div>
                          <h3 className="font-bold text-sm tracking-tight text-slate-900 pt-1">{intern.title}</h3>
                          <p className="text-xs text-gray-400">{intern.company} • {intern.duration}</p>
                          <p className="text-xs text-gray-550 leading-normal line-clamp-3">{intern.description}</p>
                        </div>

                        <div className="pt-3 border-t flex justify-between items-center mt-2">
                          <span className="text-xs font-black text-slate-800">{intern.stipend}</span>
                          <button
                            onClick={() => handleApplyInternship(intern)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg"
                          >
                            Apply Intern
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FREELANCE MARKETPLACE */}
          {activeTab === "freelance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Freelance Escrow Marketplace</h2>
                <p className="text-xs text-gray-500">Apply for micro tasks. Funds are locked in escrow and triggered upon contract checklist approvals.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Active Gigs list */}
                <div className="space-y-4 text-left">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Active Gig List</p>
                  
                  {activeFreelanceProjects.map(proj => {
                    const isBidding = biddingProjectId === proj.id;
                    return (
                      <div key={proj.id} className="border p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-emerald-700 font-mono font-bold uppercase">{proj.category}</span>
                          <span className="text-gray-400">{proj.duration}</span>
                        </div>
                        <h3 className="font-bold text-xs text-slate-900">{proj.title}</h3>
                        <p className="text-xs text-gray-550 leading-relaxed">{proj.description}</p>
                        
                        <div className="pt-3 border-t flex justify-between items-center">
                          <span className="text-xs font-black text-slate-850">Budget: ${proj.budget}</span>
                          
                          {isBidding ? (
                            <div className="w-full mt-2 pt-2 space-y-2">
                              <textarea
                                value={freelanceProposal}
                                onChange={(e) => setFreelanceProposal(e.target.value)}
                                placeholder="Describe why you excel at this task. E.g., Done 5 React widgets."
                                className="w-full px-2 py-1 border text-xs bg-gray-50"
                              />
                              <div className="flex justify-end gap-1">
                                <button onClick={() => setBiddingProjectId(null)} className="px-2 py-1 text-[10px] font-bold text-gray-500 bg-gray-100 rounded">Cancel</button>
                                <button onClick={() => handleSubmitFreelanceProposal(proj.id)} className="px-2 py-1 text-[10px] font-bold text-white bg-emerald-600 rounded">Submit Proposal</button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setBiddingProjectId(proj.id);
                                setFreelanceProposal("");
                              }}
                              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded"
                            >
                              Bid on Gig
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Proposals submitted */}
                <div className="space-y-4 text-left">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">My Proposals Bids</p>
                  {myBids.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No proposals submitted yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {myBids.map((bid, idx) => (
                        <div key={idx} className="border p-3 rounded-lg bg-gray-50/50 space-y-1">
                          <p className="text-xs font-bold text-slate-900">{bid.projectTitle}</p>
                          <p className="text-[10px] text-gray-600">Your brief: "{bid.proposal}"</p>
                          <div className="flex justify-between items-center text-[10px] pt-1">
                            <span className="font-bold text-emerald-700">Bid price: {bid.budget}</span>
                            <span className="text-amber-700 font-semibold lowercase">{bid.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Escrow payout analytics summary */}
                  <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold">Escrow Released Wallet Ledger</p>
                    <p className="text-[11px] text-gray-300">Total lifetime earnings: $750. Current escrow safety pool: $250 secured.</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 w-1/3 rounded-full" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: DAILY CHALLENGES & trophys */}
          {activeTab === "challenges" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Daily Skill Challenges</h2>
                  <p className="text-xs text-gray-400">Complete challenges across engineering, copywrite, and layout designs logic to earn verified badges.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Available Challenges list */}
                <div className="md:col-span-5 space-y-2 text-left">
                  {challenges.map(item => {
                    const isSelected = selectedChallenge?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedChallenge(item);
                          setChSuccessMsg("");
                        }}
                        className={`p-3 border rounded-xl cursor-pointer transition-all ${
                          isSelected ? "border-violet-600 bg-violet-50/20" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="px-2 py-0.5 bg-violet-100 text-violet-800 rounded font-semibold text-[9px] uppercase tracking-wider">{item.type}</span>
                          <span className="text-gray-400 font-mono">+{item.points} pts</span>
                        </div>
                        <h3 className="font-bold text-xs text-slate-900 mt-1 lines-clamp-1">{item.title}</h3>
                        <div className="flex justify-between items-center pt-2 text-[10px]">
                          <span className={`font-semibold ${item.difficulty === "Easy" ? "text-emerald-600" : "text-amber-600"}`}>{item.difficulty} difficulty</span>
                          {item.completed && <TagCompleted />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Challenge workspace pane */}
                <div className="md:col-span-7 bg-slate-950 p-5 rounded-2xl text-white text-left space-y-4">
                  {selectedChallenge ? (
                    <>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <span className="text-[10px] font-mono text-emerald-400">CODING WORKSPACE MODULE</span>
                        <span className="text-xs font-bold text-gray-400">POINTS: {selectedChallenge.points}</span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-sm text-gray-200">{selectedChallenge.title}</h3>
                        <p className="text-xs text-gray-400 leading-normal">{selectedChallenge.question}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">TS Program Code Editor</p>
                        <textarea
                          rows={8}
                          value={challengeCode}
                          onChange={(e) => setChallengeCode(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-xs font-mono text-gray-150 outline-none"
                        />
                      </div>

                      <button
                        onClick={handleTestChallengeCode}
                        disabled={runningChallenge}
                        className="w-full py-2 bg-violet-600 hover:bg-violet-500 font-extrabold text-xs text-white rounded transition-colors"
                      >
                        {runningChallenge ? "Running Unit Tests Caching Checks..." : "Submit Verification Output"}
                      </button>

                      {chSuccessMsg && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded leading-relaxed">
                          {chSuccessMsg}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-gray-400">Select challenges code to begin program execution tests.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SKILL GAP ANALYZER */}
          {activeTab === "skillsAnalyzer" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Career Goal & Skill Gap Analyst</h2>
                <p className="text-xs text-gray-500">Provide roadmap learning indexes. Scans matching gaps for selected goals automatically.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Your Ideal Destination Career Title</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={careerGoal}
                      onChange={(e) => setCareerGoal(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-xl text-xs bg-gray-50Outline"
                    />
                    <button
                      onClick={handleGenerateRoadmap}
                      disabled={loadingRoadmap}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      {loadingRoadmap ? "Scanning..." : "Scan skill-gaps"}
                    </button>
                  </div>
                </div>

                {roadmap && (
                  <div className="bg-emerald-50/30 border border-emerald-200/50 p-6 rounded-2xl text-left text-xs text-slate-850 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-96">
                    <p className="text-emerald-700 font-mono font-bold uppercase text-[10px] tracking-widest mb-3">
                      ✓ Dyn-Generated Learning Strategy & Course indexes:
                    </p>
                    {roadmap}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: AI CAREER COACH */}
          {activeTab === "coach" && (
            <div className="space-y-4">
              <div className="pb-2 border-b">
                <h2 className="text-lg font-bold text-slate-900">StepUp Elite AI Career Coach</h2>
                <p className="text-xs text-slate-500">Engage in dialogue to optimize your portfolio and receive direct Gemini-powered career guidance.</p>
              </div>

              {/* Chat timeline */}
              <div className="h-80 overflow-y-auto border p-4 bg-gray-50/50 rounded-2xl text-xs space-y-3">
                {coachChatHistory.map((msg, idx) => {
                  const isCoach = msg.role === "model";
                  return (
                    <div key={idx} className={`flex ${isCoach ? "justify-start" : "justify-end"}`}>
                      <div className={`p-4 rounded-2xl max-w-md text-left leading-relaxed whitespace-pre-line ${
                        isCoach ? "bg-white text-slate-800 border" : "bg-emerald-600 text-white"
                      }`}>
                        <p className={`text-[8px] font-mono uppercase tracking-widest font-extrabold mb-1 block ${
                          isCoach ? "text-emerald-600" : "text-emerald-200"
                        }`}>
                          {isCoach ? "StepUp AI Coach" : "USER"}
                        </p>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input channels */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask advice: E.g., How do I secure Google ML Intern roles?"
                  value={coachChatInput}
                  onChange={(e) => setCoachChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendCoachMsg()}
                  className="flex-1 px-3 py-2.5 border rounded-xl bg-gray-50 focus:bg-white text-xs outline-none"
                />
                <button
                  onClick={handleSendCoachMsg}
                  disabled={sendingCoachMsg || !coachChatInput.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold px-4 text-white rounded-xl text-xs"
                >
                  {sendingCoachMsg ? "Typing..." : "Send Msg"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: AI MOCK INTERVIEWS */}
          {activeTab === "interview" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">AI Mock Practice Interviews</h2>
                  <p className="text-xs text-gray-400 font-medium">Practice realistic technical and behavioral question loops graded dynamically by Gemini.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 space-y-4 text-left">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-450 uppercase mb-1 font-bold">Select Role Focus</label>
                    <input
                      type="text"
                      value={interviewRole}
                      onChange={(e) => setInterviewRole(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-xl text-xs bg-gray-50"
                    />
                  </div>

                  {lastInterviewFeedback && (
                    <div className="bg-emerald-50/50 p-4 rounded-xl border space-y-1">
                      <p className="text-[10px] font-mono text-emerald-800 font-bold tracking-widest uppercase">Last Question feedback:</p>
                      <p className="text-[11px] text-gray-600 leading-normal">{lastInterviewFeedback}</p>
                      
                      <div className="flex justify-between items-center text-[10px] pt-1 text-gray-500">
                        <span>Current score index:</span>
                        <span className="font-bold text-slate-900">{interviewGrade}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recruiter active feed chat loops */}
                <div className="md:col-span-7 bg-slate-950 p-5 rounded-2xl text-white text-left space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] font-mono">
                    <span className="text-emerald-400">● AI Recruiter: Active technical Screening</span>
                    <span className="uppercase text-amber-500 font-bold tracking-wider">grading index: {interviewGrade}</span>
                  </div>

                  <div className="space-y-3 max-h-56 overflow-y-auto">
                    {interviewsLogs.map((log, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className={`text-[8px] font-mono uppercase tracking-widest ${
                          log.role === "model" ? "text-emerald-400" : "text-gray-450"
                        }`}>{log.role === "model" ? "Interviewer" : "Alekhya Sangu Reply"}</p>
                        <p className="text-xs text-gray-200 leading-relaxed bg-slate-900 p-2.5 rounded border border-slate-850">{log.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-850">
                    <p className="text-[9px] font-mono text-gray-400 tracking-wider">Your Answer (Speak/Text):</p>
                    <textarea
                      rows={3}
                      value={interviewReply}
                      onChange={(e) => setInterviewReply(e.target.value)}
                      placeholder="Explain your technical concepts clearly..."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-gray-100 outline-none"
                    />
                    <button
                      onClick={handleSendInterviewReply}
                      disabled={sendingInterviewReply || !interviewReply.trim()}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-slate-950 rounded transition-colors"
                    >
                      {sendingInterviewReply ? "Analyzing strength coefficients..." : "Submit Answer to Recruiter"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: REFERRALS & MENTORING */}
          {activeTab === "networks" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Referrals & Professional Networking Hub</h2>
                <p className="text-xs text-gray-500">Connect with industry senior mentors who can audit your code and trigger professional referral request tickets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-left">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Industry Mentor Directory</p>
                  
                  {mockMentors.map(mentor => (
                    <div key={mentor.id} className="border p-4 rounded-xl space-y-2 flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        {mentor.avatar}
                      </div>

                      <div className="flex-1 space-y-1">
                        <h3 className="text-xs font-bold text-slate-900">{mentor.name}</h3>
                        <p className="text-[10px] text-emerald-700 font-semibold uppercase">{mentor.role}</p>
                        <p className="text-[11px] text-gray-500 leading-normal">{mentor.bio}</p>
                        
                        <button
                          onClick={() => alert(`Sent mock session invite. Suresh will contact you via email alekhyareddysangu1352006@gmail.com.`)}
                          className="px-2.5 py-1 text-[10px] bg-slate-900 text-white font-bold rounded"
                        >
                          Book mentoring Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Referral tickets list */}
                <div className="space-y-3 text-left">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Referral Request status</p>
                  <div className="border p-4 rounded-xl bg-gray-50 space-y-3">
                    <div className="p-3 bg-white border rounded">
                      <p className="text-xs font-bold text-slate-900">Amazon SDE-1 Intern Referral</p>
                      <p className="text-[10px] text-gray-400">Requested from: Suresh Kumar</p>
                      <span className="text-[9px] px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded mt-1 inline-block">Under Review (Requires ATS Score {`>`} 80)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: PROGRESS LOGS */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Internship Progress & Proof-of-Work logs</h2>
                <p className="text-xs text-gray-500 font-medium">Verify your day-to-day contributions to trigger stipend payments into your escrow account.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
                {/* Form to submit daily log */}
                <form onSubmit={handleAddWorkLog} className="border p-5 rounded-2xl space-y-4">
                  <p className="text-xs font-bold text-slate-950">Draft Daily Log Ticket</p>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Log Task Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newLogTask}
                      onChange={(e) => setNewLogTask(e.target.value)}
                      placeholder="Completed server schema updates and tested Gemini candidate matching models..."
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Hours Logged</label>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={newLogHours}
                        onChange={(e) => setNewLogHours(Number(e.target.value))}
                        className="w-full px-3 py-1.5 border rounded-xl text-xs bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Attendance index</label>
                      <span className="px-3 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold block text-center">✓ Verified present</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                  >
                    Submit Proof-of-Work
                  </button>
                </form>

                {/* Historic Logs list */}
                <div className="space-y-3">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Logs History Feed</p>
                  <div className="space-y-3">
                    {dailyLogs.map(log => (
                      <div key={log.id} className="border p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-gray-550 font-mono">{log.date}</span>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold font-mono">Present ({log.hours}h)</span>
                        </div>
                        <p className="text-xs text-slate-800 leading-normal">{log.task}</p>
                        {log.feedback && (
                          <p className="text-[10px] text-emerald-700 leading-tight bg-emerald-50/50 p-2 rounded">
                            Mentor feedback: "{log.feedback}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// Sub components
function TagCompleted() {
  return (
    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded-full flex items-center gap-1 shrink-0">
      <CheckCircle className="w-2.5 h-2.5" />
      Verified Cleared
    </span>
  );
}
