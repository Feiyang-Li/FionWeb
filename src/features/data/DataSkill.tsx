import { useEffect, useState } from "react";
import { fetchDataSkills } from "../../api/client";
import { ProjectReference } from "../../types/skills";
import styles from "./stylesheet/DataSkill.module.css";

export default function DataSkillSection() {
  const [skills, setSkills] = useState<any[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSkills() {
      try {
        setSkillsLoading(true);
        const data = await fetchDataSkills();
        setSkills(data);
      } catch (err: any) {
        console.error(err);
        setSkillsError(err.message ?? "Failed to load skills");
      } finally {
        setSkillsLoading(false);
      }
    }
    loadSkills();
  }, []);

  if (skillsLoading) return <div className={styles.tempLoading}>Loading skills...</div>;
  if (skillsError) return <p className={styles.tempError} style={{ color: "red" }}>Error: {skillsError}</p>;

  return (
    <section className={styles.skillSection}>
      {skills.length === 0 && (
        <p className={styles.emptyState}>No skills found yet.</p>
      )}

      <div className={styles.skillGrid}>
        {skills.map((skill: any) => (
          <article key={skill.id} className={styles.skillCard}>
            <header className={styles.skillHeader}>
              <div>
                <h3 className={styles.skillName}>{skill.name}</h3>
                {skill.subcategory && (
                  <p className={styles.skillSubcategory}>{skill.subcategory}</p>
                )}
              </div>
              <div className={styles.skillMeta}>
                <span className={styles.levelBadge}>{skill.level}</span>
                <span className={styles.yearsBadge}>
                  {skill.years_experience} yr{skill.years_experience !== 1 ? "s" : ""} exp
                </span>
              </div>
            </header>

            {skill.description && (
              <p className={styles.skillDescription}>{skill.description}</p>
            )}

            {skill.keywords?.length > 0 && (
              <div className={styles.skillKeywords}>
                {skill.keywords.map((kw: string) => (
                  <span key={kw} className={styles.keywordChip}>{kw}</span>
                ))}
              </div>
            )}

            {skill.used_in_projects?.length > 0 && (
              <div className={styles.skillProjects}>
                <span className={styles.sectionLabel}>Used in projects:</span>
                <div className={styles.projectList}>
                  {skill.used_in_projects.map((p: ProjectReference) => (
                    <span key={`${p.collection}-${p.slug}`} className={styles.projectChip}>{p.slug}</span>
                  ))}
                </div>
              </div>
            )}

            {skill.certification_related?.length > 0 && (
              <div className={styles.skillCerts}>
                <span className={styles.sectionLabel}>Related certifications:</span>
                <div className={styles.certList}>
                  {skill.certification_related.map((c: string) => (
                    <span key={c} className={styles.certChip}>{c}</span>
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
