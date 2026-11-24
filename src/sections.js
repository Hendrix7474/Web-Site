// Reusable page sections. Each returns an HTML string; animations live in anim.js.
import { C } from './content.js';
import { esc, list } from './util.js';

const PH = ['sun', 'dusk', '', 'redph'];
const ROT = [-2, 1.5, -1];

export const paperFilter = `
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

// Words never break mid-word; each word masks its own letters for the rise-in.
const words = (t) => t.split(' ').map((w) => `<span class="w">${chars(w)}</span>`).join(' ');
const chars = (w) => list([...w], (ch) => `<span class="ch">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`);

/* Home hero: the sunset card with the giant crumpled word. */
export function homeHero() {
  return `
<section class="hero" id="top">
  <div class="wrap">
    <div class="hero-card grain">
      <div class="sunball" aria-hidden="true"></div>
      <div class="court" aria-hidden="true">${courtSvg}</div>
      <div class="hero-stage">
        <div class="hero-photo ph grain" aria-hidden="true"><span class="ph-label">${esc(C.heroPhoto)}</span></div>
        <p class="slash hero-slash">${esc(C.heroSlash)}</p>
        <p class="display hero-word paper" aria-hidden="true">${chars(C.heroWord)}</p>
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
          <a href="programmi.html" class="btn btn-red">${esc(C.heroCta)} <span class="arr" aria-hidden="true">→</span></a>
          <a href="programmi.html#quiz" class="btn btn-line">${esc(C.heroCta2)}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* Inner-page hero: slash label, giant crumpled title, tilted photo card. */
export function pageHero(key, photo = '[Foto]') {
  const p = C.pages[key];
  return `
<section class="phero">
  <div class="wrap phero-grid">
    <div class="phero-text">
      <nav class="crumbs" aria-label="Percorso"><a href="index.html">${esc(C.home)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.title)}</span></nav>
      <p class="slash">${esc(p.slash)}</p>
      <h1 class="display phero-title paper">${words(p.title)}</h1>
      <p class="lead soft reveal">${esc(p.text)}</p>
    </div>
    <div class="ph phero-photo sun grain" aria-hidden="true">${esc(photo)}</div>
  </div>
</section>`;
}

export function intro(withLink = false) {
  return `
<section class="intro" aria-labelledby="metodo-t">
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
    <div class="manifesto">
      <p>${list(C.manifesto.split(' '), (w) => `<span class="wd${C.manifestoHot.includes(w) ? ' hot' : ''}">${esc(w)}</span> `)}</p>
      ${withLink ? `<a href="metodo.html" class="btn btn-line">${esc(C.homeMethodLink)} <span class="arr" aria-hidden="true">→</span></a>` : ''}
      <div class="float-card ph redph" aria-hidden="true">OTS</div>
    </div>
  </div>
</section>`;
}

export function pillars() {
  return `
<section class="pillars" id="basi" aria-labelledby="pillars-t">
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
          <div class="p-cards">${list(C.pillars, (p, i) => `<div class="ph ${PH[i]} grain" aria-hidden="true">[Foto: ${esc(p.detail.toLowerCase())}]</div>`)}</div>
          <p class="p-desc" aria-live="polite"><b>${esc(C.pillars[0].detail)}</b>${esc(C.pillars[0].text)}</p>
        </div>
        <ul class="p-list">${list(C.pillars, (p, i) => `<li><button data-i="${i}" aria-current="${i === 0}">${esc(p.name)}</button></li>`)}</ul>
      </div>
      <span class="p-count" aria-hidden="true">01 / 0${C.pillars.length}</span>
    </div>
  </div>
</section>`;
}

export function progCard(p, i) {
  return `
<article class="prog${p.featured ? ' featured' : ''}" data-goal="${esc(p.goal)}" data-rot="${ROT[i % 3]}">
  <div class="top"><span>${esc(p.level)} · ${esc(p.goal)}</span>${p.featured ? `<span class="badge">${esc(C.featured)}</span>` : ''}</div>
  <h3 class="display d3"><a href="${p.slug}.html" class="card-link">${esc(p.name)}</a></h3>
  <p class="soft" style="margin:0;">${esc(p.desc)}</p>
  <ul>${list(p.features, (f) => `<li>${esc(f)}</li>`)}</ul>
  <div class="price">${esc(p.price)}</div>
  <div class="prog-actions">
    <a href="${p.slug}.html" class="btn ${p.featured ? 'btn-ink' : 'btn-red'}">${esc(C.details)}</a>
  </div>
</article>`;
}

