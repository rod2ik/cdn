/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function () {
  // console.log("massilia-auto-centering PAGE LOADED");

  document.querySelectorAll(".md-content *")
    .forEach(el => {
      // Add 'center' class to element 'el' itself
      if (el.tagName == "FIGURE" ||
        el.tagName == "FIGCAPTION"
      ) {
        el.classList.add("center");
      }
      // Add 'center' class to parent element 'el'
      Array.from(el.children).forEach(child => {
        if (el.tagName != "ARTICLE" && el.tagName != "CENTER" &&
          el.tagName != "MJX-CONTAINER" &&
          (child.tagName == "svg" || // ne pas mettre en majuscules
            child.tagName == "FIGURE" ||
            child.tagName == "FIGCAPTION")
        ) {
          el.classList.add("center");
        }
      })
    });

  /* ====================================================================== */
  /*                    Automatic Centering of Tables                       */
  /* ====================================================================== */
  document.querySelectorAll(".md-typeset table")
    .forEach(table => { // Table defined in Markdown notation
      table.style.margin = "auto";
      if ((table.parentElement instanceof HTMLDivElement && table.parentElement.classList.contains("md-typeset__table"))
        && (table.parentElement.parentElement instanceof HTMLDivElement && table.parentElement.parentElement.classList.contains("md-typeset__scrollwrap"))) {
        table.parentElement.parentElement.classList.add("center");
      } else if (!table.classList.contains("highlighttable") || !table.parentElement.classList.contains("highlight")) { // HTML Table tag in Markdown, but not code tables
        table.classList.add("center");
      }
    });

  /* ====================================================================== */
  /*                    Automatic Centering of iFrames                      */
  /* ====================================================================== */
  document.querySelectorAll(".md-content iframe")
    .forEach(el => {
      el.classList.add("center");
    });
  /* ====================================================================== */
  /*                    Automatic Centering of videos                       */
  /* ====================================================================== */
  // Any video tag
  document.querySelectorAll(".md-content video")
    .forEach(el => {
      el.classList.add("center");
    });
  // Videos of the video-js library
  document.querySelectorAll(".md-content div.video-js")
    .forEach(el => {
      el.classList.add("center");
    });
});