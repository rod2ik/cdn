/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import htmlColors, { conf } from './htmlColors.js';
const color = htmlColors;

const LIGHT = 0, DARK = 1;
const BACKGROUND = 0, BORDER = 1, TEXT = 2;
const BACKGROUND_LIGHT = 0, BACKGROUND_DARK = 1;
const BORDER_LIGHT = 2, BORDER_DARK = 3;
const TEXT_LIGHT = 4, TEXT_DARK = 5;
const VALUE = 0;

let DEFAULT = 'gris';
let observerReady = false;

function setDefaultVoidBadgeColor(cfg){
  if (Object.keys(cfg.badges || {}).includes('default')) {
    DEFAULT = cfg.badges.default;
  }
}

function themeIsLight(){
  return document.body.getAttribute('data-md-color-scheme') === 'default';
}
function isDualColor(name){ return !!name && name !== 'style' && name.includes('-'); }

function getTheDynamicColorsArrayOf(badge){
  let dynamicBgColor = badge.getAttributeNames()[BACKGROUND];
  let staticBgColor = dynamicBgColor.substring(1);
  if (color[staticBgColor]) return color[staticBgColor].concat('');
  return ["","","","","","",""];
}
function setNewAttributes(newAttrList){
  const a1 = newAttrList[BACKGROUND_LIGHT]+"-"+newAttrList[BACKGROUND_DARK];
  const a2 = newAttrList[BORDER_LIGHT]+"-"+newAttrList[BORDER_DARK];
  const a3 = newAttrList[TEXT_LIGHT]+"-"+newAttrList[TEXT_DARK];
  return [a1,a2,a3];
}
function getBgColors(attrList){
  if (!attrList[BACKGROUND] || attrList[BACKGROUND]==='style') return;
  return color[attrList[BACKGROUND]] ? color[attrList[BACKGROUND]][VALUE] : attrList[BACKGROUND];
}
function getBorderColors(attrList){
  if (!attrList[BORDER] || attrList[BORDER]==='style') return;
  return color[attrList[BORDER]] ? color[attrList[BORDER]][VALUE] : attrList[BORDER];
}
function getTextColors(attrList){
  if (!attrList[TEXT] || attrList[TEXT]==='style') return;
  return color[attrList[TEXT]] ? color[attrList[TEXT]][VALUE] : attrList[TEXT];
}
function setBgColor(badge, names){
  if (!names || names==='style') return;
  let bg = isDualColor(names) ? (themeIsLight() ? names.split('-')[LIGHT] : names.split('-')[DARK]) : names;
  badge.style.backgroundColor = bg;
}
function setBorderColor(badge, names){
  if (!names || names==='style') return;
  let bc = isDualColor(names) ? (themeIsLight() ? names.split('-')[LIGHT] : names.split('-')[DARK]) : names;
  badge.style.borderBottom = `2px solid ${bc}`;
  badge.style.borderRight = `2px solid ${bc}`;
}
function setTextColor(badge, names){
  if (!names || names==='style') return;
  let tc = isDualColor(names) ? (themeIsLight() ? names.split('-')[LIGHT] : names.split('-')[DARK]) : names;
  badge.style.color = tc;
}

function setVoidBadges(badge, attrList){
  if (attrList.length !== 1) return;
  const bg = color[DEFAULT][BACKGROUND_LIGHT]+"-"+color[DEFAULT][BACKGROUND_DARK];
  const bd = color[DEFAULT][BORDER_LIGHT]+"-"+color[DEFAULT][BORDER_DARK];
  const tx = color[DEFAULT][TEXT_LIGHT]+"-"+color[DEFAULT][TEXT_DARK];
  setBgColor(badge, bg);
  setBorderColor(badge, bd);
  setTextColor(badge, tx);
  return [bg, bd, tx];
}

function hasDynamicColor(badge){
  const attrs = badge.getAttributeNames();
  return attrs.length && attrs[BACKGROUND] && attrs[BACKGROUND][0] === '@';
}

function update_badges(root=document){
  root.querySelectorAll(".md-typeset badge, .md-typeset bad, .md-typeset bd")
    .forEach(badge=>{
      if (badge.dataset.massiliaBadgeDone) return;

      let attrList = badge.getAttributeNames();
      if (!attrList.includes('style')) attrList.push('style');

      const maybeVoid = setVoidBadges(badge, attrList);
      if (hasDynamicColor(badge)) {
        const newAttrList = getTheDynamicColorsArrayOf(badge);
        attrList = setNewAttributes(newAttrList);
      }

      const bg = getBgColors(attrList); if (bg) setBgColor(badge, bg);
      const bd = getBorderColors(attrList); if (bd) setBorderColor(badge, bd);
      const tx = getTextColors(attrList); if (tx) setTextColor(badge, tx);

      badge.dataset.massiliaBadgeDone = '1';
    });
}

export function init(root=document){
  console.log('[massilia-badges] init');
  setDefaultVoidBadgeColor(conf || {});
  update_badges(root);

  // Theme change observer (register once)
  if (!observerReady){
    const obs = new MutationObserver(muts=>{
      for (const m of muts){
        if (m.type === 'attributes' && m.attributeName === 'data-md-color-scheme'){
          update_badges(document);
        }
      }
    });
    obs.observe(document.body, { attributes:true });
    observerReady = true;
  }
}
