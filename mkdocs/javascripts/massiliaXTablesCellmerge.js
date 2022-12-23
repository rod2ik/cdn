/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import htmlColors from './htmlColors.js';
var color = htmlColors;

const LIGHT = 0;
const DARK = 1;
const BACKGROUND = 0;
const BORDER = 1;
const TEXT = 2;
const BACKGROUND_LIGHT = 0;
const BACKGROUND_DARK = 1;
const BORDER_LIGHT = 2;
const BORDER_DARK = 3;
const TEXT_LIGHT = 4;
const TEXT_DARK = 5;

window.addEventListener('load', function() {
    // console.log("massilia-xtables-cellmerge PAGE LOADED");

    /* ====================================================================== */
    /*                    Cell Merge in Tables                                */
    /* ====================================================================== */
    const XTablesArray = getXTables();
    if (XTablesArray) {
        const rowspans = [];
        const colspans = [];
        const colspans2 = [];
        var prevRow = null;
    
        // Extend Table Cells
        Array.from(XTablesArray).forEach( table => {
            Array.from(table.children).forEach( headBody => {
                Array.from(headBody.children).forEach( (row, i) => {
                    Array.from(row.children).forEach( (col, j) => {
                        var text = col.innerHTML.trim();
                        // if(!text.length) { // text is void
                        //     var prev = getPrev(col);
                        //     if (prev) {
                        //         colspans2.push([prev, col]);
                        //     } /* else { console.log("null prev of void text :", prev) } */
                        // } // text.length
                        // else if ((text === "^" || text === "&#94;") && prevRow) {
                        if ((text === "^" || text === "&#94;") && prevRow) {
                            var prev = prevRow.children[j];
                            if (prev) {
                                rowspans.push([prev, col]);
                            } /* else { console.log("null prev of ^ :", prev) } */
                        } // else if 1
                        else if (text === ">" || text === "&gt;") {
                            var next = getNext(col);
                            if (next) {
                                colspans.push([col, next]);
                            } /* else { console.log("null next of > :", prev); } */
                          } // else if 2
                    }); // forEach col
                    prevRow = row
                }); // forEach row
            }); // forEach headBody
        }); // forEach table
        // });

        for (let i = rowspans.length -1; i >= 0; i--){
            let _a = rowspans[i], prev = _a[0], col = _a[1];
            let rowspan = (parseInt(prev.getAttribute("rowspan"), 10) || 1) +
            (parseInt(col.getAttribute("rowspan"), 10) || 1);
            prev.setAttribute("rowspan", rowspan);
            prev.style.verticalAlign = "middle";
            col.remove();
        }
        for (let i = 0; i < colspans.length; i++) {
            let _b = colspans[i], prev = _b[0], col = _b[1];
            let colspan = (parseInt(prev.getAttribute("colspan"), 10) || 1) +
            (parseInt(col.getAttribute("colspan"), 10) || 1);
            col.setAttribute("colspan", colspan);
            col.style.verticalAlign = "middle";
            prev.remove();
        }
        for (let i = colspans2.length - 1; i >= 0; i--) {
            let _c = colspans2[i], prev = _c[0], col = _c[1];
            let colspan = (parseInt(prev.getAttribute("colspan"), 10) || 1) +
            (parseInt(col.getAttribute("colspan"), 10) || 1);
            prev.setAttribute("colspan", colspan);
            prev.style.verticalAlign = "middle";
            col.remove();
        }
    } // End if TXablesArray

}); // End of load page

function isLightTheme() {
    return document.querySelector("body").getAttribute("data-md-color-scheme") === "default"
}

function isDarkTheme() {
    return document.querySelector("body").getAttribute("data-md-color-scheme") !== "default"
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

function lastRowContainsClasses(table) {
    let arrayOfTds = table.getElementsByTagName("td");
    let lastTd = arrayOfTds[arrayOfTds.length-1].innerHTML;
    // console.log("LastTd", lastTd);
    if ((lastTd.startsWith("{") || lastTd.startsWith("{:")) 
    && (lastTd.endsWith("}"))) {
        return true
    } else return false
}

function getLastTdContentOf(table) {
    let arrayOfTds = table.getElementsByTagName("td");
    let lastTd = arrayOfTds[arrayOfTds.length-1].innerHTML;
    if (lastTd) {
        lastTd = lastTd.trim();
    }
    return lastTd
}

function getLastTrOf(table) {
    let arrayOfTrs = table.getElementsByTagName("tr");
    let lastTr = arrayOfTrs[arrayOfTrs.length-1];
    return lastTr
}

function getPrev(col0) {
    const colSiblings = col0.parentNode.children;
    for (let i=0; colSiblings.length; i++) {
        if (colSiblings[i+1] == col0) {
            let previous = colSiblings[i];
            return previous
        }
    }
    // return
}

function getNext(col0) {
    const colSiblings = col0.parentNode.children;
    for (let i=0; colSiblings.length; i++) {
        if (colSiblings[i-1] == col0) {
            let nextCol = colSiblings[i];
            return nextCol
        }
    }
    // return
}

function formatMathTable(table) {
    console.log("Math Table Detected");
}

