import gsap from 'gsap';

/**
 * Hero opening animation — premium editorial mask-reveal sequence.
 * Sequence:
 *  1. Overlay curtains up (0–0.8s)
 *  2. Name slide-up + mask reveal with slight compression settle (0.3–1.2s)
 *  3. Accent line grows (0.6–1.0s)
 *  4. Meta / tagline / buttons stagger in (0.8–1.6s)
 *  5. Photo area scale + clip reveal (1.2–2.0s)
 *  6. Scroll hint fades in (2.0–2.4s)
 */
export function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

  // ── 1. Full-screen curtain ──
  tl.to('.js-hero-curtain', {
    scaleY: 0,
    transformOrigin: 'top center',
    duration: 0.9,
    ease: 'power3.inOut',
  });

  // ── 2. Accent vertical line grows ──
  tl.fromTo(
    '.js-hero-accent',
    { scaleY: 0, transformOrigin: 'center center' },
    { scaleY: 1, duration: 0.7, ease: 'power3.inOut' },
    '-=0.5',
  );

  // ── 3. Name — masked reveal from bottom, compressed then settle ──
  tl.fromTo(
    '.js-hero-name',
    {
      y: 120,
      scaleX: 1.08,
      clipPath: 'inset(0 0 100% 0)',
    },
    {
      y: 0,
      scaleX: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.1,
      ease: 'power4.out',
    },
    '-=0.35',
  );

  // ── 4. Greeting line ──
  tl.fromTo(
    '.js-hero-greeting',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.7',
  );

  // ── 5. Meta row — stagger in ──
  tl.fromTo(
    '.js-hero-meta > *',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
    '-=0.4',
  );

  // ── 6. Tagline — clip reveal ──
  tl.fromTo(
    '.js-hero-tagline',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.3',
  );

  // ── 7. CTA buttons — stagger up ──
  tl.fromTo(
    '.js-hero-actions > *',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
    '-=0.35',
  );

  // ── 8. Photo area — clip reveal + scale ──
  tl.fromTo(
    '.js-hero-photo',
    {
      scale: 0.92,
      clipPath: 'inset(15% 0 15% 0)',
      opacity: 0,
    },
    {
      scale: 1,
      clipPath: 'inset(0% 0 0% 0)',
      opacity: 1,
      duration: 1.0,
      ease: 'power4.out',
    },
    '-=0.5',
  );

  // ── 9. Corner accents fade in ──
  tl.fromTo(
    '.js-hero-corner',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out' },
    '-=0.5',
  );

  // ── 10. Background number ──
  tl.fromTo(
    '.js-hero-bg-num',
    { opacity: 0, scale: 1.1 },
    { opacity: 0.025, scale: 1, duration: 0.8, ease: 'power2.out' },
    '-=0.3',
  );

  // ── 11. Scroll hint — last ──
  tl.fromTo(
    '.js-hero-scroll',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.1',
  );

  return tl;
}
