export type JobRole = 'Trek Guide' | 'Tour Organizer' | 'Web Developer' | 'Content Writer' | 'Marketing Manager';

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: JobRole;
  experience: number;
  resume: string; // URL to stored resume
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'rejected';
  appliedAt: string;
}