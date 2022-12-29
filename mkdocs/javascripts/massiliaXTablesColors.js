/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import htmlColors from './htmlColors.js';

var color = htmlColors;
let RowsToBeColoured = Array();
let ColsToBeColoured = Array();
let CellsToBeColoured = Array();
let rowAttrList = ["line", "ligne", "linecolor", "line-color", "row", "rowcolor", "row-color"];
// let rowStyleAttrList = ["lstyle"];
let colAttrList = ["col", "colcolor", "col-color", "column", "colonne"];
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
        Array.from(XTablesArray).forEach( table => {
            Array.from(table.children).forEach( headBody => {
                RowsToBeColoured = Array();
                ColsToBeColoured = Array();
                CellsToBeColoured = Array();
                Array.from(headBody.children).forEach( (row, i) => {
                    // row.setAttribute("style","font-family: inconsolata;color:red;");
                    Array.from(row.children).forEach( (col, j) => {
                        // let attrInRowList = hasAnyAttribIn(col, rowAttrList);
                        // if (attrInRowList) {
                        //     let lineBgColor = getSettedColor(col, rowAttrList);
                        //     let lineBgColorName = row.getAttribute(attrInRowList);
                        //     console.log("attrInRowList ="+attrInRowList);
                        //     console.log("lineBgColor ="+lineBgColor);
                        //     console.log("lineBgColorName ="+lineBgColorName);
                        //     // row.style.backgroundColor = lineBgColor;
                        //     addRowWithColor(row, i, attrInRowList, lineBgColor, lineBgColorName);
                        // }

                        // let attrInColList = hasAnyAttribIn(col, colAttrList);
                        // if (attrInColList) {
                        //     let colBgColor = getSettedColor(col, colAttrList);
                        //     let colBgColorName = attrInColList;
                        //     addColWithColor(col, j, attrInColList, colBgColor, colBgColorName);
                        // }

                        // let attrInCellList = hasAnyAttribIn(col, cellAttrList);
                        // if (attrInCellList) {
                        //     let cellBgColor = getSettedColor(col, cellAttrList);
                        //     // let cellBgColorName = cellBgColor;
                        //     // addColWithColor(col, j, attrInColList, colBgColor, colBgColorName);
                        //     addCellWithColor(i, j, cellBgColor);
                        // }

                        // Populate RowsToBeColoured Array
                        let attrInRowList = hasAnyAttribIn(col, rowAttrList);
                        // remove property to col
                        if  (attrInRowList) { // row has one attribute in rowAttrList
                            let lineBgColor = col.getAttribute(attrInRowList);
                            let lineBgColorName = lineBgColor;
                            if (lineBgColor.includes("@")) { // Dynamic Color
                                // console.log("@ DYNAMIC ROW DETECTED");
                                if (lineBgColor[0] == "\\") { // strip all left backslashes, if any
                                    lineBgColor = strip(lineBgColor);
                                }
                                    lineBgColor = color[lineBgColor.substring(1,lineBgColor.length)];
                                    addRowWithColor(row, i, attrInRowList, lineBgColor, lineBgColorName);
                                } else { // Static Color
                                    // console.log("STATIC COLOR = "+lineBgColor);
                                lineBgColor = color[lineBgColor];
                                addRowWithColor(row, i, attrInRowList, lineBgColor, lineBgColorName);
                            }
                        }

                        // Populate ColsToBeColoured Array
                        let attrInColList = hasAnyAttribIn(col, colAttrList);
                        if  (attrInColList) { // col has one attribute of colAttrList
                            let colBgColor = col.getAttribute(attrInColList);
                            let colBgColorName = colBgColor;
                            if (colBgColor.includes("@")) { // Dynamic Color
                                // console.log("@ DYNAMIC COLUMN DETECTED");
                                if (colBgColor[0] == "\\") { // strip all left backslashes, if any
                                    colBgColor = strip(colBgColor);
                                }
                                colBgColor = color[colBgColor.substring(1,colBgColor.length)];
                                addColWithColor(col, j, attrInColList, colBgColor, colBgColorName);
                            } else { // Static Color
                                // console.log("STATIC COLOR = "+lineBgColor);
                                colBgColor = color[colBgColor];
                                addColWithColor(col, j, attrInColList, colBgColor, colBgColorName);
                            }
                        }

                        // Populate CellsToBeColoured Array
                        let attrInCellList = hasAnyAttribIn(col, cellAttrList);
                        if  (attrInCellList) { // col has one attribute of colAttrList
                            let cellBgColor = col.getAttribute(attrInCellList);
                            // let cellBgColorName = cellBgColor;
                            if (noneColorList.includes(cellBgColor)) {
                                // cellBgColor = ["none", "none", "none", "none","#000000","#ffffff"];
                                cellBgColor = ["transparent", "transparent", "transparent", "transparent","#000000","#ffffff"];
                                addCellWithColor(i, j, cellBgColor);
                            } else if (cellBgColor.includes("@")) { // Dynamic Color
                                // console.log("@ DYNAMIC CELL DETECTED");
                                if (cellBgColor[0] == "\\") { // strip all left backslashes, if any
                                    cellBgColor = strip(cellBgColor);
                                }
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
                // setColsColorLabels(table, headBody,ColsToBeColoured);
                colorCells(table, headBody, CellsToBeColoured);
            }); // forEach headBody
        }); // forEach table
    } // if(XTablesArray)
}

function strip(s) { // strip all left \ backslashes 
    if (s[0] !== "\\") {
        return s
    } else {
        return s.substring(1,s.length)
    }
}

function hasAnyAttribIn(row, rowAttrList) {
    for (const attr of rowAttrList) {
        if (row.hasAttribute(attr)) {
            return attr
        }
    }
    return false
}

// function hasAnyStandardAttrib(el) {
//     for (const attr of rowAttrList) {
//         if (el.hasAttribute(attr)) {
//             return attr
//         }
//     }
//     return false
// }

function getRowTextColor(i, RowsToBeColoured) {
    for (const i0 in RowsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 4 : 5;
        if (RowsToBeColoured[i0][0] == i) {
            if (RowsToBeColoured[i0][1] !== undefined ) { // color found in htmlColors.js
                return RowsToBeColoured[i0][1][backgroundTheme]
            } else { // otherwise, just return without any breaking code errors
                return
            }
        }
    }
    return false
}

function getColTextColor(j, ColsToBeColoured) {
    for (const j0 in ColsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 4 : 5;
        if (ColsToBeColoured[j0][0] == j) {
            if (ColsToBeColoured[j0][1] !== undefined) { // color found in htmlColors.js
                return ColsToBeColoured[j0][1][backgroundTheme]
            } else { // otherwise, just return without any breaking code errors
                return
            }
        }
    }
    return false
}

function getCellTextColor(i, j, CellsToBeColoured) {
    for (const j0 in CellsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 4 : 5;
        if ((CellsToBeColoured[j0][0] == i) && (CellsToBeColoured[j0][1] == j)) {
            if (CellsToBeColoured[j0][2] !== undefined ) { // color found in htmlColors.js
                return CellsToBeColoured[j0][2][backgroundTheme]
            } else { // otherwise, just return without any breaking code errors
                return
            } 
        }
    }
    return false
}

function getRowColor(i, RowsToBeColoured) {
    for (const i0 in RowsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 0 : 1;
        if (RowsToBeColoured[i0][0] == i) {
            if (RowsToBeColoured[i0][1] !== undefined ) { // color found in htmlColors.js
                return RowsToBeColoured[i0][1][backgroundTheme]
            } else { // otherwise, just return without any breaking code errors
                return
            }
        }
    }
    return false
}

function getColColor(j, ColsToBeColoured) {
    for (const j0 in ColsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 0 : 1;
        if (ColsToBeColoured[j0][0] == j) {
            if (ColsToBeColoured[j0][1] !== undefined) { // color found in htmlColors.js
                return ColsToBeColoured[j0][1][backgroundTheme]
            } else { // otherwise, just return without any breaking code errors
                return
            }
        }
    }
    return false
}

function getCellColor(i, j, CellsToBeColoured) {
    for (const j0 in CellsToBeColoured) {
        let backgroundTheme = themeIsLight() ? 0 : 1;
        if ((CellsToBeColoured[j0][0] == i) && (CellsToBeColoured[j0][1] == j)) {
            if (CellsToBeColoured[j0][2] !== undefined ) { // color found in htmlColors.js
                return CellsToBeColoured[j0][2][backgroundTheme]
            } else { // otherwise, just return without any breaking code errors
                return
            } 
        }
    }
    return false
}

function colorRows(table, headBody0, RowsToBeColoured) {
    for (const index in RowsToBeColoured) {
        let i0 = RowsToBeColoured[index][0];
        let lineBgColor = getRowColor(i0, RowsToBeColoured);
        let lineTextColor = getRowTextColor(i0, RowsToBeColoured);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => {
                    if ((i == i0) && (headBody == headBody0)) {
                        row.style.backgroundColor = lineBgColor;
                        row.style.color = lineTextColor;
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
        let colTextColor = getColTextColor(j0, ColsToBeColoured);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => { 
                    if ((j == j0) && (headBody == headBody0)) {
                        col.style.backgroundColor = colBgColor;
                        col.style.color = colTextColor;
                        col.setAttribute("colcolorattribute",colBgColor);
                        col.setAttribute(ColsToBeColoured[index][2], ColsToBeColoured[index][3]); // sets cols color labels to all column
                    }
                });
            });
        });
    }
}

// function setColsColorLabels(table, headBody, ColsToBeColoured) {

// }

function colorCells(table, headBody0, CellsToBeColoured) {
    for (const index in CellsToBeColoured) {
        let i0 = CellsToBeColoured[index][0];
        let j0 = CellsToBeColoured[index][1];
        let cellBgColor = getCellColor(i0, j0, CellsToBeColoured);
        let cellTextColor = getCellTextColor(i0, j0, CellsToBeColoured);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => { 
                    if ((i == i0) && (j == j0) && (headBody == headBody0)) {
                        if (noneColorList.includes(cellBgColor)) { // none Cell DETECTED
                            row.style.backgroundColor = "transparent";
                            col.style.backgroundColor = "transparent";
                        }
                        col.style.backgroundColor = cellBgColor;
                        col.style.color = cellTextColor;
                        col.setAttribute("cellcolorattribute",cellBgColor);
                    }
                });
            });
        });
    }
}

