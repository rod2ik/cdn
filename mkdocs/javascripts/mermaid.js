window.addEventListener('load', function() {

  // correct baseline alignment in mermaid graphs
  document.querySelectorAll("svg[id^='mermaid'] .messageText")
  .forEach( el => {
    el.setAttribute("dominant-baseline","top");
  });

  // apply theme updates to current theme
  fix_graph_flowchart();
  resize_state_diagram();
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
    document.querySelectorAll("[id^='mermaid-'] .aggregation:not(#classDiagram-aggregationStart), [id^='mermaid-'] .extension, [id^='mermaid-'] .composition, [id^='mermaid-'] .dependency")
    .forEach( el => {
      el.style.setProperty("fill", stroke_color,"important");
      el.style.setProperty("stroke", stroke_color,"important");
    });
    document.querySelectorAll("[id^='mermaid-'] #classDiagram-aggregationStart, [id^='mermaid-'] #classDiagram-aggregationEnd")
    .forEach( el => {
      el.style.setProperty("fill", bgcolor,"important");
      el.style.setProperty("stroke", stroke_color,"important");
    });
    document.querySelectorAll("[id^='mermaid-'] path:not([id^='mermaid-'] .commit ~ path, [id^='mermaid-'] circle.face ~ g path)")
    .forEach( el => {
      el.style.setProperty("stroke", stroke_color,"important");
    });
    fix_gantt();
  }

  function fix_graph_flowchart() {
    // console.log("FIX GRAPH : FLOWCHART");
    // Get width of the div child inside the foreignObject, otherwise section widths are cut 
    document.querySelectorAll("[id^='mermaid-'] .cluster .label foreignObject")
    .forEach( el => {
      let div = el.firstChild;
      let width = div.offsetWidth;
      el.style.setProperty("width", (parseInt(width))+"px", "important");
    });
  }

  function resize_state_diagram() {
    // console.log("RESIZE STATE DIAGRAM");
    document.querySelectorAll("[id^='mermaid-'].statediagram")
    .forEach( el => {
      let maxwidth = getComputedStyle(el).maxWidth;
      el.style.setProperty("max-width", (parseInt(maxwidth)*0.6)+"px", "important");
    });
  }

  function fix_gantt() {
    // console.log("FIX GANTT");
    let box_text_color = get_var("--mermaid-box-text-color");
    document.querySelectorAll("[id^='mermaid-'] [class*='activeText'], [id^='mermaid-'] [class*='doneText'], [id^='mermaid-'] [class*='taskTextOutsideRight']")
    .forEach( el => {
      el.style.setProperty("fill", box_text_color, "important");
    });
    document.querySelectorAll("[id^='mermaid-'] text[class*='taskText']")
    .forEach( el => {
      el.setAttribute("dy", "3");
    });
  }
  
  function fix_pie() {
    // console.log("FIX PIE");
    let box_text_color = get_var("--mermaid-box-text-color");
    document.querySelectorAll("[id^='mermaid-'] [class*='activeText'], [id^='mermaid-'] [class*='doneText'], [id^='mermaid-'] [class*='taskTextOutsideRight']")
    .forEach( el => {
      el.style.setProperty("fill", box_text_color, "important");
    });
  }

  function fix_git() {
    // console.log("FIX GIT");
    document.querySelectorAll("[id^='mermaid-'] .commit foreignObject.node-label")
    .forEach( el => {
      let span = el.firstChild.firstChild;
      let width = span.offsetWidth;
      el.style.setProperty("width", (parseInt(width)+8)+"px", "important");
    });
  }

  const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type !== "attributes" ||
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



