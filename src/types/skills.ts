export interface ProjectReference{
    collection: string;
    slug: string;
}

export interface SoftwareSkill{
    id: string;
    name: string;
    subcategory?: string | null;
    level?: string | null;
    years_experience?: number | null;
    description?: string | null;
    keywords: string[];
    used_in_projects: ProjectReference[];
    certifications_related: string[];
}