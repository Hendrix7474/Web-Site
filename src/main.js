import { animate, hover, inView, press, scroll, stagger } from 'motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PALETTES, TEXT } from './content.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const state = { lang: 'it', pal: 0, faq: -1 };
const EASE = [0.2, 0.7, 0.2, 1];
const SPRING = { type: 'spring', bounce: 0.3, visualDuration: 0.3 };

const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), TEXT[state.lang]);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const T = (key) => esc(get(key));
const words = (text) => esc(text).split(' ').map((w) => `<span class="w"><span>${w}</span></span>`).join(' ');
const list = (arr, fn) => arr.map(fn).join('');

function render() {
  const L = TEXT[state.lang];
  const tickerItems = list([0, 1], () => list(L.ticker, (_, i) => `<span data-i="ticker.${i}">${T(`ticker.${i}`)}</span>`));
  return `
<div class="progress" aria-hidden="true"></div>
<div class="ots">
  <div class="preview">
    <div class="wrap">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <span class="muted label" data-i="previewLabel">${T('previewLabel')}</span>
        ${list(PALETTES, (p, i) => `<button class="sw" data-pal="${i}" aria-pressed="${i === state.pal}" aria-label="${esc(p.name)}" title="${esc(p.name)}" style="background:linear-gradient(135deg,${p.bg} 50%,${p.accent} 50%);"></button>`)}
        <span class="pal-name" style="font-size:14px;font-weight:600;">${esc(PALETTES[state.pal].name)}</span>
      </div>
      <div style="display:flex;gap:6px;">
        <button class="lb" data-lang="it" aria-pressed="true" aria-label="Italiano">IT</button>
        <button class="lb" data-lang="en" aria-pressed="false" aria-label="English">EN</button>
      </div>
    </div>
  </div>

  <div id="site">
    <header class="nav">
      <div class="wrap">
        <a href="#top" class="logo" aria-label="OTS">OTS</a>
        <nav class="links">
          <a href="#programmi" class="muted hide-sm" data-i="navPrograms">${T('navPrograms')}</a>
          <a href="#metodo" class="muted hide-sm" data-i="navMethod">${T('navMethod')}</a>
          <a href="#team" class="muted hide-sm" data-i="navTeam">${T('navTeam')}</a>
          <a href="#faq" class="muted hide-sm">FAQ</a>
          <a href="#login" class="muted" data-i="navLogin">${T('navLogin')}</a>
          <a href="#programmi" class="btn btn-a" data-i="navCta">${T('navCta')}</a>
        </nav>
      </div>
    </header>

    <main>
      <section id="top" class="wrap hero">
        <div class="row" style="gap:48px;align-items:center;">
          <div class="col" style="flex:1.15 1 420px;">
            <p class="eyebrow" data-i="heroEyebrow">${T('heroEyebrow')}</p>
            <h1 class="h1" data-split="heroTitle">${words(L.heroTitle)}</h1>
            <p class="lead muted" style="margin-top:28px;" data-i="heroText">${T('heroText')}</p>
            <div class="actions" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:36px;">
              <a href="#programmi" class="btn btn-a" data-i="heroCta">${T('heroCta')}</a>
              <a href="#quiz" class="btn btn-o" data-i="heroCta2">${T('heroCta2')}</a>
            </div>
          </div>
          <div class="col media" style="flex:1 1 360px;">
            <div class="ph" data-i="heroMedia">${T('heroMedia')}</div>
            <div class="card app">
              <div class="muted label" style="font-size:12px;" data-i="appKicker">${T('appKicker')}</div>
              <div class="app-title" data-i="appTitle">${T('appTitle')}</div>
              <div class="app-row"><span data-i="appEx1">${T('appEx1')}</span><span class="muted">4 × 5</span></div>
              <div class="app-row"><span data-i="appEx2">${T('appEx2')}</span><span class="muted">3 × 8</span></div>
              <div class="bar" role="img" aria-label="${T('appDone')}" data-i-label="appDone"><div></div></div>
            </div>
          </div>
        </div>
      </section>

      <div class="band">
        <div class="wrap" style="padding-block:44px;">
          <div class="row" style="gap:32px;" data-stagger>
            ${list(L.stats, (_, i) => `
            <div class="col" style="flex:1 1 200px;" data-item>
              <div class="stat" data-i="stats.${i}.n">${T(`stats.${i}.n`)}</div>
              <div class="muted" style="margin-top:6px;font-weight:500;" data-i="stats.${i}.label">${T(`stats.${i}.label`)}</div>
            </div>`)}
          </div>
        </div>
      </div>

      <div class="ticker" aria-hidden="true"><div class="ticker-track">${tickerItems}</div></div>

      <section id="programmi" class="wrap sec">
        <div data-reveal>
          <p class="eyebrow" data-i="progEyebrow">${T('progEyebrow')}</p>
          <h2 class="h2" style="max-width:16ch;" data-i="progTitle">${T('progTitle')}</h2>
          <p class="lead muted" style="margin-top:20px;" data-i="progText">${T('progText')}</p>
        </div>
        <div class="row" style="margin-top:48px;align-items:stretch;" data-stagger>
          ${list(L.programs, (p, i) => `
          <article class="col card program hoverable${p.featured ? ' featured' : ''}" data-item>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:28px;">
              <span class="muted label" data-i="programs.${i}.level">${T(`programs.${i}.level`)}</span>
              ${p.featured ? `<span class="tag" data-i="featured">${T('featured')}</span>` : ''}
            </div>
            <h3 class="h3" data-i="programs.${i}.name">${T(`programs.${i}.name`)}</h3>
            <p class="muted" style="margin:0;" data-i="programs.${i}.desc">${T(`programs.${i}.desc`)}</p>
            <ul>${list(p.features, (_, j) => `<li data-i="programs.${i}.features.${j}">${T(`programs.${i}.features.${j}`)}</li>`)}</ul>
            <div class="price" data-i="programs.${i}.price">${T(`programs.${i}.price`)}</div>
            <a href="#checkout" class="btn ${p.featured ? 'btn-a' : 'btn-o'}" data-i="buy">${T('buy')}</a>
          </article>`)}
        </div>
        <p class="muted" style="margin:28px 0 0 0;font-size:14px;" data-i="progNote">${T('progNote')}</p>
      </section>

      <section id="quiz" class="band">
        <div class="wrap sec" style="padding-block:72px;">
          <div class="row" style="gap:40px;align-items:center;">
            <div class="col" style="flex:1 1 420px;" data-reveal>
              <p class="eyebrow" data-i="quizEyebrow">${T('quizEyebrow')}</p>
              <h2 class="h2" data-i="quizTitle">${T('quizTitle')}</h2>
              <p class="muted" style="margin:20px 0 0 0;max-width:52ch;" data-i="quizText">${T('quizText')}</p>
            </div>
            <div class="col" style="flex:1 1 320px;display:flex;flex-direction:column;gap:14px;" data-stagger>
              <a href="#quiz-genitore" class="btn btn-a" style="justify-content:space-between;" data-item><span data-i="quizParent">${T('quizParent')}</span><span class="arrow" aria-hidden="true">→</span></a>
              <a href="#quiz-atleta" class="btn btn-o" style="justify-content:space-between;" data-item><span data-i="quizAthlete">${T('quizAthlete')}</span><span class="arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" class="wrap sec">
        <div data-reveal>
          <p class="eyebrow" data-i="methEyebrow">${T('methEyebrow')}</p>
          <h2 class="h2" style="max-width:18ch;" data-i="methTitle">${T('methTitle')}</h2>
        </div>
        <div class="pillars">
          ${list(L.pillars, (_, i) => `
          <div class="pillar">
            <div class="fill" aria-hidden="true"></div>
            <div class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')} / 04</div>
            <h3 class="h3" data-i="pillars.${i}.name">${T(`pillars.${i}.name`)}</h3>
            <p class="muted" style="margin:12px 0 0 0;" data-i="pillars.${i}.text">${T(`pillars.${i}.text`)}</p>
          </div>`)}
        </div>
      </section>

      <section id="team" class="band">
        <div class="wrap sec">
          <div data-reveal>
            <p class="eyebrow" data-i="teamEyebrow">${T('teamEyebrow')}</p>
            <h2 class="h2" data-i="teamTitle">${T('teamTitle')}</h2>
          </div>
          <div class="row" style="margin-top:48px;" data-stagger>
            ${list(L.team, (_, i) => `
            <div class="col member" data-item>
              <div class="ph" data-i="photo">${T('photo')}</div>
              <div>
                <div style="font-weight:700;font-size:19px;" data-i="team.${i}.name">${T(`team.${i}.name`)}</div>
                <div class="muted" style="font-size:15px;" data-i="team.${i}.role">${T(`team.${i}.role`)}</div>
              </div>
            </div>`)}
          </div>
        </div>
      </section>

      <section class="wrap sec">
        <div data-reveal>
          <p class="eyebrow" data-i="testEyebrow">${T('testEyebrow')}</p>
          <h2 class="h2" style="max-width:16ch;" data-i="testTitle">${T('testTitle')}</h2>
        </div>
        <div class="row" style="margin-top:48px;" data-stagger>
          ${list(L.quotes, (_, i) => `
          <figure class="col card hoverable" style="flex:1 1 300px;display:flex;flex-direction:column;gap:18px;margin:0;" data-item>
            <blockquote style="margin:0;font-size:19px;" data-i="quotes.${i}.text">${T(`quotes.${i}.text`)}</blockquote>
            <figcaption class="muted" style="font-size:14px;font-weight:600;" data-i="quotes.${i}.who">${T(`quotes.${i}.who`)}</figcaption>
          </figure>`)}
        </div>
      </section>

      <section id="pro" class="band">
        <div class="wrap sec" style="padding-block:72px;">
          <div class="row" style="gap:40px;align-items:center;">
            <div class="col" style="flex:1 1 420px;" data-reveal>
              <span class="tag" data-i="soon">${T('soon')}</span>
              <h2 class="h2" style="margin-top:18px;" data-i="proTitle">${T('proTitle')}</h2>
              <p class="muted" style="margin:20px 0 0 0;max-width:52ch;" data-i="proText">${T('proText')}</p>
            </div>
            <form class="col waitlist" style="flex:1 1 340px;" novalidate data-reveal>
              <label for="waitlist-email" style="display:block;font-weight:600;margin-bottom:8px;" data-i="proLabel">${T('proLabel')}</label>
              <div style="display:flex;flex-wrap:wrap;gap:10px;">
                <input id="waitlist-email" class="field" type="email" required autocomplete="email" placeholder="nome@email.it" aria-describedby="waitlist-msg">
                <button class="btn btn-a" type="submit"><span class="btn-label" data-i="proBtn">${T('proBtn')}</span></button>
              </div>
              <p id="waitlist-msg" class="muted form-msg" aria-live="polite"></p>
            </form>
          </div>
        </div>
      </section>

      <section id="faq" class="wrap sec">
        <div class="row" style="gap:56px;">
          <div class="col" style="flex:1 1 280px;" data-reveal>
            <p class="eyebrow">FAQ</p>
            <h2 class="h2" data-i="faqTitle">${T('faqTitle')}</h2>
          </div>
          <div class="col" style="flex:2 1 460px;" data-stagger>
            ${list(L.faq, (_, i) => `
            <div class="faq-item" data-item>
              <button class="faqbtn" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}" data-faq="${i}">
                <span data-i="faq.${i}.q">${T(`faq.${i}.q`)}</span><span class="plus" aria-hidden="true"><i></i></span>
              </button>
              <div class="faq-panel" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}" aria-hidden="true">
                <p class="muted" data-i="faq.${i}.a">${T(`faq.${i}.a`)}</p>
              </div>
            </div>`)}
            <div style="border-top:1px solid var(--line);"></div>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="wrap">
          <h2 class="h2" data-split="ctaTitle">${words(L.ctaTitle)}</h2>
          <a href="#programmi" class="btn btn-inv" data-i="heroCta">${T('heroCta')}</a>
        </div>
      </section>
    </main>

    <footer class="wrap foot">
      <div>
        <div style="font-family:var(--display);font-weight:800;font-size:32px;letter-spacing:.04em;">OTS</div>
        <div class="muted" style="font-size:14px;">© 2026 OTS. <span data-i="rights">${T('rights')}</span></div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:22px;align-items:center;font-size:14px;">
        <a href="#privacy" class="muted">Privacy</a>
        <a href="#termini" class="muted" data-i="terms">${T('terms')}</a>
        <a href="#contatti" class="muted" data-i="contact">${T('contact')}</a>
        <span class="muted">[EMAIL] · [INSTAGRAM]</span>
      </div>
    </footer>
  </div>
</div>`;
}

