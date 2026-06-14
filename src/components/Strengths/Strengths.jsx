import { useEffect, useRef } from 'react';
import resume from '../../data/resume';
import { revealSectionHeader, staggerCards, cleanupScrollTriggers } from '../../animations/scrollReveal';
import styles from './Strengths.module.css';

export default function Strengths() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    revealSectionHeader(el);
    staggerCards(el, `.${styles.card}`, { y: 50, stagger: 0.1, duration: 0.7 });
    return () => cleanupScrollTriggers(el);
  }, []);

  return (
    <section id="strengths" className={`section ${styles.strengths}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label js-section-label">STRENGTHS</p>
          <h2 className="section-title js-section-title">个人优势</h2>
          <p className="section-desc js-section-desc">工程造价专业能力与创意设计、组织策划的多元融合</p>
        </div>

        <div className={styles.grid}>
          {resume.strengths.map((item) => (
            <div key={item.title} className={styles.card}>
              <span className={styles.icon}>{item.icon}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
