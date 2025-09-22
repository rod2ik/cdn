let htmlColors =  {
  //////////////////////////////////////////////////////////////////////////////////////
  /*                             Standard HTML Colors                                 */
  //////////////////////////////////////////////////////////////////////////////////////
  // colorKey:                [BgLight,   BgdDark, BorderLight, BorderDark, TextLight, TextDark]
  "aliceblue":                ["#f0f8ff", "#f0f8ff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "antiquewhite":             ["#faebd7", "#faebd7", "#ff0000", "#00ffff","#000000","#ffffff"],
  "aqua":                     ["#00ffff", "#00ffff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "aquamarine":               ["#7fffd4", "#7fffd4", "#ff0000", "#00ffff","#000000","#ffffff"],
  "azure":                    ["#f0ffff", "#f0ffff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "beige":                    ["#f5f5dc", "#f5f5dc", "#ff0000", "#00ffff","#000000","#ffffff"],
  "bisque":                   ["#ffe4c4", "#ffe4c4", "#ff0000", "#00ffff","#000000","#ffffff"],
  "black":                    ["#000000", "#000000", "#ff0000", "#00ffff","#000000","#ffffff"],
  "blanchedalmond":           ["#ffebcd", "#ffebcd", "#ff0000", "#00ffff","#000000","#ffffff"],
  "blue":                     ["#0000ff", "#0000ff", "#ff0000", "#00ffff","#dc143c","#7FFF00"],
  "blueviolet":               ["#8a2be2", "#8a2be2", "#ff0000", "#00ffff","#000000","#ffffff"],
  "brown":                    ["#a52a2a", "#a52a2a", "#ff0000", "#00ffff","#000000","#ffffff"],
  "burlywood":                ["#deb887", "#deb887", "#ff0000", "#00ffff","#000000","#ffffff"],
  "cadetblue":                ["#5f9ea0", "#5f9ea0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "chartreuse":               ["#7fff00", "#7fff00", "#3b7800", "#daffb6","#000000","#ffffff"],
  "chocolate":                ["#d2691e", "#d2691e", "#ff0000", "#00ffff","#000000","#ffffff"],
  "coral":                    ["#ff7f50", "#ff7f50", "#ff0000", "#00ffff","#000000","#ffffff"],
  "cornflowerblue":           ["#6495ed", "#6495ed", "#ff0000", "#00ffff","#000000","#ffffff"],
  "cornsilk":                 ["#fff8dc", "#fff8dc", "#ff0000", "#00ffff","#000000","#ffffff"],
  "crimson":                  ["#dc143c", "#dc143c", "#ff0000", "#00ffff","#000000","#ffffff"],
  "cyan":                     ["#00ffff", "#00ffff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkblue":                 ["#00008b", "#00008b", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkcyan":                 ["#008b8b", "#008b8b", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkgoldenrod":            ["#b8860b", "#b8860b", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkgray":                 ["#a9a9a9", "#a9a9a9", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkgreen":                ["#006400", "#006400", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkgrey":                 ["#a9a9a9", "#a9a9a9", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkkhaki":                ["#bdb76b", "#bdb76b", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkmagenta":              ["#8b008b", "#8b008b", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkolivegreen":           ["#556b2f", "#556b2f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkorange":               ["#ff8c00", "#ff8c00", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkorchid":               ["#9932cc", "#9932cc", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkred":                  ["#8b0000", "#8b0000", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darksalmon":               ["#e9967a", "#e9967a", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkseagreen":             ["#8fbc8f", "#8fbc8f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkslateblue":            ["#483d8b", "#483d8b", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkslategray":            ["#2f4f4f", "#2f4f4f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkslategrey":            ["#2f4f4f", "#2f4f4f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkturquoise":            ["#00ced1", "#00ced1", "#ff0000", "#00ffff","#000000","#ffffff"],
  "darkviolet":               ["#9400d3", "#9400d3", "#ff0000", "#00ffff","#000000","#ffffff"],
  "deeppink":                 ["#ff1493", "#ff1493", "#a60d60", "#fd84c5","#000000","#ffffff"],
  "deepskyblue":              ["#00bfff", "#00bfff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "dimgray":                  ["#696969", "#696969", "#ff0000", "#00ffff","#000000","#ffffff"],
  "dimgrey":                  ["#696969", "#696969", "#ff0000", "#00ffff","#000000","#ffffff"],
  "dodgerblue":               ["#1e90ff", "#1e90ff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "firebrick":                ["#b22222", "#b22222", "#ff0000", "#00ffff","#000000","#ffffff"],
  "floralwhite":              ["#fffaf0", "#fffaf0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "forestgreen":              ["#228b22", "#228b22", "#ff0000", "#00ffff","#000000","#ffffff"],
  "fuchsia":                  ["#ff00ff", "#ff00ff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "gainsboro":                ["#dcdcdc", "#dcdcdc", "#ff0000", "#00ffff","#000000","#ffffff"],
  "ghostwhite":               ["#f8f8ff", "#f8f8ff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "goldenrod":                ["#daa520", "#daa520", "#ff0000", "#00ffff","#000000","#ffffff"],
  "gold":                     ["#ffd700", "#ffd700", "#ff0000", "#00ffff","#000000","#ffffff"],
  "gray":                     ["#808080", "#808080", "#6f6f7699", "#bebebeb3","#000000","#ffffff"],
  "green":                    ["#008000", "#008000", "#ff0000", "#00ffff","#000000","#ffffff"],
  "greenyellow":              ["#adff2f", "#adff2f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "grey":                     ["#808080", "#808080", "#6f6f7699", "#bebebeb3","#000000","#ffffff"],
  "honeydew":                 ["#f0fff0", "#f0fff0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "hotpink":                  ["#ff69b4", "#ff69b4", "#ff0000", "#00ffff","#000000","#ffffff"],
  "indianred":                ["#cd5c5c", "#cd5c5c", "#ff0000", "#00ffff","#000000","#ffffff"],
  "indigo":                   ["#4b0082", "#4b0082", "#ff0000", "#00ffff","#000000","#ffffff"],
  "ivory":                    ["#fffff0", "#fffff0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "khaki":                    ["#f0e68c", "#f0e68c", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lavenderblush":            ["#fff0f5", "#fff0f5", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lavender":                 ["#e6e6fa", "#e6e6fa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lawngreen":                ["#7cfc00", "#7cfc00", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lemonchiffon":             ["#fffacd", "#fffacd", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightblue":                ["#add8e6", "#add8e6", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightcoral":               ["#f08080", "#f08080", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightcyan":                ["#e0ffff", "#e0ffff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightgoldenrodyellow":     ["#fafad2", "#fafad2", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightgray":                ["#d3d3d3", "#d3d3d3", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightgreen":               ["#90ee90", "#90ee90", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightgrey":                ["#d3d3d3", "#d3d3d3", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightpink":                ["#ffb6c1", "#ffb6c1", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightsalmon":              ["#ffa07a", "#ffa07a", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightseagreen":            ["#20b2aa", "#20b2aa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightskyblue":             ["#87cefa", "#87cefa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightslategray":           ["#778899", "#778899", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightslategrey":           ["#778899", "#778899", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightsteelblue":           ["#b0c4de", "#b0c4de", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lightyellow":              ["#ffffe0", "#ffffe0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "lime":                     ["#00ff00", "#00ff00", "#ff0000", "#00ffff","#000000","#ffffff"],
  "limegreen":                ["#32cd32", "#32cd32", "#ff0000", "#00ffff","#000000","#ffffff"],
  "linen":                    ["#faf0e6", "#faf0e6", "#ff0000", "#00ffff","#000000","#ffffff"],
  "magenta":                  ["#ff00ff", "#ff00ff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "maroon":                   ["#800000", "#800000", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumaquamarine":         ["#66cdaa", "#66cdaa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumblue":               ["#0000cd", "#0000cd", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumorchid":             ["#ba55d3", "#ba55d3", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumpurple":             ["#9370db", "#9370db", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumseagreen":           ["#3cb371", "#3cb371", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumslateblue":          ["#7b68ee", "#7b68ee", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumspringgreen":        ["#00fa9a", "#00fa9a", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumturquoise":          ["#48d1cc", "#48d1cc", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mediumvioletred":          ["#c71585", "#c71585", "#ff0000", "#00ffff","#000000","#ffffff"],
  "midnightblue":             ["#191970", "#191970", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mintcream":                ["#f5fffa", "#f5fffa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "mistyrose":                ["#ffe4e1", "#ffe4e1", "#ff0000", "#00ffff","#000000","#ffffff"],
  "moccasin":                 ["#ffe4b5", "#ffe4b5", "#ff0000", "#00ffff","#000000","#ffffff"],
  "navajowhite":              ["#ffdead", "#ffdead", "#ff0000", "#00ffff","#000000","#ffffff"],
  "navy":                     ["#000080", "#000080", "#ff0000", "#00ffff","#000000","#ffffff"],
  "oldlace":                  ["#fdf5e6", "#fdf5e6", "#ff0000", "#00ffff","#000000","#ffffff"],
  "olive":                    ["#808000", "#808000", "#ff0000", "#00ffff","#000000","#ffffff"],
  "olivedrab":                ["#6b8e23", "#6b8e23", "#ff0000", "#00ffff","#000000","#ffffff"],
  "orange":                   ["#ffa500", "#ffa500", "#b47500", "#ffc75f","#000000","#ffffff"],
  "orangered":                ["#ff4500", "#ff4500", "#ff0000", "#00ffff","#000000","#ffffff"],
  "orchid":                   ["#da70d6", "#da70d6", "#ff0000", "#00ffff","#000000","#ffffff"],
  "palegoldenrod":            ["#eee8aa", "#eee8aa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "palegreen":                ["#98fb98", "#98fb98", "#ff0000", "#00ffff","#000000","#ffffff"],
  "paleturquoise":            ["#afeeee", "#afeeee", "#ff0000", "#00ffff","#000000","#ffffff"],
  "palevioletred":            ["#db7093", "#db7093", "#ff0000", "#00ffff","#000000","#ffffff"],
  "papayawhip":               ["#ffefd5", "#ffefd5", "#ff0000", "#00ffff","#000000","#ffffff"],
  "peachpuff":                ["#ffdab9", "#ffdab9", "#ff0000", "#00ffff","#000000","#ffffff"],
  "peru":                     ["#cd853f", "#cd853f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "pink":                     ["#ffc0cb", "#ffc0cb", "#ff0000", "#00ffff","#000000","#ffffff"],
  "plum":                     ["#dda0dd", "#dda0dd", "#ff0000", "#00ffff","#000000","#ffffff"],
  "powderblue":               ["#b0e0e6", "#b0e0e6", "#ff0000", "#00ffff","#000000","#ffffff"],
  "purple":                   ["#800080", "#800080", "#ff0000", "#00ffff","#000000","#ffffff"],
  "rebeccapurple":            ["#663399", "#663399", "#ff0000", "#00ffff","#000000","#ffffff"],
  "red":                      ["#ff0000", "#ff0000", "#ff0000", "#00ffff","#000000","#ffffff"],
  "rosybrown":                ["#bc8f8f", "#bc8f8f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "royalblue":                ["#4169e1", "#4169e1", "#ff0000", "#00ffff","#000000","#ffffff"],
  "saddlebrown":              ["#8b4513", "#8b4513", "#ff0000", "#00ffff","#000000","#ffffff"],
  "salmon":                   ["#fa8072", "#fa8072", "#ff0000", "#00ffff","#000000","#ffffff"],
  "sandybrown":               ["#f4a460", "#f4a460", "#ff0000", "#00ffff","#000000","#ffffff"],
  "seagreen":                 ["#2e8b57", "#2e8b57", "#ff0000", "#00ffff","#000000","#ffffff"],
  "seashell":                 ["#fff5ee", "#fff5ee", "#ff0000", "#00ffff","#000000","#ffffff"],
  "sienna":                   ["#a0522d", "#a0522d", "#ff0000", "#00ffff","#000000","#ffffff"],
  "silver":                   ["#c0c0c0", "#c0c0c0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "skyblue":                  ["#87ceeb", "#87ceeb", "#ff0000", "#00ffff","#000000","#ffffff"],
  "slateblue":                ["#6a5acd", "#6a5acd", "#ff0000", "#00ffff","#000000","#ffffff"],
  "slategray":                ["#708090", "#708090", "#ff0000", "#00ffff","#000000","#ffffff"],
  "slategrey":                ["#708090", "#708090", "#ff0000", "#00ffff","#000000","#ffffff"],
  "snow":                     ["#fffafa", "#fffafa", "#ff0000", "#00ffff","#000000","#ffffff"],
  "springgreen":              ["#00ff7f", "#00ff7f", "#ff0000", "#00ffff","#000000","#ffffff"],
  "steelblue":                ["#4682b4", "#4682b4", "#ff0000", "#00ffff","#000000","#ffffff"],
  "tan":                      ["#d2b48c", "#d2b48c", "#ff0000", "#00ffff","#000000","#ffffff"],
  "teal":                     ["#008080", "#008080", "#ff0000", "#00ffff","#000000","#ffffff"],
  "thistle":                  ["#d8bfd8", "#d8bfd8", "#ff0000", "#00ffff","#000000","#ffffff"],
  "tomato":                   ["#ff6347", "#ff6347", "#ff0000", "#00ffff","#000000","#ffffff"],
  "turquoise":                ["#40e0d0", "#40e0d0", "#ff0000", "#00ffff","#000000","#ffffff"],
  "violet":                   ["#ee82ee", "#ee82ee", "#ff0000", "#00ffff","#000000","#ffffff"],
  "wheat":                    ["#f5deb3", "#f5deb3", "#ff0000", "#00ffff","#000000","#ffffff"],
  "white":                    ["#ffffff", "#ffffff", "#ff0000", "#00ffff","#000000","#ffffff"],
  "whitesmoke":               ["#f5f5f5", "#f5f5f5", "#ff0000", "#00ffff","#000000","#ffffff"],
  "yellow":                   ["#ffff00", "#ffff00cc", "#b0b000", "#fdfd75","#000000","#ffffff"],
  "yellowgreen":              ["#9acd32", "#9acd32", "#ff0000", "#00ffff","#000000","#ffffff"],
  //////////////////////////////////////////////////////////////////////////////////////
  /*                              Custom Colors                                       */
  //////////////////////////////////////////////////////////////////////////////////////
  // colorKey:                [BgLight,     BgDark,  BorderLight, BorderDark, TextLight, TextDark]
  "gris":                     ["#dcdcdc99", "#808080", "#00000099", "#bebebeb3","#000000","#ffffff"],
  // "gris":                     ["#bebebeb3", "#808080", "#6f6f7699", "#bebebeb3","#000000","#ffffff"],
  "bleu":                     ["#00e4ff99", "#00e4ffcc", "#00a1b499", "#59edff99","#000000","#ffffff"],
  "vert":                     ["#7fff00", "#7fff00ee", "#3b7800", "#daffb6","#000000","#ffffff"],
  "jaune":                    ["#ffff00", "#ffff00cc", "#b0b000", "#fdfd75","#000000","#ffffff"],
  "test":                     ["#ff0000", "#00ff00", "#b0b000", "#fdfd75","#000000","#ffffff"],
  // "demo1":                    ["#ff0000", "#0000ff", "#b0b000", "#fdfd75","#0000ff","#ff0000"],
  "demo2":                    ["#ffff00", "#00ffff", "#b0b000", "#fdfd75","#00ffff","#ff00ff"],
  "demo3":                    ["#DC143C", "#9932CC", "#b0b000", "#fdfd75","#000000","#ffffff"],
  "demo4":                    ["#ff000077", "#0000ff77", "#b0b000", "#fdfd75","#ffffff","#ff0000"],
  "demo5":                    ["#0000ff77", "#ff000077", "#b0b000", "#fdfd75","#000000","#ffffff"],
  "demo6":                    ["#FFA50077", "#ff00ff77", "#b0b000", "#fdfd75","#000000","#ffffff"],
}

function getConfOptions() {
  let data;
  document.querySelectorAll("massilia").forEach( confTag => {
      data = confTag.getAttribute("data");
      // if (data[0] == '"' && data[data.length-1] == '"') {
      //   data = data.substring(1,data.length-1);
      // }
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

function setCustomDynamicColorsIn(conf) {
  let newColor = htmlColors;
  if (Object.keys(conf).includes("colors")) {
      // console.log("CUSTOM DYNAMIC DETECTED");
      Object.keys(conf.colors).forEach( colorItem => {
          newColor[colorItem] = conf.colors[colorItem].split(" ").concat("");
          for (let i=0; i<=5; i++) {
              newColor[colorItem][i] = "#"+newColor[colorItem][i];
          }
        });
        return newColor
  } else {
      return htmlColors
  }
}

export let conf = getConfOptions();

htmlColors = setCustomDynamicColorsIn(conf);

export default htmlColors;