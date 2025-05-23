import { useEffect, useRef } from "react";
import styles from "./Works.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moodern from "../../assets/img/moodern.png";
import portfolio1 from "../../assets/img/portfolio1.png";
import webAgency from "../../assets/img/web-agency.png";
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
      title: "Web agency",
      description:
        "Web agency website with a modern and responsive animated design",
      tech: ["Next.js", "Tailwind", "Aceternity"],
      imageUrl: webAgency,
      githubUrl: "https://github.com/IlyaRozhok/web-agency-ptf",
      liveUrl: "https://web-agency-liart.vercel.app/",
    },
    {
      id: "project2",
      title: "Design studio",
      description: "Commercial and private interiors",
      tech: ["React", "email.js", "SCSS"],
      imageUrl: moodern,
      githubUrl: "https://github.com/IlyaRozhok/maramus",
      liveUrl: "https://moodern-studio.com/",
    },
    {
      id: "project3",
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio website with interactive UI elements and animations.",
      tech: ["React", "GSAP", "SCSS"],
      imageUrl: portfolio1,
      githubUrl: "https://github.com/IlyaRozhok/frontend",
      liveUrl: "https://project3-demo.com",
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
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

    if (worksRef.current) {
      const workItems = worksRef.current.querySelectorAll(
        `.${styles.workItem}`
      );

      workItems.forEach((item, index) => {
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
