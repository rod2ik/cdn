/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */
/* Orchestrator: runs on initial render and on every MkDocs Material navigation */

function log(...a){ console.log('[massilia]', ...a); }
function warn(...a){ console.warn('[massilia]', ...a); }

/** Load UMD scripts once (Tablesort + plugins) */
const loadedScripts = new Set();
function loadScript(src){
  return new Promise((resolve, reject)=>{
    if (loadedScripts.has(src)) return resolve();
    const tag = document.createElement('script');
    tag.src = src; tag.async = true; tag.defer = true;
    tag.dataset.massiliaSrc = src;
    tag.onload = ()=>{ loadedScripts.add(src); resolve(); };
    tag.onerror = ()=> reject(new Error('Failed '+src));
    document.head.appendChild(tag);
  });
}
let externalsOnce;
async function loadExternalsOnce(){
  if (!externalsOnce){
    externalsOnce = (async ()=>{
      try {
        const base = 'https://cdn.jsdelivr.net/npm/tablesort@5.2.1/dist';
        await loadScript(`${base}/tablesort.min.js`);
        await Promise.all([
          loadScript(`${base}/sorts/tablesort.number.min.js`),
          loadScript(`${base}/sorts/tablesort.date.min.js`),
          loadScript(`${base}/sorts/tablesort.dotsep.min.js`),
          loadScript(`${base}/sorts/tablesort.monthname.min.js`),
          loadScript(`${base}/sorts/tablesort.filesize.min.js`),
        ]);
        log('Tablesort loaded once');
      } catch(e){ warn('Tablesort failed to load (continuing):', e); }
    })();
  }
  return externalsOnce;
}

async function initDocument(){
  const root = document.querySelector('[data-md-component="content"]') || document;
  log('init for document');

  const [
    admonitions,
    images,
    badges,
    graphviz,
    mermaid,
    autoCenter,
    xtClasses,
    xtStyles,
    xtColors,
    xtCellmerge,
    tablesortConfig,
  ] = await Promise.all([
    import('./massiliaAdmonitions.js'),
    import('./massiliaImages.js'),
    import('./massiliaBadges.js'),
    import('./massiliaGraphviz.js'),
    import('./massiliaMermaid.js'),
    import('./massiliaAutoCentering.js'),
    import('./massiliaXTablesClasses.js'),
    import('./massiliaXTablesStyles.js'),
    import('./massiliaXTablesColors.js'),
    import('./massiliaXTablesCellmerge.js'),
    import('./massiliaTablesortConfig.js'),
  ]);

  await loadExternalsOnce();

  admonitions.init?.(root);
  images.init?.(root);
  badges.init?.(root);
  graphviz.init?.(root);
  mermaid.init?.(root);
  autoCenter.init?.(root);
  xtClasses.init?.(root);
  xtStyles.init?.(root);
  xtColors.init?.(root);
  xtCellmerge.init?.(root);
  tablesortConfig.init?.(root);

  log('document init done');
}

// MkDocs Material SPA hook
if (window.document$?.subscribe){
  window.document$.subscribe(initDocument);
}else{
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocument, { once:true });
  } else {
    initDocument();
  }
}
