export interface ImpactMetric {
  metric: string;
  value: string;
  description?: string;
}

export interface ProjectReference {
  collection: string;
  slug: string;
}

export interface JobExperience {
  // MongoDB id (stringified)
  id: string;

  // Company info
  company_name: string;
  company_logo_url?: string;
  company_location?: string;
  company_industry?: string;

  // Job info
  job_title: string;
  employment_type?: string; // "Full-time" | "Internship" | etc.
  department?: string;
  domain: string;           // "software" | "data" | "finance" | ...

  // Dates
  start_date: string;       // YYYY-MM-DD
  end_date?: string | null; // null if current
  is_current: boolean;

  // Summary
  summary?: string;

  // Details
  responsibilities: string[];
  achievements: string[];
  impact_metrics: ImpactMetric[];

  // Skills / tech
  skills_used: string[];
  tech_stack: string[];

  // Linked projects
  projects: ProjectReference[];

  // Extra files
  company_website?: string;
  reference_letter_url?: string;
  certificate_url?: string;

  // Metadata
  tags: string[];
  display_order?: number;

  // Control
  created_at?: string;
  private: boolean;
}

// For API responses like GET /job-experiences
export type JobExperienceList = JobExperience[];