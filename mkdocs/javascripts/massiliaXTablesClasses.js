/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const OTHER_SYMBOLS = LETTERS+'-._'
const AUTHORIZED_CHARS = LETTERS + DIGITS + OTHER_SYMBOLS;
const AUTHORIZED_FIRST_CHARS = LETTERS + OTHER_SYMBOLS;
// they cannot start by digit or hyphen

window.addEventListener('load', function() {
    // console.log("massilia-xtables-classes PAGE LOADED");

    /* ====================================================================== */
    /*                       Classes with Tables                              */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset table")
    .forEach( table => {
        if (formatIsOk(table)) {
            let arrayOfClasses = getTableClassList(table);
            let arrayOfIDs = getTableIDsList(table);
            let arrayOfAttrs = getTableAttrList(table);
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
                    // remove the first " and the last " in Attribute name
                    let n = attrValue.length;
                    table.setAttribute(attrProperty, attrValue.substring(1,n-1));
                }
            }
            getLastRowOf(table).remove();
        }
    });
})

function getClassesIDsAndAttrArrayOf(table) {
    let attrString = getFirstCellOfLastTdContentOf(table);
    let lastTdArrayClassesAttributes = getClassesIDsAndAttrArrayFromString(attrString);
    return lastTdArrayClassesAttributes
}

function getClassesIDsAndAttrArrayFromString(s) {
    let lastTdArrayClassesAttributes = s.trim().split(" ")
                                .filter(attr => attr !== "{")
                                .filter(attr => attr !== "}")
                                .map( attr => {
                                    let n = attr.length;
                                    if (attr[0] == "{" && attr[1] == ":" && attr[attr.length-1] == "}" && attr[attr.length-2] == ":") {
                                        return attr.substring(2,n-2)
                                    }
                                    else if (attr[0] == "{" && attr[attr.length-1] == "}") {
                                        return attr.substring(1,n-1)
                                    }
                                    else {
                                        return attr
                                    }
                                })
                                .filter(attr => attr !== "");
    return lastTdArrayClassesAttributes
}

function isValidClassString (s) {
    if (!((typeof s) === "string") || s.length <= 1) {
        return false
    } else if ( (s[0] != ".") || !(isValidString(s.substring(1,s.length))) ) {
        return false
    } else {
        return true
    }
}

function isValidIDString (s) {
    if (!((typeof s) === "string") || s.length <= 1) {
        return false
    } else if ( (s[0] != "#") || !(isValidString(s.substring(1,s.length))) ) {
        return false
    } else {
        return true
    }
}

function isValidAttributeString (s) {
    // s looks like \"validProperty=validValue\"
    if (!((typeof s) === "string") || s.length == 0) { // s not a string or string is void
        return false
    } else { // s is a string with at least 1 char
        if ( s.includes("=") ) { // s has an '=' sign
            let i = s.indexOf("=");
            if (i == 0 || i == s.length) { // '=' is at the first or last position in s
                return false
            } else { // s has something before AND something after the '='
                let s0 = s.substring(0,i);
                let s1 = s.substring(i+1,s.length);
                if (!(isValidString(s0))) { // s0 is not valid (the string before '=')
                    return false
                } else { // s0 is valid. now, hat about s1 ?
                    if ( !((s1[0] == '"') && (s1[s1.length-1] == '"')) && !((s1[0] == "'") && (s1[s1.length-1] == "'")) ) {
                        return false
                    } else { // s1 is surrounded by two \", or by two ', so strip them first
                        // s1 = s1.substring(1,s1.length-2);
                        // if (!(isValidString(s1))) { // s1 not valid
                        //     return false
                        // } // else s1 (and s0) are valid
                        return true
                    }
                }
            }
        } else { // no '=' sign, just an attribute name
            return isValidString(s)
        }
    }
}

function isValidArrayOfAttributes(attrArray) {
    for (const attr of attrArray) {
        if (!(isValidClassString(attr)) && !(isValidIDString(attr)) && !(isValidAttributeString(attr)) ) {
            return false
        }
    return true
    }
}


function isValidString(s) {
    if ((typeof s !== "string") || s.length == 0 ) {
        return false
    } else if (!(AUTHORIZED_FIRST_CHARS.includes(s[0]))) { // first char s[0] is not among first authorized ones
        return false
    } else { // first char is correct
        for (const c of s) {
            if (!(AUTHORIZED_CHARS.includes(c))) { // c is not among 'mid' authorized chars
                return false
            }
        }
        return true
    }
}

function getTableClassList(table) {
    let globalAttribList = getClassesIDsAndAttrArrayOf(table);
    let classList = globalAttribList.filter( attr => attr[0] == "." );
    return classList
}

function getTableIDsList(table) {
    let globalAttribList = getClassesIDsAndAttrArrayOf(table);
    let IDsList = globalAttribList.filter( attr => attr[0] == "#" );
    return IDsList
}

function getTableAttrList(table) {
    let globalAttribList = getClassesIDsAndAttrArrayOf(table);
    let AttrList = globalAttribList.filter( attr => ((attr[0] != ".") && (attr[0] != "#") && (isValidAttributeString(attr))) );
    return AttrList
}

function formatIsOk(table) {
    let firstCell = getFirstCellOfLastTdContentOf(table);
    let lastRow = getLastRowOf(table);
    if ( lastButFirstCellsAreVoidIn(lastRow) && isWellFormatted(firstCell) ) {
        return true
    } else {
        return false
    }
}

function isWellFormatted(s) {
    if (!(s.includes("{")) || !(s.includes("}"))) {
        return false
    } else { // s has both '{' and '}' symbols
        s.trim();
        let s0 = s.indexOf("{");
        let s1 = s.indexOf("}");
        let prefix = s.substring(0,s0);
        let suffix = s.substring(s1+1,s.length);
        prefix = prefix.trim();
        suffix = suffix.trim();
        if (prefix != "" || suffix != "") { // something before '{' or after '}'
            return false
        } else { // trim the { } or the {: :}
            s = s.trim();
            if ( s[0] == "{" && s[1] == ":") {
                s = s.substring(2,s.length).trim();
            }
            if ( s[s.length-1] == "}" && s[s.length-2] == ":") {
                s = s.substring(0,s.length-2).trim();
            }
            let attrArray = getClassesIDsAndAttrArrayFromString(s);
            return isValidArrayOfAttributes(attrArray)
        }
    }

}

function lastButFirstCellsAreVoidIn(tableRow) {
    for (const i in tableRow.children) {
        if (i >0 && tableRow.children[i].innerHTML != "") {
            return false
        }
    }
    return true
}

function getFirstCellOfLastTdContentOf(table) {
    let lastTd = table.querySelectorAll("tbody tr:last-of-type td:first-of-type")[0].childNodes[0].nodeValue;
    if (lastTd) {
        lastTd = lastTd.trim();
    }
    return lastTd
}

function getLastRowOf(table) {
    let arrayOfTrs = table.getElementsByTagName("tr");
    let lastTr = arrayOfTrs[arrayOfTrs.length-1];
    return lastTr
}