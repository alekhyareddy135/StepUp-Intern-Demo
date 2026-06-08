export interface UserProfile {
  name: string;
  email: string;
  role: "student" | "recruiter" | "admin" | "public";
  avatar: string;
  rating?: number;
  badgeCount: number;
  atsScore: number;
  escrowWallet: number;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "On-site" | "Hybrid" | "Work From Home";
  category: string;
  stipend: string;
  duration: string;
  skillsRequired: string[];
  description: string;
  postedDate: string;
  isPaid: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "On-site" | "Part-time" | "Full-time" | "Entry Level" | "Fresher";
  salary: string;
  skillsRequired: string[];
  description: string;
  postedDate: string;
}

export interface FreelanceProject {
  id: string;
  title: string;
  category: "Logo Design" | "Web Development" | "Content Writing" | "Marketing" | "Data Entry";
  budget: string;
  client: string;
  duration: string;
  description: string;
  skillsRequired: string[];
}

export interface SuccessStory {
  id: string;
  studentName: string;
  roleWon: string;
  company: string;
  quote: string;
  story: string;
  avatar: string;
}

export interface SkillChallenge {
  id: string;
  title: string;
  type: "Coding" | "Design" | "Marketing" | "Content Writing";
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  question: string;
  completed?: boolean;
}

export interface InternshipApplication {
  id: string;
  internshipId: string;
  title: string;
  company: string;
  appliedDate: string;
  status: "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
}

export interface ResumeData {
  title: string;
  summary: string;
  education: string;
  experience: string;
  skills: string[];
  projects: string;
}

export interface DailyLog {
  id: string;
  date: string;
  task: string;
  hours: number;
  status: "Completed" | "Pending";
  feedback?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
