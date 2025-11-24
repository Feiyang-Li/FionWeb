// src/types/blog.ts

export interface ProjectReference {
    collection: string;   // e.g. "finance_projects"
    slug: string;         // slug of the referenced project
}

export interface BlogPost {
    id?: string;          // server-serialized version of _id
    title: string;
    slug: string;

    summary: string;
    content_markdown: string;

    category: string;         // e.g. "finance", "software", "data"
    subtopics: string[];      // e.g. ["gold", "macro", "inflation"]
    status: string;           // "draft" | "published" | "archived"
    is_pinned: boolean;

    hero_image_url?: string;

    related_domain?: string;            // "finance", "software", etc.
    related_projects: ProjectReference[];

    reading_time_minutes: number;

    created_at?: string;
    updated_at?: string;

    tags: string[];

    private: boolean;
}