function addRowWithColor(row, i, attr, lineBgColor, lineBgColorName) {
    if (RowsToBeColoured.filter(couple => (couple[0] == i) && (couple[1] == lineBgColor)).length == 0) {
        RowsToBeColoured.push([i,lineBgColor]);
        row.setAttribute(attr,lineBgColorName);
    }
    return 
}

function addColWithColor(col, j, attr, colBgColor, colBgColorName) {
    if (ColsToBeColoured.filter(couple => (couple[0] == j) && (couple[1] == colBgColor)).length == 0) {
        ColsToBeColoured.push([j,colBgColor,attr,colBgColorName]);
        col.setAttribute(attr, colBgColorName);
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
}

function isXCell(cell) {
    cell = cell.innerHTML.trim();
    return (cell === ">" || cell === "&gt;" || cell === "^" || cell === "&#94;'" || cell === "")
}

function isHTMLXTable(table) {
    const HTMLtableHasXTh = Array.from(table.querySelectorAll("th")).filter( th => isHTMLXCell(th));
    const HTMLtableHasXTr = Array.from(table.querySelectorAll("tr")).filter( tr => isHTMLXCell(tr));
    const HTMLtableHasXTd = Array.from(table.querySelectorAll("td")).filter( td => isHTMLXCell(td));
    return (HTMLtableHasXTh || HTMLtableHasXTr || HTMLtableHasXTd)
}

function isHTMLXCell(cell) {
    return (cell.hasAttribute("colspan") || cell.hasAttribute("rowspan"))
}

function getColorTables() {
    const ColorXtables = []
    Array.from(document.querySelectorAll(".md-typeset table"))
    .forEach( table => {
        if (isColorTable(table)) {
            ColorXtables.push(table);
        }
    });
    return ColorXtables;
}

function isColorTable(table) {
    const tableHasColorTh = Array.from(table.querySelectorAll("th")).filter( th => isColorXCell(th));
    const tableHasColorTd = Array.from(table.querySelectorAll("td")).filter( td => isColorXCell(td));
    return (tableHasColorTh || tableHasColorTd)
}

function isColorXCell(cell) {
    let isAColorCell = hasAnyAttribIn(cell, rowAttrList) || hasAnyAttribIn(cell, colAttrList) || hasAnyAttribIn(cell, cellAttrList) 
    || cell.hasAttribute("linecolorattribute") || cell.hasAttribute("colcolorattribute") || cell.hasAttribute("cellcolorattribute")
    return isAColorCell
}

function themeIsLight() {
    return document.body.getAttribute("data-md-color-scheme") == "default"
}

function themeIsDark() {
    return document.body.getAttribute("data-md-color-scheme") != "default"
}

export default function update_colors() {
    // console.log("Update Colors ...");

    const XTablesArray = getXTables();
    if (XTablesArray) {
        Array.from(XTablesArray).forEach( table => {
            Array.from(table.children).forEach( headBody => {
                Array.from(headBody.children).forEach( (row, i) => {
                    if (hasAnyAttribIn(row, rowAttrList)) {
                        let lineBgColor = getSettedColor(row, rowAttrList);
                        let lineTextColor = getSettedTextColor(row, rowAttrList);
                        row.style.backgroundColor = lineBgColor;
                        row.style.color = lineTextColor;
                    }
                    Array.from(row.children).forEach( (col, j) => {
                        if (hasAnyAttribIn(col, colAttrList)) {
                            let colBgColor = getSettedColor(col, colAttrList);
                            let colTextColor = getSettedTextColor(col, colAttrList);
                            col.style.backgroundColor = colBgColor;
                            col.style.color = colTextColor;
                        }
                        if (hasAnyAttribIn(col, cellAttrList)) {
                            let cellBgColor = getSettedColor(col, cellAttrList);
                            let cellTextColor = getSettedTextColor(col, cellAttrList);
                            col.style.backgroundColor = cellBgColor;
                            col.style.color = cellTextColor;
                        }
                    });
                });
            });
        });
    }
// console.log("NO RELOAD");
}

function getSettedColor(el, attrList) {
    let backgroundTheme = themeIsLight() ? 0 : 1;
    // Populate RowsToBeColoured Array
    let attrInList = hasAnyAttribIn(el, attrList);
    if  (attrInList) { // row has one attribute in rowAttrList
        let elBgColor = el.getAttribute(attrInList);
        if (elBgColor.includes("@")) { // Dynamic Color
            // console.log("@ DYNAMIC ROW DETECTED");
            if (elBgColor[0] == "\\") { // strip all left backslashes, if any
                elBgColor = strip(elBgColor);
            }
            if (color[elBgColor.substring(1,elBgColor.length)] !== undefined ) {
                elBgColor = color[elBgColor.substring(1,elBgColor.length)][backgroundTheme];
            } else { // dynamic color not found on color tables
                return
            }
        } else { // Static Color
            // console.log("STATIC COLOR = "+lineBgColor);
            elBgColor = color[elBgColor][backgroundTheme];
        }
        return elBgColor
    } else {
        return undefined
    }
}

function getSettedTextColor(el, attrList) {
    let backgroundTheme = themeIsLight() ? 4 : 5;
    // Populate RowsToBeColoured Array
    let attrInList = hasAnyAttribIn(el, attrList);
    if  (attrInList) { // row has one attribute in rowAttrList
        let elBgColor = el.getAttribute(attrInList);
        if (elBgColor.includes("@")) { // Dynamic Color
            // console.log("@ DYNAMIC ROW DETECTED");
            if (elBgColor[0] == "\\") { // strip all left backslashes, if any
                elBgColor = strip(elBgColor);
            }
            if (color[elBgColor.substring(1,elBgColor.length)] !== undefined ) {
                elBgColor = color[elBgColor.substring(1,elBgColor.length)][backgroundTheme];
            } else { // dynamic color not found on color tables
                return
            }
        } else { // Static Color
            // console.log("STATIC COLOR = "+lineBgColor);
            elBgColor = color[elBgColor][backgroundTheme];
        }
        return elBgColor
    } else {
        return undefined
    }
}