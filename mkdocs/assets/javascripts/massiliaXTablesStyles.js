/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import xTableStyles from './xTableStyles.js';

var style = xTableStyles;
let RowsToBeStyled = Array();
let ColsToBeStyled = Array();
let CellsToBeStyled = Array();
let rowStyleAttrList = ["lstyle", "linestyle", "line-style", "rstyle", "rowstyle", "row-style", "styleligne"];
let colStyleAttrList = ["cstyle", "colstyle", "col-style", "columnstyle", "column-style", "stylecol"];
let cellStyleAttrList = ["celstyle", "cellstyle", "cel-style", "cell-style"];
let tableStyleAttrList = ["tabstyle", "tablestyle", "globalstyle", "tab-style", "table-style", "global-style"];
// let noneColorList = ["vide", "void", "none", "transparent", "aucun", "aucune"];

window.addEventListener('load', function() {
    // console.log("massilia-xtables-colors PAGE LOADED");
    styleTablesGlobally();
    styleTables();

    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type !== "attributes" &&
            mutation.attributeName !== "data-md-color-scheme"
          ) {
            return
          }
          update_styles();
        }
      };

    const observer = new MutationObserver(mutationCallback);
    let themeChange = document.querySelector("body");
    observer.observe(themeChange, { attributes: true });

}); // End of load page

        /* =================================================================================================================== */
        /*                 Style Entire Lines/Rows, Cols & Cells in Tables, with Css 'Style' Syntax                            */
        /* =================================================================================================================== */

function styleTablesGlobally() {
    const XTablesArray = getXTables();
    if (XTablesArray) {
        Array.from(XTablesArray).forEach( table => {
            if (hasAnyAttribIn(table, tableStyleAttrList)) {
                let tableGlobalStyleAttrName = hasAnyAttribIn(table, tableStyleAttrList);
                let tableGlobalStyleAttrValue = table.getAttribute(tableGlobalStyleAttrName);
                let tableGlobalCssStyle = getCssStyleFrom(tableGlobalStyleAttrValue);
                Array.from(table.children).forEach( headBody => {
                    headBody.setAttribute("linestyle", tableGlobalStyleAttrValue);
                    headBody.setAttribute("style", tableGlobalCssStyle);
                    Array.from(headBody.children).forEach( (row, i) => {
                        row.setAttribute("linestyle", tableGlobalStyleAttrValue);
                        row.setAttribute("style", tableGlobalCssStyle);
                        // Array.from(row.children).forEach( (col, j) => {    
                        // }); // End of Cols
                    }); // End of Rows
                }); // End of HeadBodys            
            }
        }); // End of Table
    }
}

function styleTables() {
    const XTablesArray = getXTables();
    if (XTablesArray) {
        Array.from(XTablesArray).forEach( table => {
            // console.log("NEW TABLE");
            Array.from(table.children).forEach( headBody => {
                RowsToBeStyled = Array();
                ColsToBeStyled = Array();
                CellsToBeStyled = Array();
                Array.from(headBody.children).forEach( (row, i) => {
                    Array.from(row.children).forEach( (col, j) => {
                        // Populate RowsToBeStyled Array and Style Rows
                        let attrInRowStyleList = hasAnyAttribIn(col, rowStyleAttrList);
                        if  (attrInRowStyleList) { // row has one attribute in rowStyleAttrList
                            let lineStyle = col.getAttribute(attrInRowStyleList);
                            let lineStyleName = lineStyle;
                            // Static Color
                            lineStyle = getCssStyleFrom(lineStyleName);

                            // addRowWithColor(row, i, attrInRowStyleList, lineStyle, lineStyleName);
                            // col.setAttribute("style", lineStyle);
                            // col.setAttribute(attrInRowStyleList, lineStyleName);
                            row.setAttribute("style", lineStyle);
                            row.setAttribute(attrInRowStyleList, lineStyleName);
                            setRowStyletoCols(row, attrInRowStyleList, lineStyleName, lineStyle);
                            }

                        // Populate ColsToBeStyled Array
                        let attrInColStyleList = hasAnyAttribIn(col, colStyleAttrList);
                        if  (attrInColStyleList) { // col has one attribute of colStyleAttrList
                            let colStyle = col.getAttribute(attrInColStyleList);
                            let colStyleName = colStyle;
                            colStyle = getCssStyleFrom(colStyleName);
                            col.setAttribute("style", colStyle);
                            col.setAttribute(attrInColStyleList, colStyleName);
                            addColWithColor(col, j, attrInColStyleList, colStyle, colStyleName);
                        }

                        // Populate CellsToBeStyled Array
                        let attrInCellStyleList = hasAnyAttribIn(col, cellStyleAttrList);
                        if  (attrInCellStyleList) { // col has one attribute of colStyleAttrList
                            let cellStyle = col.getAttribute(attrInCellStyleList);
                            let cellStyleName = cellStyle;
                            cellStyle = getCssStyleFrom(cellStyleName);
                            col.setAttribute("style", cellStyle);
                            col.setAttribute(attrInCellStyleList, cellStyleName);
                            addCellWithColor(i, j, attrInCellStyleList, cellStyle, cellStyleName);
                        }

                    }); // forEach col
                }); // forEach row
                // styleRows(table, headBody, RowsToBeStyled);
                styleCols(table, headBody, ColsToBeStyled);
                styleCells(table, headBody, CellsToBeStyled);
            }); // forEach headBody
        }); // forEach table
    } // if(XTablesArray)
}

