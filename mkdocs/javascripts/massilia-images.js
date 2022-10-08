/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
    // console.log("massilia-images PAGE LOADED");

    /* ====================================================================== */
    /*                       Get Images                              */
    /* ====================================================================== */
    document.querySelectorAll(".md-typeset p img")
    .forEach( img => {
        // get Infos
        let imgWidthAttribute = img.getAttribute("width");
        let altText = img.getAttribute("alt");
        let imgClassList = img.classList;
        let parentP = img.parentElement;
        let parentOfParentP = img.parentElement.parentElement;

        // create HTML container Elements
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
        if (parentOfParentP) {
            parentOfParentP.replaceChild(figure,parentP);
        }
    });

});