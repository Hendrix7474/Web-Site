// Page behaviour and motion. Every setup returns early when its section isn't on the page.
import { animate, scroll, inView, hover, press, stagger } from 'motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './content.js';
import { esc, list, $, $$, reduce, finePointer, SPRING, SNAPPY, EASE } from './util.js';

gsap.registerPlugin(ScrollTrigger);
const ROT = [-7, 5, -4, 8];

export function setupHomeHero() {
  const card = $('.hero-card');
  if (!card || reduce) return;
  const chars = $$('.hero-word .ch');
  animate(card, { clipPath: ['inset(12% 8% 12% 8% round 24px)', 'inset(0% 0% 0% 0% round 4px)'] }, { duration: 1.1, ease: EASE });
  animate('.hero-photo', { y: ['60%', '0%'] }, { delay: 0.35, type: 'spring', bounce: 0.2, visualDuration: 0.9 });
  animate(chars, { y: ['105%', '0%'], rotate: [8, 0] }, { delay: stagger(0.055, { startDelay: 0.55, from: 'center' }), type: 'spring', bounce: 0.35, visualDuration: 0.7 });
  animate($$('.hero-slash, .hero-side'), { opacity: [0, 1], x: [-16, 0] }, { delay: 1.1, duration: 0.6, ease: EASE });
  animate($$('.hero-foot h1 .ln > span'), { y: ['110%', '0%'] }, { delay: stagger(0.08, { startDelay: 0.9 }), ...SPRING });
  animate($$('.hero-foot .reveal'), { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1, { startDelay: 1.1 }), ...SPRING });

  const opts = { target: card, offset: ['start start', 'end start'] };
  scroll(animate('.hero-word', { y: [0, 90], scale: [1, 0.92] }, { ease: 'linear' }), opts);
  scroll(animate('.hero-photo', { y: [0, -60] }, { ease: 'linear' }), opts);
  scroll(animate('.sunball', { scale: [1, 1.6], opacity: [1, 0.4] }, { ease: 'linear' }), opts);
  springyLetters(chars);
}

function springyLetters(chars) {
  if (!finePointer) return;
  chars.forEach((ch) => hover(ch, () => {
    animate(ch, { y: -24, rotate: -4 }, SNAPPY);
    return () => animate(ch, { y: 0, rotate: 0 }, { type: 'spring', bounce: 0.55, visualDuration: 0.45 });
  }));
}

