import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import resume from '../../data/resume';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.inner} > *`,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset',
          },
        },
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="footer" className={styles.footer} ref={sectionRef}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.name}>{resume.name}</h2>
          <p className={styles.title}>{resume.title}</p>

          <div className={styles.contact}>
            <a href={`tel:${resume.phone}`} className={styles.contactLink}>
              📞 {resume.phone}
            </a>
            <a href={`mailto:${resume.email}`} className={styles.contactLink}>
              📧 {resume.email}
            </a>
            <span className={styles.contactLink}>
              📍 {resume.location}
            </span>
          </div>

          <div className={styles.divider} />

          <p className={styles.copyright}>
            © {new Date().getFullYear()} {resume.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
