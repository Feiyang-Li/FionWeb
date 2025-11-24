import NavBar from "../../components/NavBar"
import classNames from "classnames"
import styles from "./HomePage.module.css"
import ShortLine from "../../components/ShortLine.tsx"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  
    const [overlayHeight, setOverlayHeight] = useState(window.innerHeight);
    const [balloonOffset, setBalloonOffset] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        function handleScroll() {
            const scrolled = window.scrollY;
            const newHeight = Math.max(window.innerHeight - scrolled, 0);
            setOverlayHeight(newHeight);
            // for ballon
            const factor = 0.4;
            setBalloonOffset(scrolled * factor);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <>
        <div className={styles.HomePageContainer} >
            <div className={styles.topSection}>
                <div className={styles.overlay} style={{ height: overlayHeight }}/>
                <div className={styles.topSectionContent}>
                    <div className={styles.topCenter}>
                        <h1>李飞杨 Fion</h1>
                        <div className={styles.description}>
                            <p>Hi, Nice to meet you! I am Fion and I am a wonderer, a explorer, and a learner. I am always open for new knowledge, willing to try new idea and commited to help. Let us talk</p>
                            <ShortLine length="50px" color="white" className="A"/>
                        </div>
                    </div>
                    <div className={styles.bottomQuote}>
                        <p>Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you. - <strong>Mattew 7:7</strong></p>
                    </div>
                </div>
                <div className={styles.ballonImage} style={{ transform: `translateY(-${balloonOffset}px)` }}>
                    <img src="./bollon_without_background.png" alt="ballon" />
                </div>
            </div>
            <NavBar className={styles.navBar}/>
            <div className={styles.softwareSection}>
                <div className={styles.softwareImage}>
                    <img className={styles.softwareActualImage} src="sky_with_code.png" alt="code in the sky"/> 
                </div>
                <div className={styles.softwareText}>
                    <div className={styles.innerContainer}>
                        <p className={styles.softwareTextTitle}>Software Developer</p>
                        <ShortLine length="70px" color="black" className={styles.SoftwareDevShortLine}/>
                        <p className={styles.softwareTexttext}>Grudated with bachelor of computer science from University of Waterloo, I had multiple exposure and experience with C++, C, Python, GO, Java, and Bash</p>
                        <button className={styles.contactNowButton} onClick={() => navigate("/contact")}>Contact Now</button>
                        <button className={styles.softwareLearnMoreButton} onClick={() => navigate("/software")}>Learn More</button>
                    </div>

                </div>
            </div>
            <div className={styles.dataSection}>
                <div className={styles.dataText}>
                    <div className={styles.innerContainer}> 
                        <p className={styles.dataTextTitle}>Data Science/Engineer</p>
                        <ShortLine length="70px" color="black" className={styles.DataDevShortLine}/>
                        <p className={styles.dataTexttext}>Focused in AI/ML during my University, Coop in multiple companies worked as Analyst and Engineer. Understanding the complete process of process through google data analytic courses</p>
                        <button className={styles.contactNowButton} onClick={() => navigate("/contact")}>Contact Now</button>
                        <button className={styles.dataLearnMoreButton} onClick={() => navigate("/data")}>Learn More</button>
                    </div>
                </div>
                <div className={styles.dataImage}>
                    <img className={styles.dataActualImage} src="leftSkyImage.avif" alt="sky above image"/>
                </div>
            </div>
            <div className={styles.financeSection}>
                <div className={styles.sectionImage}>
                    <img className={styles.sectionActualImage} src="night_sky_mountain.jpg" alt="night sky mountain"/>
                </div>
                <div className={styles.sectionText}>
                    <div className={styles.innerContainer}>
                        <p className={styles.sectionTextTitle}>Finance Specialist</p>
                        <ShortLine length="70px" color="black" className={styles.sectionShortLine}/>
                        <p className={styles.sectionTexttext}>With minor in finance, I have solid understanding of financial market and instruments. Experienced in financial data analysis and risk management through coop experience in banks</p>
                        <button className={styles.contactNowButton} onClick={() => navigate("/contact")}>Contact Now</button>
                        <button className={classNames(styles.financeLearnMoreButton, styles.sectionLearnMoreButton)} onClick={() => navigate("/finance")}>Learn More</button>
                    </div>
                </div>
            </div>
            {/* For the business part I am still working on it so prob not good idea to put it here*/}
            <div className={styles.endingSection}>
                <p className={classNames(styles.thebottombottomOne)}>“For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened. Or what man is there of you, whom if his son ask bread, will he give him a stone? Or if he ask a fish, will he give him a serpent?” - Mattew 8:10</p>
            </div>
        </div>
            
    </>
}