// src/pages/Software/SoftwareJob.tsx
import styles from "./stylesheet/SoftwareJob.module.css";
import { useState, useEffect } from "react";
import { fetchSoftwareJobExperience } from "../../api/client";
import type { JobExperience } from "../../types/jobs_experience";

export default function SoftwareJob() {
  const [jobs, setJobs] = useState<JobExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSoftwareJobExperience();
        // sort by display_order ascending, fallback by start_date desc
        const sorted = [...data].sort((a, b) => {
          const ao = a.display_order ?? 9999;
          const bo = b.display_order ?? 9999;
          if (ao !== bo) return ao - bo;

          // fallback: most recent first
          return (b.start_date || "").localeCompare(a.start_date || "");
        });
        setJobs(sorted);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Failed to load software job experience");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  return (
    <section className={styles.softwareJobSection}>

      {loading && <p className={styles.stateText}>Loading software jobs...</p>}
      {error && <p className={styles.errorText}>Error: {error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p className={styles.stateText}>No software roles added yet.</p>
      )}

      <div className={styles.jobList}>
        {jobs.map((job) => (
          <article key={job.id} className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <div className={styles.companyInfo}>
                {job.company_logo_url && (
                  <img
                    src={job.company_logo_url}
                    alt={job.company_name}
                    className={styles.companyLogo}
                  />
                )}
                <div>
                  <h3 className={styles.jobTitle}>{job.job_title}</h3>
                  <p className={styles.companyName}>{job.company_name}</p>
                  <div className={styles.metaRow}>
                    {job.employment_type && (
                      <span className={styles.metaBadge}>{job.employment_type}</span>
                    )}
                    {job.department && (
                      <span className={styles.metaBadge}>{job.department}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.jobDetailsRight}>
                <p className={styles.dateRange}>
                  {job.start_date} –{" "}
                  {job.is_current ? "Present" : job.end_date || "N/A"}
                </p>
                {job.company_location && (
                  <p className={styles.location}>{job.company_location}</p>
                )}
              </div>
            </div>

            {job.summary && (
              <p className={styles.summary}>{job.summary}</p>
            )}

            <div className={styles.columns}>
              {/* Responsibilities / Achievements */}
              <div className={styles.column}>
                {job.responsibilities.length > 0 && (
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.sectionLabel}>Responsibilities</h4>
                    <ul className={styles.bulletList}>
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.achievements.length > 0 && (
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.sectionLabel}>Achievements</h4>
                    <ul className={styles.bulletList}>
                      {job.achievements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Skills / Tech / Metrics */}
              <div className={styles.column}>
                {job.skills_used.length > 0 && (
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.sectionLabel}>Skills Used</h4>
                    <div className={styles.chipRow}>
                      {job.skills_used.map((skill) => (
                        <span key={skill} className={styles.chip}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.tech_stack.length > 0 && (
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.sectionLabel}>Tech Stack</h4>
                    <div className={styles.chipRow}>
                      {job.tech_stack.map((tech) => (
                        <span key={tech} className={styles.chipAlt}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.impact_metrics.length > 0 && (
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.sectionLabel}>Impact</h4>
                    <div className={styles.metricsList}>
                      {job.impact_metrics.map((m, idx) => (
                        <div key={idx} className={styles.metricItem}>
                          <span className={styles.metricLabel}>{m.metric}</span>
                          <span className={styles.metricValue}>{m.value}</span>
                          {m.description && (
                            <p className={styles.metricDescription}>{m.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags / Links */}
            <div className={styles.footerRow}>
              <div className={styles.tagRow}>
                {job.tags.map((tag) => (
                  <span key={tag} className={styles.tagChip}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.linksRow}>
                {job.company_website && (
                  <a
                    href={job.company_website}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    Company Site
                  </a>
                )}
                {job.reference_letter_url && (
                  <a
                    href={job.reference_letter_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    Reference Letter
                  </a>
                )}
                {job.certificate_url && (
                  <a
                    href={job.certificate_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    Certificate
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
