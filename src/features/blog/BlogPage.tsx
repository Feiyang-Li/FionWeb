import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import styles from "./BlogPage.module.css";

import {
    fetchSoftwareProjects,
    fetchDataProjects,
    fetchFinanceProjects,
    fetchGeneralAnalyses,
} from "../../api/client";

type BlogDomain = "software" | "data" | "finance" | "analysis";

interface BlogItem {
    id: string;
    title: string;
    slug: string;
    summary: string;
    created_at?: string;
    tags?: string[];
    status?: string;
    domain: BlogDomain;
    // optional extra for analyses
    category?: string;
}

function parseDate(value?: string): number {
    if (!value) return 0;
    const t = Date.parse(value);
    return Number.isNaN(t) ? 0 : t;
}

function getDomainLabel(domain: BlogDomain): string {
    switch (domain) {
        case "software":
            return "Software Project";
        case "data":
            return "Data Project";
        case "finance":
            return "Finance Project";
        case "analysis":
            return "General Analysis";
        default:
            return "Entry";
    }
}

function getDomainColorClass(domain: BlogDomain): string {
    switch (domain) {
        case "software":
            return styles.badgeSoftware;
        case "data":
            return styles.badgeData;
        case "finance":
            return styles.badgeFinance;
        case "analysis":
            return styles.badgeAnalysis;
        default:
            return styles.badgeSoftware;
    }
}

// Return internal route paths (use react-router `Link` to navigate)
function getEntryUrl(item: BlogItem): string {
    switch (item.domain) {
        case "software":
            return `/software/projects/${item.slug}`;
        case "data":
            return `/data/projects/${item.slug}`;
        case "finance":
            return `/finance/projects/${item.slug}`;
        case "analysis":
            return `/blog/analysis/${item.slug}`;
        default:
            return `/${item.domain}/${item.slug}`;
    }
}

export default function BlogPage() {
    const [items, setItems] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);

                const [software, data, finance, analyses] = await Promise.all([
                    fetchSoftwareProjects(),
                    fetchDataProjects(),
                    fetchFinanceProjects(),
                    fetchGeneralAnalyses("published"),
                ]);

                const normalized: BlogItem[] = [
                    ...(software ?? []).map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        slug: p.slug,
                        summary: p.summary,
                        created_at: p.created_at,
                        tags: p.tags ?? [],
                        status: p.status,
                        domain: "software" as const,
                    })),
                    ...(data ?? []).map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        slug: p.slug,
                        summary: p.summary,
                        created_at: p.created_at,
                        tags: p.tags ?? [],
                        status: p.status,
                        domain: "data" as const,
                    })),
                    ...(finance ?? []).map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        slug: p.slug,
                        summary: p.summary,
                        created_at: p.created_at,
                        tags: p.tags ?? [],
                        status: p.status,
                        domain: "finance" as const,
                    })),
                    ...(analyses ?? []).map((a: any) => ({
                        id: a.id,
                        title: a.title,
                        slug: a.slug,
                        // fall back to content_markdown if summary empty
                        summary: a.summary && a.summary.length > 0
                            ? a.summary
                            : (a.content_markdown ?? "").slice(0, 160) + "...",
                        created_at: a.created_at,
                        tags: a.tags ?? [],
                        status: a.status,
                        domain: "analysis" as const,
                        category: a.category,
                    })),
                ];

                // Sort by created_at (newest first)
                normalized.sort(
                    (a, b) => parseDate(b.created_at) - parseDate(a.created_at)
                );

                setItems(normalized);
            } catch (err: any) {
                console.error(err);
                setError(err.message ?? "Failed to load journal entries");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return (
        <>
            <NavBar />
            <main className={styles.blogPage}>
                <div className={styles.blogContainer}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>Feiyang Li Journal</h1>
                        <p className={styles.subtitle}>
                            A timeline of recent thoughts, analysis, and projects.
                        </p>
                    </header>

                    {loading && (
                        <p className={styles.stateText}>Loading recent entries...</p>
                    )}

                    {error && (
                        <p className={styles.errorText}>Error: {error}</p>
                    )}

                    {!loading && !error && items.length === 0 && (
                        <p className={styles.stateText}>
                            No entries yet. Come back after thinking or building something cool. ✨
                        </p>
                    )}

                    <section className={styles.list}>
                        {items.map((item) => (
                            <article key={item.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.badgeRow}>
                                        <span
                                            className={`${styles.domainBadge} ${getDomainColorClass(
                                                item.domain
                                            )}`}
                                        >
                                            {getDomainLabel(item.domain)}
                                        </span>
                                        {item.category && item.domain === "analysis" && (
                                            <span className={styles.statusBadge}>
                                                {item.category}
                                            </span>
                                        )}
                                        {item.status && item.domain !== "analysis" && (
                                            <span className={styles.statusBadge}>
                                                {item.status}
                                            </span>
                                        )}
                                    </div>

                                    {item.created_at && (
                                        <p className={styles.dateText}>
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <h2 className={styles.cardTitle}>{item.title}</h2>

                                <p className={styles.summary}>{item.summary}</p>

                                {item.tags && item.tags.length > 0 && (
                                    <div className={styles.tagRow}>
                                        {item.tags.map((tag) => (
                                            <span key={tag} className={styles.tagChip}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className={styles.cardFooter}>
                                    <Link to={getEntryUrl(item)} className={styles.readMoreLink}>
                                        Read more →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            </main>
        </>
    );
}
