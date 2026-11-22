import { animate, scroll, inView, hover, press, stagger } from 'motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './content.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const wide = () => window.matchMedia('(min-width: 1025px)').matches;
const SPRING = { type: 'spring', bounce: 0.2, visualDuration: 0.4 };
const SNAP = { type: 'spring', bounce: 0, visualDuration: 0.3 };
const CYCLE = ['orange', 'blue'];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = (arr, fn) => arr.map(fn).join('');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const tick = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';

/* Ribbon sets: a black band with orange and blue lines running alongside it. */
const RIBBONS = {
  hero: { vb: '0 0 1200 800', layers: [
    { d: 'M-60,400 C220,260 420,540 760,360 S1120,140 1290,220', k: 'k', w: 48 },
    { d: 'M-60,400 C220,260 420,540 760,360 S1120,140 1290,220', k: 'o', w: 10, t: [0, -48] },
    { d: 'M-60,400 C220,260 420,540 760,360 S1120,140 1290,220', k: 'b', w: 10, t: [0, -66] },
    { d: 'M-60,400 C220,260 420,540 760,360 S1120,140 1290,220', k: 'b', w: 6, t: [0, 48] }
  ] },
  stage: { vb: '0 0 600 600', layers: [
    { d: 'M-40,420 C120,300 300,520 640,180', k: 'k', w: 90 },
    { d: 'M-40,420 C120,300 300,520 640,180', k: 'o', w: 10, t: [0, -62] },
    { d: 'M-40,420 C120,300 300,520 640,180', k: 'b', w: 10, t: [0, -84] },
    { d: 'M-40,420 C120,300 300,520 640,180', k: 'b', w: 6, t: [0, 62] }
  ] },
  card: { vb: '0 0 400 500', layers: [
    { d: 'M-20,380 C100,330 220,420 420,300', k: 'k', w: 60 },
    { d: 'M-20,380 C100,330 220,420 420,300', k: 'o', w: 7, t: [0, -40] },
    { d: 'M-20,380 C100,330 220,420 420,300', k: 'b', w: 7, t: [0, -54] }
  ] },
  board: { vb: '0 0 1200 700', layers: [
    { d: 'M-40,640 C300,560 520,700 820,560 S1160,420 1260,460', k: 'o', w: 6 },
    { d: 'M-40,662 C300,582 520,722 820,582 S1160,442 1260,482', k: 'b', w: 6 }
  ] },
  wide: { vb: '0 0 1200 500', layers: [
    { d: 'M700,-40 C760,160 900,300 1260,330', k: 'k', w: 130 },
    { d: 'M700,-40 C760,160 900,300 1260,330', k: 'o', w: 12, t: [-56, 76] },
    { d: 'M700,-40 C760,160 900,300 1260,330', k: 'b', w: 12, t: [-80, 104] },
    { d: 'M-40,120 C120,60 260,140 380,-40', k: 'b', w: 8 },
    { d: 'M-40,148 C130,84 280,168 404,-40', k: 'o', w: 8 }
  ] }
};

function ribbons(name, cls = '') {
  const r = RIBBONS[name];
  const out = r.layers.map((l) => {
    const t = l.t ? ` transform="translate(${l.t[0]} ${l.t[1]})"` : '';
    return `<path class="rb-${l.k}" data-draw d="${l.d}" stroke-width="${l.w}" pathLength="1"${t}/>`;
  }).join('');
  return `<svg class="ribbons ${cls}" viewBox="${r.vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${out}</svg>`;
}

const cornerMark = '<svg class="corner-mark" viewBox="0 0 64 44" aria-hidden="true"><path d="M10 44 L26 0 h10 L20 44z" fill="#F7924A"/><path d="M24 44 L40 0 h10 L34 44z" fill="#41AEF2"/><path d="M38 44 L54 0 h10 L48 44z" fill="#08090A"/></svg>';
const athlete = '<svg viewBox="0 0 100 160" aria-hidden="true"><circle cx="52" cy="18" r="12" fill="#08090A"/><path d="M34 36 h34 l10 52 -10 2 -6 -30 -2 40 8 58 h-14 l-8 -50 -6 50 h-14 l6 -60 -2 -38 -8 28 -10 -2z" fill="#08090A"/><circle cx="84" cy="96" r="11" fill="#08090A"/></svg>';
const logo = (tag = 'a', extra = '') => `<${tag} ${tag === 'a' ? 'href="#top"' : ''} class="logo" ${extra}>OT<span class="s">S</span><span class="dot" aria-hidden="true"></span></${tag}>`;
const photo = (label) => `<div class="photo"></div>${label ? `<span class="photo-label">${esc(label)}</span>` : ''}`;
const chars = (word) => list([...word], (c) => `<span class="ch paper">${esc(c)}</span>`);

