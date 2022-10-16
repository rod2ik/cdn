/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

import color from './htmlColors.js';

window.addEventListener('load', function() {
    console.log("massilia-badges PAGE LOADED");

    let conf = getConfOptions();
    
    /* ====================================================================== */
    /*                             Get Badges                                 */
    /* ====================================================================== */
        
    const LIGHT = 0;
    const DARK = 1;
    const BACKGROUND = 0;
    const BORDER = 1;
    const TEXT = 2;
    const BORDER_LIGHT = 1;
    const BORDER_DARK = 2;
    const TEXT_LIGHT = 3;
    const TEXT_DARK = 4;
    const VALUE = 0;
    let DEFAULT = "yellow";

    update_badges();

    function update_badges() {
        document.querySelectorAll(".md-typeset badge, .md-typeset bad, .md-typeset bd")
        .forEach( badge => {
            let attrList = badge.getAttributeNames();
            if (!attrList.includes("style")) { 
                // style attribute is added on first load, so let's fake it in advance, to count it
                attrList.push("style");
            }
            let bgColor;
            let borderColor;
            let textColor;

            setUserOptions(conf, badge, attrList);

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

    function setUserOptions(conf, badge, attrList) {
        setDefaultVoidBadgeOptions(conf, badge, attrList);
    }

    function setDefaultVoidBadgeOptions(conf, badge, attrList) {
        let voidBadgeBgStyle;
        let voidBadgeBorderStyle;
        let voidBadgeTextStyle;
        if (attrList.length == 1) { // Void Badge default behavior : <badge>Hey</badge>
            if (Object.keys(conf).length == 1) {
                DEFAULT = conf.badges.default;
            } 
            voidBadgeBgStyle = color[DEFAULT][BACKGROUND];
            voidBadgeBorderStyle = color[DEFAULT][BORDER_LIGHT]+"-"+color[DEFAULT][BORDER_DARK];
            voidBadgeTextStyle = color[DEFAULT][TEXT_LIGHT]+"-"+color[DEFAULT][TEXT_DARK];
            setBgColor(badge, voidBadgeBgStyle);
            setBorderColor(badge, voidBadgeBorderStyle);
            setTextColor(badge, voidBadgeTextStyle);
            attrList = [voidBadgeBgStyle, voidBadgeBorderStyle, voidBadgeTextStyle];
        }
    }

    function hasDynamicColor(badge) {
        return badge.getAttributeNames() != [] ? (badge.getAttributeNames()[BACKGROUND][0] == "@") : false;
    }

    function getTheDynamicColorsArrayOf(badge) {
        let dynamicBgColor = badge.getAttributeNames()[BACKGROUND];
        let staticBgColor = dynamicBgColor.substring(1,dynamicBgColor.length);
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

    function getConfOptions() {
        let data;
        document.querySelectorAll("massilia").forEach( confTag => {
            data = confTag.getAttribute("data");
            // console.log("data=", data);
            data = replaceSingleByDoubleQuotes(data);
            console.log("data=", data);
            if (data != "") {
                data = JSON.parse(data);
            } else {
                data = {}
            }
        });
        return data;
    }

    function replaceSingleByDoubleQuotes(data) {
        let s = "";
        Array.from(data).forEach( c => {
            if (c == "'") {
                c = '"';
            }
            s = s + c;
        });
        return s
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