const app = document.getElementById('app');
app.innerHTML = render();
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

function applyPalette(i, instant) {
  state.pal = i;
  const P = PALETTES[i];
  const vars = {};
  for (const k of ['bg', 'surface', 'fg', 'muted', 'accent', 'accentFg', 'line']) vars[`--${k}`] = P[k];
  gsap.to(document.documentElement, { ...vars, duration: instant || reduce ? 0 : 0.6, ease: 'power2.inOut', overwrite: true });
  document.documentElement.style.colorScheme = i === 2 ? 'light' : 'dark';
  $$('.sw').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.pal) === i)));
  $('.pal-name').textContent = P.name;
}

function fillText() {
  $$('[data-i]').forEach((el) => { el.textContent = get(el.dataset.i); });
  $$('[data-i-label]').forEach((el) => el.setAttribute('aria-label', get(el.dataset.iLabel)));
  $$('[data-split]').forEach((el) => { el.innerHTML = words(get(el.dataset.split)); });
  $('#waitlist-email').placeholder = state.lang === 'it' ? 'nome@email.it' : 'name@email.com';
  $$('.lb').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
  const msg = $('#waitlist-msg');
  if (msg.dataset.key) msg.textContent = get(msg.dataset.key);
}

function setLang(lang) {
  if (lang === state.lang) return;
  state.lang = lang;
  document.documentElement.lang = lang;
  const site = $('#site');
  gsap.to(site, {
    opacity: 0, duration: reduce ? 0 : 0.15, ease: 'power1.in',
    onComplete() {
      fillText();
      ScrollTrigger.refresh();
      gsap.to(site, { opacity: 1, duration: reduce ? 0 : 0.3, ease: 'power1.out' });
    }
  });
}

