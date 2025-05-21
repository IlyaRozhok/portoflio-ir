import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HomePage.module.scss";
import { FaCode, FaMobile, FaLightbulb } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import type { IconType } from "react-icons";
import profileImage from "../../assets/img/about.png";
import ContactForm from "../../components/ContactForm/ContactForm";

gsap.registerPlugin(ScrollTrigger);

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
}

const EmailIcon = MdEmail as IconType;
const GithubIcon = FaGithub as IconType;
const LinkedinIcon = FaLinkedin as IconType;

const HomePage: React.FC<HomePageProps> = ({ onContactClick }) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const radialHighlightRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const techBarRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const profileFrameRef = useRef<HTMLDivElement>(null);
  const profileDetailsRef = useRef<HTMLDivElement>(null);

  const aboutMeRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  // Set up refs for skill bars
  const setTechBarRef = (el: HTMLDivElement | null, index: number) => {
    techBarRefs.current[index] = el;
  };

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Animate hero button
    if (heroButtonRef.current) {
      gsap.fromTo(
        heroButtonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.5,
          ease: "power2.out",
        }
      );
    }

    // Parallax for background elements
    if (radialHighlightRef.current) {
      gsap.to(radialHighlightRef.current, {
        y: 120,
        scrollTrigger: {
          trigger: document.body,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play reverse play reverse",
          onLeaveBack: () => {
            // Reset position when scrolling back to top
            gsap.to(radialHighlightRef.current, {
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        },
      });
    }

    if (vignetteRef.current) {
      gsap.to(vignetteRef.current, {
        y: 60,
        scrollTrigger: {
          trigger: document.body,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          toggleActions: "play reverse play reverse",
          onLeaveBack: () => {
            // Reset position when scrolling back to top
            gsap.to(vignetteRef.current, {
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        },
      });
    }

    // Animate bio section
    if (bioRef.current) {
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate about me section
    if (aboutMeRef.current) {
      gsap.fromTo(
        aboutMeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutMeRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate contact section
    if (contactSectionRef.current) {
      gsap.fromTo(
        contactSectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate skills section
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animation for tech bars
    techBarRefs.current.forEach((bar, idx) => {
      if (!bar) return;

      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${technologies[idx].level}%`,
          duration: 1.5,
          delay: 0.5 + idx * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Profile animation
    if (profileFrameRef.current && profileDetailsRef.current) {
      // Animate profile frame
      gsap.fromTo(
        profileFrameRef.current,
        { opacity: 0, y: 20, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      // Animate profile details lines
      const codeLines = profileDetailsRef.current.querySelectorAll(
        `.${styles.codeLine}`
      );
      gsap.fromTo(
        codeLines,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 1,
          ease: "power2.out",
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleContactButtonClick = () => {
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <div className={styles.homePage}>


      <section className={styles.heroSection}>
        <div className={styles.codeContainer}>
          <h1 className={styles.codeName}>WEssBSITE DEVELOPMENT</h1>
          <div className={styles.codeComment}>
            // Hi all. My name is Illia Rozhok. I am
          </div>
          <div className={styles.codeRole}>
            <span className={styles.arrowSymbol}>&gt;</span>
            <span className={styles.roleText}>Full-stack developer</span>
            <span
              className={styles.cursor}
              style={{ opacity: cursorVisible ? 1 : 0 }}
            >
              _
            </span>
          </div>

          <button
            className={styles.heroContactButton}
            onClick={handleContactButtonClick}
            ref={heroButtonRef}
          >
            <EmailIcon className={styles.heroContactIcon} />
            <span>Get in Touch</span>
          </button>

          <div className={styles.profileContainer}>
            <div className={styles.profileImageWrapper}>
              <div className={styles.codeFrame} ref={profileFrameRef}>
                <div className={styles.codeFrameHeader}>
                  <span className={styles.codeFrameDot}></span>
                  <span className={styles.codeFrameDot}></span>
                  <span className={styles.codeFrameDot}></span>
                  <span className={styles.codeFrameTitle}>profile.jpeg</span>
                </div>
                <div className={styles.codeFrameContent}>
                  <img
                    src={profileImage}
                    alt="Illia Rozhok"
                    className={styles.profileImage}
                  />
                </div>
                <div className={styles.codeFrameFooter}>
                  <span className={styles.codeComment}>
                    // Full Stack Developer
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.profileDetails} ref={profileDetailsRef}>
              <div className={styles.codeLine}>
                <span className={styles.codeComment}>// my email</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.constKeyword}>const</span>
                <span className={styles.variableName}> email </span>
                <span className={styles.operator}>= </span>
                <span className={styles.stringValue}>
                  "i_rozhok@icloud.com"
                </span>
                <span className={styles.semicolon}>;</span>
              </div>

              <div className={styles.codeLine}>
                <span className={styles.codeComment}>
                  // you can check my GitHub
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.constKeyword}>const</span>
                <span className={styles.variableName}> githubLink </span>
                <span className={styles.operator}>= </span>
                <span className={styles.stringValue}>
                  "https://github.com/IlyaRozhok"
                </span>
                <span className={styles.semicolon}>;</span>
              </div>

              <div className={styles.codeLine}>
                <span className={styles.codeComment}>
                  // you can check my LinkedIn
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.constKeyword}>const</span>
                <span className={styles.variableName}> linkedinPage </span>
                <span className={styles.operator}>= </span>
                <span className={styles.stringValue}>
                  "https://www.linkedin.com/in/ilya-rozhok/"
                </span>
                <span className={styles.semicolon}>;</span>
              </div>

              <div className={styles.codeLinks}>
                <div className={styles.findMeText}>find me in:</div>
                <div className={styles.socialLinks}>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className={styles.aboutSection} ref={aboutMeRef}>
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
                        ref={(el) => setTechBarRef(el, index)}
                        style={{ width: "0%" }}
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

      {/* Contact Section */}
      <section className={styles.contactSection} ref={contactSectionRef}>
        <div className={styles.contactContainer}>
          <h2 className={styles.sectionTitle}>Let's Work Together</h2>
          <p className={styles.contactIntro}>
            Interested in working together? Feel free to reach out and let's
            discuss your project!
          </p>
          <button
            className={styles.contactSectionButton}
            onClick={handleContactButtonClick}
          >
            <EmailIcon className={styles.contactIcon} />
            <span>Contact Me Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
