/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

let observerReady = false;

function get_var(variable){
  const el = document.querySelector('[data-md-color-scheme]');
  return getComputedStyle(el).getPropertyValue(variable);
}

function fix_graph_flowchart(root){
  root.querySelectorAll("svg[id^='mermaid-'] .cluster .label foreignObject")
    .forEach(el=>{
      const div = el.firstChild;
      const width = div?.offsetWidth || 0;
      el.style.setProperty('width', parseInt(width)+'px', 'important');
    });

  root.querySelectorAll("svg[id^='mermaid-'] .node path")
    .forEach(el=>{
      // lower specificity trick
      el.style.setProperty('stroke', 'blue');
    });
}

function fix_gantt(root){
  const box_text_color = get_var('--mermaid-box-text-color');
  root.querySelectorAll("svg[id^='mermaid-'] [class*='activeText'], svg[id^='mermaid-'] [class*='doneText'], svg[id^='mermaid-'] [class*='taskTextOutsideRight']")
    .forEach(el=>{ el.style.setProperty('fill', box_text_color, 'important'); });
  root.querySelectorAll("svg[id^='mermaid-'] text[class*='taskText']")
    .forEach(el=>{ el.setAttribute('dy','3'); });
}

function fix_pie(root){
  const box_text_color = get_var('--mermaid-box-text-color');
  root.querySelectorAll("svg[id^='mermaid-'] [class*='activeText'], svg[id^='mermaid-'] [class*='doneText'], svg[id^='mermaid-'] [class*='taskTextOutsideRight']")
    .forEach(el=>{ el.style.setProperty('fill', box_text_color, 'important'); });
}

function fix_git(root){
  root.querySelectorAll("svg[id^='mermaid-'] .commit foreignObject.node-label")
    .forEach(el=>{
      const span = el.firstChild?.firstChild;
      const width = span?.offsetWidth || 0;
      el.style.setProperty('width', (parseInt(width)+8)+'px', 'important');
    });
}

function update_theme(root){
  const stroke_color = get_var('--mermaid-lines-color');
  const bgcolor = get_var('--md-default-bg-color');

  root.querySelectorAll("svg[id^='mermaid-'] .aggregation:not(#classDiagram-aggregationStart), svg[id^='mermaid-'] .extension, svg[id^='mermaid-'] .composition, svg[id^='mermaid-'] .dependency")
    .forEach(el=>{
      el.style.setProperty('fill', stroke_color, 'important');
      el.style.setProperty('stroke', stroke_color, 'important');
    });
  root.querySelectorAll("svg[id^='mermaid-'] #classDiagram-aggregationStart, svg[id^='mermaid-'] #classDiagram-aggregationEnd")
    .forEach(el=>{
      el.style.setProperty('fill', bgcolor, 'important');
      el.style.setProperty('stroke', stroke_color, 'important');
    });
  root.querySelectorAll("svg[id^='mermaid-'] path:not(svg[id^='mermaid-'] .commit ~ path, svg[id^='mermaid-'] circle.face ~ g path)")
    .forEach(el=>{
      el.style.setProperty('stroke', stroke_color, 'important');
    });

  fix_gantt(root);
  fix_graph_flowchart(root);
}

export function init(root=document){
  console.log('[massilia-mermaid] init');

  // baseline alignment tweak
  root.querySelectorAll("svg[id^='mermaid'] .messageText")
    .forEach(el=>{ el.setAttribute('dominant-baseline','top'); });

  fix_graph_flowchart(root);
  fix_pie(root);
  fix_git(root);
  update_theme(root);

  if (!observerReady){
    const obs = new MutationObserver(muts=>{
      for (const m of muts){
        if (m.type==='attributes' && m.attributeName==='data-md-color-scheme'){
          update_theme(document);
        }
      }
    });
    obs.observe(document.body, { attributes:true });
    observerReady = true;
  }
}
