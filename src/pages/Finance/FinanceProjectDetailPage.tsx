import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { fetchFinanceProjBySlug } from "../../api/client";
import type { FinanceProject } from "../../types/financeProjects";
import styles from "./FinanceProjectDetailPage.module.css";

// Optional: If you want markdown rendering:
// import ReactMarkdown from "react-markdown";

export default function FinanceProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<FinanceProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        fetchFinanceProjBySlug(slug)
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <>
                <NavBar />
                <div className={styles.wrapper}>Loading finance project…</div>
            </>
        );
    }

    if (!project || error) {
        return (
            <>
                <NavBar />
                <div className={styles.wrapper}>
                    <p className={styles.error}>Finance project not found</p>
                    <Link to="/finance">← Back to Finance Projects</Link>
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
        private: isPrivate
    } = project;

    return (
        <>
            <NavBar />
            <div className={styles.wrapper}>

                {/* Header */}
                <header className={styles.header}>
                    <div>
                        <p className={styles.domain}>Finance Project</p>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.summary}>{summary}</p>
                    </div>

                    <div className={styles.meta}>
                        {category && <p><span>Category:</span> {category}</p>}
                        {status && <p><span>Status:</span> {status}</p>}
                        {(start_date || end_date) && (
                            <p>
                                <span>Timeline:</span>{" "}
                                {start_date || "Unknown"} → {end_date || "Present"}
                            </p>
                        )}
                        {created_at && (
                            <p><span>Created:</span> {new Date(created_at).toLocaleDateString()}</p>
                        )}
                        {isPrivate && (
                            <p className={styles.privateBadge}>Private Project</p>
                        )}
                    </div>
                </header>

                <hr className={styles.divider} />

                {/* Tags */}
                {tags.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Tags</h2>
                        <div className={styles.tagContainer}>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Metrics */}
                {Object.keys(key_metrics).length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Key Metrics</h2>
                        <table className={styles.metricsTable}>
                            <tbody>
                                {Object.entries(key_metrics).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className={styles.metricKey}>{key}</td>
                                        <td className={styles.metricValue}>{String(value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {/* Tech & methods */}
                <section className={styles.sectionGrid}>
                    {tech_stack.length > 0 && (
                        <div>
                            <h2 className={styles.sectionTitle}>Tech Stack</h2>
                            <div className={styles.pillContainer}>
                                {tech_stack.map((t) => (
                                    <span key={t} className={styles.pill}>{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {methods.length > 0 && (
                        <div>
                            <h2 className={styles.sectionTitle}>Methods</h2>
                            <div className={styles.pillContainer}>
                                {methods.map((m) => (
                                    <span key={m} className={styles.pill}>{m}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Assumptions */}
                {assumptions.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Assumptions</h2>
                        <ul className={styles.list}>
                            {assumptions.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Analysis / markdown */}
                {analysis_markdown && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Detailed Analysis</h2>

                        {/* Markdown renderer optional */}
                        {/* <ReactMarkdown className={styles.markdown}>{analysis_markdown}</ReactMarkdown> */}

                        <div className={styles.markdownFallback}>
                            {analysis_markdown}
                        </div>
                    </section>
                )}

                {/* Attachments */}
                {attachments.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Attachments</h2>
                        <div className={styles.attachmentList}>
                            {attachments.map((att) => (
                                <a
                                    key={att}
                                    href={att}
                                    className={styles.attachment}
                                    target="_blank"
                                >
                                    {att}
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                <footer className={styles.footer}>
                    <Link to="/finance" className={styles.backLink}>
                        ← Back to Finance Projects
                    </Link>
                </footer>
            </div>
        </>
    );
}