function manifestoHtml() {
  const hot = C.manifestoHot.flatMap((h) => h.split(' '));
  return list(C.manifesto.split(' '), (w) => {
    const i = hot.indexOf(w);
    if (i !== -1) hot.splice(i, 1);
    return `<span class="wd${i !== -1 ? ' hot' : ''}">${esc(w)}</span> `;
  });
}

function render() {
  const half = Math.ceil(C.nav.length / 2);
  const ticker = list([0, 1], () => list(C.pillars, (p) => `<span>${esc(p.name)}</span>`));
  const line = list([0, 1, 2, 3], () => `<span>${esc(C.methodText)}</span><span>${esc(C.manifesto)}</span>`);
  return `
<div class="progress" aria-hidden="true"></div>
<header class="nav">
  <div class="wrap">
    <nav class="nav-side" aria-label="Principale">${list(C.nav.slice(0, half), (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}</nav>
    ${logo('a', 'aria-label="OTS, torna all’inizio"')}
    <nav class="nav-side right" aria-label="Secondaria">
      ${list(C.nav.slice(half), (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}
      <a href="#login" data-login>${esc(C.login)}</a>
      <a href="#quiz" class="btn btn-orange">${esc(C.navCta)}</a>
    </nav>
    <button class="menu-btn" aria-label="Apri il menu" aria-expanded="false" aria-controls="sheet"><i></i><i></i></button>
  </div>
</header>
<div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  ${ribbons('stage')}
  <div class="sheet-top">${logo('span')}<button class="icon-btn sheet-close" aria-label="Chiudi il menu">×</button></div>
  <nav aria-label="Menu mobile">
    ${list(C.nav, (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}
    <a href="#login" data-login>${esc(C.login)}</a>
  </nav>
  <a href="#quiz" class="btn btn-orange btn-block">${esc(C.navCta)}</a>
</div>

<main>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="wrap">
      <div class="hero-frame">
        ${photo('')}
        <span class="photo-label hero-photo-label">${esc(C.heroPhoto)}</span>
        <p class="slash hero-tag">${esc(C.heroTag)}</p>
        <h1 id="hero-title" class="hero-word" aria-label="${esc(C.heroTitle.join(' '))}"><span aria-hidden="true">${chars(C.heroWord)}</span></h1>
        ${ribbons('hero')}
        <span class="hero-side" aria-hidden="true">${esc(C.heroSide)}</span>
        ${cornerMark}
      </div>
      <div class="hero-under">
        <p class="lead">${esc(C.heroText)}</p>
        <div class="actions">
          <a href="#programmi" class="btn btn-orange">${esc(C.heroCta)}</a>
          <a href="#quiz" class="btn btn-outline">${esc(C.heroCta2)}</a>
        </div>
        <div class="stats">${list(C.heroStats, (s) => `<div class="stat"><b data-count="${esc(s.n)}">${esc(s.n)}</b><span>${esc(s.l)}</span></div>`)}</div>
      </div>
    </div>
  </section>

  <div class="ticker" aria-hidden="true"><div class="ticker-track">${ticker}</div></div>

  <section id="metodo" class="intro" aria-labelledby="intro-title">
    <div class="wrap">
      <h2 id="intro-title" class="intro-stack">
        <span class="display intro-w1">${esc(C.methodWords[0])}</span>
        <span class="intro-card" aria-hidden="true">${photo(C.methodPhoto)}${ribbons('card')}</span>
        <span class="display intro-w2 paper">${esc(C.methodWords[1])}</span>
      </h2>
      <div class="intro-copy">
        <p class="slash">/ ${esc(C.methodTitle)}</p>
        <p class="lead">${esc(C.methodText)}</p>
      </div>
    </div>
  </section>

  <section class="pillars" aria-label="Le quattro basi">
    <div class="wrap">
      <div class="board">
        <div class="board-head" aria-hidden="true">
          <span class="display">${esc(C.pillarsHead[0])}</span><span class="sep">/</span><span class="display o">${esc(C.pillarsHead[1])}</span>
        </div>
        <div class="board-line" aria-hidden="true"><div class="board-line-track">${line}</div></div>
        <div class="board-body">
          <div class="board-detail" aria-live="polite"></div>
          <ul class="plist">${list(C.pillars, (p, i) => `<li><button aria-pressed="${i === 1}" data-p="${i}">${esc(p.name)}</button></li>`)}</ul>
        </div>
        ${ribbons('board')}
        <div class="float-card" aria-hidden="true">${photo('')}<div class="tint"></div></div>
      </div>
    </div>
  </section>

  <section class="manifesto" aria-label="Il nostro approccio">
    <div class="wrap">
      <p>${manifestoHtml()}</p>
      <div class="m-card" aria-hidden="true">${photo('')}${athlete}</div>
    </div>
  </section>

  <section class="app-sec" aria-labelledby="app-title">
    <div class="wrap app-grid">
      <div class="stage">
        ${ribbons('stage')}
        <div class="phone" role="img" aria-label="Anteprima dell’app OTS: ${esc(C.app.week)}, ${esc(C.app.title)}, ${C.app.items.length} esercizi">
          <div class="screen" aria-hidden="true">
            <div class="app-head">
              <div><div class="app-week">${esc(C.app.week)} · ${esc(C.app.day)}</div><div class="app-title">${esc(C.app.title)}</div></div>
              <div class="ring"><svg viewBox="0 0 58 58"><circle class="bg" cx="29" cy="29" r="24"/><circle class="fg" cx="29" cy="29" r="24" stroke-dasharray="150.8" stroke-dashoffset="150.8"/></svg><b>0%</b></div>
            </div>
            <div class="ex"><ul>
              ${list(C.app.items, (it, i) => `<li><span class="check" style="--c:var(--${CYCLE[i % 2]})">${tick}</span><span>${esc(it.name)}</span><span class="sets">${esc(it.sets)}</span></li>`)}
            </ul></div>
            <div class="rest"><span>${esc(C.app.rest)}</span><b>0:45</b></div>
          </div>
        </div>
      </div>
      <div>
        <p class="slash" data-reveal>/ App OTS</p>
        <h2 id="app-title" class="display d2" style="margin-top:18px" data-reveal>${esc(C.appTitle)}</h2>
        <p class="lead" style="margin-top:22px" data-reveal>${esc(C.appText)}</p>
        <ul class="features">${list(C.appFeatures, (f, i) => `<li data-reveal><i>0${i + 1}</i>${esc(f)}</li>`)}</ul>
      </div>
    </div>
  </section>

  <section id="programmi" class="programs">
    <div class="wrap">
      <div class="sec-head">
        <h2 class="display d2" data-reveal>${esc(C.progTitle)}</h2>
        <p class="lead" data-reveal>${esc(C.progText)}</p>
      </div>
      <div class="cards">
        ${list(C.programs, (p, i) => `
        <article class="prog${p.featured ? ' featured' : ''}" data-card data-tilt="${[-2.5, 0, 2.5][i]}">
          <div class="top"><span>${esc(p.level)}</span>${p.featured ? `<span class="badge">${esc(C.featured)}</span>` : ''}</div>
          <h3 class="display">${esc(p.name)}</h3>
          <p style="margin:0;color:var(--muted)">${esc(p.desc)}</p>
          <ul>${list(p.features, (f) => `<li>${esc(f)}</li>`)}</ul>
          <div class="price">${esc(p.price)}</div>
          <a href="#checkout" class="btn ${p.featured ? 'btn-orange' : 'btn-outline'} btn-block">${esc(C.buy)}</a>
        </article>`)}
      </div>
      <p class="note">${esc(C.progNote)}</p>
    </div>
  </section>

  <section id="quiz" class="quiz">
    <div class="wrap">
      <div class="quiz-frame">
        <div class="quiz-photo">
          <div class="photo"></div>
          ${ribbons('card')}
          <div class="copy">
            <h2 class="display d2">${esc(C.quizTitle)}</h2>
            <p class="lead">${esc(C.quizText)}</p>
          </div>
        </div>
        <div class="qbox">
          <div class="qmeta"><span class="qcount"></span><span class="qdots">${list(C.quiz, () => '<i></i>')}</span></div>
          <div class="qstage" aria-live="polite"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="team" class="team">
    <div class="wrap">
      <div class="sec-head">
        <h2 class="display d2" data-reveal>${esc(C.teamTitle)}</h2>
        <p class="lead" data-reveal>${esc(C.teamText)}</p>
      </div>
      <div class="members">
        ${list(C.team, (m, i) => `
        <div class="member" data-card>
          <div class="pic" data-tilt="${[-3, 2, -1.5][i]}">${photo(C.photo)}${ribbons('card')}</div>
          <div class="name">${esc(m.name)}</div>
          <div class="role">${esc(m.role)}</div>
        </div>`)}
      </div>
    </div>
  </section>

  <section class="quotes">
    <div class="wrap">
      <h2 class="display d2" style="max-width:12ch" data-reveal>${esc(C.quotesTitle)}</h2>
      <div class="qcards">
        ${list(C.quotes, (q, i) => `<figure class="qcard" data-card style="--c:var(--${CYCLE[i % 2]})"><blockquote>${esc(q.text)}</blockquote><figcaption>${esc(q.who)}</figcaption></figure>`)}
      </div>
    </div>
  </section>

  <section id="pro" class="pro">
    <div class="wrap pro-grid">
      <div>
        <span class="tag" data-reveal>${esc(C.proTag)}</span>
        <h2 class="display d2" data-reveal>${esc(C.proTitle)}</h2>
        <p class="lead" style="margin-top:22px" data-reveal>${esc(C.proText)}</p>
      </div>
      <form class="form-card waitlist" novalidate data-reveal>
        <label class="lbl" for="waitlist-email">${esc(C.proLabel)}</label>
        <div class="field-row">
          <input id="waitlist-email" class="field" type="email" required autocomplete="email" placeholder="nome@email.it" aria-describedby="waitlist-msg">
          <button class="btn btn-orange btn-block" type="submit"><span class="btn-label">${esc(C.proBtn)}</span></button>
        </div>
        <p id="waitlist-msg" class="form-msg" aria-live="polite"></p>
      </form>
    </div>
  </section>

  <section id="faq" class="faq">
    <div class="wrap faq-grid">
      <h2 class="display d2" data-reveal>${esc(C.faqTitle)}</h2>
      <div class="faq-list">
        ${list(C.faq, (f, i) => `
        <div class="faq-item" data-reveal>
          <button class="faqbtn" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}" data-faq="${i}"><span>${esc(f.q)}</span><span class="plus" aria-hidden="true"></span></button>
          <div class="faq-panel" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}" hidden><p>${esc(f.a)}</p></div>
        </div>`)}
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="wrap">
      <div class="cta-frame">
        <div class="photo"></div>
        ${ribbons('wide')}
        <div class="cta-row">
          <h2 class="display">${esc(C.ctaTitle)}</h2>
          <a href="#programmi" class="btn btn-orange">${esc(C.ctaBtn)}</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wordmark" aria-hidden="true"><span class="paper">OTS</span></div>
  <div class="wrap foot">
    ${logo('span')}
    <span>© 2026 OTS. ${esc(C.rights)}</span>
    <nav aria-label="Note legali">${list(C.footLinks, (l) => `<a href="#${l.toLowerCase().split(' ')[0]}">${esc(l)}</a>`)}<span>${esc(C.footContact)}</span></nav>
  </div>
</footer>

<div class="login" id="login" hidden role="dialog" aria-modal="true" aria-labelledby="login-title">
  <div class="login-card">
    <form class="login-form" novalidate>
      ${logo('span')}
      <h2 id="login-title">${esc(C.loginTitle)}</h2>
      <p>${esc(C.loginText)}</p>
      <a href="#login" class="btn btn-outline btn-block" data-app>${esc(C.loginApp)}</a>
      <div class="or">${esc(C.loginOr)}</div>
      <label class="lbl" for="login-email">${esc(C.loginEmail)}</label>
      <input id="login-email" class="field" type="email" required autocomplete="email" placeholder="nome@email.it">
      <label class="lbl" for="login-pass">${esc(C.loginPass)}</label>
      <input id="login-pass" class="field" type="password" required autocomplete="current-password" placeholder="${esc(C.loginPassPh)}">
      <div class="login-row">
        <label class="check-lbl"><input type="checkbox" id="login-remember">${esc(C.loginRemember)}</label>
        <a href="#login" class="link">${esc(C.loginForgot)}</a>
      </div>
      <button class="btn btn-orange btn-block" type="submit">${esc(C.loginBtn)}</button>
      <p class="form-msg" id="login-msg" aria-live="polite"></p>
      <p class="login-foot">${esc(C.loginNo)} <a href="#programmi" class="link" data-close>${esc(C.loginBuy)}</a></p>
    </form>
    <div class="login-photo">${photo('')}<div class="big paper" aria-hidden="true">OTS</div>${ribbons('hero')}${cornerMark}</div>
    <button class="icon-btn login-close" type="button" aria-label="${esc(C.close)}">×</button>
  </div>
</div>`;
}

