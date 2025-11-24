import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { fetchGeneralBySlug } from "../../api/client";   // You must create this
import type { BlogPost } from "../../types/blog";
import styles from "./BlogDetailPage.module.css";

// Optional markdown renderer:
// import ReactMarkdown from "react-markdown";

export default function BlogDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        fetchGeneralBySlug(slug)
            .then((data) => {
                setPost(data);
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
                <div className={styles.wrapper}>Loading article…</div>
            </>
        );
    }

    if (!post || error) {
        return (
            <>
                <NavBar />
                <div className={styles.wrapper}>
                    <p className={styles.error}>Article not found.</p>
                    <Link to="/blog">← Back to Blog</Link>
                </div>
            </>
        );
    }

    const {
        title,
        summary,
        category,
        subtopics,
        status,
        is_pinned,
        hero_image_url,
        related_domain,
        related_projects,
        reading_time_minutes,
        created_at,
        updated_at,
        tags,
        content_markdown,
    } = post;

    const created = created_at ? new Date(created_at).toLocaleDateString() : "";
    const updated = updated_at ? new Date(updated_at).toLocaleDateString() : "";

    return (
        <>
            <NavBar />
            <div className={styles.wrapper}>
                
                {/* Hero Image */}
                {hero_image_url && (
                    <div className={styles.heroContainer}>
                        <img src={hero_image_url} alt={title} className={styles.heroImage} />
                    </div>
                )}

                {/* Header */}
                <article className={styles.article}>
                    <div className={styles.category}>{category.toUpperCase()}</div>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.summary}>{summary}</p>

                    {/* Metadata */}
                    <div className={styles.metaRow}>
                        <span>{created}</span>
                        <span>•</span>
                        <span>{reading_time_minutes} min read</span>
                        {is_pinned && (
                            <>
                                <span>•</span>
                                <span className={styles.pinned}>Pinned Article</span>
                            </>
                        )}
                    </div>

                    <hr className={styles.divider}/>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className={styles.tagContainer}>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* Content */}
                    <div className={styles.content}>
                        {/* Markdown optional: */}
                        {/* <ReactMarkdown>{content_markdown}</ReactMarkdown> */}

                        <div className={styles.markdownFallback}>
                            {content_markdown}
                        </div>
                    </div>

                    {/* Related Projects */}
                    {related_projects.length > 0 && (
                        <section className={styles.relatedSection}>
                            <h3 className={styles.relatedHeader}>Related Projects</h3>
                            <ul className={styles.relatedList}>
                                {related_projects.map((rp, idx) => (
                                    <li key={idx}>
                                        <Link to={`/${rp.collection.replace("_", "-")}/projects/${rp.slug}`}>
                                            → {rp.slug}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <footer className={styles.footer}>
                        <Link to="/blog" className={styles.backLink}>
                            ← Back to Blog
                        </Link>
                    </footer>

                </article>
            </div>
        </>
    );
}
