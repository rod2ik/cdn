window.MathJax = {
  loader: {
    load: ['[tex]/tagformat/tikz/tkz-tab']
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
    packages: {'[+]': ['tagformat', 'tikz', 'tkz-tab']},
    tagSide: 'left',
    macros: {
      RR: '{\\bf R}',
      bold: ['{\\bf #1}',1]
    },

    // options: {
    //   ignoreHtmlClass: ".*|",
    //   processHtmlClass: "arithmatex"
    // },

    // svg: {
    //   fontCache: 'global'
    // },

    tagformat: {
       tag: (n) => '[' + n + ']'
    }
  }
};