/* Inner-page hero: letters rise, photo card swings in and drifts on scroll. */
export function setupPageHero() {
  const hero = $('.phero');
  if (!hero || reduce) return;
  const chars = $$('.phero-title .ch', hero);
  animate(chars, { y: ['110%', '0%'], rotate: [6, 0] }, { delay: stagger(0.03, { startDelay: 0.1 }), type: 'spring', bounce: 0.35, visualDuration: 0.6 });
  animate($$('.slash, .crumbs', hero), { opacity: [0, 1], x: [-14, 0] }, { duration: 0.5, ease: EASE });
  animate($$('.reveal', hero), { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1, { startDelay: 0.45 }), ...SPRING });
  const photo = $('.phero-photo', hero);
  animate(photo, { rotate: [16, 4], y: [80, 0], opacity: [0, 1] }, { delay: 0.2, type: 'spring', bounce: 0.3, visualDuration: 0.8 });
  scroll(animate(photo, { y: [0, 80], rotate: [4, -3] }, { ease: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
  springyLetters(chars);
}

export function setupReveals() {
  if (reduce) return;
  const heads = $$('.sec-head, .prog-head');
  heads.forEach((el) => $$('.ln > span', el).forEach((s) => { s.style.transform = 'translateY(110%)'; }));
  heads.forEach((el) => inView(el, () => {
    animate($$('.ln > span', el), { y: ['110%', '0%'] }, { delay: stagger(0.08), ...SPRING });
    animate($$('.reveal', el), { opacity: [0, 1], y: [24, 0] }, { delay: 0.2, ...SPRING });
  }, { amount: 0.4 }));

  $$('main .d2, .quiz-card .display, .panel-head .display, .incl-panel .d3').forEach((h) => {
    if (h.closest('.sec-head, .prog-head, .phero')) return;
    inView(h, () => { animate(h, { opacity: [0, 1], y: [50, 0], rotate: [-2, 0] }, SPRING); }, { amount: 0.3 });
  });
  $$('.qcards').forEach((el) => inView(el, () => {
    $$('.qcard', el).forEach((q, i) => animate(q, { y: [60, 0], opacity: [0, 1], rotate: [[-4, 2, -3][i], 0] }, { delay: i * 0.1, ...SPRING }));
  }, { amount: 0.2 }));
  $$('.faq-list').forEach((el) => inView(el, () => { animate($$('.faq-item', el), { opacity: [0, 1], x: [30, 0] }, { delay: stagger(0.07), ...SPRING }); }, { amount: 0.2 }));
  $$('.incl-list, .forwho ul').forEach((el) => inView(el, () => { animate($$('li', el), { opacity: [0, 1], y: [24, 0] }, { delay: stagger(0.08), ...SPRING }); }, { amount: 0.3 }));
}

export function setupIntro() {
  if (!$('.intro')) return;
  if (reduce) return;
  const st = (trigger) => ({ trigger, start: 'top bottom', end: 'bottom top', scrub: true });
  gsap.fromTo('.stack .tilt', { rotation: -10, y: 80 }, { rotation: 5, y: -40, ease: 'none', scrollTrigger: st('.intro') });
  gsap.fromTo('.stack .w1', { xPercent: -18 }, { xPercent: 6, ease: 'none', scrollTrigger: st('.intro') });
  gsap.fromTo('.stack .w2', { xPercent: 22 }, { xPercent: -4, ease: 'none', scrollTrigger: st('.intro') });
  gsap.fromTo('.float-card', { y: 120, rotation: 14 }, { y: -120, rotation: -10, ease: 'none', scrollTrigger: st('.intro') });

  const words = $$('.manifesto .wd');
  gsap.fromTo(words, { color: '#A3A08C' }, {
    color: (i, el) => (el.classList.contains('hot') ? '#C42E16' : '#111111'),
    stagger: 0.05, ease: 'none',
    scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true }
  });
  const paths = $$('.ball-line circle, .ball-line path');
  paths.forEach((p) => { p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; });
  gsap.to(paths, { strokeDashoffset: 0, stagger: 0.15, ease: 'none', scrollTrigger: { trigger: '.intro', start: 'top 70%', end: 'center center', scrub: true } });
}

export function setupPillars() {
  if (!$('.pillars')) return;
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
      const d = (j - i + cards.length) % cards.length;
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

  if (reduce) return;
  const loop = animate($('.marquee .track'), { x: ['0%', '-50%'] }, { duration: 28, ease: 'linear', repeat: Infinity });
  inView('.marquee', () => { loop.play(); return () => loop.pause(); });

  gsap.matchMedia().add('(min-width: 961px)', () => {
    ScrollTrigger.create({
      trigger: '.pillars .panel', start: 'center center', end: `+=${cards.length * 70}%`, pin: '.pillars',
      onUpdate: (st) => show(Math.min(cards.length - 1, Math.floor(st.progress * cards.length)))
    });
  });
  gsap.fromTo('.pillars .panel', { scale: 0.92, borderRadius: 48 }, { scale: 1, borderRadius: 24, ease: 'none', scrollTrigger: { trigger: '.pillars', start: 'top bottom', end: 'top 30%', scrub: true } });
}

/* Program cards: deal in, straighten on hover. Optional goal filter on the listing page. */
export function setupPrograms() {
  $$('.cards').forEach((wrap) => {
    const cards = $$('.prog', wrap);
    cards.forEach((c) => { c.style.transform = `rotate(${c.dataset.rot}deg)`; });
    if (!reduce) {
      cards.forEach((c) => { c.style.opacity = '0'; });
      inView(wrap, () => {
        cards.forEach((c, i) => animate(c, { opacity: [0, 1], y: [120, 0], rotate: [[-12, 6, 12][i % 3], Number(c.dataset.rot)] }, { delay: i * 0.09, type: 'spring', bounce: 0.3, visualDuration: 0.7 }));
      }, { amount: 0.15 });
    }
    if (finePointer && !reduce) cards.forEach((c) => hover(c, () => {
      animate(c, { rotate: 0, y: -12, scale: 1.02 }, SNAPPY);
      return () => animate(c, { rotate: Number(c.dataset.rot), y: 0, scale: 1 }, SPRING);
    }));
    // The title link covers the whole card, so the card is one big click target.
  });
  if ($('.prog-head .peek') && !reduce) {
    gsap.fromTo('.prog-head .peek', { rotation: -14, y: 60 }, { rotation: 10, y: -40, ease: 'none', scrollTrigger: { trigger: '.programs', start: 'top bottom', end: 'center top', scrub: true } });
  }

  const chips = $$('.filters .chip');
  if (!chips.length) return;
  chips.forEach((chip) => chip.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    const goal = chip.dataset.goal;
    $$('.programs .prog').forEach((card) => {
      const on = !goal || card.dataset.goal === goal;
      if (on === !card.hidden) return;
      if (on) {
        card.hidden = false;
        if (!reduce) animate(card, { opacity: [0, 1], scale: [0.9, 1], y: [30, 0] }, SPRING);
      } else if (reduce) {
        card.hidden = true;
      } else {
        animate(card, { opacity: 0, scale: 0.92 }, { duration: 0.18, ease: 'easeIn' }).then(() => { card.hidden = true; card.style.opacity = ''; });
      }
    });
    if (!reduce) animate(chip, { scale: [0.9, 1] }, SNAPPY);
  }));
}

