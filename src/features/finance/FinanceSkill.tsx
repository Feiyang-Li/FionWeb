import { useEffect, useState } from "react";
import { fetchFinanceSkills } from "../../api/client";
import styles from "./stylesheet/FinanceSkill.module.css";

export default function FinanceSkillSection() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchFinanceSkills();
        setSkills(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Failed to load skills");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className={styles.tempLoading}>Loading skills...</div>;
  if (error) return <p className={styles.tempError} style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section className={styles.skillSection}>
      {skills.length === 0 && <p className={styles.emptyState}>No skills found yet.</p>}
      <div className={styles.skillGrid}>
        {skills.map((skill) => (
          <article key={skill.id} className={styles.skillCard}>
            <header className={styles.skillHeader}>
              <div>
                <h3 className={styles.skillName}>{skill.name}</h3>
                {skill.subcategory && <p className={styles.skillSubcategory}>{skill.subcategory}</p>}
              </div>
              <div className={styles.skillMeta}>
                <span className={styles.levelBadge}>{skill.level}</span>
                <span className={styles.yearsBadge}>{skill.years_experience} yr{skill.years_experience !== 1 ? "s" : ""} exp</span>
              </div>
            </header>
            {skill.description && <p className={styles.skillDescription}>{skill.description}</p>}
            {skill.keywords?.length > 0 && <div className={styles.skillKeywords}>{skill.keywords.map((k: string) => <span key={k} className={styles.keywordChip}>{k}</span>)}</div>}
            {skill.used_in_projects?.length > 0 && <div className={styles.skillProjects}><span className={styles.sectionLabel}>Used in projects:</span><div className={styles.projectList}>{skill.used_in_projects.map((p: any) => <span key={`${p.collection}-${p.slug}`} className={styles.projectChip}>{p.slug}</span>)}</div></div>}
            {skill.certification_related?.length > 0 && <div className={styles.skillCerts}><span className={styles.sectionLabel}>Related certifications:</span><div className={styles.certList}>{skill.certification_related.map((c: string) => <span key={c} className={styles.certChip}>{c}</span>)}</div></div>}
          </article>
        ))}
      </div>
    </section>
  );
}
