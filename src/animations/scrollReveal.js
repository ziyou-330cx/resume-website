import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal a section label + title on scroll.
 * The title enters BIG (scale 1.25, y 80px) then settles.
 */
export function revealSectionHeader(sectionSelector) {
  const label = sectionSelector.querySelector('.js-section-label');
  const title = sectionSelector.querySelector('.js-section-title');
  const desc = sectionSelector.querySelector('.js-section-desc');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionSelector,
      start: 'top 78%',
      /* restart on every enter (down + up) so animation always replays */
      toggleActions: 'restart none restart reset',
    },
    defaults: { ease: 'power3.out' },
  });

  if (label) {
    tl.fromTo(label, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0);
  }
  if (title) {
    tl.fromTo(
      title,
      { y: 90, scale: 1.2, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power4.out' },
      label ? '-=0.35' : 0,
    );
  }
  if (desc) {
    tl.fromTo(desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.4');
  }

  return tl;
}

/**
 * Stagger-reveal a list of cards.
 * Each card slides up 60px + fades in, with increasing delay.
 */
export function staggerCards(containerSelector, cardSelector, options = {}) {
  const {
    start = 'top 75%',
    y = 60,
    stagger = 0.12,
    duration = 0.7,
    ease = 'power3.out',
  } = options;

  const cards = containerSelector.querySelectorAll(cardSelector);
  if (!cards.length) return null;

  return gsap.fromTo(
    cards,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: containerSelector,
        start,
        toggleActions: 'restart none restart reset',
      },
    },
  );
}

/**
 * Image mask reveal — clip-path uncovers from bottom.
 */
export function revealImages(containerSelector, imageSelector, options = {}) {
  const {
    start = 'top 72%',
    stagger = 0.1,
    duration = 0.9,
  } = options;

  const images = containerSelector.querySelectorAll(imageSelector);
  if (!images.length) return null;

  return gsap.fromTo(
    images,
    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      duration,
      stagger,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerSelector,
        start,
        toggleActions: 'restart none restart reset',
      },
    },
  );
}

/**
 * Subtle parallax on an element — moves opposite to scroll direction.
 */
export function parallaxElement(el, speed = -0.05) {
  if (!el) return null;

  gsap.to(el, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: el.parentElement || el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

/**
 * Timeline items — dot + line + content card reveal sequentially.
 */
export function revealTimeline(containerSelector, itemSelector) {
  const items = containerSelector.querySelectorAll(itemSelector);
  if (!items.length) return null;

  items.forEach((item) => {
    const dot = item.querySelector('.js-tl-dot');
    const line = item.querySelector('.js-tl-line');
    const card = item.querySelector('.js-tl-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 78%',
        toggleActions: 'restart none restart reset',
      },
    });

    if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }, 0);
    if (line) tl.fromTo(line, { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 0.5, ease: 'power2.inOut' }, 0);
    if (card) {
      tl.fromTo(
        card,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.3',
      );
    }
  });
}

/**
 * Clean up all ScrollTrigger instances (call on unmount).
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

/**
 * Clean up ScrollTrigger instances attached to a specific element and its children.
 * Safe to call on unmount — only kills triggers whose trigger element is within `scope`.
 */
export function cleanupScrollTriggers(scope) {
  if (!scope) return;
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger && scope.contains(st.trigger)) {
      st.kill();
    }
  });
}