export function programsBlock({ home = false } = {}) {
  const listing = !home;
  return `
<section id="programmi" class="programs" aria-labelledby="prog-t">
  <div class="wrap">
    ${listing ? `<h2 id="prog-t" class="sr">${esc(C.progTitle)}</h2>` : `<div class="prog-head">
      <div class="ph peek sun grain" aria-hidden="true"></div>
      <h2 id="prog-t" class="display big paper">${list((home ? C.homeProgTitle : C.progTitle).split(' '), (w) => `<span class="ln"><span>${esc(w)}</span></span>`)}</h2>
      <div class="reveal">
        <p class="lead soft">${esc(home ? C.homeProgText : C.progText)}</p>
        ${home ? `<a href="programmi.html" class="btn btn-line" style="margin-top:20px;">${esc(C.homeAll)} <span class="arr" aria-hidden="true">→</span></a>` : ''}
      </div>
    </div>`}
    ${home ? '' : `
    <div class="filters" role="group" aria-label="${esc(C.filterLabel)}">
      ${list([C.filterAll, ...C.goals], (g, i) => `<button class="chip" aria-pressed="${i === 0}" data-goal="${i === 0 ? '' : esc(g)}">${esc(g)}</button>`)}
    </div>`}
    <div class="cards">${list(C.programs, progCard)}</div>
    <p class="note soft">${esc(C.progNote)}</p>
  </div>
</section>`;
}

export function quiz() {
  return `
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
</section>`;
}

export function team(withHead = true) {
  const words = C.teamTitle.split(' ');
  if (!withHead) return team.body(`<h2 id="team-t" class="sr">${esc(C.teamTitle)}</h2>`);
  return `
<section id="team" class="team" aria-labelledby="team-t">
  <div class="wrap">
    ${'<!--head-->'}<div class="sec-head">
      <h2 id="team-t" class="display d2"><span class="ln"><span>${esc(words.slice(0, -1).join(' '))} <em class="red" style="font-style:normal">${esc(words.at(-1))}</em></span></span></h2>
      <p class="lead soft reveal">${esc(C.teamText)}</p>
    </div>${'<!--/head-->'}
    <div class="members">
      ${list(C.team, (m, i) => `
      <div class="member">
        <div class="ph ${PH[i]} grain">${esc(C.photo)}</div>
        <div class="name">${esc(m.name)}</div>
        <div class="soft">${esc(m.role)}</div>
      </div>`)}
    </div>
  </div>
</section>`;
}

// Team section without its big heading (the page hero already says it).
team.body = (head) => team().replace(/<!--head-->[\s\S]*<!--\/head-->/, head);

export function quotes(link = false) {
  return `
<section id="testimonianze" class="quotes" aria-labelledby="quotes-t">
  <div class="wrap">
    <div class="quotes-head">
      <h2 id="quotes-t" class="display d2" style="max-width:12ch;">${esc(C.quotesTitle)}</h2>
      ${link ? `<a href="chi-siamo.html" class="btn btn-line">${esc(C.homeTeamLink)} <span class="arr" aria-hidden="true">→</span></a>` : ''}
    </div>
    <div class="qcards">
      ${list(C.quotes, (q) => `<figure class="qcard"><blockquote>${esc(q.text)}</blockquote><figcaption>${esc(q.who)}</figcaption></figure>`)}
    </div>
  </div>
</section>`;
}

export function pro() {
  return `
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
</section>`;
}

export function faq(items = C.faq, title = C.faqTitle, extra = '') {
  return `
<section id="faq" class="faq" aria-labelledby="faq-t">
  <div class="wrap faq-grid">
    <div><h2 id="faq-t" class="display d2">${esc(title)}</h2>${extra}</div>
    <div class="faq-list">
      ${list(items, (f, i) => `
      <div class="faq-item">
        <button class="faqbtn" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}" data-faq="${i}"><span>${esc(f.q)}</span><span class="plus" aria-hidden="true">+</span></button>
        <div class="faq-a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}" aria-hidden="true"><p>${esc(f.a)}</p></div>
      </div>`)}
    </div>
  </div>
</section>`;
}

