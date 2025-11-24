import NavBar from "../../components/NavBar";
import styles from "./stylesheet/DataPage.module.css";
import DataSkillSection from "./DataSkill";
import DataCertificationSection from "./DataCertificationSection";
import DataProject from "./DataProject";
import DataJob from "./DataJob";

export default function DataPage() {
  return (
    <>
      <NavBar />
      <div className={styles.skills_container}>
        <p className={styles.skillsTitle}>Skills</p>
        <div className={styles.skills_list}>
          <DataSkillSection />
        </div>
      </div>

      <div className={styles.certifications_container}>
        <p className={styles.certificationTitle}>Certifications</p>
        <div className={styles.certifications_list}>
          <DataCertificationSection />
        </div>
      </div>

      <div className={styles.projects_container}>
        <p className={styles.projectsTitle}>Projects</p>
        <div className={styles.projects_list}>
          <DataProject />
        </div>
      </div>

      <div className={styles.jobs_container}>
        <p className={styles.jobsTitle}>Job experience</p>
        <DataJob />
      </div>
    </>
  );
}
