import { useEffect, useRef, useState, useCallback } from 'react';
import resume from '../../data/resume';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const ballRef = useRef(null);
  const shadowRef = useRef(null);
  const [phase, setPhase] = useState('loading'); // loading → revealed → done

  const handleDone = useCallback(() => {
    setPhase('revealed');
    // Allow identity to fade in, then mark fully done
    setTimeout(() => setPhase('done'), 800);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const ball = ballRef.current;
    const shadow = shadowRef.current;
    if (!section || !ball || !shadow) return;

    let cancelled = false;

    const BALL_SIZE = 30;
    const SHADOW_W = 10; // half of shadow element width for centering

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    function anim(el, keyframes, options) {
      return el.animate(keyframes, { fill: 'forwards', ...options }).finished;
    }

    async function run() {
      // Collect DOM refs fresh each time
      const lines = section.querySelectorAll('[data-line]');
      const chars = section.querySelectorAll('[data-char]');

      function revealChar(i) {
        if (chars[i]) {
          chars[i].style.opacity = '1';
          chars[i].style.transform = 'translateY(0)';
        }
      }
      function setShadow(cx, lineY, scaleX, opacity) {
        shadow.style.transform = `translate(${cx - SHADOW_W}px, ${lineY - 2}px) scaleX(${scaleX})`;
        shadow.style.opacity = opacity;
      }

      // Pre-compute line positions
      const LD = [];
      lines.forEach((l) => {
        const r = l.getBoundingClientRect();
        LD.push({ cx: r.left + r.width / 2, cy: r.top });
      });

      // Start position — top center
      const sx = window.innerWidth / 2 - BALL_SIZE / 2;
      const sy = window.innerHeight * 0.10;
      ball.style.transform = `translate(${sx}px, ${sy}px)`;
      ball.style.opacity = '1';
      await sleep(600);
      if (cancelled) return;

      // ── Initial drop to line 0 ──
      const first = LD[0];
      const firstTop = first.cy - BALL_SIZE;

      await anim(ball, [
        { transform: `translate(${sx}px, ${sy}px) scale(1,1)`, offset: 0 },
        { transform: `translate(${first.cx - BALL_SIZE/2}px, ${firstTop}px) scale(0.9,1.1)`, offset: 1 },
      ], { duration: 450, easing: 'cubic-bezier(0.55,0.02,0.78,0.42)' });
      if (cancelled) return;

      // ── Squash on line 0 ──
      setShadow(first.cx, first.cy, 1, 0.6);
      await anim(ball, [
        { transform: `translate(${first.cx - BALL_SIZE/2}px, ${firstTop}px) scale(0.9,1.1)`, offset: 0 },
        { transform: `translate(${first.cx - BALL_SIZE/2}px, ${first.cy - BALL_SIZE*0.55}px) scale(1.35,0.55)`, offset: 0.45 },
        { transform: `translate(${first.cx - BALL_SIZE/2}px, ${first.cy - BALL_SIZE*0.88}px) scale(1.06,0.92)`, offset: 1 },
      ], { duration: 170, easing: 'ease-out' });
      anim(shadow, [
        { transform: `translate(${first.cx - SHADOW_W}px, ${first.cy - 2}px) scaleX(1)`, offset: 0 },
        { transform: `translate(${first.cx - SHADOW_W}px, ${first.cy - 2}px) scaleX(1.9)`, offset: 0.45 },
        { transform: `translate(${first.cx - SHADOW_W}px, ${first.cy - 2}px) scaleX(1)`, offset: 1 },
      ], { duration: 170, easing: 'ease-out' });
      revealChar(0);
      if (cancelled) return;

      // ── Bounce up from line 0 ──
      const firstBounceCY = (first.cy - BALL_SIZE / 2) - 80;
      const firstBounceTop = firstBounceCY - BALL_SIZE / 2;
      await anim(ball, [
        { transform: `translate(${first.cx - BALL_SIZE/2}px, ${first.cy - BALL_SIZE*0.88}px) scale(1.06,0.92)`, offset: 0 },
        { transform: `translate(${first.cx - BALL_SIZE/2}px, ${firstBounceTop}px) scale(0.82,1.18)`, offset: 1 },
      ], { duration: 260, easing: 'cubic-bezier(0.25,0.8,0.4,1)' });
      shadow.style.opacity = '0';
      if (cancelled) return;

      let currCX = first.cx;
      let currCY = firstBounceCY;

      // ── Arc → squash → bounce for lines 1, 2, 3 ──
      for (let i = 1; i <= 3; i++) {
        const t = LD[i];
        const tTop = t.cy - BALL_SIZE;
        const tCY = t.cy - BALL_SIZE / 2;
        const midCX = (currCX + t.cx) / 2;
        const apexCY = Math.min(currCY, tCY) - 70;

        // Arc
        await anim(ball, [
          { transform: `translate(${currCX - BALL_SIZE/2}px, ${currCY - BALL_SIZE/2}px) scale(0.82,1.18)`, offset: 0 },
          { transform: `translate(${midCX - BALL_SIZE/2}px, ${apexCY - BALL_SIZE/2}px) scale(1.02,0.98)`, offset: 0.45 },
          { transform: `translate(${t.cx - BALL_SIZE/2}px, ${tTop}px) scale(0.9,1.1)`, offset: 1 },
        ], { duration: 500, easing: 'cubic-bezier(0.38,0.82,0.52,0.98)' });
        if (cancelled) return;

        // Squash
        setShadow(t.cx, t.cy, 1, 0.6);
        await anim(ball, [
          { transform: `translate(${t.cx - BALL_SIZE/2}px, ${tTop}px) scale(0.9,1.1)`, offset: 0 },
          { transform: `translate(${t.cx - BALL_SIZE/2}px, ${t.cy - BALL_SIZE*0.55}px) scale(1.35,0.55)`, offset: 0.45 },
          { transform: `translate(${t.cx - BALL_SIZE/2}px, ${t.cy - BALL_SIZE*0.88}px) scale(1.06,0.92)`, offset: 1 },
        ], { duration: 170, easing: 'ease-out' });
        anim(shadow, [
          { transform: `translate(${t.cx - SHADOW_W}px, ${t.cy - 2}px) scaleX(1)`, offset: 0 },
          { transform: `translate(${t.cx - SHADOW_W}px, ${t.cy - 2}px) scaleX(1.9)`, offset: 0.45 },
          { transform: `translate(${t.cx - SHADOW_W}px, ${t.cy - 2}px) scaleX(1)`, offset: 1 },
        ], { duration: 170, easing: 'ease-out' });
        revealChar(i);
        if (cancelled) return;

        // Bounce up
        const bCY = tCY - 80;
        const bTop = bCY - BALL_SIZE / 2;
        await anim(ball, [
          { transform: `translate(${t.cx - BALL_SIZE/2}px, ${t.cy - BALL_SIZE*0.88}px) scale(1.06,0.92)`, offset: 0 },
          { transform: `translate(${t.cx - BALL_SIZE/2}px, ${bTop}px) scale(0.82,1.18)`, offset: 1 },
        ], { duration: 260, easing: 'cubic-bezier(0.25,0.8,0.4,1)' });
        shadow.style.opacity = '0';
        if (cancelled) return;

        currCX = t.cx;
        currCY = bCY;
      }

      // ── Final settle on line 3 ──
      const last = LD[3];
      const lTop = last.cy - BALL_SIZE;

      await anim(ball, [
        { transform: `translate(${currCX - BALL_SIZE/2}px, ${currCY - BALL_SIZE/2}px) scale(0.82,1.18)`, offset: 0 },
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${lTop}px) scale(0.92,1.08)`, offset: 1 },
      ], { duration: 300, easing: 'cubic-bezier(0.45,0.8,0.55,1)' });
      if (cancelled) return;

      await anim(ball, [
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${lTop}px) scale(0.92,1.08)`, offset: 0 },
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${last.cy - BALL_SIZE*0.7}px) scale(1.16,0.78)`, offset: 0.5 },
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${lTop}px) scale(1,1)`, offset: 1 },
      ], { duration: 220, easing: 'ease-out' });
      if (cancelled) return;

      const microTop = lTop - 22;
      await anim(ball, [
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${lTop}px) scale(1,1)`, offset: 0 },
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${microTop}px) scale(0.92,1.06)`, offset: 1 },
      ], { duration: 180, easing: 'ease-out' });
      if (cancelled) return;

      await anim(ball, [
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${microTop}px) scale(0.92,1.06)`, offset: 0 },
        { transform: `translate(${last.cx - BALL_SIZE/2}px, ${lTop}px) scale(1,1)`, offset: 1 },
      ], { duration: 260, easing: 'cubic-bezier(0.45,0.8,0.5,1)' });

      if (!cancelled) handleDone();
    }

    // Small delay to ensure layout is stable
    const timeout = setTimeout(() => run(), 200);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [handleDone]);

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      {/* Background decorations */}
      <div className={styles.bgDeco1} aria-hidden="true" />
      <div className={styles.bgDeco2} aria-hidden="true" />
      <div className={styles.bgDeco3} aria-hidden="true" />

      {/* Lines + characters: "个 人 简 历" */}
      <div className={styles.linesRow}>
        {['个', '人', '简', '历'].map((char, i) => (
          <div className={styles.lineGroup} key={i}>
            <div className={styles.line} data-line={i} />
            <span className={styles.char} data-char={i}>{char}</span>
          </div>
        ))}
      </div>

      {/* Frosted glass ball */}
      <div className={styles.ball} ref={ballRef} aria-hidden="true" />

      {/* Contact shadow */}
      <div className={styles.ballShadow} ref={shadowRef} aria-hidden="true" />

      {/* Identity — fades in after animation completes */}
      <div
        className={`${styles.identity} ${phase !== 'loading' ? styles.identityVisible : ''}`}
      >
        <h1 className={styles.name}>{resume.name}</h1>
        <p className={styles.subtitle}>{resume.title || '工程造价 · 应届毕业生'}</p>
        <div className={styles.rule} />
      </div>

      {/* Scroll hint — appears after identity */}
      {phase === 'done' && (
        <div className={styles.scrollHint}>
          <span className={styles.scrollText}>SCROLL</span>
          <div className={styles.scrollLine}>
            <div className={styles.scrollProgress} />
          </div>
        </div>
      )}
    </section>
  );
}
