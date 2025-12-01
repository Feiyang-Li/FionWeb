// src/types/certificant.ts

export interface RelatedProject {
  collection: string;
  slug: string;
}

export interface Certificant {
  id: string;                     // MongoDB ObjectId as string
  name: string;
  slug: string;
  logo: string | null;
  issuer: string;
  domain: string;                 // software | data | finance | etc.
  status: string;                 // "completed" | "in-progress"
  issue_date?: string | null;
  expiry_date?: string | null;
  expected_completion?: string | null;
  credential_id?: string;
  credential_url?: string;
  description?: string;
  skills_covered: string[];       // list of skill slugs or names
  related_projects: RelatedProject[];
  tags: string[];
  created_at?: string;
  private: boolean;
}
