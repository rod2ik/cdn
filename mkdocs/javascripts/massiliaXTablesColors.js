/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import htmlColors from './htmlColors.js';

var color = htmlColors;
let RowsToBeColoured = Array();
let ColsToBeColoured = Array();
let CellsToBeColoured = Array();
let rowAttrList = ["line", "linecolor", "line-color"];
let colAttrList = ["col", "colcolor", "col-color"];
let cellAttrList = ["cell", "celcolor", "cellcolor", "cel-color", "cell-color"];
let noneColorList = ["vide", "void", "none", "transparent", "aucun", "aucune"];

window.addEventListener('load', function() {
    // console.log("massilia-xtables-colors PAGE LOADED");
    colorTables();

    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type !== "attributes" &&
            mutation.attributeName !== "data-md-color-scheme"
          ) {
            return
          }
          update_colors();
        }
      };

    const observer = new MutationObserver(mutationCallback);
    let themeChange = document.querySelector("body");
    observer.observe(themeChange, { attributes: true });

}); // End of load page

    /* ====================================================================== */
    /*          Color Lines/Rows, Cols & Cells in Tables                      */
    /* ====================================================================== */
function colorTables() {
    const XTablesArray = getXTables();
    if (XTablesArray) {
        // Extend Table Cells
        Array.from(XTablesArray).forEach( table => {
            // console.log("NEW TABLE");
            Array.from(table.children).forEach( headBody => {
                RowsToBeColoured = Array();
                ColsToBeColoured = Array();
                CellsToBeColoured = Array();
                Array.from(headBody.children).forEach( (row, i) => {
                    Array.from(row.children).forEach( (col, j) => {
                        // Populate RowsToBeColoured Array
                        let attrInRowList = hasAnyAttribIn(col, rowAttrList);
                        if  (attrInRowList) { // row has one attribute in rowAttrList
                            let lineBgColor = col.getAttribute(attrInRowList);
                            if (lineBgColor.includes("@")) { // Dynamic Color
                                // console.log("@ DYNAMIC ROW DETECTED");
                                lineBgColor = color[lineBgColor.substring(1,lineBgColor.length)];
                                addRowWithColor(i, lineBgColor);
                            } else { // Static Color
                                // console.log("STATIC COLOR = "+lineBgColor);
                                lineBgColor = color[lineBgColor];
                                addRowWithColor(i, lineBgColor);
                            }
                        }
                        // Populate ColsToBeColoured Array
                        let attrInColList = hasAnyAttribIn(col, colAttrList);
                        if  (attrInColList) { // col has one attribute of colAttrList
                            let colBgColor = col.getAttribute(attrInColList);
                            if (colBgColor.includes("@")) { // Dynamic Color
                                // console.log("@ DYNAMIC COLUMN DETECTED");
                                colBgColor = color[colBgColor.substring(1,colBgColor.length)];
                                addColWithColor(j, colBgColor);
                            } else { // Static Color
                                // console.log("STATIC COLOR = "+lineBgColor);
                                colBgColor = color[colBgColor];
                                addColWithColor(j, colBgColor);
                            }
                        }
                        // Populate CellsToBeColoured Array
                        let attrInCellList = hasAnyAttribIn(col, cellAttrList);
                        if  (attrInCellList) { // col has one attribute of colAttrList
                            let cellBgColor = col.getAttribute(attrInCellList);
                            if (noneColorList.includes(cellBgColor)) {
                                cellBgColor = ["none", "none", "none", "none","#000000","#ffffff"];
                                addCellWithColor(i, j, cellBgColor);
                            } else if (cellBgColor.includes("@")) { // Dynamic Color
                                // console.log("@ DYNAMIC CELL DETECTED");
                                cellBgColor = color[cellBgColor.substring(1,cellBgColor.length)];
                                addCellWithColor(i, j, cellBgColor);
                            } else { // Static Color
                                // console.log("STATIC COLOR = "+lineBgColor);
                                cellBgColor = color[cellBgColor];
                                addCellWithColor(i, j, cellBgColor);
                            }
                        }
                    }); // forEach col
                }); // forEach row
                colorRows(table, headBody, RowsToBeColoured);
                colorCols(table, headBody, ColsToBeColoured);
                colorCells(table, headBody, CellsToBeColoured);
            }); // forEach headBody
        }); // forEach table
    } // if(XTablesArray)
}

function hasAnyAttribIn(row, rowAttrList) {
    for (const attr of rowAttrList) {
        if (row.hasAttribute(attr)) {
            return attr
        }
    }
    return false
}

