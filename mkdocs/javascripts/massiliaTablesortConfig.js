/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    // console.log("massilia-tablesort-config PAGE LOADED");

  document$.subscribe(function() {
    var tables = document.querySelectorAll("article table[class~='sort'], article table[class~='sortable'], article table[class~='tri'], article table[class~='trier'], article table[class~='triable']")
    // console.log("tables à trier", tables);
    tables.forEach(table => {
      Array.from(table.querySelectorAll("thead tr th")).forEach(th => {
        th.setAttribute("role", "columnheader");
      });
      new Tablesort(table);
    })
  })
})