/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.MathJax = {
  loader: {
    load: [ '[tex]/tagformat', '[tex]/colortbl', '[tex]/extpfeil', '[tex]/mathtools', '[tex]/empheq', '[tex]/cases', '[tex]/cancel', '[tex]/textmacros', '[tex]/bbox', '[tex]/physics', '[tex]/unicode' ]
  },
  startup: {
    pageReady: () => {
      // alert('Running MathJax');
      return MathJax.startup.defaultPageReady();
    }
  },
  tex: {
    inlineMath: [['$', '$'], ["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    packages: {'[+]': ['tagformat', 'colortbl', 'extpfeil', 'mathtools', 'empheq', 'cases', 'cancel', 'textmacros', 'bbox', 'physics', 'unicode' ]},
    tags: 'ams',
    tagSide: 'right',
    macros: {
      // math-BlackboardBold
      m: ['{\\mathbb #1}',1],
      // mathsCal
      mc: ['{\\mathcal #1}',1],
      // Arrows
      imp: '{\\Rightarrow}',
      implique: '{\\Rightarrow}',
      iimp: '{\\Longrightarrow}',
      ssi: '{\\Leftrightarrow}',
      sssi: '{\\Longleftrightarrow}',
      // arcs
      arc: ['{\\overparen{#1}}', 1],
      wideparen: ['{\\overparen{#1}}', 1],
      RR: '{\\bf R}',
      euro: ['{\\unicode \{0x20AC\}}'],
      bold: ['{\\bf #1}',1],
      // colors list reference: https://www.w3schools.com/colors/colors_names.asp
      tcolor: ['{\\color\{#1\} #2}',2],
      redcolor: ['{\\color\{red\} #1}',1],
      bluecolor: ['{\\color\{blue\} #1}',1],
      greencolor: ['{\\color\{green\} #1}',1],
      purplecolor: ['{\\color\{purple\} #1}',1],
      blackcolor: ['{\\color\{black\} #1}',1],
      red: ['{\\color\{red\} #1}',1],
      blue: ['{\\color\{blue\} #1}',1],
      green: ['{\\color\{green\} #1}',1],
      purple: ['{\\color\{purple\} #1}',1],
      black: ['{\\color\{black\} #1}',1],
      symbover: ['{\\displaystyle \\stackrel{\\mathclap{\\mbox{ #2 }}}{ #1 }}',2],
      liminf: ['{\\displaystyle \\lim_\{#1\\to+\\infty\} #2}',2],
      limninf: ['{\\displaystyle \\lim_\{n\\to+\\infty\} #1}',1],
      limxinf: ['{\\displaystyle \\lim_\{x\\to+\\infty\} #1}',1],
      limxminf: ['{\\displaystyle \\lim_\{x\\to-\\infty\} #1}',1],
      limxa: ['{\\displaystyle \\lim_\{x\\to #1\} #2}',2],
      // \displaystyle \lim_{x\to+\infty} x^2=+\infty$
      redbox: ['{\\bbox[5px, border: 2px solid red]\{#1\}}',1],
      greenbox: ['{\\bbox[5px, border: 2px solid green]\{#1\}}',1],
      bluebox: ['{\\bbox[5px, border: 2px solid blue]\{#1\}}',1],
      purplebox: ['{\\bbox[5px, border: 2px solid purple]\{#1\}}',1],
      blackbox: ['{\\bbox[5px, border: 2px solid black]\{#1\}}',1],
      box: ['{\\bbox[5px, border: 2px solid #1] \{#2\}}', 2],
      enc: ['{\\bbox[5px, border: 2px solid #1] \{#2\}}', 2],
      simp: ['{\\cancel \{#1\}}', 1],
      coord: ['{\\begin\{pmatrix\} #1 \\\\ #2 \\\\ \\end\{pmatrix\}}', 2],
      Coord: ['{\\begin\{pmatrix\} #1 \\\\ #2 \\\\ if\(#3\)\{ #3 \\\\ \} else \{\} \\end\{pmatrix\}}', 3, ''],
      vertarrowbox: ['{\\begin\{array\}\{@\{\}c@\{\}\} #2 \\\\ \\left\\uparrow\\vcenter\{\\hrule height #1\}\\right.\\kern-\\nulldelimiterspace\\\\ \\makebox[0pt]\{\\scriptsize #3\} \\\\ \\end\{array\}}', 3, '6ex'],
      hey: ['{\\begin\{array\} \\\\ #1 & 2 \\\\ 3 & 4 \\\\ \\end\{array\}}', 1]
    },
    textmacros: {
      packages: {'[+]': ['bbox']}
    },
    // options: {
    //   ignoreHtmlClass: ".*|",
    //   processHtmlClass: "arithmatex"
    // },

    // svg: {
    //   fontCache: 'global'
    // },

    tagformat: {
       tag: (n) => '(' + n + ')'
    }
  }
};

// if, and only if, `theme: features: navigation.instant` (for SPA) is set in mkdocs.yml :
document$.subscribe(() => { 
  MathJax.startup.promise
    .then(() => MathJax.typesetPromise())
    .then(() => { /* other actions once MathJax is done */ })
})

