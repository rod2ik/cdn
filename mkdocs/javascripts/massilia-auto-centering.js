/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    // console.log("Then THIS MKDOCS PAGE IS LOADED");

    /* ====================================================================== */
    /*                    Automatic Centering of Tables                       */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset table")
    .forEach( table => { // Table defined in Markdown notation
        if ((table.parentElement instanceof HTMLDivElement && table.parentElement.classList.contains("md-typeset__table")) 
        && (table.parentElement.parentElement instanceof HTMLDivElement && table.parentElement.parentElement.classList.contains("md-typeset__scrollwrap"))) {
            table.parentElement.parentElement.classList.add("center");
        } else { // HTML Table tag in Markdown
            table.classList.add("center");
        }
    });
    
    /* ====================================================================== */
    /*                    Automatic Centering of iFrames                      */
    /* ====================================================================== */
    document.querySelectorAll(".md-content iframe")
      .forEach( el => {
      el.classList.add("center");
    });
});