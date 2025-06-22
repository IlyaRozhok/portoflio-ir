import { useEffect, useRef } from "react";
import styles from "./Works.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moodern from "../../assets/img/moodern.png";
import webAgency from "../../assets/img/web-agency.png";
import finfix from "../../assets/img/finfix.png";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

// Simple SVG Icons as components
const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 6.82l-5.38 5.38 5.38 5.38 1.41-1.41-3.97-3.97 3.97-3.97-1.41-1.41zm8 10.56l5.38-5.38-5.38-5.38-1.41 1.41 3.97 3.97-3.97 3.97 1.41 1.41z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
  </svg>
);

const Works = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);

  const works: WorkItem[] = [
    {
      id: "project1",
      title: "Fake Web Agency",
      description:
        "Built from the ground up. Quick, smooth, and dynamic — modern animations and a seamless user flow.",
      tech: ["Next.js", "Tailwind", "Aceternity"],
      imageUrl: webAgency,
      githubUrl: "https://github.com/IlyaRozhok/web-agency-ptf",
      liveUrl: "https://web-agency-liart.vercel.app/",
    },
    {
      id: "project2",
      title: "Design studio",
      description:
        "A modern, responsive landing page for a digital agency. Focused on sleek animations and clean UI to engage users and showcase services.",
      tech: ["React", "email.js", "SCSS"],
      imageUrl: moodern,
      githubUrl: "https://github.com/IlyaRozhok/maramus",
      liveUrl: "https://moodern-studio.com/",
    },
    {
      id: "project3",
      title: "FinFix | Telegram bot",
      description: `FinFix is a Telegram-based personal finance tracker that helps users manage debts, expenses, and income in a simple chat interface. It offers visual statistics, CSV exports, and full control — without the need for apps or spreadsheets. Designed, created and deployed from scratch`,
      tech: [
        "Node.js",
        "PostgreSQL",
        "Telegraf",
        "Railway",
        "Render",
        "Monobank API",
      ],
      imageUrl: finfix,
      githubUrl: "https://github.com/IlyaRozhok/telegram-bot",
      liveUrl: "https://finfix.vercel.app/",
    },
  ];

  useEffect(() => {
    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (sectionRef.current) {
      if (isMobile) {
        // For mobile devices, set opacity to 1 immediately
        gsap.set(sectionRef.current, { opacity: 1 });
      } else {
        // For desktop, use the original animation
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }

    if (worksRef.current) {
      const workItems = worksRef.current.querySelectorAll(
        `.${styles.workItem}`
      );

      workItems.forEach((item, index) => {
        if (isMobile) {
          // For mobile devices, set opacity to 1 immediately
          gsap.set(item, { opacity: 1, y: 0, scale: 1 });
        } else {
          // For desktop, use the original animation
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: 0.3 + index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.worksSection} id="works" ref={sectionRef}>
      <div className={styles.container}>
        <SectionTitle basicTitle="My" highlightTitle="Projects" />

        <div className={styles.worksContainer} ref={worksRef}>
          {works.map((work, index) => (
            <div key={work.id} className={styles.workItem}>
              <div className={styles.workImageWrapper}>
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className={styles.workImage}
                />
                <div className={styles.workOverlay}>
                  <h3 className={styles.workTitle}>{work.title}</h3>
                  <div className={styles.workLinks}>
                    {work.githubUrl && (
                      <a
                        href={work.githubUrl}
                        className={styles.workLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code"
                      >
                        <CodeIcon />
                        <span>View Source</span>
                      </a>
                    )}
                    {work.liveUrl && (
                      <a
                        href={work.liveUrl}
                        className={styles.workLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live demo"
                      >
                        <ExternalLinkIcon />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.workContent}>
                <p className={styles.workDescription}>{work.description}</p>
                <div className={styles.techStack}>
                  {work.tech.map((tech, i) => (
                    <span key={i} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
