// src/pages/Software/SoftwareProjectDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { fetchSoftwareProjBySlug } from "../../api/client";
import type { SoftwareProject } from "../../types/softwareProjects";
import styles from "./SoftwareProjectDetailPage.module.css";

// Optional: if you want markdown rendering, install react-markdown
//   npm install react-markdown
// and then uncomment this line:
// import ReactMarkdown from "react-markdown";

export default function SoftwareProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<SoftwareProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        setError(null);

        fetchSoftwareProjBySlug(slug)
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load project");
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <>
                <NavBar />
                <div className={styles.wrapper}>
                    <p>Loading software project…</p>
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
                    <Link to="/software">← Back to software projects</Link>
                </div>
            </>
        );
    }

    const {
        title,
        summary,
        description_markdown,
        tech_stack,
        architecture,
        role,
        features,
        challenges,
        github_url,
        demo_url,
        status,
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
                <header className={styles.header}>
                    <div className={styles.headerMain}>
                        <p className={styles.domainLabel}>Software Project</p>
                        <h1 className={styles.title}>{title}</h1>
                        {summary && <p className={styles.summary}>{summary}</p>}
                    </div>

                    <div className={styles.meta}>
                        {status && (
                            <p className={styles.metaItem}>
                                <span className={styles.metaLabel}>Status:</span> {status}
                            </p>
                        )}
                        {role && (
                            <p className={styles.metaItem}>
                                <span className={styles.metaLabel}>Role:</span> {role}
                            </p>
                        )}
                        {(displayStart || displayEnd) && (
                            <p className={styles.metaItem}>
                                <span className={styles.metaLabel}>Timeline:</span>{" "}
                                {displayStart ?? "Unknown"} – {displayEnd}
                            </p>
                        )}
                        {created && (
                            <p className={styles.metaItem}>
                                <span className={styles.metaLabel}>Created:</span> {created}
                            </p>
                        )}
                        {isPrivate && (
                            <p className={styles.privateBadge}>Private details (redacted)</p>
                        )}
                        {tags && tags.length > 0 && (
                            <div className={styles.tags}>
                                {tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                <main className={styles.content}>
                    {/* Tech stack & architecture */}
                    {(tech_stack?.length || architecture?.length) && (
                        <section className={styles.pillsSection}>
                            {tech_stack && tech_stack.length > 0 && (
                                <div>
                                    <h2>Tech Stack</h2>
                                    <div className={styles.pills}>
                                        {tech_stack.map((t) => (
                                            <span key={t} className={styles.pill}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {architecture && architecture.length > 0 && (
                                <div>
                                    <h2>Architecture</h2>
                                    <div className={styles.pills}>
                                        {architecture.map((a) => (
                                            <span key={a} className={styles.pill}>
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Description (markdown) */}
                    {description_markdown && (
                        <section>
                            <h2>Overview</h2>

                            {/* If using ReactMarkdown: */}
                            {/* 
                            <ReactMarkdown className={styles.markdown}>
                                {description_markdown}
                            </ReactMarkdown> 
                            */}

                            {/* Fallback: plain text block */}
                            <div className={styles.markdownFallback}>
                                {description_markdown}
                            </div>
                        </section>
                    )}

                    {/* Features */}
                    {features && features.length > 0 && (
                        <section>
                            <h2>Key Features</h2>
                            <ul>
                                {features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Challenges */}
                    {challenges && challenges.length > 0 && (
                        <section>
                            <h2>Challenges & Learnings</h2>
                            <ul>
                                {challenges.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Links */}
                    {(github_url || demo_url) && (
                        <section>
                            <h2>Links</h2>
                            <div className={styles.links}>
                                {github_url && github_url.trim() !== "" && (
                                    <a
                                        href={github_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub Repository
                                    </a>
                                )}
                                {demo_url && demo_url.trim() !== "" && (
                                    <a
                                        href={demo_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </section>
                    )}
                </main>

                <footer className={styles.footer}>
                    <Link to="/software">← Back to software projects</Link>
                </footer>
            </div>
        </>
    );
}
