import { animate, hover, press, inView, stagger } from 'motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C, photos } from './content.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const SPRING = { type: 'spring', bounce: 0.2, visualDuration: 0.35 };
const SOFT = { type: 'spring', bounce: 0, visualDuration: 0.45 };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = (arr, fn) => arr.map(fn).join('');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const pad = (n) => String(n + 1).padStart(2, '0');

const pic = (src, cls, label = '') => `<figure class="pic ${cls}" aria-hidden="true"><div class="pic-in">${src
  ? `<img src="${esc(src)}" alt="" loading="lazy">`
  : `<div class="wallph"><i class="man"></i>${label ? `<em>${esc(label)}</em>` : ''}</div>`}</div></figure>`;

const btn = (href, label, cls) => `<a href="${href}" class="btn ${cls}"><span class="roll" data-t="${esc(label)}"><span>${esc(label)}</span></span></a>`;

function render() {
  const [h1, h2, h3, h4] = C.heroTitle;
  return `
<div class="grain" aria-hidden="true"></div>
<div class="progress" aria-hidden="true"></div>
<header class="nav">
  <a href="#top" class="logo" aria-label="OTS, torna all’inizio">OTS<b>.</b></a>
  <nav class="links" aria-label="Principale">
    ${list(C.nav, (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}
    <a href="#login">${esc(C.login)}</a>
  </nav>
  <a href="#quiz" class="nav-cta">${esc(C.navCta)}</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="sheet">${esc(C.menu)}</button>
</header>
<div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="sheet-top"><span class="logo">OTS<b>.</b></span><button class="sheet-close">${esc(C.close)}</button></div>
  <nav aria-label="Menu mobile">
    ${list(C.nav, (l) => `<a href="${l.href}"><span>${esc(l.label)}</span></a>`)}
    <a href="#login"><span>${esc(C.login)}</span></a>
  </nav>
  ${btn('#quiz', C.navCta, 'btn-ink')}
</div>

<main>
  <section id="top" class="hero">
    <h1 class="hero-title" aria-label="${esc(C.heroTitle.join(' '))}">
      <span class="ln"><span class="w">${esc(h1)}</span>${pic(photos.heroA, 'pic-a')}</span>
      <span class="ln"><span class="w">${esc(h2)}</span><span class="kick j" aria-hidden="true">${esc(C.heroKicker)}</span></span>
      <span class="ln green"><span class="w">${esc(h3)}</span></span>
      <span class="ln"><span class="w">${esc(h4)}</span></span>
      ${pic(photos.heroB, 'pic-b')}
    </h1>
    <aside class="hero-side">
      <p class="j tags">${esc(C.heroTags)}</p>
      <p class="j hero-text">${esc(C.heroText)}</p>
      <div class="hero-foot">
        <div class="actions">${btn('#programmi', C.heroCta, 'btn-paper')}${btn('#quiz', C.heroCta2, 'btn-line')}</div>
        <div class="scrollcue" aria-hidden="true"><i></i>${esc(C.scroll)}</div>
      </div>
    </aside>
  </section>

  <section class="wall" aria-labelledby="wall-h">
    <h2 id="wall-h" class="sr">Preparazione atletica</h2>
    <div class="wall-stage">
      <div class="wall-rows" aria-hidden="true">${list(C.wallRows, (r) => `<div class="wall-row"><span class="fit">${esc(r)}</span></div>`)}</div>
      <div class="wall-photo" aria-hidden="true">${pic(photos.wall, 'pic-wall')}</div>
      <p class="wall-year diff" aria-hidden="true">${esc(C.wallYear)}</p>
      <p class="wall-text j diff">${esc(C.wallText)}</p>
      <p class="wall-sign diff" aria-hidden="true">${esc(C.wallSign).replace('\n', '<br>')}</p>
    </div>
  </section>

  <section class="manifesto" aria-label="${esc(C.manifestoLabel)}">
    <p class="label">${esc(C.manifestoLabel)}</p>
    <p class="mani">${list(C.manifesto.split(' '), (w) => `<span class="wd">${esc(w)}</span> `)}</p>
  </section>

  <div class="ticker" aria-hidden="true">
    ${[0, 1].map((r) => `<div class="tk-row tk-${r}"><div class="tk-track">${list([0, 1, 2], () => list(C.ticker, (t, i) => `<span class="${(i + r) % 2 ? 'o' : ''}">${esc(t)}</span><b>✱</b>`))}</div></div>`).join('')}
  </div>

  <section id="metodo" class="method">
    <div class="cube-pin">
      <p class="cl cl-tl j">${esc(C.methodText)}</p>
      <p class="cl cl-tr j">${esc(C.methodLabels[0])}</p>
      <h2 class="sr">${esc(C.methodTitle)}</h2>
      <div class="cube-wrap" aria-hidden="true">
        <div class="cube">
          ${['top', 'left', 'right'].map((f) => `<div class="face ${f}"><p>${list(C.cube[f], (l) => `<span><span>${esc(l)}</span></span>`)}</p></div>`).join('')}
        </div>
      </div>
      <p class="cl cl-bl">${esc(C.pillars[0].name)} + ${esc(C.pillars[1].name)}</p>
      <p class="cl cl-bc">${esc(C.methodLabels[1])}</p>
      <p class="cl cl-br">${esc(C.pillars[2].name)} + ${esc(C.pillars[3].name)}</p>
    </div>
    <ol class="pillars">
      ${list(C.pillars, (p, i) => `
      <li class="pillar">
        <span class="p-line" aria-hidden="true"></span>
        <span class="p-num">${pad(i)}</span>
        <h3 class="p-name">${esc(p.name)}</h3>
        <div class="p-body"><p>${esc(p.text)}</p><span class="p-detail">${esc(p.detail)}</span></div>
      </li>`)}
    </ol>
  </section>

  <section id="programmi" class="programs">
    <div class="sec-head">
      <h2 class="display">${list(C.progTitle, (l) => `<span class="ln"><span class="w">${esc(l)}</span></span>`)}</h2>
      <p class="j side">${esc(C.progText)}</p>
    </div>
    <div class="cards">
      ${list(C.programs, (p, i) => `
      <article class="prog${p.featured ? ' featured' : ''}">
        <div class="top"><span>${pad(i)}</span><span>${esc(p.level)}</span>${p.featured ? `<span class="badge">${esc(C.featured)}</span>` : ''}</div>
        <h3>${esc(p.name)}</h3>
        <p class="desc">${esc(p.desc)}</p>
        <ul>${list(p.features, (f) => `<li>${esc(f)}</li>`)}</ul>
        <div class="price">${esc(p.price)}</div>
        ${btn('#checkout', C.buy, p.featured ? 'btn-paper' : 'btn-line')}
      </article>`)}
    </div>
    <p class="note">${esc(C.progNote)}</p>
  </section>

  <section id="quiz" class="quiz">
    <div class="quiz-grid">
      <div>
        <h2 class="display">${list(C.quizTitle, (l) => `<span class="ln"><span class="w">${esc(l)}</span></span>`)}</h2>
        <p class="j side">${esc(C.quizText)}</p>
      </div>
      <div class="qbox">
        <div class="qmeta"><span class="qcount"></span><span class="qdots">${list(C.quiz, () => '<i></i>')}</span></div>
        <div class="qstage" aria-live="polite"></div>
      </div>
    </div>
  </section>

  <section id="team" class="team">
    <div class="sec-head">
      <h2 class="display"><span class="ln"><span class="w">${esc(C.teamTitle)}</span></span></h2>
      <p class="j side">${esc(C.teamText)}</p>
    </div>
    <div class="members">
      ${list(C.team, (m, i) => `
      <div class="member">
        ${pic(photos.team[i], 'pic-team', C.photo)}
        <div class="m-row"><span class="m-num">${pad(i)}</span><div><div class="name">${esc(m.name)}</div><div class="role">${esc(m.role)}</div></div></div>
      </div>`)}
    </div>
  </section>

  <section class="quotes" aria-labelledby="quotes-h">
    <h2 id="quotes-h" class="label">${esc(C.quotesTitle)}</h2>
    <div class="qlist">
      ${list(C.quotes, (q, i) => `<figure class="qrow"><span class="q-num">${pad(i)}</span><blockquote>${esc(q.text)}</blockquote><figcaption>${esc(q.who)}</figcaption></figure>`)}
    </div>
  </section>

  <section id="pro" class="pro">
    <div class="pro-grid">
      <div>
        <span class="tag">${esc(C.proTag)}</span>
        <h2 class="display">${list(C.proTitle, (l) => `<span class="ln"><span class="w">${esc(l)}</span></span>`)}</h2>
      </div>
      <div>
        <p class="j side">${esc(C.proText)}</p>
        <form class="waitlist" novalidate>
          <label class="lbl" for="waitlist-email">${esc(C.proLabel)}</label>
          <div class="field-row">
            <input id="waitlist-email" class="field" type="email" required autocomplete="email" placeholder="nome@email.it" aria-describedby="waitlist-msg">
            <button class="btn btn-green" type="submit"><span class="btn-label">${esc(C.proBtn)}</span></button>
          </div>
          <p id="waitlist-msg" class="form-msg" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </section>

  <section id="faq" class="faq">
    <div class="faq-grid">
      <h2 class="display"><span class="ln"><span class="w">${esc(C.faqTitle)}</span></span></h2>
      <div class="faq-list">
        ${list(C.faq, (f, i) => `
        <div class="faq-item">
          <button class="faqbtn" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}" data-faq="${i}"><span class="f-num">${pad(i)}</span><span class="f-q">${esc(f.q)}</span><span class="plus" aria-hidden="true"><i></i></span></button>
          <div class="faq-panel" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}" aria-hidden="true"><p>${esc(f.a)}</p></div>
        </div>`)}
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="cta-row">
      <h2 class="display">${list(C.ctaTitle, (l, i) => `<span class="ln${i ? ' green' : ''}"><span class="w">${esc(l)}</span></span>`)}</h2>
      ${btn('#programmi', C.ctaBtn, 'btn-green')}
    </div>
    <div class="wordmark" aria-hidden="true"><span class="fit">${list(['O', 'T', 'S'], (l) => `<span class="wl">${l}</span>`)}<span class="wl dot">.</span></span></div>
  </section>
</main>

<footer class="foot">
  <span>© 2026 OTS. ${esc(C.rights)}</span>
  <nav aria-label="Note legali">${list(C.footLinks, (l) => `<a href="#${l.toLowerCase().split(' ')[0]}">${esc(l)}</a>`)}</nav>
  <span>${esc(C.footContact)}</span>
</footer>`;
}