document.getElementById('app').innerHTML = render();

const drawIn = (el) => $$('[data-draw]', el);
function primeDraw(els) {
  if (reduce) return;
  for (const p of els) { p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; }
}

/* Size a single-line word so it spans its container exactly. */
function fit(text, box, ratio = 1, pad = 0) {
  const run = () => {
    const els = [text, ...text.querySelectorAll('*')];
    const saved = els.map((e) => e.style.fontWeight);
    for (const e of els) e.style.fontWeight = '900';
    text.style.fontSize = '100px';
    const w = text.getBoundingClientRect().width;
    els.forEach((e, i) => { e.style.fontWeight = saved[i]; });
    const avail = (box.clientWidth - pad * 2) * ratio;
    text.style.fontSize = `${Math.floor((100 * avail) / Math.max(1, w))}px`;
  };
  run();
  window.addEventListener('resize', run);
  if (document.fonts) document.fonts.ready.then(() => { run(); ScrollTrigger.refresh(); });
}

function setupNav() {
  const nav = $('.nav');
  let lastY = window.scrollY;
  let hidden = false;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 8);
    const hide = y > lastY && y > 400;
    if (hide !== hidden && Math.abs(y - lastY) > 2) {
      hidden = hide;
      animate(nav, { y: hide ? '-100%' : '0%' }, reduce ? { duration: 0 } : SNAP);
    }
    lastY = y;
  }, { passive: true });
  nav.addEventListener('focusin', () => { hidden = false; animate(nav, { y: '0%' }, { duration: 0 }); });
  scroll(animate($('.progress'), { scaleX: [0, 1] }, { ease: 'linear' }));

  const links = $$('.nav-side a[href^="#"]:not(.btn):not([data-login])');
  for (const a of links) {
    const sec = $(a.getAttribute('href'));
    if (!sec) continue;
    inView(sec, () => {
      for (const l of links) l.classList.toggle('on', l === a);
      return () => a.classList.remove('on');
    }, { amount: 0.3 });
  }
}

