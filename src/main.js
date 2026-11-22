import { animate, scroll, inView, hover, press, stagger } from 'motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './content.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const SPRING = { type: 'spring', bounce: 0.25, visualDuration: 0.45 };
const SNAPPY = { type: 'spring', bounce: 0.4, visualDuration: 0.3 };
const EASE = [0.2, 0.7, 0.2, 1];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = (arr, fn) => arr.map(fn).join('');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const PH = ['sun', 'dusk', '', 'redph'];
const ROT = [-7, 5, -4, 8];

const paperFilter = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="paper" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.011 0.018" numOctaves="5" seed="11" result="noise"/>
    <feDiffuseLighting in="noise" lighting-color="#ffffff" surfaceScale="2.6" diffuseConstant="1.15" result="light">
      <feDistantLight azimuth="235" elevation="48"/>
    </feDiffuseLighting>
    <feComponentTransfer in="light" result="lightc"><feFuncR type="linear" slope="1.25" intercept="-.08"/><feFuncG type="linear" slope="1.25" intercept="-.08"/><feFuncB type="linear" slope="1.25" intercept="-.08"/></feComponentTransfer>
    <feBlend in="SourceGraphic" in2="lightc" mode="multiply" result="lit"/>
    <feComposite in="lit" in2="SourceAlpha" operator="in"/>
  </filter>
</svg>`;

const courtSvg = `<svg viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">
  <path d="M-20 230 L1220 230"/><path d="M140 240 Q600 30 1060 240"/><path d="M600 240 L600 110"/><path d="M-20 160 Q600 120 1220 160"/>
</svg>`;

function render() {
  const word = C.heroWord;
  return `${paperFilter}
