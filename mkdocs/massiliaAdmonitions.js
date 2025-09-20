/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

const processedFlag = 'data-massilia-admon-processed';

function toAdmonitionClassString(arr){
  let s = '';
  arr.forEach(el=>{
    s += `.admonition.${el.toLowerCase()}, details.${el.toLowerCase()}, `;
  });
  return s.slice(0, -2).trim();
}

const replaceBy = {
  anecdote: 'Anecdote ',
  axiom: 'Axiome ',
  challenge: 'Challenge ',
  consequence: 'Conséquence ',
  corollary: 'Corollaire ',
  corrige: 'Corrigé ',
  definition: 'Définition ',
  exercice: 'Exercice ',
  exemple: 'Exemple ',
  film: 'Films ',
  iremember: 'Je Retiens ',
  lemma: 'Lemme ',
  method: 'Méthode ',
  notation: 'Notation ',
  problem: 'Problème ',
  problematique: 'Problématique ',
  proposition: 'Proposition ',
  property: 'Propriété ',
  proof: 'Démonstration ',
  python: 'Python ',
  reponse: 'Réponse ',
  reference: 'Références ',
  summary: 'Résumé ',
  theorem: 'Théorème ',
  thesis: 'Thèse '
};

function labelAll(root, renderings, key){
  const sel = toAdmonitionClassString(renderings);
  root.querySelectorAll(sel).forEach((node, i)=>{
    if (node.hasAttribute(processedFlag)) return;
    const h = node.firstElementChild;
    if (!h) return;
    const label = `${replaceBy[key]}${i+1}.`;
    const head = (h.innerHTML || '').trim();
    if (renderings.includes(head)) {
      h.innerHTML = label;
    } else if (!head.startsWith(replaceBy[key])) {
      h.innerHTML = `${label} ${head}`;
    }
    node.setAttribute(processedFlag, '1');
  });
}

export function init(root=document){
  console.log('[massilia-admonitions] init');

  labelAll(root, ['Anec','Anecdote','Funfact'], 'anecdote');
  labelAll(root, ['Ax','Axiom','Axiome'], 'axiom');
  labelAll(root, ['Chlg','Challenge'], 'challenge');
  labelAll(root, ['Cons','Consq','Conseq','Consequence','Conséquence'], 'consequence');
  labelAll(root, ['Cor','Corol','Coroll','Corollary','Corollaire'], 'corollary');
  labelAll(root, ['Corr','Corrige','Corrigé','Correction'], 'corrige');
  labelAll(root, ['Def','Déf','Definition','Définition'], 'definition');
  labelAll(root, ['Ex','Exo','Exercice'], 'exercice');
  labelAll(root, ['Exp','Example','Exemple'], 'exemple');
  labelAll(root, ['Film','Movie'], 'film');
  labelAll(root, ['Jeretiens','Iremember'], 'iremember');
  labelAll(root, ['Lem','Lemma','Lemme'], 'lemma');
  labelAll(root, ['Mth','Method','Methode','Méthode'], 'method');
  labelAll(root, ['Not','Nota','Notation'], 'notation');
  labelAll(root, ['Prob','Problem','Probleme','Problème'], 'problem');
  labelAll(root, ['Pbst','Problemstatement','Probx','Problematique','Problématique'], 'problematique');
  labelAll(root, ['Prop','Proposition'], 'proposition');
  labelAll(root, ['Pte','Pté','Propriete','Propriété','Property'], 'property');
  labelAll(root, ['Proof','Demo','Démo','Demonstration','Preuve','Démonstration'], 'proof');
  labelAll(root, ['Python','Py'], 'python');
  labelAll(root, ['Answer','Rep','Rép','Reponse','Réponse'], 'reponse');
  labelAll(root, ['Ref','Réf','Reference','Référence'], 'reference');
  labelAll(root, ['Summary','Res','Rés','Resume','Résumé'], 'summary');
  labelAll(root, ['Thm','Theorem','Theoreme','Théorème'], 'theorem');
  labelAll(root, ['Ths','Thesis','These','Thèse'], 'thesis');
}