function setupMenu() {
  const btn = $('.menu-btn');
  const sheet = $('#sheet');
  const open = () => {
    sheet.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!reduce) {
      animate(sheet, { clipPath: ['inset(0 0 100% 0 round 0 0 32px 32px)', 'inset(0 0 0% 0 round 0 0 0px 0px)'] }, { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] });
      animate($$('.sheet nav a'), { y: [48, 0], opacity: [0, 1] }, { delay: stagger(0.05, { startDelay: 0.15 }), ...SPRING });
      const paths = drawIn(sheet);
      primeDraw(paths);
      animate(paths, { strokeDashoffset: [1, 0] }, { duration: 1, delay: stagger(0.06, { startDelay: 0.2 }), ease: 'easeInOut' });
    }
    $('.sheet nav a').focus();
  };
  const shut = async (instant) => {
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (!reduce && !instant) await animate(sheet, { clipPath: 'inset(0 0 100% 0 round 0 0 32px 32px)' }, { duration: 0.35, ease: 'easeIn' });
    sheet.hidden = true;
    if (!instant) btn.focus();
  };
  btn.addEventListener('click', open);
  $('.sheet-close').addEventListener('click', () => shut());
  for (const a of $$('a', sheet)) a.addEventListener('click', () => shut(a.hasAttribute('data-login')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) shut(); });
}

