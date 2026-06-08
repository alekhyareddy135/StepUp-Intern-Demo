import React, { useState } from "react";
import { initialInternships, initialJobs, initialFreelanceProjects, mockCandidates } from "../mockData";
import { 
  Plus, Users, Briefcase, FileText, BarChart3, Star, CheckCircle, 
  XCircle, Filter, Search, ShieldCheck, Sparkles, Send, Coins 
} from "lucide-react";

interface RecruiterPortalProps {
  onAddInternship: (internship: any) => void;
  onAddJob: (job: any) => void;
}

export default function RecruiterPortal({ onAddInternship, onAddJob }: RecruiterPortalProps) {
  const [activePane, setActivePane] = useState<string>("dashboard");

  // FORM STATES: Post Internship / Job
  const [postType, setPostType] = useState<"Internship" | "Job" | "Freelance Project">("Internship");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("Vercel Systems");
  const [location, setLocation] = useState("Remote");
  const [stipendOrSalary, setStipendOrSalary] = useState("$2,000 / month");
  const [duration, setDuration] = useState("3 Months");
  const [reqSkills, setReqSkills] = useState("React, TypeScript, CSS");
  const [description, setDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // CANDIDATE RANKING STATES
  const [selectedJobForRanking, setSelectedJobForRanking] = useState<string>("React front-end Engineer");
  const [jobRequirements, setJobRequirements] = useState("Must have React v19, TypeScript, Express and Git version control experience.");
  const [rankedCandidates, setRankedCandidates] = useState<any[]>([]);
  const [rankingLoading, setRankingLoading] = useState(false);

  // APPLICATION STATES
  const [applications, setApplications] = useState([
    { id: "a-1", name: "Anish Gupta", role: "AI Research Candidate", status: "Shortlisted" },
    { id: "a-2", name: "Tanvi S.", role: "React Front-End Intern", status: "Under Review" },
    { id: "a-3", name: "Rohan Das", role: "Full-Stack Dev", status: "Hired" }
  ]);

  const handlePostRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    if (postType === "Internship") {
      onAddInternship({
        id: `int-${Date.now()}`,
        title,
        company,
        location,
        type: "Remote",
        category: "Corporate Posts",
        stipend: stipendOrSalary,
        duration,
        skillsRequired: reqSkills.split(",").map(s => s.trim()),
        description,
        postedDate: new Date().toISOString().split("T")[0],
        isPaid: true
      });
    } else if (postType === "Job") {
      onAddJob({
        id: `job-${Date.now()}`,
        title,
        company,
        location,
        type: "Remote",
        salary: stipendOrSalary,
        skillsRequired: reqSkills.split(",").map(s => s.trim()),
        description,
        postedDate: new Date().toISOString().split("T")[0]
      });
    }

    setSuccessMsg(`✓ Successfully published your ${postType} in the StepUp marketplace!`);
    setTitle("");
    setDescription("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Trigger server-side AI Candidate ranking (Gemini v3.5-flash)
  const handleRankCandidates = async () => {
    setRankingLoading(true);
    setRankedCandidates([]);
    try {
      const response = await fetch("/api/ai/candidate-ranking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: selectedJobForRanking,
          requirements: jobRequirements,
          candidates: mockCandidates
        })
      });
      const data = await response.json();
      setRankedCandidates(data.rankings || []);
    } catch (err) {
      console.error(err);
      // Fallback ranking
      setRankedCandidates([
        { id: "cand-3", name: "Rohan Das", matchPercentage: 92, reasoning: "Outstanding full-stack index with Docker, PostgreSQL, and Express experience." },
        { id: "cand-1", name: "Anish Gupta", matchPercentage: 81, reasoning: "Strong front-end coding achievements with TS and React core values." }
      ]);
    } finally {
      setRankingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 text-left">
      
      {/* Recruiter Header index */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">StepUp Elite <span className="text-emerald-400">Recruiter Control Hub</span></h1>
          <p className="text-xs text-gray-300">Deploy screening tools, audit job applications, and coordinate candidate rank indices.</p>
        </div>

        {/* Tab switches */}
        <div className="flex bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          <button 
            onClick={() => setActivePane("dashboard")} 
            className={`px-3 py-1.5 rounded-md ${activePane === "dashboard" ? "bg-white text-slate-900 shadow-xs" : "text-gray-400 hover:text-white"}`}
          >
            Hiring Overview & Applicants
          </button>
          <button 
            onClick={() => setActivePane("post")} 
            className={`px-3 py-1.5 rounded-md ${activePane === "post" ? "bg-white text-slate-900 shadow-xs" : "text-gray-400 hover:text-white"}`}
          >
            Post Internship / Job
          </button>
          <button 
            onClick={() => setActivePane("ranking")} 
            className={`px-3 py-1.5 rounded-md ${activePane === "ranking" ? "bg-white text-slate-900 shadow-xs" : "text-gray-400 hover:text-white"}`}
          >
            AI Candidate Screening
          </button>
        </div>
      </div>

      {/* Pane 1: HIRING OVERVIEW & RE-CHARTS SIMULATORS */}
      {activePane === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Counters columns */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Numeric Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border p-4 rounded-xl bg-white shadow-xs">
                <p className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">Active Postings</p>
                <p className="text-2xl font-black text-slate-900 mt-1">12</p>
              </div>
              <div className="border p-4 rounded-xl bg-white shadow-xs">
                <p className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">Under Review</p>
                <p className="text-2xl font-black text-slate-900 mt-1">45</p>
              </div>
              <div className="border p-4 rounded-xl bg-white shadow-xs">
                <p className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">Interviews Today</p>
                <p className="text-2xl font-black text-slate-900 mt-1">4</p>
              </div>
            </div>

            {/* Application List */}
            <div className="bg-white border rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="font-bold text-sm text-slate-900">Manage Job Applications</h3>
                <span className="text-[10px] font-mono text-gray-400">Total 3 Resumes Submitted</span>
              </div>

              <div className="space-y-2">
                {applications.map(app => (
                  <div key={app.id} className="p-3 border rounded-xl flex items-center justify-between text-xs bg-gray-50/50">
                    <div>
                      <p className="font-bold text-slate-900">{app.name}</p>
                      <p className="text-[10px] text-gray-400">{app.role}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded select-none">
                        {app.status}
                      </span>
                      
                      <button 
                        onClick={() => {
                          setApplications(prev => prev.map(a => a.id === app.id ? {...a, status: "Hired"} : a));
                        }}
                        className="px-2 py-1 bg-slate-900 text-white font-bold text-[10px] rounded"
                      >
                        Hire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter hiring funnel analytics representation */}
            <div className="bg-white border p-6 rounded-2xl space-y-4">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Recruitment Funnel Metrics (Sandbox)</p>
              
              <div className="space-y-2 text-xs leading-none">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">1. Applications Collected</span>
                    <span className="font-bold">120 Profiles</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 w-full rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 pt-2">
                    <span className="text-gray-500">2. ATS Filter Bypassed</span>
                    <span className="font-bold">45 candidates</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 w-[38%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 pt-2">
                    <span className="text-gray-500">3. Shortlisted / Interviewed</span>
                    <span className="font-bold">14 candidates</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 w-[12%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right column: Company profile and Billing settings */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border rounded-2xl p-5 space-y-3">
              <p className="text-xs font-extrabold text-slate-900">Partner Corporate Profile</p>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white text-lg font-bold flex items-center justify-center">
                  V
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Vercel Systems Inc.</h4>
                  <p className="text-[10px] text-gray-400">Enterprise Hiring Level</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-normal">
                Configured with automatic Stripe escrow releasing rules matching verified candidate progress logging logs.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
              <p className="text-xs font-bold text-emerald-400">Subscription & Payments Setup</p>
              <p className="text-[11px] text-slate-300">
                You are currently on the **StepUp Enterprise Unlimited** pipeline. Release limits: $5,000 / month payload.
              </p>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800">
                <span>Stripe Card ending: 4242</span>
                <span className="font-bold text-emerald-400 font-mono">Active</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Pane 2: POST ROLE EXPRESS */}
      {activePane === "post" && (
        <form onSubmit={handlePostRole} className="max-w-2xl mx-auto bg-white border p-6 md:p-8 rounded-3xl space-y-6 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Publish Career Opportunities</h2>
            <p className="text-xs text-gray-500">Insert details below to index role immediately into the student exploration matrices.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Post Focus</label>
              <select
                value={postType}
                onChange={(e: any) => setPostType(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50"
              >
                <option value="Internship">Paid College Internship</option>
                <option value="Job">Entry level / Fresher Jobs</option>
                <option value="Freelance Project">Freelance Micro Gig</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Target Job Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Senior TypeScript Layout Programmer"
                className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Stipend or Salary Index</label>
              <input
                type="text"
                value={stipendOrSalary}
                onChange={(e) => setStipendOrSalary(e.target.value)}
                placeholder="E.g., $1,800 / month"
                className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Duration (Internships)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="E.g., 6 Months"
                className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Required Skills Tag (Comma split)</label>
            <input
              type="text"
              value={reqSkills}
              onChange={(e) => setReqSkills(e.target.value)}
              placeholder="E.g., React, TypeScript, Tailwind CSS, SQL"
              className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Role Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the target objectives..."
              className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
          >
            Publish Live Opportunity
          </button>

          {successMsg && (
            <div className="p-3 bg-emerald-55 text-emerald-800 text-[11px] rounded-lg text-center font-bold">
              {successMsg}
            </div>
          )}
        </form>
      )}

      {/* Pane 3: AI SCREENING CANDIDATES */}
      {activePane === "ranking" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">AI Candidate Ranking Tool</h2>
            <p className="text-xs text-gray-400 font-medium">Coordinate candidates matching percentages dynamically powered by Gemini 3.5-flash evaluation checks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Input requirements */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-mono text-gray-405 uppercase mb-1 font-bold">Target Job Role</label>
                <input
                  type="text"
                  value={selectedJobForRanking}
                  onChange={(e) => setSelectedJobForRanking(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-gray-50 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-405 uppercase mb-1 font-bold">Matching Requirements checklist</label>
                <textarea
                  rows={5}
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  className="w-full px-3 py-2 border bg-gray-50 focus:bg-white text-xs rounded-xl outline-none"
                />
              </div>

              <button
                onClick={handleRankCandidates}
                disabled={rankingLoading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-750 font-bold text-white text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                {rankingLoading ? "Contacting Gemini..." : "Rank Candidates database"}
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Candidate database rank matches */}
            <div className="md:col-span-7 bg-slate-950 p-6 rounded-2xl text-white text-left space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[10px] font-mono text-emerald-400">
                <span>● REAL-TIME CANDIDATES SCREENING DATA</span>
                <span>MATCH INDICES ACTIVE</span>
              </div>

              {rankedCandidates.length === 0 ? (
                <div className="p-12 text-center text-gray-500 text-xs italic">
                  No scan completed yet. Enter job briefs and click "Rank Candidates database".
                </div>
              ) : (
                <div className="space-y-3">
                  {rankedCandidates.map((cand, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 border border-slate-850 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-100">{cand.name}</p>
                          <p className="text-[10px] text-gray-400">Candidate match priority score</p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded font-mono font-bold text-xs ring-1 ring-emerald-500/20">
                          {cand.matchPercentage}% match
                        </span>
                      </div>
                      <p className="text-xs text-gray-350 leading-relaxed mt-2 p-2 bg-slate-950 rounded">
                        Gemini reasoning: "{cand.reasoning}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
