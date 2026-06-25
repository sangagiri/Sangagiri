// ============================================================
//  js/app.js — Main entry point
//  Imports and initialises all feature modules
// ============================================================
import { initLang }      from './modules/lang.js';
import { initNav }       from './modules/nav.js';
import { initTemples }   from './modules/temples.js';
import { initBusiness }  from './modules/business.js';
import { initTextiles, initTourism, initNews, initGovt, initEmergency } from './modules/sections.js';

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNav();
  initTemples();
  initBusiness();
  initTextiles();
  initTourism();
  initNews();
  initGovt();
  initEmergency();
});
