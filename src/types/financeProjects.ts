// src/types/financeProjects.ts

export interface FinanceProject {
    // Mongo / backend identifiers (optional, depending on how you serialize)
    id?: string;
    _id?: { $oid: string } | string;

    // Core info
    title: string;
    slug: string;

    summary: string;
    category: string;          // e.g. "valuation", "risk analysis", "forecasting"
    status: string;            // "completed" | "in-progress" | ...

    // Methodology / tooling
    tech_stack: string[];      // e.g. ["Python", "Pandas"]
    methods: string[];         // e.g. ["DCF", "Monte Carlo"]
    assumptions: string[];     // key assumptions

    // Metrics & charts
    key_metrics: Record<string, unknown>; // flexible: EV/EBITDA, IRR, VaR, etc.
    charts: string[];                     // chart URLs or identifiers

    // Main analysis content
    analysis_markdown: string;   // long-form markdown report
    analysis_sections: string[]; // section titles or per-section markdown ids

    // Assets
    attachments: string[];       // file names / URLs to PDFs, Excel, etc.
    images: string[];            // image URLs
    videos: string[];            // video URLs or IDs

    // Tags / metadata
    tags: string[];

    start_date?: string | null;
    end_date?: string | null;
    created_at?: string | null;

    private: boolean;
}
