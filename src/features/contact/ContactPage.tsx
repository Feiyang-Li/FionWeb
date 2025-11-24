import NavBar from "../../components/NavBar";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
    // TODO: replace with your actual Cloudinary image URL
    const avatarUrl = "_The_School_of_Athens__by_Raffaello_Sanzio_da_Urbino.jpg";
    return (
        <>
            <NavBar />
            <div className={styles.page}>
                {/* Dark overlay + blurred background handled in CSS */}
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <div className={styles.card}>
                        {/* Top: avatar + name */}
                        <div className={styles.headerRow}>
                            <img
                                src={avatarUrl}
                                alt="Feiyang Li"
                                className={styles.avatar}
                            />
                            <div>
                                <h1 className={styles.name}>Feiyang Li</h1>
                                <p className={styles.title}>
                                    Software · Data · Finance
                                </p>
                            </div>
                        </div>

                        {/* Short intro */}
                        <p className={styles.intro}>
                            I’m always open to new opportunities, collaborations,
                            and interesting problems to solve. The best way to
                            reach me is by email or LinkedIn. Feel free to say
                            hi and share what you’re working on.
                        </p>

                        {/* Contact info grid */}
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Email</span>
                                <a
                                    href="mailto:feiyang.f.li@gmail.com"
                                    className={styles.valueLink}
                                >
                                    feiyang.f.li@gmail.com
                                </a>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>GitHub</span>
                                <a
                                    href="https://github.com/Feiyang-Li"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.valueLink}
                                >
                                    github.com/Feiyang-Li
                                </a>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>LinkedIn</span>
                                <a
                                    href="https://www.linkedin.com/in/feiyangli/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.valueLink}
                                >
                                    linkedin.com/in/feiyangli
                                </a>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Website</span>
                                <a href="/" className={styles.valueLink}>
                                    Home page
                                </a>
                            </div>
                        </div>

                        {/* Call-to-action buttons */}
                        <div className={styles.actions}>
                            <a
                                href="mailto:feiyang.f.li@gmail.com"
                                className={styles.primaryButton}
                            >
                                Email Me
                            </a>
                            <a
                                href="https://www.linkedin.com/in/feiyangli/"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.secondaryButton}
                            >
                                Connect on LinkedIn
                            </a>
                        </div>

                        <p className={styles.footerNote}>
                            Audentes Fortuna iuvat.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
