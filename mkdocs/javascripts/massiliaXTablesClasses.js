/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    // console.log("massilia-xtables-classes PAGE LOADED");

    /* ====================================================================== */
    /*                       Classes with Tables                              */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset table")
    .forEach( table => {
        // getTableClassesIDsAndAttrList(table);
        // getTableClassList(table);
        // getTableIDsList(table);
        // getTableAttrList(table);

        // transform last row into table classes
        if (lastRowContainsClasses(table)) {
            let arrayOfClasses = getTableClassList(table);
            let arrayOfIDs = getTableIDsList(table);
            let arrayOfAttrs = getTableAttrList(table);
            // let arrayOfClasses = getLastTdContentOf(table).replace(/{:/, "")
            // .replace(/{/, "").replace(/}/, "").replaceAll(/\./g, "")
            // .replace(/\s\s+/g, ' ').trim().split(" ");
            if (arrayOfClasses.length >0 ) { // sets the Classes
                // remove the first dot '.' in each class Name
                table.classList.add(...arrayOfClasses.map( className => className.substring(1,className.length) ));
            }
            if (arrayOfIDs.length >0 ) { // sets the IDs (last one erases all the former ones)
                for (const id of arrayOfIDs) {
                    // remove the first '#' sign in each ID Name
                    table.setAttribute("id",id.substring(1,id.length));
                }
            }
            if (arrayOfAttrs.length >0 ) { // sets the Attributes
                let attrProperty;
                let attrValue;
                for (const attr of arrayOfAttrs) {
                    [attrProperty, attrValue] = attr.split("=");
                    // console.log("attrProperty =");
                    // console.log(attrProperty);
                    // console.log("attrValue =");
                    // console.log(attrValue);
                    // remove the first " and the last " in Attribute name
                    let n = attrValue.length;
                    table.setAttribute(attrProperty, attrValue.substring(1,n-1));
                }
            }
            getLastTrOf(table).remove();
        }
    });
})

// function tableHasClass(table, klass) {
//     return table
//     // let lastTd = table.querySelectorAll("tbody tr:last-of-type td:first-of-type")[0].innerHTML;
//     // // console.log("LastTd", lastTd);
//     // // console.log("Typeof LastTd", typeof lastTd);
//     // if ((lastTd.startsWith("{") || lastTd.startsWith("{:")) 
//     // && (lastTd.endsWith("}"))) {
//     //     return true
//     // } else return false
// }

function getTableClassesIDsAndAttrList(table) {
    let lastTd = table.querySelectorAll("tbody tr:last-of-type td:first-of-type")[0].innerHTML;
    let lastTdArrayClassesAttributes = lastTd.split(" ")
                                .filter(attr => attr !== "{")
                                .filter(attr => attr !== "}")
                                .map( attr => {
                                    let n = attr.length;
                                    if (attr.includes("{:")) {
                                        return attr.substring(2,n)
                                    } else if (attr.includes("{")) {
                                        return attr.substring(1,n)
                                    } else if (attr.includes(":}")) {
                                        return attr.substring(0,n-2)
                                    } else if (attr.includes("}")) {
                                        return attr.substring(0,n-1)
                                    } else {
                                        return attr
                                    }
                                })
                                .filter(attr => attr !== "");
    // console.log("lastTdArrayClassesAttributes =");
    // console.log(lastTdArrayClassesAttributes);
    return lastTdArrayClassesAttributes
}

function getTableClassList(table) {
    let globalAttribList = getTableClassesIDsAndAttrList(table);
    let classList = globalAttribList.filter( attr => attr[0] == "." );
    // console.log("Class List =");
    // console.log(classList);
    return classList
}

function getTableIDsList(table) {
    let globalAttribList = getTableClassesIDsAndAttrList(table);
    let IDsList = globalAttribList.filter( attr => attr[0] == "#" );
    // console.log("IDs List =");
    // console.log(IDsList);
    return IDsList
}

function getTableAttrList(table) {
    let globalAttribList = getTableClassesIDsAndAttrList(table);
    let AttrList = globalAttribList.filter( attr => ((attr[0] != ".") && (attr[0] != "#")) );
    // console.log("Attr List =");
    // console.log(AttrList);
    return AttrList
}

function lastRowContainsClasses(table) { 
    return getTableClassList(table).length > 0
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