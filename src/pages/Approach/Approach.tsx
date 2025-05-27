import { useEffect, useRef, ReactElement, useState } from "react";
import styles from "./Approach.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLightbulb, FaCode } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

interface ApproachItem {
  icon: ReactElement;
  title: string;
  description: string;
}

const Approach = () => {
  const approachRef = useRef<HTMLDivElement>(null);
  const timelineWrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const approachItemsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeCards, setActiveCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const approachItems: ApproachItem[] = [
    {
      icon: <FaLightbulb size={32} />,
      title: "Planning",
      description:
        "I begin with thoughtful planning, understanding requirements and envisioning the ideal solution before writing any code.",
    },
    {
      icon: <FaCode size={32} />,
      title: "Development",
      description:
        "During development, I implement clean, robust code with a focus on maintainability, performance, and best practices.",
    },
    {
      //@ts-ignore
      icon: <IoRocketSharp size={32} />,
      title: "Launch",
      description:
        "The launch phase involves rigorous testing, optimization, and deployment to ensure a smooth, production-ready solution.",
    },
  ];

  useEffect(() => {
    // Animation for the approach section
    const approachSection = approachRef.current;
    if (approachSection) {
      gsap.fromTo(
        approachSection,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: approachSection,
            start: "top 80%",
          },
        }
      );
    }

    // Animation for the connecting line and lamp
    if (timelineRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "center 30%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;

            const newActiveCards = [false, false, false];
            if (progress >= 0.85) {
              newActiveCards[0] = true;
              newActiveCards[1] = true;
              newActiveCards[2] = true;
            } else if (progress >= 0.5) {
              newActiveCards[0] = true;
              newActiveCards[1] = true;
            } else if (progress >= 0.15) {
              newActiveCards[0] = true;
            }

            setActiveCards((prevActiveCards) => {
              if (
                JSON.stringify(prevActiveCards) !==
                JSON.stringify(newActiveCards)
              ) {
                return newActiveCards;
              }
              return prevActiveCards;
            });
          },
        },
      });

      timeline.to(lineRef.current, {
        height: "100%",
        duration: 0.7,
        ease: "power1.inOut",
      });
    }

    // Animation for approach items - only opacity, as transform is handled by CSS
    // if (approachItemsRef.current.length > 0) {
    //   approachItemsRef.current.forEach((item, index) => {
    //     gsap.fromTo(
    //       item,
    //       { opacity: 0, y: 20 },
    //       {
    //         opacity: 1,
    //         y: 0,
    //         duration: 0.6,
    //         delay: 0.2 + index * 0.15,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //           trigger: item,
    //           start: "top 90%",
    //           once: true,
    //         },
    //       }
    //     );
    //   });
    // }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.approachSection} id="approach" ref={approachRef}>
      <div className={`${styles.container} ${styles.timelineContainer}`}>
        <SectionTitle basicTitle="My" highlightTitle="Approach" />

        <div className={styles.timelineWrapper} ref={timelineWrapperRef}>
          <div className={styles.timelineLine} ref={timelineRef}>
            <div className={styles.timelineProgress} ref={lineRef}></div>
          </div>

          <div className={styles.approachTimelineGrid}>
            {approachItems.map((item, index) => (
              <div
                key={index}
                className={`
                  ${styles.approachCard} 
                  ${styles[`approachCard${index + 1}`]}
                  ${activeCards[index] ? styles.approachCardActive : ""}
                `}
                ref={(el) => {
                  if (el) approachItemsRef.current[index] = el;
                }}
              >
                <div className={styles.approachIcon}>{item.icon}</div>
                <h3 className={styles.approachTitle}>{item.title}</h3>
                <p className={styles.approachDescription}>{item.description}</p>
                {index < approachItems.length - 1 && (
                  <div className={styles.timelineArrow}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.parallaxBg}></div>
    </section>
  );
};

export default Approach;
