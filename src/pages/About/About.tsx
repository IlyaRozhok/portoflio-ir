import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.scss';

gsap.registerPlugin(ScrollTrigger);

// Tech stack icons and labels
const technologies = [
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'TypeScript', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'NestJS', level: 80 },
  { name: 'Express', level: 85 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'MongoDB', level: 80 },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const techBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate bio section
    gsap.fromTo(
      bioRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate skills section
    gsap.fromTo(
      skillsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate tech bars
    techBarRefs.current.forEach((bar, idx) => {
      if (!bar) return;
      
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${technologies[idx].level}%`,
          duration: 1.5,
          delay: 0.5 + (idx * 0.1),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.aboutSection + ' ' + styles.aboutBg} id="about" ref={sectionRef}>
      <div className={styles.sectionConnector}></div>
      <h2 className={styles.sectionTitle}>About Me</h2>
      
      <div className={styles.contentContainer}>
        <div className={styles.bioContainer} ref={bioRef}>
          <div className={styles.bioContent}>
            <h3 className={styles.bioTitle}>Transforming Ideas Into Powerful Solutions</h3>
            <p className={styles.bioText}>
              As a passionate Fullstack Developer, I blend creativity with technical expertise to build seamless digital experiences. 
              My approach combines strategic thinking with cutting-edge technologies to deliver solutions that drive business growth.
            </p>
            <p className={styles.bioText}>
              I specialize in developing responsive web applications, robust backend systems, and efficient databases. 
              My goal is to understand your business challenges and create tailored solutions that help you achieve your objectives.
            </p>
            <p className={styles.bioText}>
              Whether you need a complete web platform, API integration, or performance optimization, 
              I work closely with clients to transform their vision into reality with clean, maintainable code.
            </p>
            <div className={styles.cta}>
              <a href="#contact" className={styles.ctaButton}>Get In Touch</a>
            </div>
          </div>
        </div>
        
        <div className={styles.skillsContainer} ref={skillsRef}>
          <h3 className={styles.skillsTitle}>Technology Stack</h3>
          <div className={styles.techStack}>
            {technologies.map((tech, idx) => (
              <div key={tech.name} className={styles.techItem}>
                <div className={styles.techHeader}>
                  <span className={styles.techName}>{tech.name}</span>
                  <span className={styles.techLevel}>{tech.level}%</span>
                </div>
                <div className={styles.techBarBg}>
                  <div 
                    className={styles.techBar} 
                    ref={el => { techBarRefs.current[idx] = el; }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 