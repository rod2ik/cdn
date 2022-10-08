/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
  // console.log("massilia-mermaid PAGE LOADED");

  // correct baseline alignment in mermaid graphs
  document.querySelectorAll("svg[id^='mermaid'] .messageText")
  .forEach( el => {
    el.setAttribute("dominant-baseline","top");
  });

  // apply theme updates to current theme
  fix_graph_flowchart();
  // resize_state_diagram();
  fix_pie();
  fix_git();
  update_theme();

  function get_var(variable) {
    let el = document.querySelector("[data-md-color-scheme]");
    return getComputedStyle(el).getPropertyValue(variable);
  }

  function update_theme() {
    // console.log("UPDATE THEME...");
    let color = get_var("--md-typeset-color");
    let stroke_color = get_var("--mermaid-lines-color");
    let bgcolor = get_var("--md-default-bg-color");
    // let stroke_width = get_var("--mermaid-box-stroke-width");
    document.querySelectorAll("svg[id^='mermaid-'] .aggregation:not(#classDiagram-aggregationStart), svg[id^='mermaid-'] .extension, svg[id^='mermaid-'] .composition, svg[id^='mermaid-'] .dependency")
    .forEach( el => {
      el.style.setProperty("fill", stroke_color,"important");
      el.style.setProperty("stroke", stroke_color,"important");
    });
    document.querySelectorAll("svg[id^='mermaid-'] #classDiagram-aggregationStart, svg[id^='mermaid-'] #classDiagram-aggregationEnd")
    .forEach( el => {
      el.style.setProperty("fill", bgcolor,"important");
      el.style.setProperty("stroke", stroke_color,"important");
    });
    document.querySelectorAll("svg[id^='mermaid-'] path:not(svg[id^='mermaid-'] .commit ~ path, svg[id^='mermaid-'] circle.face ~ g path)")
    .forEach( el => {
      el.style.setProperty("stroke", stroke_color,"important");
    });
    fix_gantt();
    fix_graph_flowchart(); // for the Database trick
  }

  function fix_graph_flowchart() {
    // console.log("FIX GRAPH : FLOWCHART");
    // Get width of the div child inside the foreignObject, otherwise section widths are cut 
    document.querySelectorAll("svg[id^='mermaid-'] .cluster .label foreignObject")
    .forEach( el => {
      let div = el.firstChild;
      let width = div.offsetWidth;
      el.style.setProperty("width", (parseInt(width))+"px", "important");
    });

    document.querySelectorAll("svg[id^='mermaid-'] .node path")
    .forEach( el => { // only because of database boxes in flowcharts
      // let stroke = get_var("--mermaid-box-border-color");
      // following line should work, but it doesn't..
      // el.style.setProperty("stroke", stroke, "important");
      // trick to lower down the specificity, 
      // and return to backward CSS rule (so won't be applied):
      el.style.setProperty("stroke", "blue");
    });
  }

  // function resize_state_diagram() {
  //   // console.log("RESIZE STATE DIAGRAM");
  //   document.querySelectorAll("svg[id^='mermaid-'].statediagram")
  //   .forEach( el => {
  //     let maxwidth = getComputedStyle(el).maxWidth;
  //     el.style.setProperty("max-width", (parseInt(maxwidth)*0.6)+"px", "important");
  //   });
  // }

  function fix_gantt() {
    // console.log("FIX GANTT");
    let box_text_color = get_var("--mermaid-box-text-color");
    document.querySelectorAll("svg[id^='mermaid-'] [class*='activeText'], svg[id^='mermaid-'] [class*='doneText'], svg[id^='mermaid-'] [class*='taskTextOutsideRight']")
    .forEach( el => {
      el.style.setProperty("fill", box_text_color, "important");
    });
    document.querySelectorAll("svg[id^='mermaid-'] text[class*='taskText']")
    .forEach( el => {
      el.setAttribute("dy", "3");
    });
  }
  
  function fix_pie() {
    // console.log("FIX PIE");
    let box_text_color = get_var("--mermaid-box-text-color");
    document.querySelectorAll("svg[id^='mermaid-'] [class*='activeText'], svg[id^='mermaid-'] [class*='doneText'], svg[id^='mermaid-'] [class*='taskTextOutsideRight']")
    .forEach( el => {
      el.style.setProperty("fill", box_text_color, "important");
    });
  }

  function fix_git() {
    // console.log("FIX GIT");
    document.querySelectorAll("svg[id^='mermaid-'] .commit foreignObject.node-label")
    .forEach( el => {
      let span = el.firstChild.firstChild;
      let width = span.offsetWidth;
      el.style.setProperty("width", (parseInt(width)+8)+"px", "important");
    });
  }

  const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type !== "attributes" &&
        mutation.attributeName !== "data-md-color-scheme"
      ) {
        return
      }
      // console.log('old:', mutation.oldValue);
      // console.log('new:', mutation.target.getAttribute("data-md-color-scheme"));
      update_theme();
    }
  };

  const observer = new MutationObserver(mutationCallback);

  let themeChange = document.querySelector("body");
  observer.observe(themeChange, { attributes: true });

})
