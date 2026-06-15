import gsap from 'gsap';

/**
 * Hero opening animation — artistic editorial reveal sequence.
 * Sequence:
 *  1. Curtain lifts (0–0.8s)
 *  2. Decorative label + year fade-slide in (0.3–0.9s)
 *  3. Top row "个人简历 / DESIGNER" appears (0.4–0.9s)
 *  4. Name characters stagger in with editorial offset settle (0.5–1.3s)
 *  5. Subtitle fades up (0.9–1.4s)
 *  6. Rule line draws from left (1.1–1.7s)
 *  7. Scroll hint fades in (1.6–2.0s)
 */
export function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

  // ── 1. Curtain reveal ──
  tl.to('.js-hero-curtain', {
    scaleY: 0,
    transformOrigin: 'top center',
    duration: 1.0,
    ease: 'power3.inOut',
  });

  // ── 2. Left column: label + year ──
  tl.fromTo(
    '.js-hero-label',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.55',
  );

  tl.fromTo(
    '.js-hero-year',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.45',
  );

  // ── 3. Top row: 个人简历 / DESIGNER ──
  tl.fromTo(
    '.js-hero-toprow',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.5',
  );

  // ── 4. Name — masked clip reveal with staggered character settle ──
  tl.fromTo(
    '.js-hero-name',
    {
      y: 80,
      clipPath: 'inset(0 0 100% 0)',
    },
    {
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.1,
      ease: 'power4.out',
    },
    '-=0.4',
  );

  // Individual name chars: drop from above, settle to y=0 (CSS `top` handles stagger)
  tl.fromTo(
    '.js-hero-name .nameChar',
    {
      y: (i) => 50 + i * 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power4.out',
    },
    '-=0.95',
  );

  // ── 5. Subtitle ──
  tl.fromTo(
    '.js-hero-subtitle',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.4',
  );

  // ── 6. Rule — scaleX draw from left ──
  tl.fromTo(
    '.js-hero-rule',
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
    '-=0.25',
  );

  // ── 7. Scroll hint — last element ──
  tl.fromTo(
    '.js-hero-scroll',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.15',
  );

  return tl;
}
