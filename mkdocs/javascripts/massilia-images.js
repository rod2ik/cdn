/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    console.log("MASSILIA IMAGES.JS LOADED");

    /* ====================================================================== */
    /*                       Get Images                              */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset p img")
    .forEach( img => {
        // XXX
        let naturalWidth = img.naturalWidth;
        let imgWidthAttribute = img.getAttribute("width");
        let altText = img.getAttribute("alt");
        let imgClassList = img.classList;
        let parentP = img.parentElement;
        let parentOfParentP = img.parentElement.parentElement;

        console.log("img=",img);
        console.log("img natural width=",naturalWidth);
        console.log("img get attribute width=",imgWidthAttribute);
        console.log("type of get attribute width=",typeof imgWidthAttribute);
        console.log("alt text=",altText);
        console.log("parentP=",parentP);
        console.log("imgClassList=",imgClassList);

        // XX
        let figure = this.document.createElement("figure");
        let figcaption = this.document.createElement("figcaption");
        let altTextElement = this.document.createTextNode(altText);
        if (!imgClassList.length == 0) {
            imgClassList.forEach( classItem => {
                figure.classList.add(classItem);
            });
        }
        figure.style.width = imgWidthAttribute;
        img.style.width = "100%";
        figure.appendChild(img);
        figcaption.appendChild(altTextElement);
        figcaption.style.display = "block";
        figure.appendChild(figcaption);
        parentOfParentP.replaceChild(figure,parentP);
    });

});