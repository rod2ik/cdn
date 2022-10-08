/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

async function loadExtendedTables() {
    // console.log("massilia-xtables-maths PAGE LOADED");
    
    await import('./massilia-xtables-classes.js');
    await import('./massilia-xtables-cellmerge.js');
    await import('https://cdn.jsdelivr.net/gh/tristen/tablesort@master/src/tablesort.js');
    // await import('./tablesort.js');
    await import('./massilia-tablesort-config.js');
  }
loadExtendedTables();
