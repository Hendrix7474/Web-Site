// Shared page chrome: header with hover dropdowns, mobile sheet, footer.
import { animate, hover, stagger } from 'motion';
import { C } from './content.js';
import { esc, list, $, $$, reduce, finePointer, SPRING, EASE } from './util.js';

const chevron = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';

export function header(page) {
  return `
<a class="skip" href="#main">Vai al contenuto</a>
<header class="site-head">
  <div class="wrap head-row">
    <a href="index.html" class="logo" aria-label="OTS, ${esc(C.home)}">OTS</a>
    <nav class="menu" aria-label="Principale">
      <ul class="menu-list">
        ${list(C.menu, (g, gi) => `
        <li class="mi${g.items ? ' has-sub' : ''}" data-g="${gi}">
          <a href="${g.href}" class="mi-link"${g.page === page ? ' aria-current="page"' : ''}>${esc(g.label)}</a>
          ${g.items ? `<button class="mi-toggle" aria-expanded="false" aria-controls="sub-${gi}" aria-label="${esc(C.subOpen)}: ${esc(g.label)}">${chevron}</button>
          <div class="sub" id="sub-${gi}" hidden>
            <ul>${list(g.items, (it) => `<li><a href="${it.href}"${it.all ? ' class="all"' : ''}><span>${esc(it.label)}</span><i aria-hidden="true">→</i></a></li>`)}</ul>
          </div>` : ''}
        </li>`)}
      </ul>
    </nav>
    <a href="${C.loginHref}" class="btn btn-ink btn-sm head-login">${esc(C.login)}</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="sheet">${esc(C.menuOpen)}</button>
  </div>
</header>
<div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-label="${esc(C.menuOpen)}">
  <div class="sheet-top"><a href="index.html" class="logo">OTS</a><button class="sheet-close" aria-label="${esc(C.menuClose)}">×</button></div>
  <nav class="sheet-nav" aria-label="Menu mobile">
    ${list(C.menu, (g, gi) => g.items ? `
    <div class="sg">
      <button class="sg-btn" aria-expanded="false" aria-controls="sg-${gi}"><span>${esc(g.label)}</span><b aria-hidden="true">+</b></button>
      <div class="sg-panel" id="sg-${gi}" hidden>${list(g.items, (it) => `<a href="${it.href}">${esc(it.label)}</a>`)}</div>
    </div>` : `<a class="sg-link" href="${g.href}">${esc(g.label)}</a>`)}
  </nav>
  <a href="${C.loginHref}" class="btn btn-cream">${esc(C.login)}</a>
</div>`;
}

export function footer() {
  return `
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="index.html" class="logo">OTS</a>
        <p>${esc(C.heroKicker)}</p>
        <span>${esc(C.footContact)}</span>
      </div>
      ${list(C.menu.filter((g) => g.items), (g) => `
      <div class="foot-col">
        <a class="foot-h" href="${g.href}">${esc(g.label)}</a>
        ${list(g.items, (it) => `<a href="${it.href}">${esc(it.label)}</a>`)}
      </div>`)}
    </div>
    <div class="foot-base">
      <nav aria-label="Legale">${list(C.footLinks, (l) => `<a href="#">${esc(l)}</a>`)}</nav>
      <span>© ${new Date().getFullYear()} OTS. ${esc(C.rights)}</span>
    </div>
  </div>
</footer>`;
}

/* Desktop dropdowns: open on hover (fine pointers), on the chevron button (keyboard/touch), close on leave/Escape/focus out. */
export function setupDropdowns() {
  const groups = $$('.mi.has-sub');
  const state = new Map();

  const setOpen = (li, on) => {
    const s = state.get(li);
    if (s.open === on) return;
    s.open = on;
    const btn = $('.mi-toggle', li);
    const sub = $('.sub', li);
    btn.setAttribute('aria-expanded', String(on));
    li.classList.toggle('open', on);
    if (on) {
      groups.forEach((g) => { if (g !== li) setOpen(g, false); });
      sub.hidden = false;
      if (reduce) return;
      animate(sub, { opacity: [0, 1], y: [-10, 0], clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }, { type: 'spring', bounce: 0.15, visualDuration: 0.32 });
      animate($$('li', sub), { opacity: [0, 1], x: [-10, 0] }, { delay: stagger(0.035, { startDelay: 0.05 }), duration: 0.28, ease: EASE });
    } else {
      if (reduce) { sub.hidden = true; return; }
      animate(sub, { opacity: 0, y: -6 }, { duration: 0.15, ease: 'easeIn' }).then(() => { if (!s.open) sub.hidden = true; });
    }
  };

  groups.forEach((li) => {
    state.set(li, { open: false, timer: 0 });
    const s = state.get(li);
    const btn = $('.mi-toggle', li);
    btn.addEventListener('click', () => setOpen(li, !s.open));
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) setOpen(li, false); });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && s.open) { setOpen(li, false); btn.focus(); }
      if (e.key === 'ArrowDown' && e.target === btn) { e.preventDefault(); setOpen(li, true); $('.sub a', li).focus(); }
    });
    if (finePointer) {
      hover(li, () => {
        clearTimeout(s.timer);
        setOpen(li, true);
        // Small grace period so a diagonal move toward the panel doesn't close it.
        return () => { s.timer = setTimeout(() => setOpen(li, false), 140); };
      });
    }
  });
  document.addEventListener('click', (e) => { groups.forEach((li) => { if (!li.contains(e.target)) setOpen(li, false); }); });

  // Header gets a hairline once the page scrolls.
  const head = $('.site-head');
  const onScroll = () => head.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile sheet with accordion groups. */
export function setupSheet() {
  const btn = $('.menu-btn');
  const sheet = $('#sheet');
  const close = $('.sheet-close');
  const open = () => {
    sheet.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (!reduce) {
      animate(sheet, { clipPath: ['circle(0% at 92% 4%)', 'circle(150% at 92% 4%)'] }, { duration: 0.55, ease: EASE });
      animate($$('.sheet-nav > *', sheet), { y: [40, 0], opacity: [0, 1] }, { delay: stagger(0.05, { startDelay: 0.12 }), ...SPRING });
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
  sheet.addEventListener('keydown', (e) => { if (e.key === 'Escape') shut(); });
  $$('a', sheet).forEach((a) => a.addEventListener('click', () => {
    // Same-page anchors: close the sheet; other pages navigate away anyway.
    if (a.getAttribute('href').startsWith('#')) shut();
  }));
  $$('.sg-btn', sheet).forEach((b) => b.addEventListener('click', () => {
    const panel = document.getElementById(b.getAttribute('aria-controls'));
    const on = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(on));
    panel.hidden = !on;
    if (!reduce) {
      animate($('b', b), { rotate: on ? 45 : 0 }, SPRING);
      if (on) animate($$('a', panel), { opacity: [0, 1], x: [-12, 0] }, { delay: stagger(0.04), ...SPRING });
    }
  }));
}
