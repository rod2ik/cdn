/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

var replaceBy = {
  "definition": "Définition ",
  "lemma": "Lemme ",
  "property": "Propriété ",
  "proposition": "Proposition ",
  "theorem": "Théorème ",
  "exercice": "Exercice ",
  "example": "Exemple ",
  "method": "Méthode ",
  "python": "Python ",
  "notation": "Notation ",
  "reponse": "Réponse ",
  "corrige": "Corrigé ",
  "jeretiens": "Je Retiens "
}

function toAdmonitionClassString(array) {
  var s = "";
  array.forEach(element => {
    s += ".admonition."+element.toLowerCase()+", " // !!! Normal Admonitions
    s += "details."+element.toLowerCase()+", "     // ??? Expandible Admonition Blocks
  });
  return s.substring(0,s.length-2).trim();
} 

// Définitions
var defRendering = ["Def", "Définition", "Definition"];
var admonitionDef = toAdmonitionClassString(defRendering);
var def = document.querySelectorAll(admonitionDef);
var nbDef = def.length;
for (let i = 0; i < nbDef; i++) {
    if (defRendering.includes(def[i].firstElementChild.innerHTML)) {
      def[i].firstElementChild.innerHTML = replaceBy["definition"]+(i+1)+".";
    } else {
      def[i].firstElementChild.innerHTML = replaceBy["definition"]+(i+1)+". "+def[i].firstElementChild.innerHTML
    }
  }

  // Lemmes
var lemRendering = ["Lem", "Lemme", "Lemma"];
var admonitionLem = toAdmonitionClassString(lemRendering);
var lem = document.querySelectorAll(admonitionLem);
var nbLemmes = lem.length;
for (let i = 0; i < nbLemmes; i++) {
  if (lemRendering.includes(lem[i].firstElementChild.innerHTML)) {
    lem[i].firstElementChild.innerHTML = replaceBy["lemma"]+(i+1)+".";
  } else {
    lem[i].firstElementChild.innerHTML = replaceBy["lemma"]+(i+1)+". "+lem[i].firstElementChild.innerHTML
  }
}

// Propriétés
var pteRendering = ["Pte", "Propriete", "Propriété", "Property"];
var admonitionPte = toAdmonitionClassString(pteRendering);
var pte = document.querySelectorAll(admonitionPte);
var nbPtes = pte.length;
for (let i = 0; i < nbPtes; i++) {
  if (pteRendering.includes(pte[i].firstElementChild.innerHTML)) {
    pte[i].firstElementChild.innerHTML = replaceBy["property"]+(i+1)+".";
  } else {
    pte[i].firstElementChild.innerHTML = replaceBy["property"]+(i+1)+". "+pte[i].firstElementChild.innerHTML
  }
}

// Propositions
var propRendering = ["Prop", "Proposition"];
var admonitionProp = toAdmonitionClassString(propRendering);
var prop = document.querySelectorAll(admonitionProp);
var nbProp = prop.length;
for (let i = 0; i < nbProp; i++) {
  if (propRendering.includes(prop[i].firstElementChild.innerHTML)) {
    prop[i].firstElementChild.innerHTML = replaceBy["proposition"]+(i+1)+".";
  } else {
    prop[i].firstElementChild.innerHTML = replaceBy["proposition"]+(i+1)+". "+prop[i].firstElementChild.innerHTML
  }
}

// Théorèmes
var thmRendering = ["Thm", "Théorème", "Theoreme", "Theorem"];
var admonitionThm = toAdmonitionClassString(thmRendering);
var thm = document.querySelectorAll(admonitionThm);
var nbThm = thm.length;
for (let i = 0; i < nbThm; i++) {
  if (thmRendering.includes(thm[i].firstElementChild.innerHTML)) {
    thm[i].firstElementChild.innerHTML = replaceBy["theorem"]+(i+1)+".";
  } else {
    thm[i].firstElementChild.innerHTML = replaceBy["theorem"]+(i+1)+". "+thm[i].firstElementChild.innerHTML
  }
}

// Exercices
var exRendering = ["Ex", "Exo", "Exercice"];
var admonitionEx = toAdmonitionClassString(exRendering);
var ex = document.querySelectorAll(admonitionEx);
var nbEx = ex.length;
for (let i = 0; i < nbEx; i++) {
  if (exRendering.includes(ex[i].firstElementChild.innerHTML)) {
    ex[i].firstElementChild.innerHTML = replaceBy["exercice"]+(i+1)+".";
  } else {
    ex[i].firstElementChild.innerHTML = replaceBy["exercice"]+(i+1)+". "+ex[i].firstElementChild.innerHTML
  }
}