export function setupTeam() {
  if (!$('.members') || reduce) return;
  $$('.member .ph').forEach((ph, i) => {
    const r = [-9, 7, -6][i];
    gsap.fromTo(ph, { rotation: r, y: 24 + i * 12 }, { rotation: r / 3, y: 0, ease: 'none', scrollTrigger: { trigger: '.members', start: 'top bottom', end: 'center 55%', scrub: true } });
  });
}

export function setupCta() {
  const cta = $('.cta');
  if (!cta || reduce) return;
  const [a, b] = $$('.cta-word', cta);
  scroll(animate(a, { x: ['20%', '-30%'] }, { ease: 'linear' }), { target: cta, offset: ['start end', 'end start'] });
  scroll(animate(b, { x: ['-40%', '5%'] }, { ease: 'linear' }), { target: cta, offset: ['start end', 'end start'] });
}

/* Program page: phase line draws with scroll; buy bar slides in once the hero's buy box leaves view. */
export function setupProgramPage() {
  const list_ = $('.phase-list');
  if (!list_) return;
  if (!reduce) {
    scroll(animate('.phase-line i', { scaleY: [0, 1] }, { ease: 'linear' }), { target: list_, offset: ['start 75%', 'end 60%'] });
    $$('li', list_).forEach((li) => inView(li, () => { animate(li, { opacity: [0.25, 1], x: [24, 0] }, SPRING); }, { amount: 0.6 }));
  }
  const bar = $('.buybar');
  inView('#buy', () => {
    hideBar();
    return () => showBar();
  }, { amount: 0 });
  function showBar() {
    bar.hidden = false;
    if (!reduce) animate(bar, { y: ['100%', '0%'] }, SPRING);
  }
  function hideBar() {
    if (bar.hidden) return;
    if (reduce) { bar.hidden = true; return; }
    animate(bar, { y: '100%' }, { duration: 0.2, ease: 'easeIn' }).then(() => { bar.hidden = true; });
  }
}

export function setupPress() {
  if (reduce) return;
  press('.btn, .qopt, .chip', (el) => {
    animate(el, { scale: 0.95 }, SNAPPY);
    return () => animate(el, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
  });
}

export function setupQuiz() {
  const stageEl = $('.qstage');
  if (!stageEl) return;
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
    return `<div class="qresult"><h3 tabindex="-1" class="qpick">${esc(C.quizPick)}</h3>
      <div class="big">${esc(prog.name)}</div>
      <p>${esc(C.quiz[1].options[answers[1]])} anni, priorità ${esc(C.quiz[2].options[answers[2]].toLowerCase())}. ${esc(C.quizNote)}</p>
      <div class="row"><a href="${prog.slug}.html" class="btn btn-red">${esc(C.details)}</a><button class="btn btn-line qrestart">${esc(C.quizRestart)}</button></div></div>`;
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

export function setupFaq() {
  const btns = $$('.faqbtn');
  if (!btns.length) return;
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
    animate($('.plus', btn), { rotate: on ? 135 : 0, backgroundColor: on ? '#C42E16' : '#111111' }, reduce ? { duration: 0 } : SPRING);
  };
  btns.forEach((btn) => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.faq);
    const prev = open;
    open = prev === i ? -1 : i;
    if (prev !== -1) set(prev, false);
    if (open !== -1) set(open, true);
  }));
}

export function setupWaitlist() {
  const form = $('.waitlist');
  if (!form) return;
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

export function refreshOnLoad() {
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
}
