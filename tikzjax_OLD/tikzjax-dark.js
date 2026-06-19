// /* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */
window.addEventListener('load', function() {
    console.log("tikzjax-dark PAGE LOADED");
    
    const defaultBackgroundColor = "hsla(225deg,15%,14%,1)";    // slate scheme background color

    var tikzSvg = document.querySelector("svg.tikzjax:first-of-type");
    console.log("tikzSvg=", tikzSvg);

    document.querySelectorAll("svg.tikzjax *[stroke]")
    .forEach( el => {
        console.log(el);
    });

    update_theme();

    function swapValue(value) {
        if ( value === "#000") return "#fff";
        if ( value === "#fff") return defaultBackgroundColor;
        if ( value === defaultBackgroundColor) return "#fff";
        if ( value === "black") return "white";
        if ( value === "white") return "black";
        if ( value === "none") return "none";
        if ( value.length >=1 && value[0] !== '#' ) return value;   // not an hexadecimal coded color
        return inverserCouleur(value); // for color tkz-tab tables
    }
    
    function swapElementAttribute(el, attrib) {
        let attribute = el.getAttribute(attrib);
        el.setAttribute(attrib, swapValue(attribute));
        // el.style.setProperty(attrib, swapValue(attribute),"important");
    }
    
    function swapAllQueryElementsAttribute(cssQuery, attrib) {
        document.querySelectorAll(cssQuery)
            .forEach( el => {
                swapElementAttribute(el, attrib);
            });
    }

    function inverserCouleur(hex) {
        // Vérification du format de la couleur hexadécimale
        hex = hex.toUpperCase();
        if (hex.length === 4 && hex[0] === "#") { // hex ='#cfd' for example
            hex = "#"+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
        }
     
        if (!/^#[0-9A-F]{6}$/i.test(hex)) {
            throw new Error('Couleur hexadécimale invalide');
        }
    
        // Enlever le '#' et extraire les composantes RGB
        hex = hex.slice(1);
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
    
        // Calcul de la luminosité
        let luminosite = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        console.log("luminosite=", luminosite);

        // Si la couleur est claire (luminosité élevée), foncer (diminuer les composantes)
        if (luminosite > 128) {
            // Foncer la couleur (en diminuant les valeurs RGB)
            r = Math.floor(Math.max(0.5*r, 0));  // Assurer que la valeur ne soit pas négative
            g = Math.floor(Math.max(0.5*g, 0));
            b = Math.floor(Math.max(0.5*b, 0));
        } else {
            // Sinon, éclaircir la couleur (augmenter les valeurs RGB)
            r = Math.min(2*r, 255);  // Assurer que la valeur ne dépasse pas 255
            g = Math.min(2*g, 255);
            b = Math.min(2*b, 255);
        }

        // Convertir les valeurs RGB modifiées en hexadécimal
        let hexR = r.toString(16).padStart(2, '0');
        let hexG = g.toString(16).padStart(2, '0');
        let hexB = b.toString(16).padStart(2, '0');
    
        // Retourner la couleur modifiée sous forme hexadécimale
        return `#${hexR}${hexG}${hexB}`;
        }        

    function update_theme() {
        console.log("UPDATE THEME from TIKZJAX-DARK...");

        const body = document.body;
        if (body.hasAttribute('data-md-color-scheme')) {
            swapAllQueryElementsAttribute("svg.tikzjax *[stroke]", "stroke")
            swapAllQueryElementsAttribute("svg.tikzjax *[fill]", "fill")
        } else {
            console.log('Material theme is NOT active');
        }

        // other_function_to_update();
    }

    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type !== "attributes" &&
            mutation.attributeName !== "data-md-color-scheme"
          ) {
            return
          }

          if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
            // Check if theme-related classes are added/removed
            update_theme();
        }
        }
      };
    
      const observer = new MutationObserver(mutationCallback);
    
      let themeChange = document.querySelector("body");
      observer.observe(themeChange, { attributes: true });

      let theme = document.querySelector("body").getAttribute("data-md-color-scheme");
      console.log("theme=", theme);

      if (theme === "slate") {
        console.log("FIRST DETECTED");
        // document.querySelectorAll("svg.tikzjax *[stroke]")
        document.querySelectorAll("svg.tikzjax")
            .forEach( el => { 
                if (el) {
                    console.log("DETECTÉ")
                    console.log(el)
                } else {
                    console.log("NO TIKZJAX SVG ELEMENT WITH STROKE")       ;             
                }
            })
      }
})