document.getElementById('app').innerHTML = render();

/* Fit a single line of display type to the width of its parent */
function fitAll() {
  $$('.fit').forEach((el) => {
    const parent = el.parentElement;
    const cs = getComputedStyle(parent);
    const target = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    el.style.fontSize = '100px';
    const w = el.getBoundingClientRect().width;
    if (w > 0) el.style.fontSize = `${(100 * target) / w}px`;
  });
  const cube = $('.cube');
  const S = cube.offsetWidth;
  $$('.face p', cube).forEach((p) => {
    const lines = $$(':scope > span', p);
    const sizes = lines.map((l) => {
      l.style.fontSize = '100px';
      const w = $('span', l).offsetWidth;
      return w > 0 ? Math.min((100 * S) / w, S * 0.32) : 0;
    });
    const total = sizes.reduce((a, b) => a + b * 0.86, 0);
    const k = total > S * 0.98 ? (S * 0.98) / total : 1;
    lines.forEach((l, i) => { l.style.fontSize = `${sizes[i] * k}px`; });
  });
}

function setupNav() {
  const nav = $('.nav');
  let lastY = window.scrollY;
  let hidden = false;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const hide = y > lastY && y > 400;
    if (hide !== hidden && Math.abs(y - lastY) > 2) {
      hidden = hide;
      animate(nav, { y: hide ? '-110%' : '0%' }, reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.3 });
    }
    lastY = y;
  }, { passive: true });
  nav.addEventListener('focusin', () => { hidden = false; animate(nav, { y: '0%' }, { duration: 0 }); });
  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
}

