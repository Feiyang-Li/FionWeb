// src/pages/Finance/FinanceProjectDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { fetchFinanceProjBySlug } from "../../api/client";
import type { FinanceProject } from "../../types/financeProjects";
import styles from "./FinanceProjectDetailPage.module.css";

// ⬇️ NEW: markdown imports (same as SoftwareProjectDetailPage)
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function FinanceProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<FinanceProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        setError(null);

        fetchFinanceProjBySlug(slug)
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load finance project");
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <>
                <NavBar />
                <div className={styles.wrapper}>
                    <p>Loading finance project…</p>
                </div>
            </>
        );
    }

    if (error || !project) {
        return (
            <>
                <NavBar />
                <div className={styles.wrapper}>
                    <p className={styles.error}>{error ?? "Project not found"}</p>
                    <Link to="/finance" className={styles.backLink}>
                        ← Back to finance projects
                    </Link>
                </div>
            </>
        );
    }

    const {
        title,
        summary,
        category,
        status,
        tech_stack,
        methods,
        assumptions,
        key_metrics,
        charts,
        analysis_markdown,
        analysis_sections,
        attachments,
        images,
        videos,
        tags,
        start_date,
        end_date,
        created_at,
        private: isPrivate,
    } = project;

    const displayStart = start_date ? new Date(start_date).toLocaleDateString() : null;
    const displayEnd = end_date ? new Date(end_date).toLocaleDateString() : "Present";
    const created = created_at ? new Date(created_at).toLocaleDateString() : null;

    return (
        <>
            <NavBar />
            <div className={styles.wrapper}>
                {/* Header */}
                <header className={styles.header}>
                    <div>
                        <p className={styles.domain}>Finance Project</p>
                        <h1 className={styles.title}>{title}</h1>
                        {summary && <p className={styles.summary}>{summary}</p>}
                    </div>

                    <div className={styles.meta}>
                        {category && (
                            <p>
                                <span>Category: </span>
                                {category}
                            </p>
                        )}
                        {status && (
                            <p>
                                <span>Status: </span>
                                {status}
                            </p>
                        )}
                        {(displayStart || displayEnd) && (
                            <p>
                                <span>Timeline: </span>
                                {displayStart ?? "Unknown"} – {displayEnd}
                            </p>
                        )}
                        {created && (
                            <p>
                                <span>Created: </span>
                                {created}
                            </p>
                        )}
                        {isPrivate && (
                            <p className={styles.privateBadge}>
                                Private details (redacted)
                            </p>
                        )}
                        {tags && tags.length > 0 && (
                            <div className={styles.tagContainer}>
                                {tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                <hr className={styles.divider} />

                {/* Main content */}
                <main>
                    {/* Tech stack & methods */}
                    {(tech_stack?.length || methods?.length) && (
                        <section className={styles.section}>
                            <div className={styles.sectionGrid}>
                                {tech_stack && tech_stack.length > 0 && (
                                    <div>
                                        <h2 className={styles.sectionTitle}>Tech Stack</h2>
                                        <div className={styles.pillContainer}>
                                            {tech_stack.map((t) => (
                                                <span key={t} className={styles.pill}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {methods && methods.length > 0 && (
                                    <div>
                                        <h2 className={styles.sectionTitle}>Methods</h2>
                                        <div className={styles.pillContainer}>
                                            {methods.map((m) => (
                                                <span key={m} className={styles.pill}>
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Assumptions */}
                    {assumptions && assumptions.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Key Assumptions</h2>
                            <ul className={styles.list}>
                                {assumptions.map((a, i) => (
                                    <li key={i}>{a}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Key metrics */}
                    {key_metrics && Object.keys(key_metrics).length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Key Metrics</h2>
                            <table className={styles.metricsTable}>
                                <tbody>
                                    {Object.entries(key_metrics).map(([k, v]) => (
                                        <tr key={k}>
                                            <td className={styles.metricKey}>{k}</td>
                                            <td className={styles.metricValue}>{String(v)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}

                    {/* Charts */}
                    {charts && charts.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Charts</h2>
                            <ul className={styles.list}>
                                {charts.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Analysis content (Markdown) */}
                    {analysis_markdown && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Analysis</h2>
                            <div className={styles.markdown}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                    components={{
                                        img: ({ src, alt }) => (
                                            <img
                                                src={src!}
                                                alt={alt}
                                                className={styles.markdownImage}
                                            />
                                        ),
                                    }}
                                >
                                    {analysis_markdown}
                                </ReactMarkdown>
                            </div>
                        </section>
                    )}

                    {/* Optional section overview / headings */}
                    {analysis_sections && analysis_sections.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Sections</h2>
                            <ul className={styles.list}>
                                {analysis_sections.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Attachments (AttachmentNode[]) */}
                    {attachments && attachments.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Attachments</h2>
                            <div className={styles.attachmentList}>
                                {attachments.map((att) => (
                                    <a
                                        key={att.url || att.name}
                                        href={att.url}
                                        className={styles.attachment}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {att.name || att.url}
                                        {att.type && ` (${att.type})`}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Images */}
                    {images && images.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Images</h2>
                            <div className={styles.imageGrid}>
                                {images.map((img) => (
                                    <a
                                        key={img}
                                        href={img}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.imageThumb}
                                    >
                                        <img src={img} alt="" />
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Videos */}
                    {videos && videos.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Videos</h2>
                            <ul className={styles.list}>
                                {videos.map((v, i) => (
                                    <li key={i}>
                                        <a
                                            href={v}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.attachment}
                                        >
                                            {v}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>

                <footer className={styles.footer}>
                    <Link to="/finance" className={styles.backLink}>
                        ← Back to finance projects
                    </Link>
                </footer>
            </div>
        </>
    );
}
