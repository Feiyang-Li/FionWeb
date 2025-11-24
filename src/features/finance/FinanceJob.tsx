import { useEffect, useState } from "react";
import { fetchFinanceJobExperience } from "../../api/client";
import styles from "./stylesheet/FinanceJob.module.css";

export default function FinanceJob() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFinanceJobExperience();
        const sorted = [...data].sort((a: any, b: any) => {
          const ao = a.display_order ?? 9999;
          const bo = b.display_order ?? 9999;
          if (ao !== bo) return ao - bo;
          return (b.start_date || "").localeCompare(a.start_date || "");
        });
        setJobs(sorted);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Failed to load job experience");
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  return (
    <section className={styles.jobSection}>
      {loading && <p className={styles.stateText}>Loading job experience...</p>}
      {error && <p className={styles.errorText}>Error: {error}</p>}
      {!loading && !error && jobs.length === 0 && <p className={styles.stateText}>No roles added yet.</p>}

      <div className={styles.jobList}>
        {jobs.map((job) => (
          <article key={job.id} className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <div className={styles.companyInfo}>
                {job.company_logo_url && <img src={job.company_logo_url} alt={job.company_name} className={styles.companyLogo} />}
                <div>
                  <h3 className={styles.jobTitle}>{job.title || job.role}</h3>
                  <p className={styles.companyName}>{job.company_name}</p>
                  <div className={styles.metaRow}>{job.employment_type && <span className={styles.metaBadge}>{job.employment_type}</span>}{job.department && <span className={styles.metaBadge}>{job.department}</span>}</div>
                </div>
              </div>

              <div className={styles.jobDetailsRight}>
                <p className={styles.dateRange}>{job.start_date} – {job.is_current ? "Present" : job.end_date || "N/A"}</p>
                {job.company_location && <p className={styles.location}>{job.company_location}</p>}
              </div>
            </div>

            {job.summary && <p className={styles.summary}>{job.summary}</p>}

            <div className={styles.columns}>
              <div className={styles.column}>
                {job.responsibilities?.length > 0 && <div className={styles.sectionBlock}><span className={styles.sectionLabel}>Responsibilities</span><ul className={styles.bulletList}>{job.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul></div>}
                {job.achievements?.length > 0 && <div className={styles.sectionBlock}><span className={styles.sectionLabel}>Achievements</span><ul className={styles.bulletList}>{job.achievements.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul></div>}
              </div>

              <div className={styles.column}>
                {job.skills_used?.length > 0 && <div className={styles.sectionBlock}><span className={styles.sectionLabel}>Skills</span><div className={styles.chipRow}>{job.skills_used.map((s: string) => <span key={s} className={styles.chip}>{s}</span>)}</div></div>}
                {job.tech_stack?.length > 0 && <div className={styles.sectionBlock}><span className={styles.sectionLabel}>Tech</span><div className={styles.chipRow}>{job.tech_stack.map((t: string) => <span key={t} className={styles.chipAlt}>{t}</span>)}</div></div>}
                {job.impact_metrics?.length > 0 && <div className={styles.sectionBlock}><span className={styles.sectionLabel}>Impact</span><div className={styles.metricsList}>{job.impact_metrics.map((m: any, i: number) => <div key={i} className={styles.metricItem}><div className={styles.metricLabel}>{m.label}</div><div className={styles.metricValue}>{m.value}</div>{m.description && <div className={styles.metricDescription}>{m.description}</div>}</div>)}</div></div>}
              </div>
            </div>

            <div className={styles.footerRow}>
              <div className={styles.tagRow}>{job.tags?.map((tag: string) => <span key={tag} className={styles.tagChip}>{tag}</span>)}</div>
              <div className={styles.linksRow}>{job.company_website && <a className={styles.link} href={job.company_website} target="_blank" rel="noreferrer">Website</a>}{job.reference_letter_url && <a className={styles.link} href={job.reference_letter_url} target="_blank" rel="noreferrer">Reference</a>}{job.certificate_url && <a className={styles.link} href={job.certificate_url} target="_blank" rel="noreferrer">Certificate</a>}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
