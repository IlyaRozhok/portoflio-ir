import { useEffect, useRef, ReactElement } from 'react';
import styles from './Approach.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaMobile, FaLightbulb } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface ApproachItem {
  icon: ReactElement;
  title: string;
  description: string;
}

const Approach = () => {
  const approachRef = useRef<HTMLDivElement>(null);
  const approachItemsRef = useRef<HTMLDivElement[]>([]);

  const approachItems: ApproachItem[] = [
    {
      icon: <FaCode size={28} />,
      title: 'Clean Code',
      description: 'I write clean, maintainable code following best practices and industry standards. Code quality is my top priority.',
    },
    {
      icon: <FaMobile size={28} />,
      title: 'Responsive Design',
      description: 'All my projects are built with responsiveness in mind, ensuring a great user experience across all devices.',
    },
    {
      icon: <FaLightbulb size={28} />,
      title: 'Problem Solving',
      description: 'I approach each project as a problem to solve, finding efficient and effective solutions to complex challenges.',
    },
  ];

  useEffect(() => {
    // Animation for the approach section
    const approachSection = approachRef.current;
    if (approachSection) {
      gsap.fromTo(
        approachSection,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: approachSection,
            start: 'top 80%',
          },
        }
      );
    }

    // Animation for approach items
    approachItemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.approachSection} id="approach" ref={approachRef}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.codeComment}>// My</span> <span className={styles.highlight}>Approach</span>
        </h2>
        <div className={styles.approachGrid}>
          {approachItems.map((item, index) => (
            <div
              key={index}
              className={styles.approachCard}
              ref={(el) => {
                if (el) approachItemsRef.current[index] = el;
              }}
            >
              <div className={styles.approachIcon}>{item.icon}</div>
              <h3 className={styles.approachTitle}>{item.title}</h3>
              <p className={styles.approachDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach; 