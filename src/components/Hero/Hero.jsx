import { useEffect, useRef } from 'react';
import resume from '../../data/resume';
import { initHeroAnimation } from '../../animations/hero';
import styles from './Hero.module.css';

export default function Hero() {
  const animRef = useRef(null);

  useEffect(() => {
    const tl = initHeroAnimation();
    return () => tl?.kill();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} ref={animRef}>
      {/* Full-screen curtain for opening reveal */}
      <div className={`${styles.curtain} js-hero-curtain`} aria-hidden="true" />

      {/* Left: Text content */}
      <div className={styles.left}>
        <div className={`${styles.accentLine} js-hero-accent`} aria-hidden="true" />
        <div className={styles.textBlock}>
          <p className={`${styles.greeting} js-hero-greeting`}>{resume.nameEn}</p>
          <h1 className={`${styles.name} js-hero-name`}>{resume.name}</h1>
          <div className={`${styles.meta} js-hero-meta`}>
            <span className={styles.metaItem}>{resume.education.major}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaItem}>{resume.education.degree}</span>
          </div>
          <p className={`${styles.tagline} js-hero-tagline`}>
            兼具工程造价专业背景<br />与出色的组织策划、视觉设计能力
          </p>
          <div className={`${styles.actions} js-hero-actions`}>
            <a
              href="#projects"
              className={styles.btnPrimary}
              onClick={(e) => handleClick(e, '#projects')}
            >
              查看作品
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.btnArrow}>
                <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#footer"
              className={styles.btnSecondary}
              onClick={(e) => handleClick(e, '#footer')}
            >
              联系我
            </a>
          </div>
        </div>
      </div>

      {/* Right: Photo */}
      <div className={styles.right}>
        <div className={`${styles.photoArea} js-hero-photo`}>
          <img src="/photo.jpg" alt="王国光" className={styles.photo} />
        </div>
        {/* Decorative elements */}
        <div className={`${styles.cornerTL} ${styles.corner} js-hero-corner`} />
        <div className={`${styles.cornerBR} ${styles.corner} js-hero-corner`} />
        <div className={`${styles.bgNumber} js-hero-bg-num`}>01</div>
      </div>

      {/* Scroll hint */}
      <div className={`${styles.scrollHint} js-hero-scroll`}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollProgress} />
        </div>
      </div>
    </section>
  );
}
