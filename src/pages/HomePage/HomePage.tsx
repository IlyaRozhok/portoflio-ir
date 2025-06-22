import React, { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import type { IconType } from "react-icons";
import profileImage from "../../assets/img/photo.jpg";
import ContactForm from "../../components/ContactForm/ContactForm";
import GlowingText from "../../components/GlowingText/GlowingText";

// Tech stack icons and labels
const technologies = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "NestJS", level: 80 },
  { name: "Express", level: 85 },
  { name: "PostgreSQL", level: 82 },
  { name: "MongoDB", level: 80 },
];

interface HomePageProps {
  onContactClick?: () => void;
  displayForm?: boolean;
}

const EmailIcon = MdEmail as IconType;
const GithubIcon = FaGithub as IconType;
const LinkedinIcon = FaLinkedin as IconType;

const HomePage: React.FC<HomePageProps> = ({ onContactClick, displayForm }) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    if (onContactClick) {
      onContactClick();
    }
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className={styles.homeWrapper}>
      <header className={styles.animatedHeader}>
        <div className={styles.headerContent}>
          <div className={styles.socialIconsContainer}>
            <a
              href="mailto:i_rozhok@icloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="Email"
            >
              <EmailIcon size={24} />
            </a>
            <a
              href="https://github.com/IlyaRozhok"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="GitHub"
            >
              <GithubIcon size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ilya-rozhok/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={24} />
            </a>
          </div>
          <button
            className={styles.headerContactButton}
            onClick={handleContactClick}
          >
            <EmailIcon size={20} style={{ marginRight: "8px" }} /> Get in Touch
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>
            <GlowingText text="DIGITAL SOLUTIONS" />
          </h1>
          <p className={styles.codeComment}>
            // Hi all. My name is Illia Rozhok. I build scalable products,
            websites, bots, and internal tools From modern landing pages to
            Telegram bots and business dashboards — I deliver solutions that
            help teams save time, grow faster, and impress users.
          </p>
          <p className={styles.codeRole}>
            <span className={styles.arrowSymbol}>&gt;</span>{" "}
            <span className={styles.roleText}>
              Web apps, bots & automation. From UI to API.
            </span>
            {cursorVisible && <span className={styles.cursor}></span>}
          </p>
        </div>

        <div className={styles.profileAndCodeContainer}>
          <div className={styles.profileFrame}>
            <div className={styles.profileFrameHeader}>
              <span
                className={styles.dot}
                style={{ background: "#FF5F57" }}
              ></span>
              <span
                className={styles.dot}
                style={{ background: "#FEBC2E" }}
              ></span>
              <span
                className={styles.dot}
                style={{ background: "#28C840" }}
              ></span>
            </div>
            <img
              src={profileImage}
              alt="Illia Rozhok"
              className={styles.profileImage}
            />
          </div>

          <div className={styles.codeBlock}>
            <p className={styles.commentLine}>// my email</p>
            <p className={styles.codeLine}>
              <span className={styles.keyword}>const</span>{" "}
              <span className={styles.variable}> email</span> ={" "}
              <span className={styles.string}>"i_rozhok@icloud.com"</span>;
            </p>
            <p className={styles.commentLine}>// you can check my GitHub</p>
            <p className={styles.codeLine}>
              <span className={styles.keyword}>const</span>{" "}
              <span className={styles.variable}> githubLink</span> ={" "}
              <span className={styles.string}>
                "https://github.com/IllyaRozhok"
              </span>
              ;
            </p>
            <p className={styles.commentLine}>// you can check my LinkedIn</p>
            <p className={styles.codeLine}>
              <span className={styles.keyword}>const</span>{" "}
              <span className={styles.variable}> linkedinPage</span> ={" "}
              <span className={styles.string}>
                "https://www.linkedin.com/in/ilya-rozhok/"
              </span>
              ;
            </p>
          </div>
        </div>
      </main>

      {isContactModalOpen && (
        <ContactForm isOpen={isContactModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HomePage;