function setupMenu() {
  const openBtn = $('.menu-btn');
  const sheet = $('#sheet');
  const closeBtn = $('.sheet-close');
  const open = () => {
    sheet.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!reduce) {
      animate(sheet, { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }, { duration: 0.55, ease: [0.76, 0, 0.24, 1] });
      animate($$('.sheet nav a span'), { y: ['110%', '0%'] }, { delay: stagger(0.05, { startDelay: 0.2 }), ...SOFT });
    }
    $('.sheet nav a').focus();
  };
  const shut = async () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (!reduce) await animate(sheet, { clipPath: 'inset(0 0 100% 0)' }, { duration: 0.45, ease: [0.76, 0, 0.24, 1] });
    sheet.hidden = true;
    openBtn.focus();
  };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', shut);
  $$('a', sheet).forEach((a) => a.addEventListener('click', shut));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) shut(); });
}

function setupButtons() {
  if (reduce) return;
  press('.btn, .qopt', (el) => {
    animate(el, { scale: 0.96 }, SPRING);
    return () => animate(el, { scale: 1 }, { type: 'spring', bounce: 0.45, visualDuration: 0.3 });
  });
}

function setupHero() {
  if (reduce) return;
  const words = $$('.hero .ln .w');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(words, { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.1)
    .fromTo('.hero .pic', { clipPath: 'inset(50% 50% 50% 50% round 18px)' }, { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1.2, stagger: 0.2, ease: 'expo.inOut' }, 0.45)
    .from('.hero .pic .pic-in', { scale: 1.5, duration: 1.6, stagger: 0.2 }, 0.45)
    .from('.hero .kick, .hero-side > *', { opacity: 0, y: 24, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.8)
    .from('.nav > *', { opacity: 0, y: -16, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, 0.9);

  const lines = $$('.hero .ln');
  const dirs = [-1, 1, -1, 1];
  lines.forEach((ln, i) => {
    gsap.to(ln, { xPercent: dirs[i] * 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  });
  gsap.to('.pic-b', { yPercent: -40, rotate: 4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  gsap.to('.hero-side', { yPercent: 18, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  if (finePointer) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      animate('.pic-a .pic-in', { x: x * -14, y: y * -10 }, SOFT);
      animate('.pic-b .pic-in', { x: x * 18, y: y * 14 }, SOFT);
    });
  }
}

function setupWall() {
  if (reduce) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 701px)', () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.wall', start: 'top top', end: '+=140%', pin: '.wall-stage', scrub: 0.8 } });
    tl.fromTo('.wall-photo', { clipPath: 'inset(22% 10% 26% 51% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1 }, 0)
      .fromTo('.wall-photo .pic-in', { scale: 1.35, xPercent: 6 }, { scale: 1, xPercent: 0, ease: 'power2.inOut', duration: 1 }, 0)
      .to('.wall-row:first-child', { xPercent: -4, ease: 'none', duration: 1 }, 0)
      .to('.wall-row:last-child', { xPercent: 4, ease: 'none', duration: 1 }, 0)
      .fromTo('.wall-text, .wall-year, .wall-sign', { opacity: 1 }, { opacity: 0, duration: 0.25 }, 0.75);
  });
  mm.add('(max-width: 700px)', () => {
    gsap.fromTo('.wall-photo', { clipPath: 'inset(30% 20% 30% 40% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.wall', start: 'top 70%', end: 'bottom 40%', scrub: true } });
  });
  gsap.from('.wall-row .fit', { yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.wall', start: 'top 75%' } });
}

function setupManifesto() {
  if (reduce) return;
  const words = $$('.mani .wd');
  gsap.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.mani', start: 'top 80%', end: 'bottom 45%', scrub: true } });
  gsap.from('.manifesto .label', { opacity: 0, x: -20, duration: 0.8, scrollTrigger: { trigger: '.manifesto', start: 'top 80%' } });

  gsap.fromTo('.tk-0 .tk-track', { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
  gsap.fromTo('.tk-1 .tk-track', { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
}

function setupCube() {
  const cube = $('.cube');
  const spans = $$('.face p > span > span');
  if (reduce) return;
  gsap.from(spans, { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: '.cube-pin', start: 'top 70%' } });
  gsap.from('.cl', { opacity: 0, duration: 0.8, stagger: 0.08, scrollTrigger: { trigger: '.cube-pin', start: 'top 60%' } });

  const state = { ry: -24, rx: -22 };
  const px = { x: 0, y: 0 };
  const draw = () => { cube.style.transform = `rotateX(${state.rx + px.y}deg) rotateY(${state.ry + px.x}deg)`; };
  draw();
  gsap.to(state, {
    ry: -66, rx: -34, ease: 'none', onUpdate: draw,
    scrollTrigger: { trigger: '.cube-pin', start: 'top top', end: '+=120%', pin: true, scrub: 0.8 }
  });
  if (finePointer) {
    $('.cube-pin').addEventListener('pointermove', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      animate(px, { x: ((e.clientX - r.left) / r.width - 0.5) * 16, y: -((e.clientY - r.top) / r.height - 0.5) * 10 }, { ...SOFT, onUpdate: draw });
    });
    $('.cube-pin').addEventListener('pointerleave', () => animate(px, { x: 0, y: 0 }, { ...SOFT, onUpdate: draw }));
  }
}

function setupPillars() {
  $$('.pillar').forEach((p) => {
    if (!reduce) {
      inView(p, () => {
        animate($('.p-line', p), { scaleX: [0, 1] }, { duration: 1, ease: [0.76, 0, 0.24, 1] });
        animate([$('.p-num', p), $('.p-name', p), $('.p-body', p)], { y: [40, 0], opacity: [0, 1] }, { delay: stagger(0.08, { startDelay: 0.15 }), ...SOFT });
      }, { amount: 0.4 });
    }
    if (finePointer && !reduce) {
      hover(p, () => {
        animate($('.p-name', p), { x: 24 }, SPRING);
        return () => animate($('.p-name', p), { x: 0 }, SPRING);
      });
    }
  });
}

function setupReveals() {
  if (reduce) return;
  $$('.programs .display, .quiz .display, .team .display, .pro .display, .faq .display, .cta .display').forEach((h) => {
    gsap.from($$('.w', h), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  $$('.side').forEach((s) => gsap.from(s, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 88%' } }));

  inView('.cards', () => {
    animate('.prog', { y: [80, 0], opacity: [0, 1] }, { delay: stagger(0.1), ...SOFT });
  }, { amount: 0.2 });
  if (finePointer) {
    hover('.prog', (el) => {
      animate(el, { y: -10 }, SPRING);
      return () => animate(el, { y: 0 }, SPRING);
    });
  }

  $$('.member').forEach((m, i) => {
    gsap.fromTo($('.pic', m), { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.3, ease: 'expo.inOut', delay: i * 0.12, scrollTrigger: { trigger: '.members', start: 'top 80%' } });
    gsap.fromTo($('.pic-in', m), { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  $$('.qrow').forEach((q) => gsap.from(q, { opacity: 0, y: 50, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: q, start: 'top 85%' } }));
  gsap.from('.faq-item', { opacity: 0, y: 30, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 80%' } });

  gsap.from('.wordmark .wl', { yPercent: 100, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: '.wordmark', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });
}

function setupQuiz() {
  const stageEl = $('.qstage');
  const count = $('.qcount');
  const dots = $$('.qdots i');
  const answers = [];
  let step = 0;

  const view = () => {
    dots.forEach((d, i) => d.classList.toggle('on', i <= step));
    if (step < C.quiz.length) {
      const q = C.quiz[step];
      count.textContent = `${C.quizStep} ${step + 1} ${C.quizOf} ${C.quiz.length}`;
      return `<h3 tabindex="-1">${esc(q.q)}</h3>
        <div class="qopts">${list(q.options, (o, i) => `<button class="qopt" data-i="${i}" aria-pressed="${answers[step] === i}"><span>${esc(o)}</span><span class="arr" aria-hidden="true">→</span></button>`)}</div>
        ${step > 0 ? `<button class="qback">← ${esc(C.quizBack)}</button>` : ''}`;
    }
    count.textContent = C.quizResult;
    const prog = C.programs[answers[1]];
    return `<div class="qresult"><h3 tabindex="-1" class="pick">${esc(C.quizPick)}</h3>
      <div class="big">${esc(prog.name)}</div>
      <p>${esc(C.quiz[1].options[answers[1]])} anni, priorità ${esc(C.quiz[2].options[answers[2]].toLowerCase())}. ${esc(C.quizNote)}</p>
      <div class="row">${btn('#programmi', C.heroCta, 'btn-green')}<button class="btn btn-line qrestart"><span class="btn-label">${esc(C.quizRestart)}</span></button></div></div>`;
  };

  const go = async (next, dir, focus) => {
    if (!reduce) await animate(stageEl, { opacity: 0, x: -24 * dir }, { duration: 0.18, ease: 'easeIn' });
    step = next;
    stageEl.innerHTML = view();
    if (!reduce) {
      animate(stageEl, { opacity: [0, 1], x: [24 * dir, 0] }, SPRING);
      animate($$('.qopt, .big', stageEl), { y: [14, 0], opacity: [0, 1] }, { delay: stagger(0.05), ...SPRING });
    }
    if (focus) $('h3', stageEl).focus({ preventScroll: true });
  };

  stageEl.addEventListener('click', (e) => {
    const opt = e.target.closest('.qopt');
    if (opt) {
      answers[step] = Number(opt.dataset.i);
      $$('.qopt', stageEl).forEach((b) => b.setAttribute('aria-pressed', String(b === opt)));
      setTimeout(() => go(step + 1, 1, true), reduce ? 0 : 180);
      return;
    }
    if (e.target.closest('.qback')) go(step - 1, -1, true);
    if (e.target.closest('.qrestart')) { answers.length = 0; go(0, -1, true); }
  });
  stageEl.innerHTML = view();
}

function setupFaq() {
  let open = -1;
  const set = (i, on) => {
    const b = $(`#faq-q${i}`);
    const panel = $(`#faq-a${i}`);
    b.setAttribute('aria-expanded', String(on));
    panel.setAttribute('aria-hidden', String(!on));
    const opts = reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.4 };
    animate(panel, { height: [`${panel.offsetHeight}px`, on ? `${panel.scrollHeight}px` : '0px'] }, opts).then(() => {
      if (on && open === i) panel.style.height = 'auto';
    });
    animate($('.plus', b), { rotate: on ? 135 : 0 }, reduce ? { duration: 0 } : SPRING);
  };
  $$('.faqbtn').forEach((b) => b.addEventListener('click', () => {
    const i = Number(b.dataset.faq);
    const prev = open;
    open = prev === i ? -1 : i;
    if (prev !== -1) set(prev, false);
    if (open !== -1) set(open, true);
  }));
}

function setupWaitlist() {
  const form = $('.waitlist');
  const input = $('#waitlist-email');
  const msg = $('#waitlist-msg');
  const label = $('.btn-label', form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = input.value.trim() !== '' && input.checkValidity();
    input.setAttribute('aria-invalid', String(!ok));
    msg.textContent = ok ? C.proDone : C.proError;
    if (!ok) {
      if (!reduce) animate(input, { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 });
      input.focus();
      return;
    }
    label.textContent = `✓ ${C.proSent}`;
    if (!reduce) animate(label, { y: [10, 0], opacity: [0, 1] }, SPRING);
  });
}

fitAll();
setupNav();
setupMenu();
setupButtons();
setupHero();
setupWall();
setupManifesto();
setupCube();
setupPillars();
setupReveals();
setupQuiz();
setupFaq();
setupWaitlist();

const refit = () => { fitAll(); ScrollTrigger.refresh(); };
let rt;
window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(refit, 150); });
if (document.fonts) document.fonts.ready.then(refit);
window.addEventListener('load', refit);
