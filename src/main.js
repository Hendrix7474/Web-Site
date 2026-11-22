import { animate, scroll, stagger } from 'motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './content.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const SPRING = { type: 'spring', bounce: 0.25, visualDuration: 0.35 };
const EASE = [0.2, 0.7, 0.2, 1];
const KG = { red: 25, blue: 20, yellow: 15, green: 10 };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = (arr, fn) => arr.map(fn).join('');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

const tick = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';

function trackSvg() {
  let out = '';
  for (let i = 0; i < 9; i++) {
    const rx = 420 + i * 64;
    out += `<ellipse cx="1260" cy="1010" rx="${rx}" ry="${Math.round(rx * 0.62)}" pathLength="1"${i === 3 ? ' class="hot"' : ''}/>`;
  }
  return `<svg class="track" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${out}</svg>`;
}

function render() {
  return `
<div class="progress" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<header class="nav">
  <div class="wrap">
    <a href="#top" class="logo" aria-label="OTS, torna all’inizio"><span class="logo-mark" aria-hidden="true"></span>OTS</a>
    <nav class="links" aria-label="Principale">
      ${list(C.nav, (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}
      <a href="#login">${esc(C.login)}</a>
      <a href="#quiz" class="btn btn-blue">${esc(C.navCta)}</a>
    </nav>
    <button class="menu-btn" aria-label="Apri il menu" aria-expanded="false" aria-controls="sheet"><i></i><i></i></button>
  </div>
</header>
<div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="sheet-top"><span class="logo">OTS</span><button class="sheet-close" aria-label="Chiudi il menu">×</button></div>
  <nav aria-label="Menu mobile">
    ${list(C.nav, (l) => `<a href="${l.href}">${esc(l.label)}</a>`)}
    <a href="#login">${esc(C.login)}</a>
  </nav>
  <a href="#quiz" class="btn btn-white">${esc(C.navCta)}</a>
</div>

<main>
  <section id="top" class="hero dark">
    ${trackSvg()}
    <div class="wrap hero-grid">
      <div>
        <p class="kicker">${esc(C.heroKicker)}</p>
        <h1 class="display d1">${list(C.heroTitle, (w) => `<span class="ln"><span>${esc(w)}</span></span>`)}</h1>
        <div class="hero-copy">
          <p class="lead soft">${esc(C.heroText)}</p>
          <div class="actions">
            <a href="#programmi" class="btn btn-blue">${esc(C.heroCta)}</a>
            <a href="#quiz" class="btn btn-line">${esc(C.heroCta2)}</a>
          </div>
        </div>
      </div>
      <div class="stage">
        <div class="phone" role="img" aria-label="Anteprima dell’app OTS: ${esc(C.app.week)}, ${esc(C.app.title)}, ${C.app.items.length} esercizi">
          <div class="screen" aria-hidden="true">
            <div class="app-head">
              <div>
                <div class="app-week">${esc(C.app.week)}, ${esc(C.app.day)}</div>
                <div class="app-title">${esc(C.app.title)}</div>
              </div>
              <div class="ring"><svg viewBox="0 0 58 58"><circle class="bg" cx="29" cy="29" r="24"/><circle class="fg" cx="29" cy="29" r="24" stroke-dasharray="150.8" stroke-dashoffset="150.8"/></svg><b>0%</b></div>
            </div>
            <div class="ex"><ul>
              ${list(C.app.items, (it, i) => `<li><span class="check" style="--c:var(--${['red', 'blue', 'yellow', 'green'][i]})">${tick}</span><span>${esc(it.name)}</span><span class="sets">${esc(it.sets)}</span></li>`)}
            </ul></div>
            <div class="rest"><span>${esc(C.app.rest)}</span><b>0:45</b></div>
          </div>
        </div>
        <div class="chip chip-1" aria-hidden="true"><i style="--c:var(--blue)"></i>Video di ogni esercizio</div>
        <div class="chip chip-2" aria-hidden="true"><i style="--c:var(--green)"></i>Schede aggiornate</div>
      </div>
    </div>
  </section>

  <section class="light manifesto" aria-label="Il nostro approccio">
    <div class="wrap"><p>${list(C.manifesto.split(' '), (w) => `<span class="wd">${esc(w)}</span> `)}</p></div>
  </section>
  <div class="light band-photo"><div class="wrap"><div class="ph">${esc(C.photoBand)}</div></div></div>

  <section id="metodo" class="dark method">
    <div class="wrap method-head">
      <h2 class="display d2">${esc(C.methodTitle)}</h2>
      <p class="lead soft">${esc(C.methodText)}</p>
    </div>
    <div class="rail-pin">
      <div class="rail">
        ${list(C.pillars, (p) => `
        <article class="panel" style="--c:var(--${p.color})">
          <div class="plate" data-kg="${KG[p.color]} kg" aria-hidden="true"></div>
          <h3 class="display d3">${esc(p.name)}</h3>
          <div style="display:grid;gap:20px;">
            <p>${esc(p.text)}</p>
            <div class="detail">${esc(p.detail)}</div>
          </div>
        </article>`)}
      </div>
    </div>
  </section>

  <section id="programmi" class="light programs">
    <div class="wrap">
      <div class="programs-head">
        <h2 class="display d2">${esc(C.progTitle)}</h2>
        <p class="lead soft">${esc(C.progText)}</p>
      </div>
      <div class="cards">
        ${list(C.programs, (p) => `
        <article class="prog${p.featured ? ' featured' : ''}">
          <div class="top"><span class="soft">${esc(p.level)}</span>${p.featured ? `<span class="badge">${esc(C.featured)}</span>` : ''}</div>
          <h3 class="display d3">${esc(p.name)}</h3>
          <p class="soft" style="margin:0;">${esc(p.desc)}</p>
          <ul>${list(p.features, (f) => `<li>${esc(f)}</li>`)}</ul>
          <div class="price">${esc(p.price)}</div>
          <a href="#checkout" class="btn ${p.featured ? 'btn-blue' : 'btn-line'}">${esc(C.buy)}</a>
        </article>`)}
      </div>
      <p class="note soft">${esc(C.progNote)}</p>
    </div>
  </section>

  <section id="quiz" class="blue quiz">
    <div class="wrap quiz-grid">
      <div>
        <h2 class="display d2">${esc(C.quizTitle)}</h2>
        <p class="lead">${esc(C.quizText)}</p>
      </div>
      <div class="qbox">
        <div class="qmeta"><span class="qcount"></span><span class="qdots">${list(C.quiz, () => '<i></i>')}</span></div>
        <div class="qstage" aria-live="polite"></div>
      </div>
    </div>
  </section>

  <section id="team" class="light team">
    <div class="wrap">
      <div class="programs-head">
        <h2 class="display d2">${esc(C.teamTitle)}</h2>
        <p class="lead soft">${esc(C.teamText)}</p>
      </div>
      <div class="members">
        ${list(C.team, (m, i) => `
        <div class="member">
          <div class="ph" style="--r:${[-3, 2, -1.5][i]}deg;">${esc(C.photo)}</div>
          <div class="name">${esc(m.name)}</div>
          <div class="soft">${esc(m.role)}</div>
        </div>`)}
      </div>
    </div>
  </section>

  <section class="dark quotes">
    <div class="wrap">
      <h2 class="display d2" style="max-width:14ch;">${esc(C.quotesTitle)}</h2>
      <div class="qcards">
        ${list(C.quotes, (q) => `<figure class="qcard"><blockquote>${esc(q.text)}</blockquote><figcaption>${esc(q.who)}</figcaption></figure>`)}
      </div>
    </div>
  </section>

  <section id="pro" class="dark pro">
    <div class="wrap pro-grid">
      <div>
        <span class="tag">${esc(C.proTag)}</span>
        <h2 class="display d2">${esc(C.proTitle)}</h2>
        <p class="lead soft" style="margin-top:20px;">${esc(C.proText)}</p>
      </div>
      <form class="waitlist" novalidate>
        <label class="lbl" for="waitlist-email">${esc(C.proLabel)}</label>
        <div class="field-row">
          <input id="waitlist-email" class="field" type="email" required autocomplete="email" placeholder="nome@email.it" aria-describedby="waitlist-msg">
          <button class="btn btn-blue" type="submit"><span class="btn-label">${esc(C.proBtn)}</span></button>
        </div>
        <p id="waitlist-msg" class="form-msg soft" aria-live="polite"></p>
      </form>
    </div>
  </section>

  <section id="faq" class="light faq">
    <div class="wrap faq-grid">
      <h2 class="display d2">${esc(C.faqTitle)}</h2>
      <div class="faq-list">
        ${list(C.faq, (f, i) => `
        <div class="faq-item">
          <button class="faqbtn" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}" data-faq="${i}"><span>${esc(f.q)}</span><span class="plus" aria-hidden="true"><i></i></span></button>
          <div class="faq-panel" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}" aria-hidden="true"><p>${esc(f.a)}</p></div>
        </div>`)}
      </div>
    </div>
  </section>

  <section class="dark cta">
    <div class="wrap cta-row">
      <h2 class="display d2">${esc(C.ctaTitle)}</h2>
      <a href="#programmi" class="btn btn-blue">${esc(C.ctaBtn)}</a>
    </div>
    <div class="wordmark" aria-hidden="true">OTS</div>
  </section>
</main>

<footer class="dark">
  <div class="wrap foot">
    <span>© 2026 OTS. ${esc(C.rights)}</span>
    <nav aria-label="Note legali">${list(C.footLinks, (l) => `<a href="#${l.toLowerCase().split(' ')[0]}">${esc(l)}</a>`)}<span>${esc(C.footContact)}</span></nav>
  </div>
</footer>`;
}

