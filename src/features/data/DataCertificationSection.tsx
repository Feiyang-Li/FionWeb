import { useEffect, useState } from "react";
import { fetchDataCertifications } from "../../api/client";
import styles from "./stylesheet/DataCertificationSection.module.css";
import type { Certificant } from "../../types/certificant";

export default function DataCertificationSection() {
  const [certs, setCerts] = useState<Certificant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCerts() {
      try {
        setLoading(true);
        const data = await fetchDataCertifications();
        setCerts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Failed to load certifications");
      } finally {
        setLoading(false);
      }
    }

    loadCerts();
  }, []);

  if (loading) {
    return (
      <div className={styles.tempLoading}>Loading certifications...</div>
    );
  }

  if (error) {
    return (
      <p className={styles.tempError} style={{ color: "red" }}>
        Error: {error}
      </p>
    );
  }

  return (
    <section className={styles.certSection}>
      {certs.length === 0 && (
        <p className={styles.emptyState}>No certifications found.</p>
      )}

      <div className={styles.certGrid}>
        {certs.map((cert) => (
          <article key={cert.id} className={styles.certCard}>
            <header className={styles.certHeader}>
              <div>
                <h3 className={styles.certName}>{cert.name}</h3>
                <p className={styles.certIssuer}>{cert.issuer}</p>
              </div>
              <div className={styles.certMeta}>
                {cert.domain && (
                  <span className={styles.domainPill}>{cert.domain}</span>
                )}
                <span
                  className={`${styles.statusBadge} ${
                    cert.status === "completed"
                      ? styles.statusCompleted
                      : styles.statusInProgress
                  }`}
                >
                  {cert.status}
                </span>
              </div>
            </header>

            {cert.description && (
              <p className={styles.certDescription}>{cert.description}</p>
            )}

            <div className={styles.certDatesRow}>
              {cert.issue_date && (
                <span className={styles.dateItem}>Issued: {cert.issue_date}</span>
              )}
              {cert.expected_completion && cert.status === "in-progress" && (
                <span className={styles.dateItem}>ETA: {cert.expected_completion}</span>
              )}
              {cert.expiry_date && (
                <span className={styles.dateItem}>Expires: {cert.expiry_date}</span>
              )}
            </div>

            {cert.skills_covered?.length > 0 && (
              <div className={styles.certSkills}>
                <span className={styles.sectionLabel}>Skills:</span>
                <div className={styles.skillChipRow}>
                  {cert.skills_covered.map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cert.related_projects?.length > 0 && (
              <div className={styles.certProjects}>
                <span className={styles.sectionLabel}>Related projects:</span>
                <div className={styles.projectChipRow}>
                  {cert.related_projects.map((p) => (
                    <span key={`${p.collection}-${p.slug}`} className={styles.projectChip}>
                      {p.slug || `${p.collection}/${p.slug}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cert.tags?.length > 0 && (
              <div className={styles.certTags}>
                <div className={styles.tagChipRow}>
                  {cert.tags.map((tag) => (
                    <span key={tag} className={styles.tagChip}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
