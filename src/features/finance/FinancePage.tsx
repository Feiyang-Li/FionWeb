import NavBar from "../../components/NavBar";
import styles from "./stylesheet/FinancePage.module.css";
import FinanceSkillSection from "./FinanceSkill";
import FinanceCertificationSection from "./FinanceCertificationSection";
import FinanceProject from "./FinanceProject";
import FinanceJob from "./FinanceJob";

export default function FinancePage() {
  return (
    <>
      <NavBar />
      <div className={styles.skills_container}>
        <p className={styles.skillsTitle}>Skills</p>
        <div className={styles.skills_list}>
          <FinanceSkillSection />
        </div>
      </div>

      <div className={styles.certifications_container}>
        <p className={styles.certificationTitle}>Certifications</p>
        <div className={styles.certifications_list}>
          <FinanceCertificationSection />
        </div>
      </div>

      <div className={styles.projects_container}>
        <p className={styles.projectsTitle}>Projects</p>
        <div className={styles.projects_list}>
          <FinanceProject />
        </div>
      </div>

      <div className={styles.jobs_container}>
        <p className={styles.jobsTitle}>Finance Job experience</p>
        <FinanceJob />
      </div>
    </>
  );
}
