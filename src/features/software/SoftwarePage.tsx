import NavBar from "../../components/NavBar";
import styles from "./stylesheet/SoftwarePage.module.css";
import SoftwareSkillSection from "./SoftwareSkill.tsx";
import SoftwareCertificationSection from "./SoftwareCertificationSection.tsx";
import SoftwareProject from "./SoftwareProject.tsx";
import SoftwareJob from "./SoftwareJob.tsx";
export default function SoftwarePage() {


    return <>
        <NavBar />
        <div className={styles.skills_container}>
            <p className={styles.skillsTitle}>Skills</p>
            <div className={styles.skills_list}>
                <SoftwareSkillSection />
            </div>
        </div>
        <div className={styles.certifications_container}>
            <p className={styles.certificationTitle}>Certifications</p>
            <div className={styles.certifications_list}>
                <SoftwareCertificationSection />
            </div>
        </div>
        <div className={styles.projects_container}>
            <p className={styles.projectsTitle}>Projects</p>
            <div className={styles.projects_list}>
                <SoftwareProject />
            </div>
        </div>
        <div className={styles.jobs_container}>
            <p className={styles.jobsTitle}>Software Job experience</p>
                <SoftwareJob />
        </div>

    </>
}