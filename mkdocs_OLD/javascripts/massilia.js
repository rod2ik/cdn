/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

async function loadMassiliaModules() {
    // console.log("massilia-xtables PAGE LOADED");
    
    await import('./massiliaAdmonitions.js');
    await import('./massiliaImages.js');
    await import('./massiliaBadges.js');
    await import('./massiliaGraphviz.js');
    await import('./massiliaMermaid.js');
    await import('./massiliaAutoCentering.js');

    // XTABLES
    // await import('./massiliaXTables.js');
    await import('./massiliaXTablesClasses.js');
    await import('./massiliaXTablesStyles.js');
    await import('./massiliaXTablesColors.js');
    await import('./massiliaXTablesCellmerge.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/tablesort.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.number.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.date.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.dotsep.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.monthname.min.js');
    await import('https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.2.1/sorts/tablesort.filesize.min.js');
    await import('./massiliaTablesortConfig.js');
    
}

loadMassiliaModules();

