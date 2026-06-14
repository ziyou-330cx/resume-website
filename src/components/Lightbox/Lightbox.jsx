import { useEffect, useCallback } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext, onNavigate }) {
  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Close button */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="关闭">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Counter */}
      <div className={styles.counter}>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div className={styles.imageWrap} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`预览 ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="上一张"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M20 8l-8 8 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="下一张"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M12 8l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className={styles.thumbnails} onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === currentIndex ? styles.thumbActive : ''}`}
              onClick={() => onNavigate(i)}
            >
              <img src={src} alt={`缩略图 ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
