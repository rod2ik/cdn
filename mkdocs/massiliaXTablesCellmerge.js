/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

function getXTables(root){
  const arr=[]; root.querySelectorAll('.md-typeset table:not([data-massilia-merged])').forEach(table=>{
    const hasXTh = Array.from(table.querySelectorAll('th')).some(isXCell);
    const hasXTd = Array.from(table.querySelectorAll('td')).some(isXCell);
    if (hasXTh || hasXTd) arr.push(table);
  }); return arr;
}
function isXCell(cell){
  const t=(cell.innerHTML||'').trim();
  return (t==='>' || t==='&gt;' || t==='^' || t==='&#94;\'' || t==='');
}
function getPrev(col0){
  const sib = col0.parentNode.children;
  for (let i=0; i<sib.length; i++){ if (sib[i+1]===col0) return sib[i]; }
}
function getNext(col0){
  const sib = col0.parentNode.children;
  for (let i=0; i<sib.length; i++){ if (sib[i-1]===col0) return sib[i]; }
}

export function init(root=document){
  console.log('[massilia-xtables-cellmerge] init');

  const XTablesArray = getXTables(root);
  XTablesArray.forEach(table=>{
    const rowspans=[], colspans=[], colspans2=[];
    let prevRow=null;

    Array.from(table.children).forEach(headBody=>{
      Array.from(headBody.children).forEach((row)=>{
        Array.from(row.children).forEach((col,j)=>{
          const text = (col.innerHTML||'').trim();
          if ((text==='^'||text==='&#94;') && prevRow){
            const prev = prevRow.children[j];
            if (prev) rowspans.push([prev, col]);
          } else if (text==='>'||text==='&gt;'){
            const next = getNext(col);
            if (next) colspans.push([col, next]);
          }
        });
        prevRow = row;
      });
    });

    for (let i=rowspans.length-1; i>=0; i--){
      const [prev, col] = rowspans[i];
      const rowspan = (parseInt(prev.getAttribute('rowspan'),10)||1) + (parseInt(col.getAttribute('rowspan'),10)||1);
      prev.setAttribute('rowspan', rowspan);
      prev.style.verticalAlign='middle';
      col.remove();
    }
    for (let i=0; i<colspans.length; i++){
      const [prev, col] = colspans[i];
      const colspan = (parseInt(prev.getAttribute('colspan'),10)||1) + (parseInt(col.getAttribute('colspan'),10)||1);
      col.setAttribute('colspan', colspan);
      col.style.verticalAlign='middle';
      prev.remove();
    }
    for (let i=colspans2.length-1; i>=0; i--){
      const [prev, col] = colspans2[i];
      const colspan = (parseInt(prev.getAttribute('colspan'),10)||1) + (parseInt(col.getAttribute('colspan'),10)||1);
      prev.setAttribute('colspan', colspan);
      prev.style.verticalAlign='middle';
      col.remove();
    }

    table.dataset.massiliaMerged = '1';
  });
}
