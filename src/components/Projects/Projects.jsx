import { useState, useRef, useEffect } from 'react';
import resume from '../../data/resume';
import Lightbox from '../Lightbox/Lightbox';
import { revealSectionHeader, staggerCards, cleanupScrollTriggers } from '../../animations/scrollReveal';
import styles from './Projects.module.css';

function ProjectCard({ project, onOpen }) {
  const scrollRef = useRef(null);
  const images = (project.images || []).map(
    (name) => `${import.meta.env.BASE_URL}works/${project.folder}/${name}`
  );

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imagesArea}>
        {images.length > 0 ? (
          <>
            <div className={styles.imagesScroll} ref={scrollRef}>
              {images.map((src, i) => (
                <div
                  key={i}
                  className={styles.imgWrapper}
                  onClick={() => onOpen(project, i)}
                >
                  <img
                    src={src}
                    alt={`${project.title} - ${i + 1}`}
                    className={styles.img}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Card arrows */}
            {images.length > 1 && (
              <>
                <button
                  className={`${styles.cardArrow} ${styles.cardArrowLeft}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    scroll('prev');
                  }}
                  aria-label="上一张"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className={`${styles.cardArrow} ${styles.cardArrowRight}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    scroll('next');
                  }}
                  aria-label="下一张"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className={styles.scrollDots}>
                {images.map((_, i) => (
                  <span key={i} className={styles.dot} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.placeholderBg} style={{ background: project.gradient }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.25">
              <rect x="4" y="8" width="40" height="32" rx="3" stroke="white" strokeWidth="1.5"/>
              <circle cx="16" cy="20" r="4" stroke="white" strokeWidth="1.5"/>
              <path d="M4 32l10-10 8 8 10-10 12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.placeholderLabel}>暂无图片</span>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    revealSectionHeader(el);
    staggerCards(el, `.${styles.card}`, { y: 80, stagger: 0.15, duration: 0.85 });
    return () => cleanupScrollTriggers(el);
  }, []);

  const openLightbox = (project, index) => {
    setLightbox({ project, index });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const prevImage = () => {
    setLightbox((prev) => ({
      ...prev,
      index: prev.index === 0 ? prev.project.images.length - 1 : prev.index - 1,
    }));
  };

  const nextImage = () => {
    setLightbox((prev) => ({
      ...prev,
      index: prev.index === prev.project.images.length - 1 ? 0 : prev.index + 1,
    }));
  };

  const navigateTo = (index) => {
    setLightbox((prev) => ({ ...prev, index }));
  };

  const lightboxImages = lightbox
    ? lightbox.project.images.map((name) => `${import.meta.env.BASE_URL}works/${lightbox.project.folder}/${name}`)
    : [];

  return (
    <section id="projects" className={`section ${styles.projects}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label js-section-label">PROJECTS</p>
          <h2 className="section-title js-section-title">精选项目</h2>
          <p className="section-desc js-section-desc">独立或主导完成的视觉设计作品，体现扎实的平面排版与配色能力</p>
        </div>

        <div className={styles.grid}>
          {resume.projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onNavigate={navigateTo}
        />
      )}
    </section>
  );
}