// Exemples
var expRendering = ["Exp", "Exemple", "Example"];
var admonitionExp = toAdmonitionClassString(expRendering);
var exp = document.querySelectorAll(admonitionExp);
var nbExp = exp.length;
for (let i = 0; i < nbExp; i++) {
  if (expRendering.includes(exp[i].firstElementChild.innerHTML)) {
    exp[i].firstElementChild.innerHTML = replaceBy["example"]+(i+1)+".";
  } else {
    exp[i].firstElementChild.innerHTML = replaceBy["example"]+(i+1)+". "+exp[i].firstElementChild.innerHTML
  }
}

// Méthodes
var mthRendering = ["Mth", "Méthode", "Methode", "Method"];
var admonitionMth = toAdmonitionClassString(mthRendering);
var mth = document.querySelectorAll(admonitionMth);
var nbMth = mth.length;
for (let i = 0; i < nbMth; i++) {
  if (mthRendering.includes(mth[i].firstElementChild.innerHTML)) {
    mth[i].firstElementChild.innerHTML = replaceBy["method"]+(i+1)+".";
  } else {
    mth[i].firstElementChild.innerHTML = replaceBy["method"]+(i+1)+". "+mth[i].firstElementChild.innerHTML
  }
}

// Python
var pyRendering = ["Python", "Py"];
var admonitionPy = toAdmonitionClassString(pyRendering);
var py = document.querySelectorAll(admonitionPy);
var nbPy = py.length;
for (let i = 0; i < nbPy; i++) {
  if (pyRendering.includes(py[i].firstElementChild.innerHTML)) {
    py[i].firstElementChild.innerHTML = replaceBy["python"]+(i+1)+".";
  } else {
    py[i].firstElementChild.innerHTML = replaceBy["python"]+(i+1)+". "+py[i].firstElementChild.innerHTML
  }
}

// Notation
var notRendering = ["Not", "Nota", "Notation"];
var admonitionNotation = toAdmonitionClassString(notRendering);
var notation = document.querySelectorAll(admonitionNotation);
var nbNotation = notation.length;
for (let i = 0; i < nbNotation; i++) {
  if (notRendering.includes(notation[i].firstElementChild.innerHTML)) {
    notation[i].firstElementChild.innerHTML = replaceBy["notation"]+(i+1)+".";
  } else {
    notation[i].firstElementChild.innerHTML = replaceBy["notation"]+(i+1)+". "+notation[i].firstElementChild.innerHTML
  }
}

// Réponse
var repRendering = ["Rep", "Rép", "Reponse", "Réponse", "Answer"];
var admonitionReponse = toAdmonitionClassString(repRendering);
var reponse = document.querySelectorAll(admonitionReponse);
var nbReponse = reponse.length;
for (let i = 0; i < nbReponse; i++) {
  if (repRendering.includes(reponse[i].firstElementChild.innerHTML)) {
    reponse[i].firstElementChild.innerHTML = replaceBy["reponse"]+(i+1)+".";
  } else {
    reponse[i].firstElementChild.innerHTML = replaceBy["reponse"]+(i+1)+". "+reponse[i].firstElementChild.innerHTML
  }
}

// Corrigé
var corRendering = ["Cor", "Corr", "Corrige", "Corrigé", "Correction"];
var admonitionCorrige = toAdmonitionClassString(corRendering);
var corrige = document.querySelectorAll(admonitionCorrige);
var nbCorrige = corrige.length;
for (let i = 0; i < nbCorrige; i++) {
  if (corRendering.includes(corrige[i].firstElementChild.innerHTML)) {
    corrige[i].firstElementChild.innerHTML = replaceBy["corrige"]+(i+1)+".";
  } else {
    corrige[i].firstElementChild.innerHTML = replaceBy["corrige"]+(i+1)+". "+corrige[i].firstElementChild.innerHTML
  }
}

// Jeretiens
var jeretiensRendering = ["Jeretiens", "Iremember"];
var admonitionJeretiens = toAdmonitionClassString(jeretiensRendering);
var jeretiens = document.querySelectorAll(admonitionJeretiens);
var nbJeretiens = jeretiens.length;
for (let i = 0; i < nbJeretiens; i++) {
  if (jeretiensRendering.includes(jeretiens[i].firstElementChild.innerHTML)) {
    jeretiens[i].firstElementChild.innerHTML = replaceBy["jeretiens"]+(i+1)+".";
  } else {
    jeretiens[i].firstElementChild.innerHTML = replaceBy["jeretiens"]+(i+1)+". "+jeretiens[i].firstElementChild.innerHTML
  }
}

