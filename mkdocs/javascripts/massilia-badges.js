/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import color from './htmlColors.js';

window.addEventListener('load', function() {
    // console.log("massilia-badges PAGE LOADED");
    
    /* ====================================================================== */
    /*                             Get Badges                                 */
    /* ====================================================================== */
        
    let LIGHT = 0;
    let DARK = 1;
    let BACKGROUND = 0;
    let BORDER = 1;
    let TEXT = 2;
    let VALUE = 0;

    update_badges();

    function update_badges() {
        document.querySelectorAll(".md-typeset p badge, .md-typeset p bad, .md-typeset p bd")
        .forEach( badge => {
            let attrList = badge.getAttributeNames();
            if (!attrList.includes("style")) { 
                // style attribute is added on first load, so let's fake it in advance, to count it
                attrList.push("style");
            }
            let bgColor;
            let borderColor;
            let textColor;

            if (hasDynamicColor(badge)) {
                let newAttrList = getTheDynamicColorsArrayOf(badge);
                attrList = setNewAttributes(badge, newAttrList);
            }

            bgColor = getBgColors(attrList);
            setBgColor(badge, bgColor);
            
            borderColor = getBorderColors(attrList);
            if (borderColor) {
                setBorderColor(badge, borderColor);
            }
            
            textColor = getTextColors(attrList);
            if (textColor) {
                setTextColor(badge, textColor);
            }
        });
    } // End update_badges

    function hasDynamicColor(badge) {
        return badge.getAttributeNames()[BACKGROUND][0] == "@"
    }

    function getTheDynamicColorsArrayOf(badge) {
        let dynamicBgColor = badge.getAttributeNames()[BACKGROUND];
        let staticBgColor = dynamicBgColor.substring(1,dynamicBgColor.length);
        // let dynamicBadgeColorsArray = dynamicBadgeColor[staticBgColor].concat("");
        let dynamicBadgeColorsArray = color[staticBgColor].concat("");
        return dynamicBadgeColorsArray;
    }

    function setNewAttributes(badge, newAttrList) {
        // push structured newAttrList to old attrList
        let attr1 = newAttrList[0];
        let attr2 = newAttrList[1]+"-"+newAttrList[2];
        let attr3 = newAttrList[3]+"-"+newAttrList[4];
        return Array(attr1,attr2,attr3);
    }

    // function setDynamicBackground(badge, badgeDynamicColorsArray) {
    //     return badgeDynamicColorsArray[0];
    // }

    function getBgColors(attrList) { // return the background color, as :
        // a single static color, 
        // or a dynamic couple 'color1-color2'
        if (attrList[BACKGROUND] == undefined || attrList[BACKGROUND] == "style") {
            return
        }
        if (color[attrList[BACKGROUND]]) { // there is (at least) one attribute, then get the first (the background)
            return color[attrList[BACKGROUND]][VALUE]
        } else {
            return attrList[BACKGROUND];
        }
    }

    function getBorderColors(attrList) { // return the border color, as :
        // a single static color, 
        // or a dynamic couple 'color1-color2'
        if (attrList[BORDER] == undefined || attrList[BORDER]=="style") {
            return
        }
        if (color[attrList[BORDER]]) { // there is (at least) one attribute, then get the first
            return color[attrList[BORDER]][VALUE]
        } else {
            return attrList[BORDER];
        }
    }

    function getTextColors(attrList) { // return the text color, as :
        // a single static color, 
        // or a dynamic couple 'color1-color2'
        if (attrList[TEXT] == undefined || attrList[TEXT]=="style") {
            return
        }
        if (color[attrList[TEXT]]) { // there is (at least) one attribute, then get the first
            return color[attrList[TEXT]][VALUE]
        } else {
            return attrList[TEXT];
        }
    }

    function isDualColor(name) { // returns if a color is static 'color1', or dynamic/dual 'color1-color2' 
        if (name === undefined || name =="style") {
            return
        } else {
            return name.includes("-");
        }
    }

    function setBgColor(badge, names) {
        let bgColor;
        if (names == undefined || names=="style") {
            return
        }
        if (isDualColor(names)) { // Dual Background
            // console.log("DUAL BACKGROUND");
            let bgColorArray = names.split("-");
            bgColor = themeIsLight() ? bgColorArray[LIGHT] : bgColorArray[DARK];
        } else { //single static color
            bgColor = names
        }
        badge.style.backgroundColor = bgColor;
    }

    function setBorderColor(badge, names) {
        if (names == undefined || names == "style") {
            return
        }
        let borderColor;
        if (isDualColor(names)) { // Dual Border
            // console.log("DUAL BORDER");
            let borderColorArray = names.split("-");
            borderColor = themeIsLight() ? borderColorArray[LIGHT] : borderColorArray[DARK];
        } else { //single static color
            borderColor = names
        }
        badge.style.borderBottom = "2px solid "+borderColor;
        badge.style.borderRight = "2px solid "+borderColor;
    }

    function setTextColor(badge, names) {
        if (names == undefined || names == "style") {
            return
        }
        let textColor;
        if (isDualColor(names)) { // Dual Text
            let textColorArray = names.split("-");
            textColor = themeIsLight() ? textColorArray[LIGHT] : textColorArray[DARK];
        } else { //single static color
            textColor = names
        }
        badge.style.color = textColor;
    }    

    function themeIsLight() {
        // if (document.body.getAttribute("data-md-color-scheme") == "default") {
        //     console.log("LIGHT THEME DETECTED");
        // } else {
        //     console.log("DARK THEME DETECTED");
        // }
        return document.body.getAttribute("data-md-color-scheme") == "default"
    }

    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type !== "attributes" &&
            mutation.attributeName !== "data-md-color-scheme"
          ) {
            return
          }
          update_badges();
        }
      };

    const observer = new MutationObserver(mutationCallback);

    let themeChange = document.querySelector("body");
    observer.observe(themeChange, { attributes: true });

});