applyPalette(0, true);
$$('.sw').forEach((b) => b.addEventListener('click', () => applyPalette(Number(b.dataset.pal))));
$$('.lb').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

const nav = $('.nav');
let lastY = window.scrollY;
let navHidden = false;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 8);
  const hide = y > lastY && y > 240;
  if (hide !== navHidden && Math.abs(y - lastY) > 2) {
    navHidden = hide;
    animate(nav, { y: hide ? '-100%' : '0%' }, reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.3 });
  }
  lastY = y;
}, { passive: true });
nav.addEventListener('focusin', () => {
  navHidden = false;
  animate(nav, { y: '0%' }, { duration: 0 });
});

scroll(animate($('.progress'), { scaleX: [0, 1] }, { ease: 'linear' }));

function setupFaq() {
  $$('.faqbtn').forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.faq);
    const prev = state.faq;
    state.faq = prev === i ? -1 : i;
    if (prev !== -1) setFaq(prev, false);
    if (state.faq !== -1) setFaq(state.faq, true);
  }));
}

function setFaq(i, open) {
  const btn = $(`#faq-q${i}`);
  const panel = $(`#faq-a${i}`);
  const bar = $('.plus i', btn);
  btn.setAttribute('aria-expanded', String(open));
  panel.setAttribute('aria-hidden', String(!open));
  const from = `${panel.offsetHeight}px`;
  const to = open ? `${panel.scrollHeight}px` : '0px';
  const opts = reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.35 };
  animate(panel, { height: [from, to] }, opts).then(() => {
    if (open && state.faq === i) panel.style.height = 'auto';
  });
  animate(bar, { scaleY: open ? 0 : 1, rotate: open ? 90 : 0 }, reduce ? { duration: 0 } : SPRING);
  if (open && !reduce) animate(panel.firstElementChild, { opacity: [0, 1], y: [-6, 0] }, { duration: 0.3, delay: 0.05, ease: EASE });
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
    msg.dataset.key = ok ? 'proDone' : 'proError';
    msg.textContent = get(msg.dataset.key);
    if (!ok) {
      if (!reduce) animate(input, { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 });
      input.focus();
      return;
    }
    label.dataset.i = 'proSent';
    label.textContent = `✓ ${get('proSent')}`;
    if (!reduce) {
      animate(label, { y: [10, 0], opacity: [0, 1] }, SPRING);
      animate(msg, { opacity: [0, 1], y: [6, 0] }, { duration: 0.3, ease: EASE });
    }
  });
}

