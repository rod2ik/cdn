/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import htmlColors from './htmlColors.js';

let observerReady = false;
const color = htmlColors;
let RowsToBeColoured=[], ColsToBeColoured=[], CellsToBeColoured=[];
const rowAttrList=["line","ligne","linecolor","line-color","row","rowcolor","row-color"];
const colAttrList=["col","colcolor","col-color","column","colonne"];
const cellAttrList=["cell","celcolor","cellcolor","cel-color","cell-color"];
const noneColorList=["vide","void","none","transparent","aucun","aucune"];

function themeIsLight(){ return document.body.getAttribute('data-md-color-scheme')==='default'; }
function strip(s){ return s[0]==='\\' ? s.substring(1) : s; }
function hasAnyAttribIn(el, list){ for (const a of list){ if (el.hasAttribute(a)) return a; } return false; }

function isXCell(cell){ const t=(cell.innerHTML||'').trim(); return (t==='>'||t==='&gt;'||t==='^'||t==='&#94;\''||t===''); }
function getXTables(root){
  const arr=[]; root.querySelectorAll('.md-typeset table').forEach(t=>{
    if (Array.from(t.querySelectorAll('th')).some(isXCell) || Array.from(t.querySelectorAll('td')).some(isXCell)) arr.push(t);
  });
  return arr;
}

function getColorTables(root){
  const arr=[]; root.querySelectorAll('.md-typeset table').forEach(t=>{
    const has = Array.from(t.querySelectorAll('th')).some(th=>isColorXCell(th)) ||
                Array.from(t.querySelectorAll('td')).some(td=>isColorXCell(td));
    if (has) arr.push(t);
  }); return arr;
}
function isColorXCell(cell){
  return hasAnyAttribIn(cell,rowAttrList)||hasAnyAttribIn(cell,colAttrList)||hasAnyAttribIn(cell,cellAttrList)
      || cell.hasAttribute('linecolorattribute')||cell.hasAttribute('colcolorattribute')||cell.hasAttribute('cellcolorattribute');
}

function getSettedColor(el, list){
  const backgroundTheme = themeIsLight()?0:1;
  const attr = hasAnyAttribIn(el, list);
  if (!attr) return undefined;
  let v = el.getAttribute(attr);
  if (v.includes('@')){
    if (v[0]==='\\') v = strip(v);
    const k = v.substring(1);
    if (color[k]===undefined) return;
    return color[k][backgroundTheme];
  }
  return color[v]?.[backgroundTheme];
}
function getSettedTextColor(el, list){
  const theme = themeIsLight()?4:5;
  const attr = hasAnyAttribIn(el, list);
  if (!attr) return undefined;
  let v = el.getAttribute(attr);
  if (v.includes('@')){
    if (v[0]==='\\') v = strip(v);
    const k = v.substring(1);
    if (color[k]===undefined) return;
    return color[k][theme];
  }
  return color[v]?.[theme];
}

function colorRows(table, headBody0, Rows){
  for (const [i0] of Rows){
    const bg = getRowColor(i0, Rows);
    const tx = getRowTextColor(i0, Rows);
    Array.from(headBody0.children).forEach((row,i)=>{
      if (i!==i0) return;
      Array.from(row.children).forEach(()=>{
        row.style.backgroundColor = bg;
        row.style.color = tx;
        row.setAttribute('linecolorattribute', bg);
      });
    });
  }
}
function colorCols(table, headBody0, Cols){
  for (const [j0] of Cols){
    const bg = getColColor(j0, Cols);
    const tx = getColTextColor(j0, Cols);
    Array.from(headBody0.children).forEach(row=>{
      Array.from(row.children).forEach((col,j)=>{
        if (j!==j0) return;
        col.style.backgroundColor = bg;
        col.style.color = tx;
        col.setAttribute('colcolorattribute', bg);
      });
    });
  }
}
function colorCells(table, headBody0, Cells){
  for (const [i0,j0] of Cells){
    const bg = getCellColor(i0,j0,Cells);
    const tx = getCellTextColor(i0,j0,Cells);
    Array.from(headBody0.children).forEach((row,i)=>{
      Array.from(row.children).forEach((col,j)=>{
        if (i===i0 && j===j0){
          if (noneColorList.includes(bg)){ row.style.backgroundColor='transparent'; col.style.backgroundColor='transparent'; }
          col.style.backgroundColor = bg;
          col.style.color = tx;
          col.setAttribute('cellcolorattribute', bg);
        }
      });
    });
  }
}

