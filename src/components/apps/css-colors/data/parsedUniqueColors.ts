export type ColorListItem = {
    type: "light" | "dark",
    name: string,
    rgb: Array<number>,
    hsl: Array<number>,
    hex: string,
    alternativeName?:string,
}

export const parsedUniqueColors:ColorListItem[] = [
  {
    type: "light",
    name: "aliceblue",
    rgb: [240, 248, 255],
    hsl: [208, 100, 97.1],
    hex: "#F0F8FF",
  },
  {
    type: "light",
    name: "antiquewhite",
    rgb: [250, 235, 215],
    hsl: [34, 77.8, 91.2],
    hex: "#FAEBD7",
  },
  {
    type: "light",
    name: "aquamarine",
    rgb: [127, 255, 212],
    hsl: [160, 100, 74.9],
    hex: "#7FFFD4",
  },
  {
    type: "light",
    name: "azure",
    rgb: [240, 255, 255],
    hsl: [180, 100, 97.1],
    hex: "#F0FFFF",
  },
  {
    type: "light",
    name: "beige",
    rgb: [245, 245, 220],
    hsl: [60, 55.6, 91.2],
    hex: "#F5F5DC",
  },
  {
    type: "light",
    name: "bisque",
    rgb: [255, 228, 196],
    hsl: [33, 100, 88.4],
    hex: "#FFE4C4",
  },
  {
    type: "dark",
    name: "black",
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
    hex: "#000000",
  },
  {
    type: "light",
    name: "blanchedalmond",
    rgb: [255, 235, 205],
    hsl: [36, 100, 90.2],
    hex: "#FFEBCD",
  },
  {
    type: "dark",
    name: "blue",
    rgb: [0, 0, 255],
    hsl: [240, 100, 50],
    hex: "#0000FF",
  },
  {
    type: "dark",
    name: "blueviolet",
    rgb: [138, 43, 226],
    hsl: [271, 75.9, 52.7],
    hex: "#8A2BE2",
  },
  {
    type: "dark",
    name: "brown",
    rgb: [165, 42, 42],
    hsl: [0, 59.4, 40.6],
    hex: "#A52A2A",
  },
  {
    type: "light",
    name: "burlywood",
    rgb: [222, 184, 135],
    hsl: [34, 56.9, 70],
    hex: "#DEB887",
  },
  {
    type: "light",
    name: "cadetblue",
    rgb: [95, 158, 160],
    hsl: [182, 25.5, 50],
    hex: "#5F9EA0",
  },
  {
    type: "light",
    name: "chartreuse",
    rgb: [127, 255, 0],
    hsl: [90, 100, 50],
    hex: "#7FFF00",
  },
  {
    type: "light",
    name: "chocolate",
    rgb: [210, 105, 30],
    hsl: [25, 75, 47.1],
    hex: "#D2691E",
  },
  {
    type: "light",
    name: "coral",
    rgb: [255, 127, 80],
    hsl: [16, 100, 65.7],
    hex: "#FF7F50",
  },
  {
    type: "light",
    name: "cornflowerblue",
    rgb: [100, 149, 237],
    hsl: [219, 79.2, 66.1],
    hex: "#6495ED",
  },
  {
    type: "light",
    name: "cornsilk",
    rgb: [255, 248, 220],
    hsl: [48, 100, 93.1],
    hex: "#FFF8DC",
  },
  {
    type: "dark",
    name: "crimson",
    rgb: [220, 20, 60],
    hsl: [348, 83.3, 47.1],
    hex: "#DC143C",
  },
  {
    type: "light",
    name: "cyan",
    rgb: [0, 255, 255],
    hsl: [180, 100, 50],
    hex: "#00FFFF",
    alternativeName: "aqua",
  },
  {
    type: "dark",
    name: "darkblue",
    rgb: [0, 0, 139],
    hsl: [240, 100, 27.3],
    hex: "#00008B",
  },
  {
    type: "dark",
    name: "darkcyan",
    rgb: [0, 139, 139],
    hsl: [180, 100, 27.3],
    hex: "#008B8B",
  },
  {
    type: "light",
    name: "darkgoldenrod",
    rgb: [184, 134, 11],
    hsl: [43, 88.7, 38.2],
    hex: "#B8860B",
  },
  {
    type: "light",
    name: "darkgray",
    rgb: [169, 169, 169],
    hsl: [0, 0, 66.3],
    hex: "#A9A9A9",
    alternativeName: "darkgrey",
  },
  {
    type: "dark",
    name: "darkgreen",
    rgb: [0, 100, 0],
    hsl: [120, 100, 19.6],
    hex: "#006400",
  },
  {
    type: "light",
    name: "darkkhaki",
    rgb: [189, 183, 107],
    hsl: [56, 38.3, 58],
    hex: "#BDB76B",
  },
  {
    type: "dark",
    name: "darkmagenta",
    rgb: [139, 0, 139],
    hsl: [300, 100, 27.3],
    hex: "#8B008B",
  },
  {
    type: "dark",
    name: "darkolivegreen",
    rgb: [85, 107, 47],
    hsl: [82, 39, 30.2],
    hex: "#556B2F",
  },
  {
    type: "light",
    name: "darkorange",
    rgb: [255, 140, 0],
    hsl: [33, 100, 50],
    hex: "#FF8C00",
  },
  {
    type: "dark",
    name: "darkorchid",
    rgb: [153, 50, 204],
    hsl: [280, 60.6, 49.8],
    hex: "#9932CC",
  },
  {
    type: "dark",
    name: "darkred",
    rgb: [139, 0, 0],
    hsl: [0, 100, 27.3],
    hex: "#8B0000",
  },
  {
    type: "light",
    name: "darksalmon",
    rgb: [233, 150, 122],
    hsl: [15, 71.6, 69.6],
    hex: "#E9967A",
  },
  {
    type: "light",
    name: "darkseagreen",
    rgb: [143, 188, 143],
    hsl: [120, 25.1, 64.9],
    hex: "#8FBC8F",
  },
  {
    type: "dark",
    name: "darkslateblue",
    rgb: [72, 61, 139],
    hsl: [248, 39, 39.2],
    hex: "#483D8B",
  },
  {
    type: "dark",
    name: "darkslategray",
    rgb: [47, 79, 79],
    hsl: [180, 25.4, 24.7],
    hex: "#2F4F4F",
    alternativeName: "darkslategrey",
  },
  {
    type: "light",
    name: "darkturquoise",
    rgb: [0, 206, 209],
    hsl: [181, 100, 41],
    hex: "#00CED1",
  },
  {
    type: "dark",
    name: "darkviolet",
    rgb: [148, 0, 211],
    hsl: [282, 100, 41.4],
    hex: "#9400D3",
  },
  {
    type: "dark",
    name: "deeppink",
    rgb: [255, 20, 147],
    hsl: [328, 100, 53.9],
    hex: "#FF1493",
  },
  {
    type: "light",
    name: "deepskyblue",
    rgb: [0, 191, 255],
    hsl: [195, 100, 50],
    hex: "#00BFFF",
  },
  {
    type: "dark",
    name: "dimgray",
    rgb: [105, 105, 105],
    hsl: [0, 0, 41.2],
    hex: "#696969",
    alternativeName: "dimgrey",
  },
  {
    type: "dark",
    name: "dodgerblue",
    rgb: [30, 144, 255],
    hsl: [210, 100, 55.9],
    hex: "#1E90FF",
  },
  {
    type: "dark",
    name: "firebrick",
    rgb: [178, 34, 34],
    hsl: [0, 67.9, 41.6],
    hex: "#B22222",
  },
  {
    type: "light",
    name: "floralwhite",
    rgb: [255, 250, 240],
    hsl: [40, 100, 97.1],
    hex: "#FFFAF0",
  },
  {
    type: "dark",
    name: "forestgreen",
    rgb: [34, 139, 34],
    hsl: [120, 60.7, 33.9],
    hex: "#228B22",
  },
  {
    type: "light",
    name: "gainsboro",
    rgb: [220, 220, 220],
    hsl: [0, 0, 86.3],
    hex: "#DCDCDC",
  },
  {
    type: "light",
    name: "ghostwhite",
    rgb: [248, 248, 255],
    hsl: [240, 100, 98.6],
    hex: "#F8F8FF",
  },
  {
    type: "light",
    name: "gold",
    rgb: [255, 215, 0],
    hsl: [51, 100, 50],
    hex: "#FFD700",
  },
  {
    type: "light",
    name: "goldenrod",
    rgb: [218, 165, 32],
    hsl: [43, 74.4, 49],
    hex: "#DAA520",
  },
  {
    type: "light",
    name: "gray",
    rgb: [128, 128, 128],
    hsl: [0, 0, 50.2],
    hex: "#808080",
    alternativeName: "grey",
  },
  {
    type: "dark",
    name: "green",
    rgb: [0, 128, 0],
    hsl: [120, 100, 25.1],
    hex: "#008000",
  },
  {
    type: "light",
    name: "greenyellow",
    rgb: [173, 255, 47],
    hsl: [84, 100, 59.2],
    hex: "#ADFF2F",
  },
  {
    type: "light",
    name: "honeydew",
    rgb: [240, 255, 240],
    hsl: [120, 100, 97.1],
    hex: "#F0FFF0",
  },
  {
    type: "light",
    name: "hotpink",
    rgb: [255, 105, 180],
    hsl: [330, 100, 70.6],
    hex: "#FF69B4",
  },
  {
    type: "light",
    name: "indianred",
    rgb: [205, 92, 92],
    hsl: [0, 53.1, 58.2],
    hex: "#CD5C5C",
  },
  {
    type: "dark",
    name: "indigo",
    rgb: [75, 0, 130],
    hsl: [275, 100, 25.5],
    hex: "#4B0082",
  },
  {
    type: "light",
    name: "ivory",
    rgb: [255, 255, 240],
    hsl: [60, 100, 97.1],
    hex: "#FFFFF0",
  },
  {
    type: "light",
    name: "khaki",
    rgb: [240, 230, 140],
    hsl: [54, 76.9, 74.5],
    hex: "#F0E68C",
  },
  {
    type: "light",
    name: "lavender",
    rgb: [230, 230, 250],
    hsl: [240, 66.7, 94.1],
    hex: "#E6E6FA",
  },
  {
    type: "light",
    name: "lavenderblush",
    rgb: [255, 240, 245],
    hsl: [340, 100, 97.1],
    hex: "#FFF0F5",
  },
  {
    type: "light",
    name: "lawngreen",
    rgb: [124, 252, 0],
    hsl: [90, 100, 49.4],
    hex: "#7CFC00",
  },
  {
    type: "light",
    name: "lemonchiffon",
    rgb: [255, 250, 205],
    hsl: [54, 100, 90.2],
    hex: "#FFFACD",
  },
  {
    type: "light",
    name: "lightblue",
    rgb: [173, 216, 230],
    hsl: [195, 53.3, 79],
    hex: "#ADD8E6",
  },
  {
    type: "light",
    name: "lightcoral",
    rgb: [240, 128, 128],
    hsl: [0, 78.9, 72.2],
    hex: "#F08080",
  },
  {
    type: "light",
    name: "lightcyan",
    rgb: [224, 255, 255],
    hsl: [180, 100, 93.9],
    hex: "#E0FFFF",
  },
  {
    type: "light",
    name: "lightgoldenrodyellow",
    rgb: [250, 250, 210],
    hsl: [60, 80, 90.2],
    hex: "#FAFAD2",
  },
  {
    type: "light",
    name: "lightgray",
    rgb: [211, 211, 211],
    hsl: [0, 0, 82.7],
    hex: "#D3D3D3",
    alternativeName: "lightgrey",
  },
  {
    type: "light",
    name: "lightgreen",
    rgb: [144, 238, 144],
    hsl: [120, 73.4, 74.9],
    hex: "#90EE90",
  },
  {
    type: "light",
    name: "lightpink",
    rgb: [255, 182, 193],
    hsl: [351, 100, 85.7],
    hex: "#FFB6C1",
  },
  {
    type: "light",
    name: "lightsalmon",
    rgb: [255, 160, 122],
    hsl: [17, 100, 73.9],
    hex: "#FFA07A",
  },
  {
    type: "dark",
    name: "lightseagreen",
    rgb: [32, 178, 170],
    hsl: [177, 69.5, 41.2],
    hex: "#20B2AA",
  },
  {
    type: "light",
    name: "lightskyblue",
    rgb: [135, 206, 250],
    hsl: [203, 92, 75.5],
    hex: "#87CEFA",
  },
  {
    type: "light",
    name: "lightslategray",
    rgb: [119, 136, 153],
    hsl: [210, 14.3, 53.3],
    hex: "#778899",
    alternativeName: "lightslategrey",
  },
  {
    type: "light",
    name: "lightsteelblue",
    rgb: [176, 196, 222],
    hsl: [214, 41.1, 78],
    hex: "#B0C4DE",
  },
  {
    type: "light",
    name: "lightyellow",
    rgb: [255, 255, 224],
    hsl: [60, 100, 93.9],
    hex: "#FFFFE0",
  },
  {
    type: "light",
    name: "lime",
    rgb: [0, 255, 0],
    hsl: [120, 100, 50],
    hex: "#00FF00",
  },
  {
    type: "light",
    name: "limegreen",
    rgb: [50, 205, 50],
    hsl: [120, 60.8, 50],
    hex: "#32CD32",
  },
  {
    type: "light",
    name: "linen",
    rgb: [250, 240, 230],
    hsl: [30, 66.7, 94.1],
    hex: "#FAF0E6",
  },
  {
    type: "light",
    name: "magenta",
    rgb: [255, 0, 255],
    hsl: [300, 100, 50],
    hex: "#FF00FF",
    alternativeName: "fuchsia",
  },
  {
    type: "dark",
    name: "maroon",
    rgb: [128, 0, 0],
    hsl: [0, 100, 25.1],
    hex: "#800000",
  },
  {
    type: "light",
    name: "mediumaquamarine",
    rgb: [102, 205, 170],
    hsl: [160, 50.7, 60.2],
    hex: "#66CDAA",
  },
  {
    type: "dark",
    name: "mediumblue",
    rgb: [0, 0, 205],
    hsl: [240, 100, 40.2],
    hex: "#0000CD",
  },
  {
    type: "light",
    name: "mediumorchid",
    rgb: [186, 85, 211],
    hsl: [288, 58.9, 58],
    hex: "#BA55D3",
  },
  {
    type: "light",
    name: "mediumpurple",
    rgb: [147, 112, 219],
    hsl: [260, 59.8, 64.9],
    hex: "#9370DB",
  },
  {
    type: "light",
    name: "mediumseagreen",
    rgb: [60, 179, 113],
    hsl: [147, 49.8, 46.9],
    hex: "#3CB371",
  },
  {
    type: "light",
    name: "mediumslateblue",
    rgb: [123, 104, 238],
    hsl: [249, 79.8, 67.1],
    hex: "#7B68EE",
  },
  {
    type: "light",
    name: "mediumspringgreen",
    rgb: [0, 250, 154],
    hsl: [157, 100, 49],
    hex: "#00FA9A",
  },
  {
    type: "light",
    name: "mediumturquoise",
    rgb: [72, 209, 204],
    hsl: [178, 59.8, 55.1],
    hex: "#48D1CC",
  },
  {
    type: "dark",
    name: "mediumvioletred",
    rgb: [199, 21, 133],
    hsl: [322, 80.9, 43.1],
    hex: "#C71585",
  },
  {
    type: "dark",
    name: "midnightblue",
    rgb: [25, 25, 112],
    hsl: [240, 63.5, 26.9],
    hex: "#191970",
  },
  {
    type: "light",
    name: "mintcream",
    rgb: [245, 255, 250],
    hsl: [150, 100, 98],
    hex: "#F5FFFA",
  },
  {
    type: "light",
    name: "mistyrose",
    rgb: [255, 228, 225],
    hsl: [6, 100, 94.1],
    hex: "#FFE4E1",
  },
  {
    type: "light",
    name: "moccasin",
    rgb: [255, 228, 181],
    hsl: [38, 100, 85.5],
    hex: "#FFE4B5",
  },
  {
    type: "light",
    name: "navajowhite",
    rgb: [255, 222, 173],
    hsl: [36, 100, 83.9],
    hex: "#FFDEAD",
  },
  {
    type: "dark",
    name: "navy",
    rgb: [0, 0, 128],
    hsl: [240, 100, 25.1],
    hex: "#000080",
  },
  {
    type: "light",
    name: "oldlace",
    rgb: [253, 245, 230],
    hsl: [39, 85.2, 94.7],
    hex: "#FDF5E6",
  },
  {
    type: "dark",
    name: "olive",
    rgb: [128, 128, 0],
    hsl: [60, 100, 25.1],
    hex: "#808000",
  },
  {
    type: "dark",
    name: "olivedrab",
    rgb: [107, 142, 35],
    hsl: [80, 60.5, 34.7],
    hex: "#6B8E23",
  },
  {
    type: "light",
    name: "orange",
    rgb: [255, 165, 0],
    hsl: [39, 100, 50],
    hex: "#FFA500",
  },
  {
    type: "light",
    name: "orangered",
    rgb: [255, 69, 0],
    hsl: [16, 100, 50],
    hex: "#FF4500",
  },
  {
    type: "light",
    name: "orchid",
    rgb: [218, 112, 214],
    hsl: [302, 58.9, 64.7],
    hex: "#DA70D6",
  },
  {
    type: "light",
    name: "palegoldenrod",
    rgb: [238, 232, 170],
    hsl: [55, 66.7, 80],
    hex: "#EEE8AA",
  },
  {
    type: "light",
    name: "palegreen",
    rgb: [152, 251, 152],
    hsl: [120, 92.5, 79],
    hex: "#98FB98",
  },
  {
    type: "light",
    name: "paleturquoise",
    rgb: [175, 238, 238],
    hsl: [180, 64.9, 81],
    hex: "#AFEEEE",
  },
  {
    type: "light",
    name: "palevioletred",
    rgb: [219, 112, 147],
    hsl: [340, 59.8, 64.9],
    hex: "#DB7093",
  },
  {
    type: "light",
    name: "papayawhip",
    rgb: [255, 239, 213],
    hsl: [37, 100, 91.8],
    hex: "#FFEFD5",
  },
  {
    type: "light",
    name: "peachpuff",
    rgb: [255, 218, 185],
    hsl: [28, 100, 86.3],
    hex: "#FFDAB9",
  },
  {
    type: "light",
    name: "peru",
    rgb: [205, 133, 63],
    hsl: [30, 58.7, 52.5],
    hex: "#CD853F",
  },
  {
    type: "light",
    name: "pink",
    rgb: [255, 192, 203],
    hsl: [350, 100, 87.6],
    hex: "#FFC0CB",
  },
  {
    type: "light",
    name: "plum",
    rgb: [221, 160, 221],
    hsl: [300, 47.3, 74.7],
    hex: "#DDA0DD",
  },
  {
    type: "light",
    name: "powderblue",
    rgb: [176, 224, 230],
    hsl: [187, 51.9, 79.6],
    hex: "#B0E0E6",
  },
  {
    type: "dark",
    name: "purple",
    rgb: [128, 0, 128],
    hsl: [300, 100, 25.1],
    hex: "#800080",
  },
  {
    type: "dark",
    name: "rebeccapurple",
    rgb: [102, 51, 153],
    hsl: [270, 50, 40],
    hex: "#663399",
  },
  {
    type: "dark",
    name: "red",
    rgb: [255, 0, 0],
    hsl: [0, 100, 50],
    hex: "#FF0000",
  },
  {
    type: "light",
    name: "rosybrown",
    rgb: [188, 143, 143],
    hsl: [0, 25.1, 64.9],
    hex: "#BC8F8F",
  },
  {
    type: "dark",
    name: "royalblue",
    rgb: [65, 105, 225],
    hsl: [225, 72.7, 56.9],
    hex: "#4169E1",
  },
  {
    type: "dark",
    name: "saddlebrown",
    rgb: [139, 69, 19],
    hsl: [25, 75.9, 31],
    hex: "#8B4513",
  },
  {
    type: "light",
    name: "salmon",
    rgb: [250, 128, 114],
    hsl: [6, 93.2, 71.4],
    hex: "#FA8072",
  },
  {
    type: "light",
    name: "sandybrown",
    rgb: [244, 164, 96],
    hsl: [28, 87.1, 66.7],
    hex: "#F4A460",
  },
  {
    type: "dark",
    name: "seagreen",
    rgb: [46, 139, 87],
    hsl: [146, 50.3, 36.3],
    hex: "#2E8B57",
  },
  {
    type: "light",
    name: "seashell",
    rgb: [255, 245, 238],
    hsl: [25, 100, 96.7],
    hex: "#FFF5EE",
  },
  {
    type: "dark",
    name: "sienna",
    rgb: [160, 82, 45],
    hsl: [19, 56.1, 40.2],
    hex: "#A0522D",
  },
  {
    type: "light",
    name: "silver",
    rgb: [192, 192, 192],
    hsl: [0, 0, 75.3],
    hex: "#C0C0C0",
  },
  {
    type: "light",
    name: "skyblue",
    rgb: [135, 206, 235],
    hsl: [197, 71.4, 72.5],
    hex: "#87CEEB",
  },
  {
    type: "dark",
    name: "slateblue",
    rgb: [106, 90, 205],
    hsl: [248, 53.5, 57.8],
    hex: "#6A5ACD",
  },
  {
    type: "dark",
    name: "slategray",
    rgb: [112, 128, 144],
    hsl: [210, 12.6, 50.2],
    hex: "#708090",
    alternativeName: "slategrey",
  },
  {
    type: "light",
    name: "snow",
    rgb: [255, 250, 250],
    hsl: [0, 100, 99],
    hex: "#FFFAFA",
  },
  {
    type: "light",
    name: "springgreen",
    rgb: [0, 255, 127],
    hsl: [150, 100, 50],
    hex: "#00FF7F",
  },
  {
    type: "dark",
    name: "steelblue",
    rgb: [70, 130, 180],
    hsl: [207, 44, 49],
    hex: "#4682B4",
  },
  {
    type: "light",
    name: "tan",
    rgb: [210, 180, 140],
    hsl: [34, 43.8, 68.6],
    hex: "#D2B48C",
  },
  {
    type: "dark",
    name: "teal",
    rgb: [0, 128, 128],
    hsl: [180, 100, 25.1],
    hex: "#008080",
  },
  {
    type: "light",
    name: "thistle",
    rgb: [216, 191, 216],
    hsl: [300, 24.3, 79.8],
    hex: "#D8BFD8",
  },
  {
    type: "light",
    name: "tomato",
    rgb: [255, 99, 71],
    hsl: [9, 100, 63.9],
    hex: "#FF6347",
  },
  {
    type: "light",
    name: "turquoise",
    rgb: [64, 224, 208],
    hsl: [174, 72.1, 56.5],
    hex: "#40E0D0",
  },
  {
    type: "light",
    name: "violet",
    rgb: [238, 130, 238],
    hsl: [300, 76.1, 72.2],
    hex: "#EE82EE",
  },
  {
    type: "light",
    name: "wheat",
    rgb: [245, 222, 179],
    hsl: [39, 76.7, 83.1],
    hex: "#F5DEB3",
  },
  {
    type: "light",
    name: "white",
    rgb: [255, 255, 255],
    hsl: [0, 0, 100],
    hex: "#FFFFFF",
  },
  {
    type: "light",
    name: "whitesmoke",
    rgb: [245, 245, 245],
    hsl: [0, 0, 96.1],
    hex: "#F5F5F5",
  },
  {
    type: "light",
    name: "yellow",
    rgb: [255, 255, 0],
    hsl: [60, 100, 50],
    hex: "#FFFF00",
  },
  {
    type: "light",
    name: "yellowgreen",
    rgb: [154, 205, 50],
    hsl: [80, 60.8, 50],
    hex: "#9ACD32",
  },
];