function countUp(el) {
  const m = el.dataset.count.match(/^(\d+)(.*)$/);
  if (!m || reduce) return;
  const target = Number(m[1]);
  el.textContent = `0${m[2]}`;
  animate(0, target, { duration: 1.2, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => { el.textContent = `${Math.round(v)}${m[2]}`; } });
}

function setupHero() {
  const frame = $('.hero-frame');
  const word = $('.hero-word');
  fit($('span', word), frame, 1, Math.min(28, Math.max(12, frame.clientWidth * 0.02)));
  const svg = $('.ribbons', frame);
  const paths = drawIn(svg);
  const pic = $('.photo', frame);
  if (reduce) return;

  primeDraw(paths);
  const letters = $$('.ch', word);
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
  intro
    .from(frame, { opacity: 0, y: 40, scale: 0.97, duration: 1, ease: 'expo.out' }, 0)
    .from(pic, { scale: 1.2, duration: 2.2, ease: 'expo.out' }, 0)
    .from(letters, { yPercent: 105, duration: 1, stagger: 0.06 }, 0.25)
    .fromTo(letters, { fontWeight: 300 }, { fontWeight: 900, duration: 1.2, stagger: 0.06, ease: 'expo.inOut' }, 0.45)
    .to(paths, { strokeDashoffset: 0, duration: 1.6, stagger: 0.1, ease: 'power3.inOut' }, 0.7)
    .from(['.hero-tag', '.hero-side', '.hero-photo-label'], { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, 1)
    .from('.corner-mark path', { yPercent: 100, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, 1.1)
    .from(['.hero-under .lead', '.hero-under .actions > *', '.stat'], { opacity: 0, y: 20, duration: 0.7, stagger: 0.06 }, 1)
    .add(() => $$('.hero [data-count]').forEach(countUp), 1.2);

  if (finePointer) {
    frame.addEventListener('pointermove', (e) => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      animate(svg, { x: x * -30, y: y * -18 }, { type: 'spring', bounce: 0, visualDuration: 0.6 });
      animate(word, { x: x * 14 }, { type: 'spring', bounce: 0, visualDuration: 0.8 });
      animate(pic, { x: x * 10, y: y * 8 }, { type: 'spring', bounce: 0, visualDuration: 0.8 });
    });
    frame.addEventListener('pointerleave', () => { animate([svg, word, pic], { x: 0, y: 0 }, SPRING); });
  }

  gsap.to(word, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: frame, start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to(pic, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: frame, start: 'top top', end: 'bottom top', scrub: true } });
}

