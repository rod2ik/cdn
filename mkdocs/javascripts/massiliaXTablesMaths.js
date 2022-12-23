/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    // console.log("massilia-xtables-maths PAGE LOADED");

    /* ====================================================================== */
    /*                       Maths Tables in Mkdocs                           */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset table")
    .forEach( table => {
        // transform last row into table classes
        if (lastRowContainsClasses(table)) { }


    // /* ====================================================================== */
    // /*                       Classes with Tables                              */
    // /* ====================================================================== */
    // const shrinkArray = ["shrink", "little", "reduite", "reduire", "petit"];
    // const mathArray = ["math", "maths", "math-table"];
    // document.querySelectorAll(".md-typeset table")
    // .forEach( table => {
    //     // transform last row into table classes
    //     if (lastRowContainsClasses(table)) {
    //         let arrayOfClasses = getLastTdContentOf(table).replace(/{:/, "")
    //         .replace(/{/, "").replace(/}/, "").replaceAll(/\./g, "")
    //         .replace(/\s\s+/g, ' ').trim().split(" ");
    //         table.classList.add(...arrayOfClasses);
    //         getLastTrOf(table).remove();
    //     }
    //     Array.from(table.querySelectorAll("thead th")).forEach(th => {
    //         th.style.fontWeight = "700";
    //     });
    //     if (Array.from(table.classList).some(klass => mathArray.includes(klass))) {
    //         formatMathTable(table);
    //     }
    //     // Not Shrink class
    //     if (!Array.from(table.classList).some(klass => shrinkArray.includes(klass))) {
    //         Array.from(table.querySelectorAll("thead th")).forEach(th => {
    //             th.style.minWidth = "3rem";
    //             th.style.padding = ".9375em 1.25em";
    //         });
    //         Array.from(table.querySelectorAll("tbody td")).forEach(td => {
    //             td.style.padding = ".9375em 1.25em";
    //             td.style.verticalAlign = "middle";
    //         });
    //     }
    });
    // // the nocolor class is treated directly in CSS

});