export function contactBox() {
  return `
<div class="contact-box">
  <h3>${esc(C.contactTitle)}</h3>
  <p class="soft">${esc(C.contactText)}</p>
  <p class="mail">${esc(C.contactMail)}</p>
</div>`;
}

export function cta() {
  return `
<section class="cta" aria-labelledby="cta-t">
  <span class="cta-word paper" aria-hidden="true">${esc(C.marquee.slice(0, 3).join(' · '))}</span>
  <div class="wrap cta-mid">
    <h2 id="cta-t">${esc(C.ctaTitle)}</h2>
    <a href="programmi.html" class="btn btn-red">${esc(C.ctaBtn)} <span class="arr" aria-hidden="true">→</span></a>
  </div>
  <span class="cta-word k" aria-hidden="true">${esc(C.heroTitle.join(' '))}</span>
</section>`;
}

/* Single program page. */
export function programPage(p) {
  const others = C.programs.filter((o) => o.slug !== p.slug);
  return `
<section class="phero prog-hero">
  <div class="wrap phero-grid">
    <div class="phero-text">
      <nav class="crumbs" aria-label="Percorso"><a href="index.html">${esc(C.home)}</a><span aria-hidden="true">/</span><a href="programmi.html">${esc(C.menu[0].label)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.name)}</span></nav>
      <p class="slash">/ ${esc(p.goal)} · ${esc(p.level)}</p>
      <h1 class="display phero-title paper">${words(p.name)}</h1>
      <p class="lead soft reveal">${esc(p.desc)}</p>
      <div class="buy reveal" id="buy">
        <div><div class="price">${esc(p.price)}</div><div class="soft small">${esc(C.onetime)}</div></div>
        <a href="#checkout" class="btn btn-red">${esc(C.buy)} <span class="arr" aria-hidden="true">→</span></a>
      </div>
    </div>
    <div class="ph phero-photo dusk grain" aria-hidden="true">[Foto: ${esc(p.name)}]</div>
  </div>
</section>

<section class="incl" aria-labelledby="incl-t">
  <div class="wrap">
    <div class="panel incl-panel">
      <h2 id="incl-t" class="display d3">${esc(C.includesTitle)}</h2>
      <ul class="incl-list">${list(C.includes, (x, i) => `<li><span class="n" aria-hidden="true">${['✶', '▶', '◉', '↗'][i]}</span>${esc(x)}</li>`)}</ul>
      <div class="incl-meta"><span>${esc(p.weeks)}</span>${list(p.features, (f) => `<span>${esc(f)}</span>`)}</div>
    </div>
  </div>
</section>

<section class="phases" aria-labelledby="ph-t">
  <div class="wrap phases-grid">
    <h2 id="ph-t" class="display d2">${esc(C.weeksTitle)}</h2>
    <ol class="phase-list">
      <span class="phase-line" aria-hidden="true"><i></i></span>
      ${list(C.phases, (f) => `<li><b class="display">${esc(f.name)}</b><span class="wk">${esc(f.weeks)}</span><p class="soft">${esc(f.text)}</p></li>`)}
    </ol>
  </div>
</section>

<section class="forwho" aria-labelledby="fw-t">
  <div class="wrap forwho-grid">
    <h2 id="fw-t" class="display d2 red paper">${esc(C.forWhoTitle)}</h2>
    <ul>${list(C.forWho, (x) => `<li>${esc(x)}</li>`)}</ul>
  </div>
</section>

${faq(C.faq.slice(0, 3))}

<section class="programs others" aria-labelledby="oth-t">
  <div class="wrap">
    <div class="quotes-head"><h2 id="oth-t" class="display d2">${esc(C.otherProgs)}</h2><a href="programmi.html" class="btn btn-line">${esc(C.homeAll)} <span class="arr" aria-hidden="true">→</span></a></div>
    <div class="cards cards-2">${list(others, progCard)}</div>
  </div>
</section>

<div class="buybar" hidden>
  <div class="wrap buybar-row">
    <div><b>${esc(p.name)}</b><span>${esc(p.price)}</span></div>
    <a href="#checkout" class="btn btn-red btn-sm">${esc(C.buy)}</a>
  </div>
</div>`;
}