function setupIntro() {
  const card = $('.intro-card');
  const paths = drawIn(card);
  if (reduce) return;
  primeDraw(paths);
  const st = { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: true };
  gsap.fromTo('.intro-w1', { xPercent: -14 }, { xPercent: 6, ease: 'none', scrollTrigger: st });
  gsap.fromTo('.intro-w2', { xPercent: 10 }, { xPercent: -4, ease: 'none', scrollTrigger: st });
  gsap.fromTo(card, { rotate: -11, y: 60 }, { rotate: 4, y: -30, ease: 'none', scrollTrigger: st });
  gsap.to(paths, { strokeDashoffset: 0, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 85%', end: 'center 45%', scrub: true } });
}

function setupBoard() {
  const board = $('.board');
  const detail = $('.board-detail');
  const btns = $$('.plist button');
  const fc = $('.float-card');
  let active = 1;
  const show = (i, first) => {
    active = i;
    const p = C.pillars[i];
    btns.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    detail.innerHTML = `<span class="num">0${i + 1} / 0${C.pillars.length}</span><p>${esc(p.text)}</p><span class="detail">${esc(p.detail)}</span>`;
    if (!reduce && !first) animate($$(':scope > *', detail), { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.05), ...SNAP });
  };
  show(active, true);
  btns.forEach((b, i) => {
    b.addEventListener('click', () => show(i));
    b.addEventListener('focus', () => { if (i !== active) show(i); });
    if (finePointer) b.addEventListener('pointerenter', () => { if (i !== active) show(i); });
  });

  const paths = drawIn(board);
  if (reduce) return;
  primeDraw(paths);
  inView(board, () => { animate(paths, { strokeDashoffset: [1, 0] }, { duration: 1.6, delay: stagger(0.15), ease: 'easeInOut' }); }, { amount: 0.4 });
  animate(btns, { opacity: 0 }, { duration: 0 });
  inView('.plist', () => { animate(btns, { opacity: [0, 1], x: [60, 0] }, { delay: stagger(0.07), type: 'spring', bounce: 0, visualDuration: 0.7 }); }, { amount: 0.3 });

  if (!finePointer) return;
  const list = $('.plist');
  list.addEventListener('pointerenter', () => animate(fc, { opacity: 1, scale: [0.8, 1] }, SPRING));
  list.addEventListener('pointerleave', () => animate(fc, { opacity: 0, scale: 0.8 }, SNAP));
  list.addEventListener('pointermove', (e) => {
    const r = board.getBoundingClientRect();
    const x = e.clientX - r.left - fc.offsetWidth * 1.15;
    const y = e.clientY - r.top - fc.offsetHeight * 1.2;
    animate(fc, { x, y, rotate: (e.movementX || 0) * 0.6 }, { type: 'spring', bounce: 0.25, visualDuration: 0.5 });
  });
}

function setupManifesto() {
  if (reduce) { $$('.manifesto .wd').forEach((w) => { w.style.color = w.classList.contains('hot') ? '#F7924A' : '#F3F3F4'; }); return; }
  const st = { trigger: '.manifesto p', start: 'top 80%', end: 'bottom 45%', scrub: true };
  const tl = gsap.timeline({ scrollTrigger: st });
  $$('.manifesto .wd').forEach((w, i) => tl.to(w, { color: w.classList.contains('hot') ? '#F7924A' : '#F3F3F4', duration: 1, ease: 'none' }, i * 0.4));
  gsap.fromTo('.m-card', { y: 120, rotate: -10 }, { y: -120, rotate: 12, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });
}

function phoneLoop() {
  const checks = $$('.check');
  const fg = $('.ring .fg');
  const pct = $('.ring b');
  const rest = $('.rest b');
  const C0 = 150.8;
  const n = checks.length;
  const ring = { p: 0 };
  const drawRing = () => {
    fg.setAttribute('stroke-dashoffset', String(C0 * (1 - ring.p)));
    pct.textContent = `${Math.round(ring.p * 100)}%`;
  };
  if (reduce) {
    checks.slice(0, 2).forEach((c) => { c.style.setProperty('--s', 1); c.style.setProperty('--d', 0); });
    ring.p = 0.5; drawRing();
    return null;
  }
  const timer = { s: 45 };
  const drawTimer = () => { rest.textContent = `0:${String(Math.round(timer.s)).padStart(2, '0')}`; };
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, paused: true, onRepeat: () => { ring.p = 0; drawRing(); } });
  tl.set(checks, { '--s': 0, '--d': 20 }).set(timer, { s: 45, onComplete: drawTimer });
  checks.forEach((c, i) => {
    tl.to(c, { '--s': 1, duration: 0.3, ease: 'back.out(2.2)' }, '+=0.5')
      .to(c, { '--d': 0, duration: 0.3, ease: 'power2.out' }, '-=0.12')
      .to(ring, { p: (i + 1) / n, duration: 0.6, ease: 'power2.inOut', onUpdate: drawRing }, '<');
    if (i < n - 1) tl.fromTo(timer, { s: 45 }, { s: 0, duration: 1.4, ease: 'none', onUpdate: drawTimer }, '<+0.2');
  });
  return tl;
}

