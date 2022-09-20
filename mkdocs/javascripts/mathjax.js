window.MathJax = {
  loader: {
    load: [ '[tex]/tagformat', '[tex]/colortbl', '[tex]/mathtools', '[tex]/empheq', '[tex]/cases', '[tex]/cancel', '[tex]/textmacros', '[tex]/bbox', '[tex]/physics' ]
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
    packages: {'[+]': ['tagformat', 'colortbl', 'mathtools', 'empheq', 'cases', 'cancel', 'textmacros', 'bbox', 'physics' ]},
    tags: 'ams',
    tagSide: 'right',
    macros: {
      mN: '{\\mathbb N}',
      mZ: '{\\mathbb Z}',
      mD: '{\\mathbb D}',
      mQ: '{\\mathbb Q}',
      mR: '{\\mathbb R}',
      mC: '{\\mathbb C}',
      imp: '{\\Rightarrow}',
      iimp: '{\\Longrightarrow}',
      ssi: '{\\Leftrightarrow}',
      sssi: '{\\Longleftrightarrow}',
      RR: '{\\bf R}',
      bold: ['{\\bf #1}',1],
      // colors list reference: https://www.w3schools.com/colors/colors_names.asp
      redbox: ['{\\bbox[5px, border: 2px solid red]\{#1\}}',1],
      greenbox: ['{\\bbox[5px, border: 2px solid green]\{#1\}}',1],
      bluebox: ['{\\bbox[5px, border: 2px solid blue]\{#1\}}',1],
      purplebox: ['{\\bbox[5px, border: 2px solid purple]\{#1\}}',1],
      blackbox: ['{\\bbox[5px, border: 2px solid black]\{#1\}}',1],
      box: ['{\\bbox[5px, border: 2px solid #1] \{#2\}}', 2]
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

