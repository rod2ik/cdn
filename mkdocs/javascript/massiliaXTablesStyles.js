/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import xTableStyles from './xTableStyles.js';

let observerReady = false;
const style = xTableStyles;
let RowsToBeStyled=[], ColsToBeStyled=[], CellsToBeStyled=[];
const rowStyleAttrList=["lstyle","linestyle","line-style","rstyle","rowstyle","row-style","styleligne"];
const colStyleAttrList=["cstyle","colstyle","col-style","columnstyle","column-style","stylecol"];
const cellStyleAttrList=["celstyle","cellstyle","cel-style","cell-style"];
const tableStyleAttrList=["tabstyle","tablestyle","globalstyle","tab-style","table-style","global-style"];

function themeIsLight(){ return document.body.getAttribute('data-md-color-scheme')==='default'; }

function hasAnyAttribIn(el, list){ for (const a of list){ if (el.hasAttribute(a)) return a; } return false; }

function getCssStyleFrom(styleName){
  let s=''; const theme = themeIsLight() ? 'light' : 'dark';
  const obj = style[styleName]?.[theme];
  if (!obj) return;
  for (const k of Object.keys(obj)){ s += `${k}: ${obj[k]}; `; }
  return s;
}

function setRowStyletoCols(row, attr, name, css){
  for (const col of row.children){ col.setAttribute(attr, name); col.setAttribute('style', css); }
}

function addColWithColor(col, j, attr, css, name){
  if (ColsToBeStyled.find(c=>c[0]===j && c[1]===css)) return;
  ColsToBeStyled.push([j, css, attr, name]);
  col.setAttribute(attr, name);
}
function addCellWithColor(i,j,attr,css,name){
  if (CellsToBeStyled.find(t=>t[0]===i&&t[1]===j&&t[2]===css)) return;
  CellsToBeStyled.push([i,j,css,attr,name]);
}

function getXTables(root){
  const arr=[];
  root.querySelectorAll("table").forEach(table=>{
    const hasXTh = Array.from(table.querySelectorAll('th')).some(th=>isXCell(th));
    const hasXTd = Array.from(table.querySelectorAll('td')).some(td=>isXCell(td));
    if (hasXTh || hasXTd) arr.push(table);
  });
  return arr;
}
function isXCell(cell){
  const s = (cell.innerHTML||'').trim();
  return (s==='>' || s==='&gt;' || s==='^' || s==='&#94;\'' || s==='');
}

function styleTablesGlobally(root){
  getXTables(root).forEach(table=>{
    const name = hasAnyAttribIn(table, tableStyleAttrList);
    if (!name) return;
    const val = table.getAttribute(name);
    const css = getCssStyleFrom(val);
    Array.from(table.children).forEach(headBody=>{
      headBody.setAttribute('linestyle', val);
      headBody.setAttribute('style', css);
      Array.from(headBody.children).forEach(row=>{
        row.setAttribute('linestyle', val);
        row.setAttribute('style', css);
      });
    });
  });
}

function styleTables(root){
  getXTables(root).forEach(table=>{
    Array.from(table.children).forEach(headBody=>{
      RowsToBeStyled=[]; ColsToBeStyled=[]; CellsToBeStyled=[];
      Array.from(headBody.children).forEach((row,i)=>{
        Array.from(row.children).forEach((col,j)=>{
          const rAttr = hasAnyAttribIn(col, rowStyleAttrList);
          if (rAttr){
            let name = col.getAttribute(rAttr);
            let css = getCssStyleFrom(name);
            row.setAttribute('style', css);
            row.setAttribute(rAttr, name);
            setRowStyletoCols(row, rAttr, name, css);
          }
          const cAttr = hasAnyAttribIn(col, colStyleAttrList);
          if (cAttr){
            let name = col.getAttribute(cAttr);
            let css = getCssStyleFrom(name);
            col.setAttribute('style', css);
            col.setAttribute(cAttr, name);
            addColWithColor(col, j, cAttr, css, name);
          }
          const cellAttr = hasAnyAttribIn(col, cellStyleAttrList);
          if (cellAttr){
            let name = col.getAttribute(cellAttr);
            let css = getCssStyleFrom(name);
            col.setAttribute('style', css);
            col.setAttribute(cellAttr, name);
            addCellWithColor(i, j, cellAttr, css, name);
          }
        });
      });
      // apply col/cell styles
      ColsToBeStyled.forEach(([j0, css, attr, name])=>{
        Array.from(headBody.children).forEach((row)=>{
          Array.from(row.children).forEach((col,j)=>{
            if (j===j0){ col.setAttribute('style', css); col.setAttribute('colstyleattribute', css); col.setAttribute(attr, name); }
          });
        });
      });
      CellsToBeStyled.forEach(([i0,j0,css])=>{
        Array.from(headBody.children).forEach((row,i)=>{
          Array.from(row.children).forEach((col,j)=>{
            if (i===i0 && j===j0){ col.setAttribute('style', css); col.setAttribute('cellstyleattribute', css); }
          });
        });
      });
    });
  });
}

function update_styles(){
  styleTablesGlobally(document);
  getXTables(document).forEach(table=>{
    Array.from(table.children).forEach(headBody=>{
      Array.from(headBody.children).forEach((row)=>{
        const rAttr = hasAnyAttribIn(row, rowStyleAttrList);
        if (rAttr){
          const name = row.getAttribute(rAttr);
          const css = getCssStyleFrom(name);
          row.setAttribute('style', css);
          setRowStyletoCols(row, rAttr, name, css);
        }
        Array.from(row.children).forEach((col)=>{
          const cAttr = hasAnyAttribIn(col, colStyleAttrList);
          if (cAttr){
            const name = col.getAttribute(cAttr);
            const css = getCssStyleFrom(name);
            col.setAttribute('style', css);
          }
          const cellAttr = hasAnyAttribIn(col, cellStyleAttrList);
          if (cellAttr){
            const name = col.getAttribute(cellAttr);
            const css = getCssStyleFrom(name);
            col.setAttribute('style', css);
          }
        });
      });
    });
  });
}

export function init(root=document){
  console.log('[massilia-xtables-styles] init');
  styleTablesGlobally(root);
  styleTables(root);

  if (!observerReady){
    const obs = new MutationObserver(muts=>{
      for (const m of muts){
        if (m.type==='attributes' && m.attributeName==='data-md-color-scheme'){
          update_styles();
        }
      }
    });
    obs.observe(document.body, { attributes:true });
    observerReady = true;
  }
}

// (keep the old default for backwards compatibility)
export default function update_styles_default(){ update_styles(); }
