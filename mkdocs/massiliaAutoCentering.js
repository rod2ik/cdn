/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

export function init(root=document){
  console.log('[massilia-auto-centering] init');

  // center some wrappers themselves
  root.querySelectorAll(".md-content *").forEach(el=>{
    if (el.dataset.massiliaCenteredSelf) return;
    if (el.tagName === 'FIGURE' || el.tagName === 'FIGCAPTION'){
      el.classList.add('center');
      el.dataset.massiliaCenteredSelf = '1';
    }
    Array.from(el.children).forEach(child=>{
      if (el.tagName==='ARTICLE' || el.tagName==='CENTER' || el.tagName==='MJX-CONTAINER') return;
      const t = child.tagName;
      if (t === 'svg' || t === 'FIGURE' || t === 'FIGCAPTION'){
        el.classList.add('center');
      }
    });
  });

  // tables
  root.querySelectorAll(".md-typeset table").forEach(table=>{
    if (table.dataset.massiliaCenteredTable) return;
    table.style.margin = 'auto';
    if ((table.parentElement instanceof HTMLDivElement && table.parentElement.classList.contains('md-typeset__table'))
      && (table.parentElement.parentElement instanceof HTMLDivElement && table.parentElement.parentElement.classList.contains('md-typeset__scrollwrap'))){
      table.parentElement.parentElement.classList.add('center');
    } else if (!table.classList.contains('highlighttable') || !table.parentElement.classList.contains('highlight')){
      table.classList.add('center');
    }
    table.dataset.massiliaCenteredTable = '1';
  });

  // iframes
  root.querySelectorAll(".md-content iframe:not([data-massilia-centered])").forEach(el=>{
    el.classList.add('center'); el.dataset.massiliaCentered = '1';
  });

  // videos
  root.querySelectorAll(".md-content video:not([data-massilia-centered])").forEach(el=>{
    el.classList.add('center'); el.dataset.massiliaCentered = '1';
  });
  root.querySelectorAll(".md-content div.video-js:not([data-massilia-centered])").forEach(el=>{
    el.classList.add('center'); el.dataset.massiliaCentered = '1';
  });
}
