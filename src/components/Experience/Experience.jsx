import { useEffect, useRef } from 'react';
import { revealSectionHeader, revealTimeline, cleanupScrollTriggers } from '../../animations/scrollReveal';
import styles from './Experience.module.css';

/* ------------------------------------------------------------------ */
/*  Text processor — tokenise campus highlights into styled JSX       */
/* ------------------------------------------------------------------ */

/** Known first‑verb patterns (checked at position 0 of each clause). */
const VERB_RE = /^(策划(?:并(?:主导|主持))?|负责(?!方案)|统筹|协调|整理|辅助|对接|完成|主持|任.{2,4}组织)/;

/** Special one‑of‑a‑kind phrases — matched case‑sensitively (no /g — we test at position). */
const SPECIAL_PHRASES = [
  { re: /第一届诗词大会/, cls: 'specialPhrase', star: true },
];

/** Number tokens: digits with optional suffix OR Chinese number words. */
const NUM_WARM_RE = /\d+[\+场]?|两场/;        /* event / people counts → warm red  */
const NUM_COOL_RE = /\d+\s*个/;               /* structural counts       → cool blue */

/** Simple number tokenizer for internship highlights (标题：内容 format). */
function tokenizeInternHighlight(text) {
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const warmMatch = text.slice(i).match(NUM_WARM_RE);
    if (warmMatch && warmMatch.index === 0) {
      tokens.push({ type: 'num', value: warmMatch[0] });
      i += warmMatch[0].length;
      continue;
    }

    const coolMatch = text.slice(i).match(NUM_COOL_RE);
    if (coolMatch && coolMatch.index === 0) {
      tokens.push({ type: 'numCool', value: coolMatch[0] });
      i += coolMatch[0].length;
      continue;
    }

    tokens.push({ type: 'text', value: text[i] });
    i++;
  }

  /* merge consecutive plain‑text tokens */
  const merged = [];
  for (const t of tokens) {
    const last = merged[merged.length - 1];
    if (t.type === 'text' && last && last.type === 'text') {
      last.value += t.value;
    } else {
      merged.push({ ...t });
    }
  }
  return merged;
}

function tokenizeHighlight(text) {
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    /* ---- 1. special phrase ---- */
    let matched = false;
    for (const sp of SPECIAL_PHRASES) {
      const m = text.slice(i).match(sp.re);
      if (m && m.index === 0) {
        tokens.push({ type: 'special', value: m[0], star: sp.star });
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    /* ---- 2. number (warm vs cool) ---- */
    const coolMatch = text.slice(i).match(NUM_COOL_RE);
    if (coolMatch && coolMatch.index === 0) {
      tokens.push({ type: 'numCool', value: coolMatch[0] });
      i += coolMatch[0].length;
      continue;
    }

    const warmMatch = text.slice(i).match(NUM_WARM_RE);
    if (warmMatch && warmMatch.index === 0) {
      tokens.push({ type: 'num', value: warmMatch[0] });
      i += warmMatch[0].length;
      continue;
    }

    /* ---- 3. first verb (clause start only) ---- */
    const atClauseStart = i === 0 || text[i - 1] === '，' || text[i - 1] === '、';
    if (atClauseStart) {
      const vm = text.slice(i).match(VERB_RE);
      if (vm) {
        tokens.push({ type: 'verb', value: vm[0] });
        i += vm[0].length;
        continue;
      }
    }

    /* ---- 4. plain character ---- */
    tokens.push({ type: 'text', value: text[i] });
    i++;
  }

  /* merge consecutive plain‑text tokens */
  const merged = [];
  for (const t of tokens) {
    const last = merged[merged.length - 1];
    if (t.type === 'text' && last && last.type === 'text') {
      last.value += t.value;
    } else {
      merged.push({ ...t });
    }
  }
  return merged;
}

/** Convert token array → React nodes. */
function tokensToJsx(tokens, css) {
  return tokens.map((t, idx) => {
    switch (t.type) {
      case 'verb':
        return (
          <span key={idx} className={css.verb}>
            {t.value}
          </span>
        );
      case 'num':
        return (
          <span key={idx} className={css.highlightNum}>
            {t.value}
          </span>
        );
      case 'numCool':
        return (
          <span key={idx} className={`${css.highlightNum} ${css.highlightNumCool}`}>
            {t.value}
          </span>
        );
      case 'special':
        return (
          <span key={idx}>
            <span className={css.specialPhrase}>{t.value}</span>
            {t.star && <span className={css.specialStar}>✨</span>}
          </span>
        );
      default:
        return t.value;
    }
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Experience({ id, label, title, items, variant }) {
  const sectionRef = useRef(null);
  const isCampus = variant === 'campus';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    revealSectionHeader(el);
    revealTimeline(el, `.${styles.item}`);
    return () => cleanupScrollTriggers(el);
  }, []);

  return (
    <section
      id={id}
      className={`section ${styles.experience}${isCampus ? ` ${styles.campus}` : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        {/* ---- Header ---- */}
        <div className={`${styles.header}${isCampus ? ` ${styles.campusHeader}` : ''}`}>
          <p className="section-label js-section-label">{label}</p>
          <h2 className="section-title js-section-title">{title}</h2>
        </div>

        {/* ---- Timeline ---- */}
        <div className={styles.timeline}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              {/* Dot + line */}
              <div className={styles.line}>
                <div className={`${styles.dot} js-tl-dot`}>
                  <div className={styles.dotInner} />
                </div>
                {index < items.length - 1 && (
                  <div className={`${styles.connector} js-tl-line`} />
                )}
              </div>

              {/* Card */}
              <div className={`${styles.card} js-tl-card`}>
                <div className={styles.cardMeta}>
                  <span className={styles.period}>{item.period}</span>
                </div>

                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.org}>{item.org}</p>

                {/* ---- Highlights ---- */}
                {isCampus ? (
                  <ul className={styles.campusHighlights}>
                    {item.highlights.map((h, i) => {
                      const tokens = tokenizeHighlight(h);
                      return <li key={i}>{tokensToJsx(tokens, styles)}</li>;
                    })}
                  </ul>
                ) : (
                  <ul className={styles.highlights}>
                    {item.highlights.map((h, i) => {
                      const tokens = tokenizeInternHighlight(h);
                      return (
                        <li key={i}>
                          {'— '}
                          {tokensToJsx(tokens, styles)}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
