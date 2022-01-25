window.addEventListener('load', function() {
  console.log("MKDOCS GRAPHVIZ.JS LOADED");
  
  var span = document.querySelector("[class='graphviz-light-dark']:first-of-type");
  var dataLibraryDefault = span.getAttribute("data-library-default");
  var dataDefault = span.getAttribute("data-default");
  var dataLight = span.getAttribute("data-light");
  if ((dataLight == '#0')) {
    dataLight="#000000";
  }
  var dataDark = span.getAttribute("data-dark");
  console.log("dataLibraryDefault="+dataLibraryDefault);
  console.log("dataDefault="+dataDefault);
  console.log("dataLight="+dataLight);
  console.log("dataDark="+dataDark);

  tag_default();
  update_theme();

  function tag_default() {
    console.log("TAG DEFAULTS");
    console.log("TAG : NOT EQUAL");
    if (dataDefault == dataLibraryDefault) { // if 'color' option has not been set in 'mkdocs.yml'
      document.querySelectorAll("svg.graphviz *[stroke*='"+dataDefault+"' i]")
      .forEach( el => {
        el.classList.add("stroke-default");
      });
      document.querySelectorAll("svg.graphviz *[fill*='"+dataDefault+"' i]")
      .forEach( el => {
        el.classList.add("fill-default");
      });
    }
  }

  function update_theme() {
    console.log("UPDATE THEME...");
    let theme = document.querySelector("body").getAttribute("data-md-color-scheme");
    console.log("UPDATE : NOT EQUAL");
    if (dataDefault == dataLibraryDefault) { // if 'color' option has not been set in 'mkdocs.yml'
      document.querySelectorAll("svg.graphviz *[class*='stroke-default']")
      .forEach( el => {
        if (theme == "default") {
          el.style.setProperty("stroke", ''+dataLight,"important");
        } else {
          el.style.setProperty("stroke", dataDark,"important");
        }
      });

      document.querySelectorAll("svg.graphviz *[class*='fill-default']")
      .forEach( el => {
        if (theme == "default") {
          el.style.setProperty("fill", ''+dataLight,"important");
        } else {
          el.style.setProperty("fill", dataDark,"important");
        }
      });
    }
  // other_function_to_update();
  }

  const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type !== "attributes" ||
        mutation.attributeName !== "data-md-color-scheme"
      ) {
        return
      }
      update_theme();
    }
  };

  const observer = new MutationObserver(mutationCallback);

  let themeChange = document.querySelector("body");
  observer.observe(themeChange, { attributes: true });

})