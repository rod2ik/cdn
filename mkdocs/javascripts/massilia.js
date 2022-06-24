/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import('./massilia-admonitions.js');
import('./massilia-graphviz.js');
import('./massilia-mermaid.js');

// Automatic Centering of Tables (parent Element must have class .center)
window.addEventListener('load', function() {
    // console.log("THIS MKDOCS PAGE IS LOADED");
    document.querySelectorAll(".md-typeset table")
      .forEach( el => {
      el.parentNode.classList.add("center");
    });
  });
  
// Automatic Centering of iFrames (The Element must have class .center)
window.addEventListener('load', function() {
  // console.log("THIS MKDOCS PAGE IS LOADED");
  document.querySelectorAll(".md-content iframe")
    .forEach( el => {
    el.classList.add("center");
  });
});