function getRowColor(i, RowsToBeColoured) {
    for (const i0 in RowsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 0 : 1;
        if (RowsToBeColoured[i0][0] == i) {
            return RowsToBeColoured[i0][1][backgroundTheme]
        }
    }
    return false
}

function getColColor(j, ColsToBeColoured) {
    for (const j0 in ColsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 0 : 1;
        if (ColsToBeColoured[j0][0] == j) {
            return ColsToBeColoured[j0][1][backgroundTheme]
        }
    }
    return false
}

function getCellColor(i, j, CellsToBeColoured) {
    for (const j0 in CellsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 0 : 1;
        if ((CellsToBeColoured[j0][0] == i) && (CellsToBeColoured[j0][1] == j)) {
            return CellsToBeColoured[j0][2][backgroundTheme]
        }
    }
    return false
}

function colorRows(table, headBody0, RowsToBeColoured) {
    for (const index in RowsToBeColoured) {
        let i0 = RowsToBeColoured[index][0];
        let lineBgColor = getRowColor(i0, RowsToBeColoured);
        Array.from(table.children).forEach( headBody => {
            if (headBody.nodeName == "THEAD") { // headBody is a THeader
                headBody.style.backgroundColor = lineBgColor;
            }
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => {
                    if ((i == i0) && (headBody == headBody0)) {
                        row.style.backgroundColor = lineBgColor;
                        col.style.backgroundColor = lineBgColor;
                        row.setAttribute("linecolorattribute",lineBgColor);
                    }
                });
            });
        });
    }
}

function colorCols(table, headBody0, ColsToBeColoured) {
    for (const index in ColsToBeColoured) {
        let j0 = ColsToBeColoured[index][0];
        let colBgColor = getColColor(j0, ColsToBeColoured);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => { 
                    if ((j == j0) && (headBody == headBody0)) {
                        col.style.backgroundColor = colBgColor;
                        col.setAttribute("colcolorattribute",colBgColor);
                    }
                });
            });
        });
    }
}

function colorCells(table, headBody0, CellsToBeColoured) {
    for (const index in CellsToBeColoured) {
        let i0 = CellsToBeColoured[index][0];
        let j0 = CellsToBeColoured[index][1];
        let cellBgColor = getCellColor(i0, j0, CellsToBeColoured);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => { 
                    if ((i == i0) && (j == j0) && (headBody == headBody0)) {
                        if (noneColorList.includes(cellBgColor)) {
                            console.log("NONE DETECTED");
                            row.style.backgroundColor = "transparent";                            
                            col.style.backgroundColor = "transparent";                            
                        }
                        col.style.backgroundColor = cellBgColor;
                        col.setAttribute("cellcolorattribute",cellBgColor);
                    }
                });
            });
        });
    }
}

function addRowWithColor(i, lineBgColor) {
    if (RowsToBeColoured.filter(couple => (couple[0] == i) && (couple[1] == lineBgColor)).length == 0) {
        RowsToBeColoured.push([i,lineBgColor]);
    }
    return 
}

function addColWithColor(j, colBgColor) {
    if (ColsToBeColoured.filter(couple => (couple[0] == j) && (couple[1] == colBgColor)).length == 0) {
        ColsToBeColoured.push([j,colBgColor]);
    }
    return 
}

function addCellWithColor(i, j, cellBgColor) {
    if (CellsToBeColoured.filter(tuple => (tuple[0] == i) && (tuple[1] == j) && (tuple[2] == cellBgColor)).length == 0) {
        CellsToBeColoured.push([i,j,cellBgColor]);
    }
    return 
}

function getXTables() {
    const Xtables = []
    Array.from(document.querySelectorAll(".md-typeset table"))
    .forEach( table => {
        if (isXTable(table)) {
            Xtables.push(table);
        }
    });
    return Xtables;
}

function isXTable(table) {
    const tableHasXTh = Array.from(table.querySelectorAll("th")).filter( th => isXCell(th));
    const tableHasXTd = Array.from(table.querySelectorAll("td")).filter( td => isXCell(td));
    return (tableHasXTh || tableHasXTd)
    // return (tableHasXTh.length > 0 || tableHasXTd.length >0)
}

function isXCell(cell) {
    cell = cell.innerHTML.trim();
    return (cell === ">" || cell === "&gt;" || cell === "^" || cell === "&#94;'" || cell === "")
}

function themeIsLight() {
    return document.body.getAttribute("data-md-color-scheme") == "default"
}

function themeIsDark() {
    return document.body.getAttribute("data-md-color-scheme") != "default"
}

export default function update_colors() {
    // console.log("Update Colors ...");
    colorTables();
}

