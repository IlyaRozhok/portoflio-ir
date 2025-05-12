import { useEffect, useRef, useState } from 'react';
import styles from './Works.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import moodern from '../../assets/img/moodern.png';
import portfolio1 from '../../assets/img/portfolio1.png';
import webAgency from '../../assets/img/web-agency.png';


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

const Works = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  

  const works: WorkItem[] = [
    {
      id: 'project1',
      title: 'Web agency',
      description: 'Web agency website with a modern and responsive animated design',
      tech: ['Next.js', 'Tailwind', 'Aceternity'],
      imageUrl: webAgency,
      githubUrl: 'https://github.com/IlyaRozhok/web-agency-ptf',
      liveUrl: 'https://web-agency-liart.vercel.app/'
    },
    {
      id: 'project2',
      title: 'Interior design studio',
      description: 'Commercial and private interiors',
      tech: ['React', 'email.js', 'SCSS'],
      imageUrl: moodern,
      githubUrl: 'https://github.com/IlyaRozhok/maramus',
      liveUrl: 'https://moodern-studio.com/'
    },
    {
      id: 'project3',
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with interactive UI elements and animations.',
      tech: ['React', 'GSAP', 'SCSS'],
      imageUrl: portfolio1,
      githubUrl: 'https://github.com/IlyaRozhok/frontend',
      liveUrl: 'https://project3-demo.com'
    }
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
            start: 'top 80%',
          },
        }
      );
    }

  
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current.querySelectorAll(`.${styles.codeElement}`), {
        y: (i) => -150 - i * 80, 
        x: (i) => (i % 2 === 0 ? 50 : -50), 
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8, 
        },
      });
    }

    
    if (worksRef.current) {
      const workItems = worksRef.current.querySelectorAll(`.${styles.workItem}`);
      
      workItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: 0.3 + (index * 0.15),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  
  const generateCodeElements = () => {
    const elements = [];
    const codeSnippets = [
      'const createProject = () => {',
      'function deployApp(config) {',
      'import React from "react";',
      '<div className="container">',
      'useEffect(() => {',
      'export default Works;',
      'npm install gsap',
      'git commit -m "Add feature"',
      'const [state, setState] = useState();',
      '.then(data => setProjects(data))',
      'border-radius: 4px;',
      '@media (max-width: 768px) {',
      'grid-template-columns: repeat(3, 1fr);'
    ];
    
    
    for (let i = 0; i < 25; i++) {
      const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      elements.push(
        <div 
          key={i} 
          className={styles.codeElement}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15 + (Math.random() * 0.15), 
            transform: `rotate(${(Math.random() * 6) - 3}deg)`,
            fontSize: `${1.0 + (Math.random() * 0.6)}rem` 
          }}
        >
          {randomSnippet}
        </div>
      );
    }
    return elements;
  };

  return (
    <section className={styles.worksSection} id="works" ref={sectionRef}>
      <div className={styles.parallaxBackground} ref={parallaxRef}>
        {generateCodeElements()}
      </div>
      
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.codeComment}>// My</span> <span className={styles.highlight}>Projects</span>
        </h2>
        
        <div className={styles.worksContainer} ref={worksRef}>
          {works.map((work, index) => (
            <div 
              key={work.id} 
              className={`${styles.workItem}`}
            >
              <div className={styles.workImageWrapper}>
                <img src={work.imageUrl} alt={work.title} className={styles.workImage} />
                <div className={styles.workOverlay}>
                  <h3 className={styles.workTitle}>{work.title}</h3>
                  <div className={styles.workLinks}>
                    {work.githubUrl && (
                      <a href={work.githubUrl} className={styles.workLink} target="_blank" rel="noopener noreferrer">
                        <span className={styles.constKeyword}>const</span> 
                        <span className={styles.variableName}> source </span>
                        <span className={styles.operator}>= </span>
                        <span className={styles.stringValue}>"View Code"</span>
                        <span className={styles.semicolon}>;</span>
                      </a>
                    )}
                    {work.liveUrl && (
                      <a href={work.liveUrl} className={styles.workLink} target="_blank" rel="noopener noreferrer">
                        <span className={styles.constKeyword}>const</span> 
                        <span className={styles.variableName}> demo </span>
                        <span className={styles.operator}>= </span>
                        <span className={styles.stringValue}>"Live Demo"</span>
                        <span className={styles.semicolon}>;</span>
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
                      <span className={styles.tagImport}>import</span> {tech}
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