document.getElementById('app').innerHTML = render();

function setupNav() {
  const nav = $('.nav');
  let lastY = window.scrollY;
  let hidden = false;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 8);
    const hide = y > lastY && y > 300;
    if (hide !== hidden && Math.abs(y - lastY) > 2) {
      hidden = hide;
      animate(nav, { y: hide ? '-100%' : '0%' }, reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.3 });
    }
    lastY = y;
  }, { passive: true });
  nav.addEventListener('focusin', () => { hidden = false; animate(nav, { y: '0%' }, { duration: 0 }); });
  scroll(animate($('.progress'), { scaleX: [0, 1] }, { ease: 'linear' }));
}

function setupMenu() {
  const btn = $('.menu-btn');
  const sheet = $('#sheet');
  const close = $('.sheet-close');
  const open = () => {
    sheet.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!reduce) {
      animate(sheet, { clipPath: ['circle(0% at 92% 4%)', 'circle(150% at 92% 4%)'] }, { duration: 0.5, ease: EASE });
      animate($$('.sheet nav a'), { y: [40, 0], opacity: [0, 1] }, { delay: stagger(0.05, { startDelay: 0.15 }), ...SPRING });
    }
    $('.sheet nav a').focus();
  };
  const shut = async () => {
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (!reduce) await animate(sheet, { clipPath: 'circle(0% at 92% 4%)' }, { duration: 0.35, ease: EASE });
    sheet.hidden = true;
    btn.focus();
  };
  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  $$('a', sheet).forEach((a) => a.addEventListener('click', shut));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) shut(); });
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
    tl.to(c, { '--s': 1, duration: 0.35, ease: 'back.out(2.5)' }, '+=0.5')
      .to(c, { '--d': 0, duration: 0.3, ease: 'power2.out' }, '-=0.15')
      .to(ring, { p: (i + 1) / n, duration: 0.6, ease: 'power2.inOut', onUpdate: drawRing }, '<');
    if (i < n - 1) tl.fromTo(timer, { s: 45 }, { s: 0, duration: 1.4, ease: 'none', onUpdate: drawTimer }, '<+0.2');
  });
  return tl;
}