function getCssStyleFrom(styleName) {
    let s = "";
    let theme = themeIsLight() ? "light" : "dark";
    let styleObject;
    if (style[styleName] !== undefined) {
        styleObject = style[styleName][theme];
    } else { // styleName not found in config file xTablesStyles.js, neither in custom massilia configs of 'mkdocs.yml'
        return
    }
    for (const cssProperty of Object.keys(styleObject)) {
        s += cssProperty+": "+style[styleName][theme][cssProperty]+"; "
    }
    return s
}

function setRowStyletoCols(row, attrInRowStyleList, lineStyleName, lineStyle) {
    for (const col of row.children) {
        col.setAttribute(attrInRowStyleList, lineStyleName);
        col.setAttribute("style", lineStyle);
    }
}

function hasAnyAttribIn(el, styleAttrList) {
    for (const attr of styleAttrList) {
        if (el.hasAttribute(attr)) {
            return attr
        }
    }
    return false
}

function styleCols(table, headBody0, ColsToBeStyled) {
    for (const index in ColsToBeStyled) {
        let j0 = ColsToBeStyled[index][0];
        let colStyleName = ColsToBeStyled[index][3];
        let colStyle = getCssStyleFrom(colStyleName);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => { 
                    if ((j == j0) && (headBody == headBody0)) {
                        col.setAttribute("style",colStyle);
                        col.setAttribute("colstyleattribute",colStyle);
                        col.setAttribute(ColsToBeStyled[index][2], ColsToBeStyled[index][3]); // sets cols color labels to all column
                    }
                });
            });
        });
    }
}

function styleCells(table, headBody0, CellsToBeStyled) {
    for (const index in CellsToBeStyled) {
        let i0 = CellsToBeStyled[index][0];
        let j0 = CellsToBeStyled[index][1];
        let cellStyleName = CellsToBeStyled[index][4];
        let cellStyle = getCssStyleFrom(cellStyleName);
        Array.from(table.children).forEach( headBody => {
            Array.from(headBody.children).forEach( (row, i) => {
                Array.from(row.children).forEach( (col, j) => { 
                    if ((i == i0) && (j == j0) && (headBody == headBody0)) {
                        // if (noneColorList.includes(cellStyle)) { // none Cell DETECTED
                        //     row.style.backgroundColor = "transparent";
                        //     col.style.backgroundColor = "transparent";
                        // }
                        col.setAttribute("style",cellStyle);
                        col.setAttribute("cellstyleattribute",cellStyle);
                    }
                });
            });
        });
    }
}

function addColWithColor(col, j, attr, colStyle, colStyleName) {
    if (ColsToBeStyled.filter(couple => (couple[0] == j) && (couple[1] == colStyle)).length == 0) {
        ColsToBeStyled.push([j,colStyle,attr,colStyleName]);
        col.setAttribute(attr, colStyleName);
    }
    return 
}

function addCellWithColor(i, j, attr, cellStyle, cellStyleName) {
    if (CellsToBeStyled.filter(tuple => (tuple[0] == i) && (tuple[1] == j) && (tuple[2] == cellStyle)).length == 0) {
        CellsToBeStyled.push([i,j,cellStyle,attr, cellStyleName]);
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

function themeIsLight() {
    return document.body.getAttribute("data-md-color-scheme") == "default"
}

// function themeIsDark() {
//     return document.body.getAttribute("data-md-color-scheme") != "default"
// }

export default function update_styles() {
    // console.log("Update Colors ...");

    styleTablesGlobally();
    const XTablesArray = getXTables();
    if (XTablesArray) {
        Array.from(XTablesArray).forEach( table => {
            Array.from(table.children).forEach( headBody => {
                Array.from(headBody.children).forEach( (row, i) => {
                    if (hasAnyAttribIn(row, rowStyleAttrList)) {
                        let rowStyleAttribute = hasAnyAttribIn(row, rowStyleAttrList);
                        let lineStyleName = row.getAttribute(rowStyleAttribute);
                        let lineStyle = getCssStyleFrom(lineStyleName);
                        row.setAttribute("style", lineStyle);
                        // setRowStyletoCols(row, attrInRowStyleList, lineStyleName, lineStyle);
                        setRowStyletoCols(row, rowStyleAttribute, lineStyleName, lineStyle);
                    }
                    Array.from(row.children).forEach( (col, j) => {
                        if (hasAnyAttribIn(col, colStyleAttrList)) {
                            let colStyleAttribute = hasAnyAttribIn(col, colStyleAttrList);
                            let colStyleName = col.getAttribute(colStyleAttribute);
                            let colStyle = getCssStyleFrom(colStyleName);
                            col.setAttribute("style", colStyle);
                            // if (hasAnyAttribIn(col, rowStyleAttrList)) { 
                            //     // in case row had a rowStyleAttribute defined in this col
                            //     let rowStyleAttribute = hasAnyAttribIn(col, rowStyleAttrList);
                            //     let lineStyleName = col.getAttribute(rowStyleAttribute);
                            //     let lineStyle = getCssStyleFrom(lineStyleName);
                            //     row.setAttribute("style", lineStyle);
                            // }
                        }
                        if (hasAnyAttribIn(col, cellStyleAttrList)) {
                            let cellStyleAttribute = hasAnyAttribIn(col, cellStyleAttrList);
                            let cellStyleName = col.getAttribute(cellStyleAttribute);
                            let cellStyle = getCssStyleFrom(cellStyleName);
                            col.setAttribute("style", cellStyle);
                        }
                    }); //End of Cols
                });  //End of Rows
            }); //End of HeadBody
        });  //End of Table
    }
// console.log("NO RELOAD");
}
