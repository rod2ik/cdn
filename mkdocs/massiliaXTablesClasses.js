/* License: GNU GPLv3+, Rodrigo Schwencke (Copyleft) */

const LETTERS='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS='0123456789';
const OTHER_SYMBOLS=LETTERS+'-._';
const AUTHORIZED_CHARS=LETTERS+DIGITS+OTHER_SYMBOLS;
const AUTHORIZED_FIRST_CHARS=LETTERS+OTHER_SYMBOLS;

function getClassesIDsAndAttrArrayFromString(s){
  return s.trim().split(' ')
    .filter(a=>a!=='{').filter(a=>a!=='}')
    .map(attr=>{
      const n = attr.length;
      if (attr[0]==='{' && attr[1]===':' && attr[n-1]==='}' && attr[n-2]===':') return attr.substring(2,n-2);
      if (attr[0]==='{' && attr[n-1]==='}') return attr.substring(1,n-1);
      return attr;
    }).filter(Boolean);
}
function isValidString(s){
  if (typeof s!=='string' || !s.length) return false;
  if (!AUTHORIZED_FIRST_CHARS.includes(s[0])) return false;
  for (const c of s){ if (!AUTHORIZED_CHARS.includes(c)) return false; }
  return true;
}
function isValidClassString(s){ return (typeof s==='string' && s.length>1 && s[0]==='.' && isValidString(s.slice(1))); }
function isValidIDString(s){ return (typeof s==='string' && s.length>1 && s[0]==='#' && isValidString(s.slice(1))); }
function isValidAttributeString(s){
  if (typeof s!=='string' || !s.length) return false;
  if (!s.includes('=')) return isValidString(s);
  const i = s.indexOf('=');
  if (i===0 || i===s.length) return false;
  const s0 = s.substring(0,i), s1 = s.substring(i+1);
  if (!isValidString(s0)) return false;
  if (!((s1[0]==='"'&&s1.at(-1)==='"') || (s1[0]==="'"&&s1.at(-1)==="'"))) return false;
  return true;
}
function isValidArrayOfAttributes(arr){
  for (const a of arr){ if (!isValidClassString(a) && !isValidIDString(a) && !isValidAttributeString(a)) return false; }
  return true;
}

function getFirstCellOfLastTdContentOf(table){
  const node = table.querySelector("tbody tr:last-of-type td:first-of-type")?.childNodes[0];
  let s = node?.nodeValue;
  if (s) s = s.trim();
  return s;
}
function getLastRowOf(table){
  const trs = table.getElementsByTagName('tr');
  return trs[trs.length-1];
}
function getClassesIDsAndAttrArrayOf(table){
  const attrString = getFirstCellOfLastTdContentOf(table) || '';
  return getClassesIDsAndAttrArrayFromString(attrString);
}
function getTableClassList(table){
  return getClassesIDsAndAttrArrayOf(table).filter(a=>a[0]==='.');
}
function getTableIDsList(table){
  return getClassesIDsAndAttrArrayOf(table).filter(a=>a[0]==='#');
}
function getTableAttrList(table){
  return getClassesIDsAndAttrArrayOf(table).filter(a=>a[0]!=='.' && a[0]!=='#' && isValidAttributeString(a));
}
function lastButFirstCellsAreVoidIn(tr){
  for (let i=1;i<tr.children.length;i++){ if (tr.children[i].innerHTML!=='') return false; }
  return true;
}
function isWellFormatted(s){
  if (!s?.includes('{') || !s.includes('}')) return false;
  s = s.trim();
  const s0 = s.indexOf('{'), s1 = s.indexOf('}');
  const prefix = s.substring(0,s0).trim();
  const suffix = s.substring(s1+1).trim();
  if (prefix!=='' || suffix!=='') return false;
  if (s[0]==='{' && s[1]===':') s = s.substring(2).trim();
  if (s.at(-1)==='}' && s.at(-2)===':') s = s.substring(0, s.length-2).trim();
  const arr = getClassesIDsAndAttrArrayFromString(s);
  return isValidArrayOfAttributes(arr);
}
function formatIsOk(table){
  const firstCell = getFirstCellOfLastTdContentOf(table) || '';
  const lastRow = getLastRowOf(table);
  return lastButFirstCellsAreVoidIn(lastRow) && isWellFormatted(firstCell);
}

export function init(root=document){
  console.log('[massilia-xtables-classes] init');
  root.querySelectorAll("table:not([data-massilia-xt-classes])").forEach(table=>{
    if (!formatIsOk(table)) return;

    const classList = getTableClassList(table);
    const ids = getTableIDsList(table);
    const attrs = getTableAttrList(table);

    if (classList.length){
      table.classList.add(...classList.map(c=>c.substring(1)));
    }
    if (ids.length){
      for (const id of ids){ table.setAttribute('id', id.substring(1)); }
    }
    if (attrs.length){
      for (const a of attrs){
        const [prop, val] = a.split('=');
        const n = val.length;
        table.setAttribute(prop, val.substring(1, n-1));
      }
    }
    getLastRowOf(table).remove();
    table.dataset.massiliaXtClasses = '1';
  });
}