function setupHero() {
  const loop = phoneLoop();
  const stage = $('.stage');
  const phone = $('.phone');
  if (reduce) return;

  const ells = $$('.track ellipse');
  gsap.set(ells, { attr: { 'stroke-dasharray': 1, 'stroke-dashoffset': 1 } });

  const intro = gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: () => loop && loop.play() });
  intro
    .to(ells, { attr: { 'stroke-dashoffset': 0 }, duration: 1.8, stagger: 0.06, ease: 'power3.inOut' }, 0)
    .from('.hero .kicker', { opacity: 0, x: -16, duration: 0.6 }, 0.1)
    .fromTo('.hero h1 .ln > span', { yPercent: 105, '--w': 125 }, { yPercent: 0, duration: 0.9, stagger: 0.07 }, 0.15)
    .to('.hero h1 .ln > span', { '--w': 62, duration: 1.1, stagger: 0.07, ease: 'expo.inOut' }, 0.45)
    .from('.hero-copy > *', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.9)
    .from(phone, { y: 120, rotateX: 28, rotateZ: -6, opacity: 0, duration: 1.2, ease: 'back.out(1.2)' }, 0.55)
    .from('.chip', { scale: 0.6, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)' }, 1.3);

  if (loop) ScrollTrigger.create({ trigger: stage, start: 'top bottom', end: 'bottom top', onToggle: (s) => { if (intro.progress() === 1) s.isActive ? loop.play() : loop.pause(); } });

  if (finePointer) {
    $('.hero').addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      animate(phone, { rotateY: x * 14, rotateX: -y * 10 }, { type: 'spring', bounce: 0.2, visualDuration: 0.5 });
      animate('.chip-1', { x: x * -18, y: y * -12 }, { type: 'spring', bounce: 0.2, visualDuration: 0.6 });
      animate('.chip-2', { x: x * 22, y: y * 16 }, { type: 'spring', bounce: 0.2, visualDuration: 0.6 });
    });
    $('.hero').addEventListener('pointerleave', () => {
      animate(phone, { rotateY: 0, rotateX: 0 }, SPRING);
      animate('.chip', { x: 0, y: 0 }, SPRING);
    });
  }

  gsap.to('.track', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
}