function setupApp() {
  const loop = phoneLoop();
  const stage = $('.stage');
  const phone = $('.phone');
  const paths = drawIn(stage);
  if (reduce) return;
  primeDraw(paths);
  gsap.to(paths, { strokeDashoffset: 0, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 85%', end: 'center 50%', scrub: true } });
  phone.style.opacity = '0';
  let shown = false;
  inView(stage, () => {
    animate(phone, { opacity: [0, 1], y: [80, 0], rotateX: [24, 0], rotateZ: [-6, 3] }, { type: 'spring', bounce: 0.25, visualDuration: 0.8 })
      .then(() => { shown = true; if (loop) loop.play(); });
  }, { amount: 0.35 });
  if (loop) ScrollTrigger.create({ trigger: stage, start: 'top bottom', end: 'bottom top', onToggle: (s) => { if (shown) s.isActive ? loop.play() : loop.pause(); } });
  if (finePointer) {
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      animate(phone, { rotateY: x * 16, rotateX: -y * 10 }, { type: 'spring', bounce: 0.2, visualDuration: 0.5 });
    });
    stage.addEventListener('pointerleave', () => animate(phone, { rotateY: 0, rotateX: 0 }, SPRING));
  }
}

function setupReveals() {
  const tilted = $$('[data-tilt]');
  const tiltOn = !reduce && wide();
  for (const el of tilted) animate(el, { rotate: tiltOn ? Number(el.dataset.tilt) : 0 }, { duration: 0 });
  if (reduce) return;
  for (const el of $$('[data-reveal]')) {
    el.style.opacity = '0';
    inView(el, () => { animate(el, { opacity: [0, 1], y: [32, 0] }, { type: 'spring', bounce: 0, visualDuration: 0.7 }); }, { amount: 0.4 });
  }
  const groups = new Set($$('[data-card]').map((c) => c.parentElement));
  for (const g of groups) {
    const cards = $$(':scope > [data-card]', g);
    cards.forEach((c) => { c.style.opacity = '0'; });
    inView(g, () => {
      animate(cards, { opacity: [0, 1], y: [80, 0] }, { delay: stagger(0.09), type: 'spring', bounce: 0.2, visualDuration: 0.8 });
      for (const c of cards) {
        const paths = drawIn(c);
        if (paths.length) { primeDraw(paths); animate(paths, { strokeDashoffset: [1, 0] }, { duration: 1.2, delay: stagger(0.08, { startDelay: 0.3 }), ease: 'easeInOut' }); }
      }
    }, { amount: 0.2 });
  }
}

function setupInteractions() {
  if (reduce) return;
  press('.btn, .qopt, .faqbtn, .plist button', (el) => {
    animate(el, { scale: 0.97 }, { type: 'spring', bounce: 0, visualDuration: 0.12 });
    return () => animate(el, { scale: 1 }, { type: 'spring', bounce: 0.4, visualDuration: 0.3 });
  });
  if (!finePointer) return;
  hover('[data-tilt]', (el) => {
    animate(el, { y: -10, rotate: 0 }, SPRING);
    const paths = drawIn(el);
    if (paths.length) animate(paths, { strokeDashoffset: [1, 0] }, { duration: 0.8, delay: stagger(0.06), ease: 'easeInOut' });
    return () => animate(el, { y: 0, rotate: wide() ? Number(el.dataset.tilt) : 0 }, SPRING);
  });
}

