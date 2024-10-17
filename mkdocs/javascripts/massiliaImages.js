/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function () {
    // console.log("massilia-images PAGE LOADED");

    /* ====================================================================== */
    /*                       Get Images                              */
    /* ====================================================================== */
    // document.querySelectorAll(".md-typeset p")
    document.querySelectorAll(".md-content p")
        .forEach(p => {
            Array.from(p.children).forEach(el => {
                if (el.tagName == "IMG") {
                    let img = el;
                    // get Infos
                    let imgWidthAttribute = img.getAttribute("width");
                    let altText = img.getAttribute("alt");
                    if (altText == null) {
                        altText = "";
                    }
                    let imgClassList = img.classList;
                    // let parentP = img.parentElement;
                    // let parentOfParentP = img.parentElement.parentElement;
                    let parentP = p;
                    let parentOfParentP = p.parentElement;

                    if (!img.classList.contains("twemoji") && !img.classList.contains("emojione")) { //emojis are not treated
                        // create HTML container Elements
                        let figure = this.document.createElement("figure");
                        figure.classList.add("center");
                        let figcaption = this.document.createElement("figcaption");
                        figcaption.classList.add("center");
                        let altTextElement = this.document.createTextNode(altText);
                        if (!imgClassList.length == 0) {
                            imgClassList.forEach(classItem => {
                                figure.classList.add(classItem);
                            });
                        }
                        figure.style.width = imgWidthAttribute;
                        img.style.width = "100%";
                        figure.appendChild(img);
                        figcaption.appendChild(altTextElement);
                        figcaption.style.display = "block";
                        figure.appendChild(figcaption);
                        p.appendChild(figure);
                    } // End of Emojis not Treated
                } // End of Image Elements
            });
        });
})