function setupScrollStory() {
  if (reduce) return;
  const words = $$('.manifesto .wd');
  gsap.set(words, { color: '#B4B9B1' });
  gsap.to(words, { color: '#1C2229', stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.manifesto p', start: 'top 78%', end: 'bottom 42%', scrub: true } });

  gsap.fromTo('.band-photo .ph', { clipPath: 'inset(0% 9% 0% 9% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none', scrollTrigger: { trigger: '.band-photo', start: 'top 90%', end: 'top 30%', scrub: true } });

  const mm = gsap.matchMedia();
  mm.add('(min-width: 641px)', () => {
    const rail = $('.rail');
    const dist = () => Math.max(0, rail.scrollWidth - window.innerWidth);
    const slide = gsap.to(rail, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.rail-pin', start: 'center center', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true }
    });
    gsap.to('.plate', { rotation: 300, ease: 'none', scrollTrigger: { trigger: '.rail-pin', start: 'center center', end: () => `+=${dist()}`, scrub: 0.8, invalidateOnRefresh: true } });
    $$('.panel').forEach((p) => {
      gsap.fromTo($('h3', p), { '--w': 125 }, { '--w': 62, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: slide, start: 'left 95%', end: 'left 45%', scrub: true } });
    });
  });
  mm.add('(max-width: 640px)', () => {
    $$('.panel').forEach((p) => {
      gsap.fromTo($('.plate', p), { rotation: -90 }, { rotation: 90, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  gsap.fromTo('.wordmark', { '--w': 62 }, { '--w': 112, ease: 'none', scrollTrigger: { trigger: '.wordmark', start: 'top bottom', end: 'bottom bottom', scrub: true } });
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
        ${step > 0 ? `<button class="qback">${esc(C.quizBack)}</button>` : ''}`;
    }
    count.textContent = C.quizResult;
    const prog = C.programs[answers[1]];
    return `<div class="qresult"><h3 tabindex="-1" style="margin:0;font-size:17px;font-weight:600;text-transform:none;font-variation-settings:normal;color:var(--ink-soft);">${esc(C.quizPick)}</h3>
      <div class="big">${esc(prog.name)}</div>
      <p>${esc(C.quiz[1].options[answers[1]])} anni, priorità ${esc(C.quiz[2].options[answers[2]].toLowerCase())}. ${esc(C.quizNote)}</p>
      <div class="row"><a href="#programmi" class="btn btn-blue">${esc(C.heroCta)}</a><button class="btn btn-line qrestart">${esc(C.quizRestart)}</button></div></div>`;
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
      if (!reduce) animate(opt, { scale: [0.97, 1] }, { type: 'spring', bounce: 0.5, visualDuration: 0.25 });
      setTimeout(() => go(step + 1, 1, true), reduce ? 0 : 160);
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
    panel.setAttribute('aria-hidden', String(!on));
    const opts = reduce ? { duration: 0 } : { type: 'spring', bounce: 0, visualDuration: 0.35 };
    animate(panel, { height: [`${panel.offsetHeight}px`, on ? `${panel.scrollHeight}px` : '0px'] }, opts).then(() => {
      if (on && open === i) panel.style.height = 'auto';
    });
    animate($('.plus', btn), { rotate: on ? 135 : 0, backgroundColor: on ? '#2E5BE3' : '#1C2229' }, reduce ? { duration: 0 } : SPRING);
  };
  $$('.faqbtn').forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.faq);
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

setupNav();
setupMenu();
setupHero();
setupScrollStory();
setupQuiz();
setupFaq();
setupWaitlist();
window.addEventListener('load', () => ScrollTrigger.refresh());
if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
