import React, { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.scss";
import { FaCode, FaMobile, FaLightbulb } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import type { IconType } from "react-icons";
import profileImage from "../../assets/img/about.png";
import ContactForm from "../../components/ContactForm/ContactForm";

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
      {/* Rich Background Layers */}

      {/* Vignette Overlay */}
      {/* <div className={styles.vignette}></div> */}

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
          <div className={styles.modernTitleContainer}>
            <h1 className={styles.modernTitle}>
              <span className={styles.titleLine}>WEBSITE</span>
              <span className={styles.titleLine}>DEVELOPMENT</span>
            </h1>
            <div className={styles.titleAccent}></div>
          </div>
          <p className={styles.codeComment}>
            // Hi all. My name is Illia Rozhok. I am
          </p>
          <p className={styles.codeRole}>
            <span className={styles.arrowSymbol}>&gt;</span>{" "}
            <span className={styles.roleText}>Full-stack developer</span>
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
              <span className={styles.profileFileName}>profile.jpeg</span>
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

      {/* Section Connector for seamless transition */}
      <div className={styles.sectionConnector}></div>

      {/* About Me Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.aboutContentWrapper}>
            <div className={styles.aboutTextContent}>
              <p className={styles.aboutText}>
                I'm a passionate full-stack developer with expertise in creating
                modern, responsive, and user-friendly web applications. With a
                strong foundation in both front-end and back-end technologies, I
                specialize in building seamless digital experiences that combine
                beautiful interfaces with robust functionality.
              </p>
              <p className={styles.aboutText}>
                My approach to development is focused on creating clean,
                maintainable code that delivers exceptional performance and user
                experience. I'm constantly learning new technologies and
                methodologies to stay at the forefront of web development.
              </p>

              <div className={styles.skillBars}>
                <h3 className={styles.skillsTitle}>Technical Skills</h3>
                {technologies.map((tech, index) => (
                  <div key={tech.name} className={styles.skillBar}>
                    <div className={styles.skillBarLabel}>{tech.name}</div>
                    <div className={styles.skillBarOuter}>
                      <div
                        className={styles.skillBarInner}
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                    <div className={styles.skillBarPercent}>{tech.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.servicesContainer}>
              <h3 className={styles.servicesTitle}>Services I Offer</h3>
              <div className={styles.servicesList}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <FaCode />
                  </div>
                  <h4 className={styles.serviceTitle}>Web Development</h4>
                  <p className={styles.serviceDesc}>
                    Creating modern, responsive websites and web applications
                    using the latest technologies.
                  </p>
                </div>

                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <FaMobile />
                  </div>
                  <h4 className={styles.serviceTitle}>Mobile-First Design</h4>
                  <p className={styles.serviceDesc}>
                    Building applications that work flawlessly across all
                    devices and screen sizes.
                  </p>
                </div>

                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <FaLightbulb />
                  </div>
                  <h4 className={styles.serviceTitle}>Technical Consulting</h4>
                  <p className={styles.serviceDesc}>
                    Providing expert advice on technology stack selection and
                    architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactForm isOpen={isContactModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;
