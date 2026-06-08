import React, { useState } from "react";
import { initialInternships, initialJobs, initialFreelanceProjects, successStories } from "../mockData";
import { Briefcase, ArrowRight, ShieldCheck, Mail, Send, Award, Sparkles, Building, Play, Compass, CheckCircle2, ChevronRight, MessageSquareCode } from "lucide-react";
import { Internship, Job, FreelanceProject } from "../types";

interface LandingHomeProps {
  onExploreRole: (role: "student" | "recruiter" | "admin") => void;
  activeLandingTab: string;
}

export default function LandingHome({ onExploreRole, activeLandingTab }: LandingHomeProps) {
  // Filters for dynamic internship browse section
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [coachInput, setCoachInput] = useState<string>("");
  const [coachReply, setCoachReply] = useState<string>("");
  const [coachLoading, setCoachLoading] = useState<boolean>(false);

  // Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Filter internships dynamically
  const categories = ["All", "Remote", "Paid", "Web Engineering", "Design", "AI & Data Science"];
  
  const filteredInternships = initialInternships.filter((intern) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Remote") return intern.type === "Remote";
    if (selectedCategory === "Paid") return intern.isPaid;
    return intern.category === selectedCategory;
  });

  // Handle sandbox AI Coach submission (server-side proxied)
  const handleCoachDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachInput.trim()) return;
    setCoachLoading(true);
    setCoachReply("");
    try {
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: coachInput,
          careerGoal: "General Career Advice Demo Mode"
        })
      });
      const data = await response.json();
      setCoachReply(data.text);
    } catch (err) {
      setCoachReply("Error testing API. Default Simulator: Prepare your git logs, design frameworks, and practice interactive queries with the AI Recruiter Mock Hub.");
    } finally {
      setCoachLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4000);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      {activeLandingTab === "home" && (
        <>
          <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white">
            {/* Visual grid decor overlays */}
            <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                      StepUp Elite Career Hub 2026
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                    Empower Your First <br />
                    <span className="text-emerald-400">Professional Steps</span>
                  </h1>
                  
                  <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
                    Connecting undergraduate candidates with elite fully-paid tech internships, remote entry-level roles, and verified freelance logo & web projects. Bypassed by an automated ATS grading model.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => onExploreRole("student")}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-xs font-bold text-slate-950 rounded-xl transition-all shadow-lg shadow-emerald-500/15 flex items-center gap-2 group"
                    >
                      Enter Student Portal
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => onExploreRole("recruiter")}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-white rounded-xl transition-all border border-slate-700/60"
                    >
                      Partner as Recruiter
                    </button>
                  </div>

                  {/* Trust index labels */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-emerald-400">92%</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Placement Success</p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-emerald-400">1,200+</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Remote Roles Open</p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-emerald-400">100%</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Paid Stipends</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Dashboard Visual Card exactly matching layout aspects */}
                <div className="lg:col-span-5 relative">
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />
                    
                    {/* Simulator Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                        ● ATS ACTIVE EVALUATOR
                      </span>
                    </div>

                    {/* Resume Upload Form mockup */}
                    <div className="space-y-4 pt-4">
                      <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-gray-200">AI ATS Analyzer</p>
                          <p className="text-[10px] text-gray-500">Matching role: React Architect</p>
                        </div>
                        <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono text-emerald-400 font-bold">
                          94/100
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-gray-400">Resume Keyword Check:</p>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] rounded font-mono">React v19</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] rounded font-mono">TypeScript</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] rounded font-mono">CI/CD</span>
                          <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[9px] rounded font-mono">Kubernetes Missing</span>
                        </div>
                      </div>

                      <div className="bg-slate-950/20 border border-slate-850 p-3 rounded-lg text-[10px] text-gray-400 leading-normal italic">
                        "Your resume lacks container orchestration verbs. Insert Kubernetes tags and re-upload to raise matching probability from 65% to 92%."
                      </div>
                      
                      <button 
                        onClick={() => onExploreRole("student")}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
                      >
                        Try Professional Resume scoring
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 2. FEATURED COMPANIES LOGO ACCENT */}
          <section className="bg-white py-8 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-slate-400 text-xs">
              <span className="font-mono tracking-widest text-[10px] uppercase text-gray-400 block mb-4">
                Partnered Hiring Networks & Companies
              </span>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75">
                <div className="flex items-center gap-1.5 col-span-1">
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-700 tracking-tight text-sm">Google Academy</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-1">
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-700 tracking-tight text-sm">Vercel Inc.</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-1">
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-700 tracking-tight text-sm">Airbnb</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-1">
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-700 tracking-tight text-sm">Stripe Payments</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-1">
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-700 tracking-tight text-sm">Notion HQ</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. FEATURED INTERNSHIPS INDEX */}
          <section className="py-16 max-w-7xl mx-auto px-4 md:px-8 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Featured Internships
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  High-growth internship postings across modern disciplines
                </p>
              </div>
              
              {/* Category switches */}
              <div className="flex items-center flex-wrap gap-1 bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md transition-all ${
                      selectedCategory === cat
                        ? "bg-white text-emerald-700 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInternships.map((intern) => (
                <div
                  key={intern.id}
                  className="bg-white border border-gray-100 hover:border-emerald-200 p-5 rounded-2xl shadow-xs transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold tracking-tight">
                        {intern.type}
                      </span>
                      {intern.isPaid && (
                        <span className="px-2 py-0.5 bg-yellow-55 text-amber-900 rounded text-[10px] font-bold">
                          Paid Stipend
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-950 text-sm tracking-tight hover:text-emerald-600 cursor-pointer pt-1 leading-tight">
                      {intern.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {intern.company}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {intern.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-gray-50 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">
                      {intern.stipend}
                    </span>
                    <button
                      onClick={() => onExploreRole("student")}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
                    >
                      Apply Now
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. FREELANCE PROJECTS INDEX PREVIEW */}
          <section className="py-12 bg-gray-50 border-y border-gray-100 text-left">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Freelance Gig Marketplace
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Secure escrowed budgets to bootstrap your portfolio history
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {initialFreelanceProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white border border-gray-150 p-5 rounded-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] mb-2">
                        <span className="text-emerald-600 font-mono font-bold uppercase">{proj.category}</span>
                        <span className="text-gray-400 font-semibold">{proj.duration}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight mb-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-normal line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-wide text-gray-400">Budget Escrowed</p>
                        <p className="text-sm font-bold text-emerald-700">{proj.budget} USD</p>
                      </div>
                      <button
                        onClick={() => onExploreRole("student")}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-800 rounded-lg transition-colors"
                      >
                        Submit Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. SUCCESS STORIES MAPS */}
          <section className="py-16 max-w-7xl mx-auto px-4 md:px-8 text-left">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Placement Success Stories
              </h2>
              <p className="text-xs text-gray-500 mt-2 max-w-lg mx-auto">
                Read how students optimized their resumes, prepared mock interviews, and landed verified full-time internships with major tech brands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xs flex flex-col justify-between relative"
                >
                  <span className="absolute top-6 right-6 text-emerald-100 font-serif text-8xl pointer-events-none line-height-[0]">
                    “
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      How {story.studentName} landed a role at {story.company}
                    </h3>
                    <p className="text-xs italic text-slate-600 my-4 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                      "{story.quote}"
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      {story.story}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <img
                      src={story.avatar}
                      alt={story.studentName}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {story.studentName}
                      </h4>
                      <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wide">
                        {story.roleWon}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. AI CAREER COACH SANDBOX PRACTICE */}
          <section className="py-12 bg-slate-950 text-white relative">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400">
                <Sparkles className="w-3 h-3" />
                AI COACH DEMO SANDBOX
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Ask our AI Coach an Internship Strategy Question
              </h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Test a direct query below to see how our Gemini-powered assistant custom-analyzes missing career skills and advises you!
              </p>

              <form onSubmit={handleCoachDemoSubmit} className="max-w-xl mx-auto pt-2">
                <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <input
                    type="text"
                    value={coachInput}
                    onChange={(e) => setCoachInput(e.target.value)}
                    placeholder="E.g., How do I get a Paid React Frontend Internship with no experience?"
                    className="flex-1 bg-transparent px-4 py-3 text-xs outline-none text-white placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={coachLoading || !coachInput.trim()}
                    className="bg-emerald-500 hover:bg-emerald-400 font-bold px-4 py-2 text-xs text-slate-950 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {coachLoading ? "Thinking..." : "Consult AI"}
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>

              {coachReply && (
                <div className="max-w-xl mx-auto bg-slate-900/80 border border-slate-850 p-6 rounded-2xl text-left text-xs text-gray-200 mt-6 leading-relaxed shadow-lg overflow-y-auto max-h-64 whitespace-pre-wrap">
                  <p className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
                    StepUp AI Coach Advice Response:
                  </p>
                  {coachReply}
                </div>
              )}
            </div>
          </section>

          {/* 7. CALL TO ACTION */}
          <section className="py-20 bg-emerald-900 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern pointer-events-none" />
            
            <div className="max-w-xl mx-auto px-4 relative z-10 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Accelerate Your Internship Outcomes
              </h2>
              <p className="text-xs text-emerald-100 max-w-sm mx-auto leading-relaxed">
                Connect with mentors, track applications in one dashboard, build a portfolio webpage, and secure your career pathways.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onExploreRole("student")}
                  className="px-8 py-3 bg-white text-emerald-950 hover:bg-emerald-50 active:scale-95 font-extrabold text-xs tracking-tight rounded-xl transition-all shadow-md"
                >
                  Create Your Student Account
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ABOUT US NAV TAB OUTLINE */}
      {activeLandingTab === "about" && (
        <section className="max-w-4xl mx-auto py-16 px-4 md:px-8 text-left space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">About our platform ecosystem</span>
            <h2 className="text-3xl font-bold text-slate-950">
              Forging the Next Generation of Work
            </h2>
            <p className="text-xs text-gray-500 max-w-md">
              StepUp Elite was created in 2026 to dismantle systemic barriers for student engineers, creators, and business minds striving for high-value careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Automated Resume Checker</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Applicant tracking systems block up to 72% of qualified student candidates simply because of formatting layouts, grammar verbs, or missing skill indices. Our automated pipeline guarantees candidates bypass screening.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Escrow Wallet Protection</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Clients hiring freelancers lock down standard budgets beforehand inside our secure payment gateway escrow. Funds are automatically triggered upon mentor/recruiter approval matching tasks correctly.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">AI Career Coach Integration</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Powered by Gemini v3.5-flash, students get granular missing skill evaluations, interactive learning roadmap courses, and continuous mock assessments with instant text reviews.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Unified Communication Hub</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Seamless role switching ensures you can participate both as a student builder, a freelance logo designer, or a corporate recruiter reviewing applicants under the same user identity keys.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT US NAV TAB */}
      {activeLandingTab === "contact" && (
        <section className="max-w-md mx-auto py-16 px-4 text-left">
          <div className="space-y-3 text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-950">Contact StepUp systems</h2>
            <p className="text-xs text-gray-500">
              Have integration, escrow, or enterprise recruitment inquiries? Let us know.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white border p-6 rounded-2xl space-y-4 shadow-xs">
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Alekhya Sangu"
                className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="alekhyareddysangu1352006@gmail.com"
                className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50 focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Your Message</label>
              <textarea
                required
                rows={3}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your inquiry..."
                className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50 focus:bg-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-xs rounded-xl shadow-xs"
            >
              Send Secure Message
            </button>

            {contactSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-[11px] rounded-lg text-center mt-2 font-semibold">
                Message saved! Our systems support team will reply within 24 hours.
              </div>
            )}
          </form>
        </section>
      )}

      {/* BLOG ARCHIVE INDEX */}
      {activeLandingTab === "blog" && (
        <section className="max-w-5xl mx-auto py-16 px-4 text-left">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-950">Ecosystem Insights</h2>
            <p className="text-xs text-gray-500 mt-1">Written by senior recruiting experts and career coaches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-2xl overflow-hidden shadow-xs hover:scale-[1.01] transition-transform">
              <div className="h-40 bg-gradient-to-br from-indigo-900 to-indigo-950 p-5 text-white flex flex-col justify-between">
                <span className="px-2 py-0.5 bg-indigo-500/15 rounded text-[9px] font-mono uppercase tracking-wider self-start">ATS Secrets</span>
                <h3 className="font-bold text-sm tracking-tight leading-snug">The 5 Verbs Banning Your Resume from Tech Internships</h3>
              </div>
              <div className="p-5 space-y-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">June 04, 2026</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Discover why passive expressions like "responsible for" undermine credibility systems. Replace them with heavy structural metrics.
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-2xl overflow-hidden shadow-xs hover:scale-[1.01] transition-transform">
              <div className="h-40 bg-gradient-to-br from-emerald-900 to-emerald-950 p-5 text-white flex flex-col justify-between">
                <span className="px-2 py-0.5 bg-emerald-500/15 rounded text-[9px] font-mono uppercase tracking-wider self-start">Growth Markets</span>
                <h3 className="font-bold text-sm tracking-tight leading-snug">How Remote Freelancing Accelerates College Career Trajectories</h3>
              </div>
              <div className="p-5 space-y-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">May 29, 2026</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Avoid empty coding challenges. Learn to build direct, real-world freelance web layouts and score proof-of-work badges today.
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-2xl overflow-hidden shadow-xs hover:scale-[1.01] transition-transform">
              <div className="h-40 bg-gradient-to-br from-amber-900 to-amber-950 p-5 text-white flex flex-col justify-between">
                <span className="px-2 py-0.5 bg-amber-500/15 rounded text-[9px] font-mono uppercase tracking-wider self-start">AI Coaching</span>
                <h3 className="font-bold text-sm tracking-tight leading-snug">Generative Models: Preparing for the Live System Design Prompt</h3>
              </div>
              <div className="p-5 space-y-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">May 15, 2026</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  How to utilize the new Gemini 3.5 interactive live loops to master architectural concepts of scaling databases, API routers, and load balance nodes.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SUCCESS STORIES NAVIGATION HUB */}
      {activeLandingTab === "success" && (
        <section className="max-w-5xl mx-auto py-16 px-4 text-left">
          <div className="mb-10 text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-950">Ecosystem Placements</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">See how college programmers leveraged StepUp Elite tools to bridge skill gaps.</p>
          </div>

          <div className="space-y-6">
            {successStories.map((story, index) => (
              <div key={story.id} className="bg-white border rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                  <img src={story.avatar} alt={story.studentName} className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-50" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{story.studentName}</h3>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">{story.roleWon}</p>
                    <p className="text-[11px] text-gray-400 font-mono mt-1">{story.company}</p>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <p className="text-xs italic text-emerald-800 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 font-semibold leading-relaxed">
                    "{story.quote}"
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {story.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