function getRowColor(i, Rows){ const idx=themeIsLight()?0:1; for (const r of Rows){ if (r[0]===i) return r[1]?.[idx]; } }
function getRowTextColor(i, Rows){ const idx=themeIsLight()?4:5; for (const r of Rows){ if (r[0]===i) return r[1]?.[idx]; } }
function getColColor(j, Cols){ const idx=themeIsLight()?0:1; for (const c of Cols){ if (c[0]===j) return c[1]?.[idx]; } }
function getColTextColor(j, Cols){ const idx=themeIsLight()?4:5; for (const c of Cols){ if (c[0]===j) return c[1]?.[idx]; } }
function getCellColor(i,j,Cells){ const idx=themeIsLight()?0:1; for (const t of Cells){ if (t[0]===i && t[1]===j) return t[2]?.[idx]; } }
function getCellTextColor(i,j,Cells){ const idx=themeIsLight()?4:5; for (const t of Cells){ if (t[0]===i && t[1]===j) return t[2]?.[idx]; } }

function colorTables(root){
  const XTablesArray = getXTables(root);
  if (!XTablesArray) return;
  XTablesArray.forEach(table=>{
    Array.from(table.children).forEach(headBody=>{
      RowsToBeColoured=[]; ColsToBeColoured=[]; CellsToBeColoured=[];
      Array.from(headBody.children).forEach((row,i)=>{
        Array.from(row.children).forEach((col,j)=>{
          const rAttr = hasAnyAttribIn(col, rowAttrList);
          if (rAttr){
            let v = col.getAttribute(rAttr); const name = v;
            if (v.includes('@')){ if (v[0]==='\\') v=strip(v); v = color[v.substring(1)]; }
            else v = color[v];
            RowsToBeColoured.push([i, v]); row.setAttribute(rAttr, name);
          }
          const cAttr = hasAnyAttribIn(col, colAttrList);
          if (cAttr){
            let v = col.getAttribute(cAttr); const name=v;
            if (v.includes('@')){ if (v[0]==='\\') v=strip(v); v = color[v.substring(1)]; }
            else v = color[v];
            ColsToBeColoured.push([j, v, cAttr, name]); col.setAttribute(cAttr, name);
          }
          const cellAttr = hasAnyAttribIn(col, cellAttrList);
          if (cellAttr){
            let v = col.getAttribute(cellAttr);
            if (noneColorList.includes(v)){ v=["transparent","transparent","transparent","transparent","#000000","#ffffff"]; }
            else if (v.includes('@')){ if (v[0]==='\\') v=strip(v); v = color[v.substring(1)]; }
            else v = color[v];
            CellsToBeColoured.push([i,j,v]);
          }
        });
      });
      colorRows(table, headBody, RowsToBeColoured);
      colorCols(table, headBody, ColsToBeColoured);
      colorCells(table, headBody, CellsToBeColoured);
    });
  });
}

function update_colors(){
  const XTablesArray = getXTables(document);
  if (!XTablesArray) return;
  XTablesArray.forEach(table=>{
    Array.from(table.children).forEach(headBody=>{
      Array.from(headBody.children).forEach(row=>{
        if (hasAnyAttribIn(row, rowAttrList)){
          const bg = getSettedColor(row, rowAttrList);
          const tx = getSettedTextColor(row, rowAttrList);
          row.style.backgroundColor = bg; row.style.color = tx;
        }
        Array.from(row.children).forEach(col=>{
          if (hasAnyAttribIn(col, colAttrList)){
            const bg = getSettedColor(col, colAttrList);
            const tx = getSettedTextColor(col, colAttrList);
            col.style.backgroundColor = bg; col.style.color = tx;
          }
          if (hasAnyAttribIn(col, cellAttrList)){
            const bg = getSettedColor(col, cellAttrList);
            const tx = getSettedTextColor(col, cellAttrList);
            col.style.backgroundColor = bg; col.style.color = tx;
          }
        });
      });
    });
  });
}

export function init(root=document){
  console.log('[massilia-xtables-colors] init');
  colorTables(root);

  if (!observerReady){
    const obs = new MutationObserver(muts=>{
      for (const m of muts){
        if (m.type==='attributes' && m.attributeName==='data-md-color-scheme'){
          update_colors();
        }
      }
    });
    obs.observe(document.body, { attributes:true });
    observerReady = true;
  }
}

// keep default for backward compatibility
export default function update_colors_default(){ update_colors(); }
