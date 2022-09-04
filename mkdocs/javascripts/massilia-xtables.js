async function loadExtendedTables() {
    await import('./massilia-xtables-classes.js');
    await import('./massilia-xtables-cellmerge.js');
    await import('https://cdn.jsdelivr.net/gh/tristen/tablesort@master/src/tablesort.js');
    await import('./tablesort_config.js');
  }
loadExtendedTables();