<div class="page">
  <header class="hero" id="top">
    <div class="wrap">
      <div class="hero-card grain">
        <div class="sunball" aria-hidden="true"></div>
        <div class="court" aria-hidden="true">${courtSvg}</div>
        <nav class="nav" aria-label="Principale">
          <div class="nav-l">${list(C.nav.slice(0, 2), (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}</div>
          <a href="#top" class="logo" aria-label="OTS, torna all’inizio">OTS</a>
          <div class="nav-r">${list(C.nav.slice(2), (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}<a href="#login">${esc(C.login)}</a></div>
          <button class="menu-btn" aria-expanded="false" aria-controls="sheet">Menu</button>
        </nav>
        <div class="hero-stage">
          <div class="hero-photo ph grain" aria-hidden="true"><span class="ph-label">${esc(C.heroPhoto)}</span></div>
          <p class="slash hero-slash">${esc(C.heroSlash)}</p>
          <p class="display hero-word paper" aria-hidden="true">${list([...word], (ch) => `<span class="ch">${esc(ch)}</span>`)}</p>
          <span class="hero-side" aria-hidden="true">${esc(C.heroSide)}</span>
        </div>
      </div>
      <div class="hero-foot">
        <div>
          <p class="kick">${esc(C.heroKicker)}</p>
          <h1 class="display">${list(C.heroTitle, (w, i) => `<span class="ln"><span${i === 2 ? ' class="red"' : ''}>${esc(w)}</span></span>`)}</h1>
        </div>
        <div>
          <p class="lead soft reveal">${esc(C.heroText)}</p>
          <div class="actions reveal">
            <a href="#programmi" class="btn btn-red">${esc(C.heroCta)} <span class="arr" aria-hidden="true">→</span></a>
            <a href="#quiz" class="btn btn-line">${esc(C.heroCta2)}</a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
    <div class="sheet-top"><span class="logo">OTS</span><button class="sheet-close" aria-label="Chiudi il menu">×</button></div>
    <nav aria-label="Menu mobile">${list(C.nav, (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}<a href="#login">${esc(C.login)}</a></nav>
    <a href="#quiz" class="btn btn-cream">${esc(C.navCta)}</a>
  </div>

  <main>
    <section id="metodo" class="intro" aria-labelledby="metodo-t">
      <svg class="ball-line" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="760" cy="360" r="300" pathLength="1"/><path d="M460 360 Q760 520 1060 360" pathLength="1"/><path d="M760 60 Q600 360 760 660" pathLength="1"/>
      </svg>
      <div class="wrap intro-grid">
        <div class="stack">
          <h2 id="metodo-t" class="sr">${esc(C.methodTitle)}</h2>
          <span class="display w1" aria-hidden="true">${esc(C.methodWords[0])}</span>
          <div class="ph tilt grain" aria-hidden="true"><span>${esc(C.photoBand)}</span></div>
          <span class="display w2 paper" aria-hidden="true">${esc(C.methodWords[1])}</span>
        </div>
        <div class="manifesto" style="position:relative;">
          <p>${list(C.manifesto.split(' '), (w) => `<span class="wd${C.manifestoHot.includes(w) ? ' hot' : ''}">${esc(w)}</span> `)}</p>
          <div class="float-card ph redph" aria-hidden="true">OTS</div>
        </div>
      </div>
    </section>

    <section class="pillars" aria-labelledby="pillars-t">
      <div class="wrap">
        <div class="panel">
          <div class="panel-head">
            <h2 id="pillars-t" class="display">${esc(C.methodHead[0])}</h2>
            <span class="sl" aria-hidden="true">/</span>
            <span class="display" aria-hidden="true">${esc(C.methodHead[1])}</span>
          </div>
          <div class="marquee" aria-hidden="true"><div class="track">${list([0, 1], () => list(C.marquee, (m) => `<span>${esc(m)}</span>`) + `<span>${esc(C.methodText)}</span>`)}</div></div>
          <div class="p-body">
            <div class="p-visual">
              <div class="p-cards">${list(C.pillars, (p, i) => `<div class="ph ${PH[i]} grain" data-i="${i}" aria-hidden="true">[Foto: ${esc(p.detail.toLowerCase())}]</div>`)}</div>
              <p class="p-desc" aria-live="polite"><b>${esc(C.pillars[0].detail)}</b>${esc(C.pillars[0].text)}</p>
            </div>
            <ul class="p-list">${list(C.pillars, (p, i) => `<li><button data-i="${i}" aria-current="${i === 0}">${esc(p.name)}</button></li>`)}</ul>
          </div>
          <span class="p-count" aria-hidden="true">01 / 0${C.pillars.length}</span>
        </div>
      </div>
    </section>

    <section id="programmi" class="programs" aria-labelledby="prog-t">
      <div class="wrap">
        <div class="prog-head">
          <div class="ph peek sun grain" aria-hidden="true"></div>
          <h2 id="prog-t" class="display big paper">${list(C.progTitle.split(' '), (w) => `<span class="ln"><span>${esc(w)}</span></span>`)}</h2>
          <p class="lead soft reveal">${esc(C.progText)}</p>
        </div>
        <div class="cards">
          ${list(C.programs, (p, i) => `
          <article class="prog${p.featured ? ' featured' : ''}" style="--r:${[-2, 1.5, -1][i]}deg">
            <div class="top"><span>${esc(p.level)}</span>${p.featured ? `<span class="badge">${esc(C.featured)}</span>` : ''}</div>
            <h3 class="display d3">${esc(p.name)}</h3>
            <p class="soft" style="margin:0;">${esc(p.desc)}</p>
            <ul>${list(p.features, (f) => `<li>${esc(f)}</li>`)}</ul>
            <div class="price">${esc(p.price)}</div>
            <a href="#checkout" class="btn ${p.featured ? 'btn-ink' : 'btn-line'}">${esc(C.buy)}</a>
          </article>`)}
        </div>
        <p class="note soft">${esc(C.progNote)}</p>
      </div>
    </section>

    <section id="quiz" class="quiz" aria-labelledby="quiz-t">
      <div class="wrap">
        <div class="quiz-card">
          <span class="quiz-word" aria-hidden="true">Quiz</span>
          <div style="position:relative;z-index:1;">
            <h2 id="quiz-t" class="display">${esc(C.quizTitle)}</h2>
            <p class="lead">${esc(C.quizText)}</p>
          </div>
          <div class="qbox">
            <div class="qmeta"><span class="qcount"></span><span class="qdots">${list(C.quiz, () => '<i></i>')}</span></div>
            <div class="qstage" aria-live="polite"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="team" aria-labelledby="team-t">
      <div class="wrap">
        <div class="sec-head">
          <h2 id="team-t" class="display d2"><span class="ln"><span>${esc(C.teamTitle.split(' ').slice(0, -1).join(' '))} <em class="red" style="font-style:normal">${esc(C.teamTitle.split(' ').pop())}</em></span></span></h2>
          <p class="lead soft reveal">${esc(C.teamText)}</p>
        </div>
        <div class="members">
          ${list(C.team, (m, i) => `
          <div class="member">
            <div class="ph ${PH[i]} grain" style="--r:${[-4, 3, -2][i]}deg">${esc(C.photo)}</div>
            <div class="name">${esc(m.name)}</div>
            <div class="soft">${esc(m.role)}</div>
          </div>`)}
        </div>
      </div>
    </section>

    <section class="quotes" aria-labelledby="quotes-t">
      <div class="wrap">
        <h2 id="quotes-t" class="display d2" style="max-width:12ch;">${esc(C.quotesTitle)}</h2>
        <div class="qcards">
          ${list(C.quotes, (q) => `<figure class="qcard"><blockquote>${esc(q.text)}</blockquote><figcaption>${esc(q.who)}</figcaption></figure>`)}
        </div>
      </div>
    </section>

    <section id="pro" class="pro" aria-labelledby="pro-t">
      <div class="wrap">
        <div class="pro-card">
          <div>
            <span class="tag">${esc(C.proTag)}</span>
            <h2 id="pro-t" class="display d2">${esc(C.proTitle)}</h2>
            <p class="lead soft" style="margin-top:20px;">${esc(C.proText)}</p>
          </div>
          <form class="waitlist" novalidate>
            <label class="lbl" for="waitlist-email">${esc(C.proLabel)}</label>
            <div class="field-row">
              <input id="waitlist-email" class="field" type="email" required autocomplete="email" placeholder="nome@email.it" aria-describedby="waitlist-msg">
              <button class="btn btn-red" type="submit"><span class="btn-label">${esc(C.proBtn)}</span></button>
            </div>
            <p id="waitlist-msg" class="form-msg soft" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>

    <section id="faq" class="faq" aria-labelledby="faq-t">
      <div class="wrap faq-grid">
        <h2 id="faq-t" class="display d2">${esc(C.faqTitle)}</h2>
        <div class="faq-list">
          ${list(C.faq, (f, i) => `
          <div class="faq-item">
            <button class="faqbtn" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}" data-faq="${i}"><span>${esc(f.q)}</span><span class="plus" aria-hidden="true">+</span></button>
            <div class="faq-a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}" aria-hidden="true"><p>${esc(f.a)}</p></div>
          </div>`)}
        </div>
      </div>
    </section>

    <section class="cta" aria-labelledby="cta-t">
      <span class="cta-word paper" aria-hidden="true">${esc(C.marquee.slice(0, 3).join(' · '))}</span>
      <div class="wrap cta-mid">
        <h2 id="cta-t">${esc(C.ctaTitle)}</h2>
        <a href="#programmi" class="btn btn-red">${esc(C.ctaBtn)} <span class="arr" aria-hidden="true">→</span></a>
      </div>
      <span class="cta-word k" aria-hidden="true">${esc(C.heroTitle.join(' '))}</span>
    </section>
  </main>

  <footer>
    <div class="wrap foot">
      <span class="logo">OTS</span>
      <nav aria-label="Legale">${list(C.footLinks, (l) => `<a href="#">${esc(l)}</a>`)}</nav>
      <span>${esc(C.footContact)}</span>
      <span>© ${new Date().getFullYear()} OTS. ${esc(C.rights)}</span>
    </div>
  </footer>
</div>`;
}

document.querySelector('#app').innerHTML = render();

/* ---------- menu ---------- */
function setupMenu() {
  const btn = $('.menu-btn');
  const sheet = $('#sheet');
  const close = $('.sheet-close');
  const open = () => {
    sheet.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!reduce) {
      animate(sheet, { clipPath: ['circle(0% at 92% 4%)', 'circle(150% at 92% 4%)'] }, { duration: 0.55, ease: EASE });
      animate($$('nav a', sheet), { y: [40, 0], opacity: [0, 1] }, { delay: stagger(0.05, { startDelay: 0.12 }), ...SPRING });
    }
    close.focus();
  };
  const shut = async () => {
    if (!reduce) await animate(sheet, { clipPath: 'circle(0% at 92% 4%)' }, { duration: 0.35, ease: 'easeIn' });
    sheet.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    btn.focus();
  };
  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  $$('nav a', sheet).concat($$('.btn', sheet)).forEach((a) => a.addEventListener('click', shut));
  sheet.addEventListener('keydown', (e) => { if (e.key === 'Escape') shut(); });
}

/* ---------- hero intro + parallax ---------- */
function setupHero() {
  const card = $('.hero-card');
  const chars = $$('.hero-word .ch');
  const lines = $$('.hero-foot h1 .ln > span');
  if (reduce) return;

  animate(card, { clipPath: ['inset(12% 8% 12% 8% round 24px)', 'inset(0% 0% 0% 0% round 4px)'] }, { duration: 1.1, ease: EASE });
  animate($$('.nav > *'), { opacity: [0, 1], y: [-12, 0] }, { delay: stagger(0.06, { startDelay: 0.5 }), duration: 0.5, ease: EASE });
  animate('.hero-photo', { y: ['60%', '0%'] }, { delay: 0.35, type: 'spring', bounce: 0.2, visualDuration: 0.9 });
  animate(chars, { y: ['105%', '0%'], rotate: [8, 0] }, { delay: stagger(0.055, { startDelay: 0.55, from: 'center' }), type: 'spring', bounce: 0.35, visualDuration: 0.7 });
  animate($$('.hero-slash, .hero-side'), { opacity: [0, 1], x: [-16, 0] }, { delay: 1.1, duration: 0.6, ease: EASE });
  animate(lines, { y: ['110%', '0%'] }, { delay: stagger(0.08, { startDelay: 0.9 }), ...SPRING });
  animate('.hero-foot .reveal', { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1, { startDelay: 1.1 }), ...SPRING });

  // Scroll-linked: the word sinks & spreads while the photo rises, like the camera pulling back.
  scroll(animate('.hero-word', { y: [0, 90], scale: [1, 0.92] }, { ease: 'linear' }), { target: card, offset: ['start start', 'end start'] });
  scroll(animate('.hero-photo', { y: [0, -60] }, { ease: 'linear' }), { target: card, offset: ['start start', 'end start'] });
  scroll(animate('.sunball', { scale: [1, 1.6], opacity: [1, 0.4] }, { ease: 'linear' }), { target: card, offset: ['start start', 'end start'] });

  // Each letter springs up on hover — a playful nod to the jump in the photo.
  if (finePointer) {
    chars.forEach((ch) => hover(ch, () => {
      animate(ch, { y: -24, rotate: -4 }, SNAPPY);
      return () => animate(ch, { y: 0, rotate: 0 }, { type: 'spring', bounce: 0.55, visualDuration: 0.45 });
    }));
  }
}

/* ---------- generic reveals ---------- */
function setupReveals() {
  if (reduce) return;
  $$('.sec-head .ln > span, .prog-head .ln > span').forEach((el) => { el.style.transform = 'translateY(110%)'; });
  inView('.sec-head, .prog-head', (el) => {
    animate($$('.ln > span', el), { y: ['110%', '0%'] }, { delay: stagger(0.08), ...SPRING });
    animate($$('.reveal', el), { opacity: [0, 1], y: [24, 0] }, { delay: 0.2, ...SPRING });
  }, { amount: 0.4 });

  $$('.d2:not(.sec-head .d2), .quiz-card .display, .panel-head .display').forEach((h) => {
    h.style.opacity = '0';
    inView(h, () => { animate(h, { opacity: [0, 1], y: [50, 0], rotate: [-2, 0] }, SPRING); }, { amount: 0.3 });
  });

  inView('.qcards', (el) => { $$('.qcard', el).forEach((q, i) => animate(q, { y: [60, 0], opacity: [0, 1], rotate: [[-4, 2, -3][i], 0] }, { delay: i * 0.1, ...SPRING })); }, { amount: 0.2 });
  inView('.faq-list', (el) => { animate($$('.faq-item', el), { opacity: [0, 1], x: [30, 0] }, { delay: stagger(0.07), ...SPRING }); }, { amount: 0.2 });
}

/* ---------- method intro: tilted card + scroll-painted manifesto ---------- */
function setupIntro() {
  if (reduce) {
    $$('.manifesto .wd:not(.hot)').forEach((w) => { w.style.color = 'var(--ink)'; });
    return;
  }
  gsap.fromTo('.stack .tilt', { rotation: -10, y: 80 }, { rotation: 5, y: -40, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.stack .w1', { xPercent: -18 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.stack .w2', { xPercent: 22 }, { xPercent: -4, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.float-card', { y: 120, rotation: 14 }, { y: -120, rotation: -10, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: true } });

  // Words go from faded to ink as you read; the hot words fill red.
  const words = $$('.manifesto .wd');
  gsap.fromTo(words, { color: '#A3A08C' }, {
    color: (i, el) => (el.classList.contains('hot') ? '#E0381E' : '#111111'),
    stagger: 0.05, ease: 'none',
    scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true }
  });
  words.filter((w) => w.classList.contains('hot')).forEach((w) => { w.style.color = '#A3A08C'; });

  // Basketball seam lines draw themselves.
  const paths = $$('.ball-line circle, .ball-line path');
  paths.forEach((p) => { p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; });
  gsap.to(paths, { strokeDashoffset: 0, stagger: 0.15, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top 70%', end: 'center center', scrub: true } });
}

/* ---------- pillars panel: pinned list that drives a deck of tilted cards ---------- */
function setupPillars() {
  const cards = $$('.p-cards .ph');
  const btns = $$('.p-list button');
  const desc = $('.p-desc');
  const count = $('.p-count');
  let active = -1;

  const show = (i, instant = false) => {
    if (i === active) return;
    const prev = active;
    active = i;
    btns.forEach((b, j) => b.setAttribute('aria-current', String(j === i)));
    count.textContent = `0${i + 1} / 0${cards.length}`;
    const opts = instant || reduce ? { duration: 0 } : SPRING;
    cards.forEach((c, j) => {
      const d = (j - i + cards.length) % cards.length; // depth in the deck
      c.style.zIndex = String(cards.length - d);
      animate(c, { rotate: d === 0 ? ROT[j] / 2 : ROT[j] + d * 3, x: d * 18, y: d * -14, scale: 1 - d * 0.06, opacity: d > 2 ? 0 : 1 - d * 0.25 }, opts);
    });
    if (!instant && !reduce && prev !== -1) {
      animate(cards[i], { y: [-60, 0] }, { type: 'spring', bounce: 0.45, visualDuration: 0.5 });
      animate(btns[i], { x: [-14, 0] }, SNAPPY);
    }
    const p = C.pillars[i];
    desc.innerHTML = `<b>${esc(p.detail)}</b>${esc(p.text)}`;
    if (!instant && !reduce) animate(desc, { opacity: [0, 1], y: [10, 0] }, { duration: 0.35, ease: EASE });
  };
  show(0, true);

  btns.forEach((b) => b.addEventListener('click', () => show(Number(b.dataset.i))));
  if (finePointer) btns.forEach((b) => hover(b, () => { show(Number(b.dataset.i)); }));

  // Marquee: one linear Motion loop, paused when off screen.
  const track = $('.marquee .track');
  if (!reduce) {
    const loop = animate(track, { x: ['0%', '-50%'] }, { duration: 28, ease: 'linear', repeat: Infinity });
    inView('.marquee', () => { loop.play(); return () => loop.pause(); });
  }

  if (reduce) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 961px)', () => {
    ScrollTrigger.create({
      trigger: '.pillars .panel',
      start: 'center center',
      end: `+=${cards.length * 70}%`,
      pin: '.pillars',
      onUpdate: (st) => show(Math.min(cards.length - 1, Math.floor(st.progress * cards.length)))
    });
  });
  gsap.fromTo('.pillars .panel', { scale: 0.92, borderRadius: 48 }, { scale: 1, borderRadius: 24, ease: 'none', scrollTrigger: { trigger: '.pillars', start: 'top bottom', end: 'top 30%', scrub: true } });
}

/* ---------- programs: cards deal in, tilt on hover ---------- */
function setupPrograms() {
  const cards = $$('.prog');
  if (!reduce) {
    gsap.fromTo('.prog-head .peek', { rotation: -14, y: 60 }, { rotation: 10, y: -40, ease: 'none', scrollTrigger: { trigger: '.programs', start: 'top bottom', end: 'center top', scrub: true } });
    cards.forEach((c) => { c.style.opacity = '0'; });
    inView('.cards', () => {
      cards.forEach((c, i) => animate(c, { opacity: [0, 1], y: [120, 0], rotate: [[-12, 6, 12][i], [-2, 1.5, -1][i]] }, { delay: i * 0.09, type: 'spring', bounce: 0.3, visualDuration: 0.7 }));
    }, { amount: 0.15 });
  }
  if (!finePointer || reduce) return;
  cards.forEach((c, i) => {
    const base = [-2, 1.5, -1][i];
    hover(c, () => {
      animate(c, { rotate: 0, y: -12, scale: 1.02 }, SNAPPY);
      return () => animate(c, { rotate: base, y: 0, scale: 1 }, SPRING);
    });
  });
}

/* ---------- team: fanned cards straighten while scrolling ---------- */
function setupTeam() {
  if (reduce) return;
  $$('.member .ph').forEach((ph, i) => {
    const r = [-9, 7, -6][i];
    gsap.fromTo(ph, { rotation: r, y: 24 + i * 12 }, { rotation: r / 3, y: 0, ease: 'none', scrollTrigger: { trigger: '.members', start: 'top bottom', end: 'center 55%', scrub: true } });
  });
}

/* ---------- final CTA words slide in opposite directions ---------- */
function setupCta() {
  if (reduce) return;
  const [a, b] = $$('.cta-word');
  scroll(animate(a, { x: ['20%', '-30%'] }, { ease: 'linear' }), { target: $('.cta'), offset: ['start end', 'end start'] });
  scroll(animate(b, { x: ['-40%', '5%'] }, { ease: 'linear' }), { target: $('.cta'), offset: ['start end', 'end start'] });
}

/* ---------- press feedback on every button ---------- */
function setupPress() {
  if (reduce) return;
  press('.btn, .qopt', (el) => {
    animate(el, { scale: 0.95 }, SNAPPY);
    return () => animate(el, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
  });
}

/* ---------- quiz ---------- */
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
        <div class="qopts">${list(q.options, (o, i) => `<button class="qopt" data-i="${i}" aria-pressed="${answers[step] === i}"><span>${esc(o)}</span></button>`)}</div>
        ${step > 0 ? `<button class="qback">${esc(C.quizBack)}</button>` : ''}`;
    }
    count.textContent = C.quizResult;
    const prog = C.programs[answers[1]];
    return `<div class="qresult"><h3 tabindex="-1" style="font-family:var(--font);font-size:15px;text-transform:none;margin:0;color:var(--ink-soft);">${esc(C.quizPick)}</h3>
      <div class="big">${esc(prog.name)}</div>
      <p>${esc(C.quiz[1].options[answers[1]])} anni, priorità ${esc(C.quiz[2].options[answers[2]].toLowerCase())}. ${esc(C.quizNote)}</p>
      <div class="row"><a href="#programmi" class="btn btn-red">${esc(C.heroCta)}</a><button class="btn btn-line qrestart">${esc(C.quizRestart)}</button></div></div>`;
  };

  const go = async (next, dir, focus) => {
    if (!reduce) await animate(stageEl, { opacity: 0, x: -24 * dir }, { duration: 0.18, ease: 'easeIn' });
    step = next;
    stageEl.innerHTML = view();
    if (!reduce) {
      animate(stageEl, { opacity: [0, 1], x: [24 * dir, 0] }, SPRING);
      animate($$('.qopt, .big', stageEl), { y: [14, 0], opacity: [0, 1] }, { delay: stagger(0.05), ...SPRING });
      if (step >= C.quiz.length) animate('.quiz-word', { rotate: [-8, 0], scale: [1.15, 1] }, { type: 'spring', bounce: 0.5, visualDuration: 0.6 });
    }
    if (focus) $('h3', stageEl).focus({ preventScroll: true });
  };

  stageEl.addEventListener('click', (e) => {
    const opt = e.target.closest('.qopt');
    if (opt) {
      answers[step] = Number(opt.dataset.i);
      $$('.qopt', stageEl).forEach((b) => b.setAttribute('aria-pressed', String(b === opt)));
      setTimeout(() => go(step + 1, 1, true), reduce ? 0 : 160);
      return;
    }
    if (e.target.closest('.qback')) go(step - 1, -1, true);
    if (e.target.closest('.qrestart')) { answers.length = 0; go(0, -1, true); }
  });
  stageEl.innerHTML = view();
  if (!reduce) scroll(animate('.quiz-word', { x: ['10%', '-10%'] }, { ease: 'linear' }), { target: $('.quiz-card'), offset: ['start end', 'end start'] });
}

/* ---------- FAQ ---------- */
function setupFaq() {
  let open = -1;
  const set = (i, on) => {
    const btn = $(`#faq-q${i}`);
    const panel = $(`#faq-a${i}`);
    btn.setAttribute('aria-expanded', String(on));
    panel.setAttribute('aria-hidden', String(!on));
    const opts = reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.35 };
    animate(panel, { height: [`${panel.offsetHeight}px`, on ? `${panel.scrollHeight}px` : '0px'] }, opts).then(() => {
      if (on && open === i) panel.style.height = 'auto';
    });
    animate($('.plus', btn), { rotate: on ? 135 : 0, backgroundColor: on ? '#E0381E' : '#111111' }, reduce ? { duration: 0 } : SPRING);
  };
  $$('.faqbtn').forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.faq);
    const prev = open;
    open = prev === i ? -1 : i;
    if (prev !== -1) set(prev, false);
    if (open !== -1) set(open, true);
  }));
}

/* ---------- waitlist ---------- */
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

setupMenu();
setupHero();
setupReveals();
setupIntro();
setupPillars();
setupPrograms();
setupTeam();
setupCta();
setupPress();
setupQuiz();
setupFaq();
setupWaitlist();
window.addEventListener('load', () => ScrollTrigger.refresh());
if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