function setupOutro() {
  const wm = $('.wordmark');
  fit($('span', wm), wm, 0.96);
  if (reduce) return;
  const cta = $('.cta-frame');
  const cpaths = drawIn(cta);
  primeDraw(cpaths);
  gsap.to(cpaths, { strokeDashoffset: 0, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: cta, start: 'top 90%', end: 'center 55%', scrub: true } });
  gsap.fromTo($('.photo', cta), { yPercent: -10, scale: 1.3 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: cta, start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.cta-row > *', { y: 60, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: cta, start: 'top 70%' } });
  gsap.fromTo('.wordmark span', { fontWeight: 300, yPercent: 30 }, { fontWeight: 900, yPercent: 0, ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  const qpaths = drawIn($('.quiz-photo'));
  primeDraw(qpaths);
  gsap.to(qpaths, { strokeDashoffset: 0, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.quiz-frame', start: 'top 85%', end: 'top 30%', scrub: true } });
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
        <div class="qopts">${list(q.options, (o, i) => `<button class="qopt" data-i="${i}" aria-pressed="${answers[step] === i}"><span>${esc(o)}</span></button>`)}</div>
        ${step > 0 ? `<button class="qback">← ${esc(C.quizBack)}</button>` : ''}`;
    }
    count.textContent = C.quizResult;
    const prog = C.programs[answers[1]];
    return `<div class="qresult"><h3 tabindex="-1" style="font-family:var(--font);text-transform:none;font-size:16px;font-weight:400;color:var(--muted);margin:0">${esc(C.quizPick)}</h3>
      <div class="big paper">${esc(prog.name)}</div>
      <p>${esc(C.quiz[1].options[answers[1]])} anni, priorità ${esc(C.quiz[2].options[answers[2]].toLowerCase())}. ${esc(C.quizNote)}</p>
      <div class="row"><a href="#programmi" class="btn btn-orange">${esc(C.heroCta)}</a><button class="btn btn-ghost qrestart">${esc(C.quizRestart)}</button></div></div>`;
  };

  const go = async (next, dir, focus) => {
    if (!reduce) await animate(stageEl, { opacity: 0, x: -24 * dir }, { duration: 0.16, ease: 'easeIn' });
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
    const btn = $(`#faq-q${i}`);
    const panel = $(`#faq-a${i}`);
    btn.setAttribute('aria-expanded', String(on));
    if (on) panel.hidden = false;
    const opts = reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.35 };
    animate(panel, { height: [`${panel.offsetHeight}px`, on ? `${panel.scrollHeight}px` : '0px'] }, opts).then(() => {
      if (on && open === i) panel.style.height = 'auto';
      if (!on && open !== i) panel.hidden = true;
    });
    animate($('.plus', btn), { rotate: on ? 135 : 0, backgroundColor: on ? '#F7924A' : '#2A2B31', color: on ? '#08090A' : '#F3F3F4' }, reduce ? { duration: 0 } : SPRING);
  };
  $$('.faqbtn').forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.faq);
    const prev = open;
    open = prev === i ? -1 : i;
    if (prev !== -1) set(prev, false);
    if (open !== -1) set(open, true);
  }));
}

function shake(el) { if (!reduce) animate(el, { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 }); }

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
    if (!ok) { shake(input); input.focus(); return; }
    label.textContent = `✓ ${C.proSent}`;
    if (!reduce) animate(label, { y: [10, 0], opacity: [0, 1] }, SPRING);
  });
}

function setupLogin() {
  const dlg = $('#login');
  const card = $('.login-card', dlg);
  const form = $('.login-form', dlg);
  const paths = drawIn(dlg);
  let opener = null;

  const open = (e) => {
    e.preventDefault();
    opener = document.activeElement;
    dlg.hidden = false;
    document.body.style.overflow = 'hidden';
    if (!reduce) {
      animate(dlg, { opacity: [0, 1] }, { duration: 0.2 });
      animate(card, { opacity: [0, 1], y: [40, 0], scale: [0.96, 1] }, { type: 'spring', bounce: 0.2, visualDuration: 0.45 });
      animate($$('.login-form > *', dlg), { opacity: [0, 1], y: [12, 0] }, { delay: stagger(0.03, { startDelay: 0.1 }), ...SNAP });
      animate($('.login-photo .big', dlg), { y: ['40%', '0%'] }, { type: 'spring', bounce: 0.2, visualDuration: 0.7, delay: 0.15 });
      primeDraw(paths);
      animate(paths, { strokeDashoffset: [1, 0] }, { duration: 1.2, delay: stagger(0.07, { startDelay: 0.25 }), ease: 'easeInOut' });
    }
    $('#login-email').focus();
  };
  const close = async () => {
    if (dlg.hidden) return;
    if (!reduce) {
      animate(card, { opacity: 0, y: 24, scale: 0.98 }, { duration: 0.18, ease: 'easeIn' });
      await animate(dlg, { opacity: 0 }, { duration: 0.2 });
    }
    dlg.hidden = true;
    document.body.style.overflow = '';
    if (opener && opener.offsetParent) opener.focus();
  };

  for (const a of $$('[data-login]')) a.addEventListener('click', open);
  $('.login-close', dlg).addEventListener('click', close);
  $('[data-close]', dlg).addEventListener('click', close);
  for (const a of $$('a[href="#login"]', dlg)) a.addEventListener('click', (e) => e.preventDefault());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  document.addEventListener('keydown', (e) => {
    if (dlg.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const f = $$('a[href], button, input', card);
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#login-email');
    const pass = $('#login-pass');
    const okE = email.value.trim() !== '' && email.checkValidity();
    const okP = pass.value.trim() !== '';
    email.setAttribute('aria-invalid', String(!okE));
    pass.setAttribute('aria-invalid', String(!okP));
    $('#login-msg').textContent = okE && okP ? C.loginPreview : C.loginError;
    if (!okE) { shake(email); email.focus(); } else if (!okP) { shake(pass); pass.focus(); }
  });
}

setupNav();
setupMenu();
setupHero();
setupIntro();
setupBoard();
setupManifesto();
setupApp();
setupReveals();
setupInteractions();
setupOutro();
setupQuiz();
setupFaq();
setupWaitlist();
setupLogin();
window.addEventListener('load', () => ScrollTrigger.refresh());