function setupGestures() {
  if (reduce) return;
  press('.btn, .lb, .sw', (el) => {
    animate(el, { scale: 0.96 }, { type: 'spring', bounce: 0, visualDuration: 0.15 });
    return () => animate(el, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
  });
  hover('.hoverable', (el) => {
    animate(el, { y: -6 }, SPRING);
    return () => animate(el, { y: 0 }, SPRING);
  });
  hover('.btn', (el) => {
    const arrow = $('.arrow', el);
    if (!arrow) return;
    animate(arrow, { x: 6 }, SPRING);
    return () => animate(arrow, { x: 0 }, SPRING);
  });
}

function setupReveals() {
  if (reduce) return;
  const fold = window.innerHeight;
  const hide = (el) => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; };
  $$('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < fold) return;
    hide(el);
    inView(el, () => { animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: EASE }); }, { amount: 0.2 });
  });
  $$('[data-stagger]').forEach((group) => {
    if (group.getBoundingClientRect().top < fold) return;
    const items = $$('[data-item]', group);
    items.forEach(hide);
    inView(group, () => { animate(items, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: EASE, delay: stagger(0.08) }); }, { amount: 0.15 });
  });
}

function setupGsap() {
  if (reduce) return;

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.nav', { y: -20, opacity: 0, duration: 0.5 })
    .from('.hero .eyebrow', { y: 16, opacity: 0, duration: 0.5 }, 0.1)
    .from('.hero h1 .w > span', { yPercent: 110, duration: 0.8, stagger: 0.05 }, 0.2)
    .from('.hero .lead', { y: 18, opacity: 0, duration: 0.6 }, 0.55)
    .from('.hero .actions .btn', { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.7)
    .from('.media .ph', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' }, 0.15)
    .from('.app', { y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.9)
    .from('.app-row', { x: -12, opacity: 0, duration: 0.4, stagger: 0.1 }, 1.2)
    .from('.bar > div', { scaleX: 0, duration: 1, ease: 'power2.inOut' }, 1.3);

  gsap.to('.media .ph', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.app', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  const loop = gsap.to('.ticker-track', { xPercent: -50, ease: 'none', duration: 28, repeat: -1 });
  let dir = 1;
  ScrollTrigger.create({
    onUpdate(self) {
      dir = self.direction;
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
      gsap.killTweensOf(loop);
      gsap.to(loop, { timeScale: dir * boost, duration: 0.15, ease: 'power1.out' });
      gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.15, ease: 'power2.out' });
    }
  });

  const pillars = $$('.pillar');
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.pillars', start: 'top 85%', end: 'bottom 50%', scrub: 0.6 } });
  pillars.forEach((p, i) => {
    tl.fromTo($('.fill', p), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, i * 0.7)
      .fromTo($$('h3, p', p), { opacity: 0.3 }, { opacity: 1, duration: 0.5, ease: 'none' }, i * 0.7 + 0.2);
  });

  gsap.from('.cta h2 .w > span', {
    yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 80%', toggleActions: 'play none none none' }
  });
}

setupFaq();
setupWaitlist();
setupGestures();
setupReveals();
setupGsap();
