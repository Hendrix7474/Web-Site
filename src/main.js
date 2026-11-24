import { C } from './content.js';
import { header, footer, setupDropdowns, setupSheet } from './shell.js';
import * as S from './sections.js';
import * as A from './anim.js';
import './style.css';

// Each HTML entry sets <body data-page="...">; program pages also set data-program="<slug>".
const page = document.body.dataset.page || 'home';
const slug = document.body.dataset.program;

const PAGES = {
  home: () => S.homeHero() + S.intro(true) + S.pillars() + S.programsBlock({ home: true }) + S.quotes(true) + S.cta(),
  programmi: () => S.pageHero('programmi', '[Foto: atleti in allenamento]') + S.programsBlock() + S.quiz() + S.faq(C.faq.slice(0, 3)) + S.cta(),
  programma: () => S.programPage(C.programs.find((p) => p.slug === slug) || C.programs[0]) + S.cta(),
  metodo: () => S.pageHero('metodo', '[Foto: seduta di forza]') + S.intro() + S.pillars() + S.cta(),
  'chi-siamo': () => S.pageHero('chi-siamo', '[Foto: il team]') + S.team(false) + S.quotes() + S.cta(),
  pro: () => S.pageHero('pro', '[Foto: atleta professionista]') + S.pro() + S.cta(),
  domande: () => S.pageHero('domande', '[Foto: genitore e atleta]') + S.faq(C.faq, C.faqTitle, S.contactBox()) + S.cta()
};

const navKey = page === 'programma' ? 'programmi' : page;
document.querySelector('#app').innerHTML = `${S.paperFilter}
<div class="page">
  ${header(navKey)}
  <main id="main">${(PAGES[page] || PAGES.home)()}</main>
  ${footer()}
</div>`;

setupDropdowns();
setupSheet();
A.setupHomeHero();
A.setupPageHero();
A.setupReveals();
A.setupIntro();
A.setupPillars();
A.setupPrograms();
A.setupTeam();
A.setupCta();
A.setupProgramPage();
A.setupPress();
A.setupQuiz();
A.setupFaq();
A.setupWaitlist();
A.refreshOnLoad();

// Same-page anchors after the content is rendered (e.g. programmi.html#quiz from another page).
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) requestAnimationFrame(() => target.scrollIntoView());
}
