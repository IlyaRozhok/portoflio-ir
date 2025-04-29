import { useEffect, useRef, useState } from 'react';
import styles from './Works.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const [activeWork, setActiveWork] = useState(0);
  
  // Sample work items - replace with your actual projects
  const works: WorkItem[] = [
    {
      id: 'project1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with admin dashboard, user authentication, and payment processing.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: 'https://via.placeholder.com/800x600/0a1929/61dafb?text=E-Commerce+Project',
      githubUrl: 'https://github.com/yourusername/project1',
      liveUrl: 'https://project1-demo.com'
    },
    {
      id: 'project2',
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team collaboration features.',
      tech: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind'],
      imageUrl: 'https://via.placeholder.com/800x600/0a1929/61dafb?text=Task+Management+App',
      githubUrl: 'https://github.com/yourusername/project2',
      liveUrl: 'https://project2-demo.com'
    },
    {
      id: 'project3',
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with interactive UI elements and animations.',
      tech: ['React', 'GSAP', 'SCSS', 'Netlify'],
      imageUrl: 'https://via.placeholder.com/800x600/0a1929/61dafb?text=Portfolio+Project',
      githubUrl: 'https://github.com/yourusername/project3',
      liveUrl: 'https://project3-demo.com'
    }
  ];

  useEffect(() => {
    // Main section animation
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

    // Parallax effect for the background code elements
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current.querySelectorAll(`.${styles.codeElement}`), {
        y: (i) => -150 - i * 80, // Increased movement for more dramatic effect
        x: (i) => (i % 2 === 0 ? 50 : -50), // Add slight horizontal movement
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8, // Smoother scrubbing
        },
      });
    }

    // Work items reveal animation
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

  // Generate random positions for code elements in the background
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
    
    // Increase number of elements for more density
    for (let i = 0; i < 25; i++) {
      const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      elements.push(
        <div 
          key={i} 
          className={styles.codeElement}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15 + (Math.random() * 0.15), // Increased opacity range
            transform: `rotate(${(Math.random() * 6) - 3}deg)`,
            fontSize: `${1.0 + (Math.random() * 0.6)}rem` // Increased font size
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
              onMouseEnter={() => setActiveWork(index)}
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