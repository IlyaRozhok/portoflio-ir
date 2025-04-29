import React, { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));

    if (scrollTop < windowHeight * 0.5) {
      setActiveSection('home');
    } else {
      setActiveSection('works');
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScroll]);

  useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  return (
    <>
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ 
            width: `${scrollProgress}%`,
            transition: 'width 0.1s linear'
          }}
        />
      </div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a
            href="#home"
            className={`${styles.navLink} ${activeSection === 'home' ? styles.activeLink : ''}`}
          >
            HOME
          </a>
          <a 
            href="#works" 
            className={`${styles.navLink} ${activeSection === 'works' ? styles.activeLink : ''}`}
          >
            WORKS
          </a>
        </nav>
      </header>
    </>
  );
};

export default Header; 