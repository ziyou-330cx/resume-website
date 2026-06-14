import { useEffect, useRef } from 'react';
import resume from '../../data/resume';
import { revealSectionHeader, staggerCards, cleanupScrollTriggers } from '../../animations/scrollReveal';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    revealSectionHeader(el);
    staggerCards(el, `.${styles.statCard}`, { y: 50, stagger: 0.1 });
    return () => cleanupScrollTriggers(el);
  }, []);

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">
        {/* Top: Avatar + Info */}
        <div className={styles.top}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              <img src={`${import.meta.env.BASE_URL}photo.jpg`} alt="王国光" className={styles.avatarImg} />
            </div>
          </div>
          <div className={styles.info}>
            <p className={`section-label js-section-label`}>ABOUT</p>
            <h2 className={`section-title js-section-title`}>{resume.name}</h2>
            <p className={`${styles.bio} js-section-desc`}>
              {resume.education.school} · {resume.education.major}（{resume.education.degree}）<br />
              {resume.education.period}
            </p>
            <p className={styles.bioSecondary}>
              在校期间长期深耕学生工作，历任辅导员助理、羽毛球社部长、社团管理中心主席助理，全程主导多场大型校园活动的策划、统筹与视觉设计。
            </p>
            <div className={styles.contactRow}>
              <a href={`tel:${resume.phone}`} className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                {resume.phone}
              </a>
              <a href={`mailto:${resume.email}`} className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                {resume.email}
              </a>
              <span className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                {resume.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Stats */}
        <div className={styles.stats}>
          {resume.stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
