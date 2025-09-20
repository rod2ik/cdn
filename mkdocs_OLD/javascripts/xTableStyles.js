//////////////////////////////////////////////////////////////////////////////////////
/*                             Custom XTable Styles                               */
//////////////////////////////////////////////////////////////////////////////////////

// xTables Style Syntax     
// {'nameOfTheStyle1': {
//    'light': { 'cssProperty1': 'CssValue1', 'cssProperty2': 'CssValue1',  ..}, 
//    'dark': { 'cssProperty1': 'CssValue1', 'cssProperty2': 'CssValue1',  ..}
//    },
// etc.. 
// }

let xTableStyles =  {
  'title': {
    'light': {'font-weight': 'bold', 'background-color': '#07bce577', 'color': 'red'}, 
    'dark':  {'font-weight': 'bold', 'background-color': '#c7222e77', 'color': 'blue'}
    },
  'normal': {
    'light': {'font-family': 'Source Code Pro', 'background-color': 'yellow', 'color': 'blue'}, 
    'dark':  {'font-family': 'Source Code Pro', 'background-color': 'green', 'color': 'red'}
    },
  'sevillana': {
    'light': {'font-weight': 'bold', 'font-size': '0.8em', 'font-family': "arial", 'background-color': 'blue', 'color': '#ff0000'}, 
    'dark':  {'font-weight': 'bold', 'font-size': '1.3em', 'font-family': "arial", 'background-color': 'orange', 'color': '#00ffff'}
    },
}

function getConfOptions() {
  let data;
  document.querySelectorAll("massilia").forEach( confTag => {
      data = confTag.getAttribute("data");
      data = replaceSingleByDoubleQuotes(data);
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

function setCustomStylesIn(conf) {
  let newStyle = xTableStyles;
  if (Object.keys(conf).includes("styles")) {
      // console.log("CUSTOM DYNAMIC DETECTED");
      Object.keys(conf.styles).forEach( styleTheme => { 
        newStyle[styleTheme] = conf.styles[styleTheme];
        });
        return newStyle
  } else {
      return xTableStyles
  }
}

export let conf = getConfOptions();

xTableStyles = setCustomStylesIn(conf);

export default xTableStyles;