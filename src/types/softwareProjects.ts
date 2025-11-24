// src/types/softwareProjects.ts

export interface SoftwareProject {
    // depending on how backend serializes, keep both forms flexible
    id?: string;
    title: string;
    slug: string;
    summary?: string;
    description_markdown?: string;

    tech_stack?: string[];
    architecture?: string[];
    role?: string;
    features?: string[];
    challenges?: string[];
    images?: string[];
    videos?: string[];

    github_url?: string;
    demo_url?: string;

    status?: string;
    tags?: string[];
    start_date?: string | null;
    end_date?: string | null;
    created_at?: string;
    private?: boolean;
}
