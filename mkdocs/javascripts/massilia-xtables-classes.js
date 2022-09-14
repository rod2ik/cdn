/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    // console.log("THIS MKDOCS PAGE IS LOADED");

    /* ====================================================================== */
    /*                       Classes with Tables                              */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset table")
    .forEach( table => {
        // transform last row into table classes
        if (lastRowContainsClasses(table)) {
            let arrayOfClasses = getLastTdContentOf(table).replace(/{:/, "")
            .replace(/{/, "").replace(/}/, "").replaceAll(/\./g, "")
            .replace(/\s\s+/g, ' ').trim().split(" ");
            table.classList.add(...arrayOfClasses);
            getLastTrOf(table).remove();
        }
    });
})

function tableHasClass(table, klass) {
    return table
    // let lastTd = table.querySelectorAll("tbody tr:last-of-type td:first-of-type")[0].innerHTML;
    // // console.log("LastTd", lastTd);
    // // console.log("Typeof LastTd", typeof lastTd);
    // if ((lastTd.startsWith("{") || lastTd.startsWith("{:")) 
    // && (lastTd.endsWith("}"))) {
    //     return true
    // } else return false
}

function lastRowContainsClasses(table) {
    let lastTd = table.querySelectorAll("tbody tr:last-of-type td:first-of-type")[0].innerHTML;
    // console.log("LastTd", lastTd);
    // console.log("Typeof LastTd", typeof lastTd);
    if ((lastTd.startsWith("{") || lastTd.startsWith("{:")) 
    && (lastTd.endsWith("}"))) {
        return true
    } else return false
}

function getLastTdContentOf(table) {
    let lastTd = table.querySelectorAll("tbody tr:last-of-type td:first-of-type")[0].innerHTML;
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