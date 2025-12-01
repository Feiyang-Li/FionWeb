import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataProjects } from "../../api/client";
import styles from "./stylesheet/DataProject.module.css";

// Use react-router `Link` for internal navigation so HashRouter handles routing.

export default function DataProject() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchDataProjects();
        data.sort((a: any, b: any) => {
          const dateA = new Date(a.start_date || 0).getTime();
          const dateB = new Date(b.start_date || 0).getTime();
          return dateB - dateA;
        });
        setProjects(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) return <div className={styles.loading}>Loading data projects...</div>;
  if (error) return <p className={styles.error} style={{ color: "red" }}>Error: {error}</p>;

  const getDescriptionSnippet = (markdown?: string, length = 220) => {
    if (!markdown) return "";
    const plain = markdown
      .replace(/[#*_`>-]/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1");
    if (plain.length <= length) return plain;
    return plain.slice(0, length) + "…";
  };

  return (
    <section className={styles.projectSection}>
      {projects.length === 0 && <p className={styles.emptyState}>No projects found yet.</p>}

      <div className={styles.projectTimeline}>
        {projects.map((project: any) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.timelineDot} />
            <div className={styles.cardBody}>
              <header className={styles.cardHeader}>
                <div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.role && <p className={styles.projectRole}>{project.role}</p>}
                </div>
                <div className={styles.projectMeta}>
                  {project.status && (
                    <span className={`${styles.statusBadge} ${project.status === "active" ? styles.statusActive : styles.statusOther}`}>
                      {project.status}
                    </span>
                  )}
                  {project.start_date && (
                    <div className={styles.dateText}>{project.start_date}{project.end_date ? ` — ${project.end_date}` : ""}</div>
                  )}
                </div>
              </header>

              {project.summary && <p className={styles.projectSummary}>{project.summary}</p>}

              {project.description_markdown && (
                <p className={styles.projectDescription}>{getDescriptionSnippet(project.description_markdown)}</p>
              )}

              {project.tech_stack?.length > 0 && (
                <div className={styles.techRow}>
                  <span className={styles.sectionLabel}>Tech:</span>
                  <div className={styles.techChips}>
                    {project.tech_stack.map((t: string) => (
                      <span key={t} className={styles.techChip}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              <footer className={styles.cardFooter}>
                {project.slug && (
                  <Link className={styles.linkButtonGhost} to={`/data/projects/${project.slug}`}>
                    Project page
                  </Link>
                )}
                {project.github_url && (
                  <a className={styles.linkButton} href={project.github_url} target="_blank" rel="noreferrer">GitHub</a>
                )}
                {project.demo_url && (
                  <a className={styles.linkButtonSecondary} href={project.demo_url} target="_blank" rel="noreferrer">Live Demo</a>
                )}
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
