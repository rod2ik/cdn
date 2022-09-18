window.MathJax = {
  loader: {
    load: [ '[tex]/tagformat', '[tex]/mathtools', '[tex]/cancel', '[tex]/textmacros', '[tex]/bbox', '[tex]/physics' ]
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
    packages: {'[+]': ['tagformat', 'mathtools', 'cancel', 'textmacros', 'bbox', 'physics' ]},
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
      bold: ['{\\bf #1}',1]
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


