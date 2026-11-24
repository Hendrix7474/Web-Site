# OTS – sito web

Sito vetrina di OTS (preparazione atletica giovanile + app). Il proprietario non è tecnico:
lavora in autonomia, scegli tu gli strumenti e alla fine spiega cosa hai fatto **in italiano semplice**,
senza gergo (niente "refactor", "token", "commit": di' "ho sistemato", "ho salvato", ecc.).

## Progetto

- Vite + JavaScript puro (niente React). `npm install`, poi `npm run dev` / `npm run build`.
- **Testi**: tutti in `src/content.js` (oggetto `C`). Cambi di copy si fanno lì, non in `main.js`.
- **Struttura e animazioni**: `src/main.js` (Motion `animate/scroll/stagger` + GSAP ScrollTrigger).
- **Stile**: `src/style.css`. Usa sempre le variabili in `:root`, mai colori scritti a mano.
- Identità visiva (non cambiarla senza che venga chiesto): fasce scure "pavimento in gomma" (`--rubber`)
  alternate a fasce chiare "gesso" (`--chalk`); i quattro colori dei dischi da palestra codificano
  i pilastri del metodo: rosso = Forza, blu = Velocità, giallo = Prevenzione, verde = Crescita.
  Font unico: Archivo variabile. Layout asimmetrico allineato a sinistra.
- Lingua del sito: italiano. Pubblico: giovani atleti e genitori.

## Quale skill usare, in automatico

Non aspettare che l'utente nomini una skill: scegli tu in base al compito.

| Compito | Skill / strumento |
|---|---|
| Nuova pagina o nuova sezione | `frontend-design:frontend-design` + `ui-ux-pro-max` (prima definisci la direzione, poi scrivi codice); per pagine intere anche `anthropic-skills:design-system-first-ui` |
| "Rendilo più bello / sembra fatto con l'AI" | `unslop:unslop` |
| Animazioni, scroll, transizioni | skill `motion` (docs via MCP `motion`). Per controllare le prestazioni di tutte le animazioni: agente `motion-reviewer` (richiede Motion+ autorizzato) |
| Scrivere o rivedere testi del sito, bottoni, messaggi | `design:ux-copy`; testi lunghi/marketing `marketing:content-creation`; coerenza di tono `marketing:brand-review` |
| Google / visibilità nei motori di ricerca | `marketing:seo-audit` |
| Accessibilità (contrasti, tastiera, mobile) | `design:accessibility-review` |
| Giudizio sul design | `design:design-critique` |
| Grafici o numeri (es. risultati atleti) | `dataviz` |
| Immagini, locandine, post social coordinati | Canva (`canva:*`) o Figma (`figma-*`) |
| Vedere il sito funzionare / screenshot | skill `run` (Chromium già installato) |
| Prima di salvare modifiche importanti | `simplify`, poi `code-review` |

## Flusso standard per ogni richiesta sul sito

1. Leggi questo file e i tre file in `src/`.
2. Carica le skill pertinenti dalla tabella (anche più di una).
3. Fai la modifica rispettando l'identità visiva sopra.
4. Avvia il sito, fai screenshot desktop e mobile (390px) e controlla che non ci siano errori in console.
5. `npm run build` deve passare.
6. Salva (commit) sul branch di lavoro e fai push. Niente pull request se non richiesta.
7. Rispondi all'utente in italiano semplice: cosa è cambiato, cosa vedrà, eventuali scelte che deve fare lui.
