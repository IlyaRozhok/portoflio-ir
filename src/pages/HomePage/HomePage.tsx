import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Approach from '../Approach/Approach';
import Works from '../Works/Works';
import styles from './HomePage.module.scss';
import { FaCode, FaMobile, FaLightbulb } from 'react-icons/fa';
import profileImage from '../../assets/img/about.png';

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

const HomePage: React.FC = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const radialHighlightRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const techBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const profileFrameRef = useRef<HTMLDivElement>(null);
  const profileDetailsRef = useRef<HTMLDivElement>(null);

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Parallax for background elements
    if (radialHighlightRef.current) {
      gsap.to(radialHighlightRef.current, {
        y: 120,
        scrollTrigger: {
          trigger: document.body,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          toggleActions: "play reverse play reverse",
          onLeaveBack: () => {
            // Reset position when scrolling back to top
            gsap.to(radialHighlightRef.current, {
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        },
      });
    }

    if (vignetteRef.current) {
      gsap.to(vignetteRef.current, {
        y: 60,
        scrollTrigger: {
          trigger: document.body,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          toggleActions: "play reverse play reverse",
          onLeaveBack: () => {
            // Reset position when scrolling back to top
            gsap.to(vignetteRef.current, {
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animation for tech bars
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
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
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
          ease: 'power3.out',
        }
      );
      
      // Animate profile details lines
      const codeLines = profileDetailsRef.current.querySelectorAll(`.${styles.codeLine}`);
      gsap.fromTo(
        codeLines,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 1,
          ease: 'power2.out',
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.homePage}>
      {/* Hero Section with Code Style */}
      <section className={styles.heroSection}>
        
        <div className={styles.codeContainer}>
        <h1 className={styles.codeName}>WEBSITE DEVELOPMENT</h1>
          <div className={styles.codeComment}>// Hi all. My name is Illia Rozhok. I am</div>
          
          <div className={styles.codeRole}>
            <span className={styles.arrowSymbol}>&gt;</span> 
            <span className={styles.roleText}>Full-stack developer</span>
            <span className={styles.cursor} style={{ opacity: cursorVisible ? 1 : 0 }}>_</span>
          </div>
          
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
                  <img src={profileImage} alt="Illia Rozhok" className={styles.profileImage} />
                </div>
                <div className={styles.codeFrameFooter}>
                  <span className={styles.codeComment}>// Full Stack Developer</span>
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
                <span className={styles.stringValue}>"your-email@example.com"</span>
                <span className={styles.semicolon}>;</span>
              </div>
              
              <div className={styles.codeLine}>
                <span className={styles.codeComment}>// you can check my GitHub</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.constKeyword}>const</span> 
                <span className={styles.variableName}> githubLink </span>
                <span className={styles.operator}>= </span>
                <span className={styles.stringValue}>"https://github.com/yourusername"</span>
                <span className={styles.semicolon}>;</span>
              </div>
              
              <div className={styles.codeLine}>
                <span className={styles.codeComment}>// you can check my LinkedIn</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.constKeyword}>const</span> 
                <span className={styles.variableName}> linkedinPage </span>
                <span className={styles.operator}>= </span>
                <span className={styles.stringValue}>"https://www.linkedin.com/in/yourusername"</span>
                <span className={styles.semicolon}>;</span>
              </div>
              
              <div className={styles.socialLinks}>
                <span className={styles.findMeText}>find me in:</span>
                <a href="https://twitter.com/yourusername" className={styles.socialIcon}>
                  <FaCode />
                </a>
                <a href="https://github.com/yourusername" className={styles.socialIcon}>
                  <FaCode />
                </a>
                <a href="https://linkedin.com/in/yourusername" className={styles.socialIcon}>
                  <FaCode />
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.socialLinks}>
            <span className={styles.findMeText}>find me in:</span>
            <a href="https://twitter.com/yourusername" className={styles.socialIcon}>
              <FaCode />
            </a>
            <a href="https://github.com/yourusername" className={styles.socialIcon}>
              <FaCode />
            </a>
            <a href="https://linkedin.com/in/yourusername" className={styles.socialIcon}>
              <FaCode />
            </a>
          </div>
        </div>
      </section>

      <div className={styles.contentWrapper} ref={contentRef}>
        {/* Tech Stack Section */}
        <section className={styles.techStackSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.highlight}>Tech</span> Stack
          </h2>
          <div className={styles.techGrid}>
            {technologies.map((tech, index) => (
              <div key={index} className={styles.techItem}>
                <div className={styles.techHeader}>
                  <span className={styles.techName}>{tech.name}</span>
                  <span className={styles.techLevel}>{tech.level}%</span>
                </div>
                <div className={styles.techBarBg}>
                  <div 
                    className={styles.techBar} 
                    ref={el => { techBarRefs.current[index] = el; }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        

      </div>
      <Approach />
    </div>
  );
};

export default HomePage; 