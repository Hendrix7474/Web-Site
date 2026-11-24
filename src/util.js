export const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const SPRING = { type: 'spring', bounce: 0.25, visualDuration: 0.45 };
export const SNAPPY = { type: 'spring', bounce: 0.4, visualDuration: 0.3 };
export const EASE = [0.2, 0.7, 0.2, 1];

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const list = (arr, fn) => arr.map(fn).join('');
export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
