import { useState, useEffect } from 'react';
import resume from '../../data/resume';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={(e) => handleClick(e, '#hero')}>
          {resume.name}
        </a>
        <div className={styles.links}>
          {resume.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#footer"
            className={styles.contactBtn}
            onClick={(e) => handleClick(e, '#footer')}
          >
            联系我
          </a>
        </div>
      </div>
    </nav>
  );
}
