import React from "react";
import { FaCode, FaMobile, FaLightbulb } from "react-icons/fa";
import styles from "./About.module.scss";
import GlowingText from "../GlowingText/GlowingText";
import SectionTitle from "../SectionTitle/SectionTitle";
// @ts-ignore
const MdCloudUpload = require("react-icons/md").MdCloudUpload;

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

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <SectionTitle basicTitle="" highlightTitle="Who I Am" />
        <div className={styles.aboutContentWrapper}>
          <div className={styles.aboutTextContent}>
            <p className={styles.aboutText}>
              Hi, I’m Ilya — a results-driven Full-Stack Developer with over 3
              years of experience building high-performance web applications for
              growing businesses. I specialize in fast, scalable, and
              user-friendly solutions that convert visitors into customers and
              streamline operations. My approach is simple: clean code,
              business-oriented logic, and a relentless focus on what matters —
              your goals. No delays. No bloat. Just measurable results.
            </p>

            <div className={styles.skillBars}>
              <h3 className={styles.skillsTitle}>Technical Skills</h3>
              {technologies.map((tech) => (
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
            <SectionTitle basicTitle="" highlightTitle="Services" />
            <div className={styles.servicesList}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <FaCode />
                </div>
                <h4 className={styles.serviceTitle}>Web Development</h4>
                <p className={styles.serviceDesc}>
                  Creating modern, responsive websites that help businesses
                  attract customers, increase engagement, and grow online.
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {/* @ts-ignore */}
                  <MdCloudUpload size={24} />
                </div>
                <h4 className={styles.serviceTitle}>Deployment</h4>
                <p className={styles.serviceDesc}>
                  End-to-end deployment: optimized builds, global CDN,
                  lightning-fast load times, and full SEO optimization.
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <FaMobile />
                </div>
                <h4 className={styles.serviceTitle}>Mobile-First Design</h4>
                <p className={styles.serviceDesc}>
                  Designing for all devices, ensuring a flawless experience that
                  keeps users engaged.
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

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <FaCode />
                </div>
                <h4 className={styles.serviceTitle}>Telegram Bots</h4>
                <p className={styles.serviceDesc}>
                  Custom bots that automate workflows, enhance customer support,
                  and integrate with your services — directly inside Telegram.
                  Fast to deploy, powerful in function, and fully tailored to
                  your business needs.
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <FaLightbulb />
                </div>
                <h4 className={styles.serviceTitle}>
                  Internal Tools & Dashboards
                </h4>
                <p className={styles.serviceDesc}>
                  Building powerful admin panels, CRMs, and data dashboards that
                  give your team full control and visibility. Intuitive UI,
                  secure access, and full alignment with your business
                  processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
