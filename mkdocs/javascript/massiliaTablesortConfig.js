/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

// Initializes Tablesort on marked tables within current root. Safe if Tablesort is missing.
export function init(root=document){
  console.log('[massilia-tablesort-config] init');

  const hasTs = typeof window.Tablesort === 'function';
  if (!hasTs){
    console.warn('[massilia-tablesort-config] Tablesort not present; skipping');
    return;
  }

  const tables = root.querySelectorAll(
    "article table.sort, article table.sortable, article table.tri, article table.trier, article table.triable"
  );
  tables.forEach(table=>{
    if (table.dataset.massiliaSorted) return;
    Array.from(table.querySelectorAll('thead tr th')).forEach(th=>{
      th.setAttribute('role','columnheader');
    });
    try{
      new window.Tablesort(table);
      table.dataset.massiliaSorted='1';
    }catch(e){
      console.warn('[massilia-tablesort-config] failed:', e);
    }
  });
}
