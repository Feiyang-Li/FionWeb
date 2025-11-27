// src/types/financeProjects.ts

export interface AttachmentNode {
    type: string; // e.g. "pdf", "excel", "image"
    name: string; // display name, e.g. "DCF Model.xlsx"
    url: string;  // link to the file
}

export interface FinanceProject {
    // Mongo / backend identifiers (optional)
    id?: string;
    _id?: { $oid: string } | string;

    // Core info
    title: string;
    slug: string;

    summary: string;          // default "" in backend
    category: string;         // e.g. "valuation", "risk analysis", ...
    status: string;           // default "completed"

    // Methodology / tooling
    tech_stack: string[];     // default []
    methods: string[];        // default []
    assumptions: string[];    // default []

    // Metrics & charts
    key_metrics: Record<string, any>; // matches Dict[str, Any]
    charts: string[];                 // chart URLs or names

    // Main analysis content
    analysis_markdown: string;   // default ""
    analysis_sections: string[]; // default []

    // Assets
    attachments: AttachmentNode[]; // 🔄 updated to match backend
    images: string[];
    videos: string[];

    // Tags / metadata
    tags: string[];

    start_date?: string | null;   // backend Optional[str] = ""
    end_date?: string | null;     // backend Optional[str] = ""
    created_at?: string | null;   // backend Optional[str] = ""

    private: boolean;             // backend default True
}
