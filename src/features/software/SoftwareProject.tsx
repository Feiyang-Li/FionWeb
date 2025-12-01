import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./stylesheet/SoftwareProject.module.css";
import { fetchSoftwareProjects } from "../../api/client.js";

// Internal links should use react-router `Link` so HashRouter handles routing.

// helper to safely convert date strings to timestamps
function toTime(value?: string | null): number {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

export default function SoftwareProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);

        const data = await fetchSoftwareProjects();
        data.sort((a: any, b: any) => {
          const timeA = toTime(a.created_at || a.start_date);
          const timeB = toTime(b.created_at || b.start_date);
          return timeB - timeA; // latest first
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

  if (loading) {
    return <div className={styles.loading}>Loading software projects...</div>;
  }

  if (error) {
    return (
      <p className={styles.error} style={{ color: "red" }}>
        Error: {error}
      </p>
    );
  }

  // helper to strip markdown and shorten description
  const getDescriptionSnippet = (markdown?: string, length = 220) => {
    if (!markdown) return "";
    const plain = markdown
      .replace(/[#*_`>-]/g, "") // strip basic markdown chars
      .replace(/\[(.*?)\]\(.*?\)/g, "$1"); // [text](link) -> text
    if (plain.length <= length) return plain;
    return plain.slice(0, length) + "…";
  };

  return (
    <section className={styles.projectSection}>
      {projects.length === 0 && (
        <p className={styles.emptyState}>No projects found yet.</p>
      )}

      <div className={styles.projectTimeline}>
        {projects.map((project: any) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.timelineDot} />
            <div className={styles.cardBody}>
              <header className={styles.cardHeader}>
                <div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.role && (
                    <p className={styles.projectRole}>{project.role}</p>
                  )}
                </div>
                <div className={styles.projectMeta}>
                  {project.status && (
                    <span
                      className={`${styles.statusBadge} ${
                        project.status === "active"
                          ? styles.statusActive
                          : styles.statusOther
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                  {project.start_date && (
                    <span className={styles.dateText}>
                      {project.start_date}
                      {project.end_date
                        ? ` → ${project.end_date}`
                        : " → Present"}
                    </span>
                  )}
                </div>
              </header>

              {project.summary && (
                <p className={styles.projectSummary}>{project.summary}</p>
              )}

              {project.description_markdown && (
                <p className={styles.projectDescription}>
                  {getDescriptionSnippet(project.description_markdown)}
                </p>
              )}

              {project.tech_stack?.length > 0 && (
                <div className={styles.techRow}>
                  <span className={styles.sectionLabel}>Tech:</span>
                  <div className={styles.techChips}>
                    {project.tech_stack.map((tech: string) => (
                      <span key={tech} className={styles.techChip}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.architecture?.length > 0 && (
                <div className={styles.archRow}>
                  <span className={styles.sectionLabel}>Architecture:</span>
                  <div className={styles.archChips}>
                    {project.architecture.map((part: string) => (
                      <span key={part} className={styles.archChip}>
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <footer className={styles.cardFooter}>
                {project.slug && (
                  <Link
                    className={styles.linkButtonGhost}
                    to={`/software/projects/${project.slug}`}
                  >
                    Project page
                  </Link>
                )}

                {project.github_url && (
                  <a
                    className={styles.linkButton}
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.demo_url && (
                  <a
                    className={styles.linkButtonSecondary}
                    href={project.demo_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
