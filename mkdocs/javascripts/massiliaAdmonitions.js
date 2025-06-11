/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

window.addEventListener('load', function() {
  // console.log("massilia-admonitions PAGE LOADED");

var replaceBy = {
  "anecdote": "Anecdote ",
  "axiom": "Axiome ",
  "challenge": "Challenge ",
  "consequence": "Conséquence ",
  "corollary": "Corollaire ",
  "corrige": "Corrigé ",
  "definition": "Définition ",
  "exercice": "Exercice ",
  "exemple": "Exemple ",
  "film": "Films ",
  "iremember": "Je Retiens ",
  "lemma": "Lemme ",
  "method": "Méthode ",
  "notation": "Notation ",
  "problem": "Problème ",
  "problematique": "Problématique ",
  "property": "Propriété ",
  "proposition": "Proposition ",
  "proof": "Démonstration ",
  "python": "Python ",
  "reponse": "Réponse ",
  "reference": "Références ",
  "summary": "Résumé ",
  "theorem": "Théorème ",
  "thesis": "Thèse "
}

function toAdmonitionClassString(array) {
  var s = "";
  array.forEach(element => {
    s += ".admonition."+element.toLowerCase()+", ";
    s += "details."+element.toLowerCase()+", ";
  });
  return s.substring(0,s.length-2).trim();
}

// Anec - Anecdote - Funfact
var anecdotesRendering = ["Anec", "Anecdote", "Funfact"];
var admonitionAnecdotes = toAdmonitionClassString(anecdotesRendering);
var anecdotes = document.querySelectorAll(admonitionAnecdotes);
var nbAnecdotes = anecdotes.length;
for (let i = 0; i < nbAnecdotes; i++) {
  if (anecdotesRendering.includes(anecdotes[i].firstElementChild.innerHTML)) {
    anecdotes[i].firstElementChild.innerHTML = replaceBy["anecdote"]+(i+1)+".";
  } else {
    anecdotes[i].firstElementChild.innerHTML = replaceBy["anecdote"]+(i+1)+". "+anecdotes[i].firstElementChild.innerHTML
  }
}

// Ax - Axiom - Axiome
var axiomsRendering = ["Ax", "Axiom", "Axiome"];
var admonitionAxioms = toAdmonitionClassString(axiomsRendering);
var axioms = document.querySelectorAll(admonitionAxioms);
var nbAxioms = axioms.length;
for (let i = 0; i < nbAxioms; i++) {
  if (axiomsRendering.includes(axioms[i].firstElementChild.innerHTML)) {
    axioms[i].firstElementChild.innerHTML = replaceBy["axiom"]+(i+1)+".";
  } else {
    axioms[i].firstElementChild.innerHTML = replaceBy["axiom"]+(i+1)+". "+axioms[i].firstElementChild.innerHTML
  }
}

// chlg - Challenge
var challengeRendering = ["Chlg", "Challenge"];
var admonitionChallenges = toAdmonitionClassString(challengeRendering);
var challenges = document.querySelectorAll(admonitionChallenges);
var nbChallenges = challenges.length;
for (let i = 0; i < nbChallenges; i++) {
  if (challengeRendering.includes(challenges[i].firstElementChild.innerHTML)) {
    challenges[i].firstElementChild.innerHTML = replaceBy["challenge"]+(i+1)+".";
  } else {
    challenges[i].firstElementChild.innerHTML = replaceBy["challenge"]+(i+1)+". "+challenges[i].firstElementChild.innerHTML
  }
}

// Cons - Consq - Conseq - Consequence - Conséquence
var consequencesRendering = ["Cons", "Consq", "Conseq", "Consequence", "Conséquence"];
var admonitionConsequences = toAdmonitionClassString(consequencesRendering);
var consequences = document.querySelectorAll(admonitionConsequences);
var nbConsequences = consequences.length;
for (let i = 0; i < nbConsequences; i++) {
  if (consequencesRendering.includes(consequences[i].firstElementChild.innerHTML)) {
    consequences[i].firstElementChild.innerHTML = replaceBy["consequence"]+(i+1)+".";
  } else {
    consequences[i].firstElementChild.innerHTML = replaceBy["consequence"]+(i+1)+". "+consequences[i].firstElementChild.innerHTML
  }
}

// Cor - Corol - Coroll - Corollary - Corollaire
var corollariesRendering = ["Cor", "Corol", "Coroll", "Corollary", "Corollaire"];
var admonitionCorollaries = toAdmonitionClassString(corollariesRendering);
var corollaries = document.querySelectorAll(admonitionCorollaries);
var nbCorollaries = corollaries.length;
for (let i = 0; i < nbCorollaries; i++) {
  if (corollariesRendering.includes(corollaries[i].firstElementChild.innerHTML)) {
    corollaries[i].firstElementChild.innerHTML = replaceBy["corollary"]+(i+1)+".";
  } else {
    corollaries[i].firstElementChild.innerHTML = replaceBy["corollary"]+(i+1)+". "+corollaries[i].firstElementChild.innerHTML
  }
}

// Corr - Corrige - Corrigé - Correction
var corrigeRendering = ["Corr", "Corrige", "Corrigé", "Correction"];
var admonitionCorrige = toAdmonitionClassString(corrigeRendering);
var corrige = document.querySelectorAll(admonitionCorrige);
var nbCorrige = corrige.length;
for (let i = 0; i < nbCorrige; i++) {
  if (corrigeRendering.includes(corrige[i].firstElementChild.innerHTML)) {
    corrige[i].firstElementChild.innerHTML = replaceBy["corrige"]+(i+1)+".";
  } else {
    corrige[i].firstElementChild.innerHTML = replaceBy["corrige"]+(i+1)+". "+corrige[i].firstElementChild.innerHTML
  }
}

// Def - Déf - Definition - Définition
var defRendering = ["Def", "Déf", "Definition", "Définition"];
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

// Ex - Exo - Exercice
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

// Exp - Example - Exemple
var expRendering = ["Exp", "Example", "Exemple"];
var admonitionExp = toAdmonitionClassString(expRendering);
var exp = document.querySelectorAll(admonitionExp);
var nbExp = exp.length;
for (let i = 0; i < nbExp; i++) {
  if (expRendering.includes(exp[i].firstElementChild.innerHTML)) {
    exp[i].firstElementChild.innerHTML = replaceBy["exemple"]+(i+1)+".";
  } else {
    exp[i].firstElementChild.innerHTML = replaceBy["exemple"]+(i+1)+". "+exp[i].firstElementChild.innerHTML
  }
}

// Film - Movie
var filmsRendering = ["Film", "Movie"];
var admonitionFilms = toAdmonitionClassString(filmsRendering);
var films = document.querySelectorAll(admonitionFilms);
var nbFilms = films.length;
for (let i = 0; i < nbFilms; i++) {
  if (filmsRendering.includes(films[i].firstElementChild.innerHTML)) {
    films[i].firstElementChild.innerHTML = replaceBy["film"]+(i+1)+".";
  } else {
    films[i].firstElementChild.innerHTML = replaceBy["film"]+(i+1)+". "+films[i].firstElementChild.innerHTML
  }
}

// Iremember - Jeretiens
var jeretiensRendering = ["Jeretiens", "Iremember"];
var admonitionJeretiens = toAdmonitionClassString(jeretiensRendering);
var jeretiens = document.querySelectorAll(admonitionJeretiens);
var nbJeretiens = jeretiens.length;
for (let i = 0; i < nbJeretiens; i++) {
  if (jeretiensRendering.includes(jeretiens[i].firstElementChild.innerHTML)) {
    jeretiens[i].firstElementChild.innerHTML = replaceBy["iremember"]+(i+1)+".";
  } else {
    jeretiens[i].firstElementChild.innerHTML = replaceBy["iremember"]+(i+1)+". "+jeretiens[i].firstElementChild.innerHTML
  }
}

// Lem - Lemma - Lemme
var lemRendering = ["Lem", "Lemma", "Lemme"];
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

// Mth - Method - Méthode - Methode
var mthRendering = ["Mth", "Method", "Methode", "Méthode"];
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

// Not - Nota - Notation
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

// Prob - Problem - Probleme - Problème
var problemRendering = ["Prob",  "Problem", "Probleme", "Problème"];
var admonitionProblem = toAdmonitionClassString(problemRendering);
var problem = document.querySelectorAll(admonitionProblem);
var nbProblem = problem.length;
for (let i = 0; i < nbProblem; i++) {
  if (problemRendering.includes(problem[i].firstElementChild.innerHTML)) {
    problem[i].firstElementChild.innerHTML = replaceBy["problem"]+(i+1)+".";
  } else {
    problem[i].firstElementChild.innerHTML = replaceBy["problem"]+(i+1)+". "+problem[i].firstElementChild.innerHTML
  }
}

// pbst - Problemstatement - probx - Problematique - Problématique
var problematiqueRendering = ["Pbst",  "Problemstatement", "Probx", "Problematique", "Problématique"];
var admonitionProblematique = toAdmonitionClassString(problematiqueRendering);
var problematique = document.querySelectorAll(admonitionProblematique);
var nbProblematiques = problematique.length;
for (let i = 0; i < nbProblematiques; i++) {
  if (problematiqueRendering.includes(problematique[i].firstElementChild.innerHTML)) {
    problematique[i].firstElementChild.innerHTML = replaceBy["problematique"]+(i+1)+".";
  } else {
    problematique[i].firstElementChild.innerHTML = replaceBy["problematique"]+(i+1)+". "+problematique[i].firstElementChild.innerHTML
  }
}

// Pte - Pté - Propriete - Propriété - Property
var pteRendering = ["Pte", "Pté", "Propriete", "Propriété", "Property"];
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

// Prop - Proposition
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

// Proof - Demo - Démo - Demonstration - Preuve - Démonstration
var proofRendering = ["Proof", "Demo", "Démo", "Demonstration", "Preuve", "Démonstration" ];
var admonitionProof = toAdmonitionClassString(proofRendering);
var proof = document.querySelectorAll(admonitionProof);
var nbProof = proof.length;
for (let i = 0; i < nbProof; i++) {
  if (proofRendering.includes(proof[i].firstElementChild.innerHTML)) {
    proof[i].firstElementChild.innerHTML = replaceBy["proof"]+(i+1)+".";
  } else {
    proof[i].firstElementChild.innerHTML = replaceBy["proof"]+(i+1)+". "+proof[i].firstElementChild.innerHTML
  }
}

// Py - Python
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

// Ref - Réf - Reference - Référence
var referencesRendering = ["Ref", "Réf", "Reference", "Référence"];
var admonitionReferences = toAdmonitionClassString(referencesRendering);
var references = document.querySelectorAll(admonitionReferences);
var nbReferences = references.length;
for (let i = 0; i < nbReferences; i++) {
  if (referencesRendering.includes(references[i].firstElementChild.innerHTML)) {
    references[i].firstElementChild.innerHTML = replaceBy["reference"]+(i+1)+".";
  } else {
    references[i].firstElementChild.innerHTML = replaceBy["reference"]+(i+1)+". "+references[i].firstElementChild.innerHTML
  }
}

// Rep - Rép - Reponse - Réponse - Answer
var repRendering = ["Answer", "Rep", "Rép", "Reponse", "Réponse"];
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

// Summary - Res - Resume - Résumé
var summariesRendering = ["Summary", "Res", "Rés", "Resume", "Résumé"];
var admonitionSummaries = toAdmonitionClassString(summariesRendering);
var summaries = document.querySelectorAll(admonitionSummaries);
var nbSummaries = summaries.length;
for (let i = 0; i < nbSummaries; i++) {
  if (summariesRendering.includes(summaries[i].firstElementChild.innerHTML)) {
    summaries[i].firstElementChild.innerHTML = replaceBy["summary"]+(i+1)+".";
  } else {
    summaries[i].firstElementChild.innerHTML = replaceBy["summary"]+(i+1)+". "+summaries[i].firstElementChild.innerHTML
  }
}

// Thm - Theorem - Theoreme - Théorème
var thmRendering = ["Thm", "Theorem", "Theoreme", "Théorème"];
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

// Ths - Thesis - These - Thèse
var thesisRendering = ["Ths", "Thesis", "These", "Thèse"];
var admonitionThesis = toAdmonitionClassString(thesisRendering);
var thesis = document.querySelectorAll(admonitionThesis);
var nbThesis = thesis.length;
for (let i = 0; i < nbThesis; i++) {
  if (thesisRendering.includes(thesis[i].firstElementChild.innerHTML)) {
    thesis[i].firstElementChild.innerHTML = replaceBy["thesis"]+(i+1)+".";
  } else {
    thesis[i].firstElementChild.innerHTML = replaceBy["thesis"]+(i+1)+". "+thesis[i].firstElementChild.innerHTML
  }
}



});