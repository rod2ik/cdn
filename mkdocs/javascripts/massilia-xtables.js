/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

async function loadExtendedTables() {
    // console.log("massilia-xtables-maths PAGE LOADED");
    
    await import('./massilia-xtables-classes.js');
    await import('./massilia-xtables-cellmerge.js');
    // await import('https://cdn.jsdelivr.net/gh/tristen/tablesort@master/src/tablesort.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/tablesort.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.number.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.date.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.dotsep.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.monthname.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.filesize.min.js');
    // await import('./tablesort.js');
    await import('./massilia-tablesort-config.js');
  }
loadExtendedTables();
